import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1701867595745 implements MigrationInterface {
    name = 'Auto1701867595745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "cart_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_cbfb19ddc0218b26522f9fea2eb" UNIQUE ("cart_id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_cbfb19ddc0218b26522f9fea2eb" FOREIGN KEY ("cart_id") REFERENCES "cart"("cart_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_cbfb19ddc0218b26522f9fea2eb"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_cbfb19ddc0218b26522f9fea2eb"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cart_id"`);
    }

}
