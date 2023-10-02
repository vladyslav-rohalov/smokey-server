import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  login(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  register(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findOne(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
