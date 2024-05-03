let fs = require('fs');
let path = require('path');
let assert = require('assert');
let glob = require('glob');
let axe = require(path.join(__dirname, '../axe'));

let localeFiles = glob.sync(path.join(__dirname, '../locales/*.json'));

describe('locales', function () {
  localeFiles.forEach(function (localeFile) {
    let localeName = path.basename(localeFile);
    it(localeName + ' should be valid', function () {
      let localeData = fs.readFileSync(localeFile, 'utf-8');
      let locale = JSON.parse(localeData);
      function fn() {
        axe.configure({ locale: locale });
      }

      assert.doesNotThrow(fn);
    });
  });
});
