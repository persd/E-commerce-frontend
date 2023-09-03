import { Button } from '@mui/material';
import React from 'react';

export default function CustomButton(props) {
    return (
        <Button
            variant={props.variant}
            color={props.color}
            component={props.component}
            to={props.to}
            sx={props.sx}
            size={props.size}
            fullWidth={props.fullWidth}
            disabled={props.disabled}
            onClick={props.onClick}
        >
            {props.value}
        </Button>
    );
}
