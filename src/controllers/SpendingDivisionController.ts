import { Response, Request } from 'express';
import { container } from 'tsyringe';
import SpendingDivisionService from '../services/ SpendingDivisionService';

export const getBaseSpendingDivision = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const spendingDivisionService = container.resolve(SpendingDivisionService);
    const response = await spendingDivisionService.getBaseSpendingDivision(
        req.user.id,
    );

    return res.status(200).json(response);
};

export const getSpendingDivisionByUser = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const spendingDivisionService = container.resolve(SpendingDivisionService);
    const response = await spendingDivisionService.getSpendingDivisionByUser(
        req.user.id,
    );

    return res.status(200).json(response);
};
