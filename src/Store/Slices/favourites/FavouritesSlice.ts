import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const FAVOURITES_SLICE_NAME = 'favourites';

interface IFavouritesState {
    favourites: IProduct[];
}

const initialState: IFavouritesState = {
    favourites: [],
};

const favouritesSlice = createSlice({
    name: FAVOURITES_SLICE_NAME,
    initialState,
    reducers: {
        addToFavourites: (state: IFavouritesState, action: PayloadAction<IProduct>) => {
            state.favourites.push(action.payload);
        },
        removeFromFavourites: (state: IFavouritesState, action: PayloadAction<string>) => {
            state.favourites = state.favourites.filter((product) => product._id !== action.payload);
        },
    },
});

export const {addToFavourites, removeFromFavourites} = favouritesSlice.actions;
export default favouritesSlice;
