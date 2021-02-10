import connect from '../../database/connection';
import UserRepository from '../../repositories/user';
import UserBuilder from '../testBuilders/UserBuilder';

describe('User context', () => {
    let userRepository: UserRepository;

    beforeAll(async () => {
        await connect(true);
        userRepository = new UserRepository();
    });

    it('should be able to create new User', async () => {
        const user = new UserBuilder()
            .withName('Gabriel')
            .withEmail('gabriel@teste.com')
            .withPassword('123456')
            .build();

        const {
            id,
            created_at,
            updated_at,
            password_hash,
            ...entityProps
        } = await userRepository.createAndSave(user);

        await userRepository.remove(id);

        expect(entityProps).toEqual(user);
        expect(id).not.toBeUndefined();
        expect(password_hash).not.toBeUndefined();
        expect(created_at).not.toBeUndefined();
        expect(updated_at).not.toBeUndefined();
    });

    it('Should return an User when find by id', async () => {
        const user = new UserBuilder()
            .withName('Gabriel')
            .withEmail('gabriel@teste.com')
            .withPassword('123456')
            .withFinancialMovements([])
            .build();

        const { password, ...createdUser } = await userRepository.createAndSave(
            user,
        );

        const res = await userRepository.findById(createdUser.id);

        await userRepository.remove(createdUser.id);

        expect(res).toEqual(createdUser);
        expect(password).not.toBeUndefined();
    });

    it('Should return an User when find by email', async () => {
        const user = new UserBuilder()
            .withName('Gabriel')
            .withEmail('gabriel@teste.com')
            .withPassword('123456')
            .withFinancialMovements([])
            .build();

        const { password, ...createdUser } = await userRepository.createAndSave(
            user,
        );

        const res = await userRepository.findByEmail(createdUser.email);

        await userRepository.remove(createdUser.id);

        expect(res).toEqual(createdUser);
        expect(password).not.toBeUndefined();
    });

    it('Should return all Users', async () => {
        const options = {
            where: {},
            order: { created_at: 'DESC' },
            take: 20,
            skip: 0,
            orderBy: { columnName: 'created_at', order: 'DESC' },
        };

        const user1 = new UserBuilder()
            .withName('Gabriel')
            .withEmail('gabriel@teste.com')
            .withPassword('123456')
            .withFinancialMovements([])
            .build();

        const user2 = new UserBuilder()
            .withName('Gabriel')
            .withEmail('gabriel@teste.com')
            .withPassword('123456')
            .withFinancialMovements([])
            .build();

        const { id: id1 } = await userRepository.createAndSave(user1);
        const { id: id2 } = await userRepository.createAndSave(user2);

        const res = await userRepository.getAll(<any>options);

        await userRepository.remove(id1);
        await userRepository.remove(id2);

        const arrayOfIds = res.data.map(user => user.id);

        expect(arrayOfIds.includes(id1)).toBeTruthy();
        expect(arrayOfIds.includes(id2)).toBeTruthy();
    });

    it('Should be able to update an User by id', async () => {
        const user = new UserBuilder()
            .withName('Gabriel')
            .withEmail('gabriel@teste.com')
            .withPassword('123456')
            .withFinancialMovements([])
            .build();

        const createdUser = await userRepository.createAndSave(user);

        createdUser.email = 'gabriel@updated.com';

        const res = await userRepository.update(createdUser);

        await userRepository.remove(createdUser.id);

        expect(res).toEqual(createdUser);
        expect(res.id).toBe(createdUser.id);
    });

    it('Should be able to remove an User by id', async () => {
        const user = new UserBuilder()
            .withName('Gabriel')
            .withEmail('gabriel@teste.com')
            .withPassword('123456')
            .withFinancialMovements([])
            .build();

        const createdUser = await userRepository.createAndSave(user);

        const res = await userRepository.remove(createdUser.id);

        expect(res).toEqual({ raw: [] });
    });
});
