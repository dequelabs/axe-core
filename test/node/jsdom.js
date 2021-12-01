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
  '</body>' +
  '</html>';

describe('jsdom axe-core', function() {
  it('should run without setting globals', function() {
    var dom = new jsdom.JSDOM(domStr);

    return axe
      .run(dom.window.document.documentElement, {
        rules: { 'color-contrast': { enabled: false } }
      })
      .then(function(results) {
        assert.notEqual(results.violations.length, 0);
      });
  });

  it('should unset globals so it can run with a new set of globals', function() {
    var dom = new jsdom.JSDOM(domStr);

    return axe
      .run(dom.window.document.documentElement, {
        rules: { 'color-contrast': { enabled: false } }
      })
      .then(function(results) {
        assert.notStrictEqual(results.violations.length, 0);

        var dom = new jsdom.JSDOM(domStr);

        return axe
          .run(dom.window.document.documentElement, {
            rules: { 'color-contrast': { enabled: false } }
          })
          .then(function(results) {
            assert.notStrictEqual(results.violations.length, 0);
          });
      });
  });

  describe('audit', function() {
    var audit = axe._audit;

    it('should have an empty allowedOrigins', function() {
      // JSDOM does not have window.location, so there is no default origin
      assert.strictEqual(audit.allowedOrigins.length, 0);
    });
  });
});
