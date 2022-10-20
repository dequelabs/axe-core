var fs = require('fs');
var path = require('path');
var assert = require('assert');
var glob = require('glob');
var axe = require(path.join(__dirname, '../axe'));

var localeFiles = glob.sync(path.join(__dirname, '../locales/*.json'));

describe('locales', function () {
  localeFiles.forEach(function (localeFile) {
    var localeName = path.basename(localeFile);
    it(localeName + ' should be valid', function () {
      var localeData = fs.readFileSync(localeFile, 'utf-8');
      var locale = JSON.parse(localeData);
      function fn() {
        axe.configure({ locale: locale });
      }

      assert.doesNotThrow(fn);
    });
  });
});
