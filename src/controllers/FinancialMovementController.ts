import { Response, Request } from 'express';
import { container } from 'tsyringe';
import FinancialMovementService from '../services/FinancialMovementService';

export const create = async (req: Request, res: Response): Promise<Response> => {
    const financialMovementData = req.body;

    const financialMovementService = container.resolve(FinancialMovementService);
    const response = await financialMovementService.create(financialMovementData);

    return res.status(201).json(response);
};

export const findById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const financialMovementService = container.resolve(FinancialMovementService);
    const response = await financialMovementService.findById(id);

    return res.status(200).json(response);
};
