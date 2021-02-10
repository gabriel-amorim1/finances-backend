import { DeleteResult, getRepository, Repository } from 'typeorm';
import FinancialMovement from '../database/entities/FinancialMovement';
import { FinancialMovementInterface } from '../interfaces/FinancialMovementInterface';
import { OptionsTypeOrmGetAll } from '../interfaces/pagination';
import IFinancialMovementRepository from '../interfaces/repositories/IFinancialMovementRepository';

export default class FinancialMovementRepository
    implements IFinancialMovementRepository {
    private ormRepository: Repository<FinancialMovement>;

    constructor() {
        this.ormRepository = getRepository(FinancialMovement);
    }

    public async createAndSave(
        movementData: FinancialMovementInterface,
    ): Promise<FinancialMovement> {
        const financialMovement = this.ormRepository.create(movementData);

        return this.ormRepository.save(financialMovement);
    }

    public async findById(id: string): Promise<FinancialMovement | undefined> {
        return this.ormRepository.findOne(id);
    }

    public async getAll(
        options: OptionsTypeOrmGetAll,
    ): Promise<{ data: FinancialMovement[]; count: number }> {
        const [data, count] = await this.ormRepository.findAndCount(options);

        return { data, count };
    }

    public async getAllGroupByClassification(
        user_id: string,
    ): Promise<
        {
            classification: string;
            in_value: number;
        }[]
    > {
        return this.ormRepository.query(
            `SELECT
                classification,
                SUM (value) as in_value
            FROM
                financial_movements fm
            WHERE
                fm.user_id = '${user_id}'
            GROUP BY
                classification;
            `,
        );
    }

    public async update(
        movementUpdate: FinancialMovement,
    ): Promise<FinancialMovement> {
        return this.ormRepository.save(movementUpdate);
    }

    public async remove(id: string): Promise<DeleteResult> {
        return this.ormRepository.delete(id);
    }
}
