import './index.css';
import {Layout} from 'Components/Layout/Layout';
import {Catalog} from 'Pages/Catalog/Catalog';
import {Favourites} from 'Pages/Favourites/Favourites';
import {PageNotFound} from 'Pages/PageNotFound/PageNotFound';
import {ProductCard} from 'Pages/ProductCard/ProductCard';
import {Profile} from 'Pages/Profile/Profile';
import {Provider} from 'react-redux';
import {RouterProvider, createBrowserRouter, RouteObject} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import store from 'Store/configureStore';
import 'react-toastify/dist/ReactToastify.css';
import {SignUp} from 'Pages/SignUp/SignUp';
import {SignIn} from 'Pages/SignIn/SignIn';
import {Cart} from 'Pages/Cart/Cart';
import {AddReview} from 'Pages/AddReview/AddReview';
import {AddProduct} from 'Pages/AddProduct/AddProduct';

export const router: RouteObject[] = [
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
                path: '/addReview',
                element: <AddReview />,
            },
            {
                path: '/addProduct',
                element: <AddProduct />,
            },
            {
                path: '/signup',
                element: <SignUp />,
            },
            {
                path: '/signin',
                element: <SignIn />,
            },
            {
                path: '/cart',
                element: <Cart />,
            },
            {
                path: '*',
                element: <PageNotFound />,
            },
        ],
    },
];

const App = () => {
    return (
        <Provider store={store}>
            <RouterProvider router={createBrowserRouter(router)} />
            <ToastContainer autoClose={2000} position="top-right" theme="light" closeOnClick />
        </Provider>
    );
};

export default App;
