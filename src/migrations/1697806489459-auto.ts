import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1697806489459 implements MigrationInterface {
    name = 'Auto1697806489459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hookah_size" RENAME COLUMN "name" TO "hookah_size"`);
        await queryRunner.query(`ALTER TABLE "hookah_size" RENAME CONSTRAINT "UQ_817228af321cc246642cc7d5f89" TO "UQ_356d613ccb5c7533c59b7195df0"`);
        await queryRunner.query(`ALTER TABLE "flavor" RENAME COLUMN "name" TO "flavor"`);
        await queryRunner.query(`ALTER TABLE "flavor" RENAME CONSTRAINT "UQ_bce5a5c9651284fafcc234b163d" TO "UQ_72e2d2417abf01749c4e5ef0112"`);
        await queryRunner.query(`ALTER TABLE "type" RENAME COLUMN "name" TO "type"`);
        await queryRunner.query(`ALTER TABLE "type" RENAME CONSTRAINT "UQ_e23bfe7255ada131861292923fe" TO "UQ_4b57d1a790cf6f015abc50a60ea"`);
        await queryRunner.query(`ALTER TABLE "bowl_type" RENAME COLUMN "name" TO "bowl_type"`);
        await queryRunner.query(`ALTER TABLE "bowl_type" RENAME CONSTRAINT "UQ_efa90d06cc401fe1699718c65c6" TO "UQ_3b6ec5573a162ed20bcea7f72d4"`);
        await queryRunner.query(`ALTER TABLE "promotion" RENAME COLUMN "name" TO "promotion"`);
        await queryRunner.query(`ALTER TABLE "promotion" RENAME CONSTRAINT "UQ_7dc10a09d1f198907d448e67425" TO "UQ_fccfb3da569a54b14e8bc30e691"`);
        await queryRunner.query(`ALTER TABLE "brand" RENAME COLUMN "name" TO "brand"`);
        await queryRunner.query(`ALTER TABLE "brand" RENAME CONSTRAINT "UQ_5f468ae5696f07da025138e38f7" TO "UQ_dacc9dfd4016665713b08cada6e"`);
        await queryRunner.query(`ALTER TABLE "color" DROP CONSTRAINT "UQ_229c1a96f14d7187fccf3684ecc"`);
        await queryRunner.query(`ALTER TABLE "color" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "color" DROP CONSTRAINT "UQ_782fbcc380e890d7f74e829b459"`);
        await queryRunner.query(`ALTER TABLE "color" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "color" ADD "color" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "color" ADD CONSTRAINT "UQ_4c5e2e3621137be6eac8c269aa6" UNIQUE ("color")`);
        await queryRunner.query(`ALTER TABLE "color" ADD "color_value" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "color" ADD CONSTRAINT "UQ_81cef064826e8db0a8b5804d0e7" UNIQUE ("color_value")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "color" DROP CONSTRAINT "UQ_81cef064826e8db0a8b5804d0e7"`);
        await queryRunner.query(`ALTER TABLE "color" DROP COLUMN "color_value"`);
        await queryRunner.query(`ALTER TABLE "color" DROP CONSTRAINT "UQ_4c5e2e3621137be6eac8c269aa6"`);
        await queryRunner.query(`ALTER TABLE "color" DROP COLUMN "color"`);
        await queryRunner.query(`ALTER TABLE "color" ADD "value" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "color" ADD CONSTRAINT "UQ_782fbcc380e890d7f74e829b459" UNIQUE ("value")`);
        await queryRunner.query(`ALTER TABLE "color" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "color" ADD CONSTRAINT "UQ_229c1a96f14d7187fccf3684ecc" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "brand" RENAME CONSTRAINT "UQ_dacc9dfd4016665713b08cada6e" TO "UQ_5f468ae5696f07da025138e38f7"`);
        await queryRunner.query(`ALTER TABLE "brand" RENAME COLUMN "brand" TO "name"`);
        await queryRunner.query(`ALTER TABLE "promotion" RENAME CONSTRAINT "UQ_fccfb3da569a54b14e8bc30e691" TO "UQ_7dc10a09d1f198907d448e67425"`);
        await queryRunner.query(`ALTER TABLE "promotion" RENAME COLUMN "promotion" TO "name"`);
        await queryRunner.query(`ALTER TABLE "bowl_type" RENAME CONSTRAINT "UQ_3b6ec5573a162ed20bcea7f72d4" TO "UQ_efa90d06cc401fe1699718c65c6"`);
        await queryRunner.query(`ALTER TABLE "bowl_type" RENAME COLUMN "bowl_type" TO "name"`);
        await queryRunner.query(`ALTER TABLE "type" RENAME CONSTRAINT "UQ_4b57d1a790cf6f015abc50a60ea" TO "UQ_e23bfe7255ada131861292923fe"`);
        await queryRunner.query(`ALTER TABLE "type" RENAME COLUMN "type" TO "name"`);
        await queryRunner.query(`ALTER TABLE "flavor" RENAME CONSTRAINT "UQ_72e2d2417abf01749c4e5ef0112" TO "UQ_bce5a5c9651284fafcc234b163d"`);
        await queryRunner.query(`ALTER TABLE "flavor" RENAME COLUMN "flavor" TO "name"`);
        await queryRunner.query(`ALTER TABLE "hookah_size" RENAME CONSTRAINT "UQ_356d613ccb5c7533c59b7195df0" TO "UQ_817228af321cc246642cc7d5f89"`);
        await queryRunner.query(`ALTER TABLE "hookah_size" RENAME COLUMN "hookah_size" TO "name"`);
    }

}
