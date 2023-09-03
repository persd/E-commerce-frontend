import React, { useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import CartProvider from '../store/CartProvider';
import Cart from './../components/Cart/Cart';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Main from './Main/Main';

export default function Layout() {
    const [showCart, setShowCart] = useState(false);

    const showCartHandler = () => {
        setShowCart((prev) => !prev);
    };
    const hideCartHandler = () => {
        setShowCart(false);
    };

    return (
        <>
            <CartProvider>
                <Header>
                    <NavBar onShowCart={showCartHandler} />
                    {showCart && <Cart />}
                </Header>
                <Main onHideCart={hideCartHandler} />
            </CartProvider>
            <Footer onHideCart={hideCartHandler} />
        </>
    );
}
