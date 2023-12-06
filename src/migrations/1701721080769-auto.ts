import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1701721080769 implements MigrationInterface {
    name = 'Auto1701721080769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "a"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "a" character varying`);
    }

}
