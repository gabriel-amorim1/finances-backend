import sinon from 'sinon';
import request from 'supertest';
import { container } from 'tsyringe';
import { v4 as uuidv4, v4 } from 'uuid';

import app from '../../app';
import FinancialMovementService from '../../services/FinancialMovementService';
import { isParamsInValidationErrors } from '../../utils/errors/validationError';
import FinancialMovementBuilder from '../testBuilders/FinancialMovementBuilder';

describe('Sales Origin Route context', () => {
    let financialMovementServiceSpy: sinon.SinonStubbedInstance<FinancialMovementService>;

    beforeEach(() => {
        sinon.restore();
        financialMovementServiceSpy = sinon.createStubInstance(
            FinancialMovementService,
        );
    });

    it('should be call controller with financialMovement data and returns status 201', async () => {
        const movementData = new FinancialMovementBuilder()
            .withName('Gabriel')
            .withUserId(v4())
            .withValue(123.01)
            .withClassification('receita')
            .build();

        financialMovementServiceSpy.create.resolves(<any>movementData);
        sinon.stub(container, 'resolve').returns(financialMovementServiceSpy);

        const res = await request(app)
            .post('/api/financial-movement')
            .send(movementData);

        expect(res.status).toBe(201);
        expect(res.body).toStrictEqual(movementData);
        expect(
            financialMovementServiceSpy.create.calledWithExactly(<any>movementData),
        ).toBeTruthy();
    });

    it('should be return status 400 when not send params', async () => {
        const res = await request(app).post('/api/financial-movement');

        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            code: 400,
            message: 'Validation Error',
            errors: [
                {
                    property: 'user_id',
                    message: 'The property user_id is required',
                },
                { property: 'name', message: 'The property name is required' },
                { property: 'value', message: 'The property value is required' },
                {
                    property: 'classification',
                    message: 'The property classification is required',
                },
            ],
        });
        expect(financialMovementServiceSpy.create.notCalled).toBeTruthy();
    });

    it('should be call controller findOne with id returns status 200', async () => {
        const financialMovementId = uuidv4();

        financialMovementServiceSpy.findById.resolves(<any>'financialMovementData');
        sinon.stub(container, 'resolve').returns(financialMovementServiceSpy);

        const res = await request(app).get(
            `/api/financial-movement/${financialMovementId}`,
        );

        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual('financialMovementData');
        expect(
            financialMovementServiceSpy.findById.calledWithExactly(
                financialMovementId,
            ),
        ).toBeTruthy();
    });

    it('should be call controller findOne return status 400 when not send params', async () => {
        const res = await request(app).get('/api/financial-movement/invalid');

        expect(res.status).toBe(400);
        expect(isParamsInValidationErrors(['id'], res.body.errors)).toBeTruthy();
        expect(financialMovementServiceSpy.create.notCalled).toBeTruthy();
    });
});