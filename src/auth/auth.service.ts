import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class AuthService {
  login(userDto: CreateUserDto) {
    return 'This action adds a new auth';
  }

  register(userDto: CreateUserDto) {
    return 'This action adds a new auth';
  }

  logout(userDto: CreateUserDto) {
    return 'This action adds a new auth';
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
