import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { styled } from '@mui/material';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { animated } from 'react-spring';
import Image1 from '../../assets/1.jpg';
import Image2 from '../../assets/2.jpg';
import Image3 from '../../assets/z3.jpg';
import Image4 from '../../assets/z4.jpg';
export default function Slider() {
    const images = [Image1, Image2, Image3, Image4];

    const Image = styled(animated.img)`
        object-fit: cover;
        width: 100%;
        height: 100%;
    `;

    return (
        <Carousel
            NextIcon={<NavigateNextIcon />}
            PrevIcon={<NavigateBeforeRoundedIcon />}
            fullHeightHover
            height="400px"
            sx={{ width: '100%' }}
            animation="slide"
            indicators={false}
            swipe={false}
        >
            {images.map((img, index) => (
                <Image key={index} src={img} alt="asd" />
            ))}
        </Carousel>
    );
}
