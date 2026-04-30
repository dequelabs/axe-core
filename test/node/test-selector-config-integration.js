const axe = require('../../');
const jsdom = require('jsdom');
const { assert } = require('chai');

describe('axe.run selector configuration integration', function () {
  'use strict';
  let dom;
  let window;
  let document;

  beforeEach(() => {
    dom = new jsdom.JSDOM(
      '<!DOCTYPE html><html><body>' +
        '<div id="random-id" class="random-class" data-test="test-val">Hello</div>' +
        '<div>Other</div>' +
        '</body></html>',
      { url: 'http://localhost' }
    );
    window = dom.window;
    document = window.document;

    // Set up global window and document for axe-core
    global.window = window;
    global.document = document;
    global.Node = window.Node;
    global.HTMLElement = window.HTMLElement;
    global.NodeList = window.NodeList;

    axe.configure({
      checks: [
        {
          id: 'dummy-check',
          evaluate: () => true
        }
      ],
      rules: [
        {
          id: 'dummy-rule',
          selector: 'div',
          any: ['dummy-check']
        }
      ]
    });
  });

  afterEach(() => {
    axe.reset();
    axe.teardown();
    delete global.window;
    delete global.document;
    delete global.Node;
    delete global.HTMLElement;
    delete global.NodeList;
  });

  it('should respect per-run ignoredAttributes', async function () {
    const results = await axe.run(document.documentElement, {
      runOnly: ['dummy-rule'],
      selectors: {
        ignoredAttributes: ['id']
      }
    });

    const target = results.passes[0].nodes[0].target[0];
    assert.strictEqual(target, '.random-class');
  });

  it('should respect global selectorConfig.ignoredAttributes', async function () {
    axe.configure({
      selectorConfig: {
        ignoredAttributes: ['id', 'class']
      }
    });

    const results = await axe.run(document.documentElement, {
      runOnly: ['dummy-rule'],
      selectors: true
    });

    const target = results.passes[0].nodes[0].target[0];
    assert.strictEqual(target, 'div[data-test="test-val"]');
  });

  it('should merge global and per-run ignoredAttributes', async function () {
    axe.configure({
      selectorConfig: {
        ignoredAttributes: ['id', 'class']
      }
    });

    const results = await axe.run(document.documentElement, {
      runOnly: ['dummy-rule'],
      selectors: {
        ignoredAttributes: ['data-test']
      }
    });

    const target = results.passes[0].nodes[0].target[0];
    assert.strictEqual(target, 'div:nth-child(1)');
  });
});
