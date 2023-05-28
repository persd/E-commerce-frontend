import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
export default function Slider() {
    const { pathname } = useLocation();
    const tabs = ['/', '/kobieta', '/mezczyzna', '/dzieci'];

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ position: 'relative', height: '100%' }}
        >
            <Outlet />
            <IconButton
                aria-label="Next"
                color="primary"
                size="large"
                sx={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                }}
                component={Link}
                to={tabs[tabs.indexOf(pathname) + 1] || tabs[0]}
            >
                <ArrowForwardIos />
            </IconButton>
            <IconButton
                aria-label="Prev"
                color="primary"
                sx={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                }}
                component={Link}
                to={tabs[tabs.indexOf(pathname) - 1] || tabs[tabs.length - 1]}
            >
                <ArrowBackIos />
            </IconButton>
        </Grid>
    );
}
