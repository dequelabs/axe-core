describe('focusable-content tests', function () {
  'use strict';

  let check;
  let fixture = document.getElementById('fixture');
  let fixtureSetup = axe.testUtils.fixtureSetup;
  let shadowSupported = axe.testUtils.shadowSupport.v1;
  let checkContext = axe.testUtils.MockCheckContext();
  let checkSetup = axe.testUtils.checkSetup;

  before(function () {
    check = checks['focusable-content'];
  });

  afterEach(function () {
    fixture.innerHTML = '';
    axe._tree = undefined;
    checkContext.reset();
  });

  it('returns false when there are no focusable content elements (content element `div` is not focusable)', function () {
    let params = checkSetup(
      '<div id="target">' + '<div> Content </div>' + '</div>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
  });

  it('returns false when content element is taken out of focusable order (tabindex = -1)', function () {
    let params = checkSetup(
      '<div id="target">' + '<input type="text" tabindex="-1">' + '</div>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
  });

  it('returns false when element is focusable (only checks if contents are focusable)', function () {
    let params = checkSetup(
      '<div id="target" tabindex="0">' +
        '<p style="height: 200px;"></p>' +
        '</div>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
  });

  it('returns false when all content elements are not focusable', function () {
    let params = checkSetup(
      '<div id="target">' +
        '<input type="text" tabindex="-1">' +
        '<select tabindex="-1"></select>' +
        '<textarea tabindex="-1"></textarea>' +
        '</div>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
  });

  it('returns true when one deeply nested content element is focusable', function () {
    let params = checkSetup(
      '<div id="target">' +
        '<div style="height: 200px"> ' +
        '<div style="height: 200px">' +
        '<input type="text">' +
        '</div>' +
        '</div>' +
        '</div>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  it('returns true when content element can be focused', function () {
    let params = checkSetup(
      '<div id="target">' + '<input type="text">' + '</div>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  it('returns true when any one of the many content elements can be focused', function () {
    let params = checkSetup(
      '<div id="target">' +
        '<input type="text" tabindex="-1">' +
        '<select tabindex="-1"></select>' +
        '<textarea tabindex="-1"></textarea>' +
        '<p style="height: 200px;" tabindex="0"></p>' +
        '</div>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  describe('shadowDOM - focusable content', function () {
    before(function () {
      if (!shadowSupported) {
        this.skip();
      }
    });

    it('returns true when content element can be focused', function () {
      fixtureSetup('<div id="target">' + '</div>');
      let node = fixture.querySelector('#target');
      let shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<input type="text">';
      axe._tree = axe.utils.getFlattenedTree(fixture);
      axe._selectorData = axe.utils.getSelectorData(axe._tree);
      let virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
      let actual = check.evaluate.call(checkContext, node, {}, virtualNode);
      assert.isTrue(actual);
    });

    it('returns false when no focusable content', function () {
      fixtureSetup('<div id="target">' + '</div>');
      let node = fixture.querySelector('#target');
      let shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML =
        '<input type="text" tabindex="-1"> <p>just some text</p>';
      axe._tree = axe.utils.getFlattenedTree(fixture);
      axe._selectorData = axe.utils.getSelectorData(axe._tree);
      let virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
      let actual = check.evaluate.call(checkContext, node, {}, virtualNode);
      assert.isFalse(actual);
    });
  });
});
