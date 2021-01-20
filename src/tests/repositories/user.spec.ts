import connect from '../../database/connection';
import UserRepository from '../../repositories/user';
import UserBuilder from '../testBuilders/UserBuilder';

describe('User context', () => {
    let userRepository: UserRepository;

    beforeAll(async () => {
        await connect();
        userRepository = new UserRepository();
    });

    it('should be able to create new User', async () => {
        const user = new UserBuilder()
            .withName('Gabriel')
            .withEmail('gabriel@teste.com')
            .build();

        const {
            id,
            created_at,
            updated_at,
            ...entityProps
        } = await userRepository.createAndSave(user);

        expect(entityProps).toEqual(user);
        expect(id).not.toBeUndefined();
        expect(created_at).not.toBeUndefined();
        expect(updated_at).not.toBeUndefined();
    });

    it('Should return an User when find by id', async () => {
        const user = new UserBuilder()
            .withName('Gabriel')
            .withEmail('gabriel@teste.com')
            .withFinancialMovements([])
            .build();

        const createdUser = await userRepository.createAndSave(user);

        const res = await userRepository.findById(createdUser.id);

        expect(res).toEqual(createdUser);
    });

    it('Should return all Users', async () => {
        const user1 = new UserBuilder()
            .withName('Gabriel')
            .withEmail('gabriel@teste.com')
            .withFinancialMovements([])
            .build();

        const user2 = new UserBuilder()
            .withName('Gabriel')
            .withEmail('gabriel@teste.com')
            .withFinancialMovements([])
            .build();

        const { id: id1 } = await userRepository.createAndSave(user1);
        const { id: id2 } = await userRepository.createAndSave(user2);

        const res = await userRepository.getAll();

        const arrrayOfIds = res.data.map(user => user.id);

        expect(arrrayOfIds.includes(id1)).toBeTruthy();
        expect(arrrayOfIds.includes(id2)).toBeTruthy();
    });

    it('Should be able to update an User by id', async () => {
        const user = new UserBuilder()
            .withName('Gabriel')
            .withEmail('gabriel@teste.com')
            .withFinancialMovements([])
            .build();

        const createdUser = await userRepository.createAndSave(user);

        createdUser.email = 'gabriel@updated.com';

        const res = await userRepository.update(createdUser);

        expect(res).toEqual(createdUser);
        expect(res.id).toBe(createdUser.id);
    });

    it('Should be able to remove an User by id', async () => {
        const user = new UserBuilder()
            .withName('Gabriel')
            .withEmail('gabriel@teste.com')
            .withFinancialMovements([])
            .build();

        const createdUser = await userRepository.createAndSave(user);

        const res = await userRepository.remove(createdUser.id);

        expect(res).toEqual({ raw: [] });
    });
});
