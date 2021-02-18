import User from '../database/entities/User';

export interface SpendingDivisionBaseInterface {
    user_id: string;
    essential_expenses: number;
    non_essential_expenses: number;
    investments: number;
    wastes: number;

    id?: string;
    created_at?: Date;
    updated_at?: Date;
    user?: User;
}
