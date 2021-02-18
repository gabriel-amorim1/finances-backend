import { FinancialMovementInterface } from './FinancialMovementInterface';
import { RequestGetAllInterface } from './pagination';
import { SpendingDivisionBaseInterface } from './SpendingDivisionBaseInterface';

export interface UserInterface {
    name: string;
    email: string;

    id?: string;
    created_at?: Date;
    updated_at?: Date;
    password?: string;
    password_hash?: string;
    financial_movements?: FinancialMovementInterface[];
    spending_division_base?: SpendingDivisionBaseInterface;
}

export interface UserRequestGetAllInterface extends RequestGetAllInterface {
    name?: string;
    email?: string;
}
