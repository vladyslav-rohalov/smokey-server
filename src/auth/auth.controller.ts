import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginResponse, RegisterResponse } from './responses.example';
import { GetUserResponse, DeleteResponse } from './responses.example';
import { UpdateResponse } from './responses.example';


@ApiTags('Authoriztion')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, type: LoginResponse })
  @HttpCode(200)
  @Post('login')
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }

  @ApiOperation({ summary: 'Registration' })
  @ApiResponse({ status: 201, type: RegisterResponse })
  @HttpCode(201)
  @Post('register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @ApiOperation({ summary: 'Get User' })
  @ApiResponse({ status: 200, type: GetUserResponse })
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update User' })
  @ApiResponse({ status: 200, type: UpdateResponse })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({ status: 200, type: DeleteResponse })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
