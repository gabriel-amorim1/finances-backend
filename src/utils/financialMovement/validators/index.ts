import * as yup from 'yup';

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
