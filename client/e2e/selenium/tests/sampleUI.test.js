import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { By } from 'selenium-webdriver';
import driverUtil from '../utils/driver.js';
import { baseUrl } from '../selenium.config.js';

describe('UI Tests for Homepage', () => {
  let driver;

  beforeAll(async () => {
    driver = await driverUtil.createDriver();
    await driver.get(baseUrl);
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it('should load home page and display correct elements', async () => {
    await driver.get(baseUrl);
    const homePage = await driver.findElement(By.css('[data-testid="home-page"]'));
    const homeTitle = await driver.findElement(By.css('[data-testid="home-title"]'));
    const homeDescription = await driver.findElement(By.css('[data-testid="home-description"]'));
    expect(await homePage.isDisplayed()).toBe(true);
    expect(await homeTitle.getText()).toContain('Welcome to Task Manager');
    expect(await homeDescription.getText()).toContain('Manage your tasks efficiently');
  });
});
