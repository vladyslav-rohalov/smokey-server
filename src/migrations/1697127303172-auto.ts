import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1697127303172 implements MigrationInterface {
    name = 'Auto1697127303172'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tobacco_products" DROP CONSTRAINT "FK_04c89bdb75c508cff5c749532b8"`);
        await queryRunner.query(`ALTER TABLE "tobacco_products" ADD CONSTRAINT "FK_04c89bdb75c508cff5c749532b8" FOREIGN KEY ("tobacco_id") REFERENCES "tobacco"("tobacco_id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tobacco_products" DROP CONSTRAINT "FK_04c89bdb75c508cff5c749532b8"`);
        await queryRunner.query(`ALTER TABLE "tobacco_products" ADD CONSTRAINT "FK_04c89bdb75c508cff5c749532b8" FOREIGN KEY ("tobacco_id") REFERENCES "tobacco"("tobacco_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
