import { Module, forwardRef } from '@nestjs/common';
import { AccessoryTypeService } from './accessory-type.service';
import { AccessoryTypeController } from './accessory-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessoryType } from './entities/accessory-type.entity';
import { JwtModule } from '@nestjs/jwt/dist';
import { AuthModule } from '../../auth/auth.module';
import { BlacklistedTokensModule } from '../../blacklisted-tokens/blacklisted-tokens.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccessoryType, JwtModule]),
    forwardRef(() => AuthModule),
    BlacklistedTokensModule,
  ],
  controllers: [AccessoryTypeController],
  providers: [AccessoryTypeService],
  exports: [AccessoryTypeService],
})
export class AccessoryTypeModule {}
