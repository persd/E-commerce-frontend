import { Box, Typography, styled } from '@mui/material';
import React from 'react';
const EmptyCartInfo = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});
export default function EmptyCart() {
    return (
        <EmptyCartInfo>
            <Typography variant="body1">Twój koszyk jest pusty</Typography>
        </EmptyCartInfo>
    );
}
