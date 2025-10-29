const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriverPath =
  process.env.CHROMEDRIVER_BIN ?? require('chromedriver').path;

const getWebdriver = () => {
  const service = new chrome.ServiceBuilder(chromedriverPath);

  const webdriver = new Builder()
    .setChromeOptions(new chrome.Options().addArguments('headless'))
    .forBrowser('chrome')
    .setChromeService(service);

  if (process.env.CHROME_BIN) {
    webdriver.setChromeBinaryPath(process.env.CHROME_BIN);
  }

  return webdriver.build();
};

module.exports.getWebdriver = getWebdriver;
