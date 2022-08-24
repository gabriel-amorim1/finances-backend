import sinon from 'sinon';
import request from 'supertest';
import { container } from 'tsyringe';
import { v4 as uuidv4, v4 } from 'uuid';

import app from '../../app';
import FinancialMovementService from '../../services/FinancialMovementService';
import { isParamsInValidationErrors } from '../../utils/errors/validationError';
import FinancialMovementBuilder from '../testBuilders/FinancialMovementBuilder';

describe('Financial Movement Route context', () => {
    let financialMovementServiceSpy: sinon.SinonStubbedInstance<FinancialMovementService>;

    beforeEach(() => {
        process.env.ENVIRONMENT = 'TESTING';
        sinon.restore();
        financialMovementServiceSpy = sinon.createStubInstance(
            FinancialMovementService,
        );
    });

    afterAll(() => {
        process.env.ENVIRONMENT = 'PRODUCTION';
    });

    it('should be call create controller with financialMovement data and returns status 201', async () => {
        const movementData = new FinancialMovementBuilder()
            .withName('Gabriel')
            .withValue(123.01)
            .withClassification('RECEITAS')
            .withDate('2022-08-23')
            .build();

        financialMovementServiceSpy.create.resolves(<any>movementData);
        sinon.stub(container, 'resolve').returns(financialMovementServiceSpy);

        const res = await request(app)
            .post('/api/financial-movement')
            .send(movementData);

        expect(res.status).toBe(201);
        expect(res.body).toStrictEqual(movementData);
    });

    it('should be return status 400 when not send params', async () => {
        const res = await request(app).post('/api/financial-movement');

        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            code: 400,
            message: 'Validation Error',
            errors: [
                { property: 'name', message: 'The property name is required' },
                { property: 'value', message: 'The property value is required' },
                {
                    message: 'The property date is required',
                    property: 'date',
                },
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

    it('should be call controller getAll and returns status 200', async () => {
        financialMovementServiceSpy.getAll.resolves(<any>{
            data: 'movements',
            count: 2,
        });
        sinon.stub(container, 'resolve').returns(financialMovementServiceSpy);

        const res = await request(app).get(`/api/financial-movement`);

        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual(<any>{ data: 'movements', count: 2 });
    });

    it('should be call update controller with user data and returns status 201', async () => {
        const id = v4();
        const movementData = new FinancialMovementBuilder()
            .withName('Gabriel')
            .withUserId(v4())
            .withValue(123.01)
            .withClassification('RECEITAS')
            .build();

        financialMovementServiceSpy.update.resolves(<any>movementData);
        sinon.stub(container, 'resolve').returns(financialMovementServiceSpy);

        const res = await request(app)
            .put(`/api/financial-movement/${id}`)
            .send(movementData);

        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual(movementData);
        expect(
            financialMovementServiceSpy.update.calledWithExactly(id, movementData),
        ).toBeTruthy();
    });

    it('should not call update controller and return status 400 when send invalid id', async () => {
        const res = await request(app).put('/api/financial-movement/invalid');

        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            code: 400,
            message: 'Validation Error',
            errors: [
                {
                    property: 'id',
                    message: 'id must be a valid UUID',
                },
            ],
        });
        expect(financialMovementServiceSpy.update.notCalled).toBeTruthy();
    });

    it('should be call remove controller with movement data and returns status 204', async () => {
        const id = v4();

        financialMovementServiceSpy.remove.resolves();
        sinon.stub(container, 'resolve').returns(financialMovementServiceSpy);

        const res = await request(app).delete(`/api/financial-movement/${id}`);

        expect(res.status).toBe(204);
        expect(res.body).toStrictEqual({});
        expect(
            financialMovementServiceSpy.remove.calledWithExactly(id),
        ).toBeTruthy();
    });

    it('should not call remove controller and return status 400 when send invalid id', async () => {
        const res = await request(app).delete('/api/financial-movement/invalid');

        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            code: 400,
            message: 'Validation Error',
            errors: [
                {
                    property: 'id',
                    message: 'id must be a valid UUID',
                },
            ],
        });
        expect(financialMovementServiceSpy.remove.notCalled).toBeTruthy();
    });
});
