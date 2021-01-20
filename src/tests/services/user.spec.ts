import { v4 } from 'uuid';

import UserService from '../../services/UserService';
import User from '../../database/entities/User';
import { UserInterface } from '../../interfaces/UserInterface';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

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
});
