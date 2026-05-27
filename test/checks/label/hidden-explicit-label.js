describe('hidden-explicit-label', () => {
  const shadowCheckSetup = axe.testUtils.shadowCheckSetup;
  const checkContext = axe.testUtils.MockCheckContext();
  const checkSetup = axe.testUtils.checkSetup;
  const check = checks['hidden-explicit-label'];

  afterEach(() => {
    checkContext.reset();
  });

  it('should return true if a hidden non-empty label is present', () => {
    const args = checkSetup(
      '<label for="target" style="display:none">Text</label><input type="text" id="target">',
      {},
      '#target'
    );
    assert.isTrue(check.evaluate.apply(check, args));
  });

  it('should return false if a visible non-empty label is present', () => {
    const args = checkSetup(
      '<label for="target">Label</label><input type="text" id="target">'
    );
    assert.isFalse(check.evaluate.apply(check, args));
  });

  it('should return true if an invisible empty label is present', () => {
    const args = checkSetup(
      '<label for="target" style="display: none;"></label><input type="text" id="target">'
    );
    assert.isTrue(check.evaluate.apply(check, args));
  });

  it('should return true if content is inside of shadow DOM', () => {
    const params = shadowCheckSetup(
      '<div></div>',
      '<label for="target" style="display:none">Text</label><input type="text" id="target">'
    );

    assert.isTrue(check.evaluate.apply(shadowCheckSetup, params));
  });

  it('should return false if part of the pairing is inside of shadow DOM', () => {
    const params = shadowCheckSetup(
      '<div><label for="target" style="display:none">Text</label></div>',
      '<input type="text" id="target">'
    );

    assert.isFalse(check.evaluate.apply(shadowCheckSetup, params));
  });

  it('should fail when the label has aria-hidden=true', () => {
    let html = '';
    html += '<div>';
    html += '  <label for="target" aria-hidden="true">';
    html += '    Hello world';
    html += '  </label>';
    html += '  <input id="target">';
    html += '</div>';
    const args = checkSetup(html, {}, '#target');
    assert.isTrue(check.evaluate.apply(check, args));
  });

  describe('if the label is hidden', () => {
    describe('and the element has an accessible name', () => {
      it('should not fail', () => {
        let html = '';

        html += '<div>';
        html += '  <label for="target" style="display:none">';
        html += '    Hello world';
        html += '  </label>';
        html += '  <input id="target" title="Hi">';
        html += '</div>';

        const args = checkSetup(html, {}, '#target');
        assert.isFalse(check.evaluate.apply(check, args));
      });
    });
  });

  describe('SerialVirtualNode', () => {
    it('should return false if no id', () => {
      const vNode = new axe.SerialVirtualNode({
        nodeName: 'input',
        attributes: {
          type: 'text'
        }
      });
      assert.isFalse(
        axe.testUtils.getCheckEvaluate('hidden-explicit-label')(null, {}, vNode)
      );
    });

    it('should return undefined if it has id', () => {
      const vNode = new axe.SerialVirtualNode({
        nodeName: 'input',
        attributes: {
          type: 'text',
          id: 'foobar'
        }
      });
      assert.isUndefined(
        axe.testUtils.getCheckEvaluate('hidden-explicit-label')(null, {}, vNode)
      );
    });
  });
});
