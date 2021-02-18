import connect from '../../database/connection';
import SpendingDivisionBaseRepository from '../../repositories/spendingDivisionBase';
import UserRepository from '../../repositories/user';
import SpendingDivisionBaseBuilder from '../testBuilders/SpendingDivisionBaseBuilder';
import UserBuilder from '../testBuilders/UserBuilder';

describe('SpendingDivisionBase context', () => {
    let spendingDivisionBaseRepository: SpendingDivisionBaseRepository;
    let userRepository: UserRepository;

    beforeAll(async () => {
        await connect(true);
        userRepository = new UserRepository();
        spendingDivisionBaseRepository = new SpendingDivisionBaseRepository();
    });

    it('should be able to create new SpendingDivisionBase', async () => {
        const user = new UserBuilder()
            .withName('Gabriel')
            .withEmail('gabriel@teste.com')
            .withPassword('123456')
            .build();

        const createdUser = await userRepository.createAndSave(user);

        const spendingDivisionBase = new SpendingDivisionBaseBuilder()
            .withUserId(createdUser.id)
            .withEssentialExpenses(0.3)
            .withNonEssentialExpenses(0.1)
            .withWastes(0.1)
            .withInvestments(0.5)
            .build();

        const {
            id,
            created_at,
            updated_at,
            ...entityProps
        } = await spendingDivisionBaseRepository.createAndSave(spendingDivisionBase);

        await userRepository.remove(createdUser.id);

        expect(entityProps).toEqual(spendingDivisionBase);
        expect(id).not.toBeUndefined();
        expect(created_at).not.toBeUndefined();
        expect(updated_at).not.toBeUndefined();
    });

    it('Should return an SpendingDivisionBase when find by id', async () => {
        const user = new UserBuilder()
            .withName('Gabriel')
            .withEmail('gabriel@teste.com')
            .withPassword('123456')
            .build();

        const createdUser = await userRepository.createAndSave(user);

        const spendingDivisionBase = new SpendingDivisionBaseBuilder()
            .withUserId(createdUser.id)
            .withEssentialExpenses(0.3)
            .withNonEssentialExpenses(0.1)
            .withWastes(0.1)
            .withInvestments(0.5)
            .build();

        const createdSpendingDivisionBase = await spendingDivisionBaseRepository.createAndSave(
            spendingDivisionBase,
        );

        const res = await spendingDivisionBaseRepository.findById(
            createdSpendingDivisionBase.id,
        );

        await userRepository.remove(createdUser.id);

        expect(res).toEqual(createdSpendingDivisionBase);
    });

    it('Should return an SpendingDivisionBase when find by user_id', async () => {
        const user = new UserBuilder()
            .withName('Gabriel')
            .withEmail('gabriel@teste.com')
            .withPassword('123456')
            .build();

        const createdUser = await userRepository.createAndSave(user);

        const spendingDivisionBase = new SpendingDivisionBaseBuilder()
            .withUserId(createdUser.id)
            .withEssentialExpenses(0.3)
            .withNonEssentialExpenses(0.1)
            .withWastes(0.1)
            .withInvestments(0.5)
            .build();

        const createdSpendingDivisionBase = await spendingDivisionBaseRepository.createAndSave(
            spendingDivisionBase,
        );

        const res = await spendingDivisionBaseRepository.findByUserId(
            createdSpendingDivisionBase.user_id,
        );

        await userRepository.remove(createdUser.id);

        expect(res).toEqual(createdSpendingDivisionBase);
    });

    it('Should be able to update an Financial Movements by id', async () => {
        const user = new UserBuilder()
            .withName('Gabriel')
            .withEmail('gabriel@teste.com')
            .withPassword('123456')
            .build();

        const createdUser = await userRepository.createAndSave(user);

        const spendingDivisionBase = new SpendingDivisionBaseBuilder()
            .withUserId(createdUser.id)
            .withEssentialExpenses(0.3)
            .withNonEssentialExpenses(0.1)
            .withWastes(0.1)
            .withInvestments(0.5)
            .build();

        const createdSpendingDivisionBase = await spendingDivisionBaseRepository.createAndSave(
            spendingDivisionBase,
        );

        createdSpendingDivisionBase.investments = 0.4;
        createdSpendingDivisionBase.wastes = 0.2;

        const res = await spendingDivisionBaseRepository.update(
            createdSpendingDivisionBase,
        );

        await userRepository.remove(createdUser.id);

        expect(res).toEqual(createdSpendingDivisionBase);
        expect(res.id).toBe(createdSpendingDivisionBase.id);
    });
});
