import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import Item from './components/Item';
import SearchBar from './components/NavBar/SearchBar';
import Layout from './layouts/Layout';
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
export default function App() {
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
                { path: 'product-name', element: <Item /> },
            ],
        },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Login /> },
        { path: 'search', element: <SearchBar /> },
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
    return <RouterProvider router={router} />;
}
