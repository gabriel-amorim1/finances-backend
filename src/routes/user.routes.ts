import { Router } from 'express';

import * as UserController from '../controllers/UserController';
import validatorMiddleware from '../utils/middlewares/validator';
import {
    createUserSchema,
    getAllUserSchema,
    updateUserSchema,
} from '../utils/user/validators';
import { idSchema } from '../utils/validators/common';

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

/**
 * @swagger
 * /api/user:
 *   get:
 *     tags:
 *       - User
 *     description: Get all Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: page
 *         type: number
 *       - in: query
 *         name: size
 *         type: number
 *       - in: query
 *         name: sortParam
 *         type: string
 *       - in: query
 *         name: sortOrder
 *         type: string
 *       - in: query
 *         name: user_id
 *         type: string
 *       - in: query
 *         name: name
 *         type: string
 *       - in: query
 *         name: value
 *         type: string
 *       - in: query
 *         name: classification
 *         type: string
 *       - in: query
 *         name: created_at
 *         type: string
 *       - in: query
 *         name: updated_at
 *         type: string
 *     responses:
 *       '200':
 *         description: Users
 *         schema:
 *           $ref: '#/definitions/UserGetAll'
 */

router.get('/', UserController.getAll);

/**
 * @swagger
 * /api/user/:userId:
 *   put:
 *     tags:
 *       - User
 *     description: Update an User
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: userId
 *         type: uuid
 *         required: true
 *       - name: User
 *         description: JSON with User attributes.
 *         in: body
 *         required: true
 *         schema:
 *            $ref: '#/definitions/UserUpdate'
 *     responses:
 *       '200':
 *         description: User was updated successfully.
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

router.put(
    '/:id',
    validatorMiddleware({
        params: idSchema,
        body: updateUserSchema,
    }),
    UserController.update,
);

/**
 * @swagger
 * /api/user/:userId:
 *   delete:
 *     tags:
 *       - User
 *     description: Delete User by Id
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: userId
 *         type: uuid
 *         required: true
 *     responses:
 *       '204':
 *         description: User was deleted successfully.
 *       '400':
 *         description: Validation Error
 *         schema:
 *           $ref: '#/definitions/ValidationError'
 *       '404':
 *         description: Resource not found
 *         schema:
 *           $ref: '#/definitions/NotFound'
 */

router.delete(
    '/:id',
    validatorMiddleware({
        params: idSchema,
    }),
    UserController.remove,
);

export default router;
