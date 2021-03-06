import { query } from 'express';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableExclusion,
  TableForeignKey,
} from 'typeorm';

export default class CreateNaverProject1615062811174
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'naver_projects_project',
        columns: [
          {
            name: 'naverId',
            type: 'int',
          },
          {
            name: 'projectId',
            type: 'int',
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('naver_projects_project', [
      new TableForeignKey({
        columnNames: ['naverId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'navers',
        name: 'ProjectsNaver',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['projectId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'projects',
        name: 'ProjectsProject',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    ]);

    await queryRunner.createPrimaryKey('naver_projects_project', [
      'naverId',
      'projectId',
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropPrimaryKey('naver_projects_project');
    await queryRunner.dropTable('naver_projects_project');
  }
}
