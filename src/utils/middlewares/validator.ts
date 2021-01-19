import { Response, Request, NextFunction, RequestHandler } from 'express';
import * as yup from 'yup';
import { validateManySchemaData } from '../errors/validationError';

export default function validatorMiddleware(schemas: {
    body?: yup.ObjectSchema;
    headers?: yup.ObjectSchema;
    query?: yup.ObjectSchema;
    params?: yup.ObjectSchema;
}): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const validations = [];
        if (schemas.headers)
            validations.push({ data: req.headers, schema: schemas.headers });
        if (schemas.query)
            validations.push({ data: req.query, schema: schemas.query });
        if (schemas.body) validations.push({ data: req.body, schema: schemas.body });
        if (schemas.params)
            validations.push({ data: req.params, schema: schemas.params });

        await validateManySchemaData(validations);

        next();
    };
}
