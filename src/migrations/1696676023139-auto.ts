import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1696676023139 implements MigrationInterface {
    name = 'Auto1696676023139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tobacco_products" ("product_id" integer NOT NULL, "tobacco_id" integer NOT NULL, CONSTRAINT "PK_4d461d358ea812dd696feda39d0" PRIMARY KEY ("product_id", "tobacco_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4ae51dfb3786423480ce2433f0" ON "tobacco_products" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_04c89bdb75c508cff5c749532b" ON "tobacco_products" ("tobacco_id") `);
        await queryRunner.query(`CREATE TABLE "coals_products" ("product_id" integer NOT NULL, "coal_id" integer NOT NULL, CONSTRAINT "PK_ed87c3e7a2593e119ac1e2e6b08" PRIMARY KEY ("product_id", "coal_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1c95256f3f75babc11eb89dee5" ON "coals_products" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_dd5fb936918fd91df1fd796f1c" ON "coals_products" ("coal_id") `);
        await queryRunner.query(`CREATE TABLE "accessories_products" ("product_id" integer NOT NULL, "accessory_id" integer NOT NULL, CONSTRAINT "PK_c1d630591dc2d06060b49b15c70" PRIMARY KEY ("product_id", "accessory_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_37a30187a16fac812d02bc742b" ON "accessories_products" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_d71b6d5ed74f949460295daa0e" ON "accessories_products" ("accessory_id") `);
        await queryRunner.query(`ALTER TABLE "tobacco_products" ADD CONSTRAINT "FK_4ae51dfb3786423480ce2433f01" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tobacco_products" ADD CONSTRAINT "FK_04c89bdb75c508cff5c749532b8" FOREIGN KEY ("tobacco_id") REFERENCES "tobacco"("tobacco_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coals_products" ADD CONSTRAINT "FK_1c95256f3f75babc11eb89dee53" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "coals_products" ADD CONSTRAINT "FK_dd5fb936918fd91df1fd796f1c8" FOREIGN KEY ("coal_id") REFERENCES "coals"("tobacco_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accessories_products" ADD CONSTRAINT "FK_37a30187a16fac812d02bc742b0" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "accessories_products" ADD CONSTRAINT "FK_d71b6d5ed74f949460295daa0e8" FOREIGN KEY ("accessory_id") REFERENCES "accessories"("accessory_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accessories_products" DROP CONSTRAINT "FK_d71b6d5ed74f949460295daa0e8"`);
        await queryRunner.query(`ALTER TABLE "accessories_products" DROP CONSTRAINT "FK_37a30187a16fac812d02bc742b0"`);
        await queryRunner.query(`ALTER TABLE "coals_products" DROP CONSTRAINT "FK_dd5fb936918fd91df1fd796f1c8"`);
        await queryRunner.query(`ALTER TABLE "coals_products" DROP CONSTRAINT "FK_1c95256f3f75babc11eb89dee53"`);
        await queryRunner.query(`ALTER TABLE "tobacco_products" DROP CONSTRAINT "FK_04c89bdb75c508cff5c749532b8"`);
        await queryRunner.query(`ALTER TABLE "tobacco_products" DROP CONSTRAINT "FK_4ae51dfb3786423480ce2433f01"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d71b6d5ed74f949460295daa0e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_37a30187a16fac812d02bc742b"`);
        await queryRunner.query(`DROP TABLE "accessories_products"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dd5fb936918fd91df1fd796f1c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1c95256f3f75babc11eb89dee5"`);
        await queryRunner.query(`DROP TABLE "coals_products"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_04c89bdb75c508cff5c749532b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4ae51dfb3786423480ce2433f0"`);
        await queryRunner.query(`DROP TABLE "tobacco_products"`);
    }

}
