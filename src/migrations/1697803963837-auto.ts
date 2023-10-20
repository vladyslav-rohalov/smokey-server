import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1697803963837 implements MigrationInterface {
    name = 'Auto1697803963837'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_8fb4efe073fb5dab5cb7e12685e"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "bramd_id" TO "brand_id"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_1530a6f15d3c79d1b70be98f2be" FOREIGN KEY ("brand_id") REFERENCES "brand"("brand_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_1530a6f15d3c79d1b70be98f2be"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "brand_id" TO "bramd_id"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_8fb4efe073fb5dab5cb7e12685e" FOREIGN KEY ("bramd_id") REFERENCES "brand"("brand_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
