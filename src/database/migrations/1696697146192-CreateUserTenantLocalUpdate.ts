import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTenantLocal1696697146192 implements MigrationInterface {
  name = 'CreateUserTenantLocal1696697146192';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Assuming you have existing tenants and users in the database

    // Update all tenants to have localId 2
    await queryRunner.query(`UPDATE "tenant" SET "localId" = 2`);

    // Update all users to have localId 2
    await queryRunner.query(`UPDATE "user" SET "localId" = 2`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert the changes made in the up method

    // Revert tenants' localId to null or the original values
    await queryRunner.query(`UPDATE "tenant" SET "localId" = null`);

    // Revert users' localId to null or the original values
    await queryRunner.query(`UPDATE "user" SET "localId" = null`);
  }
}
