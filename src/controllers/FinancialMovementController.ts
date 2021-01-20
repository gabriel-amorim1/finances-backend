import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { FinancialMovementRequestGetAllInterface } from '../interfaces/FinancialMovementInterface';
import FinancialMovementService from '../services/FinancialMovementService';
import { getAllFinancialMovementSchema } from '../utils/financialMovement/validators';

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

export const getAll = async (req: Request, res: Response): Promise<Response> => {
    const query = (await getAllFinancialMovementSchema.validate(req.query, {
        stripUnknown: true,
    })) as FinancialMovementRequestGetAllInterface;

    const financialMovementService = container.resolve(FinancialMovementService);
    const response = await financialMovementService.getAll(query);

    return res.status(200).json(response);
};

export const update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const movementUpdate = req.body;

    const financialMovementService = container.resolve(FinancialMovementService);
    const response = await financialMovementService.update(id, movementUpdate);

    return res.status(200).json(response);
};

export const remove = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const financialMovementService = container.resolve(FinancialMovementService);
    const response = await financialMovementService.remove(id);

    return res.status(204).json(response);
};
