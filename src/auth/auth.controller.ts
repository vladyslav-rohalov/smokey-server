import { Controller, Post, Body } from '@nestjs/common';
import { Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(CreateUserDto);
  }

  @HttpCode(201)
  @Post('register')
  register(@Body() userDto: CreateUserDto) {
    return this.authService.register(CreateUserDto);
  }

  @HttpCode(200)
  @Post('logout')
  logout(@Body() userDto: CreateUserDto) {
    return this.authService.logout(CreateUserDto);
  }

  @HttpCode(200)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.update(+id, UpdateUserDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
