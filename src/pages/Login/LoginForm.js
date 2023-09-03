import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Box,
    Button,
    Container,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginValidationSchema } from '../../components/Validation/validationSchemas';
import { useCustomSnackbar } from './../../store/CustomSnackbarContext';
import theme from './../../theme/theme';

export default function LoginForm() {
    const navigate = useNavigate();
    const customSnackbar = useCustomSnackbar();
    const queryClient = useQueryClient();
    const [showPassword, setShowPassword] = useState(false);

    const loginUser = useMutation({
        mutationFn: () => {
            try {
                return axios.post('/api/login', { ...formik.values });
            } catch (error) {
                throw error;
            }
        },
        onError: () => {
            customSnackbar.show('error', 'Podano błędne dane logowania');
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['check']);
            navigate('/');
            customSnackbar.show('success', 'Pomyślnie zalogowano');
        },
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginValidationSchema,
        onSubmit: loginUser.mutate,
    });
    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container maxWidth="sm">
            <Box p={2} align="center">
                <Typography variant="h2" gutterBottom>
                    Logowanie
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        id="email"
                        name="email"
                        type="email"
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={formik.values.email}
                        error={
                            formik.touched.email &&
                            Boolean(!!formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    <TextField
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        label="Hasło"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.password &&
                            Boolean(!!formik.errors.password)
                        }
                        helperText={
                            formik.touched.password && formik.errors.password
                        }
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handlePasswordVisibility}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Zaloguj się
                    </Button>
                </form>
                <Typography variant="caption" color={theme.palette.grey['400']}>
                    <Link to="/register">Nie masz konta? Zarejestruj się</Link>
                </Typography>
            </Box>
        </Container>
    );
}
