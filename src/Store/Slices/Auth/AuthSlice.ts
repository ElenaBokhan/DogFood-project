import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

const createInitState = (): Tokens => ({
    accessToken: '',
    refreshToken: '',
});

export interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: createInitState(),
    reducers: {
        setTokens(_, action: PayloadAction<Tokens>) {
            return action.payload;
        },
        setAccessToken(state, action: PayloadAction<string>) {
            state.accessToken = action.payload;
        },
        clearTokens() {
            return createInitState();
        },
    },
});

export const {setTokens, setAccessToken, clearTokens} = authSlice.actions;
export default authSlice;
