/* global xit */
describe('dom.hasContent', function () {
  'use strict';
  var hasContent = axe.commons.dom.hasContent;
  var fixture = document.getElementById('fixture');
  var shadowSupport = axe.testUtils.shadowSupport.v1;
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

  it('is false if the element does not show text', function () {
    fixture.innerHTML = '<style id="target"> #foo { color: green } </style>';
    tree = axe.utils.getFlattenedTree(fixture);
    assert.isFalse(
      hasContent(axe.utils.querySelectorAll(tree, '#target')[0])
    );
  });

  (shadowSupport ? it : xit)('looks at content of shadow dom elements', function () {
    fixture.innerHTML = '<div id="target"></div>';
    var shadow = fixture.querySelector('#target').attachShadow({ mode: 'open' });
    shadow.innerHTML = 'Some text';
    tree = axe.utils.getFlattenedTree(fixture);

    assert.isTrue(
      hasContent(axe.utils.querySelectorAll(tree, '#target')[0])
    );
  });

  (shadowSupport ? it : xit)('looks at the slots in a shadow tree', function () {
    fixture.innerHTML = '<div id="shadow">some text</div>';
    var shadow = fixture.querySelector('#shadow').attachShadow({ mode: 'open' });
    shadow.innerHTML = '<div class="target"><slot></slot></div>';
    tree = axe.utils.getFlattenedTree(fixture);
    var node = axe.utils.querySelectorAll(tree, '.target');

    axe.log(tree, node);
    assert.isTrue(
      hasContent(axe.utils.querySelectorAll(tree, '.target')[0])
    );
  });
});
