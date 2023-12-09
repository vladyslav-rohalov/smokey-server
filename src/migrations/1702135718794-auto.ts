import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1702135718794 implements MigrationInterface {
    name = 'Auto1702135718794'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "v_code" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isVerify" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isVerify"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "v_code"`);
    }

}
