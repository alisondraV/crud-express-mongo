describe('quotes CRUD operations', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('can add a new quote', () => {
    const name = 'Yoda'
    const quote = 'Feed the cat'

    cy.createQuote(name, quote);

    cy.get('li span').last().should('have.text', `${name}: ${quote}`)
  })

  it('can delete a quote', () => {
    const name = 'Luke'
    const quote = 'Go to the store'

    cy.createQuote(name, quote)
    cy.contains(`${name}: ${quote}`).siblings('.delete-button').click()

    cy.contains(`${name}: ${quote}`).should('not.exist')
  })
})
