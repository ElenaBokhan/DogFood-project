import {ETestId} from 'Enum';

export const cypressSignIn = () => {
    cy.visit('/signin');

    cy.get(`[data-testid=${ETestId.SIGN_FORM_EMAIL_INPUT}]`).type('e29953328@gmail.com');
    cy.get(`[data-testid=${ETestId.SIGN_FORM_PASSWORD_INPUT}]`).type('29953328');

    cy.get(`[data-testid=${ETestId.SIGN_FORM_SUBMIT_BUTTON}]`).click();
};

export const getProductNameId = () => Math.random() * 1e16;

export const addNewProduct = (productNameId: number) => {
    cy.get(`[data-testid=${ETestId.ADD_PRODUCT_NAME_INPUT}]`).should('exist').type(`Новый товар-${productNameId}`);
    cy.get(`[data-testid=${ETestId.ADD_PRODUCT_PRICE_INPUT}]`).should('exist').type('1000');
    cy.get(`[data-testid=${ETestId.ADD_PRODUCT_DESCRIPTION_INPUT}]`).should('exist').type('Текст описания');
    cy.get(`[data-testid=${ETestId.ADD_PRODUCT_DISCOUNT_INPUT}]`).should('exist').type('10');
    cy.get(`[data-testid=${ETestId.ADD_PRODUCT_STOCK_INPUT}]`).should('exist').type('10');
    cy.get(`[data-testid=${ETestId.ADD_PRODUCT_WIGHT_INPUT}]`).should('exist').type('100 г');
    cy.get(`[data-testid=${ETestId.ADD_PRODUCT_PICTURES_INPUT}]`)
        .should('exist')
        .type(
            'https://cdn.royalcanin-weshare-online.io/EyK7RWsBaxEApS7LGx6w/v3/14-uk-global-bhn-packshot-montage-breed-health-nutrition-colour'
        );
    cy.get(`[data-testid=${ETestId.ADD_PRODUCT_SUBMIT_BUTTON}]`).should('be.enabled').click();
};

export const findAndremoveAddedProduct = (productNameId: number) => {
    // находим через поиск созданный товар
    cy.get(`[data-testid=${ETestId.HEADER_SEARCH_INPUT}]`).type(`${productNameId}{enter}`);
    // проверка, что найденный товар верный
    cy.get(`[data-testid=${ETestId.PRODUCT_NAME}]`).contains(`${productNameId}`);
    // переход к детальной странице продукта
    cy.get(`[data-testid=${ETestId.PRODUCT_IMAGE}]`).click();
    // проверка, что удаление товара доступно
    cy.get(`[data-testid=${ETestId.PRODUCT_TRASH_BUTTON}]`).should('exist').click();
};
