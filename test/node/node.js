// this file is purposefully written without mocha and in non-es6 syntax in order
// to be compatible with node 4+

var axe = require('../../');
var assert = require('assert');
var exec = require('child_process').exec;

var domStr =
  '<!DOCTYPE html>' +
  '<html lang="en">' +
  '<head>' +
  '<meta charset="UTF-8">' +
  '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
  '<title>Document</title>' +
  '</head>' +
  '<body>' +
  'Hello' +
  '<a id="hash-link" href="#main">Main</a>' +
  '<a id="skip" href="https://page.com#main">Skip Link</a>' +
  '</body>' +
  '</html>';

initJsdom(function (err, window) {
  assert.equal(err, null);

  axe.run(
    window.document.documentElement,
    {
      rules: { 'color-contrast': { enabled: false } }
    },
    function (axeError, results) {
      assert.equal(axeError, null);
      assert.notEqual(results.violations.length, 0);
    }
  );
});

function initJsdom(callback) {
  try {
    var nodeToJsdomMatrix = {
      4: '9.12.0', // last jsdom version that supported this node version
      6: '11.12.0',
      8: '15.2.1',
      10: '16.7.0',
      12: '19.0.0',
      14: '21.1.2',
      16: '22.1.0'
    };

    var majorNodeVersion = process.versions.node.split('.')[0];
    var jsdomVersion = nodeToJsdomMatrix[majorNodeVersion] || 'latest';

    exec('npm install jsdom@' + jsdomVersion, function (installError) {
      if (installError) {
        callback(installError);
      }

      var jsdom = require('jsdom');

      // jsdom 9
      if (jsdom.env) {
        jsdom.env(domStr, function (jsdomError, window) {
          if (jsdomError) {
            callback(jsdomError);
          }

          callback(null, window);
        });
      }
      // jsdom 11+
      else {
        var dom = new jsdom.JSDOM(domStr);
        callback(null, dom.window);
      }
    });
  } catch (err) {
    callback(err);
  }
}
