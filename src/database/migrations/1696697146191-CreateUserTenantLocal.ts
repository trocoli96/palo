import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTenantLocal1696697146191 implements MigrationInterface {
  name = 'CreateUserTenantLocal1696697146191';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "local" ("id" integer NOT NULL, "code" character varying NOT NULL, CONSTRAINT "PK_0fb290786865912848b7a60dd90" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "tenant" ADD "localId" integer`);
    await queryRunner.query(`ALTER TABLE "user" ADD "localId" integer`);
    await queryRunner.query(
      `ALTER TABLE "tenant" ADD CONSTRAINT "FK_d0bd5e1ccc8b9413e60dae0d68d" FOREIGN KEY ("localId") REFERENCES "local"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_e3b1904c97b9ff0ed40fb45fb2e" FOREIGN KEY ("localId") REFERENCES "local"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_e3b1904c97b9ff0ed40fb45fb2e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tenant" DROP CONSTRAINT "FK_d0bd5e1ccc8b9413e60dae0d68d"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "localId"`);
    await queryRunner.query(`ALTER TABLE "tenant" DROP COLUMN "localId"`);
    await queryRunner.query(`DROP TABLE "local"`);
  }
}
