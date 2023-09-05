import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Divider, Typography, styled } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/UI/Loader';
import theme from '../../../theme/theme';
const ProductsContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
}));
const Product = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    gap: '3rem',
    alignItems: 'center',
}));
const OrderSummary = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    gap: '3rem',
}));
const UserInfo = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    gap: '3rem',
}));
export default function Orders() {
    const navigate = useNavigate();
    const { data, isLoading } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            return await axios.get('/api/order/all');
        },
        onError: () => {
            navigate('/');
        },
        retry: false,
    });
    if (isLoading) return <Loader />;
    const order = data?.data || [];
    return (
        <Box sx={{ p: 5 }}>
            <Typography color="white" variant="h3" align="center" mt={3} mb={5}>
                Zamówienia
            </Typography>
            {order.map((order) => (
                <Accordion
                    sx={{ backgroundColor: theme.palette.secondary.main }}
                    key={order._id}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id={order._id}
                    >
                        <Typography>
                            Zamówienie nr: {order._id} Użytkownik:{' '}
                            {order.userId.email}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2rem',
                        }}
                    >
                        <Typography variant="h5" mb={4}>
                            Zamówione produkty:
                        </Typography>
                        {order.products.map((product, index) => (
                            <ProductsContainer
                                key={`${product.productId._id}${order.id}${index}`}
                            >
                                <Product>
                                    <Box>
                                        <Typography variant="body1">
                                            Zdjęcie produktu:
                                        </Typography>
                                        <img
                                            style={{
                                                objectFit: 'cover',
                                                width: '300px',
                                            }}
                                            src={product.productId.images[0]}
                                            alt="product-img"
                                        />
                                    </Box>
                                    <Typography variant="body1">
                                        Nazwa produktu: {product.productId.name}
                                    </Typography>
                                    <Typography variant="body1">
                                        Kategoria produktu:{' '}
                                        {product.productId.category}
                                    </Typography>
                                    <Typography variant="body1">
                                        Cena produktu: {product.productId.price}
                                    </Typography>
                                </Product>
                                <Divider />
                            </ProductsContainer>
                        ))}
                        <OrderSummary>
                            <Typography>
                                Data zamówienia{' '}
                                {order.createdAt.slice(0, -8).replace('T', ' ')}
                            </Typography>
                            <Typography>
                                Suma zamówienia: {order.total} zł
                            </Typography>
                        </OrderSummary>
                        <UserInfo>
                            <Typography>Dane klienta:</Typography>
                            <Typography>
                                Imię: {order.userId.firstName}
                            </Typography>
                            <Typography>
                                Nazwisko: {order.userId.lastName}
                            </Typography>
                            <Typography>Email: {order.userId.email}</Typography>
                            <Typography>
                                Numer telefonu: {order.userId.phoneNumber}
                            </Typography>
                        </UserInfo>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
}
