describe('label-content-name-mismatch-matches tests', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var queryFixture = axe.testUtils.queryFixture;
  var rule = axe.utils.getRule('label-content-name-mismatch');

  afterEach(function () {
    fixture.innerHTML = '';
    axe._tree = undefined;
  });

  it('returns false if given element has no role', function () {
    var vNode = queryFixture(
      '<div id="target" aria-label="what color is the sky?"></div>'
    );
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false if element role is not supported with name from contents', function () {
    var vNode = queryFixture(
      '<div aria-label="choose your age" id="target" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">20 %</div>'
    );
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false if implicit element role is overridden to a role that does not support name from contents', function () {
    var vNode = queryFixture(
      '<div id="labelForStatusMsg">Status message</div>' +
        '<button id="target" role="status" aria-labelledby="labelForStatusMsg">Your changes were automatically saved.</button>'
    );
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false if element does not have accessible name attributes (`aria-label` or `aria-labelledby`)', function () {
    var vNode = queryFixture(
      '<button id="target" name="link">Until the very end.</button>'
    );
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false if element has empty accessible name via `aria-label`', function () {
    var vNode = queryFixture(
      '<button id="target" name="link" aria-label="">Until the very end.</button>'
    );
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns true if element has accessible name via `aria-label`', function () {
    var vNode = queryFixture(
      '<button id="target" name="link" aria-label="Until">Until the very end.</button>'
    );
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true if element has accessible name via `aria-labelledby`', function () {
    var vNode = queryFixture(
      '<div role="button" id="target" aria-labelledby="foo">some content</div>' +
        '<div id="foo">Foo text</div>'
    );
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns false if element has empty accessible name (`aria-labelledby`)', function () {
    var vNode = queryFixture(
      '<div role="button" id="target" aria-labelledby="foo">some content</div>' +
        '<div id="foo"></div>'
    );
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false if element has empty accessible name (`aria-labelledby`) because idref does not exist', function () {
    var vNode = queryFixture(
      '<div role="button" id="target" aria-labelledby="doesNotExist">some content</div>' +
        '<div id="idExists">Right Label</div>'
    );
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns true if element has accessible name (`aria-labelledby`) - multiple refs', function () {
    var vNode = queryFixture(
      '<div role="button" id="target" aria-labelledby="bar baz foo">some content</div>' +
        '<div id="foo">Foo</div>' +
        '<div id="bar">Bar</div>' +
        '<div id="baz">Baz</div>'
    );
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns false for non-widget role', function () {
    var vNode = queryFixture(
      '<a role="contentinfo" id="target" aria-label="some content">Content Information</a>'
    );
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false for non-widget role that does support name from content', function () {
    var vNode = queryFixture(
      '<div id="target" role="tooltip" aria-label="OK">Next</div>'
    );
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false for empty text content', function () {
    var vNode = queryFixture(
      '<button id="target" aria-label="close"></button>'
    );
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false for non text content', function () {
    var vNode = queryFixture(
      '<button id="target" aria-label="close"><i class="fa fa-icon-close"></i></button>'
    );
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false for hidden (non visible) text content', function () {
    var vNode = queryFixture(
      '<button id="target" aria-label="close"><span style="display:none">I am hidden</span></button>'
    );
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns true when visible text is combination of alphanumeric and emoji characters', function () {
    var vNode = queryFixture(
      '<button id="target" aria-label="I would like a burger">I would like a 🍔 </button>'
    );
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true when visible text is combination of alphanumeric and punctuation characters', function () {
    var vNode = queryFixture(
      '<button id="target" aria-label="next page">next page &gt;</button>'
    );
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });
});
