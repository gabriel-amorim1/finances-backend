import FinancialMovement from '../../database/entities/FinancialMovement';
import {
    ClassificationFormatInterface,
    SpendingDivisionInterface,
} from '../../interfaces/SpendingDivisionInterface';
import { calculatePercentage } from '../spendingDivision';

export const buildSpendingDivision = (
    financialGroups: {
        classification: string;
        in_value: number;
    }[],
): SpendingDivisionInterface => {
    const incomeGroup = financialGroups.find(
        financial => financial.classification === 'receita',
    );

    const income = buildClassificationFormat(
        incomeGroup!.in_value,
        incomeGroup!.in_value,
    );

    const essentialExpensesGroup = financialGroups.find(
        financial => financial.classification === 'gastos essenciais',
    );
    const essentialExpenses = buildClassificationFormat(
        income.inValue,
        essentialExpensesGroup?.in_value,
    );

    const nonEssentialExpensesGroup = financialGroups.find(
        financial => financial.classification === 'gastos não essenciais',
    );
    const nonEssentialExpenses = buildClassificationFormat(
        income.inValue,
        nonEssentialExpensesGroup?.in_value,
    );

    const investmentsGroup = financialGroups.find(
        financial => financial.classification === 'investimentos',
    );
    const investments = buildClassificationFormat(
        income.inValue,
        investmentsGroup?.in_value,
    );

    const wasteGroup = financialGroups.find(
        financial => financial.classification === 'torrar',
    );
    const waste = buildClassificationFormat(income.inValue, wasteGroup?.in_value);

    const remnant = {
        inPercentage: 0,
        inValue: 0,
    };

    return {
        income,
        essentialExpenses,
        nonEssentialExpenses,
        investments,
        waste,
        remnant,
    };
};

export const buildClassificationFormat = (
    incomeValue: number,
    groupValue?: number,
): ClassificationFormatInterface => {
    return {
        financial_movements: <FinancialMovement[]>[],
        inPercentage: calculatePercentage(incomeValue, groupValue),
        inValue: groupValue || 0,
    };
};
