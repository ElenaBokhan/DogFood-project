import {createApi} from '@reduxjs/toolkit/query/react';
import {customBaseQuery} from 'Store/Api/config';

export const productListApi = createApi({
    reducerPath: 'productListApi',
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        productList: builder.query<IProductsList, IClientFilter>({
            query: ({page, perPage, search}: IClientFilter) => ({
                url: `/products?page=${page}&limit=${perPage}&query=${search}`,
                method: 'GET',
            }),
        }),
    }),
});

export const {useProductListQuery} = productListApi;
