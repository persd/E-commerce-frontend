import React, { useEffect, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CartContext from './cartContext';

const defaultCart = {
    products: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_CART_PRODUCT':
            const updatedProducts = state.products.concat({
                ...action.product,
                id: action.id,
            });

            const updatedAmount = state.totalAmount + action.product.price;
            localStorage.setItem('cart', JSON.stringify(updatedProducts));
            localStorage.setItem('totalAmount', JSON.stringify(updatedAmount));
            return {
                products: updatedProducts,
                totalAmount: +updatedAmount,
            };
        case 'REMOVE_CART_PRODUCT':
            const existingProduct = state.products.findIndex(
                (product) => product.id === action.id
            );

            const productToRemove = state.products[existingProduct];

            const updatedTotalAmount =
                state.totalAmount - productToRemove.price;
            const updatedCartItems = state.products.filter(
                (product) => product.id !== action.id
            );
            localStorage.setItem('cart', JSON.stringify(updatedCartItems));
            localStorage.setItem(
                'totalAmount',
                JSON.stringify(updatedTotalAmount)
            );
            return {
                products: updatedCartItems,
                totalAmount: +updatedTotalAmount,
            };
        case 'SET_CART_FROM_STORAGE':
            return {
                products: action.products || [],
                totalAmount: +action.totalAmount.toFixed(2) || 0,
            };
        default:
            return defaultCart;
    }
};
const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        defaultCart
    );
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        const storedTotalAmount = JSON.parse(
            localStorage.getItem('totalAmount')
        );

        if (storedCart && storedTotalAmount !== null) {
            dispatchCartAction({
                type: 'SET_CART_FROM_STORAGE',
                products: storedCart,
                totalAmount: storedTotalAmount,
            });
        }
    }, []);

    const addProductToCartHandler = (product) => {
        const newProductId = uuidv4();
        dispatchCartAction({
            type: 'ADD_CART_PRODUCT',
            product: product,
            id: newProductId,
        });
    };
    const removeProductToCartHandler = (id) => {
        dispatchCartAction({ type: 'REMOVE_CART_PRODUCT', id: id });
    };
    const cartContext = {
        products: cartState.products,
        totalAmount: cartState.totalAmount,
        addProduct: addProductToCartHandler,
        removeProduct: removeProductToCartHandler,
    };
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};
export default CartProvider;
