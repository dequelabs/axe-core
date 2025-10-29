const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver =
  process.env.CHROMEDRIVER_BIN ?? require('chromedriver').path;

const getWebdriver = () => {
  const service = new chrome.ServiceBuilder(chromedriver);

  const options = new chrome.Options().addArguments('--headless=new');

  if (process.env.CHROME_BIN) {
    options.setBinaryPath(process.env.CHROME_BIN);
  }

  const webdriver = new Builder()
    .setChromeOptions(options)
    .forBrowser('chrome')
    .setChromeService(service);

  return webdriver.build();
};

module.exports.getWebdriver = getWebdriver;
