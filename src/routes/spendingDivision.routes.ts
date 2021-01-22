import { Router } from 'express';

import * as SpendingDivisionController from '../controllers/SpendingDivisionController';
import validatorMiddleware from '../utils/middlewares/validator';
import { idSchema } from '../utils/validators/common';

const router = Router();

/**
 * @swagger
 * /api/spending-division/base/:userId:
 *   get:
 *     tags:
 *       - Spending Division
 *     description: Get Base Spending Division By User
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: userId
 *         type: uuid
 *         required: true
 *     responses:
 *       '200':
 *         description: Base Spending Division was returned successfully.
 *         schema:
 *           $ref: '#/definitions/SpendingDivision'
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
    '/base/:id',
    validatorMiddleware({
        params: idSchema,
    }),
    SpendingDivisionController.getBaseSpendingDivision,
);

/**
 * @swagger
 * /api/spending-division/:userId:
 *   get:
 *     tags:
 *       - Spending Division
 *     description: Get Spending Division By User
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: userId
 *         type: uuid
 *         required: true
 *     responses:
 *       '200':
 *         description: Spending Division was returned successfully.
 *         schema:
 *           $ref: '#/definitions/SpendingDivision'
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
    SpendingDivisionController.getSpendingDivisionByUser,
);

export default router;
