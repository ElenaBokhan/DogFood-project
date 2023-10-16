import {PER_PAGE} from 'Const';

export const calculateOldPrice = (price: number, discount: number) => {
    return Math.floor(price - (price * discount) / 100);
};

export const isFavourite = (likes: string[], id: string) => {
    return likes.includes(id);
};

export const getDefaultFilter = (): IClientFilter => {
    return {search: '', page: 1, perPage: PER_PAGE};
};
