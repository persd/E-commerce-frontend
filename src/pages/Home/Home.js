import { Box, Typography } from '@mui/material';
import React from 'react';
import Slider from '../../components/UI/Slider';

export default function Home() {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '4rem',
            }}
        >
            <Slider />

            <Typography variant="h3">O nas</Typography>
            <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
        </Box>
    );
}
