import {TRootState} from 'Store/configureStore';

export const loadingSelector = (state: TRootState) => state.loading.isLoading;
