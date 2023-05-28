import { ShoppingCart } from '@mui/icons-material';
import { Avatar, Container, Grid, IconButton, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import theme from '../../theme/theme';
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

export default function NavBar() {
    return (
        <AppBar
            position="static"
            elevation={0}
            variant="outlined"
            sx={{ height: 'auto', p: '1rem' }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid item>
                            <Link to="/">
                                <Avatar
                                    alt="Logo"
                                    src={logo}
                                    sx={{
                                        height: '90px',
                                        width: '90px',
                                        display: { xs: 'none', md: 'flex' },
                                    }}
                                />
                            </Link>
                        </Grid>

                        <Grid
                            item
                            gap={3}
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                            }}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Typography
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Link
                                    to="/search"
                                    style={{ paddingRight: '50px' }}
                                >
                                    <span
                                        style={{
                                            color: theme.palette.grey['400'],
                                            display: 'flex',
                                            position: 'relative',
                                            width: '100%',
                                        }}
                                    >
                                        Szukaj
                                        <span
                                            style={{
                                                position: 'absolute',
                                                left: 0,
                                                bottom: '-3px',
                                                width: '60px',
                                                borderBottom: '1px solid',
                                            }}
                                        ></span>
                                    </span>
                                </Link>
                            </Typography>
                            {NavItems.map(({ value, to }) => (
                                <NavBarButton
                                    variant="contained"
                                    color="secondary"
                                    value={value}
                                    component={Link}
                                    to={to}
                                />
                            ))}
                            <IconButton
                                color="inherit"
                                sx={{
                                    backgroundColor:
                                        theme.palette.secondary.main,
                                }}
                                component={Link}
                                to="/koszyk"
                            >
                                <ShoppingCart fontSize="small" />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
