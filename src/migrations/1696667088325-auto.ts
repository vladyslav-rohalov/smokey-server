import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1696667088325 implements MigrationInterface {
    name = 'Auto1696667088325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_f091e86a234693a49084b4c2c86"`);
        await queryRunner.query(`ALTER TABLE "cart" RENAME COLUMN "user_id" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "cart" RENAME CONSTRAINT "UQ_f091e86a234693a49084b4c2c86" TO "UQ_756f53ab9466eb52a52619ee019"`);
        await queryRunner.query(`CREATE TYPE "public"."orders_status_enum" AS ENUM('order pending', 'order processing', 'order shipped', 'order completed', 'corder cancelled')`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "status" "public"."orders_status_enum" NOT NULL DEFAULT 'order pending'`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "UQ_756f53ab9466eb52a52619ee019"`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "UQ_756f53ab9466eb52a52619ee019" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
        await queryRunner.query(`ALTER TABLE "cart" RENAME CONSTRAINT "UQ_756f53ab9466eb52a52619ee019" TO "UQ_f091e86a234693a49084b4c2c86"`);
        await queryRunner.query(`ALTER TABLE "cart" RENAME COLUMN "userId" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_f091e86a234693a49084b4c2c86" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
