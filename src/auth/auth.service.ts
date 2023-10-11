import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './login-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt/dist';
import { BlacklistedTokensService } from 'src/blacklisted-tokens/blacklisted-tokens.service';
import { ConflictException } from '@nestjs/common/exceptions';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/entities/user.entity';
import { IAuthResponse } from 'src/lib/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private blTokensService: BlacklistedTokensService,
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
