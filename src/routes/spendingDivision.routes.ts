import { Router } from 'express';

import * as SpendingDivisionController from '../controllers/SpendingDivisionController';
import validatorMiddleware from '../utils/middlewares/validator';
import {
    createSpendingDivisionBaseSchema,
    updateSpendingDivisionBaseSchema,
} from '../utils/spendingDivision/validators';

const router = Router();

router.post(
    '/base',
    validatorMiddleware({
        body: createSpendingDivisionBaseSchema,
    }),
    SpendingDivisionController.createSpendingDivisionBase,
);

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
 *       - in: header
 *         name: token
 *         type: string
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

router.get('/base', SpendingDivisionController.getBaseSpendingDivision);

router.put(
    '/base',
    validatorMiddleware({
        body: updateSpendingDivisionBaseSchema,
    }),
    SpendingDivisionController.updateSpendingDivisionBase,
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
 *       - in: header
 *         name: token
 *         type: string
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

router.get('/', SpendingDivisionController.getSpendingDivisionByUser);

export default router;
