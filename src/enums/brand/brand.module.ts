import { Module, forwardRef } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { JwtModule } from '@nestjs/jwt/dist';
import { AuthModule } from '../../auth/auth.module';
import { BlacklistedTokensModule } from '../../blacklisted-tokens/blacklisted-tokens.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Brand, JwtModule]),
    forwardRef(() => AuthModule),
    BlacklistedTokensModule,
  ],
  controllers: [BrandController],
  providers: [BrandService],
  exports: [BrandService],
})
export class BrandModule {}
