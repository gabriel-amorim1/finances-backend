import FinancialMovement from '../database/entities/FinancialMovement';

export interface SpendingDivisionInterface {
    income: ClassificationFormatInterface;
    essentialExpenses: ClassificationFormatInterface;
    nonEssentialExpenses: ClassificationFormatInterface;
    investments: ClassificationFormatInterface;
    waste: ClassificationFormatInterface;
    remnant: ClassificationFormatInterface;
}

export interface ClassificationFormatInterface {
    inPercentage: number;
    inValue: number;
    financial_movements?: FinancialMovement[];
}
