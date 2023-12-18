// this file is purposefully written without mocha and in es5 syntax in order
// to be compatible with node 4+

var axe = require('../../');
var assert = require('assert');
var spawn = require('child_process').spawn;

var domStr = `<!doctype html>
<html lang="en" xml:lang="en">
  <head>
    <title>all rules test</title>
    <meta charset="utf8" />
    <meta http-equiv="refresh" content="foo" />
    <meta name="viewport" content="maximum-scale=2" />
    <link
      rel="stylesheet"
      type="text/css"
      href="/node_modules/mocha/mocha.css"
    />
    <script src="/node_modules/mocha/mocha.js"></script>
    <script src="/node_modules/chai/chai.js"></script>
    <script src="/axe.js"></script>
    <script>
      mocha.setup({
        timeout: 10000,
        ui: 'bdd'
      });
      var assert = chai.assert;
    </script>
  </head>
  <body>
    <div>
      <a href="#fail1-tgt" style="position: absolute; margin: -10000px"
        >bad link 1</a
      >
      <banner></banner>
      <main>
        <div accesskey="B" id="__proto__"></div>
        <map>
          <area href="#" id="pass1" alt="monkeys" />
        </map>
        <div aria-label="foo" id="constructor">Foo</div>
        <div role="contentinfo"></div>
        <div role="link">Home</div>
        <div role="dialog" aria-label="Cookies"></div>
        <p aria-hidden="true">Some text</p>
        <div role="spinbutton" aria-label="foo"></div>
        <div role="meter" title="foo"></div>
        <div role="progressbar" title="foo"></div>
        <div role="list">
          <div role="listitem">Item 1</div>
        </div>
        <button aria-roledescription="my button">button</button>
        <div role="text">Some text<span> and some more text</span></div>
        <div role="checkbox">Newspaper</div>
        <div role="tooltip">Copy this content</div>
        <div role="tree">
          <div role="treeitem">Item</div>
        </div>
        <audio id="caption"><track kind="captions" /></audio>
        <input autocomplete="username" id="toString" />
        <p id="fail1" style="line-height: 1.5 !important">Banana error</p>
        <p><blink>text</blink></p>
        <button id="text">Name</button>
        <dl>
          <dt>foo</dt>
          <dd>bar</dd>
        </dl>
        <div id="foo"></div>
        <h1>Ok</h1>
        <h2>Ok</h2>
        <table>
          <tr>
            <th scope="col">Ok</th>
          </tr>
        </table>

        <img src="img.jpg" alt="" aria-braillelabel="image" />
        <video><track kind="captions" /></video>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          width="100"
          height="100"
        >
          <title>I am a circle</title>
          <circle cx="50" cy="50" r="40" fill="yellow"></circle>
        </svg>
        <div lang="en">English</div>
        <object
          title="This object has text"
          data="data:text/html,Object%20content"
        ></object>
        <li role="presentation" aria-label="My Heading">Hello</li>
        <div role="img" aria-label="blah"></div>
        <div style="overflow-y: scroll; height: 5px">
          <input type="text" />
        </div>
        <select aria-label="foo"></select>
        <img ismap src="image.jpg" />
        <p tabindex="-1">Paragraph.</p>
        <input type="button" />
        <input type="image" src="img.jpg" />
        <marquee>This content is inside a marquee.</marquee>
        <div role="navigation">
          <div role="banner"></div>
          <div role="complementary"></div>
        </div>
        <span id="fail1" class="fail1"></span>
        <button id="fail1"></button>
        <span id="pass1"></span>
        <button id="pass2"></button>
        <div aria-labelledby="fail1 pass1 pass2"></div>
        <audio
          id="incomplete1"
          src="/test/assets/moon-speech.mp3"
          autoplay="true"
        ></audio>
      </main>
      <footer></footer>

      <iframe
        id="focusable-iframe"
        title="foo"
        src="frames/focusable.html"
      ></iframe>
      <iframe
        id="focusable-iframe"
        title="bar"
        src="frames/focusable.html"
        tabindex="-1"
      ></iframe>

      <p>Paragraph with a <a href="#">link</a>.</p>
      <ul>
        <li>Hello</li>
        <li>World</li>
      </ul>

      <div style="height: 100vh">Large scroll area</div>
      <button id="end-of-page">End of page</button>
    </div>
    <div id="mocha"></div>
    <script src="/test/integration/no-ui-reporter.js"></script>
    <script src="/test/testutils.js"></script>
    <script src="all-rules.js"></script>
    <script src="/test/integration/adapter.js"></script>
  </body>
</html>
`;

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
      16: '22.1.0'
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
