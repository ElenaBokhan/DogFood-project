import './index.css';
import {Layout, loaderLayout} from 'Components/Layout/Layout';
import {Catalog} from 'Pages/Catalog/Catalog';
import {Favourites} from 'Pages/Favourites/Favourites';
import {PageNotFound} from 'Pages/PageNotFound/PageNotFound';
import {ProductCard, loaderProduct} from 'Pages/ProductCard/ProductCard';
import {Profile, loaderProfile} from 'Pages/Profile/Profile';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        loader: loaderLayout,
        errorElement: <PageNotFound />, // TODO: добавить errorBoundary, пока заглушка
        children: [
            {
                path: '/',
                element: <Catalog />,
            },
            {
                path: '/favourites',
                element: <Favourites />,
            },
            {
                path: '/product/:productId',
                element: <ProductCard />,
                loader: loaderProduct,
            },
            {
                path: '/profile',
                element: <Profile />,
                loader: loaderProfile,
            },
            {
                path: '*',
                element: <PageNotFound />,
            },
        ],
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
