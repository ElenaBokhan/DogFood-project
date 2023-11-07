import {createSlice} from '@reduxjs/toolkit';
import type {SerializedError} from '@reduxjs/toolkit';
import {isActionPending, isActionRejected} from 'Utils/reduxUtils';

export const PRODUCT_SLICE_NAME = 'product';

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
    reducers: null,
    extraReducers: (builder) => {
        builder
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
