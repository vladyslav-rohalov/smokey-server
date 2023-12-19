import { Body, Controller, Post, HttpCode, Get } from '@nestjs/common';
import { UseGuards, Req, Res } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './login-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Request } from 'express';
import { GoogleOAuthGuard } from '../guards/google-oauth.guard';
import { UpdateUserDto } from '../users/dto/update-user.dto';

interface IRequest extends Request {
  user: { id: number; token: string };
}

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  registration(@Body() createUserDto: CreateUserDto) {
    return this.authService.registration(createUserDto);
  }

  @HttpCode(200)
  @Post('resend')
  resendCode(@Body() updateUserDto: UpdateUserDto) {
    const { email } = updateUserDto;
    return this.authService.resendCode(email);
  }

  @HttpCode(200)
  @Post('verify')
  verify(@Body() body: { code: string }) {
    return this.authService.verify(body.code);
  }

  @HttpCode(200)
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('logout')
  logout(@Req() req: IRequest) {
    const token = req.user.token;
    return this.authService.logout(token);
  }

  @HttpCode(200)
  @Post('admin/login')
  loginAdmin(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginAdmin(loginUserDto);
  }

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() res) {
    const reqUser = req.user;
    const token = await this.authService.googleLogin(reqUser);
    res.cookie('token', token, { httpOnly: false });
    res.redirect('https://smokey.top/');
  }
}
