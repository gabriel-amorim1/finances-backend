import { v4 } from 'uuid';

import { DeleteResult } from 'typeorm';
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

    public async getAll(): Promise<{ data: FinancialMovement[]; count: number }> {
        const data = this.financialMovements;
        const count = this.financialMovements.length;

        return { data, count };
    }

    public async update(
        movementUpdate: FinancialMovement,
    ): Promise<FinancialMovement> {
        const findIndex = this.financialMovements.findIndex(
            financialMovement => financialMovement.id === movementUpdate.id,
        );

        this.financialMovements[findIndex] = movementUpdate;

        return this.financialMovements[findIndex];
    }

    public async remove(id: string): Promise<DeleteResult> {
        this.financialMovements = this.financialMovements.filter(
            financialMovement => financialMovement.id !== id,
        );
        return <any>{ raw: [] };
    }
}
