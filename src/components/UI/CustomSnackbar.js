import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomSnackbar = forwardRef((props, ref) => {
    const [showAlert, setShowAlert] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [alertMessage, setAlertMessage] = useState('');

    const show = (severity, message) => {
        setAlertSeverity(severity);
        setAlertMessage(message);
        setShowAlert(true);
    };

    const handleClose = () => {
        setShowAlert(false);
    };

    useImperativeHandle(ref, () => ({
        show,
    }));

    return (
        <Snackbar
            open={showAlert}
            onClose={handleClose}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert
                onClose={handleClose}
                severity={alertSeverity}
                sx={{ width: '30vw' }}
            >
                {alertMessage}
            </Alert>
        </Snackbar>
    );
});

export default CustomSnackbar;
