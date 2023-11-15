import * as yup from 'yup';
import {SIGN_FORM_SETTINGS} from 'Components/Forms/Helpers/consts';

export const signUpFormSchema = yup.object({
    email: yup
        .string()
        .email(SIGN_FORM_SETTINGS.ERROR_MESSAGES.EMAIL)
        .required(SIGN_FORM_SETTINGS.ERROR_MESSAGES.EMAIL),
    password: yup.string().min(6).max(24).required(),
    group: yup
        .string()
        .matches(/ra-\d+/)
        .required(),
});

export const signInFormSchema = yup.object({
    email: yup
        .string()
        .email(SIGN_FORM_SETTINGS.ERROR_MESSAGES.EMAIL)
        .required(SIGN_FORM_SETTINGS.ERROR_MESSAGES.EMAIL),
    password: yup
        .string()
        .min(SIGN_FORM_SETTINGS.BOUNDARIES.PASSWORD.MIN, SIGN_FORM_SETTINGS.ERROR_MESSAGES.PASSWORD.MIN)
        .max(SIGN_FORM_SETTINGS.BOUNDARIES.PASSWORD.MAX, SIGN_FORM_SETTINGS.ERROR_MESSAGES.PASSWORD.MAX)
        .required(SIGN_FORM_SETTINGS.ERROR_MESSAGES.PASSWORD.REQUIRED),
});

export const updateUserFormSchema = yup.object({
    name: yup.string().required(),
    about: yup.string().required(),
});
