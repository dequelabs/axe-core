describe('duplicate-img-label', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var checkSetup = axe.testUtils.checkSetup;
  var shadowSupport = axe.testUtils.shadowSupport;

  afterEach(function () {
    fixture.innerHTML = '';
    axe._tree = undefined;
  });

  it('should return false if no text is present', function () {
    fixture.innerHTML = '<button><img id="target" alt="Plain text"></button>';
    var node = fixture.querySelector('#target');
    axe.testUtils.flatTreeSetup(fixture);
    var result = axe.testUtils.getCheckEvaluate('duplicate-img-label')(
      node,
      undefined,
      axe.utils.getNodeFromTree(node)
    );
    assert.isFalse(result);
  });

  it('should return false if aria-label duplicates img alt', function () {
    fixture.innerHTML =
      '<button aria-label="Plain text"><img id="target" alt="Plain text"></button>';
    var node = fixture.querySelector('#target');
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
    var node = fixture.querySelector('#target');
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
    var node = fixture.querySelector('#target');
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
    var node = fixture.querySelector('#target');
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
    var node = fixture.querySelector('#target');
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
    var node = fixture.querySelector('#target');
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
    var node = fixture.querySelector('#target');
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
    var node = fixture.querySelector('#target');
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
      var button = document.createElement('div');
      button.setAttribute('role', 'button');
      button.innerHTML = 'My button';
      var shadow = button.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<slot></slot><img id="target" alt="My button">';
      fixture.appendChild(button);
      axe.testUtils.flatTreeSetup(fixture);
      var node = shadow.querySelector('#target');
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
      var button = document.createElement('div');
      button.setAttribute('role', 'button');
      button.innerHTML = '<img id="target" alt="My button">';
      var shadow = button.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<span>My button</span> <slot></slot>';

      fixture.appendChild(button);
      axe.testUtils.flatTreeSetup(fixture);
      var node = button.querySelector('#target');
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
      var button = document.createElement('div');
      button.setAttribute('role', 'button');
      button.innerHTML = 'My button';
      var shadow = button.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<slot></slot><img alt="My image">';
      var checkArgs = checkSetup(button);

      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('duplicate-img-label')
          .apply(null, checkArgs)
      );
    }
  );
});
