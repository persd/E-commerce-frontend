import { Grid } from '@mui/material';
import React from 'react';
import secondPhoto from './../assets/3.png';
export default function Home() {
    return (
        <>
            <Grid container>
                <Grid
                    item
                    container
                    justifyContent="center"
                    sx={{ height: 'auto' }}
                >
                    <img
                        src={secondPhoto}
                        alt="main"
                        style={{ height: '100%', objectFit: 'cover' }}
                    />
                </Grid>
            </Grid>
        </>
    );
}
