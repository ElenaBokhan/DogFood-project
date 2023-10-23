import {TRootState} from 'Store/configureStore';
import {getUndiscountedPrice} from 'Utils/utils';

export const selectCartProducts = (state: TRootState) => state.cart.cart;
export const selectCartCount = (state: TRootState) => state.cart.cart.length;
export const selectCartCost = (state: TRootState) => ({
    total: state.cart.cart.reduce((acc, {product, count}) => (acc += product.price * count), 0),
    undiscountedPrice: state.cart.cart.reduce(
        (acc, {product: {price, discount}, count}) => (acc += getUndiscountedPrice(price, discount) * count),
        0
    ),
});

export const selectCartProductCount = (id: string) => (state: TRootState) => {
    return state.cart.cart.find(({product}) => product._id === id)?.count;
};
