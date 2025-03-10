describe('Página do Produto', () => {
  const productId = '1';

  beforeEach(() => {
    cy.visit(`/product/${productId}`)
  });

  it('deve exibir os detalhes do produto', () => {
    cy.get('h1').should('be.visible');
    cy.get('h2').should('be.visible'); 
    cy.get('img').should('be.visible');

  });

  it('deve permitir adicionar o produto ao carrinho', () => {
    cy.get('textarea').type('Sem açúcar'); 
    cy.get('button') 
      .contains('Comprar')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Produto adicionado ao carrinho com sucesso!'); 
    });
  });
});