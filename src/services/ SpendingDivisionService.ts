import { inject, injectable } from 'tsyringe';
import SpendingDivisionBase from '../database/entities/SpendingDivisionBase';
import IFinancialMovementRepository from '../interfaces/repositories/IFinancialMovementRepository';
import ISpendingDivisionBaseRepository from '../interfaces/repositories/ISpendingDivisionBaseRepository';
import { SpendingDivisionBaseInterface } from '../interfaces/SpendingDivisionBaseInterface';

import { SpendingDivisionInterface } from '../interfaces/SpendingDivisionInterface';
import { buildSpendingDivision } from '../utils/builders/spendingDivision';
import { HttpError } from '../utils/errors/HttpError';
import { calculatePercentage } from '../utils/spendingDivision';
import UserService from './UserService';

@injectable()
class SpendingDivisionService {
    constructor(
        @inject('SpendingDivisionBaseRepository')
        private spendingDivisionBaseRepository: ISpendingDivisionBaseRepository,

        @inject('UserService')
        private userService: UserService,

        @inject('FinancialMovementRepository')
        private financialMovementRepository: IFinancialMovementRepository,
    ) {}

    public async create(
        spendingDivisionBaseData: SpendingDivisionBaseInterface,
    ): Promise<SpendingDivisionBase> {
        await this.userService.findById(spendingDivisionBaseData.user_id);

        return this.spendingDivisionBaseRepository.createAndSave(
            spendingDivisionBaseData,
        );
    }

    public async update(
        spendingDivisionBaseUpdate: SpendingDivisionBaseInterface,
    ): Promise<SpendingDivisionBase> {
        await this.userService.findById(spendingDivisionBaseUpdate.user_id);

        const foundSpendingDivisionBase = await this.spendingDivisionBaseRepository.findByUserId(
            spendingDivisionBaseUpdate.user_id,
        );

        if (!foundSpendingDivisionBase) {
            throw new HttpError(
                404,
                'This User has no spending division base registered yet.',
            );
        }

        return this.spendingDivisionBaseRepository.update(
            Object.assign(foundSpendingDivisionBase, {
                ...spendingDivisionBaseUpdate,
            }),
        );
    }

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
            .filter(movement => movement.classification === 'RECEITAS')
            .map(movement => movement.value);

        if (incomes.length <= 0) {
            throw new HttpError(
                400,
                'This User has no financial movements as "RECEITAS" registered yet.',
            );
        }

        let spendingDivisionBase = await this.spendingDivisionBaseRepository.findByUserId(
            userId,
        );

        if (!spendingDivisionBase) {
            spendingDivisionBase = await this.create(<SpendingDivisionBaseInterface>{
                user_id: userId,
                essential_expenses: 0.5,
                non_essential_expenses: 0.1,
                wastes: 0.1,
                investments: 0.3,
            });
        }

        const income = {
            inPercentage: 1,
            inValue: incomes.reduce(
                (incomeValueSum, incomeValue) => incomeValueSum + incomeValue,
            ),
        };

        const essentialExpenses = {
            inPercentage: spendingDivisionBase.essential_expenses,
            inValue:
                Math.round(
                    income.inValue * spendingDivisionBase.essential_expenses * 100,
                ) / 100,
        };
        const nonEssentialExpenses = {
            inPercentage: spendingDivisionBase.non_essential_expenses,
            inValue:
                Math.round(
                    income.inValue *
                        spendingDivisionBase.non_essential_expenses *
                        100,
                ) / 100,
        };
        const investments = {
            inPercentage: spendingDivisionBase.investments,
            inValue:
                Math.round(income.inValue * spendingDivisionBase.investments * 100) /
                100,
        };
        const waste = {
            inPercentage: spendingDivisionBase.wastes,
            inValue:
                Math.round(income.inValue * spendingDivisionBase.wastes * 100) / 100,
        };

        const remnantInValue =
            income.inValue -
            essentialExpenses.inValue -
            nonEssentialExpenses.inValue -
            investments.inValue -
            waste.inValue;

        const remnant = {
            inPercentage: calculatePercentage(income.inValue, remnantInValue),
            inValue: remnantInValue,
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
        startDateFilter: string,
        endDateFilter: string,
    ): Promise<SpendingDivisionInterface> {
        const user = await this.userService.findById(userId);

        if (!user.financial_movements || user.financial_movements.length <= 0) {
            throw new HttpError(
                400,
                'This User has no financial movements registered yet.',
            );
        }

        const incomesRegistered = user.financial_movements.filter(
            movement => movement.classification === 'RECEITAS',
        );

        if (incomesRegistered.length <= 0) {
            throw new HttpError(
                400,
                'This User has no financial movements as "RECEITAS" registered yet.',
            );
        }

        const financialGroups = await this.financialMovementRepository.getAllGroupByClassification(
            userId,
            startDateFilter,
            endDateFilter,
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
            movement => movement.classification === 'GASTOS ESSENCIAIS',
        );

        nonEssentialExpenses.financial_movements = user.financial_movements.filter(
            movement => movement.classification === 'GASTOS NAO ESSENCIAIS',
        );

        investments.financial_movements = user.financial_movements.filter(
            movement => movement.classification === 'INVESTIMENTOS',
        );

        waste.financial_movements = user.financial_movements.filter(
            movement => movement.classification === 'GASTOS LIVRES',
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
