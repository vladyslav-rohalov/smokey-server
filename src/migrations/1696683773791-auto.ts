import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1696683773791 implements MigrationInterface {
    name = 'Auto1696683773791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "amount" TO "quantity"`);
        await queryRunner.query(`CREATE TABLE "order_items" ("item_id" SERIAL NOT NULL, "quantity" integer NOT NULL, "buyingPrice" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "orderId" integer, "productId" integer, CONSTRAINT "PK_de591fd3dc04191ab115c03eab1" PRIMARY KEY ("item_id"))`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_f1d359a55923bb45b057fbdab0d" FOREIGN KEY ("orderId") REFERENCES "orders"("order_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_cdb99c05982d5191ac8465ac010" FOREIGN KEY ("productId") REFERENCES "products"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_cdb99c05982d5191ac8465ac010"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_f1d359a55923bb45b057fbdab0d"`);
        await queryRunner.query(`DROP TABLE "order_items"`);
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "quantity" TO "amount"`);
    }

}
