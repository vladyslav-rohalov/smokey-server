import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1697803850548 implements MigrationInterface {
    name = 'Auto1697803850548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tobacco" RENAME COLUMN "flavor" TO "flavor_id"`);
        await queryRunner.query(`CREATE TABLE "hookah_size" ("hookah_size_id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_817228af321cc246642cc7d5f89" UNIQUE ("name"), CONSTRAINT "PK_2d0076080be85d0a115c1dda150" PRIMARY KEY ("hookah_size_id"))`);
        await queryRunner.query(`CREATE TABLE "color" ("color_id" SERIAL NOT NULL, "name" character varying NOT NULL, "value" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_229c1a96f14d7187fccf3684ecc" UNIQUE ("name"), CONSTRAINT "UQ_782fbcc380e890d7f74e829b459" UNIQUE ("value"), CONSTRAINT "PK_25ee6a7dc7b5899a226a831e539" PRIMARY KEY ("color_id"))`);
        await queryRunner.query(`CREATE TABLE "flavor" ("flavor_id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_bce5a5c9651284fafcc234b163d" UNIQUE ("name"), CONSTRAINT "PK_0eeb76bb6c5393b5b82c47fa9d2" PRIMARY KEY ("flavor_id"))`);
        await queryRunner.query(`CREATE TABLE "type" ("type_id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e23bfe7255ada131861292923fe" UNIQUE ("name"), CONSTRAINT "PK_5baefb525328568515ffa7cce29" PRIMARY KEY ("type_id"))`);
        await queryRunner.query(`CREATE TABLE "bowl_type" ("bowl_type_id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_efa90d06cc401fe1699718c65c6" UNIQUE ("name"), CONSTRAINT "PK_d48347aad31b8149c8b7a0fa18b" PRIMARY KEY ("bowl_type_id"))`);
        await queryRunner.query(`CREATE TABLE "promotion" ("promotion_id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_7dc10a09d1f198907d448e67425" UNIQUE ("name"), CONSTRAINT "PK_1227013bca6804cf7c972526721" PRIMARY KEY ("promotion_id"))`);
        await queryRunner.query(`CREATE TABLE "brand" ("brand_id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_5f468ae5696f07da025138e38f7" UNIQUE ("name"), CONSTRAINT "PK_a6201ff889d4681c6e521d26231" PRIMARY KEY ("brand_id"))`);
        await queryRunner.query(`ALTER TABLE "hookahs" DROP COLUMN "color"`);
        await queryRunner.query(`ALTER TABLE "hookahs" DROP COLUMN "hookah_size"`);
        await queryRunner.query(`DROP TYPE "public"."hookahs_hookah_size_enum"`);
        await queryRunner.query(`ALTER TABLE "accessories" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."accessories_type_enum"`);
        await queryRunner.query(`ALTER TABLE "accessories" DROP COLUMN "bowl_type"`);
        await queryRunner.query(`DROP TYPE "public"."accessories_bowl_type_enum"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "promotion"`);
        await queryRunner.query(`DROP TYPE "public"."products_promotion_enum"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "brand"`);
        await queryRunner.query(`ALTER TABLE "hookahs" ADD "color_id" integer`);
        await queryRunner.query(`ALTER TABLE "hookahs" ADD "hookah_size_id" integer`);
        await queryRunner.query(`ALTER TABLE "accessories" ADD "type_id" integer`);
        await queryRunner.query(`ALTER TABLE "accessories" ADD "bowl_type_id" integer`);
        await queryRunner.query(`ALTER TABLE "products" ADD "promotion_id" integer`);
        await queryRunner.query(`ALTER TABLE "products" ADD "bramd_id" integer`);
        await queryRunner.query(`ALTER TABLE "tobacco" DROP COLUMN "flavor_id"`);
        await queryRunner.query(`ALTER TABLE "tobacco" ADD "flavor_id" integer`);
        await queryRunner.query(`ALTER TABLE "hookahs" ADD CONSTRAINT "FK_65790bb8e050c968e2913b34ef4" FOREIGN KEY ("color_id") REFERENCES "color"("color_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hookahs" ADD CONSTRAINT "FK_adafe7fe8a232751bfabac445ae" FOREIGN KEY ("hookah_size_id") REFERENCES "hookah_size"("hookah_size_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tobacco" ADD CONSTRAINT "FK_49291f60a65d5d3115bbd092ebe" FOREIGN KEY ("flavor_id") REFERENCES "flavor"("flavor_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accessories" ADD CONSTRAINT "FK_9178e4ad1ba0c2814b550911865" FOREIGN KEY ("type_id") REFERENCES "type"("type_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accessories" ADD CONSTRAINT "FK_a4e7cf8238dc1f859c7caf88a87" FOREIGN KEY ("bowl_type_id") REFERENCES "bowl_type"("bowl_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_dbae3af02a33ff539da00d565a7" FOREIGN KEY ("promotion_id") REFERENCES "promotion"("promotion_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_8fb4efe073fb5dab5cb7e12685e" FOREIGN KEY ("bramd_id") REFERENCES "brand"("brand_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_8fb4efe073fb5dab5cb7e12685e"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_dbae3af02a33ff539da00d565a7"`);
        await queryRunner.query(`ALTER TABLE "accessories" DROP CONSTRAINT "FK_a4e7cf8238dc1f859c7caf88a87"`);
        await queryRunner.query(`ALTER TABLE "accessories" DROP CONSTRAINT "FK_9178e4ad1ba0c2814b550911865"`);
        await queryRunner.query(`ALTER TABLE "tobacco" DROP CONSTRAINT "FK_49291f60a65d5d3115bbd092ebe"`);
        await queryRunner.query(`ALTER TABLE "hookahs" DROP CONSTRAINT "FK_adafe7fe8a232751bfabac445ae"`);
        await queryRunner.query(`ALTER TABLE "hookahs" DROP CONSTRAINT "FK_65790bb8e050c968e2913b34ef4"`);
        await queryRunner.query(`ALTER TABLE "tobacco" DROP COLUMN "flavor_id"`);
        await queryRunner.query(`ALTER TABLE "tobacco" ADD "flavor_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "bramd_id"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "promotion_id"`);
        await queryRunner.query(`ALTER TABLE "accessories" DROP COLUMN "bowl_type_id"`);
        await queryRunner.query(`ALTER TABLE "accessories" DROP COLUMN "type_id"`);
        await queryRunner.query(`ALTER TABLE "hookahs" DROP COLUMN "hookah_size_id"`);
        await queryRunner.query(`ALTER TABLE "hookahs" DROP COLUMN "color_id"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "brand" character varying NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."products_promotion_enum" AS ENUM('hot', 'sale', 'new', 'none')`);
        await queryRunner.query(`ALTER TABLE "products" ADD "promotion" "public"."products_promotion_enum" NOT NULL DEFAULT 'none'`);
        await queryRunner.query(`CREATE TYPE "public"."accessories_bowl_type_enum" AS ENUM('turkish', 'phunnel', 'vortex', 'evil')`);
        await queryRunner.query(`ALTER TABLE "accessories" ADD "bowl_type" "public"."accessories_bowl_type_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."accessories_type_enum" AS ENUM('bowl', 'hose', 'tongs', 'cap', 'charcoal holder', 'seals', 'cleaners', 'flask', 'other')`);
        await queryRunner.query(`ALTER TABLE "accessories" ADD "type" "public"."accessories_type_enum" NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."hookahs_hookah_size_enum" AS ENUM('big', 'medium', 'small', 'portable')`);
        await queryRunner.query(`ALTER TABLE "hookahs" ADD "hookah_size" "public"."hookahs_hookah_size_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hookahs" ADD "color" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "brand"`);
        await queryRunner.query(`DROP TABLE "promotion"`);
        await queryRunner.query(`DROP TABLE "bowl_type"`);
        await queryRunner.query(`DROP TABLE "type"`);
        await queryRunner.query(`DROP TABLE "flavor"`);
        await queryRunner.query(`DROP TABLE "color"`);
        await queryRunner.query(`DROP TABLE "hookah_size"`);
        await queryRunner.query(`ALTER TABLE "tobacco" RENAME COLUMN "flavor_id" TO "flavor"`);
    }

}
