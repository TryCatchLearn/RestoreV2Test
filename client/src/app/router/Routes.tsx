import { createBrowserRouter } from "react-router-dom";
import AboutPage from "../../features/about/AboutPage";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import App from "../layout/App";
import CatalogPage from "../../features/catalog/CatalogPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: '/catalog', element: <CatalogPage /> },
            { path: '/catalog/:id', element: <ProductDetails /> },
            { path: '/about', element: <AboutPage /> },
            { path: '/contact', element: <ContactPage /> }
        ]
    },
])