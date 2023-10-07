import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1696687799500 implements MigrationInterface {
    name = 'Auto1696687799500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("comment_id" SERIAL NOT NULL, "text" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "reviewId" integer, CONSTRAINT "PK_eb0d76f2ca45d66a7de04c7c72b" PRIMARY KEY ("comment_id"))`);
        await queryRunner.query(`CREATE TABLE "review_rating" ("rating_id" SERIAL NOT NULL, "pros" integer NOT NULL, "cons" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "reviewId" integer, CONSTRAINT "PK_6be2f0bd6030bc32806c5bb3fc0" PRIMARY KEY ("rating_id"))`);
        await queryRunner.query(`CREATE TABLE "reviews" ("review_id" SERIAL NOT NULL, "text" character varying NOT NULL, "pros" character varying NOT NULL, "cons" character varying NOT NULL, "images" character varying array NOT NULL, "rating" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_bfe951d9dca4ba99674c5772905" PRIMARY KEY ("review_id"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_6866875c8e9d9c82f6d3a2c2120" FOREIGN KEY ("reviewId") REFERENCES "reviews"("review_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review_rating" ADD CONSTRAINT "FK_bf3ac182a7b3d86b6e061e96e32" FOREIGN KEY ("userId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review_rating" ADD CONSTRAINT "FK_81080dc1f5342d8650c1ee7176c" FOREIGN KEY ("reviewId") REFERENCES "reviews"("review_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f" FOREIGN KEY ("userId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f"`);
        await queryRunner.query(`ALTER TABLE "review_rating" DROP CONSTRAINT "FK_81080dc1f5342d8650c1ee7176c"`);
        await queryRunner.query(`ALTER TABLE "review_rating" DROP CONSTRAINT "FK_bf3ac182a7b3d86b6e061e96e32"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_6866875c8e9d9c82f6d3a2c2120"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
        await queryRunner.query(`DROP TABLE "review_rating"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}
