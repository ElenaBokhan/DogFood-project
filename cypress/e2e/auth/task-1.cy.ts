import {ETestId} from 'Enum';
import {SIGN_FORM_SETTINGS} from 'Components/Forms/Helpers/consts';
import {cypressSignIn} from '../utils';

describe('Тест-кейс-1 домашнего задания', () => {
    describe('Проверяем действия неавторизованного пользоателя', () => {
        beforeEach(() => {
            cy.visit('/');
        });

        it('Логотип в хедере доступен', () => {
            cy.get('[data-testid=headerMainLogo]').should('exist');
        });

        it('Проверяем что ссылки на корзину, профиль, избранных товаров не доступны', () => {
            cy.get(`[data-testid=${ETestId.HEADER_CART_ICON}]`).should('not.exist');
            cy.get(`[data-testid=${ETestId.HEADER_FAVOURITES_ICON}]`).should('not.exist');
            cy.get(`[data-testid=${ETestId.HEADER_PROFILE_ICON}]`).should('not.exist');
        });
    });

    describe('Авторизация пользователя', () => {
        beforeEach(() => {
            cy.visit('/signin');
        });

        it('Проверка отправки пустой формы', () => {
            cy.get(`[data-testid=${ETestId.SIGN_FORM_EMAIL_INPUT}]`).should('have.value', '');

            cy.get(`[data-testid=${ETestId.SIGN_FORM_PASSWORD_INPUT}]`).should('have.value', '');

            cy.get(`[data-testid=${ETestId.SIGN_FORM_SUBMIT_BUTTON}]`)
                .should('be.enabled')
                .click()
                .should('be.disabled');

            cy.contains(SIGN_FORM_SETTINGS.ERROR_MESSAGES.EMAIL);
            cy.contains(SIGN_FORM_SETTINGS.ERROR_MESSAGES.PASSWORD.MIN);
        });

        it('Проверка авторизации', () => {
            cypressSignIn();

            cy.get(`[data-testid=${ETestId.HEADER_SEARCH_INPUT}]`).should('be.enabled');

            cy.get(`[data-testid=${ETestId.HEADER_CART_ICON}]`).should('exist');
            cy.get(`[data-testid=${ETestId.HEADER_FAVOURITES_ICON}]`).should('exist');
            cy.get(`[data-testid=${ETestId.HEADER_PROFILE_ICON}]`).should('exist');
        });
    });
});
