import { Box, Button, TextField, Typography, styled } from '@mui/material';
import { useFormik } from 'formik';
import { React, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { userDataValidationSchema } from '../../../components/Validation/validationSchemas';

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
    const { data, editUserPersonalData } = useOutletContext();

    const [showEditPersonal, setShowEditPersonal] = useState(false);

    const formik = useFormik({
        initialValues: {
            firstName: data?.firstName || '',
            lastName: data?.lastName || '',

            phoneNumber: data?.phoneNumber || '',
        },
        validationSchema: userDataValidationSchema,
        onSubmit: (values) => {
            onSave(values);
        },
    });
    const onSave = (values) => {
        editUserPersonalData.mutate(values);
    };

    const showEditPersonalHandler = () => {
        setShowEditPersonal((prev) => !prev);
    };

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
