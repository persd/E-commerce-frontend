import { Divider, Typography, styled } from '@mui/material';
import Box from '@mui/material/Box';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

const LinkContainer = styled(Box)({
    display: 'flex',
    padding: '1.5rem',
    gap: '2rem',
});
const StyledLink = styled(Link, {
    shouldForwardProp: (props) => props !== 'isActive',
})(({ isActive, theme }) => ({
    color: isActive ? 'white' : 'black',
    backgroundColor: isActive ? theme.palette.primary.main : 'transparent',
    padding: '0.5rem 1rem',
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
    },
}));

export default function Account() {
    const { pathname: activeTab } = useLocation();
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ['account'],
        queryFn: async () => {
            return await axios.get(`/api/account/info`);
        },
        onError: () => {
            navigate('/');
        },
        onSuccess: () => {},
    });
    return (
        <Box sx={{ width: '100%' }}>
            <LinkContainer>
                <StyledLink
                    to={'/account/info'}
                    isActive={activeTab.includes('/account/info')}
                >
                    <Typography>Mój profil</Typography>
                </StyledLink>
                <StyledLink
                    to={'/account/orders'}
                    isActive={activeTab.includes('/account/orders')}
                >
                    <Typography>Zamówienia</Typography>
                </StyledLink>
            </LinkContainer>
            <Divider />
            {!isLoading && <Outlet context={{ data: data?.data, isLoading }} />}
        </Box>
    );
}
