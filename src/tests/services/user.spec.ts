import { v4 } from 'uuid';

import UserService from '../../services/UserService';
import User from '../../database/entities/User';
import { UserInterface } from '../../interfaces/UserInterface';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import { HttpError } from '../../utils/errors/HttpError';

describe('User Service', () => {
    let userService: UserService;
    let fakeUserRepository: FakeUserRepository;

    beforeEach(async () => {
        fakeUserRepository = new FakeUserRepository();
        userService = new UserService(fakeUserRepository);
    });

    const makeSut = (userData?: Partial<UserInterface>): Promise<User> => {
        const user: UserInterface = {
            id: v4(),
            name: 'Gabriel',
            email: 'gabriel@teste.com',
            created_at: new Date(),
            updated_at: new Date(),
        };

        return userService.create(Object.assign(user, userData));
    };

    it('should be able to create a new User', async () => {
        const sut = {
            name: 'Gabriel',
            email: 'gabriel@teste.com',
        };

        const res = await userService.create(sut);

        const expectedRes = {
            ...sut,
            id: res.id,
            created_at: res.created_at,
            updated_at: res.updated_at,
        };

        expect(res).toEqual(expectedRes);
    });

    it('should be able to find a User by id', async () => {
        const sut = await makeSut();

        const expectedRes = <User>{
            id: sut.id,
            name: 'Gabriel',
            email: 'gabriel@teste.com',
            created_at: sut.created_at,
            updated_at: sut.updated_at,
        };

        const res = await userService.findById(sut.id);

        expect(res).toEqual(expectedRes);
    });

    it('should not to be able to find a User by id', async () => {
        expect.hasAssertions();

        try {
            await userService.findById(v4());
        } catch (error) {
            expect(error).toBeInstanceOf(HttpError);
            expect(error.message).toBe('User not found');
        }
    });

    it('should be able to get all Users', async () => {
        const sut1 = await makeSut();
        const sut2 = await makeSut();

        const expectedRes = {
            data: [sut1, sut2],
            count: 2,
            limit: 20,
            page: 1,
            totalPages: 1,
        };

        const res = await userService.getAll({});

        expect(res).toEqual(expectedRes);
    });

    it('should be able to get all Users and return a empty array', async () => {
        const expectedRes = {
            data: [],
            count: 0,
            limit: 20,
            page: 1,
            totalPages: 0,
        };

        const res = await userService.getAll({});

        expect(res).toEqual(expectedRes);
    });

    it('should be able to update a User by id', async () => {
        const sut = await makeSut();

        const email = 'gabriel@update.com';

        const expectedRes = <User>{
            id: sut.id,
            name: 'Gabriel',
            email: 'gabriel@update.com',
            created_at: sut.created_at,
            updated_at: sut.updated_at,
        };

        const res = await userService.update(sut.id, <any>{ email });

        expect(res).toEqual(expectedRes);
    });

    it('should not to be able to update a User by id', async () => {
        expect.hasAssertions();

        try {
            await userService.update(v4(), <any>{});
        } catch (error) {
            expect(error).toBeInstanceOf(HttpError);
            expect(error.message).toBe('User not found');
        }
    });

    it('should be able to remove a User by id', async () => {
        const sut = await makeSut();

        const res = await userService.remove(sut.id);

        expect(res).toEqual({ raw: [] });
    });

    it('should not to be able to remove a User by id', async () => {
        expect.hasAssertions();

        try {
            await userService.remove(v4());
        } catch (error) {
            expect(error).toBeInstanceOf(HttpError);
            expect(error.message).toBe('User not found');
        }
    });
});
