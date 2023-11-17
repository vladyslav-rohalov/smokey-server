import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1700230295130 implements MigrationInterface {
    name = 'Auto1700230295130'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "quantity"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" ADD "quantity" integer NOT NULL`);
    }

}
