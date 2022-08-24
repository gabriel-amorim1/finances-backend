/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterTableFinancialMovementsAddColumnDate1661295003478
    implements MigrationInterface {
    name = 'alterTableFinancialMovementsAddColumnDate1661295003478';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "financial_movements" ADD "date" date NOT NULL`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "financial_movements" DROP COLUMN "date"`,
        );
    }
}
