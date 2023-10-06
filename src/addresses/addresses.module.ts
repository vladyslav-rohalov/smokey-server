import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { User } from 'src/users/entities/user.entity';
import { Address } from './entities/address.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AddressesController],
  providers: [AddressesService],
  imports: [TypeOrmModule.forFeature([User, Address])],
})
export class AddressesModule {}
