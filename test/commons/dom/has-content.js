describe('dom.hasContent', function () {
  'use strict';
  var hasContent = axe.commons.dom.hasContent;
  var fixture = document.getElementById('fixture');
  var tree;

  it('returns false if there is no content', function () {
    fixture.innerHTML = '<div id="target">  </div>';
    tree = axe.utils.getFlattenedTree(fixture);
    assert.isFalse(
      hasContent(axe.utils.querySelectorAll(tree, '#target')[0])
    );
  });

  it('returns false if there are non-visual elements', function () {
    fixture.innerHTML = '<div id="target"> <span></span> </div>';
    tree = axe.utils.getFlattenedTree(fixture);
    assert.isFalse(
      hasContent(axe.utils.querySelectorAll(tree, '#target')[0])
    );
  });

  it('is true if the element has non-empty text', function () {
    fixture.innerHTML = '<div id="target"> text </div>';
    tree = axe.utils.getFlattenedTree(fixture);
    assert.isTrue(
      hasContent(axe.utils.querySelectorAll(tree, '#target')[0])
    );
  });

  it('is true if the element has an aria label', function () {
    fixture.innerHTML = '<div id="target" aria-label="my-label">  </div>';
    tree = axe.utils.getFlattenedTree(fixture);
    assert.isTrue(
      hasContent(axe.utils.querySelectorAll(tree, '#target')[0])
    );
  });

  it('is true if the element contains visual content', function () {
    fixture.innerHTML = '<div id="target"> <img src=""> </div>';
    tree = axe.utils.getFlattenedTree(fixture);
    assert.isTrue(
      hasContent(axe.utils.querySelectorAll(tree, '#target')[0])
    );
  });

  it('is true if the element contains a node with a aria-label', function () {
    fixture.innerHTML = '<div id="target"> <span aria-label="my-label"></span> </div>';
    tree = axe.utils.getFlattenedTree(fixture);
    assert.isTrue(
      hasContent(axe.utils.querySelectorAll(tree, '#target')[0])
    );
  });

  it('accepts DOM Nodes and virtual nodes', function () {
    fixture.innerHTML = '<div id="target"> text </div>';
    axe._tree = axe.utils.getFlattenedTree(fixture);

    // Virtual node
    assert.isTrue(
      hasContent(axe.utils.querySelectorAll(axe._tree, '#target')[0])
    );
    // DOM node
    assert.isTrue(
      hasContent(fixture.querySelector('#target'))
    );
    axe._tree = null;
  });
});
