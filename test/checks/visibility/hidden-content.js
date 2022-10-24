/* global xit */
describe('hidden content', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var shadowSupport = axe.testUtils.shadowSupport.v1;
  var checkSetup = axe.testUtils.checkSetup;
  var checkContext = axe.testUtils.MockCheckContext();

  afterEach(function () {
    fixture.innerHTML = '';
    checkContext.reset();
    axe._tree = undefined;
  });

  it('should return undefined with display:none and children', function () {
    var params = checkSetup(
      '<div id="target" style="display: none;"><p>Some paragraph text.</p></div>'
    );
    assert.isUndefined(
      axe.testUtils
        .getCheckEvaluate('hidden-content')
        .apply(checkContext, params)
    );
  });

  it('should return undefined with visibility:hidden and children', function () {
    var params = checkSetup(
      '<div id="target" style="visibility: hidden;"><p>Some paragraph text.</p></div>'
    );
    assert.isUndefined(
      axe.testUtils
        .getCheckEvaluate('hidden-content')
        .apply(checkContext, params)
    );
  });

  it('should return true with visibility:hidden and parent with visibility:hidden', function () {
    var params = checkSetup(
      '<div style="visibility: hidden;"><p id="target" style="visibility: hidden;">Some paragraph text.</p></div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('hidden-content')
        .apply(checkContext, params)
    );
  });

  it('should return true with aria-hidden and no content', function () {
    var params = checkSetup(
      '<span id="target" class="icon" aria-hidden="true"></span>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('hidden-content')
        .apply(checkContext, params)
    );
  });

  it('should skip whitelisted elements', function () {
    var node = document.querySelector('head');
    axe.testUtils.flatTreeSetup(document.documentElement);
    var virtualNode = axe.utils.getNodeFromTree(node);
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('hidden-content')(
        node,
        undefined,
        virtualNode
      )
    );
  });

  (shadowSupport ? it : xit)('works on elements in a shadow DOM', function () {
    fixture.innerHTML = '<div id="shadow"> <div id="content">text</div> </div>';
    var shadowRoot = document
      .getElementById('shadow')
      .attachShadow({ mode: 'open' });
    shadowRoot.innerHTML =
      '<div id="target" style="display:none">' + '<slot></slot>' + '</div>';
    axe.testUtils.flatTreeSetup(fixture);

    var shadow = document.querySelector('#shadow');
    var virtualShadow = axe.utils.getNodeFromTree(shadow);
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('hidden-content')(
        shadow,
        undefined,
        virtualShadow
      )
    );

    var target = shadowRoot.querySelector('#target');
    var virtualTarget = axe.utils.getNodeFromTree(target);
    assert.isUndefined(
      axe.testUtils.getCheckEvaluate('hidden-content')(
        target,
        undefined,
        virtualTarget
      )
    );

    var content = document.querySelector('#content');
    var virtualContent = axe.utils.getNodeFromTree(content);
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('hidden-content')(
        content,
        undefined,
        virtualContent
      )
    );
  });
});
