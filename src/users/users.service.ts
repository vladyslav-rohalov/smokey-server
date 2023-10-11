import { Injectable, NotFoundException } from '@nestjs/common';
import { ConflictException } from '@nestjs/common/exceptions';
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
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['address'],
    });
    return {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        address: {
          city: user.address.city,
          street: user.address.street,
          house: user.address.house,
          apartment: user.address.apartment,
        },
      },
    };
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: email },
      relations: ['address'],
    });
    return user;
  }

  async update(
    authenticatedUserId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<IAuthResponse> {
    const user = await this.userRepository.findOne({
      where: { id: authenticatedUserId },
    });
    // const user = await this.findOneByID(authenticatedUserId);

    if (!user) {
      throw new NotFoundException(
        `User with ID ${authenticatedUserId} not found`,
      );
    }

    const isTwin = await this.findOneByEmail(updateUserDto.email);
    if (isTwin) {
      if (isTwin.email !== user.email) {
        throw new ConflictException('This email is already in use');
      }
    }

    await this.userRepository.update(user.id, updateUserDto);
    // const updatedUser = await this.userRepository.findOneBy({ id: user.id });
    const updatedUser = await this.findOneByID(user.id);
    return updatedUser;
    // return {
    //   user: {
    //     firstName: updatedUser.firstName,
    //     lastName: updatedUser.lastName,
    //     phone: updatedUser.phone,
    //     email: updatedUser.email,
    //     address: {
    //       city: user.address.city,
    //       street: user.address.street,
    //       house: user.address.house,
    //       apartment: user.address.apartment,
    //     },
    //   },
    // };
  }

  async remove(authenticatedUserId: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: authenticatedUserId },
    });

    if (!user) {
      throw new NotFoundException(
        `User with ID ${authenticatedUserId} not found`,
      );
    }

    await this.userRepository.remove(user);
  }
}
