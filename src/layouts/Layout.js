import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
const MainContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh',
    background:
        'radial-gradient(circle, rgba(226,135,4,1) 27%, rgba(221,140,0,1) 51%, rgba(197,118,0,1) 66%, rgba(145,78,22,1) 81%)',
});
const ContentContainer = styled(Box)({
    marginTop: '75px',
    flexGrow: 1,
    maxWidth: '1500px',
});

export default function Layout() {
    return (
        <MainContainer>
            <NavBar />
            <ContentContainer>
                <Outlet />
            </ContentContainer>
        </MainContainer>
    );
}
