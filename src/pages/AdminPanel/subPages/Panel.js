import { MonetizationOn, PeopleAlt } from '@mui/icons-material';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const PanelPaper = ({ children, ...props }) => (
    <Paper {...props} elevation={10}>
        {children}
    </Paper>
);

const PanelPaperText = ({ title }) => (
    <Typography variant="h4">{title}</Typography>
);

const PanelPaperBody = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

const PanelPaperIcon = styled('div')({
    '& svg': {
        fontSize: 80,
        opacity: 0.6,
    },
});

export default function Panel() {
    const orderCount = 10;
    const orderValue = 1500;
    const totalCustomers = 200;
    const averageOrderValue = orderValue / orderCount;

    return (
        <PanelPaperBody
            sx={{
                display: {
                    xs: 'flex',
                    flexDirection: 'column',
                    lg: 'grid',
                },
                gridTemplateColumns: 'repeat(3, 1fr)',
                justifyContent: 'center',
                textAlign: 'center',
                gap: 10,
                p: 5,
                '& > div': {
                    p: 3,
                    elevation: 15,
                },
            }}
        >
            <PanelPaper>
                <PanelPaperText title="Użytkownicy" />
                <PanelPaperBody>
                    <PanelPaperIcon>
                        <PeopleAlt />
                    </PanelPaperIcon>
                    <PanelPaperText title="3" />
                </PanelPaperBody>
            </PanelPaper>
            <PanelPaper>
                <PanelPaperText title="Zamówienia" />
                <PanelPaperBody>
                    <PanelPaperIcon>
                        <BarChartIcon />
                    </PanelPaperIcon>
                    <PanelPaperText title="2" />
                </PanelPaperBody>
            </PanelPaper>
            <PanelPaper>
                <PanelPaperText title="Wartość zamówień" />
                <PanelPaperBody>
                    <PanelPaperIcon>
                        <MonetizationOn />
                    </PanelPaperIcon>
                    <PanelPaperText
                        title={`${Number(orderValue).toLocaleString('en-EN', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })} zł`}
                    />
                </PanelPaperBody>
            </PanelPaper>
            <PanelPaper sx={{ gridColumn: 'span 3' }}>
                <PanelPaperText title="chart" />
                <PanelPaperBody></PanelPaperBody>
            </PanelPaper>
        </PanelPaperBody>
    );
}
