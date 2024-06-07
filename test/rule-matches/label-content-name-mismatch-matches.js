describe('label-content-name-mismatch-matches tests', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let queryFixture = axe.testUtils.queryFixture;
  let rule = axe.utils.getRule('label-content-name-mismatch');

  afterEach(function () {
    fixture.innerHTML = '';
    axe._tree = undefined;
  });

  it('returns false if given element has no role', function () {
    let vNode = queryFixture(
      '<div id="target" aria-label="what color is the sky?"></div>'
    );
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false if element role is not supported with name from contents', function () {
    let vNode = queryFixture(
      '<div aria-label="choose your age" id="target" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">20 %</div>'
    );
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false if implicit element role is overridden to a role that does not support name from contents', function () {
    let vNode = queryFixture(
      '<div id="labelForStatusMsg">Status message</div>' +
        '<button id="target" role="status" aria-labelledby="labelForStatusMsg">Your changes were automatically saved.</button>'
    );
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false if element does not have accessible name attributes (`aria-label` or `aria-labelledby`)', function () {
    let vNode = queryFixture(
      '<button id="target" name="link">Until the very end.</button>'
    );
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false if element has empty accessible name via `aria-label`', function () {
    let vNode = queryFixture(
      '<button id="target" name="link" aria-label="">Until the very end.</button>'
    );
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns true if element has accessible name via `aria-label`', function () {
    let vNode = queryFixture(
      '<button id="target" name="link" aria-label="Until">Until the very end.</button>'
    );
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true if element has accessible name via `aria-labelledby`', function () {
    let vNode = queryFixture(
      '<div role="button" id="target" aria-labelledby="foo">some content</div>' +
        '<div id="foo">Foo text</div>'
    );
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns false if element has empty accessible name (`aria-labelledby`)', function () {
    let vNode = queryFixture(
      '<div role="button" id="target" aria-labelledby="foo">some content</div>' +
        '<div id="foo"></div>'
    );
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false if element has empty accessible name (`aria-labelledby`) because idref does not exist', function () {
    let vNode = queryFixture(
      '<div role="button" id="target" aria-labelledby="doesNotExist">some content</div>' +
        '<div id="idExists">Right Label</div>'
    );
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns true if element has accessible name (`aria-labelledby`) - multiple refs', function () {
    let vNode = queryFixture(
      '<div role="button" id="target" aria-labelledby="bar baz foo">some content</div>' +
        '<div id="foo">Foo</div>' +
        '<div id="bar">Bar</div>' +
        '<div id="baz">Baz</div>'
    );
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns false for non-widget role', function () {
    let vNode = queryFixture(
      '<a role="contentinfo" id="target" aria-label="some content">Content Information</a>'
    );
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false for non-widget role that does support name from content', function () {
    let vNode = queryFixture(
      '<div id="target" role="tooltip" aria-label="OK">Next</div>'
    );
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false for empty text content', function () {
    let vNode = queryFixture(
      '<button id="target" aria-label="close"></button>'
    );
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false for non text content', function () {
    let vNode = queryFixture(
      '<button id="target" aria-label="close"><i class="fa fa-icon-close"></i></button>'
    );
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false for hidden (non visible) text content', function () {
    let vNode = queryFixture(
      '<button id="target" aria-label="close"><span style="display:none">I am hidden</span></button>'
    );
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns true when visible text is combination of alphanumeric and emoji characters', function () {
    let vNode = queryFixture(
      '<button id="target" aria-label="I would like a burger">I would like a 🍔 </button>'
    );
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true when visible text is combination of alphanumeric and punctuation characters', function () {
    let vNode = queryFixture(
      '<button id="target" aria-label="next page">next page &gt;</button>'
    );
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });
});
