describe('aria-errormessage', () => {
  const { html, queryFixture, checkSetup, MockCheckContext } = axe.testUtils;
  const checkContext = MockCheckContext();

  afterEach(() => {
    checkContext.reset();
  });

  it('should return false if aria-errormessage value is invalid', () => {
    const vNode = queryFixture(html`
      <div id="target" aria-errormessage="plain" aria-invalid="true">
        <div id="plain"></div>
      </div>
    `);
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return undefined if aria-errormessage references an element that does not exist', () => {
    const vNode = queryFixture(html`
      <div id="target" aria-errormessage="plain" aria-invalid="true">
        <div></div>
      </div>
    `);
    assert.isUndefined(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true if aria-errormessage id is alert', () => {
    const vNode = queryFixture(html`
      <div id="target" aria-errormessage="alert" aria-invalid="true">
        <div id="alert" role="alert"></div>
      </div>
    `);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true if aria-errormessage id is aria-live=assertive', () => {
    const vNode = queryFixture(html`
      <div id="target" aria-errormessage="live" aria-invalid="true">
        <div id="live" aria-live="assertive"></div>
      </div>
    `);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true if aria-errormessage id is aria-describedby', () => {
    const vNode = queryFixture(html`
      <div
        id="target"
        aria-errormessage="plain"
        aria-describedby="plain"
        aria-invalid="true"
      >
        <div id="plain"></div>
      </div>
    `);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false if aria-errormessage has multiple ids (unsupported)', () => {
    const vNode = queryFixture(html`
      <input
        id="target"
        aria-invalid="true"
        aria-describedby="error1 error2"
        aria-errormessage="error1 error2"
      />
      <div id="error1">Error 1</div>
      <div id="error2">Error 2</div>
    `);
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, {
      messageKey: 'unsupported',
      values: ['error1', 'error2']
    });
  });

  it('should return false if aria-errormessage has multiple ids even when one is in aria-describedby', () => {
    const vNode = queryFixture(html`
      <input
        id="target"
        aria-invalid="true"
        aria-describedby="error1"
        aria-errormessage="error1 error2"
      />
      <div id="error1">Error 1</div>
      <div id="error2">Error 2</div>
    `);
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, {
      messageKey: 'unsupported',
      values: ['error1', 'error2']
    });
  });

  it('should return false if aria-errormessage has multiple ids even when none are in aria-describedby', () => {
    const vNode = queryFixture(html`
      <input
        id="target"
        aria-invalid="true"
        aria-describedby="other"
        aria-errormessage="error1 error2"
      />
      <div id="other">Other</div>
      <div id="error1">Error 1</div>
      <div id="error2">Error 2</div>
    `);
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, {
      messageKey: 'unsupported',
      values: ['error1', 'error2']
    });
  });

  it('sets an unsupported message when aria-errormessage contains multiple ids', () => {
    const vNode = queryFixture(html`
      <div id="target" aria-errormessage=" foo  bar 	baz  " aria-invalid="true">
        <div id="plain"></div>
      </div>
    `);
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, {
      messageKey: 'unsupported',
      values: ['foo', 'bar', 'baz']
    });
  });

  it('returns true when aria-errormessage is empty, if that is allowed', () => {
    axe.configure({
      standards: {
        ariaAttrs: {
          'aria-errormessage': {
            allowEmpty: true
          }
        }
      }
    });
    const vNode = queryFixture(
      '<div id="target" aria-errormessage=" " aria-invalid="true"></div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true when aria-invalid is not set', () => {
    const vNode = queryFixture(html`
      <div id="target" aria-errormessage="plain">
        <div id="plain"></div>
      </div>
    `);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true when aria-invalid=false', () => {
    const vNode = queryFixture(html`
      <div id="target" aria-errormessage="plain" aria-invalid="false">
        <div id="plain"></div>
      </div>
    `);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, null, null, vNode)
    );
  });

  it('returns false when aria-errormessage is empty, if that is not allowed', () => {
    axe.configure({
      standards: {
        ariaAttrs: {
          'aria-errormessage': {
            allowEmpty: false
          }
        }
      }
    });
    const vNode = queryFixture(
      '<div id="target" aria-errormessage=" " aria-invalid="true"></div>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false when hidden attribute is used', () => {
    const vNode = queryFixture(html`
      <input
        type="text"
        id="target"
        aria-invalid="true"
        aria-errormessage="id-message-1"
      />
      <div id="id-message-1" hidden>Error message 1</div>
    `);
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, {
      messageKey: 'hidden',
      values: ['id-message-1']
    });
  });

  it('should return false when display: "none" is used', () => {
    const vNode = queryFixture(html`
      <input
        type="text"
        id="target"
        aria-invalid="true"
        aria-errormessage="id-message-1"
      />
      <div id="id-message-1" style="display: none">Error message 1</div>
    `);
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, {
      messageKey: 'hidden',
      values: ['id-message-1']
    });
  });

  it('should return false when visibility: "hidden" is used', () => {
    const vNode = queryFixture(html`
      <input
        type="text"
        id="target"
        aria-invalid="true"
        aria-errormessage="id-message-1"
      />
      <div id="id-message-1" style="visibility: hidden">Error message 1</div>
    `);
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, {
      messageKey: 'hidden',
      values: ['id-message-1']
    });
  });

  it('should return false when aria-hidden=true is used', () => {
    const vNode = queryFixture(html`
      <input
        type="text"
        id="target"
        aria-invalid="true"
        aria-errormessage="id-message-1"
      />
      <div id="id-message-1" aria-hidden="true">Error message 1</div>
    `);
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, {
      messageKey: 'hidden',
      values: ['id-message-1']
    });
  });

  it('should return true when aria-hidden=false is used', () => {
    const vNode = queryFixture(html`
      <input
        type="text"
        id="target"
        aria-invalid="true"
        aria-errormessage="id-message-1"
      />
      <div id="id-message-1" aria-live="assertive" aria-hidden="false">
        Error message 1
      </div>
    `);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true when no hidden functionality is used', () => {
    const vNode = queryFixture(html`
      <input
        type="text"
        id="target"
        aria-invalid="true"
        aria-errormessage="id-message-1"
      />
      <div id="id-message-1" aria-live="assertive">Error message 1</div>
    `);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return undefined if aria-errormessage value crosses shadow boundary', () => {
    const params = checkSetup(
      html`<div id="target" aria-errormessage="live" aria-invalid="true">
        <template shadowrootmode="open">
          <div id="live" aria-live="assertive"></div>
        </template>
      </div>`
    );
    assert.isUndefined(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .apply(checkContext, params)
    );
  });

  it('should return false if aria-errormessage and invalid reference are both inside shadow dom', () => {
    const params = checkSetup(
      html`<div>
        <template shadowrootmode="open">
          <div id="target" aria-errormessage="live" aria-invalid="true"></div>
          <div id="live"></div>
        </template>
      </div>`
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .apply(checkContext, params)
    );
  });

  it('should return true if aria-errormessage and valid reference are both inside shadow dom', () => {
    const params = checkSetup(
      html`<div>
        <template shadowrootmode="open">
          <div id="target" aria-errormessage="live" aria-invalid="true"></div>
          <div id="live" aria-live="assertive"></div>
        </template>
      </div>`
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-errormessage')
        .apply(checkContext, params)
    );
  });

  describe('with a live region elsewhere on the page', () => {
    // The message can be announced through a separate live region, such as
    // an error summary that is updated on submit (see #4911)
    it('should return true if a live region on the page has content', () => {
      const vNode = queryFixture(html`
        <input id="target" aria-invalid="true" aria-errormessage="plain" />
        <div id="plain">Enter your name</div>
        <div role="status">The form has 1 error</div>
      `);
      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('aria-errormessage')
          .call(checkContext, null, null, vNode)
      );
    });

    it('should return true if an aria-live=polite region on the page has content', () => {
      const vNode = queryFixture(html`
        <input id="target" aria-invalid="true" aria-errormessage="plain" />
        <div id="plain">Enter your name</div>
        <div aria-live="polite"><p>The form has 1 error</p></div>
      `);
      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('aria-errormessage')
          .call(checkContext, null, null, vNode)
      );
    });

    it('should return true if an implicit live region on the page has content', () => {
      const vNode = queryFixture(html`
        <input id="target" aria-invalid="true" aria-errormessage="plain" />
        <div id="plain">Enter your name</div>
        <output>The form has 1 error</output>
      `);
      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('aria-errormessage')
          .call(checkContext, null, null, vNode)
      );
    });

    it('should return true if a live region in a shadow tree has content', () => {
      const vNode = queryFixture(html`
        <input id="target" aria-invalid="true" aria-errormessage="plain" />
        <div id="plain">Enter your name</div>
        <div>
          <template shadowrootmode="open">
            <div role="status">The form has 1 error</div>
          </template>
        </div>
      `);
      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('aria-errormessage')
          .call(checkContext, null, null, vNode)
      );
    });

    it('should return undefined if the live regions on the page are empty', () => {
      const vNode = queryFixture(html`
        <input id="target" aria-invalid="true" aria-errormessage="plain" />
        <div id="plain">Enter your name</div>
        <div role="alert"></div>
        <div aria-live="assertive"><span aria-hidden="true">hidden</span></div>
      `);
      assert.isUndefined(
        axe.testUtils
          .getCheckEvaluate('aria-errormessage')
          .call(checkContext, null, null, vNode)
      );
      assert.deepEqual(checkContext._data, {
        messageKey: 'emptyLiveRegion',
        values: ['plain']
      });
    });

    it('should return false if the only live region is hidden', () => {
      const vNode = queryFixture(html`
        <input id="target" aria-invalid="true" aria-errormessage="plain" />
        <div id="plain">Enter your name</div>
        <div role="status" aria-hidden="true">The form has 1 error</div>
        <div aria-live="polite" style="display: none">The form has 1 error</div>
      `);
      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('aria-errormessage')
          .call(checkContext, null, null, vNode)
      );
    });

    it('should return false if aria-live=off turns off the live region', () => {
      const vNode = queryFixture(html`
        <input id="target" aria-invalid="true" aria-errormessage="plain" />
        <div id="plain">Enter your name</div>
        <div role="status" aria-live="off">The form has 1 error</div>
      `);
      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('aria-errormessage')
          .call(checkContext, null, null, vNode)
      );
    });

    it('should return false if the errormessage element is hidden', () => {
      const vNode = queryFixture(html`
        <input id="target" aria-invalid="true" aria-errormessage="plain" />
        <div id="plain" hidden>Enter your name</div>
        <div role="status">The form has 1 error</div>
      `);
      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('aria-errormessage')
          .call(checkContext, null, null, vNode)
      );
      assert.equal(checkContext._data.messageKey, 'hidden');
    });
  });

  describe('SerialVirtualNode', () => {
    it('should return undefined', () => {
      const vNode = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          'aria-invalid': 'true',
          'aria-errormessage': 'test'
        }
      });
      assert.isUndefined(
        axe.testUtils
          .getCheckEvaluate('aria-errormessage')
          .call(checkContext, null, null, vNode)
      );
      assert.deepEqual(checkContext._data, {
        messageKey: 'idrefs',
        values: ['test']
      });
    });
  });
});
