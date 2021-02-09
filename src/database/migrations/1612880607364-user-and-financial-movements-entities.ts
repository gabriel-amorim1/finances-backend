import {MigrationInterface, QueryRunner} from "typeorm";

export class userAndFinancialMovementsEntities1612880607364 implements MigrationInterface {
    name = 'userAndFinancialMovementsEntities1612880607364'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password_hash" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "financial_movements" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "name" character varying NOT NULL, "value" double precision NOT NULL, "classification" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_025cc87a04960e08a8a9db1833d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "financial_movements" ADD CONSTRAINT "FK_21509fc9358ea587bd623462033" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "financial_movements" DROP CONSTRAINT "FK_21509fc9358ea587bd623462033"`);
        await queryRunner.query(`DROP TABLE "financial_movements"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
