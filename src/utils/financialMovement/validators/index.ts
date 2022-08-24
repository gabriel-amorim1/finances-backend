import * as yup from 'yup';

import { getAllRequestSchema } from '../../validators/common';

export const createFinancialMovementSchema = yup.object().shape({
    name: yup.string().required('The property name is required'),
    value: yup.number().required('The property value is required'),
    date: yup
        .string()
        .matches(/\d{4}-\d{2}-\d{2}/)
        .required('The property date is required'),
    classification: yup
        .string()
        .oneOf([
            'RECEITAS',
            'GASTOS ESSENCIAIS',
            'GASTOS NAO ESSENCIAIS',
            'INVESTIMENTOS',
            'GASTOS LIVRES',
        ])
        .strict(true)
        .required('The property classification is required'),
});

export const updateFinancialMovementSchema = yup.object().shape({
    name: yup.string().optional(),
    value: yup.number().optional(),
    date: yup
        .string()
        .matches(/\d{4}-\d{2}-\d{2}/)
        .optional(),
    classification: yup
        .string()
        .oneOf([
            'RECEITAS',
            'GASTOS ESSENCIAIS',
            'GASTOS NAO ESSENCIAIS',
            'INVESTIMENTOS',
            'GASTOS LIVRES',
        ])
        .strict(true)
        .optional(),
});

export const getAllFinancialMovementSchema = yup.object().shape({
    name: yup.string().optional(),
    value: yup.number().optional(),
    date: yup
        .string()
        .matches(/\d{4}-\d{2}-\d{2}/)
        .optional(),
    classification: yup
        .string()
        .oneOf([
            'RECEITAS',
            'GASTOS ESSENCIAIS',
            'GASTOS NAO ESSENCIAIS',
            'INVESTIMENTOS',
            'GASTOS LIVRES',
        ])
        .strict(true)
        .optional(),
    ...getAllRequestSchema.fields,
});
