import { Router } from 'express';

import * as FinancialMovementController from '../controllers/FinancialMovementController';

const router = Router();

router.post('/', FinancialMovementController.create);

router.get('/:id', FinancialMovementController.findById);

export default router;
