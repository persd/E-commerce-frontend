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
                        { link: '/rejestracja', text: 'Rejestracja' },
                        { link: '/konto', text: 'Dane konta' },
                        { link: '/zamowienia', text: 'Zamowienia' },
                    ]}
                />
                <CustomFooterLinkBox
                    tittle="O nas"
                    links={[
                        { link: '/o-nas', text: 'O firime' },
                        {
                            link: '/polityka-prywatnosci',
                            text: 'Polityka prywatności',
                        },
                        {
                            link: '/pytania',
                            text: 'Najczęściej zadawane pytania',
                        },
                    ]}
                />
                <CustomFooterLinkBox
                    tittle="Pomoc"
                    links={[
                        { link: '/kontakt', text: 'Kontakt' },
                        { link: '/regulamin', text: 'Regulamin' },
                        { link: '/zwroty', text: 'Zwroty' },
                    ]}
                />
                <CustomFooterLinkBox
                    tittle="Dostawa"
                    links={[
                        { link: '/koszty-dostawy', text: 'Koszty dostawy' },
                    ]}
                />
            </FooterContainer>
            <Copyrights />
        </footer>
    );
}
