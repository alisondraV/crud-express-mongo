describe('quotes CRUD operations', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('can add a new quote', () => {
    const name = 'Yoda'
    const quote = 'Feed the cat'

    cy.get('[data-test=new-name]').type(`${name}`)
    cy.get('[data-test=new-quote]').type(`${quote}{enter}`)

    cy.get('li span').last().should('have.text', `${name}: ${quote}`)
  })
})
