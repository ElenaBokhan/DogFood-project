import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction, SerializedError} from '@reduxjs/toolkit';
import {isActionPending, isActionRejected} from 'Utils/reduxUtils';
import {getDefaultFilter} from 'Utils/utils';

export enum ESortFilter {
    POPULAR = 'Популярные',
    NEW = 'Новинки',
    CHEAPER_FIRST = 'Сначала дешёвые',
    EXPENSIVE_FIRST = 'Сначала дорогие',
    RATING = 'По рейтингу',
    DISCOUNT = 'По скидке',
}

export const PRODUCT_LIST_SLICE_NAME = 'productsList';

interface IProductsListData {
    productList: IProductsList;
    clientFilter: IClientFilter;
    sortFilter: ESortFilter;
}

interface IProductsListState {
    data: IProductsListData | null;
    isLoading: boolean;
    error: SerializedError | null | unknown;
}

const initialState: IProductsListState = {
    data: {
        productList: null,
        clientFilter: getDefaultFilter(),
        sortFilter: ESortFilter.POPULAR,
    },
    isLoading: false,
    error: null,
};

const productsListSlice = createSlice({
    name: PRODUCT_LIST_SLICE_NAME,
    initialState,
    reducers: {
        changePage: (state: IProductsListState, action: PayloadAction<number>) => {
            state.data.clientFilter.page = action.payload;
        },
        searchProducts: (state: IProductsListState, action: PayloadAction<string>) => {
            state.data.clientFilter.search = action.payload;
            state.data.clientFilter.page = 1;
        },
        setSortFilter: (state: IProductsListState, action: PayloadAction<ESortFilter>) => {
            state.data.sortFilter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(isActionRejected(PRODUCT_LIST_SLICE_NAME), (state: IProductsListState, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addMatcher(isActionPending(PRODUCT_LIST_SLICE_NAME), (state: IProductsListState) => {
                state.isLoading = true;
                state.error = null;
            });
    },
});

export const {changePage, searchProducts, setSortFilter} = productsListSlice.actions;
export default productsListSlice;
