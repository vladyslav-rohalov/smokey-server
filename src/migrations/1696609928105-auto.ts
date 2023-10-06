import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1696609928105 implements MigrationInterface {
    name = 'Auto1696609928105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "address" TO "address_id"`);
        await queryRunner.query(`CREATE TABLE "addresses" ("address_id" SERIAL NOT NULL, "city" character varying NOT NULL, "street" character varying NOT NULL, "house" character varying NOT NULL, "appartment" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7075006c2d82acfeb0ea8c5dce7" PRIMARY KEY ("address_id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "address_id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "address_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_1b05689f6b6456680d538c3d2ea" UNIQUE ("address_id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_1b05689f6b6456680d538c3d2ea" FOREIGN KEY ("address_id") REFERENCES "addresses"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_1b05689f6b6456680d538c3d2ea"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_1b05689f6b6456680d538c3d2ea"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "address_id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "address_id" jsonb`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "address_id" TO "address"`);
    }

}
