import * as yup from 'yup';

export const createSpendingDivisionBaseSchema = yup.object().shape({
    essential_expenses: yup
        .number()
        .required('The property essential_expenses is required'),
    non_essential_expenses: yup
        .number()
        .required('The property non_essential_expenses is required'),
    wastes: yup.number().required('The property wastes is required'),
    investments: yup.number().required('The property investments is required'),
});

export const updateSpendingDivisionBaseSchema = yup.object().shape({
    essential_expenses: yup.number().optional(),
    non_essential_expenses: yup.number().optional(),
    wastes: yup.number().optional(),
    investments: yup.number().optional(),
});
