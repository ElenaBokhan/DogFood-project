import {ETestId} from 'Enum';
import {addNewProduct, cypressSignIn, getProductNameId} from '../utils';

describe('Тест-кейс-2 домашнего задания', () => {
    it('Авторизация + установка лайка продукта', () => {
        cy.visit('/signin');

        // авторизация
        cypressSignIn();
        // поиск доступен после авторизации
        cy.get(`[data-testid=${ETestId.HEADER_SEARCH_INPUT}]`).should('exist');
        // выполняется логаут
        cy.get(`[data-testid=${ETestId.HEADER_LOG_OUT_ICON}]`).click();
        // авторизация
        cypressSignIn();
        // переход на страницу добавления товара
        cy.get(`[data-testid=${ETestId.HEADER_ADD_NEW_ICON}]`).click();
        // заполнение полей формы, содание нового продукта
        const productNameId = getProductNameId();
        addNewProduct(productNameId);
        // переход на страницу нового товара, проверка заголовка страницы
        cy.get(`[data-testid=${ETestId.TITLE_PAGE}]`).contains(productNameId);
        // переход к списку товаров
        cy.get(`[data-testid=${ETestId.BREADCRUMBS_BUTTON}]`).click();
        // находим через поиск созданный товар
        cy.get(`[data-testid=${ETestId.HEADER_SEARCH_INPUT}]`).type(`Новый товар-${productNameId}{enter}`);
        // проверка, что найденный товар верный
        cy.get(`[data-testid=${ETestId.PRODUCT_NAME}]`).contains(`Новый товар-${productNameId}`);
        // проверка, что товар не имеет лайка
        cy.get("img[alt='notLikedIcon']").should('exist');
        // установка лайка на товар
        cy.get(`[data-testid=${ETestId.PRODUCT_LIKE_BUTTON}]`).click();
        // проверка, что товар имеет лайк
        cy.get("img[alt='likedIcon']").should('exist');
    });
});
