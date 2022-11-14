describe('dom.isSkipLink', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var baseEl;

  afterEach(function () {
    fixture.innerHTML = '';

    if (baseEl) {
      baseEl.parentNode.removeChild(baseEl);
    }
  });

  it('should return true if the href points to an ID', function () {
    fixture.innerHTML = '<a href="#target">Click Here</a>';
    axe._tree = axe.utils.getFlattenedTree(fixture);
    var node = fixture.querySelector('a');
    assert.isTrue(axe.commons.dom.isSkipLink(node));
  });

  it('should return false if the href points to another document', function () {
    fixture.innerHTML = '<a href="something.html#target">Click Here</a>';
    axe._tree = axe.utils.getFlattenedTree(fixture);
    var node = fixture.querySelector('a');
    assert.isFalse(axe.commons.dom.isSkipLink(node));
  });

  it('should return true if the URI encoded href points to an element with an ID', function () {
    fixture.innerHTML = '<a href="#%3Ctarget%3E">Click Here</a>';
    axe._tree = axe.utils.getFlattenedTree(fixture);
    var node = fixture.querySelector('a');
    assert.isTrue(axe.commons.dom.isSkipLink(node));
  });

  it('should return true if the URI is an Angular skiplink', function () {
    fixture.innerHTML = '<a href="/#target">Click Here</a>';
    axe._tree = axe.utils.getFlattenedTree(fixture);
    var node = fixture.querySelector('a');
    assert.isTrue(axe.commons.dom.isSkipLink(node));
  });

  it('should return false if the URI is angular #!', function () {
    fixture.innerHTML = '<a href="#!target">Click Here</a>';
    axe._tree = axe.utils.getFlattenedTree(fixture);
    var node = fixture.querySelector('a');
    assert.isFalse(axe.commons.dom.isSkipLink(node));
  });

  it('should return false if the URI is angular #/', function () {
    fixture.innerHTML = '<a href="#/target">Click Here</a>';
    axe._tree = axe.utils.getFlattenedTree(fixture);
    var node = fixture.querySelector('a');
    assert.isFalse(axe.commons.dom.isSkipLink(node));
  });

  it('should return true for multiple skip-links', function () {
    fixture.innerHTML =
      '<a id="skip-link1" href="#target1">Click Here></a><a id="skip-link2" href="/#target2">Click Here></a><a id="skip-link3" href="#target3">Click Here></a>';
    axe._tree = axe.utils.getFlattenedTree(fixture);
    var nodes = fixture.querySelectorAll('a');
    for (var i = 0; i < nodes.length; i++) {
      assert.isTrue(axe.commons.dom.isSkipLink(nodes[i]));
    }
  });

  it('should return true if the element is before a page link', function () {
    fixture.innerHTML =
      '<a id="skip-link" href="#target">Click Here></a><a href="/page">New Page</a>';
    axe._tree = axe.utils.getFlattenedTree(fixture);
    var node = fixture.querySelector('#skip-link');
    assert.isTrue(axe.commons.dom.isSkipLink(node));
  });

  it('should return false if the element is after a page link', function () {
    fixture.innerHTML =
      '<a href="/page">New Page</a><a id="skip-link" href="#target">Click Here></a>';
    axe._tree = axe.utils.getFlattenedTree(fixture);
    var node = fixture.querySelector('#skip-link');
    assert.isFalse(axe.commons.dom.isSkipLink(node));
  });

  it('should ignore links that start with `href=javascript`', function () {
    fixture.innerHTML =
      '<a href="javascript:void">New Page</a><a id="skip-link" href="#target">Click Here></a>';
    axe._tree = axe.utils.getFlattenedTree(fixture);
    var node = fixture.querySelector('#skip-link');
    assert.isTrue(axe.commons.dom.isSkipLink(node));
  });

  it('should return true for hash href that resolves to current page', function () {
    fixture.innerHTML =
      '<a href="' + window.location.pathname + '#target">Click Here</a>';
    axe._tree = axe.utils.getFlattenedTree(fixture);
    var node = fixture.querySelector('a');
    assert.isTrue(axe.commons.dom.isSkipLink(node));
  });

  it('should return true for absolute path hash href', function () {
    var url = window.location.href;
    fixture.innerHTML = '<a href="' + url + '#target">Click Here</a>';
    axe._tree = axe.utils.getFlattenedTree(fixture);
    var node = fixture.querySelector('a');
    assert.isTrue(axe.commons.dom.isSkipLink(node));
  });

  it('should return false for absolute path href that points to another document', function () {
    var origin = window.location.origin;
    fixture.innerHTML =
      '<a href="' + origin + '/something.html#target">Click Here</a>';
    axe._tree = axe.utils.getFlattenedTree(fixture);
    var node = fixture.querySelector('a');
    assert.isFalse(axe.commons.dom.isSkipLink(node));
  });

  it('should return false for href with <base> tag that points to another document', function () {
    baseEl = document.createElement('base');
    baseEl.href = 'https://www.google.com/';
    document.getElementsByTagName('head')[0].appendChild(baseEl);

    fixture.innerHTML =
      '<a href="' + window.location.pathname + '#target">Click Here</a>';
    axe._tree = axe.utils.getFlattenedTree(fixture);
    var node = fixture.querySelector('a');
    assert.isFalse(axe.commons.dom.isSkipLink(node));
  });
});
