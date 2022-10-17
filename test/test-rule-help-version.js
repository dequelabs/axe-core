var https = require('https');
var path = require('path');
var assert = require('assert');
var packageJSON = require(path.join(__dirname, '../package.json'));

var versions = packageJSON.version.split('.');
var version = versions[0] + '.' + versions[1];

it(
  'latest axe version (' + version + ') rule help docs should be active',
  function (done) {
    https.get(
      'https://dequeuniversity.com/rules/axe/' + version,
      function (res) {
        assert(res.statusCode >= 200 && res.statusCode <= 299);
        done();
      }
    );
  }
);
