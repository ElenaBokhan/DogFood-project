import {ETestId} from 'Enum';
import {addNewProduct, cypressSignIn, findAndremoveAddedProduct, getProductNameId} from '../utils';

describe('Тест-кейс-5 домашнего задания', () => {
    it('Пункт 5: Создать 6 товаров, добавить в избранное 3й и 6й, проверить наличие этих товаров в избранном ', () => {
        cy.visit('/signin');

        // авторизация
        cypressSignIn();

        // содание шести уникальных Id для названия новых продуктов
        const productNameIds = Array.from(Array(6), () => getProductNameId());

        productNameIds.forEach((id, i) => {
            // переход на страницу добавления товара
            cy.get(`[data-testid=${ETestId.HEADER_ADD_NEW_ICON}]`).click();
            addNewProduct(id);

            // переход на страницу нового товара, проверка заголовка страницы
            cy.get(`[data-testid=${ETestId.TITLE_PAGE}]`).contains(id);
            if (i === 2 || i === 5) {
                // добавление товара в избранные доступно
                cy.get(`[data-testid=${ETestId.ADD_TO_FAVOURITES}]`).click();
            }
        });

        // переход к списку избранных товаров
        cy.get(`[data-testid=${ETestId.HEADER_FAVOURITES_ICON}]`).click();
        // находим через поиск созданный товар
        cy.contains(productNameIds[2]);
        cy.contains(productNameIds[5]);

        // переход к списку товаров
        cy.get(`[data-testid=${ETestId.BREADCRUMBS_BUTTON}]`).click();

        // удаляем тестовые данные
        productNameIds.forEach((id) => {
            findAndremoveAddedProduct(id);
        });
    });
});
