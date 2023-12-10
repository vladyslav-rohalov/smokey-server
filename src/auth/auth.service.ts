import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './login-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt/dist';
import { BlacklistedTokensService } from 'src/blacklisted-tokens/blacklisted-tokens.service';
import { CartService } from 'src/cart/cart.service';
import { ConflictException } from '@nestjs/common/exceptions';
import { NotFoundException } from '@nestjs/common/exceptions';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/entities/user.entity';
import { IAuthResponse } from 'src/lib/interfaces';
import { EmailService } from 'src/services/email/email.servise';
import { generateConfirmLetter } from 'src/services/email/generateHtml';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private userService: UsersService,
    private jwtService: JwtService,
    private blTokensService: BlacklistedTokensService,
    private cartService: CartService,
    private readonly emailService: EmailService,
  ) {}

  async registration(
    createUserDto: CreateUserDto,
  ): Promise<Partial<IAuthResponse>> {
    const candidate = await this.userService.findOneByEmail(
      createUserDto.email,
    );
    if (candidate) {
      if (candidate.isVerify) {
        throw new ConflictException({ message: 'Email in use' });
      } else {
        const vCode = this.generateRandomCode(10);
        candidate.v_code = candidate.v_code
          ? [...candidate.v_code, vCode]
          : [vCode];
        const letter = generateConfirmLetter(candidate.firstName, vCode);
        await this.emailService.sendEmail(
          candidate.email,
          'Confirm registration',
          letter,
        );
        await this.userRepository.save(candidate);
        return {
          user: {
            firstName: candidate.firstName,
            lastName: candidate.lastName,
            phone: candidate.phone,
            email: candidate.email,
          },
        };
      }
    }
    const hashPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.userService.create({
      ...createUserDto,
      password: hashPassword,
      role: 'user',
    });

    const cart = await this.cartService.createCart(user.id);
    const vCode = this.generateRandomCode(10);

    user.cart = cart;
    user.v_code = [vCode];

    await this.userRepository.save(user);

    const letter = generateConfirmLetter(user.firstName, vCode);

    await this.emailService.sendEmail(
      user.email,
      'Confirm registration',
      letter,
    );

    return {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
      },
    };
  }

  async verify(code: string): Promise<IAuthResponse> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where(`:code = ANY (user.v_code)`, { code })
      .getOne();

    if (!user) {
      throw new ForbiddenException('Wrong code!');
    }

    const token = await this.generateToken(user);

    user.isVerify = true;
    user.v_code = null;

    await this.userRepository.save(user);

    return {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        address: {
          city: user.address?.city || null,
          street: user.address?.street || null,
          house: user.address?.house || null,
          apartment: user.address?.apartment || null,
        },
      },
      token,
    };
  }

  async resendCode(email: string): Promise<Partial<IAuthResponse>> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException();
    }

    if (user.isVerify) {
      throw new ForbiddenException('Already verified');
    }

    const vCode = this.generateRandomCode(10);

    user.v_code.push(vCode);

    await this.userRepository.save(user);

    return {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
      },
    };
  }

  async login(loginUserDto: LoginUserDto): Promise<IAuthResponse> {
    const user = await this.validateUser(loginUserDto);
    const token = await this.generateToken(user);

    return {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        address: {
          city: user.address?.city || null,
          street: user.address?.street || null,
          house: user.address?.house || null,
          apartment: user.address?.apartment || null,
        },
      },
      token,
    };
  }

  async logout(token: string): Promise<void> {
    await this.blTokensService.blacklistToken(token);
  }

  async generateToken(user: User): Promise<string> {
    const payload = { id: user.id, role: user.role };
    return this.jwtService.sign(payload);
  }

  async loginAdmin(loginUserDto: LoginUserDto): Promise<IAuthResponse> {
    const user = await this.validateUser(loginUserDto);

    if (user.role === 'user') {
      throw new ForbiddenException();
    }

    const token = await this.generateToken(user);

    return {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
      },
      token,
    };
  }

  async googleLogin(reqUser: User) {
    const user = await this.userRepository.findOne({
      where: { id: reqUser.id },
      relations: ['cart'],
    });

    if (!user.cart) {
      const cart = await this.cartService.createCart(user.id);

      user.cart = cart;

      await this.userRepository.save(user);
    }
    const token = await this.generateToken(user);
    return token;
  }

  async validateGoogleLogin(profile: any): Promise<any> {
    const { id, emails, name, displayName } = profile;
    const firstName = name?.givenName ? name.givenName : displayName;
    const lastName = name?.firstName ? name.firstName : null;
    const email = emails[0].value;

    let user = await this.userService.findOneByEmail(email);

    if (!user) {
      user = this.userRepository.create({
        googleId: id,
        email,
        firstName,
        lastName,
      });

      await this.userRepository.save(user);
    }
    return user;
  }

  private async validateUser(loginUserDto: LoginUserDto) {
    const user = await this.userService.findOneByEmail(loginUserDto.email);
    if (!user) {
      throw new UnauthorizedException({ message: 'Wrong email or password' });
    }
    const passwordEquals = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!passwordEquals) {
      throw new UnauthorizedException({ message: 'Wrong email or password' });
    }
    return user;
  }

  private generateRandomCode(length: number) {
    const buffer = randomBytes(length);
    return buffer.toString('hex').toUpperCase().substring(0, length);
  }
}
