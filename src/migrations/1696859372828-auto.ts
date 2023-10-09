import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1696859372828 implements MigrationInterface {
    name = 'Auto1696859372828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blacklisted-tokens" DROP COLUMN "createdAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blacklisted-tokens" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
