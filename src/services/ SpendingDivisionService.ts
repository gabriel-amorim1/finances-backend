import { inject, injectable } from 'tsyringe';
import IFinancialMovementRepository from '../interfaces/repositories/IFinancialMovementRepository';

import { SpendingDivisionInterface } from '../interfaces/SpendingDivisionInterface';
import { buildSpendingDivision } from '../utils/builders/spendingDivision';
import { HttpError } from '../utils/errors/HttpError';
import { calculatePercentage } from '../utils/spendingDivision';
import UserService from './UserService';

@injectable()
class SpendingDivisionService {
    constructor(
        @inject('UserService')
        private userService: UserService,

        @inject('FinancialMovementRepository')
        private financialMovementRepository: IFinancialMovementRepository,
    ) {}

    public async getBaseSpendingDivision(
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

        if (!user.financial_movements || user.financial_movements.length <= 0) {
            throw new HttpError(
                400,
                'This User has no financial movements registered yet.',
            );
        }

        const incomesRegistered = user.financial_movements.filter(
            movement => movement.classification === 'receita',
        );

        if (incomesRegistered.length <= 0) {
            throw new HttpError(
                400,
                'This User has no financial movements as "receita" registered yet.',
            );
        }

        const financialGroups = await this.financialMovementRepository.getAllGroupByClassification(
            userId,
        );

        const {
            income,
            essentialExpenses,
            nonEssentialExpenses,
            investments,
            waste,
            remnant,
        } = buildSpendingDivision(financialGroups);

        income.financial_movements = incomesRegistered;

        essentialExpenses.financial_movements = user.financial_movements.filter(
            movement => movement.classification === 'gastos essenciais',
        );

        nonEssentialExpenses.financial_movements = user.financial_movements.filter(
            movement => movement.classification === 'gastos não essenciais',
        );

        investments.financial_movements = user.financial_movements.filter(
            movement => movement.classification === 'investimentos',
        );

        waste.financial_movements = user.financial_movements.filter(
            movement => movement.classification === 'torrar',
        );

        remnant.inValue =
            income.inValue -
            essentialExpenses.inValue -
            nonEssentialExpenses.inValue -
            investments.inValue -
            waste.inValue;
        remnant.inPercentage = calculatePercentage(income.inValue, remnant.inValue);

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
