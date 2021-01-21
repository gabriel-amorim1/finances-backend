import { inject, injectable } from 'tsyringe';

import { SpendingDivisionInterface } from '../interfaces/SpendingDivisionInterface';
import { HttpError } from '../utils/errors/HttpError';
import UserService from './UserService';

@injectable()
class SpendingDivisionService {
    constructor(
        @inject('UserService')
        private userService: UserService,
    ) {}

    public async getBasicSpendingDivision(
        userId: string,
    ): Promise<SpendingDivisionInterface> {
        const user = await this.userService.findById(userId);

        if (!user.financial_movements || user.financial_movements.length <= 0) {
            throw new HttpError(
                400,
                'This User has no financial movements registered yet.',
            );
        }

        const incomes = user.financial_movements
            .filter(movement => movement.classification === 'receita')
            .map(movement => movement.value);

        if (incomes.length <= 0) {
            throw new HttpError(
                400,
                'This User has no financial movements as "receita" registered yet.',
            );
        }
        const income = {
            inPercentage: 1,
            inValue: incomes.reduce(
                (incomeValueSum, incomeValue) => incomeValueSum + incomeValue,
            ),
        };

        const essentialExpenses = {
            inPercentage: 0.5,
            inValue: Math.round(income.inValue * 0.5 * 100) / 100,
        };
        const nonEssentialExpenses = {
            inPercentage: 0.1,
            inValue: Math.round(income.inValue * 0.1 * 100) / 100,
        };
        const investments = {
            inPercentage: 0.3,
            inValue: Math.round(income.inValue * 0.3 * 100) / 100,
        };
        const waste = {
            inPercentage: 0.1,
            inValue: Math.round(income.inValue * 0.1 * 100) / 100,
        };

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
    }

    public async getSpendingDivisionByUser(
        userId: string,
    ): Promise<SpendingDivisionInterface> {
        const user = await this.userService.findById(userId);
        const essentialExpenses = {
            inPercentage: 0,
            inValue: 0,
        };
        const nonEssentialExpenses = {
            inPercentage: 0,
            inValue: 0,
        };
        const investments = {
            inPercentage: 0,
            inValue: 0,
        };
        const waste = {
            inPercentage: 0,
            inValue: 0,
        };
        const remnant = {
            inPercentage: 0,
            inValue: 0,
        };

        if (!user.financial_movements || user.financial_movements.length <= 0) {
            throw new HttpError(
                400,
                'This User has no financial movements registered yet.',
            );
        }

        const incomes = user.financial_movements
            .filter(movement => movement.classification === 'receita')
            .map(movement => movement.value);

        if (incomes.length <= 0) {
            throw new HttpError(
                400,
                'This User has no financial movements as "receita" registered yet.',
            );
        }

        const income = {
            inPercentage: 1,
            inValue: incomes.reduce(
                (incomeValueSum, incomeValue) => incomeValueSum + incomeValue,
            ),
        };

        remnant.inValue = income.inValue;
        remnant.inPercentage = income.inPercentage;

        const essentialExpensesRegistered = user.financial_movements
            .filter(movement => movement.classification === 'gastos essenciais')
            .map(movement => movement.value);

        if (essentialExpensesRegistered.length > 0) {
            const sumOfessentialExpenses = essentialExpensesRegistered.reduce(
                (valueSum, valueRegistered) => valueSum + valueRegistered,
            );
            remnant.inValue -= sumOfessentialExpenses;
            essentialExpenses.inValue -= sumOfessentialExpenses;
            essentialExpenses.inPercentage =
                Math.round((sumOfessentialExpenses * 100) / income.inValue) / 100;
        }

        const nonEssentialExpensesRegistered = user.financial_movements
            .filter(movement => movement.classification === 'gastos não essenciais')
            .map(movement => movement.value);

        if (nonEssentialExpensesRegistered.length > 0) {
            const sumOfNonEssentialExpenses = nonEssentialExpensesRegistered.reduce(
                (valueSum, valueRegistered) => valueSum + valueRegistered,
            );
            remnant.inValue -= sumOfNonEssentialExpenses;
            nonEssentialExpenses.inValue -= sumOfNonEssentialExpenses;
            nonEssentialExpenses.inPercentage =
                Math.round((sumOfNonEssentialExpenses * 100) / income.inValue) / 100;
        }

        const investmentsRegistered = user.financial_movements
            .filter(movement => movement.classification === 'investimentos')
            .map(movement => movement.value);

        if (investmentsRegistered.length > 0) {
            const sumOfInvestments = investmentsRegistered.reduce(
                (valueSum, valueRegistered) => valueSum + valueRegistered,
            );
            remnant.inValue -= sumOfInvestments;
            investments.inValue -= sumOfInvestments;
            investments.inPercentage =
                Math.round((sumOfInvestments * 100) / income.inValue) / 100;
        }

        const wastesRegistered = user.financial_movements
            .filter(movement => movement.classification === 'torrar')
            .map(movement => movement.value);

        if (wastesRegistered.length > 0) {
            const sumOfWaste = wastesRegistered.reduce(
                (valueSum, valueRegistered) => valueSum + valueRegistered,
            );
            remnant.inValue -= sumOfWaste;
            waste.inValue -= sumOfWaste;
            waste.inPercentage =
                Math.round((sumOfWaste * 100) / income.inValue) / 100;
        }

        remnant.inPercentage =
            Math.round((remnant.inValue * 100) / income.inValue) / 100;

        return {
            income,
            essentialExpenses,
            nonEssentialExpenses,
            investments,
            waste,
            remnant,
        };
    }
}

export default SpendingDivisionService;
