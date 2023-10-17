import {TRootState} from 'Store/configureStore';

export const selectUser = (state: TRootState) => state.userProfile.data;
