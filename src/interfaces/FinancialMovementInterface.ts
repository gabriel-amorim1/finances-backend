import User from '../database/entities/User';

export interface FinancialMovementInterface {
    user_id: string;
    name: string;
    value: number;
    classification: string;

    id?: string;
    created_at?: Date;
    updated_at?: Date;
    user?: User;
}
