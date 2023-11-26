import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1701025845262 implements MigrationInterface {
    name = 'Auto1701025845262'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "fake"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" ADD "fake" character varying`);
    }

}
