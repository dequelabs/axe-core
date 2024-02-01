const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriverPath = require('chromedriver').path;

const getWebdriver = () => {
  const service = new chrome.ServiceBuilder(chromedriverPath);

  const webdriver = new Builder()
    .setChromeOptions(new chrome.Options().addArguments('headless'))
    .forBrowser('chrome')
    .setChromeService(service)
    .build();
  return webdriver;
};

module.exports.getWebdriver = getWebdriver;
