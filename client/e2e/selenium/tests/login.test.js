import { describe, it, expect, beforeEach, afterEach } from 'vitest';
const { By, until } = require('selenium-webdriver');
const { createDriver } = require('../utils/driver');
const config = require('../config/config');

describe('Login Flow', () => {
  let driver;

  beforeEach(async () => {
    driver = await createDriver();
  });

  afterEach(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it('should successfully login with valid credentials', async () => {
    // Navigate to login page
    await driver.get(`${config.baseUrl}/login`);

    // Find and fill email input
    const emailInput = await driver.findElement(By.css('input[type="email"]'));
    await emailInput.sendKeys(config.testUser.email);

    // Find and fill password input
    const passwordInput = await driver.findElement(By.css('input[type="password"]'));
    await passwordInput.sendKeys(config.testUser.password);

    // Click login button
    const loginButton = await driver.findElement(By.css('button[type="submit"]'));
    await loginButton.click();

    // Wait for navigation to dashboard
    await driver.wait(until.urlContains('/dashboard'), config.explicitTimeout);
    
    // Verify we're on the dashboard
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toContain('/dashboard');
  });

  it('should show error with invalid credentials', async () => {
    await driver.get(`${config.baseUrl}/login`);

    const emailInput = await driver.findElement(By.css('input[type="email"]'));
    await emailInput.sendKeys('wrong@example.com');

    const passwordInput = await driver.findElement(By.css('input[type="password"]'));
    await passwordInput.sendKeys('wrongpassword');

    const loginButton = await driver.findElement(By.css('button[type="submit"]'));
    await loginButton.click();

    // Wait for error message
    const errorMessage = await driver.wait(
      until.elementLocated(By.css('.error-message')),
      config.explicitTimeout
    );
    
    const errorText = await errorMessage.getText();
    expect(errorText).to.include('Invalid credentials');
  });
});