import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1697383044908 implements MigrationInterface {
    name = 'Auto1697383044908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hookahs" RENAME COLUMN "size" TO "hookah_size"`);
        await queryRunner.query(`ALTER TYPE "public"."hookahs_size_enum" RENAME TO "hookahs_hookah_size_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."hookahs_hookah_size_enum" RENAME TO "hookahs_size_enum"`);
        await queryRunner.query(`ALTER TABLE "hookahs" RENAME COLUMN "hookah_size" TO "size"`);
    }

}
