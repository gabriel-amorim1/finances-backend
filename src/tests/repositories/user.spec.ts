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
});
