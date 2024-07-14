const ROOT_DIR = 'http://localhost:3000';

describe('template spec', () => {
  beforeEach(() => {
    cy.visit(ROOT_DIR);
  })

  it('.type() - type into a DOM element', () => {
    saveRecord();
  });
})

const saveRecord = () => {
  cy.get('#nameField').type('test');
  cy.get('#genderField').parent().click();
  cy.get('#maleOption').click();
  cy.get('#genderField').should('have.text', 'Male');
  cy.get('.css-nen11g-MuiStack-root > .MuiFormControl-root').clear().type('12/07/1995');
  cy.wait(150)
  cy.get('#sportsField').click({ force: true });
  cy.wait(150)
  cy.get('[data-value="Cricket"]').click();
  cy.wait(150)
  cy.get('[data-value="Basketball"]').click();
  cy.wait(150)
  cy.get('body').click();
  cy.wait(500)
  cy.get('#btnNext').click();
  cy.get('#descriptionField').type('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.');
  cy.get('#locationField').type('Karachi');
  cy.get('#teamField').type('A');
  cy.get('#interestField').type('Cricket');
  cy.get('#btnSubmit').click();
  cy.wait(500)
  cy.get('#descriptionField').clear().type('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.');
  cy.get('#btnSubmit').click();
  cy.get('#formSubmit').click();
}