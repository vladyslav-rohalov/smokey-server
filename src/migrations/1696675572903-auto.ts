import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1696675572903 implements MigrationInterface {
    name = 'Auto1696675572903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hookah_products" ("product_id" integer NOT NULL, "hookah_id" integer NOT NULL, CONSTRAINT "PK_e841e5e2caa7edad4d0b88b0f78" PRIMARY KEY ("product_id", "hookah_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_81d6396dc3be5c72c897500297" ON "hookah_products" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_0e1640fd24ae7c4afa190fe35c" ON "hookah_products" ("hookah_id") `);
        await queryRunner.query(`ALTER TABLE "hookah_products" ADD CONSTRAINT "FK_81d6396dc3be5c72c8975002976" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "hookah_products" ADD CONSTRAINT "FK_0e1640fd24ae7c4afa190fe35cf" FOREIGN KEY ("hookah_id") REFERENCES "hookahs"("hookah_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hookah_products" DROP CONSTRAINT "FK_0e1640fd24ae7c4afa190fe35cf"`);
        await queryRunner.query(`ALTER TABLE "hookah_products" DROP CONSTRAINT "FK_81d6396dc3be5c72c8975002976"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0e1640fd24ae7c4afa190fe35c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_81d6396dc3be5c72c897500297"`);
        await queryRunner.query(`DROP TABLE "hookah_products"`);
    }

}
