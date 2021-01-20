import connect from '../../database/connection';
import FinancialMovementRepository from '../../repositories/financialMovement';
import UserRepository from '../../repositories/user';
import FinancialMovementBuilder from '../testBuilders/FinancialMovementBuilder';
import UserBuilder from '../testBuilders/UserBuilder';

describe('FinancialMovement context', () => {
    let financialMovementRepository: FinancialMovementRepository;
    let userRepository: UserRepository;

    beforeAll(async () => {
        await connect();
        userRepository = new UserRepository();
        financialMovementRepository = new FinancialMovementRepository();
    });

    it('should be able to create new FinancialMovement', async () => {
        const user = new UserBuilder()
            .withName('Gabriel')
            .withEmail('gabriel@teste.com')
            .withFinancialMovements([])
            .build();

        const createdUser = await userRepository.createAndSave(user);

        const movement = new FinancialMovementBuilder()
            .withName('Gabriel')
            .withUserId(createdUser.id)
            .withValue(123.01)
            .withClassification('receita')
            .build();

        const {
            id,
            created_at,
            updated_at,
            ...entityProps
        } = await financialMovementRepository.createAndSave(movement);

        expect(entityProps).toEqual(movement);
        expect(id).not.toBeUndefined();
        expect(created_at).not.toBeUndefined();
        expect(updated_at).not.toBeUndefined();
    });

    it('Should return an FinancialMovement when find by id', async () => {
        const user = new UserBuilder()
            .withName('Gabriel')
            .withEmail('gabriel@teste.com')
            .withFinancialMovements([])
            .build();

        const createdUser = await userRepository.createAndSave(user);

        const movement = new FinancialMovementBuilder()
            .withName('Gabriel')
            .withUserId(createdUser.id)
            .withValue(123.01)
            .withClassification('receita')
            .build();

        const createdFinancialMovement = await financialMovementRepository.createAndSave(
            movement,
        );

        const res = await financialMovementRepository.findById(
            createdFinancialMovement.id,
        );

        expect(res).toEqual(createdFinancialMovement);
    });

    it('Should return all Financial Movements', async () => {
        const user = new UserBuilder()
            .withName('Gabriel')
            .withEmail('gabriel@teste.com')
            .withFinancialMovements([])
            .build();

        const createdUser = await userRepository.createAndSave(user);

        const movement1 = new FinancialMovementBuilder()
            .withName('Gabriel')
            .withUserId(createdUser.id)
            .withValue(123.01)
            .withClassification('receita')
            .build();

        const movement2 = new FinancialMovementBuilder()
            .withName('Gabriel')
            .withUserId(createdUser.id)
            .withValue(123.01)
            .withClassification('receita')
            .build();

        const { id: id1 } = await financialMovementRepository.createAndSave(
            movement1,
        );
        const { id: id2 } = await financialMovementRepository.createAndSave(
            movement2,
        );

        const res = await financialMovementRepository.getAll();

        const arrrayOfIds = res.data.map(movement => movement.id);

        expect(arrrayOfIds.includes(id1)).toBeTruthy();
        expect(arrrayOfIds.includes(id2)).toBeTruthy();
    });

    it('Should be able to update an Financial Movements by id', async () => {
        const user = new UserBuilder()
            .withName('Gabriel')
            .withEmail('gabriel@teste.com')
            .withFinancialMovements([])
            .build();

        const createdUser = await userRepository.createAndSave(user);

        const movement = new FinancialMovementBuilder()
            .withName('Gabriel')
            .withUserId(createdUser.id)
            .withValue(123.01)
            .withClassification('receita')
            .build();

        const createdMovement = await financialMovementRepository.createAndSave(
            movement,
        );

        createdMovement.value = 321.05;

        const res = await financialMovementRepository.update(createdMovement);

        expect(res).toEqual(createdMovement);
        expect(res.id).toBe(createdMovement.id);
    });

    it('Should be able to remove an Financial Movements by id', async () => {
        const user = new UserBuilder()
            .withName('Gabriel')
            .withEmail('gabriel@teste.com')
            .withFinancialMovements([])
            .build();

        const createdUser = await userRepository.createAndSave(user);

        const movement = new FinancialMovementBuilder()
            .withName('Gabriel')
            .withUserId(createdUser.id)
            .withValue(123.01)
            .withClassification('receita')
            .build();

        const createdMovement = await financialMovementRepository.createAndSave(
            movement,
        );

        const res = await financialMovementRepository.remove(createdMovement.id);

        expect(res).toEqual({ raw: [] });
    });
});
