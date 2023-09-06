import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import axios from 'axios';
import React, { useState } from 'react';
import { useCustomSnackbar } from '../../../store/CustomSnackbarContext';

const initialState = {
    brand: '',
    category: 'Kobieta',
    name: '',
    price: 0,
    description: '',
    material: ['', '', '', ''],
    images: [],
};

export default function AddProductForm() {
    const queryClient = useQueryClient();
    const customSnackbar = useCustomSnackbar();
    const [saveData, setSaveData] = useState(initialState);

    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setSaveData({ ...saveData, [name]: value });
    };

    const savePhotosHandle = (e) => {
        setSaveData({ ...saveData, images: e.target.files });
    };
    const handleMaterialChange = (e, index) => {
        const { value } = e.target;
        const newMaterial = [...saveData.material];
        newMaterial[index] = value;

        setSaveData({ ...saveData, material: newMaterial });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const [key, value] of Object.entries(saveData)) {
            if (['material', 'images'].includes(key)) {
                for (const item of value) {
                    if (!item) continue;
                    formData.append(key, item);
                }
            } else {
                formData.append(key, value);
            }
        }

        createProduct.mutate(formData);
    };
    const createProduct = useMutation({
        mutationFn: async (formData) => {
            try {
                return await axios.post('api/product/uploads', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } catch (error) {
                throw error;
            }
        },
        onError: (error) => {
            if (error.response.status === 409) {
                customSnackbar.show('error', error.response?.data?.message);
            } else {
                customSnackbar.show(
                    'error',
                    `${error.response?.data?.message || error.response?.data}`
                );
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
            customSnackbar.show('success', 'Dodano produkt');
            setSaveData(initialState);
        },
    });

    return (
        <form onSubmit={onSubmit} autoComplete="off">
            <TextField
                id="brand"
                name="brand"
                label="Marka"
                variant="outlined"
                margin="normal"
                value={saveData.brand}
                fullWidth
                required
                onChange={handleDataChange}
            />
            <TextField
                id="category"
                name="category"
                label="Kategoria"
                variant="outlined"
                value={saveData.category}
                margin="normal"
                fullWidth
                select
                required
                onChange={handleDataChange}
                defaultValue="Kobieta"
            >
                <MenuItem value="Kobieta">Kobieta</MenuItem>
                <MenuItem value="Mężczyzna">Mężczyzna</MenuItem>
                <MenuItem value="Dzieci">Dzieci</MenuItem>
            </TextField>
            <TextField
                id="name"
                name="name"
                value={saveData.name}
                label="Nazwa"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                onChange={handleDataChange}
            />
            <TextField
                id="price"
                value={saveData.price}
                name="price"
                label="Cena"
                variant="outlined"
                margin="normal"
                fullWidth
                onChange={handleDataChange}
                required
            />

            <Typography>Dodaj zdjęcia</Typography>
            <Button variant="contained" component="label">
                Upload File
                <Box sx={{ marginLeft: '1rem' }}>
                    {[...saveData.images].map((image, index) => (
                        <span key={`${image.name}${index}`}> {image.name}</span>
                    ))}
                </Box>
                <input
                    type="file"
                    hidden
                    onChange={savePhotosHandle}
                    multiple
                />
            </Button>

            <TextField
                id="description"
                value={saveData.description}
                name="description"
                label="Opis"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                multiline
                rows={4}
                onChange={handleDataChange}
            />
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                {saveData.material.map((value, index) => (
                    <TextField
                        key={index}
                        name={`material[${index}]`}
                        value={value}
                        label={`Materiał ${index}`}
                        variant="outlined"
                        margin="normal"
                        onChange={(e) => handleMaterialChange(e, index)}
                    />
                ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="submit" variant="contained">
                    Stwórz
                </Button>
            </Box>
        </form>
    );
}
