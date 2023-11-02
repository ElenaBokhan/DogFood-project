import '@testing-library/jest-dom';
import {setupTestsWrapper} from 'Utils/setupTestWrapper';
import {render, screen} from '@testing-library/react';
import * as Selectors from 'Store/Slices/auth/AuthSelectors';
import {ETestId} from 'Enum';
import store from 'Store/configureStore';
import {Provider} from 'react-redux';
import {Header} from 'Components/Header/Header';
import {BrowserRouter} from 'react-router-dom';

describe('Тесты для компонента Header', () => {
    beforeEach(() => {
        setupTestsWrapper({initialRouterEntries: ['/']});
    });

    describe('Проверяем доступность элементов под неавторизованным пользователем', () => {
        checkHeaderMainLogoIsAvailable();
        checkHeaderProfilesIconAvailable(false);
        checkHeaderSearchInputAvailable(false);
    });

    describe('Проверяем доступность ссылок под авторизованным пользователем', () => {
        beforeEach(() => {
            jest.spyOn(Selectors, 'accessTokenSelector').mockImplementation(() => 'token');
        });

        checkHeaderMainLogoIsAvailable();
        checkHeaderProfilesIconAvailable(true);
        checkHeaderSearchInputAvailable(true);
    });

    describe('Снапшот компонента Header', () => {
        test('Snapshot', () => {
            const {asFragment} = render(
                <Provider store={store}>
                    <BrowserRouter basename="/">
                        <Header />
                    </BrowserRouter>
                </Provider>
            );

            expect(asFragment()).toMatchSnapshot();
        });
    });
});

function checkHeaderMainLogoIsAvailable() {
    test('Проверяем доступность логотипа', () => {
        expect(screen.getByTestId(ETestId.HEADER_MAIN_LOGO)).toBeInTheDocument();
    });
}

function checkHeaderProfilesIconAvailable(enable: boolean) {
    if (enable) {
        test('Проверяем доступность иконок профиля', () => {
            expect(screen.getByTestId(ETestId.HEADER_FAVOURITES_ICON)).toBeInTheDocument();
            expect(screen.getByTestId(ETestId.HEADER_CART_ICON)).toBeInTheDocument();
            expect(screen.getByTestId(ETestId.HEADER_PROFILE_ICON)).toBeInTheDocument();
            expect(screen.getByTestId(ETestId.HEADER_LOG_OUT_ICON)).toBeInTheDocument();
        });
    } else {
        test('Проверяем не доступность иконок профиля', () => {
            expect(screen.queryByTestId(ETestId.HEADER_FAVOURITES_ICON)).not.toBeInTheDocument();
            expect(screen.queryByTestId(ETestId.HEADER_CART_ICON)).not.toBeInTheDocument();
            expect(screen.queryByTestId(ETestId.HEADER_PROFILE_ICON)).not.toBeInTheDocument();
            expect(screen.queryByTestId(ETestId.HEADER_LOG_OUT_ICON)).not.toBeInTheDocument();
        });
    }
}

function checkHeaderSearchInputAvailable(enable: boolean) {
    if (enable) {
        test('Проверяем доступность компонента поиска', () => {
            expect(screen.getByTestId(ETestId.HEADER_SEARCH_INPUT)).toBeInTheDocument();
        });
    } else {
        test('Проверяем не доступность компонента поиска', () => {
            expect(screen.queryByTestId(ETestId.HEADER_SEARCH_INPUT)).not.toBeInTheDocument();
        });
    }
}
