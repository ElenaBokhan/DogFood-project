import {fetchBaseQuery} from '@reduxjs/toolkit/dist/query';
import {TRootState} from 'Store/configureStore';

export const customBaseQuery = fetchBaseQuery({
    baseUrl: 'https://api.react-learning.ru/v2/ra-2/',
    prepareHeaders: (headers, {getState}) => {
        const accessToken = (getState() as TRootState).auth.accessToken;
        if (accessToken) {
            headers.set('authorization', `Bearer ${accessToken}`);
        }
        return headers;
    },
});
