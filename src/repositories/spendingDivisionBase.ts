import { getRepository, Repository } from 'typeorm';
import SpendingDivisionBase from '../database/entities/SpendingDivisionBase';
import ISpendingDivisionBaseRepository from '../interfaces/repositories/ISpendingDivisionBaseRepository';
import { SpendingDivisionBaseInterface } from '../interfaces/SpendingDivisionBaseInterface';

export default class SpendingDivisionBaseRepository
    implements ISpendingDivisionBaseRepository {
    private ormRepository: Repository<SpendingDivisionBase>;

    constructor() {
        this.ormRepository = getRepository(SpendingDivisionBase);
    }

    public async createAndSave(
        spendingDivisionBaseData: SpendingDivisionBaseInterface,
    ): Promise<SpendingDivisionBase> {
        const spendingDivisionBase = this.ormRepository.create(
            spendingDivisionBaseData,
        );

        return this.ormRepository.save(spendingDivisionBase);
    }

    public async findById(id: string): Promise<SpendingDivisionBase | undefined> {
        return this.ormRepository.findOne(id);
    }

    public async findByUserId(
        user_id: string,
    ): Promise<SpendingDivisionBase | undefined> {
        return this.ormRepository.findOne({ where: { user_id } });
    }

    public async update(
        spendingDivisionBaseUpdate: SpendingDivisionBase,
    ): Promise<SpendingDivisionBase> {
        return this.ormRepository.save(spendingDivisionBaseUpdate);
    }
}
