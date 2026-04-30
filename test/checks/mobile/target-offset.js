describe('target-offset tests', () => {
  const html = axe.testUtils.html;
  const checkContext = axe.testUtils.MockCheckContext();
  const { checkSetup, getCheckEvaluate } = axe.testUtils;
  const checkEvaluate = getCheckEvaluate('target-offset');

  afterEach(() => {
    checkContext.reset();
  });

  it('returns true when there are no other nearby targets', () => {
    const checkArgs = checkSetup(html`
      <a
        href="#"
        id="target"
        style="
      display: inline-block; width:16px; height:16px;
      "
        >x</a
      >
    `);

    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
    assert.equal(checkContext._data.minOffset, 24);
    assert.closeTo(checkContext._data.closestOffset, 24, 0.2);
  });

  it('returns true when the offset is 24px', () => {
    const checkArgs = checkSetup(html`
      <a
        href="#"
        id="target"
        style="
      display: inline-block; width:16px; height:16px; margin-right: 8px
      "
        >x</a
      >
      <a
        href="#"
        style="
      display: inline-block; width:16px; height:16px;
      "
        >x</a
      >
    `);

    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
    assert.equal(checkContext._data.minOffset, 24);
    assert.closeTo(checkContext._data.closestOffset, 24, 0.2);
  });

  it('returns true when wrapped inline elements offset is 24px', () => {
    const checkArgs = checkSetup(html`
      <div
        style="font-size: 18px; margin: 1em auto; width: 6em; line-height: 1.3;"
      >
        <a id="target" href="/foo" class="A"> Hello hello hello</a>
        <a href="/bar" class="B">Hello hello hello</a>
      </div>
    `);

    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
    assert.equal(checkContext._data.minOffset, 24);
    assert.closeTo(checkContext._data.closestOffset, 24, 0.2);
  });

  describe('when the offset is insufficient', () => {
    it('returns false for targets in the tab order', () => {
      const checkArgs = checkSetup(html`
        <a
          href="#"
          id="target"
          style="
        display: inline-block; width:16px; height:16px; margin-right: 7px
        "
          >x</a
        >
        <a
          href="#"
          style="
        display: inline-block; width:16px; height:16px;
        "
          >x</a
        >
      `);

      assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
      assert.isUndefined(checkContext._data.messageKey);
      assert.equal(checkContext._data.minOffset, 24);
      assert.closeTo(checkContext._data.closestOffset, 22, 0.2);
    });

    it('returns undefined for targets not in the tab order', () => {
      const checkArgs = checkSetup(html`
        <a
          href="#"
          id="target"
          tabindex="-1"
          style="
        display: inline-block; width:16px; height:16px; margin-right: 7px
        "
          >x</a
        >
        <a
          href="#"
          style="
        display: inline-block; width:16px; height:16px;
        "
          >x</a
        >
      `);

      assert.isUndefined(checkEvaluate.apply(checkContext, checkArgs));
      assert.isUndefined(checkContext._data.messageKey);
      assert.equal(checkContext._data.minOffset, 24);
      assert.closeTo(checkContext._data.closestOffset, 22, 0.2);
    });

    it('returns false when wrapped inline elements offset is <24px', () => {
      const checkArgs = checkSetup(html`
        <div
          style="font-size: 18px; margin: 1em auto; width: 6em; line-height: 1.1;"
        >
          <a id="target" href="/foo" class="A"> Hello hello hello</a>
          <a href="/bar" class="B">Hello hello hello</a>
        </div>
      `);

      assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
      assert.equal(checkContext._data.minOffset, 24);
      assert.closeTo(checkContext._data.closestOffset, 20, 3);
    });

    it('returns false when one line of a wrapped inline elements offset is <24px', () => {
      const checkArgs = checkSetup(html`
        <div
          style="font-size: 18px; margin: 1em auto; width: 6em; line-height: 1.3;"
        >
          <a id="target" href="/foo" class="A"> Hello hello hello</a>
          <a style="margin-left: -30px" href="/bar" class="B"
            >Hello hello hello</a
          >
        </div>
      `);

      assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
      assert.equal(checkContext._data.minOffset, 24);
      assert.closeTo(checkContext._data.closestOffset, 15.5, 5);
    });
  });

  it('ignores non-widget elements as neighbors', () => {
    const checkArgs = checkSetup(html`
      <a
        href="#"
        id="target"
        style="
      display: inline-block; width:16px; height:16px; margin-right: 7px
      "
        >x</a
      >
      <div
        style="
      display: inline-block; width:16px; height:16px;
      "
      >
        x
      </div>
    `);

    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
    assert.equal(checkContext._data.minOffset, 24);
    assert.closeTo(checkContext._data.closestOffset, 24, 0.2);
  });

  it('ignores non-focusable widget elements as neighbors', () => {
    const checkArgs = checkSetup(html`
      <a
        href="#"
        id="target"
        style="
      display: inline-block; width:16px; height:16px; margin-right: 7px
      "
        >x</a
      >
      <button
        disabled
        style="
      display: inline-block; width:16px; height:16px;
      "
      >
        x
      </button>
    `);

    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
    assert.equal(checkContext._data.minOffset, 24);
    assert.closeTo(checkContext._data.closestOffset, 24, 0.2);
  });

  it('ignores obscured widget elements as neighbors', () => {
    const checkArgs = checkSetup(html`
      <div style="position: fixed; bottom: 0">
        <a href="#">Go to top</a>
      </div>
      <div
        id="target"
        style="position: fixed; bottom: 0; left: 0; right: 0; background: #eee"
      >
        Cookies: <a href="#">Accept all cookies</a>
      </div>
    `);

    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
    assert.equal(checkContext._data.minOffset, 24);
    assert.closeTo(checkContext._data.closestOffset, 24, 0.2);
  });

  it('sets all elements that are too close as related nodes', () => {
    const checkArgs = checkSetup(html`
      <a
        href="#"
        id="left"
        style="
      display: inline-block; width:16px; height:16px;
      "
        >x</a
      >
      <a
        href="#"
        id="target"
        style="
      display: inline-block; width:16px; height:16px; margin-right: 4px
      "
        >x</a
      >
      <a
        href="#"
        id="right"
        style="
      display: inline-block; width:16px; height:16px;
      "
        >x</a
      >
    `);
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
    assert.equal(checkContext._data.minOffset, 24);
    assert.closeTo(checkContext._data.closestOffset, 8, 0.2);

    const relatedIds = checkContext._relatedNodes.map(node => {
      return `#${node.id}`;
    });
    assert.deepEqual(relatedIds, ['#left', '#right']);
  });

  it('returns undefined if there are too many focusable widgets', () => {
    let html = '';
    for (let i = 0; i < 100; i++) {
      html += html`
        <tr>
          <td><a href="#">A</a></td>
          <td><button>B</button></td>
          <td><button>C</button></td>
          <td><button>D</button></td>
        </tr>
      `;
    }
    const checkArgs = checkSetup(html`
      <div
        id="target"
        role="tabpanel"
        tabindex="0"
        style="display:inline-block"
      >
        <table id="tab-table">
          ${html}
        </table>
      </div>
    `);
    assert.isUndefined(checkEvaluate.apply(checkContext, checkArgs));
    assert.deepEqual(checkContext._data, {
      messageKey: 'tooManyRects',
      closestOffset: 0,
      minOffset: 24
    });
  });

  describe('when neighbors are focusable but not tabbable', () => {
    it('returns undefined if all neighbors are not tabbable', () => {
      const checkArgs = checkSetup(html`
        <a
          href="#"
          id="left"
          tabindex="-1"
          style="
        display: inline-block; width:16px; height:16px;
        "
          >x</a
        >
        <a
          href="#"
          id="target"
          style="
        display: inline-block; width:16px; height:16px; margin-right: 4px
        "
          >x</a
        >
        <a
          href="#"
          id="right"
          tabindex="-1"
          style="
        display: inline-block; width:16px; height:16px;
        "
          >x</a
        >
      `);
      assert.isUndefined(checkEvaluate.apply(checkContext, checkArgs));
      assert.equal(checkContext._data.messageKey, 'nonTabbableNeighbor');
      assert.equal(checkContext._data.minOffset, 24);
      assert.closeTo(checkContext._data.closestOffset, 8, 0.2);

      const relatedIds = checkContext._relatedNodes.map(node => {
        return `#${node.id}`;
      });
      assert.deepEqual(relatedIds, ['#left', '#right']);
    });

    it('returns false if some but not all neighbors are not tabbable', () => {
      const checkArgs = checkSetup(html`
        <a
          href="#"
          id="left"
          style="
        display: inline-block; width:16px; height:16px;
        "
          >x</a
        >
        <a
          href="#"
          id="target"
          style="
        display: inline-block; width:16px; height:16px; margin-right: 4px
        "
          >x</a
        >
        <a
          href="#"
          id="right"
          tabindex="-1"
          style="
        display: inline-block; width:16px; height:16px;
        "
          >x</a
        >
      `);
      assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
      assert.isUndefined(checkContext._data.messageKey);
      assert.equal(checkContext._data.minOffset, 24);
      assert.closeTo(checkContext._data.closestOffset, 8, 0.2);

      const relatedIds = checkContext._relatedNodes.map(node => {
        return `#${node.id}`;
      });
      assert.deepEqual(relatedIds, ['#left', '#right']);
    });

    it('returns true if the target is 10x the minOffset', () => {
      const checkArgs = checkSetup(html`
        <a
          href="#"
          id="left"
          style="
        display: inline-block; width:16px; height:16px;
        "
          >x</a
        >
        <a
          href="#"
          id="target"
          style="
        display: inline-block; width:240px; height:240px; margin-right: 4px
        "
          >x</a
        >
        <a
          href="#"
          id="right"
          style="
        display: inline-block; width:16px; height:16px;
        "
          >x</a
        >
      `);
      assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
      assert.equal(checkContext._data.minOffset, 24);
      assert.equal(checkContext._data.messageKey, 'large');
    });
  });
});
