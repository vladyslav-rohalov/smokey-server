import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.save(createUserDto);
    return user;
  }

  async findOneByID(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }
  // async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
  //   const user = await this.userRepository.findOneBy({ id });

  //   if (!user) {
  //     throw new NotFoundException(`User with ID ${id} not found`);
  //   }

  //   await this.userRepository.update(id, updateUserDto);

  //   return await this.userRepository.findOneBy({ id });
  // }

  // async remove(id: number): Promise<void> {
  //   const user = await this.userRepository.findOneBy({ id });

  //   if (!user) {
  //     throw new NotFoundException(`User with ID ${id} not found`);
  //   }

  //   await this.userRepository.remove(user);
  // }
}
