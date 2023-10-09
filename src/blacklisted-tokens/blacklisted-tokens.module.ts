import { Module } from '@nestjs/common';
import { BlacklistedTokensService } from './blacklisted-tokens.service';
import { BlacklistedToken } from './entities/blacklisted-token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [BlacklistedTokensService],
  imports: [TypeOrmModule.forFeature([BlacklistedToken])],
  exports: [BlacklistedTokensService],
})
export class BlacklistedTokensModule {}
