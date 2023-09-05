import { Divider, Typography, styled } from '@mui/material';
import Box from '@mui/material/Box';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { React } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

import Loader from '../../components/UI/Loader';
import { useCustomSnackbar } from '../../store/CustomSnackbarContext';
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
    const queryClient = useQueryClient();
    const customSnackbar = useCustomSnackbar();
    const editUserPersonalData = useMutation({
        mutationFn: async (formData) => {
            try {
                return await axios.put('/api/account/info/edit', {
                    ...formData,
                });
            } catch (error) {
                throw error;
            }
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['account']);
            customSnackbar.show('success', data.data.message);
        },
        onError: (error) => {
            customSnackbar.show('error', error.response.data.message);
        },
    });

    const { data, isLoading } = useQuery({
        queryKey: ['account'],
        queryFn: async () => {
            return await axios.get(`/api/account/info`);
        },
        onError: () => {
            navigate('/login');
        },
        onSuccess: () => {},
        retry: false,
    });
    if (isLoading) return <Loader />;
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
            <Outlet
                context={{
                    data: data?.data,
                    isLoading,
                    editUserPersonalData,
                }}
            />
        </Box>
    );
}
