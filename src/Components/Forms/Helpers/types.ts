import * as yup from 'yup';
import {signInFormSchema, signUpFormSchema, updateUserFormSchema} from 'Components/Forms/Helpers/validators';

export type TFormSignUpData = yup.InferType<typeof signUpFormSchema>;
export type TFormSignInData = yup.InferType<typeof signInFormSchema>;
export type TFormUpdateUserData = yup.InferType<typeof updateUserFormSchema>;
