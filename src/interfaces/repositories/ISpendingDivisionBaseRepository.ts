import SpendingDivisionBase from '../../database/entities/SpendingDivisionBase';
import { SpendingDivisionBaseInterface } from '../SpendingDivisionBaseInterface';

export default interface ISpendingDivisionBaseRepository {
    createAndSave(
        movementData: SpendingDivisionBaseInterface,
    ): Promise<SpendingDivisionBase>;
    findById(id: string): Promise<SpendingDivisionBase | undefined>;
    findByUserId(user_id: string): Promise<SpendingDivisionBase | undefined>;
    update(movementUpdate: SpendingDivisionBase): Promise<SpendingDivisionBase>;
}
