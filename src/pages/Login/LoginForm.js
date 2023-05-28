import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import theme from './../../theme/theme';
export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
    };
    return (
        <Container maxWidth="sm">
            <Box p={2} align="center">
                <Typography variant="h2" gutterBottom>
                    Logowanie
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
                        value={formData.login}
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
                        value={formData.password}
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
