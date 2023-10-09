import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1696854561123 implements MigrationInterface {
    name = 'Auto1696854561123'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "blacklisted-tokens_users_users" ("blacklistedTokensBlacklistedTokenId" integer NOT NULL, "usersUserId" integer NOT NULL, CONSTRAINT "PK_e246dd3fe7f17cb4084f58bf0e8" PRIMARY KEY ("blacklistedTokensBlacklistedTokenId", "usersUserId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_99516c57034b9a0b937e771ac4" ON "blacklisted-tokens_users_users" ("blacklistedTokensBlacklistedTokenId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4e86c82397c0f35feda2a1d934" ON "blacklisted-tokens_users_users" ("usersUserId") `);
        await queryRunner.query(`CREATE TABLE "users_bl_token_blacklisted-tokens" ("usersUserId" integer NOT NULL, "blacklistedTokensBlacklistedTokenId" integer NOT NULL, CONSTRAINT "PK_66e2727f8f2bc059c71bf2f5d2a" PRIMARY KEY ("usersUserId", "blacklistedTokensBlacklistedTokenId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c2390efd1220fc369108a9ac00" ON "users_bl_token_blacklisted-tokens" ("usersUserId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d2ddf36b480d76aa2adf7c7f86" ON "users_bl_token_blacklisted-tokens" ("blacklistedTokensBlacklistedTokenId") `);
        await queryRunner.query(`ALTER TABLE "blacklisted-tokens_users_users" ADD CONSTRAINT "FK_99516c57034b9a0b937e771ac45" FOREIGN KEY ("blacklistedTokensBlacklistedTokenId") REFERENCES "blacklisted-tokens"("blacklisted_token_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "blacklisted-tokens_users_users" ADD CONSTRAINT "FK_4e86c82397c0f35feda2a1d934d" FOREIGN KEY ("usersUserId") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_bl_token_blacklisted-tokens" ADD CONSTRAINT "FK_c2390efd1220fc369108a9ac00c" FOREIGN KEY ("usersUserId") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_bl_token_blacklisted-tokens" ADD CONSTRAINT "FK_d2ddf36b480d76aa2adf7c7f86b" FOREIGN KEY ("blacklistedTokensBlacklistedTokenId") REFERENCES "blacklisted-tokens"("blacklisted_token_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_bl_token_blacklisted-tokens" DROP CONSTRAINT "FK_d2ddf36b480d76aa2adf7c7f86b"`);
        await queryRunner.query(`ALTER TABLE "users_bl_token_blacklisted-tokens" DROP CONSTRAINT "FK_c2390efd1220fc369108a9ac00c"`);
        await queryRunner.query(`ALTER TABLE "blacklisted-tokens_users_users" DROP CONSTRAINT "FK_4e86c82397c0f35feda2a1d934d"`);
        await queryRunner.query(`ALTER TABLE "blacklisted-tokens_users_users" DROP CONSTRAINT "FK_99516c57034b9a0b937e771ac45"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d2ddf36b480d76aa2adf7c7f86"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c2390efd1220fc369108a9ac00"`);
        await queryRunner.query(`DROP TABLE "users_bl_token_blacklisted-tokens"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4e86c82397c0f35feda2a1d934"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_99516c57034b9a0b937e771ac4"`);
        await queryRunner.query(`DROP TABLE "blacklisted-tokens_users_users"`);
    }

}
