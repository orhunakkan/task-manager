import SamplePage from '../pages/samplePage';

describe('Formy Complete Web Form', () => {
  const samplePage = new SamplePage();

  it('Submit Webform and Validate', () => {
    cy.visit('https://formy-project.herokuapp.com/form');
    samplePage.fillForm('John', 'Doe', 'QA Engineer', '01/01/2022');
    samplePage.submitForm();
    samplePage.getSuccessMessage().should('contain', 'The form was successfully submitted!');
  });
});