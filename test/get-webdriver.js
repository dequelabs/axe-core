const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriverPath =
  process.env.CHROMEDRIVER_BIN ?? require('chromedriver').path;

const getWebdriver = () => {
  const service = new chrome.ServiceBuilder(chromedriverPath);
  const options = new chrome.Options().addArguments('--headless');

  if (process.env.CHROME_BIN) {
    options.setBinaryPath(process.env.CHROME_BIN);
  }

  return new Builder()
    .setChromeOptions(options)
    .forBrowser('chrome')
    .setChromeService(service)
    .build();
};

module.exports.getWebdriver = getWebdriver;
