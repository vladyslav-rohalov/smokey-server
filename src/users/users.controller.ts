import { Controller, Param, HttpCode, UseGuards } from '@nestjs/common';
import { Get, Patch, Delete, Body, Req } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { AddressesService } from 'src/addresses/addresses.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateAddressDto } from 'src/addresses/dto/create-address.dto';

interface IRequest extends Request {
  user: { id: number };
}

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly addressesService: AddressesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get('current')
  findOneById(@Req() req: IRequest) {
    const authenticatedUserId = req.user.id;
    return this.usersService.findOneByID(authenticatedUserId);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Patch('update')
  update(@Body() updateUserDto: UpdateUserDto, @Req() req: IRequest) {
    const authenticatedUserId = req.user.id;
    return this.usersService.update(authenticatedUserId, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Patch('update/address')
  updateAddress(
    @Body() createAddressDto: CreateAddressDto,
    @Req() req: IRequest,
  ) {
    const authenticatedUserId = req.user.id;
    return this.addressesService.updateAddress(
      authenticatedUserId,
      createAddressDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Delete()
  remove(@Req() req: IRequest) {
    const authenticatedUserId = req.user.id;
    return this.usersService.remove(authenticatedUserId);
  }
}
