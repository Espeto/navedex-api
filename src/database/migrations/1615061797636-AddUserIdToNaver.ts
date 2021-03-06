import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddUserIdToNaver1615061797636
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'navers',
      new TableColumn({
        name: 'owner_id',
        type: 'int',
      }),
    );

    await queryRunner.createForeignKey(
      'navers',
      new TableForeignKey({
        columnNames: ['owner_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        name: 'NaverUser',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('navers', 'NaverUser');
    await queryRunner.dropColumn('navers', 'owner_id');
  }
}
