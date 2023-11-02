import {TRootState} from 'Store/configureStore';

export const selectFavourites = (state: TRootState) => state.favourites.favourites;
export const selectIsFavourite = (id: string) => (state: TRootState) => {
    return state.favourites.favourites.some(({_id}) => _id === id);
};

export const selectFavouritesCount = (state: TRootState) => state.favourites.favourites.length;
