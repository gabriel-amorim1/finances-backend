import { DeleteResult } from 'typeorm';
import FinancialMovement from '../../database/entities/FinancialMovement';
import { FinancialMovementInterface } from '../FinancialMovementInterface';

export default interface IFinancialMovementRepository {
    createAndSave(
        movementData: FinancialMovementInterface,
    ): Promise<FinancialMovement>;
    findById(id: string): Promise<FinancialMovement | undefined>;
    getAll(): Promise<{ data: FinancialMovement[]; count: number }>;
    update(movementUpdate: FinancialMovement): Promise<FinancialMovement>;
    remove(id: string): Promise<DeleteResult>;
}
