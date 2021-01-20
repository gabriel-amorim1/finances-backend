import { v4 } from 'uuid';

import FinancialMovementService from '../../services/FinancialMovementService';
import FinancialMovement from '../../database/entities/FinancialMovement';
import { FinancialMovementInterface } from '../../interfaces/FinancialMovementInterface';
import FakeFinancialMovementRepository from '../repositories/fakes/FakeFinancialMovementRepository';
import UserService from '../../services/UserService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import { UserInterface } from '../../interfaces/UserInterface';

describe('FinancialMovement Service', () => {
    let financialMovementService: FinancialMovementService;
    let userService: UserService;
    let fakeUserRepository: FakeUserRepository;
    let fakeFinancialMovementRepository: FakeFinancialMovementRepository;

    beforeEach(async () => {
        fakeUserRepository = new FakeUserRepository();
        userService = new UserService(fakeUserRepository);
        fakeFinancialMovementRepository = new FakeFinancialMovementRepository();
        financialMovementService = new FinancialMovementService(
            fakeFinancialMovementRepository,
            userService,
        );
    });

    const makeSut = async (
        financialMovementData?: Partial<FinancialMovementInterface>,
    ): Promise<FinancialMovement> => {
        const user: UserInterface = {
            id: v4(),
            name: 'Gabriel',
            email: 'gabriel@teste.com',
            created_at: new Date(),
            updated_at: new Date(),
        };

        const createdUser = await userService.create(Object.assign(user));

        const financialMovement: FinancialMovementInterface = {
            id: v4(),
            name: 'Gabriel',
            user_id: createdUser.id,
            value: 123.01,
            classification: 'receita',
            created_at: new Date(),
            updated_at: new Date(),
        };

        return financialMovementService.create(
            Object.assign(financialMovement, financialMovementData),
        );
    };

    it('should be able to create a new FinancialMovement', async () => {
        const user: UserInterface = {
            id: v4(),
            name: 'Gabriel',
            email: 'gabriel@teste.com',
            created_at: new Date(),
            updated_at: new Date(),
        };

        const createdUser = await userService.create(Object.assign(user));

        const financialMovement: FinancialMovementInterface = {
            name: 'Gabriel',
            user_id: createdUser.id,
            value: 123.01,
            classification: 'receita',
        };

        const res = await financialMovementService.create(financialMovement);

        const expectedRes = {
            ...financialMovement,
            id: res.id,
            created_at: res.created_at,
            updated_at: res.updated_at,
        };

        expect(res).toEqual(expectedRes);
    });

    it('should be able to find a FinancialMovement by id', async () => {
        const sut = await makeSut();

        const res = await financialMovementService.findById(sut.id);

        expect(res).toEqual(sut);
    });
});
