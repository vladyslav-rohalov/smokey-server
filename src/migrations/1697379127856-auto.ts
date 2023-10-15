import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1697379127856 implements MigrationInterface {
    name = 'Auto1697379127856'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tobacco" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "tobacco" ADD "weight" smallint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tobacco" DROP COLUMN "strength"`);
        await queryRunner.query(`ALTER TABLE "tobacco" ADD "strength" smallint`);
        await queryRunner.query(`ALTER TABLE "coals" DROP COLUMN "size"`);
        await queryRunner.query(`ALTER TABLE "coals" ADD "size" smallint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coals" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "coals" ADD "weight" smallint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "available"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "available" smallint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "rating" smallint`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "rating" integer`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "available"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "available" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coals" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "coals" ADD "weight" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coals" DROP COLUMN "size"`);
        await queryRunner.query(`ALTER TABLE "coals" ADD "size" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tobacco" DROP COLUMN "strength"`);
        await queryRunner.query(`ALTER TABLE "tobacco" ADD "strength" integer`);
        await queryRunner.query(`ALTER TABLE "tobacco" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "tobacco" ADD "weight" integer NOT NULL`);
    }

}
