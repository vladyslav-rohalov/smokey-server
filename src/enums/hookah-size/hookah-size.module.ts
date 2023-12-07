import { Module, forwardRef } from '@nestjs/common';
import { HookahSizeService } from './hookah-size.service';
import { HookahSizeController } from './hookah-size.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HookahSize } from './entities/hookah-size.entity';
import { JwtModule } from '@nestjs/jwt/dist';
import { AuthModule } from 'src/auth/auth.module';
import { BlacklistedTokensModule } from 'src/blacklisted-tokens/blacklisted-tokens.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([HookahSize, JwtModule]),
    forwardRef(() => AuthModule),
    BlacklistedTokensModule,
  ],
  controllers: [HookahSizeController],
  providers: [HookahSizeService],
  exports: [HookahSizeService],
})
export class HookahSizeModule {}
