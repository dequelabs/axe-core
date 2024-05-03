describe('duplicate-img-label', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let checkSetup = axe.testUtils.checkSetup;
  let shadowSupport = axe.testUtils.shadowSupport;

  afterEach(function () {
    fixture.innerHTML = '';
    axe._tree = undefined;
  });

  it('should return false if no text is present', function () {
    fixture.innerHTML = '<button><img id="target" alt="Plain text"></button>';
    let node = fixture.querySelector('#target');
    axe.testUtils.flatTreeSetup(fixture);
    let result = axe.testUtils.getCheckEvaluate('duplicate-img-label')(
      node,
      undefined,
      axe.utils.getNodeFromTree(node)
    );
    assert.isFalse(result);
  });

  it('should return false if aria-label duplicates img alt', function () {
    fixture.innerHTML =
      '<button aria-label="Plain text"><img id="target" alt="Plain text"></button>';
    let node = fixture.querySelector('#target');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(
      axe.testUtils.getCheckEvaluate('duplicate-img-label')(
        node,
        undefined,
        axe.utils.getNodeFromTree(node)
      )
    );
  });

  it('should return false if img and text have different text', function () {
    fixture.innerHTML =
      '<button><img id="target" alt="Alt text">Plain text</button>';
    let node = fixture.querySelector('#target');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(
      axe.testUtils.getCheckEvaluate('duplicate-img-label')(
        node,
        undefined,
        axe.utils.getNodeFromTree(node)
      )
    );
  });

  it('should return true if img and text have the same text', function () {
    fixture.innerHTML =
      '<button><img id="target" alt="Plain text">Plain text</button>';
    let node = fixture.querySelector('#target');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('duplicate-img-label')(
        node,
        undefined,
        axe.utils.getNodeFromTree(node)
      )
    );
  });

  it('should return true if img has ARIA label with the same text', function () {
    fixture.innerHTML =
      '<button><img id="target" aria-label="Plain text">Plain text</button>';
    let node = fixture.querySelector('#target');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('duplicate-img-label')(
        node,
        undefined,
        axe.utils.getNodeFromTree(node)
      )
    );
  });

  it('should return false if img and text are both blank', function () {
    fixture.innerHTML = '<button><img id="target" alt=""></button>';
    let node = fixture.querySelector('#target');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(
      axe.testUtils.getCheckEvaluate('duplicate-img-label')(
        node,
        undefined,
        axe.utils.getNodeFromTree(node)
      )
    );
  });

  it('should return false if img and text have superset/subset text', function () {
    fixture.innerHTML =
      '<button><img id="target" alt="Plain text and more">Plain text</button>';
    let node = fixture.querySelector('#target');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(
      axe.testUtils.getCheckEvaluate('duplicate-img-label')(
        node,
        undefined,
        axe.utils.getNodeFromTree(node)
      )
    );
  });

  it('should return false if img does not have required parent', function () {
    fixture.innerHTML =
      '<main><img id="target" alt="Plain text and more"><p>Plain text</p></main>';
    let node = fixture.querySelector('#target');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(
      axe.testUtils.getCheckEvaluate('duplicate-img-label')(
        node,
        undefined,
        axe.utils.getNodeFromTree(node)
      )
    );
  });

  it('should support options.parentSelector', function () {
    fixture.innerHTML =
      '<div aria-label="Plain text"><img id="target" alt="Plain text"></div>';
    let node = fixture.querySelector('#target');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(
      axe.testUtils.getCheckEvaluate('duplicate-img-label')(
        node,
        { parentSelector: 'div' },
        axe.utils.getNodeFromTree(node)
      )
    );
  });

  (shadowSupport.v1 ? it : xit)(
    'should return true if the img is part of a shadow tree',
    function () {
      let button = document.createElement('div');
      button.setAttribute('role', 'button');
      button.innerHTML = 'My button';
      let shadow = button.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<slot></slot><img id="target" alt="My button">';
      fixture.appendChild(button);
      axe.testUtils.flatTreeSetup(fixture);
      let node = shadow.querySelector('#target');
      assert.isTrue(
        axe.testUtils.getCheckEvaluate('duplicate-img-label')(
          node,
          undefined,
          axe.utils.getNodeFromTree(node)
        )
      );
    }
  );

  (shadowSupport.v1 ? it : xit)(
    'should return true if the img is a slotted element',
    function () {
      let button = document.createElement('div');
      button.setAttribute('role', 'button');
      button.innerHTML = '<img id="target" alt="My button">';
      let shadow = button.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<span>My button</span> <slot></slot>';

      fixture.appendChild(button);
      axe.testUtils.flatTreeSetup(fixture);
      let node = button.querySelector('#target');
      assert.isTrue(
        axe.testUtils.getCheckEvaluate('duplicate-img-label')(
          node,
          undefined,
          axe.utils.getNodeFromTree(node)
        )
      );
    }
  );

  (shadowSupport.v1 ? it : xit)(
    'should return false if the shadow img has a different text',
    function () {
      let button = document.createElement('div');
      button.setAttribute('role', 'button');
      button.innerHTML = 'My button';
      let shadow = button.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<slot></slot><img alt="My image">';
      let checkArgs = checkSetup(button);

      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('duplicate-img-label')
          .apply(null, checkArgs)
      );
    }
  );
});
