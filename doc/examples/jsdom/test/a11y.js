/* global describe, it */
const axe = require('axe-core');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const assert = require('assert');

describe('axe', () => {
  const { document } = new JSDOM(`<!DOCTYPE html>
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
  </html>`).window;
  const config = {
    rules: {
      'color-contrast': { enabled: false }
    }
  };

  it('reports that good HTML is good', async () => {
    const node = document.getElementById('working');
    const result = await axe.run(node, config);
    assert.equal(result.violations.length, 0, 'Violations is not empty');
  });

  it('reports that bad HTML is bad', async () => {
    const node = document.getElementById('broken');
    const results = await axe.run(node, config);
    assert.equal(results.violations.length, 1, 'Violations.length is not 1');
  });

  it('allows commons after axe.setup() is called', () => {
    axe.setup(document);
    const input = document.querySelector('input');
    const role = axe.commons.aria.getRole(input);
    assert.equal(role, 'textbox');
    axe.teardown();
  });
});
