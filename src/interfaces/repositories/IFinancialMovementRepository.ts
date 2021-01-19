import FinancialMovement from '../../database/entities/FinancialMovement';
import { FinancialMovementInterface } from '../FinancialMovementInterface';

export default interface IFinancialMovementRepository {
    createAndSave(
        movementData: FinancialMovementInterface,
    ): Promise<FinancialMovement>;
    findById(id: string): Promise<FinancialMovement | undefined>;
}
