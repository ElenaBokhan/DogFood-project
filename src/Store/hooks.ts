import {createAsyncThunk} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import type {TypedUseSelectorHook} from 'react-redux';
import {TAppDispatch, TRootState} from 'Store/configureStore';

export const UseAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
export const UseAppDispatch = () => useDispatch<TAppDispatch>();

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: TRootState;
    getState: () => TRootState;
    dispatch: TAppDispatch;
}>();
