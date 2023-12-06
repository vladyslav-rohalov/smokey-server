import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1701721062049 implements MigrationInterface {
    name = 'Auto1701721062049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "a" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "a"`);
    }

}
