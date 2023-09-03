import { Box, Button, TextField, Typography, styled } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useFormik } from 'formik';
import { React, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { userDataValidationSchema } from '../../../components/Validation/validationSchemas';
import { useCustomSnackbar } from '../../../store/CustomSnackbarContext';

const UserDataBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    padding: '2rem',
    border: '1px solid black',
});
const UserActualData = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
});
const ActionContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: '1rem',
    gap: '2rem',
});

export default function ChangeUserData() {
    const { data } = useOutletContext();
    const customSnackbar = useCustomSnackbar();
    const queryClient = useQueryClient();
    const [showEditPersonal, setShowEditPersonal] = useState(false);

    const editUserPersonalData = useMutation({
        mutationFn: async () => {
            try {
                return await axios.put('/api/account/info/edit', {
                    ...formik.values,
                });
            } catch (error) {
                throw error;
            }
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['check']);
            customSnackbar.show('success', data.data.message);
        },
        onError: (error) => {
            customSnackbar.show('error', error.response.data);
        },
    });

    const showEditPersonalHandler = () => {
        setShowEditPersonal((prev) => !prev);
    };

    const formik = useFormik({
        initialValues: {
            firstName: data?.firstName || '',
            lastName: data?.lastName || '',

            phoneNumber: data?.phoneNumber || '',
        },
        validationSchema: userDataValidationSchema,
        onSubmit: editUserPersonalData.mutate,
    });

    return (
        <UserDataBox>
            {!showEditPersonal && (
                <>
                    <UserActualData>
                        <Typography variant="h5">Twoje dane:</Typography>
                        <Button
                            variant="contained"
                            onClick={showEditPersonalHandler}
                            type="button"
                        >
                            Edytuj
                        </Button>
                    </UserActualData>
                    <UserActualData
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                        }}
                    >
                        <Typography variant="h5">
                            Imię: {data?.firstName || ''}
                        </Typography>
                        <Typography variant="h5">
                            Nazwisko: {data?.lastName || ''}
                        </Typography>
                        <Typography variant="h5">
                            Numer Telefonu: {data?.phoneNumber || ''}
                        </Typography>
                    </UserActualData>
                </>
            )}

            {showEditPersonal && (
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <Typography variant="h5">Zmień dane osobowe</Typography>

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

                    <ActionContainer>
                        <Button type="submit" variant="contained">
                            Zapisz
                        </Button>

                        <Button
                            type="button"
                            variant="contained"
                            onClick={showEditPersonalHandler}
                        >
                            Anuluj
                        </Button>
                    </ActionContainer>
                </form>
            )}
        </UserDataBox>
    );
}
