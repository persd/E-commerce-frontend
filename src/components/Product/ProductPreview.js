import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { Link } from 'react-router-dom';

const ImageContainer = styled(Box)({
    height: '300px',
    overflow: 'hidden',
});
const Image = styled('img')(() => ({
    objectFit: 'cover',
    height: '100%',
    width: '100%',
}));

export default function ProductPreview(props) {
    const price = `${props.price.toFixed(2)} zł`;
    return (
        <>
            <Box>
                <Link to={`/product/${props.id}`}>
                    <ImageContainer>
                        <Image alt="tyuh" src={props.image} />
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
