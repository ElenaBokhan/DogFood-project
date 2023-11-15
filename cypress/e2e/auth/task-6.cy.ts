import {ETestId} from 'Enum';
import {addNewProduct, cypressSignIn, findAndremoveAddedProduct, getProductNameId} from '../utils';

describe('Тест-кейс-6 домашнего задания', () => {
    it('Авторизация + создание товара + удаление товара', () => {
        cy.visit('/signin');

        // авторизация
        cypressSignIn();
        // переход на страницу добавления товара
        cy.get(`[data-testid=${ETestId.HEADER_ADD_NEW_ICON}]`).click();
        // содание нового продукта
        const productNameId = getProductNameId();
        addNewProduct(productNameId);
        // переход на страницу нового товара, проверка заголовка страницы
        cy.get(`[data-testid=${ETestId.TITLE_PAGE}]`).contains(productNameId);
        // переход к списку товаров
        cy.get(`[data-testid=${ETestId.BREADCRUMBS_BUTTON}]`).click();
        // находим и удаляем созданный продукт
        findAndremoveAddedProduct(productNameId);
        // при поиске созданный товар отсутствет
        cy.get(`[data-testid=${ETestId.HEADER_SEARCH_INPUT}]`).type(`Новый товар-${productNameId}{enter}`);
        cy.get(`[data-testid=${ETestId.NOT_FOUND}]`).should('exist');
    });
});
