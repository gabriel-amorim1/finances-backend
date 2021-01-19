import { Request, Response, NextFunction } from 'express';
import { HttpError } from './HttpError';
import { ValidateError } from './ValidateError';

export const errorHandling = (
    error: Error | HttpError | ValidateError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { code, message, errors } = <any>error;

    const apiError = {
        code:
            <any>error instanceof HttpError || <any>error instanceof ValidateError
                ? code
                : 500,
        message,
        errors,
    };

    return res.status(apiError.code || 500).send(apiError);
};
