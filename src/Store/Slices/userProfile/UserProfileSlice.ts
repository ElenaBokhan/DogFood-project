import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {SerializedError} from '@reduxjs/toolkit';
import {isActionPending, isActionRejected} from 'Utils/reduxUtils';

export const USER_PROFILE_SLICE_NAME = 'userProfile';

interface IUserProfileState {
    data: IUser | null;
    isLoading: boolean;
    error: SerializedError | null | unknown;
}

const initialState: IUserProfileState = {
    data: null,
    isLoading: false,
    error: null,
};

const userProfileSlice = createSlice({
    name: USER_PROFILE_SLICE_NAME,
    initialState,
    reducers: {
        setUserProfile(state, action: PayloadAction<IUser>) {
            state.data = action.payload;
        },
        clearUserProfile() {
            return {
                data: null,
                isLoading: false,
                error: null,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(isActionRejected(USER_PROFILE_SLICE_NAME), (state: IUserProfileState, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addMatcher(isActionPending(USER_PROFILE_SLICE_NAME), (state: IUserProfileState) => {
                state.isLoading = true;
                state.error = null;
            });
    },
});

export const {setUserProfile, clearUserProfile} = userProfileSlice.actions;
export default userProfileSlice;
