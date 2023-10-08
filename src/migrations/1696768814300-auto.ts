import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1696768814300 implements MigrationInterface {
    name = 'Auto1696768814300'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "token" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "token"`);
    }

}
