/// <reference types="cypress" />

class SamplePage {
  
  firstNameInput: string;
  lastNameInput: string;
  jobTitleInput: string;
  radioButton: string;
  checkbox: string;
  dropdownOption: string;
  datepicker: string;
  submitButton: string;
  successMessage: string;

  constructor() {
    this.firstNameInput = '#first-name';
    this.lastNameInput = '#last-name';
    this.jobTitleInput = '#job-title';
    this.radioButton = '#radio-button-2';
    this.checkbox = '#checkbox-1';
    this.dropdownOption = 'option[value="1"]';
    this.datepicker = '#datepicker';
    this.submitButton = '.btn.btn-lg.btn-primary';
    this.successMessage = '.alert.alert-success';
  }

  fillForm(firstName, lastName, jobTitle, date) {
    cy.get(this.firstNameInput).type(firstName);
    cy.get(this.lastNameInput).type(lastName);
    cy.get(this.jobTitleInput).type(jobTitle);
    cy.get(this.radioButton).click();
    cy.get(this.checkbox).click();
    cy.get(this.datepicker).type(date);
  }

  submitForm() {
    cy.get(this.submitButton).click();
  }

  getSuccessMessage() {
    return cy.get(this.successMessage);
  }
}

export default SamplePage;