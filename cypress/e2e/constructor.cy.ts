import { selectors } from 'cypress/support/selectors';

describe('Constructor Burger', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/auth/user', {
      fixture: 'login.json'
    }).as('getUser');

    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    window.localStorage.setItem('refreshToken', 'refreshTokenMock');
    cy.setCookie('accessToken', 'accessTokenMock');

    cy.visit('/');
    cy.wait('@getUser');
    cy.wait('@getIngredients');

    cy.get(selectors.ingredient)
      .should('exist')
      .should('have.length', 15)
      .as('ingredients');
    cy.get('@ingredients').first().should('exist').as('bun');
    cy.get('@bun').find('button').should('exist').as('bunAddBtn');
    cy.get('@ingredients').last().should('exist').as('sauce');
    cy.get('@sauce').find('button').should('exist').as('sauceAddBtn');
    cy.get('@ingredients').eq(2).should('exist').as('filling');
    cy.get('@filling').find('button').should('exist').as('fillingAddBtn');
  });
  afterEach(() => {
    window.localStorage.removeItem('refreshToken');
    cy.clearCookie('accessToken');
  });
  it('добавление ингредиента в конструктор', () => {
    cy.contains(selectors.bun).should('be.visible');
    cy.contains(selectors.main).should('be.visible');

    cy.get('@bunAddBtn').click();
    cy.contains(selectors.bun).should('not.exist');
    cy.get('@bun')
      .find('p')
      .eq(2)
      .invoke('text')
      .then((text) => {
        cy.get(selectors.constructorElement).should('have.length', 2);
        cy.get(selectors.constructorElement).should(
          'contain.text',
          text.trim()
        );
      });

    cy.get('@fillingAddBtn').click();
    cy.contains(selectors.bun).should('not.exist');
    cy.get('@bun')
      .find('p')
      .eq(2)
      .invoke('text')
      .then((text) => {
        cy.get(selectors.constructorElement).should('have.length', 3);
        cy.get(selectors.constructorElement).should(
          'contain.text',
          text.trim()
        );
      });

    cy.get('@sauceAddBtn').click();
    cy.contains(selectors.bun).should('not.exist');
    cy.get('@bun')
      .find('p')
      .eq(2)
      .invoke('text')
      .then((text) => {
        cy.get(selectors.constructorElement).should('have.length', 4);
        cy.get(selectors.constructorElement).should(
          'contain.text',
          text.trim()
        );
      });
  });
  it('закрытие по клику на крестик', () => {
    cy.get('@ingredients').first().click();
    cy.get(selectors.modal).should('exist');
    cy.get(selectors.modalClose).click();
    cy.get(selectors.modal).should('not.exist');
  });
  it('закрытие по клику на оверлей ', () => {
    cy.get('@ingredients').first().click();
    cy.get(selectors.overlay).should('exist');
    cy.get(selectors.overlay).click({ force: true });
    cy.get(selectors.modal).should('not.exist');
  });
  it('Создание заказа', () => {
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );
    cy.get('@bunAddBtn').click();
    cy.get('@fillingAddBtn').click();
    cy.get('@sauceAddBtn').click();
    cy.get(selectors.constructorElement).should('have.length', 4);
    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');
    cy.get(selectors.modal).should('exist');
    cy.fixture('order.json').then((res) => {
      cy.get(selectors.numberOrder)
        .should('exist')
        .and('have.text', res.order.number.toString());
    });
    cy.get(selectors.modalClose).click();
    cy.get(selectors.modal).should('not.exist');
    cy.contains(selectors.bun).should('be.visible');
    cy.contains(selectors.main).should('be.visible');
    cy.get(selectors.constructorElement).should('have.length', 0);
  });
});
