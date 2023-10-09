export const calculateOldPrice = (price: number, discount: number) => {
    return Math.floor(price - (price * discount) / 100);
};

export const isFavourite = (likes: string[], id: string) => {
    return likes.includes(id);
};
