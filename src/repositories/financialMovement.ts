import { getRepository, Repository } from 'typeorm';
import FinancialMovement from '../database/entities/FinancialMovement';
import { FinancialMovementInterface } from '../interfaces/FinancialMovementInterface';
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
}
