import sinon from 'sinon';
import request from 'supertest';
import { container } from 'tsyringe';
import { v4 as uuidv4, v4 } from 'uuid';

import app from '../../app';
import UserService from '../../services/UserService';
import { isParamsInValidationErrors } from '../../utils/errors/validationError';
import UserBuilder from '../testBuilders/UserBuilder';

describe('User Route context', () => {
    let userServiceSpy: sinon.SinonStubbedInstance<UserService>;

    beforeEach(() => {
        sinon.restore();
        userServiceSpy = sinon.createStubInstance(UserService);
    });

    it('should be call create controller with user data and returns status 201', async () => {
        const userData = new UserBuilder()
            .withName('Gabriel')
            .withEmail('gabriel@teste.com')
            .withPassword('123456')
            .build();

        userServiceSpy.create.resolves(<any>userData);
        sinon.stub(container, 'resolve').returns(userServiceSpy);

        const res = await request(app).post('/api/user').send(userData);

        expect(res.status).toBe(201);
        expect(res.body).toStrictEqual(userData);
        expect(userServiceSpy.create.calledWithExactly(<any>userData)).toBeTruthy();
    });

    it('should not call create controller and return status 400 when not send params', async () => {
        const res = await request(app).post('/api/user');

        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            code: 400,
            message: 'Validation Error',
            errors: [
                { property: 'name', message: 'name is a required field' },
                { property: 'email', message: 'email is a required field' },
                { property: 'password', message: 'password is a required field' },
            ],
        });
        expect(userServiceSpy.create.notCalled).toBeTruthy();
    });

    // it('should be call controller findOne with id returns status 200', async () => {
    //     const userId = uuidv4();

    //     userServiceSpy.findById.resolves(<any>'userData');
    //     sinon.stub(container, 'resolve').returns(userServiceSpy);

    //     const res = await request(app).get(`/api/user/${userId}`);

    //     expect(res.status).toBe(200);
    //     expect(res.body).toStrictEqual('userData');
    //     expect(userServiceSpy.findById.calledWithExactly(userId)).toBeTruthy();
    // });

    // it('should be call controller findOne return status 400 when not send params', async () => {
    //     const res = await request(app).get('/api/user/invalid');

    //     expect(res.status).toBe(400);
    //     expect(isParamsInValidationErrors(['id'], res.body.errors)).toBeTruthy();
    //     expect(userServiceSpy.create.notCalled).toBeTruthy();
    // });

    // it('should be call controller getAll and returns status 200', async () => {
    //     userServiceSpy.getAll.resolves(<any>{ data: 'users', count: 2 });
    //     sinon.stub(container, 'resolve').returns(userServiceSpy);

    //     const res = await request(app).get(`/api/user`);

    //     expect(res.status).toBe(200);
    //     expect(res.body).toStrictEqual(<any>{ data: 'users', count: 2 });
    //     expect(userServiceSpy.getAll.calledWithExactly({})).toBeTruthy();
    // });

    // it('should be call update controller with user data and returns status 201', async () => {
    //     const id = v4();
    //     const userData = new UserBuilder()
    //         .withName('Gabriel')
    //         .withEmail('gabriel@update.com')
    //         .build();

    //     userServiceSpy.update.resolves(<any>userData);
    //     sinon.stub(container, 'resolve').returns(userServiceSpy);

    //     const res = await request(app).put(`/api/user/${id}`).send(userData);

    //     expect(res.status).toBe(200);
    //     expect(res.body).toStrictEqual(userData);
    //     expect(userServiceSpy.update.calledWithExactly(id, userData)).toBeTruthy();
    // });

    // it('should not call update controller and return status 400 when send invalid id', async () => {
    //     const res = await request(app).put('/api/user/invalid');

    //     expect(res.status).toBe(400);
    //     expect(res.body).toEqual({
    //         code: 400,
    //         message: 'Validation Error',
    //         errors: [
    //             {
    //                 property: 'id',
    //                 message: 'id must be a valid UUID',
    //             },
    //         ],
    //     });
    //     expect(userServiceSpy.update.notCalled).toBeTruthy();
    // });

    // it('should be call remove controller with user data and returns status 204', async () => {
    //     const id = v4();

    //     userServiceSpy.remove.resolves();
    //     sinon.stub(container, 'resolve').returns(userServiceSpy);

    //     const res = await request(app).delete(`/api/user/${id}`);

    //     expect(res.status).toBe(204);
    //     expect(res.body).toStrictEqual({});
    //     expect(userServiceSpy.remove.calledWithExactly(id)).toBeTruthy();
    // });

    // it('should not call remove controller and return status 400 when send invalid id', async () => {
    //     const res = await request(app).delete('/api/user/invalid');

    //     expect(res.status).toBe(400);
    //     expect(res.body).toEqual({
    //         code: 400,
    //         message: 'Validation Error',
    //         errors: [
    //             {
    //                 property: 'id',
    //                 message: 'id must be a valid UUID',
    //             },
    //         ],
    //     });
    //     expect(userServiceSpy.remove.notCalled).toBeTruthy();
    // });
});
