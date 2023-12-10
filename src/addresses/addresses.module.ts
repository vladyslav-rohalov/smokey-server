import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { User } from '../users/entities/user.entity';
import { Address } from './entities/address.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [AddressesService],
  imports: [TypeOrmModule.forFeature([User, Address])],
  exports: [AddressesService],
})
export class AddressesModule {}
