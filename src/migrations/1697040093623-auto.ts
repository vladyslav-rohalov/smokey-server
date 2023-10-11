import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1697040093623 implements MigrationInterface {
    name = 'Auto1697040093623'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_1b05689f6b6456680d538c3d2ea"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_1b05689f6b6456680d538c3d2ea"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "address_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "address_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_1b05689f6b6456680d538c3d2ea" UNIQUE ("address_id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_1b05689f6b6456680d538c3d2ea" FOREIGN KEY ("address_id") REFERENCES "addresses"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
