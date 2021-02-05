import FinancialMovement from '../../database/entities/FinancialMovement';
import {
    ClassificationFormatInterface,
    SpendingDivisionInterface,
} from '../../interfaces/SpendingDivisionInterface';
import { calculatePercentage } from '../spendingDivision';

export const buildSpendingDivision = (
    financialGroups: {
        classification: string;
        inValue: number;
    }[],
): SpendingDivisionInterface => {
    const incomeGroup = financialGroups.find(
        financial => financial.classification === 'receita',
    );

    const income = buildClassificationFormat(
        incomeGroup!.inValue,
        incomeGroup!.inValue,
    );

    const essentialExpensesGroup = financialGroups.find(
        financial => financial.classification === 'gastos essenciais',
    );
    const essentialExpenses = buildClassificationFormat(
        income.inValue,
        essentialExpensesGroup?.inValue,
    );

    const nonEssentialExpensesGroup = financialGroups.find(
        financial => financial.classification === 'gastos não essenciais',
    );
    const nonEssentialExpenses = buildClassificationFormat(
        income.inValue,
        nonEssentialExpensesGroup?.inValue,
    );

    const investmentsGroup = financialGroups.find(
        financial => financial.classification === 'investimentos',
    );
    const investments = buildClassificationFormat(
        income.inValue,
        investmentsGroup?.inValue,
    );

    const wasteGroup = financialGroups.find(
        financial => financial.classification === 'torrar',
    );
    const waste = buildClassificationFormat(income.inValue, wasteGroup?.inValue);

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
