import { Router } from 'express';

import * as FinancialMovementController from '../controllers/FinancialMovementController';
import {
    createFinancialMovementSchema,
    updateFinancialMovementSchema,
} from '../utils/financialMovement/validators';
import validatorMiddleware from '../utils/middlewares/validator';
import { idSchema } from '../utils/validators/commom';

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

router.get('/', FinancialMovementController.getAll);

router.put(
    '/:id',
    validatorMiddleware({
        params: idSchema,
        body: updateFinancialMovementSchema,
    }),
    FinancialMovementController.update,
);

router.delete(
    '/:id',
    validatorMiddleware({
        params: idSchema,
    }),
    FinancialMovementController.remove,
);

export default router;
