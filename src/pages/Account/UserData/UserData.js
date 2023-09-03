import { Typography, styled } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import ChangeUserData from './ChangeUserData';
import ChangeUserEmail from './ChangeUserEmail';
import ChangeUserPassword from './ChangeUserPassword';

const Tittle = styled(Typography)({
    padding: '1.5rem',
});
const UserDataContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    padding: '1.5rem',
    gap: '2rem',
});

export default function UserData() {
    return (
        <>
            <Tittle variant="h5">Dane osobowe</Tittle>
            <UserDataContainer>
                <ChangeUserData />
                <ChangeUserEmail />
                <ChangeUserPassword />
            </UserDataContainer>
        </>
    );
}
