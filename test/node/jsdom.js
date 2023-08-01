const axe = require('../../');
const jsdom = require('jsdom');
const assert = require('assert');

const domStr =
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

describe('jsdom axe-core', () => {
  it('should run without setting globals', () => {
    const dom = new jsdom.JSDOM(domStr);

    return axe
      .run(dom.window.document.documentElement, {
        rules: { 'color-contrast': { enabled: false } }
      })
      .then(function (results) {
        assert.notEqual(results.violations.length, 0);
      });
  });

  it('should unset globals so it can run with a new set of globals', () => {
    let dom = new jsdom.JSDOM(domStr);

    return axe
      .run(dom.window.document.documentElement, {
        rules: { 'color-contrast': { enabled: false } }
      })
      .then(function (results) {
        assert.notStrictEqual(results.violations.length, 0);

        dom = new jsdom.JSDOM(domStr);

        return axe
          .run(dom.window.document.documentElement, {
            rules: { 'color-contrast': { enabled: false } }
          })
          .then(function (res) {
            assert.notStrictEqual(res.violations.length, 0);
          });
      });
  });

  describe('audit', () => {
    const audit = axe._audit;

    it('should have an empty allowedOrigins', () => {
      // JSDOM does not have window.location, so there is no default origin
      assert.strictEqual(audit.allowedOrigins.length, 0);
    });
  });

  describe('isCurrentPageLink', () => {
    // because axe only sets the window global when calling axe.run,
    // we'll have to create a custom rule that calls
    // isCurrentPageLink to gain access to the middle of a run with
    // the proper window object
    afterEach(() => {
      axe.teardown();
    });

    it('should return true if url starts with #', () => {
      const dom = new jsdom.JSDOM(domStr);
      const anchor = dom.window.document.getElementById('hash-link');

      axe.configure({
        checks: [
          {
            id: 'check-current-page-link',
            evaluate: () => {
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

    it('should return null for absolute link when url is not set', () => {
      const dom = new jsdom.JSDOM(domStr);
      const anchor = dom.window.document.getElementById('skip');

      axe.configure({
        checks: [
          {
            id: 'check-current-page-link',
            evaluate: () => {
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

    it('should return true for absolute link when url is set', () => {
      const dom = new jsdom.JSDOM(domStr, { url: 'https://page.com' });
      const anchor = dom.window.document.getElementById('skip');

      axe.configure({
        checks: [
          {
            id: 'check-current-page-link',
            evaluate: () => {
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

  describe('axe.setup()', () => {
    afterEach(() => {
      axe.teardown();
    });

    it('sets up the tree', function () {
      const { document } = new jsdom.JSDOM(domStr).window;
      const tree = axe.setup(document.body);
      assert.equal(tree, axe._tree[0]);
      assert.equal(tree.actualNode, document.body);
    });

    it('can use commons after axe.setup()', () => {
      const { document } = new jsdom.JSDOM(domStr).window;
      axe.setup(document);

      const skipLink = document.querySelector('#skip');
      assert.equal(axe.commons.aria.getRole(skipLink), 'link');
      assert.equal(axe.commons.text.accessibleText(skipLink), 'Skip Link');
    });

    it('is cleaned up with axe.teardown()', () => {
      const { document } = new jsdom.JSDOM(domStr).window;
      axe.setup(document);
      axe.teardown();
      const skipLink = document.querySelector('#skip');

      assert.throws(() => {
        assert.equal(axe.commons.aria.getRole(skipLink), 'link');
      });
    });
  });
});
