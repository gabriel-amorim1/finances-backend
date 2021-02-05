import { Router } from 'express';

import * as SessionController from '../controllers/SessionController';
import validatorMiddleware from '../utils/middlewares/validator';
import { sessionValidation } from '../utils/session/validators/validator';

const routes = Router();

routes.post(
    '/',
    validatorMiddleware({
        body: sessionValidation,
    }),
    SessionController.create,
);

export default routes;
