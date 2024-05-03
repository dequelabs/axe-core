let https = require('https');
let path = require('path');
let assert = require('assert');
let packageJSON = require(path.join(__dirname, '../package.json'));

let versions = packageJSON.version.split('.');
let version = versions[0] + '.' + versions[1];

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
