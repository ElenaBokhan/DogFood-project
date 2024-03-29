import {createApi} from '@reduxjs/toolkit/query/react';
import {customBaseQuery} from 'Store/Api/config';

const PRODUCTS_TAG = 'Products';

export const productListApi = createApi({
    reducerPath: 'productListApi',
    baseQuery: customBaseQuery,
    tagTypes: [PRODUCTS_TAG],
    endpoints: (builder) => ({
        productList: builder.query<IProductsList, IClientFilter>({
            query: ({page, perPage, search}: IClientFilter) => ({
                url: '/products',
                method: 'GET',
                params: {
                    page,
                    limit: perPage,
                    query: search,
                },
            }),
            serializeQueryArgs: ({endpointName, queryArgs: {search}}) => {
                // return endpointName + search;
                return search ? endpointName + 'SearchQuery' : endpointName + search;
            },
            merge: (currentCache, newValue, {arg: {page}}) => {
                if (page === 1) return;
                currentCache.products.push(...newValue.products);
            },
            forceRefetch({currentArg, previousArg}) {
                return currentArg !== previousArg;
            },
            providesTags: [{type: PRODUCTS_TAG, id: 'LIST'}],
        }),
        product: builder.query<IProduct, string>({
            query: (productId: string) => ({
                url: `/products/${productId}`,
                method: 'GET',
            }),
            providesTags: (result) => [{type: PRODUCTS_TAG, id: result?._id}],
        }),
        deleteProduct: builder.mutation<IProduct, string>({
            query: (productId: string) => ({
                url: `/products/${productId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result) => [
                {type: PRODUCTS_TAG, id: result._id},
                {type: PRODUCTS_TAG, id: 'LIST'},
            ],
        }),
        toggleLikeProduct: builder.mutation<IProduct, {productId: string; isLiked: boolean; userId: string}>({
            query: ({productId, isLiked}) => ({
                url: `/products/likes/${productId}`,
                method: isLiked ? 'DELETE' : 'PUT',
            }),
            async onQueryStarted({productId, userId, isLiked}, {dispatch, queryFulfilled, getState}) {
                const {productList, productListSearchQuery} = getState().productListApi.queries;
                const productListOriginalArgs = (productListSearchQuery?.originalArgs ||
                    productList.originalArgs) as IClientFilter;

                const setListLikeResult = dispatch(
                    productListApi.util.updateQueryData('productList', {...productListOriginalArgs}, (draft) => {
                        Object.assign(draft, {
                            ...draft,
                            products: draft.products.map((product) => {
                                if (product._id === productId) {
                                    return {
                                        ...product,
                                        likes: isLiked
                                            ? product.likes.filter((like) => like !== userId)
                                            : product.likes.concat([userId]),
                                    };
                                }
                                return product;
                            }),
                        });
                    })
                );

                try {
                    await queryFulfilled;
                } catch {
                    setListLikeResult?.undo();
                }
            },
        }),
        addProduct: builder.mutation<IProduct, INewProduct>({
            query: (product) => ({
                url: '/products',
                method: 'POST',
                body: product,
            }),
            invalidatesTags: [{type: PRODUCTS_TAG, id: 'LIST'}],
        }),
        addRewiew: builder.mutation<IProduct, {productId: string; review: IReview}>({
            query: ({productId, review}) => ({
                url: `/products/review/${productId}`,
                method: 'POST',
                body: review,
            }),
            invalidatesTags: [{type: PRODUCTS_TAG, id: 'LIST'}],
        }),
    }),
});

export const {
    useAddProductMutation,
    useProductListQuery,
    useProductQuery,
    useToggleLikeProductMutation,
    useAddRewiewMutation,
    useDeleteProductMutation,
} = productListApi;
