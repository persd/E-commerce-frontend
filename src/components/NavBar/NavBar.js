import { Box, Typography } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { React, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useCustomSnackbar } from '../../store/CustomSnackbarContext';
import { UserContext } from '../../store/UserContext';
import CartButton from '../Cart/CartButton';
import NavBarButton from '../UI/CustomButton';
const NavItemsContainer = styled(Toolbar)(({ theme }) => ({
    maxWidth: '1500px',
    position: 'relative',
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
    marginRight: '1rem',
});
const SearchLink = styled(Typography)({
    color: '#999999',
});

export default function NavBar(props) {
    const { user, isLoading } = useContext(UserContext);

    const customSnackbar = useCustomSnackbar();

    const logOutMutation = useMutation({
        mutationFn: () => {
            return axios.post('/api/logout');
        },
        onError: () => {
            customSnackbar.show('error', 'Wystąpił bład');
        },
        onSuccess: () => {
            window.location.reload();
        },
    });
    const NavItems = [
        user
            ? {
                  value: 'KONTO',
                  to: 'account/info',
              }
            : {
                  value: 'LOGIN',
                  to: 'login',
              },
    ];

    return (
        <NavItemsContainer disableGutters>
            <NavBarLogo to="/">
                <LogoImage src={logo} alt="Logo" />
            </NavBarLogo>
            <NavBarItems>
                {!isLoading && (
                    <>
                        <NavBarButton
                            variant="contained"
                            color="secondary"
                            value="Szukaj"
                            component={Link}
                            to="search"
                        />
                        {/* <SearchLinkBox>
                            <Link to="/search">
                                <SearchLink>Szukaj</SearchLink>
                            </Link>
                        </SearchLinkBox> */}

                        {user ? (
                            <>
                                <NavBarButton
                                    variant="contained"
                                    color="secondary"
                                    value="KONTO"
                                    component={Link}
                                    to="account/info"
                                />
                                <NavBarButton
                                    variant="contained"
                                    color="secondary"
                                    value="WYLOGUJ"
                                    onClick={() => logOutMutation.mutate()}
                                />
                            </>
                        ) : (
                            <NavBarButton
                                variant="contained"
                                color="secondary"
                                value="LOGIN"
                                component={Link}
                                to={'login'}
                            />
                        )}
                    </>
                )}
                <CartButton onShowCart={props.onShowCart} />
            </NavBarItems>
        </NavItemsContainer>
    );
}
