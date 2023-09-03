import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';

const ProductImageContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '50%',
    height: '800px',
    padding: '0 1rem',
    gap: '1rem',
});

const ThumbnailsImagesContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '25%',
    height: '800px',
    overflow: 'auto',
    flexDirection: 'column',
    gap: '2rem',
    '&::-webkit-scrollbar': {
        width: '6px',
    },

    '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.primary.main,
        borderRadius: '3px',
        '&:hover': {
            backgroundColor: 'gray',
        },
    },
}));
const MainImageContainer = styled(Box)({
    width: '100%',
    height: '100%',
});
const ThumbnailImage = styled('img')({
    objectFit: 'cover',
    width: '100%',
    height: '150px',
    cursor: 'pointer',
});

const MainImage = styled('img')({
    objectFit: 'cover',
    width: '100%',
    height: '100%',
});

export default function ProductImage(props) {
    const [selectedImage, setSelectedImage] = useState(props.images[0]);

    const handleThumbnailClick = (image) => {
        setSelectedImage(image);
    };

    return (
        <ProductImageContainer>
            <ThumbnailsImagesContainer>
                {props.images.map((image, index) => (
                    <ThumbnailImage
                        key={index}
                        src={image}
                        alt={`Thumbnail ${index}`}
                        onClick={() => handleThumbnailClick(image)}
                    />
                ))}
            </ThumbnailsImagesContainer>
            <MainImageContainer>
                <MainImage src={selectedImage} alt="logo" />
            </MainImageContainer>
        </ProductImageContainer>
    );
}
