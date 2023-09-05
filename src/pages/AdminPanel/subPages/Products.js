import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Typography, styled } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Fab from '@mui/material/Fab';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import { DataGrid } from '@mui/x-data-grid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/UI/Loader';
import theme from '../../../theme/theme';
import AddProductForm from './AddProductForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    overflow: 'auto',
    height: 'auto',
    display: 'block',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const fabStyle = {
    position: 'fixed',
    bottom: '2rem',
    right: '1.5rem',
};
const ProductsContainer = styled(Box)({
    display: 'flex',
    flexWrap: 'wrap',
});

export default function Products() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { data, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            return await axios.get(`/api/product`);
        },
        onError: () => {
            navigate('/');
        },
        retry: false,
    });

    const { mutate } = useMutation({
        mutationFn: async (id) => {
            return await axios.delete(`/api/product/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
        },
    });

    const products = data?.data.map(({ _id, ...product }) => ({
        id: _id,
        ...product,
    }));

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
        },
        {
            field: 'images',
            headerName: 'Image',
            flex: 2,
            renderCell: (params) => (
                <img
                    src={params.value[0]}
                    alt={params.value[0]}
                    style={{ objectFit: 'cover', height: '100%' }}
                />
            ),
        },
        {
            field: 'brand',
            headerName: 'Brand',
            flex: 1,
        },
        {
            field: 'category',
            headerName: 'Category',
            flex: 1,
        },
        {
            field: 'price',
            headerName: 'Price',
            flex: 1,
        },
        {
            field: 'action',
            headerName: 'Action',
            renderCell: (params) => (
                <DeleteIcon
                    sx={{ cursor: 'pointer' }}
                    onClick={() => mutate(params.row.id)}
                />
            ),
        },
    ];
    if (isLoading) return <Loader />;
    if (!products) return <></>;

    return (
        <Box sx={{ p: 5 }}>
            <Typography color="white" variant="h3" align="center" mt={3} mb={5}>
                Produkty
            </Typography>
            <ProductsContainer>
                <DataGrid
                    sx={{
                        background: theme.palette.primary.main,
                        color: 'white',
                    }}
                    columns={columns}
                    rows={products}
                    rowHeight={200}
                />
            </ProductsContainer>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Dodaj nowy produkt
                        </Typography>

                        <AddProductForm />
                    </Box>
                </Fade>
            </Modal>

            <Fab
                color="primary"
                aria-label="add"
                style={fabStyle}
                onClick={handleOpen}
            >
                <AddIcon />
            </Fab>
        </Box>
    );
}
