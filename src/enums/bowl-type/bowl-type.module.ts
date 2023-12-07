import { Module, forwardRef } from '@nestjs/common';
import { BowlTypeService } from './bowl-type.service';
import { BowlTypeController } from './bowl-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BowlType } from './entities/bowl-type.entity';
import { JwtModule } from '@nestjs/jwt/dist';
import { AuthModule } from 'src/auth/auth.module';
import { BlacklistedTokensModule } from 'src/blacklisted-tokens/blacklisted-tokens.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BowlType, JwtModule]),
    forwardRef(() => AuthModule),
    BlacklistedTokensModule,
  ],
  controllers: [BowlTypeController],
  providers: [BowlTypeService],
  exports: [BowlTypeService],
})
export class BowlTypeModule {}
