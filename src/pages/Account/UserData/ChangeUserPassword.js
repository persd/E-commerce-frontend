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

export default function ChangeUserPassword() {
    const [showChangePassword, setShowChangePassword] = useState(false);

    const showChangePasswordHandler = () => {
        setShowChangePassword((prev) => !prev);
    };
    return (
        <UserDataBox>
            <UserAcutalData>
                {!showChangePassword && (
                    <>
                        <Typography variant="h5">Twoje hasło:</Typography>
                        <Typography variant="h5">********</Typography>
                        <Button
                            type="button"
                            variant="contained"
                            onClick={showChangePasswordHandler}
                        >
                            Edytuj
                        </Button>
                    </>
                )}
            </UserAcutalData>
            {showChangePassword && (
                <form>
                    <Typography variant="h5">Zmień hasło</Typography>

                    <TextField
                        id="actualPassword"
                        name="actualPassword"
                        type="password"
                        label="Aktualne Hasło"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                    />

                    <TextField
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        label="Nowe Hasło"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                    />
                    <TextField
                        id="newPasswordRepeat"
                        name="newPasswordRepeat"
                        type="password"
                        label="Powtórz nowe hasło"
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
                            onClick={showChangePasswordHandler}
                        >
                            Anuluj
                        </Button>
                    </ActionContainer>
                </form>
            )}
        </UserDataBox>
    );
}
