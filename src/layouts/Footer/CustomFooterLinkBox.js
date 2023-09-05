import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { Link } from 'react-router-dom';
const FooterLinksContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
});
export default function CustomFooterLinkBox(props) {
    return (
        <FooterLinksContainer maxWidth="sm">
            <Typography variant="h6">{props.tittle}</Typography>
            {props.links.map(({ link, text }) => (
                <Typography
                    key={`${link}${text}`}
                    component={Link}
                    to={link}
                    variant="body2"
                    color="text.secondary"
                >
                    {text}
                </Typography>
            ))}
        </FooterLinksContainer>
    );
}
