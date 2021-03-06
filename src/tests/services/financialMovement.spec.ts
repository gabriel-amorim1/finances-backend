import { v4 } from 'uuid';

import FinancialMovementService from '../../services/FinancialMovementService';
import FinancialMovement from '../../database/entities/FinancialMovement';
import { FinancialMovementInterface } from '../../interfaces/FinancialMovementInterface';
import FakeFinancialMovementRepository from '../repositories/fakes/FakeFinancialMovementRepository';
import UserService from '../../services/UserService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import { UserInterface } from '../../interfaces/UserInterface';
import { HttpError } from '../../utils/errors/HttpError';

describe('FinancialMovement Service', () => {
    let financialMovementService: FinancialMovementService;
    let userService: UserService;
    let fakeUserRepository: FakeUserRepository;
    let fakeFinancialMovementRepository: FakeFinancialMovementRepository;

    beforeEach(async () => {
        fakeFinancialMovementRepository = new FakeFinancialMovementRepository();
        fakeUserRepository = new FakeUserRepository(fakeFinancialMovementRepository);
        userService = new UserService(fakeUserRepository);
        financialMovementService = new FinancialMovementService(
            fakeFinancialMovementRepository,
            userService,
        );
    });

    const makeSut = async (
        financialMovementData?: Partial<FinancialMovementInterface>,
        userData?: Partial<UserInterface>,
    ): Promise<FinancialMovement> => {
        const user: UserInterface = {
            id: v4(),
            name: 'Gabriel',
            email: 'gabriel@teste.com',
            created_at: new Date(),
            updated_at: new Date(),
            ...userData,
        };

        const createdUser = await userService.create(Object.assign(user));

        const financialMovement: FinancialMovementInterface = {
            id: v4(),
            name: 'Gabriel',
            user_id: createdUser.id!,
            value: 123.01,
            classification: 'RECEITAS',
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
            user_id: createdUser.id!,
            value: 123.01,
            classification: 'RECEITAS',
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

    it('should be able to get all FinancialMovements', async () => {
        const sut1 = await makeSut();
        const sut2 = await makeSut(undefined, { email: 'teste@teste.com' });

        const expectedRes = {
            data: [sut1, sut2],
            count: 2,
            limit: 20,
            page: 1,
            totalPages: 1,
        };

        const res = await financialMovementService.getAll({}, sut1.id);

        expect(res).toEqual(expectedRes);
    });

    it('should be able to get all FinancialMovement and return a empty array', async () => {
        const user: UserInterface = {
            id: v4(),
            name: 'Gabriel',
            email: 'gabriel@teste.com',
            created_at: new Date(),
            updated_at: new Date(),
        };

        const createdUser = await userService.create(Object.assign(user));

        const expectedRes = {
            data: [],
            count: 0,
            limit: 20,
            page: 1,
            totalPages: 0,
        };

        const res = await financialMovementService.getAll({}, createdUser.id!);

        expect(res).toEqual(expectedRes);
    });

    it('should be able to update a FinancialMovement by id', async () => {
        const sut = await makeSut();

        const value = 321.05;

        const expectedRes = <FinancialMovement>{
            ...sut,
            value,
        };

        const res = await financialMovementService.update(sut.id, <any>{ value });

        expect(res).toEqual(expectedRes);
    });

    it('should not to be able to update a FinancialMovement by id', async () => {
        expect.hasAssertions();

        try {
            await financialMovementService.update(v4(), <any>{});
        } catch (error) {
            expect(error).toBeInstanceOf(HttpError);
            expect(error.message).toBe('Financial Movement not found');
        }
    });

    it('should be able to remove a FinancialMovement by id', async () => {
        const sut = await makeSut();

        const res = await financialMovementService.remove(sut.id);

        expect(res).toEqual({ raw: [] });
    });

    it('should not to be able to remove a FinancialMovement by id', async () => {
        expect.hasAssertions();

        try {
            await financialMovementService.remove(v4());
        } catch (error) {
            expect(error).toBeInstanceOf(HttpError);
            expect(error.message).toBe('Financial Movement not found');
        }
    });
});
