import { createBrowserRouter, Navigate } from "react-router-dom";
import AboutPage from "../../features/about/AboutPage";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import App from "../layout/App";
import CatalogPage from "../../features/catalog/CatalogPage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import LoginForm from "../../features/account/LoginForm";
import RegisterForm from "../../features/account/RegisterForm";
import RequireAuth from "./RequireAuth";
import CheckoutSuccess from "../../features/checkout/CheckoutSuccess";
import OrdersPage from "../../features/orders/OrdersPage";
import OrderDetailed from "../../features/orders/OrderDetailed";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {element: <RequireAuth />, children: [
                { path: 'checkout', element: <CheckoutPage /> },
                { path: 'checkout/success', element: <CheckoutSuccess /> },
                { path: 'orders', element: <OrdersPage /> },
                { path: 'orders/:id', element: <OrderDetailed /> },
            ]},
            { path: '', element: <HomePage /> },
            { path: 'catalog', element: <CatalogPage /> },
            { path: 'catalog/:id', element: <ProductDetails /> },
            { path: 'about', element: <AboutPage /> },
            { path: 'contact', element: <ContactPage /> },
            { path: 'server-error', element: <ServerError /> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'basket', element: <BasketPage /> },
            { path: 'login', element: <LoginForm /> },
            { path: 'register', element: <RegisterForm /> },
            { path: '*', element: <Navigate replace to='/not-found' /> },
        ]
    },
])