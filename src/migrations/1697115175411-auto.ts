import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class Auto1697115175411 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['address_id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'FK_1b05689f6b6456680d538c3d2ea');
  }
}
