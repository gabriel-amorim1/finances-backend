import { FinancialMovementInterface } from './FinancialMovementInterface';
import { RequestGetAllInterface } from './pagination';

export interface UserInterface {
    name: string;
    email: string;

    id?: string;
    created_at?: Date;
    updated_at?: Date;
    financial_movements?: FinancialMovementInterface[];
}

export interface UserRequestGetAllInterface extends RequestGetAllInterface {
    name?: string;
    email?: string;
}
