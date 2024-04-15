import { MigrationInterface, QueryRunner } from 'typeorm';

export class DataSourceTable1713192286803 implements MigrationInterface {
  name = 'DataSourceTable1713192286803';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "data_source" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9775f6b6312a926ed37d3af7d95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "tenant" ADD "subscriptionActive" boolean`,
    );
    await queryRunner.query(
      `ALTER TABLE "tenant" ADD "subscriptionEnd" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "tenant" ADD "subscriptionType" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "tenant" ADD "stripeCustomerId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "tenant" ADD "stripeSubscriptionId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" ADD "url" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" ADD "key" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "file" ADD "type" character varying`);
    await queryRunner.query(`ALTER TABLE "file" ADD "userId" uuid`);
    await queryRunner.query(`ALTER TABLE "file" ADD "tenantId" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "file" ADD "dataSourceId" integer`);
    await queryRunner.query(
      `CREATE INDEX "IDX_b2d8e683f020f61115edea206b" ON "file" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_85020d70f7c45e47db4f987b39" ON "file" ("tenantId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "file" ADD CONSTRAINT "FK_b2d8e683f020f61115edea206b3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" ADD CONSTRAINT "FK_85020d70f7c45e47db4f987b397" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" ADD CONSTRAINT "FK_bb7ab3966a8aee6f1acd8bc1278" FOREIGN KEY ("dataSourceId") REFERENCES "data_source"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "file" DROP CONSTRAINT "FK_bb7ab3966a8aee6f1acd8bc1278"`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" DROP CONSTRAINT "FK_85020d70f7c45e47db4f987b397"`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" DROP CONSTRAINT "FK_b2d8e683f020f61115edea206b3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_85020d70f7c45e47db4f987b39"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b2d8e683f020f61115edea206b"`,
    );
    await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "dataSourceId"`);
    await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "tenantId"`);
    await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "type"`);
    await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "key"`);
    await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "url"`);
    await queryRunner.query(
      `ALTER TABLE "tenant" DROP COLUMN "stripeSubscriptionId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tenant" DROP COLUMN "stripeCustomerId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tenant" DROP COLUMN "subscriptionType"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tenant" DROP COLUMN "subscriptionEnd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tenant" DROP COLUMN "subscriptionActive"`,
    );
    await queryRunner.query(`DROP TABLE "data_source"`);
  }
}
