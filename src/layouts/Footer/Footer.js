import { Container, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import Copyrights from './Copyrights';
import CustomFooterLinkBox from './CustomFooterLinkBox';
const FooterContainer = styled(Container)({
    display: 'flex',
    justifyContent: 'center',
    gap: '10rem',
});

export default function Footer(props) {
    return (
        <footer onClick={props.onHideCart}>
            <Divider />
            <FooterContainer maxWidth="xl">
                <CustomFooterLinkBox
                    tittle="Moje konto"
                    links={[
                        { link: '/register', text: 'Rejestracja' },
                        { link: '/login', text: 'Login' },
                        { link: '/account/info', text: 'Dane konta' },
                        { link: '/account/orders', text: 'Zamowienia' },
                    ]}
                />
                <CustomFooterLinkBox
                    tittle="O nas"
                    links={[
                        { link: '/dummy-info', text: 'O firime' },
                        {
                            link: '/dummy-info',
                            text: 'Polityka prywatności',
                        },
                        {
                            link: '/dummy-info',
                            text: 'Najczęściej zadawane pytania',
                        },
                    ]}
                />
                <CustomFooterLinkBox
                    tittle="Pomoc"
                    links={[
                        { link: '/dummy-info', text: 'Kontakt' },
                        { link: '/dummy-info', text: 'Regulamin' },
                        { link: '/dummy-info', text: 'Zwroty' },
                    ]}
                />
                <CustomFooterLinkBox
                    tittle="Dostawa"
                    links={[{ link: '/dummy-info', text: 'Koszty dostawy' }]}
                />
            </FooterContainer>
            <Copyrights />
        </footer>
    );
}
