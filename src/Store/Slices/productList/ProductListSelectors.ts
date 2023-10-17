import {TRootState} from 'Store/configureStore';

export const selectProductList = (state: TRootState) => ({
    products: state.productsList.data?.productList?.products,
    total: state.productsList.data?.productList?.total,
    isLoading: state.productsList.isLoading,
});

export const selectFilter = (state: TRootState) => state.productsList.data?.clientFilter;
export const selectSortFilter = (state: TRootState) => state.productsList.data?.sortFilter;
