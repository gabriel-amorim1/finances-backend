import * as yup from 'yup';

export const createUserSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
});

export const updateUserSchema = yup.object().shape({
    name: yup.string().optional(),
    email: yup.string().email().optional(),
});
