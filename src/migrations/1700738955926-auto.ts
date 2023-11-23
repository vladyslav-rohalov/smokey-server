import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1700738955926 implements MigrationInterface {
    name = 'Auto1700738955926'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "text"`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "text" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "text"`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "text" character varying NOT NULL`);
    }

}
