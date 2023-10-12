import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1697128012526 implements MigrationInterface {
    name = 'Auto1697128012526'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tobacco" ADD "product_id" integer`);
        await queryRunner.query(`ALTER TABLE "tobacco" ADD CONSTRAINT "UQ_03deed724e7e7928d838e95b4c4" UNIQUE ("product_id")`);
        await queryRunner.query(`ALTER TABLE "tobacco" ADD CONSTRAINT "FK_03deed724e7e7928d838e95b4c4" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tobacco" DROP CONSTRAINT "FK_03deed724e7e7928d838e95b4c4"`);
        await queryRunner.query(`ALTER TABLE "tobacco" DROP CONSTRAINT "UQ_03deed724e7e7928d838e95b4c4"`);
        await queryRunner.query(`ALTER TABLE "tobacco" DROP COLUMN "product_id"`);
    }

}
