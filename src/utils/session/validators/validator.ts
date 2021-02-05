import * as yup from 'yup';

export const sessionValidation = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});
