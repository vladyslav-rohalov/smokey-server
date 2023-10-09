import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1696854716928 implements MigrationInterface {
    name = 'Auto1696854716928'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blacklisted-tokens_users_users" DROP CONSTRAINT "FK_99516c57034b9a0b937e771ac45"`);
        await queryRunner.query(`ALTER TABLE "users_bl_token_blacklisted-tokens" DROP CONSTRAINT "FK_d2ddf36b480d76aa2adf7c7f86b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_99516c57034b9a0b937e771ac4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d2ddf36b480d76aa2adf7c7f86"`);
        await queryRunner.query(`ALTER TABLE "blacklisted-tokens" RENAME COLUMN "blacklisted_token_id" TO "bltoken_id"`);
        await queryRunner.query(`ALTER TABLE "blacklisted-tokens" RENAME CONSTRAINT "PK_0e3a58b3fa0288bb8b970d3a61c" TO "PK_6efbda8d1e53becf35bd9f0b7ca"`);
        await queryRunner.query(`ALTER SEQUENCE "blacklisted-tokens_blacklisted_token_id_seq" RENAME TO "blacklisted-tokens_bltoken_id_seq"`);
        await queryRunner.query(`ALTER TABLE "blacklisted-tokens_users_users" RENAME COLUMN "blacklistedTokensBlacklistedTokenId" TO "blacklistedTokensBltokenId"`);
        await queryRunner.query(`ALTER TABLE "blacklisted-tokens_users_users" RENAME CONSTRAINT "PK_e246dd3fe7f17cb4084f58bf0e8" TO "PK_bbd730c2ad0f910f04d7fd6f61a"`);
        await queryRunner.query(`ALTER TABLE "users_bl_token_blacklisted-tokens" RENAME COLUMN "blacklistedTokensBlacklistedTokenId" TO "blacklistedTokensBltokenId"`);
        await queryRunner.query(`ALTER TABLE "users_bl_token_blacklisted-tokens" RENAME CONSTRAINT "PK_66e2727f8f2bc059c71bf2f5d2a" TO "PK_ff6a45418e78bd55ef70ce502c9"`);
        await queryRunner.query(`CREATE INDEX "IDX_f52283bf001ae741190dfcde26" ON "blacklisted-tokens_users_users" ("blacklistedTokensBltokenId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8b1e1d41ae751c1b46fe4c9ebf" ON "users_bl_token_blacklisted-tokens" ("blacklistedTokensBltokenId") `);
        await queryRunner.query(`ALTER TABLE "blacklisted-tokens_users_users" ADD CONSTRAINT "FK_f52283bf001ae741190dfcde26a" FOREIGN KEY ("blacklistedTokensBltokenId") REFERENCES "blacklisted-tokens"("bltoken_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_bl_token_blacklisted-tokens" ADD CONSTRAINT "FK_8b1e1d41ae751c1b46fe4c9ebfc" FOREIGN KEY ("blacklistedTokensBltokenId") REFERENCES "blacklisted-tokens"("bltoken_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_bl_token_blacklisted-tokens" DROP CONSTRAINT "FK_8b1e1d41ae751c1b46fe4c9ebfc"`);
        await queryRunner.query(`ALTER TABLE "blacklisted-tokens_users_users" DROP CONSTRAINT "FK_f52283bf001ae741190dfcde26a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8b1e1d41ae751c1b46fe4c9ebf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f52283bf001ae741190dfcde26"`);
        await queryRunner.query(`ALTER TABLE "users_bl_token_blacklisted-tokens" RENAME CONSTRAINT "PK_ff6a45418e78bd55ef70ce502c9" TO "PK_66e2727f8f2bc059c71bf2f5d2a"`);
        await queryRunner.query(`ALTER TABLE "users_bl_token_blacklisted-tokens" RENAME COLUMN "blacklistedTokensBltokenId" TO "blacklistedTokensBlacklistedTokenId"`);
        await queryRunner.query(`ALTER TABLE "blacklisted-tokens_users_users" RENAME CONSTRAINT "PK_bbd730c2ad0f910f04d7fd6f61a" TO "PK_e246dd3fe7f17cb4084f58bf0e8"`);
        await queryRunner.query(`ALTER TABLE "blacklisted-tokens_users_users" RENAME COLUMN "blacklistedTokensBltokenId" TO "blacklistedTokensBlacklistedTokenId"`);
        await queryRunner.query(`ALTER SEQUENCE "blacklisted-tokens_bltoken_id_seq" RENAME TO "blacklisted-tokens_blacklisted_token_id_seq"`);
        await queryRunner.query(`ALTER TABLE "blacklisted-tokens" RENAME CONSTRAINT "PK_6efbda8d1e53becf35bd9f0b7ca" TO "PK_0e3a58b3fa0288bb8b970d3a61c"`);
        await queryRunner.query(`ALTER TABLE "blacklisted-tokens" RENAME COLUMN "bltoken_id" TO "blacklisted_token_id"`);
        await queryRunner.query(`CREATE INDEX "IDX_d2ddf36b480d76aa2adf7c7f86" ON "users_bl_token_blacklisted-tokens" ("blacklistedTokensBlacklistedTokenId") `);
        await queryRunner.query(`CREATE INDEX "IDX_99516c57034b9a0b937e771ac4" ON "blacklisted-tokens_users_users" ("blacklistedTokensBlacklistedTokenId") `);
        await queryRunner.query(`ALTER TABLE "users_bl_token_blacklisted-tokens" ADD CONSTRAINT "FK_d2ddf36b480d76aa2adf7c7f86b" FOREIGN KEY ("blacklistedTokensBlacklistedTokenId") REFERENCES "blacklisted-tokens"("blacklisted_token_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blacklisted-tokens_users_users" ADD CONSTRAINT "FK_99516c57034b9a0b937e771ac45" FOREIGN KEY ("blacklistedTokensBlacklistedTokenId") REFERENCES "blacklisted-tokens"("blacklisted_token_id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
