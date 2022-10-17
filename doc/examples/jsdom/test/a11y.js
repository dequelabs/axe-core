/* global describe, it */
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const assert = require('assert');

describe('axe', () => {
  const { window } = new JSDOM(`<!DOCTYPE html>
  <html lang="en">
    <head>
      <title>JSDOM Example</title>
    </head>
    <body>
      <div id="working">
        <label for="has-label">Label for this text field.</label>
        <input type="text" id="has-label">
      </div>
      <div id="broken">
        <p>Not a label</p><input type="text" id="no-label">
      </div>
    </body>
  </html>`);

  const axe = require('axe-core');
  const config = {
    rules: {
      'color-contrast': { enabled: false }
    }
  };

  it('should report that good HTML is good', function (done) {
    var n = window.document.getElementById('working');
    axe.run(n, config, function (err, result) {
      assert.equal(err, null, 'Error is not null');
      assert.equal(result.violations.length, 0, 'Violations is not empty');
      done();
    });
  });

  it('should report that bad HTML is bad', function (done) {
    var n = window.document.getElementById('broken');
    axe.run(n, config, function (err, result) {
      assert.equal(err, null, 'Error is not null');
      assert.equal(result.violations.length, 1, 'Violations.length is not 1');
      done();
    });
  });
});
