const axe = require('../../');
const jsdom = require('jsdom');
const { assert } = require('chai');

describe('axe.utils.getSelector with options', function () {
  'use strict';
  let dom;
  let window;
  let document;
  let fixture;

  beforeEach(() => {
    dom = new jsdom.JSDOM(
      '<!DOCTYPE html><html><body><div id="fixture"></div></body></html>'
    );
    window = dom.window;
    document = window.document;
    fixture = document.getElementById('fixture');

    // Set up global window and document for axe-core
    global.window = window;
    global.document = document;
    global.Node = window.Node;
    global.HTMLElement = window.HTMLElement;
    global.NodeList = window.NodeList;
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
    delete global.Node;
    delete global.HTMLElement;
    delete global.NodeList;
    axe.teardown();
  });

  it('should ignore id if specified in options', function () {
    var node = document.createElement('div');
    node.id = 'random-id';
    fixture.appendChild(node);

    // We need to set up selector data for the test to work
    axe.setup(document);
    axe._selectorData = axe.utils.getSelectorData(axe._tree);

    // Default behavior uses ID
    var selWithId = axe.utils.getSelector(node);
    assert.equal(selWithId, '#random-id');

    // Behavior with ignoredAttributes should NOT use ID
    var selWithoutId = axe.utils.getSelector(node, {
      ignoredAttributes: ['id']
    });
    assert.notEqual(selWithoutId, '#random-id');
    assert.isTrue(selWithoutId.indexOf('#random-id') === -1);
  });

  it('should ignore class if specified in options', function () {
    var node = document.createElement('div');
    node.className = 'random-class';
    fixture.appendChild(node);
    // Add another div to make the class 'uncommon'
    fixture.appendChild(document.createElement('div'));

    // We need to set up selector data for the test to work
    axe.setup(document);
    axe._selectorData = axe.utils.getSelectorData(axe._tree);

    // Default behavior uses class
    var selWithClass = axe.utils.getSelector(node);
    assert.equal(selWithClass, '.random-class');

    // Behavior with ignoredAttributes should NOT use class
    var selWithoutClass = axe.utils.getSelector(node, {
      ignoredAttributes: ['class']
    });
    assert.notEqual(selWithoutClass, '.random-class');
    assert.isTrue(selWithoutClass.indexOf('.random-class') === -1);
  });

  it('should ignore custom attributes if specified in options', function () {
    var node = document.createElement('div');
    node.setAttribute('data-test-id', 'test-123');
    fixture.appendChild(node);

    // We need to set up selector data for the test to work
    axe.setup(document);
    axe._selectorData = axe.utils.getSelectorData(axe._tree);

    // Default behavior uses the attribute if it's unique
    var selWithAttr = axe.utils.getSelector(node);
    assert.equal(selWithAttr, 'div[data-test-id="test-123"]');

    // Behavior with ignoredAttributes should NOT use the attribute
    var selWithoutAttr = axe.utils.getSelector(node, {
      ignoredAttributes: ['data-test-id']
    });
    assert.notEqual(selWithoutAttr, 'div[data-test-id="test-123"]');
    assert.isTrue(selWithoutAttr.indexOf('data-test-id') === -1);
  });
});
