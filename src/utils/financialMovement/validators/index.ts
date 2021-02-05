import * as yup from 'yup';
import { getAllRequestSchema } from '../../validators/common';

export const createFinancialMovementSchema = yup.object().shape({
    name: yup.string().required('The property name is required'),
    value: yup.number().required('The property value is required'),
    classification: yup
        .string()
        .oneOf([
            'receita',
            'gastos essenciais',
            'gastos não essenciais',
            'investimentos',
            'torrar',
        ])
        .strict(true)
        .required('The property classification is required'),
});

export const updateFinancialMovementSchema = yup.object().shape({
    name: yup.string().optional(),
    value: yup.number().optional(),
    classification: yup
        .string()
        .oneOf([
            'receita',
            'gastos essenciais',
            'gastos não essenciais',
            'investimentos',
            'torrar',
        ])
        .strict(true)
        .optional(),
});

export const getAllFinancialMovementSchema = yup.object().shape({
    name: yup.string().optional(),
    value: yup.number().optional(),
    classification: yup
        .string()
        .oneOf([
            'receita',
            'gastos essenciais',
            'gastos não essenciais',
            'investimentos',
            'torrar',
        ])
        .strict(true)
        .optional(),
    ...getAllRequestSchema.fields,
});
