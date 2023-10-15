import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1697385042951 implements MigrationInterface {
    name = 'Auto1697385042951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tobacco" RENAME COLUMN "weight" TO "tobacco_weight"`);
        await queryRunner.query(`ALTER TABLE "coals" DROP COLUMN "size"`);
        await queryRunner.query(`ALTER TABLE "coals" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "coals" ADD "coal_size" smallint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coals" ADD "coal_weight" smallint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coals" DROP COLUMN "coal_weight"`);
        await queryRunner.query(`ALTER TABLE "coals" DROP COLUMN "coal_size"`);
        await queryRunner.query(`ALTER TABLE "coals" ADD "weight" smallint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coals" ADD "size" smallint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tobacco" RENAME COLUMN "tobacco_weight" TO "weight"`);
    }

}
