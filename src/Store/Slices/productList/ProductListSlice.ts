import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction, SerializedError} from '@reduxjs/toolkit';
import {ESortFilter} from 'Pages/Catalog/Catalog';
import {createAppAsyncThunk} from 'Store/hooks';
import {isActionPending, isActionRejected} from 'Utils/reduxUtils';
import {getDefaultFilter} from 'Utils/utils';

export const PRODUCT_LIST_SLICE_NAME = 'productsList';

export const deleteProduct = createAppAsyncThunk<IProduct, string>(
    `${PRODUCT_LIST_SLICE_NAME}/deleteProduct`,
    async (productId: string, {extra: api}) => {
        return await api.deleteProduct(productId);
    }
);

export const toggleLikeProduct = createAppAsyncThunk<IProduct, {productId: string; isLiked: boolean}>(
    `${PRODUCT_LIST_SLICE_NAME}/likeProduct`,
    async ({productId, isLiked}, {extra: api}) => {
        return isLiked ? await api.unlikeProduct(productId) : await api.likeProduct(productId);
    }
);

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
        },
        setSortFilter: (state: IProductsListState, action: PayloadAction<ESortFilter>) => {
            state.data.sortFilter = action.payload;
        },
        sortProductsList: (state: IProductsListState, action: PayloadAction<ESortFilter>) => {
            if (!state.data.productList.products) return;

            switch (action.payload) {
                case ESortFilter.POPULAR:
                    break;
                case ESortFilter.NEW:
                    break;
                case ESortFilter.CHEAPER_FIRST:
                    state.data.productList.products.sort((first, second) => first.price - second.price);
                    break;
                case ESortFilter.EXPENSIVE_FIRST:
                    state.data.productList.products.sort((first, second) => second.price - first.price);
                    break;
                case ESortFilter.DISCOUNT:
                    state.data.productList.products.sort((first, second) => second.discount - first.discount);
                    break;
                case ESortFilter.RATING:
                    break;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(toggleLikeProduct.fulfilled, (state: IProductsListState, action) => {
                const newList = state.data.productList.products.map((product) => {
                    return product._id === action.payload._id ? action.payload : product;
                });

                state.data.productList.products = newList;
                state.isLoading = false;
            })
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
