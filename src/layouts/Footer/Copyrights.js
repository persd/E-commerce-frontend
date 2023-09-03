import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
const CopyrightText = styled(Typography)({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
});

export default function Copyrights() {
    return (
        <CopyrightText variant="caption" color="text.secondary">
            Copyright ©<Link href="#">Pers </Link>
            {new Date().getFullYear()}
        </CopyrightText>
    );
}
