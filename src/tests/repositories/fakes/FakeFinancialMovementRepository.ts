import { v4 } from 'uuid';

import { DeleteResult } from 'typeorm';
import FinancialMovement from '../../../database/entities/FinancialMovement';
import IFinancialMovementRepository from '../../../interfaces/repositories/IFinancialMovementRepository';
import { FinancialMovementInterface } from '../../../interfaces/FinancialMovementInterface';
import { OptionsTypeOrmGetAll } from '../../../interfaces/pagination';

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

    public async getAll(
        options: OptionsTypeOrmGetAll,
    ): Promise<{ data: FinancialMovement[]; count: number }> {
        const data = this.financialMovements;
        const count = this.financialMovements.length;

        return { data, count };
    }

    public async getAllGroupByClassification(
        user_id: string,
    ): Promise<{ classification: string; inValue: number }[]> {
        const classifications = [
            'receita',
            'gastos essenciais',
            'gastos não essenciais',
            'investimentos',
            'torrar',
        ];

        const movementsGroups: { classification: string; inValue: number }[] = [];

        classifications.forEach(classification => {
            const filteredMovements = this.financialMovements.filter(
                movement =>
                    movement.user_id === user_id &&
                    movement.classification === classification,
            );
            if (filteredMovements) {
                const inValue = filteredMovements
                    .map(mapMovement => mapMovement.value)
                    .reduce((a, b) => a + b);

                movementsGroups.push({ classification, inValue });
            }
        });

        return movementsGroups;
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
