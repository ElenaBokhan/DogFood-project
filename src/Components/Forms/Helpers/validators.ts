import * as yup from 'yup';

export const signUpFormSchema = yup
    .object({
        email: yup.string().email().required(),
        password: yup.string().min(6).max(24).required(),
        group: yup
            .string()
            .matches(/ra-\d+/)
            .required(),
    })
    .required();

export const signInFormSchema = yup
    .object({
        email: yup.string().email().required(),
        password: yup.string().min(6).max(24).required(),
    })
    .required();
