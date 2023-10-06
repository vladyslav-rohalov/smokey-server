import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1696620579477 implements MigrationInterface {
    name = 'Auto1696620579477'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastName"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "lastName" character varying NOT NULL`);
    }

}
