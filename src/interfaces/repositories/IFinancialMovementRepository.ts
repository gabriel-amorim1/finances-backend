import { DeleteResult } from 'typeorm';
import FinancialMovement from '../../database/entities/FinancialMovement';
import { FinancialMovementInterface } from '../FinancialMovementInterface';
import { OptionsTypeOrmGetAll } from '../pagination';

export default interface IFinancialMovementRepository {
    createAndSave(
        movementData: FinancialMovementInterface,
    ): Promise<FinancialMovement>;
    findById(id: string): Promise<FinancialMovement | undefined>;
    getAll(
        options: OptionsTypeOrmGetAll,
    ): Promise<{ data: FinancialMovement[]; count: number }>;
    getAllGroupByClassification(
        user_id: string,
    ): Promise<
        {
            classification: string;
            inValue: number;
        }[]
    >;
    update(movementUpdate: FinancialMovement): Promise<FinancialMovement>;
    remove(id: string): Promise<DeleteResult>;
}
