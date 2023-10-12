import {combineReducers, configureStore} from '@reduxjs/toolkit';
import api from 'api/api';
import ProductSlice from 'Slices/product/ProductSlice';
import ProductsListSlice from 'Slices/productList/ProductListSlice';
import UserProfileSlice from 'Slices/userProfile/UserProfileSlice';

const rootReducer = combineReducers({
    [UserProfileSlice.name]: UserProfileSlice.reducer,
    [ProductsListSlice.name]: ProductsListSlice.reducer,
    [ProductSlice.name]: ProductSlice.reducer,
});

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: api,
            },
        }),
});

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppDispatch = typeof store.dispatch;

export default store;
