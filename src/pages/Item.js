import { Button, Paper } from '@mui/material';
import React from 'react';

export default function Item(item) {
    return (
        <Paper>
            <img src={item.image} alt={item.caption} />
            <Button>{item.caption}</Button>
        </Paper>
    );
}
