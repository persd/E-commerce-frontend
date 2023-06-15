import { ShoppingCart } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import NavBarButton from './CustomButton';

const NavItems = [
    {
        value: 'KOBIETA',
        to: 'kobieta',
    },
    {
        value: 'MĘŻCZYZNA',
        to: 'mezczyzna',
    },
    {
        value: 'DZIECI',
        to: 'dzieci',
    },
    {
        value: 'LOGIN',
        to: 'login',
    },
];

const NavBarContainer = styled(AppBar)({
    height: '75px',
    position: 'fixed',
    variant: 'outlined',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});
const NavItemsContainer = styled(Toolbar)(({ theme }) => ({
    maxWidth: '1500px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '3rem',
    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}));

const NavBarLogo = styled(Link)({
    display: 'flex',
    alignItems: 'center',
});

const LogoImage = styled('img')({
    height: '75px',
});

const NavBarItems = styled(Box)({
    display: 'flex',
    gap: 20,
});
const SearchLinkBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: '50px',
});
const SearchLink = styled(Typography)({
    color: '#999999',
    position: 'relative',
});
const SearchUnderline = styled(Typography)({
    position: 'absolute',
    left: 0,
    bottom: '-3px',
    borderBottom: '1px solid',
    width: '60px',
});
export default function NavBar() {
    return (
        <NavBarContainer>
            <NavItemsContainer disableGutters>
                <NavBarLogo to="/">
                    <LogoImage src={logo} alt="Logo" />
                </NavBarLogo>
                <NavBarItems>
                    <SearchLinkBox>
                        <Link to="/search">
                            <SearchLink>
                                Szukaj
                                <SearchUnderline />
                            </SearchLink>
                        </Link>
                    </SearchLinkBox>
                    {NavItems.map(({ value, to }) => (
                        <NavBarButton
                            key={to}
                            variant="contained"
                            color="secondary"
                            value={value}
                            component={Link}
                            to={to}
                        />
                    ))}
                    <IconButton
                        component={Link}
                        to="/koszyk"
                        sx={{ padding: 0 }}
                    >
                        <ShoppingCart color="secondary" fontSize="medium" />
                    </IconButton>
                </NavBarItems>
            </NavItemsContainer>
        </NavBarContainer>
    );
}
