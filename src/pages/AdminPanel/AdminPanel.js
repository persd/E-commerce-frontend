import AssignmentIcon from '@mui/icons-material/Assignment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import logo from './../../assets/logo.png';
import theme from './../../theme/theme';
export default function AdminPanel() {
    return (
        <Container maxWidth={false} disableGutters sx={{ height: '100vh' }}>
            <Grid
                container
                backgroundColor={theme.palette.primary.main}
                height="100%"
                overflow="auto"
            >
                <Grid item xs={12} sm={4} md={4} lg={2}>
                    <Link
                        to={'/'}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <img
                            src={logo}
                            alt="logo"
                            style={{ maxWidth: '70%' }}
                        />
                    </Link>
                    <Grid item gap={3} mt={10} mb={5}>
                        <Grid
                            container
                            item
                            component={Link}
                            to="/admin"
                            className="link-container"
                        >
                            <DashboardIcon />
                            <Typography variant="h5">Panel</Typography>
                        </Grid>
                        <Grid
                            container
                            item
                            component={Link}
                            to="/admin/users"
                            className="link-container"
                        >
                            <PeopleIcon />
                            <Typography variant="h5">Użytkownicy</Typography>
                        </Grid>
                        <Grid
                            container
                            item
                            component={Link}
                            to="/admin/products"
                            className="link-container"
                        >
                            <ShoppingCartIcon />
                            <Typography variant="h5">Produkty</Typography>
                        </Grid>
                        <Grid
                            container
                            item
                            component={Link}
                            to="/admin/orders"
                            className="link-container"
                        >
                            <AssignmentIcon />
                            <Typography variant="h5">Zamówienia</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    item
                    alignItems="center"
                    justifyContent="center"
                    backgroundColor={theme.palette.primary.light}
                    sx={{ position: 'relative' }}
                    p={3}
                    xs={12}
                    sm={8}
                    md={8}
                    lg={10}
                >
                    <Outlet />
                </Grid>
            </Grid>
        </Container>
    );
}
