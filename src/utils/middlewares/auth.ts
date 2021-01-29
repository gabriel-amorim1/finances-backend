/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jwt-promisify';

import { NextFunction, Request, Response } from 'express';

export default async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void | Response> => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    const [scheme, token] = authHeader.split(' ');

    try {
        const decoded = <any>await jwt.verify(token, process.env.APP_SECRET!);

        req.headers.user_id = decoded.id;

        return next();
    } catch (err) {
        return res.status(401).json({ error: 'Token invalid' });
    }
};
