import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { Link } from 'react-router-dom';

const ImageContainer = styled(Box)({
    position: 'relative',
    height: '300px',
    overflow: 'hidden',
    '& > :nth-of-type(1)': {
        transition: 'opacity 0.3s ease-in-out',
        '&:hover': {
            opacity: 0,
        },
    },

    '& > :nth-of-type(2)': {
        opacity: 0,
        transition: 'opacity 0.3s ease-in-out',
        '&:hover': {
            opacity: 1,
        },
    },
});
const Image = styled('img')(() => ({
    objectFit: 'cover',
    height: '100%',
    width: '100%',
    position: 'absolute',
}));

export default function ProductPreview(props) {
    const price = `${props.price.toFixed(2)} zł`;
    return (
        <>
            <Box
                sx={{
                    width: 300,
                }}
            >
                <Link to={`produkt/${props.id}`}>
                    <ImageContainer>
                        <Image alt="tyuh" src={props.images[0]} />
                        <Image alt="df" src={props.images[1]} />
                    </ImageContainer>
                    <Typography variant="h6" align="center">
                        {props.name.slice(0, 29)}
                    </Typography>
                    <Typography align="center" variant="h6">
                        {price}
                    </Typography>
                </Link>
            </Box>
        </>
    );
}
