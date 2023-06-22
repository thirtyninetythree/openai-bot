import React from 'react';
import { Alert, Snackbar }  from '@mui/material';

const Notifications = ({ open, setOpen, error, severity }) => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    return (
        <>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} variant="outlined">
                    {error}
                </Alert>
            </Snackbar>
        </>
    )
}

export default Notifications
