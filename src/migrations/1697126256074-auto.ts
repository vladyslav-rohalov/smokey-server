import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1697126256074 implements MigrationInterface {
    name = 'Auto1697126256074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tobacco" ALTER COLUMN "strength" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "rating" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "rating" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tobacco" ALTER COLUMN "strength" SET NOT NULL`);
    }

}
