import { Request, Response, Router } from 'express';

import * as swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../swagger';
import apiUser from './user.routes';
import apiFinancialMovement from './financialMovement.routes';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Service 1.0.0');
});

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

router.use('/api/user', apiUser);
router.use('/api/financial-movement', apiFinancialMovement);

export default router;
