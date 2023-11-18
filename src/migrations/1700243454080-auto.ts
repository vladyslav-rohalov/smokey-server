import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1700243454080 implements MigrationInterface {
    name = 'Auto1700243454080'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "updatedAt"`);
    }

}
