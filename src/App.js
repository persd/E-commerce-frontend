import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import SearchBar from './components/NavBar/SearchBar';
import Layout from './layouts/Layout';
import ProductPage from './layouts/Main/ProductPage/ProductPage';
import Account from './pages/Account/Account';
import UserData from './pages/Account/UserData/UserData';
import UserOrders from './pages/Account/UserOrders/UserOrders';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import Orders from './pages/AdminPanel/subPages/Orders';
import Panel from './pages/AdminPanel/subPages/Panel';
import Products from './pages/AdminPanel/subPages/Products';
import Users from './pages/AdminPanel/subPages/Users';
import Home from './pages/Home';
import Kids from './pages/Kids';
import Login from './pages/Login/Login';
import Man from './pages/Man';
import Woman from './pages/Woman';
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
                    errorElement: <ErrorPage />,
                },
                {
                    path: 'kobieta',
                    element: <Woman />,
                },
                {
                    path: 'mezczyzna',
                    element: <Man />,
                },
                {
                    path: 'dzieci',
                    element: <Kids />,
                },
                {
                    path: 'account',
                    element: <Account />,
                    children: [
                        {
                            path: 'info',
                            element: <UserData />,
                            errorElement: <ErrorPage />,
                        },
                        {
                            path: 'orders',
                            element: <UserOrders />,
                            errorElement: <ErrorPage />,
                        },
                    ],
                },
                { path: 'product/:id', element: <ProductPage /> },
            ],
        },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Login /> },
        { path: 'szukaj', element: <SearchBar /> },
        {
            element: <AdminPanel />,
            path: 'admin',
            children: [
                {
                    path: 'panel',
                    element: <Panel />,
                    errorElement: <ErrorPage />,
                },
                {
                    path: 'uzytkownicy',
                    element: <Users />,
                    errorElement: <ErrorPage />,
                },
                {
                    path: 'produkty',
                    element: <Products />,
                    errorElement: <ErrorPage />,
                },
                {
                    path: 'zamowienia',
                    element: <Orders />,
                    errorElement: <ErrorPage />,
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
