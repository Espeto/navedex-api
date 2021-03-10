import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateNaverProject1615062811174
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'navers_projects_projects',
        columns: [
          {
            name: 'naversId',
            type: 'int',
          },
          {
            name: 'projectsId',
            type: 'int',
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('navers_projects_projects', [
      new TableForeignKey({
        columnNames: ['naversId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'navers',
        name: 'ProjectsNavers',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['projectsId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'projects',
        name: 'ProjectsProject',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    ]);

    await queryRunner.createPrimaryKey('navers_projects_projects', [
      'naversId',
      'projectsId',
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropPrimaryKey('navers_projects_projects');
    await queryRunner.dropTable('navers_projects_projects');
  }
}
