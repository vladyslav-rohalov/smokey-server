import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1697104485410 implements MigrationInterface {
    name = 'Auto1697104485410'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_1b05689f6b6456680d538c3d2ea"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_1b05689f6b6456680d538c3d2ea"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "address_id"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "UQ_16aac8a9f6f9c1dd6bcb75ec023" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_16aac8a9f6f9c1dd6bcb75ec023" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_16aac8a9f6f9c1dd6bcb75ec023"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "UQ_16aac8a9f6f9c1dd6bcb75ec023"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "address_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_1b05689f6b6456680d538c3d2ea" UNIQUE ("address_id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_1b05689f6b6456680d538c3d2ea" FOREIGN KEY ("address_id") REFERENCES "addresses"("address_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
