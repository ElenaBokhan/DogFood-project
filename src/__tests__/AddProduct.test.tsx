import '@testing-library/jest-dom';
import {setupTestsWrapper} from 'Utils/setupTestWrapper';
import {fireEvent, render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import store from 'Store/configureStore';
import {BrowserRouter, createMemoryRouter} from 'react-router-dom';
import {ETestId} from 'Enum';
import {userEvent} from '@testing-library/user-event';
import {AddProduct} from 'Pages/AddProduct/AddProduct';

describe('Тесты для компонента addProduct', () => {
    let router: ReturnType<typeof createMemoryRouter> | undefined;
    let submitBtn: HTMLButtonElement | undefined;
    let nameInput: HTMLInputElement | undefined;
    let priceInput: HTMLInputElement | undefined;
    let descriptionInput: HTMLInputElement | undefined;
    let discountInput: HTMLInputElement | undefined;
    let stockInput: HTMLInputElement | undefined;
    let wightInput: HTMLInputElement | undefined;
    let picturesInput: HTMLInputElement | undefined;
    let allInputs: HTMLInputElement[] | undefined;

    beforeEach(() => {
        router = setupTestsWrapper({initialRouterEntries: ['/addProduct']});
        submitBtn = screen.getByTestId(ETestId.ADD_PRODUCT_SUBMIT_BUTTON);
        nameInput = screen.getByTestId(ETestId.ADD_PRODUCT_NAME_INPUT);
        priceInput = screen.getByTestId(ETestId.ADD_PRODUCT_PRICE_INPUT);
        descriptionInput = screen.getByTestId(ETestId.ADD_PRODUCT_DESCRIPTION_INPUT);
        discountInput = screen.getByTestId(ETestId.ADD_PRODUCT_DISCOUNT_INPUT);
        stockInput = screen.getByTestId(ETestId.ADD_PRODUCT_STOCK_INPUT);
        wightInput = screen.getByTestId(ETestId.ADD_PRODUCT_WIGHT_INPUT);
        picturesInput = screen.getByTestId(ETestId.ADD_PRODUCT_PICTURES_INPUT);
        allInputs = [nameInput, priceInput, descriptionInput, discountInput, stockInput, wightInput, picturesInput];
    });

    describe('Проверяем доступность элементов компонента AddProduct', () => {
        test('Проверяем что все поля доступны', () => {
            checkInputsEnabled(allInputs);
        });

        test('Проверяем что кнопка добавления продукта доступна', () => {
            expect(submitBtn).toBeEnabled();
        });
    });

    describe('Проверяем работу компонента AddProduct при заполненных и незаполлненных полях', () => {
        test('Проверяем что запрос не выполняется при незаполненных полях и редиректа не происходит', async () => {
            checkInputsHasEmptyValue(allInputs);

            await userEvent.click(submitBtn);
            expect(router?.state.location.pathname).toEqual('/addProduct');
        });

        test('Проверяем что поля заполняются верно', async () => {
            const stringInputValue = 'Значение';
            const numberInputValue = 123;

            const stringInputs = [nameInput, descriptionInput, picturesInput, wightInput];
            const numberInputs = [priceInput, stockInput, discountInput];

            fillInputsWithValue(stringInputs, stringInputValue);
            fillInputsWithValue(numberInputs, numberInputValue);

            checkFillInputsValue(stringInputs, stringInputValue);
            checkFillInputsValue(numberInputs, numberInputValue);
        });
    });

    describe('Снапшот компонента AddProduct', () => {
        test('Snapshot', () => {
            const {asFragment} = render(
                <Provider store={store}>
                    <BrowserRouter>
                        <AddProduct />
                    </BrowserRouter>
                </Provider>
            );

            expect(asFragment()).toMatchSnapshot();
        });
    });
});

function checkInputsEnabled(allInputs: HTMLInputElement[]) {
    allInputs.forEach((input) => {
        expect(input).toBeEnabled();
    });
}

function checkInputsHasEmptyValue(allInputs: HTMLInputElement[]) {
    allInputs.forEach((input) => {
        expect(input).toHaveDisplayValue('');
    });
}

async function fillInputsWithValue(allInputs: HTMLInputElement[], value: string | number) {
    allInputs.forEach(async (input) => {
        await fireEvent.change(input, {target: {value}});
    });
}

function checkFillInputsValue(allInputs: HTMLInputElement[], value: string | number) {
    allInputs.forEach(async (input) => {
        expect(input).toHaveDisplayValue(value.toString());
    });
}
