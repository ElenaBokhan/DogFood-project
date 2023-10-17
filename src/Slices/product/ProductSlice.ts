import {createSlice} from '@reduxjs/toolkit';
import type {SerializedError} from '@reduxjs/toolkit';
import {createAppAsyncThunk} from 'Store/hooks';
import {isActionPending, isActionRejected} from 'Utils/reduxUtils';

export const PRODUCT_SLICE_NAME = 'product';

export const getProduct = createAppAsyncThunk<IProduct, string>(
    `${PRODUCT_SLICE_NAME}/getProduct`,
    async (productId: string, {extra: api}) => {
        return await api.getProductById(productId);
    }
);

export const toggleLikeProductCard = createAppAsyncThunk<IProduct, {productId: string; isLiked: boolean}>(
    `${PRODUCT_SLICE_NAME}/likeProduct`,
    async ({productId, isLiked}, {extra: api}) => {
        return isLiked ? await api.unlikeProduct(productId) : await api.likeProduct(productId);
    }
);

export const addReview = createAppAsyncThunk<IReview, string>(
    `${PRODUCT_SLICE_NAME}/addReview`,
    async (productId: string, {extra: api}) => {
        return await api.addReview(productId);
    }
);

interface IProductState {
    data: IProduct | null;
    isLoading: boolean;
    error: SerializedError | null | unknown;
}

const initialState: IProductState = {
    data: null,
    isLoading: false,
    error: null,
};

const productSlice = createSlice({
    name: PRODUCT_SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProduct.fulfilled, (state: IProductState, action) => {
                state.data = action.payload;
                state.isLoading = false;
            })
            .addCase(toggleLikeProductCard.fulfilled, (state: IProductState, action) => {
                state.data = action.payload;
                state.isLoading = false;
            })
            .addMatcher(isActionRejected(PRODUCT_SLICE_NAME), (state: IProductState, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addMatcher(isActionPending(PRODUCT_SLICE_NAME), (state: IProductState) => {
                state.isLoading = true;
                state.error = null;
            });
    },
});

export default productSlice;
