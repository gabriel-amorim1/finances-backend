/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from 'yup';
import { ValidateError } from './ValidateError';

const extractErrors = (
    validationErrors: { property: string; message: string }[],
) => {
    let paramsErrors = validationErrors.map(error => error.property);
    validationErrors.forEach((error: any) => {
        if (error.nestedErrors) {
            const nestedErrorsParams = error.nestedErrors.map(
                (nestedError: { param: any }) => nestedError.param,
            );
            paramsErrors = paramsErrors.concat(nestedErrorsParams);
        }
    });
    return paramsErrors.filter(error => error !== '_error');
};

export const isParamsInValidationErrors = (
    params: string[],
    validationErrors: { property: string; message: string }[],
): boolean => {
    const validErrors = extractErrors(validationErrors);
    return params.every(error => validErrors.includes(error));
};

export const validateSchemaData = async <T>(
    data: T,
    schema: yup.ObjectSchema<yup.Shape<object | undefined, object>, object>,
): Promise<void> => {
    try {
        await schema.validate(data, { abortEarly: false });
    } catch (err) {
        throw new ValidateError(err);
    }
};

export const validateManySchemaData = async <T>(
    validations: {
        data: T;
        schema: yup.ObjectSchema<yup.Shape<object | undefined, object>, object>;
    }[],
): Promise<void> => {
    const errors: ValidateError[] = [];

    for (let i = 0; i < validations.length; i += 1) {
        const validation = validations[i];

        try {
            await validateSchemaData(validation.data, validation.schema);
        } catch (err) {
            errors.push(err);
        }
    }

    if (errors.length) {
        const firstError = errors[0];
        for (let i = 1; i < errors.length; i += 1) {
            const subsequentError = errors[i];

            firstError.errors = firstError.errors.concat(subsequentError.errors);
        }

        throw firstError;
    }
};
