import { Injectable, NotFoundException } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IAuthResponse } from 'src/lib/interfaces';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.save(createUserDto);
    return user;
  }

  async findOneByID(id: number): Promise<IAuthResponse> {
    const user = await this.userRepository.findOneBy({ id });
    return {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
      },
    };
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }

  async update(
    authenticatedUserId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<IAuthResponse> {
    const user = await this.userRepository.findOneBy({
      id: authenticatedUserId,
    });

    if (!user) {
      throw new NotFoundException(
        `User with ID ${authenticatedUserId} not found`,
      );
    }

    await this.userRepository.update(user.id, updateUserDto);
    const updatedUser = await this.userRepository.findOneBy({ id: user.id });

    return {
      user: {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        phone: updatedUser.phone,
        email: updatedUser.email,
      },
    };
  }

  async remove(authenticatedUserId: number): Promise<void> {
    const user = await this.userRepository.findOneBy({
      id: authenticatedUserId,
    });

    if (!user) {
      throw new NotFoundException(
        `User with ID ${authenticatedUserId} not found`,
      );
    }

    await this.userRepository.remove(user);
  }
}
