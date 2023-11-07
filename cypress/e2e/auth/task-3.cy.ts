import {ETestId} from 'Enum';
import {SIGN_FORM_SETTINGS} from 'Components/Forms/Helpers/consts';
import {cypressSignIn} from '../utils';

describe('Тест-кейс-3 домашнего задания', () => {
    it('Авторизация + выход', () => {
        cy.visit('/signin');

        // негативный сценарий авторизации
        cy.get(`[data-testid=${ETestId.SIGN_FORM_EMAIL_INPUT}]`).type('someEmail');
        cy.get(`[data-testid=${ETestId.SIGN_FORM_PASSWORD_INPUT}]`).type('12345');
        cy.get(`[data-testid=${ETestId.SIGN_FORM_SUBMIT_BUTTON}]`).should('be.enabled').click().should('be.disabled');

        cy.contains(SIGN_FORM_SETTINGS.ERROR_MESSAGES.EMAIL);
        cy.contains(SIGN_FORM_SETTINGS.ERROR_MESSAGES.PASSWORD.MIN);

        // позитивный сценарий авторизации
        cypressSignIn();
        // поиск доступен после авторизации и только на странице списка товаров
        cy.get(`[data-testid=${ETestId.HEADER_SEARCH_INPUT}]`).should('exist');
        // выполняется логаут
        cy.get(`[data-testid=${ETestId.HEADER_LOG_OUT_ICON}]`).click();
        // переход к форме авторизации. Проверка доступности полей авторизации
        cy.get(`[data-testid=${ETestId.SIGN_FORM_EMAIL_INPUT}]`).should('exist');
        cy.get(`[data-testid=${ETestId.SIGN_FORM_PASSWORD_INPUT}]`).should('exist');
    });
});
