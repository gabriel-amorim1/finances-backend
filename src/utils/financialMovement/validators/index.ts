import * as yup from 'yup';
import { getAllRequestSchema } from '../../validators/common';

export const createFinancialMovementSchema = yup.object().shape({
    user_id: yup.string().uuid().required('The property user_id is required'),
    name: yup.string().required('The property name is required'),
    value: yup.number().required('The property value is required'),
    classification: yup
        .string()
        .oneOf(['receita', 'gastos essenciais', 'gastos não essenciais'])
        .strict(true)
        .required('The property classification is required'),
});

export const updateFinancialMovementSchema = yup.object().shape({
    user_id: yup.string().uuid().optional(),
    name: yup.string().optional(),
    value: yup.number().optional(),
    classification: yup
        .string()
        .oneOf(['receita', 'gastos essenciais', 'gastos não essenciais'])
        .strict(true)
        .optional(),
});

export const getAllFinancialMovementSchema = yup.object().shape({
    user_id: yup.string().uuid().optional(),
    name: yup.string().optional(),
    value: yup.number().optional(),
    classification: yup
        .string()
        .oneOf(['receita', 'gastos essenciais', 'gastos não essenciais'])
        .strict(true)
        .optional(),
    ...getAllRequestSchema.fields,
});
