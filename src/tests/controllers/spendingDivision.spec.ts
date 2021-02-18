import sinon from 'sinon';
import request from 'supertest';
import { container } from 'tsyringe';

import app from '../../app';
import SpendingDivisionService from '../../services/ SpendingDivisionService';
import { isParamsInValidationErrors } from '../../utils/errors/validationError';
import SpendingDivisionBaseBuilder from '../testBuilders/SpendingDivisionBaseBuilder';

describe('Spending Division Route context', () => {
    let spendingDivisionServiceSpy: sinon.SinonStubbedInstance<SpendingDivisionService>;

    beforeEach(() => {
        process.env.ENVIRONMENT = 'DEV';
        sinon.restore();
        spendingDivisionServiceSpy = sinon.createStubInstance(
            SpendingDivisionService,
        );
    });

    afterAll(() => {
        process.env.ENVIRONMENT = 'PRODUCTION';
    });

    it('should be call create controller with spendingDivisionBaseData data and returns status 201', async () => {
        const spendingDivisionBaseData = new SpendingDivisionBaseBuilder()
            .withEssentialExpenses(0.5)
            .withNonEssentialExpenses(0.1)
            .withWastes(0.1)
            .withInvestments(0.3)
            .build();

        spendingDivisionServiceSpy.create.resolves(<any>spendingDivisionBaseData);
        sinon.stub(container, 'resolve').returns(spendingDivisionServiceSpy);

        const res = await request(app)
            .post('/api/spending-division/base')
            .send(spendingDivisionBaseData);

        expect(res.status).toBe(201);
        expect(res.body).toStrictEqual(spendingDivisionBaseData);
    });

    it('should be return status 400 when not send params in create route', async () => {
        const res = await request(app).post('/api/spending-division/base');

        expect(res.status).toBe(400);
        expect(res.body.message).toEqual('Validation Error');
        expect(
            isParamsInValidationErrors(
                [
                    'non_essential_expenses',
                    'essential_expenses',
                    'wastes',
                    'investments',
                ],
                res.body.errors,
            ),
        ).toBeTruthy();
        expect(spendingDivisionServiceSpy.create.notCalled).toBeTruthy();
    });

    it('should be call update controller with spendingDivisionBaseData data and returns status 200', async () => {
        const spendingDivisionBaseData = new SpendingDivisionBaseBuilder()
            .withEssentialExpenses(0.5)
            .withNonEssentialExpenses(0.1)
            .withWastes(0.1)
            .withInvestments(0.3)
            .build();

        spendingDivisionServiceSpy.update.resolves(<any>spendingDivisionBaseData);
        sinon.stub(container, 'resolve').returns(spendingDivisionServiceSpy);

        const res = await request(app)
            .put('/api/spending-division/base')
            .send(spendingDivisionBaseData);

        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual(spendingDivisionBaseData);
    });
});
