import { Box, Button, TextField, Typography, styled } from '@mui/material';
import React, { useState } from 'react';
const UserDataBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    padding: '2rem',
    border: '1px solid black',
});
const UserAcutalData = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
});
const ActionContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: '1rem',
    gap: '2rem',
});
export default function ChangeUserEmail() {
    const [showEditEmail, setShowEditEmail] = useState(false);
    const showEditEmailHandler = () => {
        setShowEditEmail((prev) => !prev);
    };
    return (
        <UserDataBox>
            <UserAcutalData>
                <Typography variant="h5">Twój adres email:</Typography>
                <Typography variant="h5">asdasd@sadas.pl</Typography>
                {!showEditEmail && (
                    <Button variant="contained" onClick={showEditEmailHandler}>
                        Edytuj
                    </Button>
                )}
            </UserAcutalData>
            {showEditEmail && (
                <form>
                    <Typography variant="h5">Zmień adres e-mail</Typography>

                    <TextField
                        id="newEmail"
                        name="newEmail"
                        type="email"
                        label="Nowy adres email"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                    />
                    <TextField
                        id="password"
                        name="password"
                        type="password"
                        label="Podaj hasło do konta"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                    />
                    <ActionContainer>
                        <Button type="submit" variant="contained">
                            Zapisz
                        </Button>
                        <Button
                            type="button"
                            variant="contained"
                            onClick={showEditEmailHandler}
                        >
                            Anuluj
                        </Button>
                    </ActionContainer>
                </form>
            )}
        </UserDataBox>
    );
}
