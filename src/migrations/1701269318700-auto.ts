import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1701269318700 implements MigrationInterface {
    name = 'Auto1701269318700'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_items" DROP COLUMN "buyingPrice"`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD "buyingPrice" numeric(7,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_items" DROP COLUMN "buyingPrice"`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD "buyingPrice" integer NOT NULL`);
    }

}
