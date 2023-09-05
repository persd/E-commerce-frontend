import { Box, Button, TextField, Typography, styled } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { userDataValidationSchema } from '../../../components/Validation/validationSchemas';
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
    const { data, editUserPersonalData } = useOutletContext();

    const [showEditEmail, setShowEditEmail] = useState(false);
    const showEditEmailHandler = () => {
        setShowEditEmail((prev) => !prev);
    };
    const formik = useFormik({
        initialValues: {
            email: data?.email || '',
        },
        validationSchema: userDataValidationSchema,
        onSubmit: (values) => {
            onSave(values);
        },
    });
    const onSave = (values) => {
        editUserPersonalData.mutate(values);
    };

    return (
        <UserDataBox>
            <UserAcutalData>
                <Typography variant="h5">Twój adres email:</Typography>
                <Typography variant="h5">{data?.email}</Typography>
                {!showEditEmail && (
                    <Button variant="contained" onClick={showEditEmailHandler}>
                        Edytuj
                    </Button>
                )}
            </UserAcutalData>
            {showEditEmail && (
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <Typography variant="h5">Zmień adres e-mail</Typography>

                    <TextField
                        id="email"
                        name="email"
                        type="email"
                        label="Nowy adres email"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.email &&
                            Boolean(!!formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
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
