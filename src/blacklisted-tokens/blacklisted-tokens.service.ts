import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { BlacklistedToken } from './entities/blacklisted-token.entity';
import { schedule } from 'node-cron';

@Injectable()
export class BlacklistedTokensService {
  constructor(private readonly entityManager: EntityManager) {
    const job = schedule('0 3 * * *', async () => {
      await this.clearExpiredTokens();
    });
    job.start();
  }

  async blacklistToken(token: string): Promise<void> {
    const newToken = this.entityManager.create(BlacklistedToken, { token });
    await this.entityManager.save(newToken);
  }

  async isBlacklistedToken(token: string): Promise<boolean> {
    const isExist = await this.entityManager.findOneBy(BlacklistedToken, {
      token,
    });
    return !!isExist;
  }

  async clearExpiredTokens(): Promise<void> {
    const now = new Date();
    now.setDate(now.getDate() - 1);

    await this.entityManager
      .createQueryBuilder()
      .delete()
      .from(BlacklistedToken)
      .where('createdAt <= :expirationDate', { expirationDate: now })
      .execute();
  }
}
