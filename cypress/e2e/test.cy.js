/// <reference types="cypress" />

describe('Joonaksen testi', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('find cs go', () => {
    cy.get('th').should('contain.text', 'Counter-Strike: Global Offensive');
  });

  it('search feature', () => {
    cy.get('input#filled-search').type("Counter{enter}");
    cy.get('table').find('tr').find('th')
      .should('contain.text', 'Counter-Strike Nexon: Studio');
  });

});