import {TRootState} from 'Store/configureStore';

export const accessTokenSelector = (state: TRootState) => state.auth.accessToken;
export const refreshTokenSelector = (state: TRootState) => state.auth.refreshToken;
