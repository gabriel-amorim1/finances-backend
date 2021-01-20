import sinon from 'sinon';
import request from 'supertest';
import { container } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';

import app from '../../app';
import UserService from '../../services/UserService';
import { isParamsInValidationErrors } from '../../utils/errors/validationError';
import UserBuilder from '../testBuilders/UserBuilder';

describe('Sales Origin Route context', () => {
    let userServiceSpy: sinon.SinonStubbedInstance<UserService>;

    beforeEach(() => {
        sinon.restore();
        userServiceSpy = sinon.createStubInstance(UserService);
    });

    it('should be call controller with user data and returns status 201', async () => {
        const userData = new UserBuilder()
            .withName('Gabriel')
            .withEmail('gabriel@teste.com')
            .build();

        userServiceSpy.create.resolves(<any>userData);
        sinon.stub(container, 'resolve').returns(userServiceSpy);

        const res = await request(app)
            .post('/api/user')
            .send(userData)
            .set(userData);

        expect(res.status).toBe(201);
        expect(res.body).toStrictEqual(userData);
        expect(userServiceSpy.create.calledWithExactly(<any>userData)).toBeTruthy();
    });

    it('should be return status 400 when not send params', async () => {
        const res = await request(app).post('/api/user');

        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            code: 400,
            message: 'Validation Error',
            errors: [
                { property: 'name', message: 'name is a required field' },
                { property: 'email', message: 'email is a required field' },
            ],
        });
        expect(userServiceSpy.create.notCalled).toBeTruthy();
    });

    it('should be call controller findOne with id returns status 200', async () => {
        const userId = uuidv4();

        userServiceSpy.findById.resolves(<any>'userData');
        sinon.stub(container, 'resolve').returns(userServiceSpy);

        const res = await request(app).get(`/api/user/${userId}`);

        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual('userData');
        expect(userServiceSpy.findById.calledWithExactly(userId)).toBeTruthy();
    });

    it('should be call controller findOne return status 400 when not send params', async () => {
        const res = await request(app).get('/api/user/invalid');

        expect(res.status).toBe(400);
        expect(isParamsInValidationErrors(['id'], res.body.errors)).toBeTruthy();
        expect(userServiceSpy.create.notCalled).toBeTruthy();
    });
});
