// this file is purposefully written without mocha and in es5 syntax in order
// to be compatible with node 4+

var axe = require('../../');
var assert = require('assert');
var spawn = require('child_process').spawn;
var fs = require('fs');
var path = require('path');

initJsdom(function (err, window) {
  assert.equal(err, null);

  console.log('running axe');
  axe.run(
    window.document.documentElement,
    {
      preload: false,
      rules: { 'color-contrast': { enabled: false } }
    },
    function (axeError, results) {
      assert.equal(axeError, null);
      assert.notEqual(results.violations.length, 0);
      console.log('axe ran successfully');
    }
  );
});

/**
 * Install a version of jsdom that is compatible with the currently running node
 * version and return the jsdom window object.
 * @param {Function} callback - callback function when jsdom is installed.
 * Is passed any error object and the jsdom window object.
 */
function initJsdom(callback) {
  try {
    var nodeToJsdomMatrix = {
      4: '9.12.0', // last jsdom version that supported this node version
      6: '11.12.0',
      8: '15.2.1',
      10: '16.7.0',
      12: '19.0.0',
      14: '21.1.2',
      16: '22.1.0',
      18: '26.1.0'
    };

    var majorNodeVersion = process.versions.node.split('.')[0];
    var jsdomVersion = nodeToJsdomMatrix[majorNodeVersion] || 'latest';

    console.log('node version detected as: v' + majorNodeVersion);
    console.log('installing jsdom@' + jsdomVersion);
    var child = spawn(
      'npm',
      ['install', 'jsdom@' + jsdomVersion, '--no-save'],
      {
        cwd: __dirname
      }
    );
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
      var domStr = fs.readFileSync(
        path.join('test', 'integration', 'full', 'all-rules', 'all-rules.html'),
        'utf8'
      );

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
