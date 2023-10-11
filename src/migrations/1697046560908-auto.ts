import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1697046560908 implements MigrationInterface {
    name = 'Auto1697046560908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" RENAME COLUMN "appartment" TO "apartment"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" RENAME COLUMN "apartment" TO "appartment"`);
    }

}
