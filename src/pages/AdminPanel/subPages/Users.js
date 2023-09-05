import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/UI/Loader';
import theme from '../../../theme/theme';
export default function Users() {
    const navigate = useNavigate();
    const { data, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            return await axios.get(`/api/users`);
        },
        onError: () => {
            navigate('/');
        },
        retry: false,
    });

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        {
            field: 'firstName',
            headerName: 'First name',
            flex: 1,
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            flex: 1,
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
        },
    ];
    if (isLoading) return <Loader />;
    const rows =
        data?.data.map(({ _id, ...user }) => ({ id: _id, ...user })) || [];

    return (
        <Box sx={{ p: 5 }}>
            <Typography color="white" variant="h3" align="center" mt={3} mb={5}>
                Użytkownicy
            </Typography>
            <DataGrid
                sx={{
                    background: theme.palette.primary.main,
                    color: 'white',
                }}
                columns={columns}
                rows={rows}
            />
        </Box>
    );
}
