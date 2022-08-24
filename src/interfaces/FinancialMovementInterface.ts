import { RequestGetAllInterface } from './pagination';
import User from '../database/entities/User';

export interface FinancialMovementInterface {
    user_id: string;
    name: string;
    value: number;
    classification: string;
    date: string;

    id?: string;
    created_at?: Date;
    updated_at?: Date;
    user?: User;
}

export interface FinancialMovementRequestGetAllInterface
    extends RequestGetAllInterface {
    name?: string;
    value?: number;
    classification?: string;
    date?: string;
}
