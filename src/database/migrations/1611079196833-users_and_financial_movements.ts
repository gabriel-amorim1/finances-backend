import {MigrationInterface, QueryRunner} from "typeorm";

export class usersAndFinancialMovements1611079196833 implements MigrationInterface {
    name = 'usersAndFinancialMovements1611079196833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`);
        await queryRunner.query(`CREATE TABLE "financial_movements" ("id" varchar PRIMARY KEY NOT NULL, "user_id" varchar NOT NULL, "name" varchar NOT NULL, "value" double precision NOT NULL, "classification" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`);
        await queryRunner.query(`CREATE TABLE "temporary_financial_movements" ("id" varchar PRIMARY KEY NOT NULL, "user_id" varchar NOT NULL, "name" varchar NOT NULL, "value" double precision NOT NULL, "classification" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), CONSTRAINT "FK_21509fc9358ea587bd623462033" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_financial_movements"("id", "user_id", "name", "value", "classification", "created_at", "updated_at") SELECT "id", "user_id", "name", "value", "classification", "created_at", "updated_at" FROM "financial_movements"`);
        await queryRunner.query(`DROP TABLE "financial_movements"`);
        await queryRunner.query(`ALTER TABLE "temporary_financial_movements" RENAME TO "financial_movements"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "financial_movements" RENAME TO "temporary_financial_movements"`);
        await queryRunner.query(`CREATE TABLE "financial_movements" ("id" varchar PRIMARY KEY NOT NULL, "user_id" varchar NOT NULL, "name" varchar NOT NULL, "value" double precision NOT NULL, "classification" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`);
        await queryRunner.query(`INSERT INTO "financial_movements"("id", "user_id", "name", "value", "classification", "created_at", "updated_at") SELECT "id", "user_id", "name", "value", "classification", "created_at", "updated_at" FROM "temporary_financial_movements"`);
        await queryRunner.query(`DROP TABLE "temporary_financial_movements"`);
        await queryRunner.query(`DROP TABLE "financial_movements"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
