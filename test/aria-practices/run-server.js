const net = require('net');
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const getWebdriver = () => {
  const webdriver = new Builder()
    .setChromeOptions(new chrome.Options().headless())
    .forBrowser('chrome')
    .build();
  return webdriver;
};

const connectToChromeDriver = (port) => {
  let socket;
  return new Promise((resolve, reject) => {
    // Give up after 1s
    const timer = setTimeout(() => {
      socket.destroy();
      reject(new Error('Unable to connect to ChromeDriver'));
    }, 1000);

    const connectionListener = () => {
      clearTimeout(timer);
      socket.destroy();
      return resolve();
    };

    socket = net.createConnection(
      { host: 'localhost', port },
      connectionListener
    );

    // Fail on error
    socket.once('error', (err) => {
      clearTimeout(timer);
      socket.destroy();
      return reject(err);
    });
  });
};

module.exports.getWebdriver = getWebdriver
module.exports.connectToChromeDriver = connectToChromeDriver
