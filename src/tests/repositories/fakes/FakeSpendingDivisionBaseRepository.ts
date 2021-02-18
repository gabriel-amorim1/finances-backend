import { v4 } from 'uuid';

import SpendingDivisionBase from '../../../database/entities/SpendingDivisionBase';
import ISpendingDivisionBaseRepository from '../../../interfaces/repositories/ISpendingDivisionBaseRepository';
import { SpendingDivisionBaseInterface } from '../../../interfaces/SpendingDivisionBaseInterface';

export default class FakeSpendingDivisionBaseRepository
    implements ISpendingDivisionBaseRepository {
    private spendingDivisionBases: SpendingDivisionBase[] = [];

    public async createAndSave(
        spendingDivisionBaseData: SpendingDivisionBaseInterface,
    ): Promise<SpendingDivisionBase> {
        const spendingDivisionBase = Object.assign(
            new SpendingDivisionBase(),
            spendingDivisionBaseData,
        );

        spendingDivisionBase.id = v4();
        spendingDivisionBase.created_at = new Date();
        spendingDivisionBase.updated_at = new Date();

        this.spendingDivisionBases.push(spendingDivisionBase);

        return spendingDivisionBase;
    }

    public async findById(id: string): Promise<SpendingDivisionBase | undefined> {
        const spendingDivisionBaseFound = this.spendingDivisionBases.find(
            spendingDivisionBase => spendingDivisionBase.id === id,
        );

        return spendingDivisionBaseFound;
    }

    public async findByUserId(
        user_id: string,
    ): Promise<SpendingDivisionBase | undefined> {
        const spendingDivisionBaseFound = this.spendingDivisionBases.find(
            spendingDivisionBase => spendingDivisionBase.user_id === user_id,
        );

        return spendingDivisionBaseFound;
    }

    public async update(
        spendingDivisionBaseUpdate: SpendingDivisionBase,
    ): Promise<SpendingDivisionBase> {
        const findIndex = this.spendingDivisionBases.findIndex(
            spendingDivisionBase =>
                spendingDivisionBase.id === spendingDivisionBaseUpdate.id,
        );

        this.spendingDivisionBases[findIndex] = spendingDivisionBaseUpdate;

        return this.spendingDivisionBases[findIndex];
    }
}
