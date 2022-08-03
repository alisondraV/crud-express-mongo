// Cypress.Commands.add('createQuote', (name, quote) => {
// })
cy.createQuote = function (name, quote) {
    cy.get('[data-test=new-name]').type(`${name}`)
    cy.get('[data-test=new-quote]').type(`${quote}{enter}`)
}