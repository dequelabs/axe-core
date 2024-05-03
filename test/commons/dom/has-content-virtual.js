/* global xit */
describe('dom.hasContentVirtual', function () {
  'use strict';
  let hasContentVirtual = axe.commons.dom.hasContentVirtual;
  let fixture = document.getElementById('fixture');
  let shadowSupport = axe.testUtils.shadowSupport.v1;
  let tree;

  it('returns false if there is no content', function () {
    fixture.innerHTML = '<div id="target">	</div>';
    tree = axe.utils.getFlattenedTree(fixture);
    assert.isFalse(
      hasContentVirtual(axe.utils.querySelectorAll(tree, '#target')[0])
    );
  });

  it('returns false if there are non-visual elements', function () {
    fixture.innerHTML = '<div id="target"> <span></span> </div>';
    tree = axe.utils.getFlattenedTree(fixture);
    assert.isFalse(
      hasContentVirtual(axe.utils.querySelectorAll(tree, '#target')[0])
    );
  });

  it('is true if the element has non-empty text', function () {
    fixture.innerHTML = '<div id="target"> text </div>';
    tree = axe.utils.getFlattenedTree(fixture);
    assert.isTrue(
      hasContentVirtual(axe.utils.querySelectorAll(tree, '#target')[0])
    );
  });

  it('is true if the element has an aria label', function () {
    fixture.innerHTML = '<div id="target" aria-label="my-label">	</div>';
    tree = axe.utils.getFlattenedTree(fixture);
    assert.isTrue(
      hasContentVirtual(axe.utils.querySelectorAll(tree, '#target')[0])
    );
  });

  it('is false if the element has an aria label but `ignoreAria=true`', function () {
    fixture.innerHTML = '<div id="target" aria-label="my-label">	</div>';
    tree = axe.utils.getFlattenedTree(fixture);
    assert.isFalse(
      hasContentVirtual(
        axe.utils.querySelectorAll(tree, '#target')[0],
        true,
        true
      )
    );
  });

  it('is true if the element contains visual content', function () {
    fixture.innerHTML = '<div id="target"> <img src=""> </div>';
    tree = axe.utils.getFlattenedTree(fixture);
    assert.isTrue(
      hasContentVirtual(axe.utils.querySelectorAll(tree, '#target')[0])
    );
  });

  it('is true if the element contains a node with a aria-label', function () {
    fixture.innerHTML =
      '<div id="target"> <span aria-label="my-label"></span> </div>';
    tree = axe.utils.getFlattenedTree(fixture);
    assert.isTrue(
      hasContentVirtual(axe.utils.querySelectorAll(tree, '#target')[0])
    );
  });

  it('is false if the element does not show text', function () {
    fixture.innerHTML = '<style id="target"> #foo { color: green } </style>';
    tree = axe.utils.getFlattenedTree(fixture);
    assert.isFalse(
      hasContentVirtual(axe.utils.querySelectorAll(tree, '#target')[0])
    );
  });

  it('is called through hasContent, with a DOM node', function () {
    let hasContent = axe.commons.dom.hasContent;
    fixture.innerHTML = '<div id="target"> text </div>';
    axe.testUtils.flatTreeSetup(fixture);
    assert.isTrue(hasContent(fixture.querySelector('#target')));

    fixture.innerHTML = '<div id="target"></div>';
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(hasContent(fixture.querySelector('#target')));
  });

  it('is false if noRecursion is true and the content is not in a child', function () {
    fixture.innerHTML = '<div id="target"><span> text </span></div>';
    tree = axe.utils.getFlattenedTree(fixture);

    assert.isFalse(
      hasContentVirtual(axe.utils.querySelectorAll(tree, '#target')[0], true)
    );
  });

  (shadowSupport ? it : xit)(
    'looks at content of shadow dom elements',
    function () {
      fixture.innerHTML = '<div id="target"></div>';
      let shadow = fixture
        .querySelector('#target')
        .attachShadow({ mode: 'open' });
      shadow.innerHTML = 'Some text';
      tree = axe.utils.getFlattenedTree(fixture);

      assert.isTrue(
        hasContentVirtual(axe.utils.querySelectorAll(tree, '#target')[0])
      );
    }
  );

  (shadowSupport ? it : xit)(
    'looks at the slots in a shadow tree',
    function () {
      fixture.innerHTML = '<div id="shadow">some text</div>';
      let shadow = fixture
        .querySelector('#shadow')
        .attachShadow({ mode: 'open' });
      shadow.innerHTML = '<div class="target"><slot></slot></div>';
      tree = axe.utils.getFlattenedTree(fixture);

      assert.isTrue(
        hasContentVirtual(axe.utils.querySelectorAll(tree, '.target')[0])
      );
    }
  );
});
