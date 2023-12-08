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
import { ForbiddenException } from '@nestjs/common/exceptions';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/entities/user.entity';
import { IAuthResponse } from 'src/lib/interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private userService: UsersService,
    private jwtService: JwtService,
    private blTokensService: BlacklistedTokensService,
    private cartService: CartService,
  ) {}

  async registration(createUserDto: CreateUserDto): Promise<IAuthResponse> {
    const candidate = await this.userService.findOneByEmail(
      createUserDto.email,
    );
    if (candidate) {
      throw new ConflictException({ message: 'Email in use' });
    }
    const hashPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.userService.create({
      ...createUserDto,
      password: hashPassword,
      role: 'user',
    });

    const cart = await this.cartService.createCart(user.id);

    user.cart = cart;

    await this.userRepository.save(user);

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
}

