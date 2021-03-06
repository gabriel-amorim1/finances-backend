import { Request, Response, Router } from 'express';

import * as swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../swagger';
import apiUser from './user.routes';
import apiFinancialMovement from './financialMovement.routes';
import apiSpendingDivision from './spendingDivision.routes';
import apiSession from './session.routes';
import authMiddleware from '../utils/middlewares/auth';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Go To Million Service 1.0.0');
});

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

router.use('/api/user', apiUser);
router.use('/api/sessions', apiSession);
router.use(authMiddleware);
router.use('/api/financial-movement', apiFinancialMovement);
router.use('/api/spending-division', apiSpendingDivision);

export default router;
