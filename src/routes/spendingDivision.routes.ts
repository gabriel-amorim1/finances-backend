import { Router } from 'express';

import * as SpendingDivisionController from '../controllers/SpendingDivisionController';
import validatorMiddleware from '../utils/middlewares/validator';
import { idSchema } from '../utils/validators/common';

const router = Router();

router.get(
    '/base/:id',
    validatorMiddleware({
        params: idSchema,
    }),
    SpendingDivisionController.getBaseSpendingDivision,
);

router.get(
    '/:id',
    validatorMiddleware({
        params: idSchema,
    }),
    SpendingDivisionController.getSpendingDivisionByUser,
);

export default router;
