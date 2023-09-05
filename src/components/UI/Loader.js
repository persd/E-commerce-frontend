import { Box, CircularProgress } from '@mui/material';
import React from 'react';

export default function Loader() {
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                alignContent: 'center',
                marginTop: '2rem',
            }}
        >
            <CircularProgress color="primary" />
        </Box>
    );
}
