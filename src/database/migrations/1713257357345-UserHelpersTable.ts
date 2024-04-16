import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserHelpersTable1713257357345 implements MigrationInterface {
  name = 'UserHelpersTable1713257357345';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_helper" ("id" SERIAL NOT NULL, "key" character varying NOT NULL, "userId" uuid, "tenantId" uuid NOT NULL, "dataSourceId" integer, CONSTRAINT "PK_df7f8c2bc4d18c143c9d12c313d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2fafb89b3a666b428b86b931ab" ON "user_helper" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e127fa0359acc3c8302fa078ba" ON "user_helper" ("tenantId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_helper" ADD CONSTRAINT "FK_2fafb89b3a666b428b86b931aba" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_helper" ADD CONSTRAINT "FK_e127fa0359acc3c8302fa078bad" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_helper" ADD CONSTRAINT "FK_3f02a97a0f5af1a596786812e72" FOREIGN KEY ("dataSourceId") REFERENCES "data_source"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_helper" DROP CONSTRAINT "FK_3f02a97a0f5af1a596786812e72"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_helper" DROP CONSTRAINT "FK_e127fa0359acc3c8302fa078bad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_helper" DROP CONSTRAINT "FK_2fafb89b3a666b428b86b931aba"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e127fa0359acc3c8302fa078ba"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2fafb89b3a666b428b86b931ab"`,
    );
    await queryRunner.query(`DROP TABLE "user_helper"`);
  }
}
