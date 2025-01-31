const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const config = require('../config/config');

async function createDriver() {
  const options = new chrome.Options();
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  
  if (process.env.CI) {
    options.addArguments('--headless');
  }

  const driver = await new Builder()
    .forBrowser(config.browser)
    .setChromeOptions(options)
    .build();

  await driver.manage().window().setRect({
    width: config.windowSize.width,
    height: config.windowSize.height
  });
  
  await driver.manage().setTimeouts({
    implicit: config.implicitTimeout
  });

  return driver;
}

module.exports = { createDriver };