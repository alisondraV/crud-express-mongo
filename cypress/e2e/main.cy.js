describe('quotes CRUD operations', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  afterEach(() => {
    cy.deleteAllQuotes()
  })

  it('can add a new quote', () => {
    const name = 'Yoda'
    const quote = 'Feed the cat'

    cy.createQuote(name, quote)

    cy.get('li span').last().should('have.text', `${name}: ${quote}`)
  })

  it('can delete a quote', () => {
    const name = 'Luke'
    const quote = 'Go to the store'
    cy.createQuote(name, quote)

    cy.contains(`${name}: ${quote}`).siblings('[data-test=delete-button]').click()

    cy.contains(`${name}: ${quote}`).should('not.exist')
  })

  it('can update a quote', () => {
    const name = 'Vehikl Dev'
    const oldQuote = 'Fix the tests'
    const updatedQuote = 'The tests have been fixed'
    cy.createQuote(name, oldQuote)

    cy.contains(`${name}: ${oldQuote}`).siblings('[data-test=update-button]').click()
    cy.get('[data-test=update-quote]').clear().type(`${updatedQuote}`)
    cy.get('[data-test=save-update]').click()

    cy.contains(`${name}: ${oldQuote}`).should('not.exist')
    cy.contains(`${name}: ${updatedQuote}`).should('exist')
  })
})
