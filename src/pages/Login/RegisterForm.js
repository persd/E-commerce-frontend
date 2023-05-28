import React, { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import theme from '../../theme/theme';
export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handlePasswordVisibility = (event) => {
        setShowPassword(!showPassword);
    };
    const handleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        privacyPolicy: false,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: checked }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
    };
    return (
        <Container maxWidth="sm">
            <Box p={2} mt={4}>
                <Typography variant="h2" gutterBottom align="center">
                    Rejestracja
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        id="email"
                        name="email"
                        type="email"
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        label="Powtórz hasło"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        onChange={handleInputChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={
                                            handleConfirmPasswordVisibility
                                        }
                                        edge="end"
                                    >
                                        {showConfirmPassword ? (
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
                        value={formData.firstName}
                        onChange={handleInputChange}
                    />
                    <TextField
                        id="lastName"
                        name="lastName"
                        label="Nazwisko"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                id="privacyPolicy"
                                name="privacyPolicy"
                                checked={formData.privacyPolicy}
                                onChange={handleCheckboxChange}
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
