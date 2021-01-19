import { Router } from 'express';

import * as FinancialMovementController from '../controllers/FinancialMovementController';
import { createFinancialMovementSchema } from '../utils/financialMovement/validators';
import validatorMiddleware from '../utils/middlewares/validator';
import { idSchema } from '../utils/validators/commom';

const router = Router();

router.post(
    '/',
    validatorMiddleware({
        body: createFinancialMovementSchema,
    }),
    FinancialMovementController.create,
);

router.get(
    '/:id',
    validatorMiddleware({
        params: idSchema,
    }),
    FinancialMovementController.findById,
);

export default router;
