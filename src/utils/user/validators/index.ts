import * as yup from 'yup';

export const createUserSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
});
