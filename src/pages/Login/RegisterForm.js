import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userDataValidationSchema } from '../../components/Validation/validationSchemas';
import { useCustomSnackbar } from '../../store/CustomSnackbarContext';
import theme from '../../theme/theme';
export default function RegisterForm() {
    const customSnackbar = useCustomSnackbar();
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigate();
    const registerUser = useMutation({
        mutationFn: async () => {
            try {
                return await axios.post('/api/register', { ...formik.values });
            } catch (error) {
                throw error;
            }
        },
        onError: (error) => {
            if (error.response.status === 409) {
                customSnackbar.show('error', error.response.data);
            } else {
                customSnackbar.show(
                    'error',
                    'Wystąpił błąd podczas rejestracji'
                );
            }
        },
        onSuccess: () => {
            navigation('/login');
            customSnackbar.show('success', 'Pomyślnie zarejestrowano');
        },
    });

    const handlePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            phoneNumber: '',
            privacyPolicyAccept: false,
        },
        validationSchema: userDataValidationSchema,
        onSubmit: registerUser.mutate,
    });

    return (
        <Container maxWidth="sm">
            <Box p={2} mt={4}>
                <Typography variant="h2" gutterBottom align="center">
                    Rejestracja
                </Typography>
                <form onSubmit={formik.handleSubmit} autoComplete="off">
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

                    <TextField
                        id="firstName"
                        name="firstName"
                        label="Imię"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={formik.values.firstName}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.firstName &&
                            Boolean(!!formik.errors.firstName)
                        }
                        helperText={
                            formik.touched.firstName && formik.errors.firstName
                        }
                    />
                    <TextField
                        id="lastName"
                        name="lastName"
                        label="Nazwisko"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={formik.values.lastName}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.lastName &&
                            Boolean(formik.errors.lastName)
                        }
                        helperText={
                            formik.touched.lastName && formik.errors.lastName
                        }
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="phoneNumber"
                        id="phoneNumber"
                        label="Numer telefonu"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.phoneNumber &&
                            Boolean(formik.errors.phoneNumber)
                        }
                        helperText={
                            formik.touched.phoneNumber &&
                            formik.errors.phoneNumber
                        }
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                id="privacyPolicyAccept"
                                name="privacyPolicyAccept"
                                checked={formik.values.privacyPolicyAccept}
                                onChange={formik.handleChange}
                                required
                            />
                        }
                        label="Akceptuję politykę prywatności"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Zarejestruj
                    </Button>
                </form>

                <Box align="center">
                    <Typography
                        variant="caption"
                        color={theme.palette.grey['400']}
                    >
                        <Link to="/login">Masz już konto? Zaloguj się</Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}
