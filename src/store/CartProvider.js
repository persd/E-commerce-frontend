import React, { useEffect, useReducer } from 'react';
import CartContext from './cartContext';

const defaultCart = {
    products: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_CART_PRODUCT':
            console.log(action.product);
            const updatedProducts = state.products.concat({
                ...action.product,
                id: action.product._id,
            });

            const updatedAmount = state.totalAmount + action.product.price;
            localStorage.setItem('cart', JSON.stringify(updatedProducts));
            localStorage.setItem('totalAmount', JSON.stringify(updatedAmount));

            return {
                products: updatedProducts,
                totalAmount: +updatedAmount,
            };
        case 'REMOVE_CART_PRODUCT':
            const productToRemove = state.products[action.index];

            const updatedCartItems = state.products.filter(
                (_, index) => index !== action.index
            );

            const updatedTotalAmount = Number(
                new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }).format(state.totalAmount - productToRemove.price)
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
        case 'CLEAR_CART':
            localStorage.removeItem('cart');
            localStorage.removeItem('totalAmount');
            return {
                products: [],
                totalAmount: 0,
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
        dispatchCartAction({
            type: 'ADD_CART_PRODUCT',
            product,
        });
    };
    const removeProductToCartHandler = (index) => {
        dispatchCartAction({ type: 'REMOVE_CART_PRODUCT', index });
    };
    const clearProductToCartHandler = (product) => {
        dispatchCartAction({
            type: 'CLEAR_CART',
            product: product,
        });
    };
    const cartContext = {
        products: cartState.products,
        totalAmount: cartState.totalAmount,
        addProduct: addProductToCartHandler,
        removeProduct: removeProductToCartHandler,
        clearCart: clearProductToCartHandler,
    };
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};
export default CartProvider;
