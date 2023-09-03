import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import OrderButton from '../UI/CustomButton';

const OrderCostContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: '1rem',
});

const OrderItemsContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    maxHeight: '450px',
    flexDirection: 'column',
    paddingBottom: '2rem',
    gap: '1rem',
    overflow: 'auto',

    '&::-webkit-scrollbar': {
        width: '6px',
    },

    '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '3px',
        '&:hover': {
            backgroundColor: 'gray',
        },
    },
}));
const OrderItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    background: theme.palette.primary.light,
}));
const OrderItemTitle = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem',
    borderBottom: `2px dashed ${theme.palette.primary.main}`,
}));
const OrderItemDetails = styled(Box)({
    display: 'flex',
    gap: '1rem',
    padding: '0.5rem 0.2rem',
});
const OrderItemImage = styled('img')({
    width: '60px',
    height: '80px',
    padding: '0.2rem 0.5rem',
    objectFit: 'cover',
});
const OrderItemDescription = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
});

export default function CartItems({ cartCon, totalAmount }) {
    return (
        <>
            <OrderItemsContainer>
                {cartCon.products.map((product) => (
                    <OrderItem key={product.id}>
                        <OrderItemTitle>
                            <Typography variant="h6">
                                {product.brand}
                            </Typography>
                            <IconButton
                                onClick={cartCon.removeProduct.bind(
                                    null,
                                    product.id
                                )}
                            >
                                <DeleteForeverIcon color="secondary" />
                            </IconButton>
                        </OrderItemTitle>
                        <OrderItemDetails>
                            <OrderItemImage src={product.img}></OrderItemImage>
                            <OrderItemDescription>
                                <Typography variant="body2">
                                    {product.name}
                                </Typography>
                                <Typography variant="body2">
                                    Rozmiar - {product.size}
                                </Typography>
                                <Typography variant="h6">
                                    {product.price} zł
                                </Typography>
                            </OrderItemDescription>
                        </OrderItemDetails>
                    </OrderItem>
                ))}
            </OrderItemsContainer>
            <OrderCostContainer>
                <Typography variant="body1">Suma zamówienia</Typography>
                <Typography variant="body1">{totalAmount} zł</Typography>
            </OrderCostContainer>
            <OrderButton
                variant="contained"
                color="secondary"
                value="Do kasy"
                fullWidth
            />
        </>
    );
}
