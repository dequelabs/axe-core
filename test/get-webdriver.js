const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver =
  process.env.CHROMEDRIVER_BIN ?? require('chromedriver').path;

const getWebdriver = () => {
  const service = new chrome.ServiceBuilder(chromedriver);

  const webdriver = new Builder()
    .setChromeOptions(new chrome.Options().addArguments('--headless=new'))
    .forBrowser('chrome')
    .setChromeService(service);

  if (process.env.CHROME_BIN) {
    webdriver.setBinaryPath(process.env.CHROME_BIN);
  }

  return webdriver.build();
};

module.exports.getWebdriver = getWebdriver;
