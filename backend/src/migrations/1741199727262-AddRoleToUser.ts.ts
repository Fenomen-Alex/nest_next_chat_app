import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddRoleToUser1741199727262 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add the 'role' column to the 'user' table
    await queryRunner.addColumn('user', new TableColumn({
      name: 'role',
      type: 'enum',
      enum: ['user', 'admin'],
      isNullable: true, // Change to false if you want to make it required
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove the 'role' column from the 'user' table
    await queryRunner.dropColumn('user', 'role');
  }
}
