import { Builder } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';
import { browser, windowSize, implicitTimeout } from '../config/config';

async function createDriver() {
  const options = new Options();
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  
  if (process.env.CI) {
    options.addArguments('--headless');
  }

  const driver = await new Builder()
    .forBrowser(browser)
    .setChromeOptions(options)
    .build();

  await driver.manage().window().setRect({
    width: windowSize.width,
    height: windowSize.height
  });
  
  await driver.manage().setTimeouts({
    implicit: implicitTimeout
  });

  return driver;
}

export default { createDriver };