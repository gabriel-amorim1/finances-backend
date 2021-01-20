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
});
