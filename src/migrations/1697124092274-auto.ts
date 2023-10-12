import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1697124092274 implements MigrationInterface {
    name = 'Auto1697124092274'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "descriptiom" TO "description"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "description" TO "descriptiom"`);
    }

}
