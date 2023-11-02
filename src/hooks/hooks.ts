import {bindActionCreators} from '@reduxjs/toolkit';
import {useMemo} from 'react';
import {UseAppDispatch} from 'Store/hooks';
import CartSlice from 'Store/Slices/cart/CartSlice';
import AuthSlice from 'Store/Slices/Auth/AuthSlice';
import FavouritesSlice from 'Store/Slices/favourites/FavouritesSlice';
import UserSlice from 'Store/Slices/userProfile/UserProfileSlice';
import ProductListSlice from 'Store/Slices/productList/ProductListSlice';

export enum ERoute {
    TO_BACK,
    TO_HOME,
}

const rootActions = {
    ...CartSlice.actions,
    ...AuthSlice.actions,
    ...FavouritesSlice.actions,
    ...UserSlice.actions,
    ...ProductListSlice.actions,
};

export const useActions = () => {
    const dispatch = UseAppDispatch();

    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
