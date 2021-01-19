import { FinancialMovementInterface } from './FinancialMovementInterface';

export interface UserInterface {
    name: string;
    email: string;

    id?: string;
    created_at?: Date;
    updated_at?: Date;
    financial_movements?: FinancialMovementInterface[];
}
