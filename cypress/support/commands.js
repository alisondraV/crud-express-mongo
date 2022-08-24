// Cypress.Commands.add('createQuote', (name, quote) => {
// })
cy.createQuote = function (name, quote) {
    cy.get('[data-test=new-name]').type(`${name}`)
    cy.get('[data-test=new-quote]').type(`${quote}{enter}`)
}

cy.deleteAllQuotes = function () {
    cy.get('body').then((body) => {
        if (body.find('.delete-button').length > 0) {
            cy.get('.delete-button').each((button) => button.trigger('click'))
        }
    });
}