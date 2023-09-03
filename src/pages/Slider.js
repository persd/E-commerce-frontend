import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { IconButton, styled } from '@mui/material';
import React, { useState } from 'react';
import { animated, useTransition } from 'react-spring';
import Image1 from './../assets/1.jpg';
import Image2 from './../assets/2.jpg';
import Image3 from './../assets/z3.jpg';
import Image4 from './../assets/z4.jpg';

export default function Slider() {
    const tabs = [Image1, Image2, Image3, Image4];
    const [activeImage, setActiveImage] = useState(0);

    const nextSlide = () => {
        setActiveImage((prevIndex) =>
            prevIndex === tabs.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setActiveImage((prevIndex) =>
            prevIndex === 0 ? tabs.length - 1 : prevIndex - 1
        );
    };

    const transitions = useTransition(activeImage, {
        from: { opacity: 0, transform: 'translateX(100%)' },
        enter: { opacity: 1, transform: 'translateX(0%)' },
        leave: { opacity: 0, transform: 'translateX(-100%)' },
    });

    const Image = styled(animated.img)`
        object-fit: cover;
        width: 100%;
        height: 100%;
        max-height: 400px;
    `;

    return (
        <div style={{ position: 'relative' }}>
            <div>
                {transitions(
                    (style, index) =>
                        index === activeImage && (
                            <Image
                                key={index}
                                src={tabs[index]}
                                alt="banner"
                                style={style}
                            />
                        )
                )}
            </div>
            <IconButton
                aria-label="Next"
                color="primary"
                size="large"
                onClick={nextSlide}
                style={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                }}
            >
                <ArrowForwardIos />
            </IconButton>
            <IconButton
                aria-label="Prev"
                color="primary"
                onClick={prevSlide}
                size="large"
                style={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                }}
            >
                <ArrowBackIos />
            </IconButton>
        </div>
    );
}
