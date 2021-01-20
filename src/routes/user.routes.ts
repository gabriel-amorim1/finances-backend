import { Router } from 'express';

import * as UserController from '../controllers/UserController';
import validatorMiddleware from '../utils/middlewares/validator';
import { createUserSchema, updateUserSchema } from '../utils/user/validators';
import { idSchema } from '../utils/validators/commom';

const router = Router();

/**
 * @swagger
 * /api/user:
 *   post:
 *     tags:
 *       - User
 *     description: Create new User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         description: JSON with User attributes.
 *         in: body
 *         required: true
 *         schema:
 *            $ref: '#/definitions/UserCreate'
 *     responses:
 *       '201':
 *         description: User was created successfully.
 *         schema:
 *           $ref: '#/definitions/User'
 *       '400':
 *         description: Validation Error
 *         schema:
 *           $ref: '#/definitions/ValidationError'
 *       '404':
 *         description: Resource not found
 *         schema:
 *           $ref: '#/definitions/NotFound'
 */

router.post(
    '/',
    validatorMiddleware({
        body: createUserSchema,
    }),
    UserController.create,
);

/**
 * @swagger
 * /api/user/:userId:
 *   get:
 *     tags:
 *       - User
 *     description: Get User by Id
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: userId
 *         type: uuid
 *         required: true
 *     responses:
 *       '200':
 *         description: User was returned successfully.
 *         schema:
 *           $ref: '#/definitions/User'
 *       '400':
 *         description: Validation Error
 *         schema:
 *           $ref: '#/definitions/ValidationError'
 *       '404':
 *         description: Resource not found
 *         schema:
 *           $ref: '#/definitions/NotFound'
 */

router.get(
    '/:id',
    validatorMiddleware({
        params: idSchema,
    }),
    UserController.findById,
);

router.get('/', UserController.getAll);

router.put(
    '/:id',
    validatorMiddleware({
        params: idSchema,
        body: updateUserSchema,
    }),
    UserController.update,
);

router.delete(
    '/:id',
    validatorMiddleware({
        params: idSchema,
    }),
    UserController.remove,
);

export default router;
