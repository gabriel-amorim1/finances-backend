import * as yup from 'yup';

export const idSchema = yup.object().shape({
    id: yup.string().uuid().required('Property id is required'),
});

export const getAllRequestSchema = yup.object().shape({
    page: yup.string().strict(true),
    size: yup.string().strict(true),
    sortParam: yup.string().strict(true),
    sortOrder: yup
        .string()
        .strict(true)
        .matches(/(desc|DESC|asc|ASC)/, {
            excludeEmptyString: true,
            message: 'Only available DESC and ASC values.',
        }),
    created_at: yup.string().strict(true),
    dateFilter: yup.string().strict(true),
    startDateFilter: yup
        .string()
        .matches(/\d{4}-\d{2}-\d{2}/)
        .strict(true),
    endDateFilter: yup
        .string()
        .matches(/\d{4}-\d{2}-\d{2}/)
        .strict(true),
});
