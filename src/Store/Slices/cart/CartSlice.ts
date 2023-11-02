import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';

export const CART_SLICE_NAME = 'cart';

export interface ICartProduct {
    product: IProduct;
    count?: number;
}

interface ICartState {
    cart: ICartProduct[];
}

const initialState: ICartState = {
    cart: [],
};

const cartSlice = createSlice({
    name: CART_SLICE_NAME,
    initialState,
    reducers: {
        addProductToCart: (state: ICartState, action: PayloadAction<ICartProduct>) => {
            const {
                product: {_id},
                count,
            } = action.payload;
            const findProduct = state.cart.find(({product}) => product._id === _id);

            if (findProduct) {
                count ? (findProduct.count = count) : findProduct.count++;
            } else {
                state.cart.push({product: action.payload.product, count: 1});
            }

            toast.success('Товар добавлен в корзину');
        },
        incrementCount: (state: ICartState, action: PayloadAction<string>) => {
            const findProduct = state.cart.find(({product}) => product._id === action.payload);
            findProduct.count++;
        },
        decrementCount: (state: ICartState, action: PayloadAction<string>) => {
            const findProduct = state.cart.find(({product}) => product._id === action.payload);
            if (findProduct.count === 1) {
                state.cart = state.cart.filter(({product}) => product._id !== action.payload);
            } else findProduct.count--;
        },
        removeProductFromCart: (state: ICartState, action: PayloadAction<string>) => {
            state.cart = state.cart.filter(({product}) => product._id !== action.payload);
        },
    },
});

export const {addProductToCart, removeProductFromCart, incrementCount, decrementCount} = cartSlice.actions;
export default cartSlice;
