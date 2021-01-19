import { Router } from 'express';

import * as UserController from '../controllers/UserController';
import validatorMiddleware from '../utils/middlewares/validator';
import { createUserSchema } from '../utils/user/validators';
import { idSchema } from '../utils/validators/commom';

const router = Router();

router.post(
    '/',
    validatorMiddleware({
        body: createUserSchema,
    }),
    UserController.create,
);

router.get(
    '/:id',
    validatorMiddleware({
        params: idSchema,
    }),
    UserController.findById,
);

export default router;
