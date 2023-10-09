import { Controller, Param, HttpCode, UseGuards } from '@nestjs/common';
import { Get, Patch, Delete, Body, Req } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

interface IRequest extends Request {
  user: { id: number };
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get('current')
  findOneById(@Req() req: IRequest) {
    const authenticatedUserId = req.user.id;
    return this.usersService.findOneByID(authenticatedUserId);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: IRequest,
  ) {
    const authenticatedUserId = req.user.id;
    return this.usersService.update(+id, authenticatedUserId, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: IRequest) {
    const authenticatedUserId = req.user.id;
    return this.usersService.remove(+id, authenticatedUserId);
  }
}
