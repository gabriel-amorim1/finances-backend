import FinancialMovementService from '../../services/FinancialMovementService';
import FinancialMovement from '../../database/entities/FinancialMovement';
import FakeFinancialMovementRepository from '../repositories/fakes/FakeFinancialMovementRepository';
import UserService from '../../services/UserService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import SpendingDivisionService from '../../services/ SpendingDivisionService';
import FinancialMovementBuilder from '../testBuilders/FinancialMovementBuilder';
import User from '../../database/entities/User';
import UserBuilder from '../testBuilders/UserBuilder';
import { HttpError } from '../../utils/errors/HttpError';

describe('Spending Division Service', () => {
    let financialMovementService: FinancialMovementService;
    let userService: UserService;
    let spendingDivisionService: SpendingDivisionService;
    let fakeUserRepository: FakeUserRepository;
    let fakeFinancialMovementRepository: FakeFinancialMovementRepository;

    beforeEach(async () => {
        fakeUserRepository = new FakeUserRepository();
        userService = new UserService(fakeUserRepository);
        spendingDivisionService = new SpendingDivisionService(userService);
        fakeFinancialMovementRepository = new FakeFinancialMovementRepository();
        financialMovementService = new FinancialMovementService(
            fakeFinancialMovementRepository,
            userService,
        );
    });

    const makeSut = async (): Promise<User> => {
        const user = new UserBuilder()
            .withName('Gabriel')
            .withEmail('gabriel@teste.com')
            .build();

        const createdUser = await userService.create(user);

        const financial_movements: FinancialMovement[] = [];

        const income = new FinancialMovementBuilder()
            .withUserId(createdUser.id)
            .withClassification('receita')
            .withName('Salário')
            .withValue(15000)
            .build();

        financial_movements.push(await financialMovementService.create(income));

        const essentialExpense = new FinancialMovementBuilder()
            .withUserId(createdUser.id)
            .withClassification('gastos essenciais')
            .withName('Despesas Domésticas')
            .withValue(5000)
            .build();

        financial_movements.push(
            await financialMovementService.create(essentialExpense),
        );

        const nonEssentialExpense = new FinancialMovementBuilder()
            .withUserId(createdUser.id)
            .withClassification('gastos não essenciais')
            .withName('Academia')
            .withValue(500)
            .build();

        financial_movements.push(
            await financialMovementService.create(nonEssentialExpense),
        );

        const investment = new FinancialMovementBuilder()
            .withUserId(createdUser.id)
            .withClassification('investimentos')
            .withName('CDB Banco Inter')
            .withValue(1000)
            .build();

        financial_movements.push(await financialMovementService.create(investment));

        const waste = new FinancialMovementBuilder()
            .withUserId(createdUser.id)
            .withClassification('torrar')
            .withName('Rolês')
            .withValue(3000)
            .build();

        financial_movements.push(await financialMovementService.create(waste));

        createdUser.financial_movements!.push(...financial_movements);

        return userService.update(createdUser.id, createdUser);
    };

    it('should return base spending by user', async () => {
        const user = await makeSut();

        const res = await spendingDivisionService.getBaseSpendingDivision(user.id);

        const expectedRes = {
            income: { inPercentage: 1, inValue: 15000 },
            essentialExpenses: { inPercentage: 0.5, inValue: 7500 },
            nonEssentialExpenses: { inPercentage: 0.1, inValue: 1500 },
            investments: { inPercentage: 0.3, inValue: 4500 },
            waste: { inPercentage: 0.1, inValue: 1500 },
            remnant: { inPercentage: 0, inValue: 0 },
        };

        expect(res).toEqual(expectedRes);
    });

    it('getBaseSpendingDivision - This User has no financial movements registered yet.', async () => {
        expect.hasAssertions();

        try {
            const user = new UserBuilder()
                .withName('Gabriel')
                .withEmail('gabriel@teste.com')
                .build();

            const createdUser = await userService.create(user);

            await spendingDivisionService.getBaseSpendingDivision(createdUser.id);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpError);
            expect(error.message).toBe(
                'This User has no financial movements registered yet.',
            );
        }
    });

    it('should return calculated spending by user', async () => {
        const user = await makeSut();

        const res = await spendingDivisionService.getSpendingDivisionByUser(user.id);

        const expectedRes = {
            income: {
                inPercentage: 1,
                inValue: 15000,
                financial_movements: [
                    {
                        user_id: user.id,
                        classification: 'receita',
                        name: 'Salário',
                        value: 15000,
                        id: res.income.financial_movements![0].id,
                        created_at: res.income.financial_movements![0].created_at,
                        updated_at: res.income.financial_movements![0].updated_at,
                    },
                ],
            },
            essentialExpenses: {
                inPercentage: 0.33,
                inValue: 5000,
                financial_movements: [
                    {
                        user_id: user.id,
                        classification: 'gastos essenciais',
                        name: 'Despesas Domésticas',
                        value: 5000,
                        id: res.essentialExpenses.financial_movements![0].id,
                        created_at: res.essentialExpenses.financial_movements![0]
                            .created_at,
                        updated_at: res.essentialExpenses.financial_movements![0]
                            .updated_at,
                    },
                ],
            },
            nonEssentialExpenses: {
                inPercentage: 0.03,
                inValue: 500,
                financial_movements: [
                    {
                        user_id: user.id,
                        classification: 'gastos não essenciais',
                        name: 'Academia',
                        value: 500,
                        id: res.nonEssentialExpenses.financial_movements![0].id,
                        created_at: res.nonEssentialExpenses.financial_movements![0]
                            .created_at,
                        updated_at: res.nonEssentialExpenses.financial_movements![0]
                            .updated_at,
                    },
                ],
            },
            investments: {
                inPercentage: 0.07,
                inValue: 1000,
                financial_movements: [
                    {
                        user_id: user.id,
                        classification: 'investimentos',
                        name: 'CDB Banco Inter',
                        value: 1000,
                        id: res.investments.financial_movements![0].id,
                        created_at: res.investments.financial_movements![0]
                            .created_at,
                        updated_at: res.investments.financial_movements![0]
                            .updated_at,
                    },
                ],
            },
            waste: {
                inPercentage: 0.2,
                inValue: 3000,
                financial_movements: [
                    {
                        user_id: user.id,
                        classification: 'torrar',
                        name: 'Rolês',
                        value: 3000,
                        id: res.waste.financial_movements![0].id,
                        created_at: res.waste.financial_movements![0].created_at,
                        updated_at: res.waste.financial_movements![0].updated_at,
                    },
                ],
            },
            remnant: {
                inPercentage: 0.37,
                inValue: 5500,
                financial_movements: [],
            },
        };

        expect(res).toEqual(expectedRes);
    });

    it('getSpendingDivisionByUser - This User has no financial movements registered yet.', async () => {
        expect.hasAssertions();

        try {
            const user = new UserBuilder()
                .withName('Gabriel')
                .withEmail('gabriel@teste.com')
                .build();

            const createdUser = await userService.create(user);

            await spendingDivisionService.getSpendingDivisionByUser(createdUser.id);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpError);
            expect(error.message).toBe(
                'This User has no financial movements registered yet.',
            );
        }
    });

    it('getSpendingDivisionByUser - This User has no financial movements as "receita" registered yet.', async () => {
        expect.hasAssertions();

        try {
            const user = new UserBuilder()
                .withName('Gabriel')
                .withEmail('gabriel@teste.com')
                .build();

            const createdUser = await userService.create(user);

            const financial_movements: FinancialMovement[] = [];

            const essentialExpense = new FinancialMovementBuilder()
                .withUserId(createdUser.id)
                .withClassification('gastos essenciais')
                .withName('Despesas Domésticas')
                .withValue(5000)
                .build();

            financial_movements.push(
                await financialMovementService.create(essentialExpense),
            );

            createdUser.financial_movements!.push(...financial_movements);

            await userService.update(createdUser.id, createdUser);

            await spendingDivisionService.getSpendingDivisionByUser(createdUser.id);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpError);
            expect(error.message).toBe(
                'This User has no financial movements as "receita" registered yet.',
            );
        }
    });
});
