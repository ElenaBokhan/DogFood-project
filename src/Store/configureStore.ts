import {combineReducers, configureStore} from '@reduxjs/toolkit';
import api from 'api/api';
import {authApi} from 'Store/Api/AuthApi';
import ProductSlice from 'Store/Slices/product/ProductSlice';
import ProductsListSlice from 'Store/Slices/productList/ProductListSlice';
import UserProfileSlice from 'Store/Slices/userProfile/UserProfileSlice';
import LoadingSlice from 'Store/Slices/loading/Loading';
import CartSlice from 'Store/Slices/cart/CartSlice';
import AuthSlice from 'Store/Slices/Auth/AuthSlice';
import FavouritesSlice from 'Store/Slices/favourites/FavouritesSlice';
import {productListApi} from 'Store/Api/productListApi';

const rootReducer = combineReducers({
    [UserProfileSlice.name]: UserProfileSlice.reducer,
    [ProductsListSlice.name]: ProductsListSlice.reducer,
    [ProductSlice.name]: ProductSlice.reducer,
    [AuthSlice.name]: AuthSlice.reducer,
    [LoadingSlice.name]: LoadingSlice.reducer,
    [CartSlice.name]: CartSlice.reducer,
    [FavouritesSlice.name]: FavouritesSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [productListApi.reducerPath]: productListApi.reducer,
});

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: api,
            },
        })
            .concat(authApi.middleware)
            .concat(productListApi.middleware),
});

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppDispatch = typeof store.dispatch;

export default store;