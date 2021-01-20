import { v4 } from 'uuid';

import FinancialMovement from '../../../database/entities/FinancialMovement';
import IFinancialMovementRepository from '../../../interfaces/repositories/IFinancialMovementRepository';
import { FinancialMovementInterface } from '../../../interfaces/FinancialMovementInterface';

export default class FakeFinancialMovementRepository
    implements IFinancialMovementRepository {
    private financialMovements: FinancialMovement[] = [];

    public async createAndSave(
        financialMovementData: FinancialMovementInterface,
    ): Promise<FinancialMovement> {
        const financialMovement = Object.assign(
            new FinancialMovement(),
            financialMovementData,
        );

        financialMovement.id = v4();
        financialMovement.created_at = new Date();
        financialMovement.updated_at = new Date();

        this.financialMovements.push(financialMovement);

        return financialMovement;
    }

    public async findById(id: string): Promise<FinancialMovement | undefined> {
        const financialMovementFound = this.financialMovements.find(
            financialMovement => financialMovement.id === id,
        );

        return financialMovementFound;
    }
}
