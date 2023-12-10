import { Module, forwardRef } from '@nestjs/common';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Color } from './entities/color.entity';
import { JwtModule } from '@nestjs/jwt/dist';
import { AuthModule } from '../../auth/auth.module';
import { BlacklistedTokensModule } from '../../blacklisted-tokens/blacklisted-tokens.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Color, JwtModule]),
    forwardRef(() => AuthModule),
    BlacklistedTokensModule,
  ],
  controllers: [ColorController],
  providers: [ColorService],
})
export class ColorModule {}
