import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
    styled,
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { passwordValidationSchema } from '../../../components/Validation/validationSchemas';

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
    const { editUserPersonalData } = useOutletContext();
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showActualPassword, setShowActualPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            actualPassword: '',
            newPassword: '',
        },
        validationSchema: passwordValidationSchema,
        onSubmit: (values) => {
            onSave(values);
        },
    });
    const onSave = (values) => {
        editUserPersonalData.mutate(values);
    };
    const handleActualPasswordVisibility = () => {
        setShowActualPassword(!showActualPassword);
    };
    const handleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };
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
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <Typography variant="h5">Zmień hasło</Typography>

                    <TextField
                        id="actualPassword"
                        name="actualPassword"
                        type={showActualPassword ? 'text' : 'password'}
                        label="Aktualne Hasło"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={formik.values.actualPassword}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.actualPassword &&
                            Boolean(!!formik.errors.actualPassword)
                        }
                        helperText={
                            formik.touched.actualPassword &&
                            formik.errors.actualPassword
                        }
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleActualPasswordVisibility}
                                        edge="end"
                                    >
                                        {showActualPassword ? (
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
                        id="newPassword"
                        name="newPassword"
                        type={showNewPassword ? 'text' : 'password'}
                        label="Nowe Hasło"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={formik.values.newPassword}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.newPassword &&
                            Boolean(!!formik.errors.newPassword)
                        }
                        helperText={
                            formik.touched.newPassword &&
                            formik.errors.newPassword
                        }
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleNewPasswordVisibility}
                                        edge="end"
                                    >
                                        {showNewPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
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
