import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1698074300287 implements MigrationInterface {
    name = 'Auto1698074300287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "publish" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "publish"`);
    }

}
