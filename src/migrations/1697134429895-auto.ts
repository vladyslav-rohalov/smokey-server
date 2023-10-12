import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1697134429895 implements MigrationInterface {
    name = 'Auto1697134429895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tobacco" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "tobacco" DROP COLUMN "updatedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tobacco" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tobacco" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
