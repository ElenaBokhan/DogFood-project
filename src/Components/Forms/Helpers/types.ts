import * as yup from 'yup';
import {signInFormSchema, signUpFormSchema} from 'Components/Forms/Helpers/validators';

export type TFormSignUpData = yup.InferType<typeof signUpFormSchema>;
export type TFormSignInData = yup.InferType<typeof signInFormSchema>;
