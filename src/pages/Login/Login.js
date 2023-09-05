import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Grid, Typography, styled } from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import loginImage from './../../assets/login.png';
import loginBackground from './../../assets/loginBackground.webp';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Image = styled('img')(() => ({
    objectFit: 'cover',
    height: '100%',
    width: '100%',
    borderTopRightRadius: '20px',
    borderBottomRightRadius: '20px',
}));

export default function Login() {
    const { pathname: activeTab } = useLocation();

    return (
        <Grid
            container
            alignItems="center"
            justifyContent="center"
            style={{
                height: '100vh',
                overflow: 'hidden',
                backgroundImage: `url(${loginBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Grid container justifyContent="center" alignItems="center">
                <Grid
                    container
                    item
                    height="50%"
                    width="70%"
                    direction="row"
                    borderRadius="20px"
                    boxShadow="10"
                >
                    <Grid
                        item
                        xs={6}
                        backgroundColor="white"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexDirection="column"
                        position="relative"
                        sx={{
                            borderTopLeftRadius: '20px',
                            borderBottomLeftRadius: '20px',
                        }}
                    >
                        <Typography
                            variant="caption"
                            mb={4}
                            sx={{
                                position: 'absolute',

                                top: '20px',
                                left: '20px',
                            }}
                        >
                            <Link
                                to="/"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '10px',
                                    lineHeight: '0',
                                }}
                            >
                                <ArrowBackIcon />
                                Powrót na stronę główną
                            </Link>
                        </Typography>

                        {activeTab === '/login' ? (
                            <LoginForm />
                        ) : (
                            <RegisterForm />
                        )}
                    </Grid>
                    <Grid item xs={6} height="auto">
                        <Image src={loginImage} alt="login" />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
