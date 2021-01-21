import { Response, Request } from 'express';
import { container } from 'tsyringe';
import SpendingDivisionService from '../services/ SpendingDivisionService';

export const getBasicSpendingDivision = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.params;

    const spendingDivisionService = container.resolve(SpendingDivisionService);
    const response = await spendingDivisionService.getBasicSpendingDivision(id);

    return res.status(200).json(response);
};

export const getSpendingDivisionByUser = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.params;

    const spendingDivisionService = container.resolve(SpendingDivisionService);
    const response = await spendingDivisionService.getSpendingDivisionByUser(id);

    return res.status(200).json(response);
};
