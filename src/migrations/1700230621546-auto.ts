import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1700230621546 implements MigrationInterface {
    name = 'Auto1700230621546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_cbfb19ddc0218b26522f9fea2eb"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_cbfb19ddc0218b26522f9fea2eb"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cart_id"`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "UQ_f091e86a234693a49084b4c2c86" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_f091e86a234693a49084b4c2c86" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_f091e86a234693a49084b4c2c86"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "UQ_f091e86a234693a49084b4c2c86"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "cart_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_cbfb19ddc0218b26522f9fea2eb" UNIQUE ("cart_id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_cbfb19ddc0218b26522f9fea2eb" FOREIGN KEY ("cart_id") REFERENCES "cart"("cart_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
