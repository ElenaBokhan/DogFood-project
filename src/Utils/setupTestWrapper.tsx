import {router} from 'App';
import {render} from '@testing-library/react';
import {Provider} from 'react-redux';
import {createMemoryRouter, RouterProvider} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import store from 'Store/configureStore';

interface WrapperForTestsParams {
    initialRouterEntries: string[];
}

export const setupTestsWrapper = ({initialRouterEntries}: WrapperForTestsParams) => {
    const memoryRouter = createMemoryRouter(router, {
        initialEntries: initialRouterEntries,
    });
    render(
        <Provider store={store}>
            <RouterProvider router={memoryRouter} />
            <ToastContainer autoClose={2000} position="top-right" theme="light" closeOnClick />
        </Provider>
    );

    return memoryRouter;
};
