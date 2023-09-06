import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout';
import ProductPage from './layouts/Main/ProductPage/ProductPage';
import Account from './pages/Account/Account';
import UserData from './pages/Account/UserData/UserData';
import UserOrders from './pages/Account/UserOrders/UserOrders';
import AdminPanel from './pages/AdminPanel/AdminPanel';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SearchProducts from './pages/SearchProducts/SearchProducts';

import Orders from './pages/Account/UserOrders/UserOrders';
import Panel from './pages/AdminPanel/Panel/Panel';
import ShopInfo from './pages/AdminPanel/Panel/ShopInfo';
import Products from './pages/AdminPanel/Produckts/Products';
import Users from './pages/AdminPanel/Users/Users';
import { CustomSnackbarProvider } from './store/CustomSnackbarContext';
import { UserContextProvider } from './store/UserContext';
const queryClient = new QueryClient();
export default function App() {
    axios.defaults.baseURL = 'http://localhost:5000';
    axios.defaults.withCredentials = true;

    const router = createBrowserRouter([
        {
            element: <Layout />,
            children: [
                {
                    path: '/',
                    element: <Home />,
                },
                {
                    path: 'search',
                    element: <SearchProducts />,
                },
                {
                    path: 'account',
                    element: <Account />,
                    children: [
                        {
                            path: 'info',
                            element: <UserData />,
                        },
                        {
                            path: 'orders',
                            element: <UserOrders />,
                        },
                    ],
                },
                { path: 'product/:id', element: <ProductPage /> },
                { path: 'dummy-info', element: <ShopInfo /> },
            ],
        },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Login /> },

        {
            element: <AdminPanel />,
            path: 'admin',
            children: [
                {
                    path: '',
                    element: <Panel />,
                },
                {
                    path: 'users',
                    element: <Users />,
                },
                {
                    path: 'products',
                    element: <Products />,
                },
                {
                    path: 'orders',
                    element: <Orders />,
                },
            ],
        },
    ]);
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <CustomSnackbarProvider>
                <UserContextProvider>
                    <RouterProvider router={router} />
                </UserContextProvider>
            </CustomSnackbarProvider>
        </QueryClientProvider>
    );
}
