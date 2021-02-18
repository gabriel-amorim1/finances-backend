/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class createSpendingDivisionBaseEntity1613605069600
    implements MigrationInterface {
    name = 'createSpendingDivisionBaseEntity1613605069600';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "spending_division_bases" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "essential_expenses" double precision NOT NULL, "non_essential_expenses" double precision NOT NULL, "wastes" double precision NOT NULL, "investments" double precision NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "REL_e6ef93c3ffcd43cf84136dc8ae" UNIQUE ("user_id"), CONSTRAINT "PK_1174a009855d9e75308a79d0b8e" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `ALTER TABLE "spending_division_bases" ADD CONSTRAINT "FK_e6ef93c3ffcd43cf84136dc8aed" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "spending_division_bases" DROP CONSTRAINT "FK_e6ef93c3ffcd43cf84136dc8aed"`,
        );
        await queryRunner.query(`DROP TABLE "spending_division_bases"`);
    }
}
