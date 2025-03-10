describe('Página Inicial', () => {
  beforeEach(() => {
    cy.visit('/') 
  });

  it('deve exibir o título e a descrição do slogan', () => {
    cy.get('h1').should('contain', 'Fragrância e sabor elevado ao cubo');
    cy.get('p').should('contain', 'Explore nossa variedade de blends exclusivos e saboreie a perfeição em cada gole.');
  });
  
  it('deve exibir os produtos', () => {
    cy.get('a').should('have.length.greaterThan', 0).
    and('have.length.lessThan', 13);
  });
});