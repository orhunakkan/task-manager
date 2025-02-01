class SamplePage {
  
  constructor(driver) {
    this.driver = driver;
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

  async fillForm(firstName, lastName, jobTitle, date) {
    await this.driver.findElement({ css: this.firstNameInput }).sendKeys(firstName);
    await this.driver.findElement({ css: this.lastNameInput }).sendKeys(lastName);
    await this.driver.findElement({ css: this.jobTitleInput }).sendKeys(jobTitle);
    await this.driver.findElement({ css: this.radioButton }).click();
    await this.driver.findElement({ css: this.checkbox }).click();
    await this.driver.findElement({ css: this.datepicker }).sendKeys(date);
  }

  async submitForm() {
    await this.driver.findElement({ css: this.submitButton }).click();
  }

  async getSuccessMessage() {
    return await this.driver.findElement({ css: this.successMessage }).getText();
  }
}

export default SamplePage;