/* global xit */
describe('hidden content', () => {
  const html = axe.testUtils.html;

  const fixture = document.getElementById('fixture');
  const shadowSupport = axe.testUtils.shadowSupport.v1;
  const checkSetup = axe.testUtils.checkSetup;
  const checkContext = axe.testUtils.MockCheckContext();

  afterEach(() => {
    fixture.innerHTML = '';
    checkContext.reset();
    axe._tree = undefined;
  });

  it('should return undefined with display:none and children', () => {
    const params = checkSetup(
      '<div id="target" style="display: none;"><p>Some paragraph text.</p></div>'
    );
    assert.isUndefined(
      axe.testUtils
        .getCheckEvaluate('hidden-content')
        .apply(checkContext, params)
    );
  });

  it('should return undefined with visibility:hidden and children', () => {
    const params = checkSetup(
      '<div id="target" style="visibility: hidden;"><p>Some paragraph text.</p></div>'
    );
    assert.isUndefined(
      axe.testUtils
        .getCheckEvaluate('hidden-content')
        .apply(checkContext, params)
    );
  });

  it('should return true with visibility:hidden and parent with visibility:hidden', () => {
    const params = checkSetup(
      '<div style="visibility: hidden;"><p id="target" style="visibility: hidden;">Some paragraph text.</p></div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('hidden-content')
        .apply(checkContext, params)
    );
  });

  it('should return true with aria-hidden and no content', () => {
    const params = checkSetup(
      '<span id="target" class="icon" aria-hidden="true"></span>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('hidden-content')
        .apply(checkContext, params)
    );
  });

  it('should skip whitelisted elements', () => {
    const node = document.querySelector('head');
    axe.testUtils.flatTreeSetup(document.documentElement);
    const virtualNode = axe.utils.getNodeFromTree(node);
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('hidden-content')(
        node,
        undefined,
        virtualNode
      )
    );
  });

  (shadowSupport ? it : xit)('works on elements in a shadow DOM', () => {
    fixture.innerHTML = '<div id="shadow"> <div id="content">text</div> </div>';
    const shadowRoot = document
      .getElementById('shadow')
      .attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = html`
      <div id="target" style="display:none">
        <slot></slot>
      </div>
    `;
    axe.testUtils.flatTreeSetup(fixture);

    const shadow = document.querySelector('#shadow');
    const virtualShadow = axe.utils.getNodeFromTree(shadow);
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('hidden-content')(
        shadow,
        undefined,
        virtualShadow
      )
    );

    const target = shadowRoot.querySelector('#target');
    const virtualTarget = axe.utils.getNodeFromTree(target);
    assert.isUndefined(
      axe.testUtils.getCheckEvaluate('hidden-content')(
        target,
        undefined,
        virtualTarget
      )
    );

    const content = document.querySelector('#content');
    const virtualContent = axe.utils.getNodeFromTree(content);
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('hidden-content')(
        content,
        undefined,
        virtualContent
      )
    );
  });
});
