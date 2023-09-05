import { Box, Button, MenuItem, TextField, styled } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductPreview from '../../components/Product/ProductPreview';
const SearchContainer = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '4fr 2fr 0.5fr',
    alignItems: 'center',
    gap: '2rem',
    margin: '3rem 0',
}));
const ProductContainer = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '3rem',
    justifyContent: 'center',

    alignItems: 'center',
}));
const SearchBar = styled(TextField)(({ theme }) => ({
    display: 'flex',
}));

export default function SearchProducts() {
    const [searchData, setSearchData] = useState({
        searchName: '',
        category: 'Brak',
    });

    // const { data, isLoading } = useQuery({
    //     queryKey: ['products'],
    //     queryFn: async () => {
    //         return await axios.get(`/api/product`);
    //     },
    //     onSuccess: (data) => {
    //         setProducts(data?.data || []);
    //     },
    //     // refetchOnWindowFocus: false,
    // });

    const { data, mutate } = useMutation({
        mutationFn: async () => {
            try {
                return await axios.post(`/api/product/search`, {
                    searchName: searchData.searchName,
                    category:
                        searchData.category === 'Brak' || !searchData.category
                            ? undefined
                            : searchData.category,
                });
            } catch (error) {
                throw error;
            }
        },
        onError: (error) => {},
        onSuccess: (data) => {},
    });

    useEffect(() => {
        mutate();
    }, [mutate]);

    const handleChangeSearchData = (e) => {
        const { name, value } = e.target;
        setSearchData((prev) => ({ ...prev, [name]: value }));
    };

    const products = data?.data || [];

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',

                flexDirection: 'column',
            }}
        >
            <SearchContainer>
                <SearchBar
                    id="searchName"
                    name="searchName"
                    label="Szukaj nazwy produktu..."
                    variant="outlined"
                    margin="normal"
                    value={searchData.searchName}
                    fullWidth
                    onChange={handleChangeSearchData}
                />

                <TextField
                    id="category"
                    name="category"
                    label="Kategoria"
                    value={searchData.category}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    select
                    onChange={handleChangeSearchData}
                    defaultValue="Brak"
                >
                    <MenuItem value="Brak">Brak</MenuItem>
                    <MenuItem value="Kobieta">Kobieta</MenuItem>
                    <MenuItem value="Mężczyzna">Mężczyzna</MenuItem>
                    <MenuItem value="Dzieci">Dzieci</MenuItem>
                </TextField>
                <Button variant="contained" onClick={mutate}>
                    Szukaj
                </Button>
            </SearchContainer>
            <ProductContainer>
                {products.map((item) => (
                    <ProductPreview
                        key={item._id}
                        id={item._id}
                        image={item.images[0]}
                        name={item.name}
                        price={item.price}
                    />
                ))}
            </ProductContainer>
        </Box>
    );
}
