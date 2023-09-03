import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCustomSnackbar } from '../../../store/CustomSnackbarContext';
import CartContext from '../../../store/cartContext';
import ProductImage from './ProductImage';

const ProductPageContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    marginTop: '2rem',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
    },
}));

const ProductDetailsConteiner = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: '0 1rem',

    width: '50%',
}));
const Details = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: '0 2rem',
    gap: '2rem',
}));
const ProductSizeContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '1rem',

    '& > button': {
        flexBasis: 'calc(33.33% - 1rem)',
    },
    marginTop: '1rem',
}));
const BoldTypography = styled(Typography)({
    fontWeight: 'bold',
});
const SizeButton = styled(Button)({
    padding: '1rem 0',
});
const DisabledSizeButton = styled(Button)({
    display: 'flex',
    flexDirection: 'column',
});

export default function ProductPage(props) {
    let { id } = useParams();
    const customSnackbar = useCustomSnackbar();
    const cartCon = useContext(CartContext);
    const { data, isLoading } = useQuery({
        queryKey: ['product'],
        queryFn: async () => {
            return await axios.get(`/api/product/${id}`);
        },
    });
    const loginImage = 'http://localhost:5000/11.png';

    const product = data?.data?.product;
    // const product = {
    //     brand: 'Calvin Clain',
    //     name: 'Kurtka Przeciwdeszczowa',
    //     description: 'loreasdasdad',
    //     price: 299.99,
    //     images: [loginImage, loginImage2],
    //     sizes: {
    //         XS: 0,
    //         S: 1,
    //         M: 1,
    //         L: 1,
    //         XL: 1,
    //         XXL: 1,
    //     },
    // };
    const { name, description, price, size, img } = props;
    const [selectedSize, setSelectedSize] = useState(null);
    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };
    const addProductToCartHandler = (event) => {
        if (!selectedSize) {
            customSnackbar.show('error', 'Proszę wybrać rozmiar');

            return;
        }

        const existingProducts = cartCon.products.filter(
            (item) => item.name === product.name && item.size === selectedSize
        );

        const totalExistingAmount = existingProducts.reduce(
            (total, item) => total + item.amount,
            0
        );

        if (totalExistingAmount >= 5) {
            customSnackbar.show(
                'warning',
                'Osiągnięto maksymalną ilość produktu w koszyku'
            );
            return;
        }
        cartCon.addProduct({
            brand: product.brand,
            name: product.name,
            price: product.price,
            description: product.description,
            size: selectedSize,
            amount: 1,
            img: loginImage,
        });
        customSnackbar.show('success', 'Dodano do koszyka');
    };

    console.log(isLoading, product);

    if (isLoading) {
        return <>Loader</>;
    }

    if (!product) {
        return (
            <ProductPageContainer>Nie znaleziono produktu</ProductPageContainer>
        );
    }

    return (
        <>
            <ProductPageContainer>
                <ProductImage images={product.images} />
                <ProductDetailsConteiner>
                    <Details>
                        <BoldTypography variant="h3">
                            {product.brand}
                        </BoldTypography>
                        <Typography variant="h5">{product.name}</Typography>
                        <BoldTypography variant="h5">
                            {product.price.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                            zł
                        </BoldTypography>
                        <Typography variant="h6" mt={6}>
                            Rozmiary
                        </Typography>
                        <ProductSizeContainer>
                            {Object.entries(product.sizes).map(
                                ([size, quantity]) =>
                                    quantity > 0 ? (
                                        <SizeButton
                                            key={size}
                                            variant={
                                                selectedSize === size
                                                    ? 'contained'
                                                    : 'outlined'
                                            }
                                            onClick={() =>
                                                handleSizeClick(size)
                                            }
                                        >
                                            {size}
                                        </SizeButton>
                                    ) : (
                                        <DisabledSizeButton
                                            key={size}
                                            disabled
                                            variant="outlined"
                                        >
                                            {size}
                                            <Typography variant="caption">
                                                Brak
                                            </Typography>
                                        </DisabledSizeButton>
                                    )
                            )}
                        </ProductSizeContainer>
                        <Button
                            sx={{ padding: '1rem 0' }}
                            variant="contained"
                            onClick={addProductToCartHandler}
                        >
                            Dodaj do koszyka
                        </Button>
                        <Typography variant="h5">Skład:</Typography>
                        <Typography component="div">
                            <ul style={{ margin: 0 }}>
                                {product.material.map((material, index) => (
                                    <li key={`${material}${index}`}>
                                        {material}
                                    </li>
                                ))}
                            </ul>
                        </Typography>
                        <Typography variant="h5">Opis:</Typography>
                        <Typography variant="body2">
                            {product.description}
                        </Typography>
                    </Details>
                </ProductDetailsConteiner>
            </ProductPageContainer>
        </>
    );
}
