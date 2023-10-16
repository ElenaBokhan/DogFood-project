import {createApi} from '@reduxjs/toolkit/query/react';
import {TFormSignInData, TFormSignUpData} from 'Components/Forms/Helpers/types';
import {customBaseQuery} from './config';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        signUp: builder.mutation<IUser, TFormSignUpData>({
            query: (signUpFormData: TFormSignUpData) => ({
                url: 'signup',
                method: 'POST',
                body: signUpFormData,
            }),
        }),
        signIn: builder.mutation<{data: IUser; token: string}, TFormSignInData>({
            query: (signInFormData: TFormSignInData) => ({
                url: 'signin',
                method: 'POST',
                body: signInFormData,
            }),
        }),
    }),
});

export const {useSignUpMutation, useSignInMutation} = authApi;
