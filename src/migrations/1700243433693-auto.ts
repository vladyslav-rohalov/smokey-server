import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1700243433693 implements MigrationInterface {
    name = 'Auto1700243433693'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "updatedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
