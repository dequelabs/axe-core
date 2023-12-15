// this file is purposefully written without mocha and in es5 syntax in order
// to be compatible with node 4+

var axe = require('../../');
var assert = require('assert');
var spawn = require('child_process').spawn;

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

  console.log('running axe');
  axe.run(
    window.document.documentElement,
    {
      rules: { 'color-contrast': { enabled: false } }
    },
    function (axeError, results) {
      assert.equal(axeError, null);
      assert.notEqual(results.violations.length, 0);
      console.log('axe ran successfully');
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

    console.log('node version detected as: v' + majorNodeVersion);
    console.log('installing jsdom v' + jsdomVersion);
    var child = spawn('npm', ['install', 'jsdom@' + jsdomVersion], {
      cwd: __dirname
    });
    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    child.stdout.on('data', function (data) {
      console.log(data);
    });
    child.stderr.on('data', function (data) {
      console.error(data);
    });
    child.on('close', function () {
      console.log('installed');
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

    // exec('npm install jsdom@' + jsdomVersion, function (installError) {
  } catch (err) {
    callback(err);
  }
}
