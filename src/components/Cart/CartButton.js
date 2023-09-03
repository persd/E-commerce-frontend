import { ShoppingCart } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Badge from '@mui/material/Badge';
import React, { useContext } from 'react';
import CartContext from '../../store/cartContext';

export default function CartButton(props) {
    const cartCon = useContext(CartContext);

    const numberOfItemsInCart = cartCon.products.length;
    return (
        <IconButton sx={{ padding: 0 }} onClick={props.onShowCart}>
            <Badge
                badgeContent={numberOfItemsInCart ? numberOfItemsInCart : '0'}
                color="secondary"
            >
                <ShoppingCart color="secondary" fontSize="medium" />
            </Badge>
        </IconButton>
    );
}
