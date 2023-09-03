import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import React from 'react';
import img2 from '../assets/1.jpg';
import img4 from '../assets/3.png';
import img3 from '../assets/4.png';
import Product from '../components/Product/ProductPreview';
import Slider from './Slider';

const GridContainer = styled(Grid)({
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: '5rem',
});
export default function Home() {
    return (
        <>
            <GridContainer container>
                <Slider />

                <GridContainer container mb={20} item>
                    <Product
                        id={23}
                        images={[img2, img4, img3]}
                        name="Kurtka przeciwdeszczowa"
                        price={23.42}
                    />
                </GridContainer>
            </GridContainer>
        </>
    );
}
