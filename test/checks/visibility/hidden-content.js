/* global xit */
describe('hidden content', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let shadowSupport = axe.testUtils.shadowSupport.v1;
  let checkSetup = axe.testUtils.checkSetup;
  let checkContext = axe.testUtils.MockCheckContext();

  afterEach(function () {
    fixture.innerHTML = '';
    checkContext.reset();
    axe._tree = undefined;
  });

  it('should return undefined with display:none and children', function () {
    let params = checkSetup(
      '<div id="target" style="display: none;"><p>Some paragraph text.</p></div>'
    );
    assert.isUndefined(
      axe.testUtils
        .getCheckEvaluate('hidden-content')
        .apply(checkContext, params)
    );
  });

  it('should return undefined with visibility:hidden and children', function () {
    let params = checkSetup(
      '<div id="target" style="visibility: hidden;"><p>Some paragraph text.</p></div>'
    );
    assert.isUndefined(
      axe.testUtils
        .getCheckEvaluate('hidden-content')
        .apply(checkContext, params)
    );
  });

  it('should return true with visibility:hidden and parent with visibility:hidden', function () {
    let params = checkSetup(
      '<div style="visibility: hidden;"><p id="target" style="visibility: hidden;">Some paragraph text.</p></div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('hidden-content')
        .apply(checkContext, params)
    );
  });

  it('should return true with aria-hidden and no content', function () {
    let params = checkSetup(
      '<span id="target" class="icon" aria-hidden="true"></span>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('hidden-content')
        .apply(checkContext, params)
    );
  });

  it('should skip whitelisted elements', function () {
    let node = document.querySelector('head');
    axe.testUtils.flatTreeSetup(document.documentElement);
    let virtualNode = axe.utils.getNodeFromTree(node);
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
    let shadowRoot = document
      .getElementById('shadow')
      .attachShadow({ mode: 'open' });
    shadowRoot.innerHTML =
      '<div id="target" style="display:none">' + '<slot></slot>' + '</div>';
    axe.testUtils.flatTreeSetup(fixture);

    let shadow = document.querySelector('#shadow');
    let virtualShadow = axe.utils.getNodeFromTree(shadow);
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('hidden-content')(
        shadow,
        undefined,
        virtualShadow
      )
    );

    let target = shadowRoot.querySelector('#target');
    let virtualTarget = axe.utils.getNodeFromTree(target);
    assert.isUndefined(
      axe.testUtils.getCheckEvaluate('hidden-content')(
        target,
        undefined,
        virtualTarget
      )
    );

    let content = document.querySelector('#content');
    let virtualContent = axe.utils.getNodeFromTree(content);
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('hidden-content')(
        content,
        undefined,
        virtualContent
      )
    );
  });
});
