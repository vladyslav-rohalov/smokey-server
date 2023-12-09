import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1702139156966 implements MigrationInterface {
    name = 'Auto1702139156966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "v_code"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "v_code" character varying array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "v_code"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "v_code" character varying`);
    }

}
