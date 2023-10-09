import { Injectable, NotFoundException } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.save(createUserDto);
    return user;
  }

  async findOneByID(id: number): Promise<{ email: string }> {
    const user = await this.userRepository.findOneBy({ id });
    return { email: user.email };
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }

  async update(
    id: number,
    authenticatedUserId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<{
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  }> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (authenticatedUserId !== user.id) {
      throw new UnauthorizedException(`You can only update your own profile`);
    }

    await this.userRepository.update(id, updateUserDto);

    return {
      firstName: updateUserDto.firstName,
      lastName: updateUserDto.lastName,
      phone: updateUserDto.phone,
      email: updateUserDto.email,
    };
  }

  async remove(id: number, authenticatedUserId: number): Promise<void> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (authenticatedUserId !== user.id) {
      throw new UnauthorizedException(`You can only update your own profile`);
    }

    await this.userRepository.remove(user);
  }
}
