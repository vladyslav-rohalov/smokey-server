import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1696775733771 implements MigrationInterface {
    name = 'Auto1696775733771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "token"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "token" character varying NOT NULL`);
    }

}
