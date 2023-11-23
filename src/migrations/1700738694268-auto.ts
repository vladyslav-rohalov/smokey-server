import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1700738694268 implements MigrationInterface {
    name = 'Auto1700738694268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" ALTER COLUMN "images" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" ALTER COLUMN "images" SET NOT NULL`);
    }

}
