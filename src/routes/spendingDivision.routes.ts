import { Router } from 'express';

import * as SpendingDivisionController from '../controllers/SpendingDivisionController';
import validatorMiddleware from '../utils/middlewares/validator';
import { idSchema } from '../utils/validators/common';

const router = Router();

router.get(
    '/basic/:id',
    validatorMiddleware({
        params: idSchema,
    }),
    SpendingDivisionController.getBasicSpendingDivision,
);

router.get(
    '/:id',
    validatorMiddleware({
        params: idSchema,
    }),
    SpendingDivisionController.getSpendingDivisionByUser,
);

export default router;
