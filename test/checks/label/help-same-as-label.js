describe('help-same-as-label', function () {
  'use strict';

  var fixture = document.getElementById('fixture');

  afterEach(function () {
    fixture.innerHTML = '';
    axe._tree = undefined;
  });

  it('should return true if an element has a label and a title with the same text', function () {
    var node = document.createElement('input');
    node.type = 'text';
    node.title = 'Duplicate';
    node.setAttribute('aria-label', 'Duplicate');

    fixture.appendChild(node);
    axe.testUtils.flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('help-same-as-label')(
        node,
        undefined,
        axe.utils.getNodeFromTree(node)
      )
    );
  });

  it('should return true if an element has a label and aria-describedby with the same text', function () {
    var node = document.createElement('input');
    node.type = 'text';
    node.setAttribute('aria-label', 'Duplicate');
    node.setAttribute('aria-describedby', 'dby');
    var dby = document.createElement('div');
    dby.id = 'dby';
    dby.innerHTML = 'Duplicate';

    fixture.appendChild(node);
    fixture.appendChild(dby);

    axe.testUtils.flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('help-same-as-label')(
        node,
        undefined,
        axe.utils.getNodeFromTree(node)
      )
    );
  });

  it('should return false if input only has a title', function () {
    var node = document.createElement('input');
    node.type = 'text';
    node.title = 'Duplicate';

    fixture.appendChild(node);

    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(
      axe.testUtils.getCheckEvaluate('help-same-as-label')(
        node,
        undefined,
        axe.utils.getNodeFromTree(node)
      )
    );
  });

  it('should return true if an input only has aria-describedby', function () {
    var node = document.createElement('input');
    node.type = 'text';
    node.setAttribute('aria-describedby', 'dby');
    var dby = document.createElement('div');
    dby.id = 'dby';
    dby.innerHTML = 'Duplicate';

    fixture.appendChild(node);
    fixture.appendChild(dby);

    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(
      axe.testUtils.getCheckEvaluate('help-same-as-label')(
        node,
        undefined,
        axe.utils.getNodeFromTree(node)
      )
    );
  });
});
