import { MonetizationOn, PeopleAlt } from '@mui/icons-material';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/UI/Loader';

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
    const navigate = useNavigate();
    const { data, isLoading } = useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            return await axios.get(`/api/account/info/stats`);
        },
        onError: () => {
            navigate('/');
        },
        retry: false,
    });
    const stats = data?.data || '';
    if (isLoading) return <Loader />;
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
                    <PanelPaperText title={stats.usersAmount} />
                </PanelPaperBody>
            </PanelPaper>
            <PanelPaper>
                <PanelPaperText title="Zamówienia" />
                <PanelPaperBody>
                    <PanelPaperIcon>
                        <BarChartIcon />
                    </PanelPaperIcon>
                    <PanelPaperText title={stats.ordersAmount} />
                </PanelPaperBody>
            </PanelPaper>
            <PanelPaper>
                <PanelPaperText title="Wartość zamówień" />
                <PanelPaperBody>
                    <PanelPaperIcon>
                        <MonetizationOn />
                    </PanelPaperIcon>
                    <PanelPaperText
                        title={`${Number(stats.totalOrdersValue).toLocaleString(
                            'en-EN',
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }
                        )} zł`}
                    />
                </PanelPaperBody>
            </PanelPaper>
        </PanelPaperBody>
    );
}
