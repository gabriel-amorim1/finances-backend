import { Request, Response } from 'express';

import SpendingDivisionService from '../services/ SpendingDivisionService';
import { container } from 'tsyringe';

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
    let startDateFilter = req.query.startDateFilter;
    let endDateFilter = req.query.endDateFilter;

    if (!startDateFilter && !endDateFilter) {
        const now = new Date();
        startDateFilter = new Date(now.getFullYear(), now.getMonth(), 1)
            .toISOString()
            .split('T')[0];
        endDateFilter = new Date(now.getFullYear(), now.getMonth() + 1, 0)
            .toISOString()
            .split('T')[0];
    }

    const response = await spendingDivisionService.getSpendingDivisionByUser(
        req.user.id,
        startDateFilter as string,
        endDateFilter as string,
    );

    return res.status(200).json(response);
};
