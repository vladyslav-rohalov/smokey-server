import { Module, forwardRef } from '@nestjs/common';
import { FlavorService } from './flavor.service';
import { FlavorController } from './flavor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flavor } from './entities/flavor.entity';
import { JwtModule } from '@nestjs/jwt/dist';
import { AuthModule } from '../../auth/auth.module';
import { BlacklistedTokensModule } from '../../blacklisted-tokens/blacklisted-tokens.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Flavor, JwtModule]),
    forwardRef(() => AuthModule),
    BlacklistedTokensModule,
  ],
  controllers: [FlavorController],
  providers: [FlavorService],
  exports: [FlavorService],
})
export class FlavorModule {}
