import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import { Builder } from 'selenium-webdriver';
import SamplePage from '../pages/samplePage';
import { browser } from '../config/config';

describe('Formy Complete Web Form', () => {
  let driver;
  let samplePage;

  beforeAll(async () => {
    driver = await new Builder().forBrowser(browser).build();
    samplePage = new SamplePage(driver);
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('Submit Webform and Validate', async () => {
    await driver.get('https://formy-project.herokuapp.com/form');
    await samplePage.fillForm('John', 'Doe', 'QA Engineer', '01/01/2022');
    await samplePage.submitForm();
    const successMessage = await samplePage.getSuccessMessage();
    expect(successMessage).toContain('The form was successfully submitted!');
  });
});