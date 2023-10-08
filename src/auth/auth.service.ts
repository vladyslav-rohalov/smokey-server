import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './login-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt/dist';
import {
  HttpException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async registration(createUserDto: CreateUserDto) {
    const candidate = await this.userService.findOneByEmail(
      createUserDto.email,
    );
    if (candidate) {
      throw new HttpException('Email in use', HttpStatus.CONFLICT);
    }
    const hashPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.userService.create({
      ...createUserDto,
      password: hashPassword,
      role: 'user',
    });

    const { token } = await this.generateToken(user);

    return { email: user.email, token };
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(loginUserDto);
    const token = await this.generateToken(user);
    return token;
  }

  async generateToken(user: User) {
    const payload = { id: user.id, role: user.role };
    return {
      token: this.jwtService.sign(payload),
    };
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
