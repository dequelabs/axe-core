let path = require('path');
let assert = require('chai').assert;
let glob = require('glob');
let axe = require('../axe');

let files = glob.sync(path.join(__dirname, 'integration/virtual-rules/*.js'));

before(function () {
  global.axe = axe;
  global.assert = assert;
});

after(function () {
  delete global.axe;
  delete global.assert;
});

describe('virtual-rule node tests', function () {
  files.forEach(function (file) {
    // load the test file and run with global axe and assert now defined
    require(file);
  });
});
