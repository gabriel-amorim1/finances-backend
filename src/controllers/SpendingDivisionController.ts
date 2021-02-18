import { Response, Request } from 'express';
import { container } from 'tsyringe';
import SpendingDivisionService from '../services/ SpendingDivisionService';

export const createSpendingDivisionBase = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const user_id = req.user.id;
    const spendingDivisionBaseData = { user_id, ...req.body };

    const spendingDivisionService = container.resolve(SpendingDivisionService);
    const response = await spendingDivisionService.create(spendingDivisionBaseData);

    return res.status(201).json(response);
};

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

export const updateSpendingDivisionBase = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const user_id = req.user.id;
    const spendingDivisionBaseData = { user_id, ...req.body };

    const spendingDivisionService = container.resolve(SpendingDivisionService);
    const response = await spendingDivisionService.update(spendingDivisionBaseData);

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
