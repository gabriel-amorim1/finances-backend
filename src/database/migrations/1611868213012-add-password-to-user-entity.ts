/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class addPasswordToUserEntity1611868213012 implements MigrationInterface {
    name = 'addPasswordToUserEntity1611868213012';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "password_hash" varchar NOT NULL)`,
        );
        await queryRunner.query(
            `INSERT INTO "temporary_users"("id", "name", "email", "created_at", "updated_at") SELECT "id", "name", "email", "created_at", "updated_at" FROM "users"`,
        );
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(
            `CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
        );
        await queryRunner.query(
            `INSERT INTO "users"("id", "name", "email", "created_at", "updated_at") SELECT "id", "name", "email", "created_at", "updated_at" FROM "temporary_users"`,
        );
        await queryRunner.query(`DROP TABLE "temporary_users"`);
    }
}
