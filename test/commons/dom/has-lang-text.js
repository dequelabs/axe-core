describe('dom.hasLangText', function() {
  'use strict';
  var hasLangText = axe.commons.dom.hasLangText;
  var fixture = document.getElementById('fixture');
  var tree;

  it('returns true when the element has a non-empty text node as its content', function () {
    fixture.innerHTML = '<div id="target">  text  </div>';
    tree = axe.utils.getFlattenedTree(fixture);
    var target = axe.utils.querySelectorAll(tree, '#target')[0];
    assert.isTrue(hasLangText(target, { skipNestedLang: true }));
  });

  it('returns true when the element has nested text node as its content', function () {
    fixture.innerHTML = '<div id="target"> <span> text </span> </div>';
    tree = axe.utils.getFlattenedTree(fixture);
    var target = axe.utils.querySelectorAll(tree, '#target')[0];
    assert.isTrue(hasLangText(target, { skipNestedLang: true }));
  });

  it('returns false when the element has nested text is hidden', function () {
    fixture.innerHTML = '<div id="target"> <span hidden> text </span> </div>';
    tree = axe.utils.getFlattenedTree(fixture);
    var target = axe.utils.querySelectorAll(tree, '#target')[0];
    assert.isFalse(hasLangText(target, { skipNestedLang: true }));
  });

  it('returns false when the element has an empty text node as its content', function () {
    fixture.innerHTML = '<div id="target">  <!-- comment -->  </div>';
    tree = axe.utils.getFlattenedTree(fixture);
    var target = axe.utils.querySelectorAll(tree, '#target')[0];
    assert.isFalse(hasLangText(target, { skipNestedLang: true }));
  });

  it('returns false if all text is in a child with a lang attribute', function () {
    fixture.innerHTML = '<div id="target"><span lang="en"> text </span></div>';
    tree = axe.utils.getFlattenedTree(fixture);
    var target = axe.utils.querySelectorAll(tree, '#target')[0];
    assert.isFalse(hasLangText(target, { skipNestedLang: true }));
  });

  it('does not skip if lang is on the starting node', function () {
    fixture.innerHTML = '<div id="target" lang="en"><span> text </span></div>';
    tree = axe.utils.getFlattenedTree(fixture);
    var target = axe.utils.querySelectorAll(tree, '#target')[0];
    assert.isTrue(hasLangText(target, { skipNestedLang: true }));
  });

  it('ignores empty lang attributes', function () {
    fixture.innerHTML = '<div id="target"><span lang=""> text </span></div>';
    tree = axe.utils.getFlattenedTree(fixture);
    var target = axe.utils.querySelectorAll(tree, '#target')[0];
    assert.isTrue(hasLangText(target, { skipNestedLang: true }));
  });

  it('ignores null lang attributes', function () {
    fixture.innerHTML = '<div id="target"><span lang> text </span></div>';
    tree = axe.utils.getFlattenedTree(fixture);
    var target = axe.utils.querySelectorAll(tree, '#target')[0];
    assert.isTrue(hasLangText(target, { skipNestedLang: true }));
  });

  it('true for non-text content with an accessible name', function () {
    fixture.innerHTML = '<div id="target"><img alt="foo"></div>';
    tree = axe.utils.getFlattenedTree(fixture);
    var target = axe.utils.querySelectorAll(tree, '#target')[0];
    assert.isTrue(hasLangText(target, { skipNestedLang: true }));
  });

  it('false for non-text content without accessible name', function () {
    fixture.innerHTML = '<div id="target"><img alt=""></div>';
    tree = axe.utils.getFlattenedTree(fixture);
    var target = axe.utils.querySelectorAll(tree, '#target')[0];
    assert.isFalse(hasLangText(target, { skipNestedLang: true }));
  });

  it('returns false for non-text content with a lang attr', function () {
    fixture.innerHTML = '<div id="target"><img alt="foo" lang="en"></div>';
    tree = axe.utils.getFlattenedTree(fixture);
    var target = axe.utils.querySelectorAll(tree, '#target')[0];
    assert.isFalse(hasLangText(target, { skipNestedLang: true }));
  });
});