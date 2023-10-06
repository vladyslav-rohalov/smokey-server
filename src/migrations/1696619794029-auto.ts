import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1696619794029 implements MigrationInterface {
    name = 'Auto1696619794029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."hookahs_size_enum" AS ENUM('big', 'medium', 'small', 'portable')`);
        await queryRunner.query(`CREATE TABLE "hookahs" ("hookah_id" SERIAL NOT NULL, "color" character varying NOT NULL, "size" "public"."hookahs_size_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f55e43721d2441faeab25fdea8d" PRIMARY KEY ("hookah_id"))`);
        await queryRunner.query(`CREATE TABLE "tobacco" ("tobacco_id" SERIAL NOT NULL, "flavor" character varying NOT NULL, "weight" integer NOT NULL, "strength" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_58b6d7b9dc083199b85e267caa5" PRIMARY KEY ("tobacco_id"))`);
        await queryRunner.query(`CREATE TABLE "coals" ("tobacco_id" SERIAL NOT NULL, "size" integer NOT NULL, "weight" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_20a6cab3eef4b49a0bc13dc4391" PRIMARY KEY ("tobacco_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."accessories_type_enum" AS ENUM('bowl', 'hose', 'tongs', 'cap', 'charcoal holder', 'seals', 'cleaners', 'flask', 'other')`);
        await queryRunner.query(`CREATE TYPE "public"."accessories_bowl_type_enum" AS ENUM('turkish', 'phunnel', 'vortex', 'evil')`);
        await queryRunner.query(`CREATE TABLE "accessories" ("accessory_id" SERIAL NOT NULL, "type" "public"."accessories_type_enum" NOT NULL, "bowl_type" "public"."accessories_bowl_type_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4e0a7233303ffbe4d155336a7a0" PRIMARY KEY ("accessory_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."products_promotion_enum" AS ENUM('hot', 'sale', 'new', 'none')`);
        await queryRunner.query(`CREATE TYPE "public"."products_status_enum" AS ENUM('in stock', 'out of stock', 'ending', 'awaiting')`);
        await queryRunner.query(`CREATE TABLE "products" ("product_id" SERIAL NOT NULL, "promotion" "public"."products_promotion_enum" NOT NULL DEFAULT 'none', "status" "public"."products_status_enum" NOT NULL DEFAULT 'in stock', "images" character varying array NOT NULL, "price" integer NOT NULL, "descriptiom" character varying NOT NULL, "brand" character varying NOT NULL, "title" character varying NOT NULL, "available" integer NOT NULL, "rating" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a8940a4bf3b90bd7ac15c8f4dd9" PRIMARY KEY ("product_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TYPE "public"."products_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."products_promotion_enum"`);
        await queryRunner.query(`DROP TABLE "accessories"`);
        await queryRunner.query(`DROP TYPE "public"."accessories_bowl_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."accessories_type_enum"`);
        await queryRunner.query(`DROP TABLE "coals"`);
        await queryRunner.query(`DROP TABLE "tobacco"`);
        await queryRunner.query(`DROP TABLE "hookahs"`);
        await queryRunner.query(`DROP TYPE "public"."hookahs_size_enum"`);
    }

}
