import '@testing-library/jest-dom';
import {setupTestsWrapper} from 'Utils/setupTestWrapper';
import {render, screen} from '@testing-library/react';
import {ETestId} from 'Enum';
import {Footer} from 'Components/Footer/Footer';
import {Provider} from 'react-redux';
import store from 'Store/configureStore';

describe('Тесты для компонента Footer', () => {
    beforeEach(() => {
        setupTestsWrapper({initialRouterEntries: ['/']});
    });

    describe('Проверяем доступность элементов', () => {
        test('Проверяем доступность логотипа', () => {
            expect(screen.getByTestId(ETestId.FOOTER_MAIN_LOGO)).toBeInTheDocument();
        });

        test('Проверяем доступность меню', () => {
            expect(screen.getAllByTestId(ETestId.FOOTER_MENU)[0]).toBeInTheDocument();
        });

        test('Проверяем доступность блока с контактами', () => {
            expect(screen.getByTestId(ETestId.FOOTER_CONTACTS)).toBeInTheDocument();
        });
    });

    describe('Снапшот футера', () => {
        test('Snapshot', () => {
            const {asFragment} = render(
                <Provider store={store}>
                    <Footer />
                </Provider>
            );

            expect(asFragment()).toMatchSnapshot();
        });
    });
});
