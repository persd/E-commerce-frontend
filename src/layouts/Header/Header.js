import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import React from 'react';
const HeaderContainer = styled(AppBar)({
    height: '75px',
    position: 'fixed',
    variant: 'outlined',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

export default function Header(props) {
    return (
        <header>
            <HeaderContainer>{props.children}</HeaderContainer>
        </header>
    );
}
