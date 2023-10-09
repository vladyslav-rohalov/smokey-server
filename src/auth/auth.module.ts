import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { BlacklistedTokensModule } from 'src/blacklisted-tokens/blacklisted-tokens.module';
import { forwardRef } from '@nestjs/common/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    BlacklistedTokensModule,
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
