import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1696854226783 implements MigrationInterface {
    name = 'Auto1696854226783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blacklisted-tokens" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "blacklisted-tokens" DROP COLUMN "token"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blacklisted-tokens" ADD "token" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blacklisted-tokens" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
