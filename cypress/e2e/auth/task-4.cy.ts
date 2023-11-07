import {ETestId} from 'Enum';
import {cypressSignIn} from '../utils';

describe('Тест-кейс-4 домашнего задания', () => {
    it('Авторизация + установка лайка 3му и 6му товару в списке', () => {
        cy.visit('/signin');

        // авторизация
        cypressSignIn();
        // редирект на страницу списка товаров
        cy.get(`[data-testid=${ETestId.HEADER_SEARCH_INPUT}]`).should('exist');

        const selector = '[class^="product-list"] [class^="product-item"]';

        cy.get(selector).each(($item, i) => {
            if (i === 2 || i === 5) {
                // находим элемент, отображающий состояние лайка продукта
                const notLikedIcon = $item.get(0).querySelector("img[alt='notLikedIcon']");
                // если еще не проставлен то устанавливаем
                if (notLikedIcon) {
                    cy.get(`[data-testid=${ETestId.PRODUCT_LIKE_BUTTON}]`).eq(i).click();
                    // проверка что лайк установлен
                    cy.get("img[alt='likedIcon']").eq(i).should('exist');
                }
            }
        });

        cy.get(selector).each((_, i) => {
            if (i === 2 || i === 5) {
                cy.get(`[data-testid=${ETestId.PRODUCT_LIKE_BUTTON}]`).eq(i).click();
                // проверка что лайк снят с товара
                cy.get("img[alt='notLikedIcon']").eq(i).should('exist');
            }
        });
    });
});
