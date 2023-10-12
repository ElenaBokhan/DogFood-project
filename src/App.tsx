import './index.css';
import {Layout} from 'Components/Layout/Layout';
import {Catalog} from 'Pages/Catalog/Catalog';
import {Favourites} from 'Pages/Favourites/Favourites';
import {PageNotFound} from 'Pages/PageNotFound/PageNotFound';
import {ProductCard} from 'Pages/ProductCard/ProductCard';
import {Profile} from 'Pages/Profile/Profile';
import {Provider} from 'react-redux';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import store from 'Store/configureStore';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
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
            },
            {
                path: '/profile',
                element: <Profile />,
            },
            {
                path: '*',
                element: <PageNotFound />,
            },
        ],
    },
]);

const App = () => {
    return (
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    );
};

export default App;
