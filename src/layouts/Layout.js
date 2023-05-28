import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import { Grid } from '@mui/material';
import Slider from '../pages/Slider';

export default function Layout() {
    return (
        <>
            <Grid
                container
                direction="column"
                style={{
                    height: '100vh',
                    display: 'grid',
                    gridTemplateRows: 'auto 1fr',
                }}
            >
                <Grid item>
                    <NavBar />
                </Grid>

                <Grid
                    item
                    container
                    alignItems="center"
                    justifyContent="center"
                    style={{
                        height: '100%',
                        overflow: 'hidden',
                        background:
                            'radial-gradient(circle, rgba(226,135,4,1) 27%, rgba(221,140,0,1) 51%, rgba(197,118,0,1) 66%, rgba(145,78,22,1) 81%)',
                    }}
                >
                    <Slider />
                </Grid>
            </Grid>
        </>
    );
}
