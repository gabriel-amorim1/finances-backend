import { Router } from 'express';

import * as FinancialMovementController from '../controllers/FinancialMovementController';
import {
    createFinancialMovementSchema,
    updateFinancialMovementSchema,
} from '../utils/financialMovement/validators';
import validatorMiddleware from '../utils/middlewares/validator';
import { idSchema } from '../utils/validators/common';

const router = Router();

/**
 * @swagger
 * /api/financial-movement:
 *   post:
 *     tags:
 *       - Financial Movement
 *     description: Create new Financial Movement
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Financial Movement
 *         description: JSON with Financial Movement attributes.
 *         in: body
 *         required: true
 *         schema:
 *            $ref: '#/definitions/FinancialMovementCreate'
 *     responses:
 *       '201':
 *         description: Financial Movement was created successfully.
 *         schema:
 *           $ref: '#/definitions/FinancialMovement'
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
        body: createFinancialMovementSchema,
    }),
    FinancialMovementController.create,
);

/**
 * @swagger
 * /api/financial-movement/:financialMovementId:
 *   get:
 *     tags:
 *       - Financial Movement
 *     description: Get Financial Movement by Id
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: financialMovementId
 *         type: uuid
 *         required: true
 *     responses:
 *       '200':
 *         description: Financial Movement was returned successfully.
 *         schema:
 *           $ref: '#/definitions/FinancialMovement'
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
    FinancialMovementController.findById,
);

/**
 * @swagger
 * /api/financial-movement:
 *   get:
 *     tags:
 *       - Financial Movement
 *     description: Get all Financial Movements
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
 *         name: name
 *         type: string
 *       - in: query
 *         name: email
 *         type: string
 *       - in: query
 *         name: created_at
 *         type: string
 *       - in: query
 *         name: updated_at
 *         type: string
 *     responses:
 *       '200':
 *         description: Financial Movements
 *         schema:
 *           $ref: '#/definitions/FinancialMovementGetAll'
 */

router.get('/', FinancialMovementController.getAll);

/**
 * @swagger
 * /api/financial-movement/:financialMovementId:
 *   put:
 *     tags:
 *       - Financial Movement
 *     description: Update an Financial Movement
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: financialMovementId
 *         type: uuid
 *         required: true
 *       - name: Financial Movement
 *         description: JSON with Financial Movement attributes.
 *         in: body
 *         required: true
 *         schema:
 *            $ref: '#/definitions/FinancialMovementUpdate'
 *     responses:
 *       '200':
 *         description: Financial Movement was updated successfully.
 *         schema:
 *           $ref: '#/definitions/FinancialMovement'
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
        body: updateFinancialMovementSchema,
    }),
    FinancialMovementController.update,
);

/**
 * @swagger
 * /api/financial-movement/:financialMovementId:
 *   delete:
 *     tags:
 *       - Financial Movement
 *     description: Delete Financial Movement by Id
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: financialMovementId
 *         type: uuid
 *         required: true
 *     responses:
 *       '204':
 *         description: Financial Movement was deleted successfully.
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
    FinancialMovementController.remove,
);

export default router;
