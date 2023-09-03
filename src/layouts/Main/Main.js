import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { Outlet } from 'react-router-dom';

const ContentContainer = styled(Box)({
    display: 'flex',
    maxWidth: '1200px',
    margin: '75px auto 5rem auto',
});

export default function Main(props) {
    return (
        <main onClick={props.onHideCart}>
            <ContentContainer>
                <Outlet />
            </ContentContainer>
        </main>
    );
}
