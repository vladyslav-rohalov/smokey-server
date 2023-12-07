import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1701962620469 implements MigrationInterface {
    name = 'Auto1701962620469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "googleId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "googleId"`);
    }

}
