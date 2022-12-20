var axe = require('../../');
var jsdom = require('jsdom');
var assert = require('assert');

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

describe('jsdom axe-core', function () {
  it('should run without setting globals', function () {
    var dom = new jsdom.JSDOM(domStr);

    return axe
      .run(dom.window.document.documentElement, {
        rules: { 'color-contrast': { enabled: false } }
      })
      .then(function (results) {
        assert.notEqual(results.violations.length, 0);
      });
  });

  it('should unset globals so it can run with a new set of globals', function () {
    var dom = new jsdom.JSDOM(domStr);

    return axe
      .run(dom.window.document.documentElement, {
        rules: { 'color-contrast': { enabled: false } }
      })
      .then(function (results) {
        assert.notStrictEqual(results.violations.length, 0);

        var dom = new jsdom.JSDOM(domStr);

        return axe
          .run(dom.window.document.documentElement, {
            rules: { 'color-contrast': { enabled: false } }
          })
          .then(function (results) {
            assert.notStrictEqual(results.violations.length, 0);
          });
      });
  });

  describe('audit', function () {
    var audit = axe._audit;

    it('should have an empty allowedOrigins', function () {
      // JSDOM does not have window.location, so there is no default origin
      assert.strictEqual(audit.allowedOrigins.length, 0);
    });
  });

  describe('isCurrentPageLink', function () {
    // because axe only sets the window global when calling axe.run,
    // we'll have to create a custom rule that calls
    // isCurrentPageLink to gain access to the middle of a run with
    // the proper window object
    afterEach(function () {
      axe.teardown();
    });

    it('should return true if url starts with #', function () {
      var dom = new jsdom.JSDOM(domStr);
      var anchor = dom.window.document.getElementById('hash-link');

      axe.configure({
        checks: [
          {
            id: 'check-current-page-link',
            evaluate: function () {
              return axe.commons.dom.isCurrentPageLink(anchor) === true;
            }
          }
        ],
        rules: [
          {
            id: 'check-current-page-link',
            any: ['check-current-page-link']
          }
        ]
      });

      return axe
        .run(dom.window.document.documentElement, {
          runOnly: ['check-current-page-link']
        })
        .then(function (results) {
          assert.strictEqual(results.passes.length, 1);
        });
    });

    it('should return null for absolute link when url is not set', function () {
      var dom = new jsdom.JSDOM(domStr);
      var anchor = dom.window.document.getElementById('skip');

      axe.configure({
        checks: [
          {
            id: 'check-current-page-link',
            evaluate: function () {
              return axe.commons.dom.isCurrentPageLink(anchor) === null;
            }
          }
        ],
        rules: [
          {
            id: 'check-current-page-link',
            any: ['check-current-page-link']
          }
        ]
      });

      return axe
        .run(dom.window.document.documentElement, {
          runOnly: ['check-current-page-link']
        })
        .then(function (results) {
          assert.strictEqual(results.passes.length, 1);
        });
    });

    it('should return true for absolute link when url is set', function () {
      var dom = new jsdom.JSDOM(domStr, { url: 'https://page.com' });
      var anchor = dom.window.document.getElementById('skip');

      axe.configure({
        checks: [
          {
            id: 'check-current-page-link',
            evaluate: function () {
              return axe.commons.dom.isCurrentPageLink(anchor) === true;
            }
          }
        ],
        rules: [
          {
            id: 'check-current-page-link',
            any: ['check-current-page-link']
          }
        ]
      });

      return axe
        .run(dom.window.document.documentElement, {
          runOnly: ['check-current-page-link']
        })
        .then(function (results) {
          assert.strictEqual(results.passes.length, 1);
        });
    });
  });
});
