import '@testing-library/jest-dom';
import {setupTestsWrapper} from 'Utils/setupTestWrapper';
import {render, screen, fireEvent} from '@testing-library/react';
import {AddReview} from 'Pages/AddReview/AddReview';
import {Provider} from 'react-redux';
import store from 'Store/configureStore';
import {BrowserRouter, createMemoryRouter} from 'react-router-dom';
import * as ReactRouter from 'react-router';
import {ETestId} from 'Enum';
import {userEvent} from '@testing-library/user-event';

describe('Тесты для компонента AddReview', () => {
    let router: ReturnType<typeof createMemoryRouter> | undefined;
    let submitBtn: HTMLButtonElement | undefined;
    let textInput: HTMLInputElement | undefined;
    const name = 'productName';
    const productId = '123';

    beforeEach(() => {
        jest.spyOn(ReactRouter, 'useLocation').mockImplementation(() => ({
            state: {name, _id: productId},
            pathname: '',
            hash: '',
            key: '',
            search: '',
        }));
        router = setupTestsWrapper({initialRouterEntries: ['/addReview']});
        submitBtn = screen.getByTestId(ETestId.ADD_REVIEW_SUBMIT_BUTTON);
        textInput = screen.getByTestId(ETestId.ADD_REVIEW_TEXT_INPUT);
    });

    describe('Проверяем элементы компонента AddReview', () => {
        test('Проверяем что поле текстового сообщения и кнопка добавления отзыва доступны', async () => {
            expect(submitBtn).toBeEnabled();
            expect(textInput).toBeEnabled();
        });
        test('Проверяем что запрос не выполняется при незаполненных поле текстового сообщения и редиректа не происходит', async () => {
            expect(textInput).toHaveDisplayValue('');

            await userEvent.click(submitBtn);
            expect(router?.state.location.pathname).toEqual('/addReview');
        });

        test('Проверяем что запрос выполняется при заполненом поле текстового сообщения и происходит редирект на страницу товара', async () => {
            const message = 'Новое сообщение';

            await fireEvent.change(textInput, {target: {value: message}});

            expect(textInput).toHaveDisplayValue(message);

            await userEvent.click(submitBtn);
            expect(router?.state.location.pathname).toEqual(`/product/${productId}`);
        });
    });

    describe('Снапшот компонента AddReview', () => {
        test('Snapshot', () => {
            const {asFragment} = render(
                <Provider store={store}>
                    <BrowserRouter>
                        <AddReview />
                    </BrowserRouter>
                </Provider>
            );

            expect(asFragment()).toMatchSnapshot();
        });
    });
});
