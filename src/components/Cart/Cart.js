import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import React, { useContext } from 'react';
import CartContext from '../../store/cartContext';
import CartItems from './CartItems';
import EmptyCart from './EmptyCart';
const Modal = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '75px',
    right: '200px',
    width: '300px',
    background: theme.palette.primary.main,
    height: 'auto',
    padding: '1rem',
    borderRadius: '0 0 10px 10px',
}));

export default function Cart() {
    const cartCon = useContext(CartContext);
    const totalAmount = cartCon.totalAmount.toFixed(2);
    const isEmpty = cartCon.products.length <= 0;
    return (
        <Modal>
            {console.log(cartCon)}
            {!isEmpty ? (
                <CartItems cartCon={cartCon} totalAmount={totalAmount} />
            ) : (
                <EmptyCart />
            )}
        </Modal>
    );
}
