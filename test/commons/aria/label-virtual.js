describe('aria.labelVirtual', () => {
  const html = axe.testUtils.html;

  const fixture = document.getElementById('fixture');
  const fixtureSetup = axe.testUtils.fixtureSetup;

  afterEach(() => {
    fixture.innerHTML = '';
    axe._tree = undefined;
  });

  it('is called through aria.label with a DOM node', () => {
    fixtureSetup(html`
      <div id="monkeys">monkeys</div>
      <div id="bananas">bananas</div>
      <input id="target" aria-labelledby="monkeys bananas" />
    `);
    const target = fixture.querySelector('#target');

    assert.equal(axe.commons.aria.label(target), 'monkeys bananas');
  });

  describe('aria-labelledby', () => {
    it('should join text with a single space', () => {
      fixtureSetup(html`
        <div id="monkeys">monkeys</div>
        <div id="bananas">bananas</div>
        <input id="target" aria-labelledby="monkeys bananas" />
      `);
      const target = axe.utils.querySelectorAll(axe._tree[0], '#target')[0];

      assert.equal(axe.commons.aria.labelVirtual(target), 'monkeys bananas');
    });

    it('should filter invisible elements', () => {
      fixtureSetup(html`
        <div id="monkeys">monkeys</div>
        <div id="bananas" style="display: none">bananas</div>
        <input id="target" aria-labelledby="monkeys bananas" />
      `);
      const target = axe.utils.querySelectorAll(axe._tree[0], '#target')[0];

      assert.equal(axe.commons.aria.labelVirtual(target), 'monkeys');
    });

    it('should take precedence over aria-label', () => {
      fixtureSetup(html`
        <div id="monkeys">monkeys</div>
        <div id="bananas">bananas</div>
        <input
          id="target"
          aria-labelledby="monkeys bananas"
          aria-label="nope"
        />
      `);
      const target = axe.utils.querySelectorAll(axe._tree[0], '#target')[0];

      assert.equal(axe.commons.aria.labelVirtual(target), 'monkeys bananas');
    });

    it('should ignore whitespace only labels', () => {
      fixtureSetup(html`
        <div id="monkeys"></div>
        <div id="bananas"></div>
        <input id="target" aria-labelledby="monkeys bananas" />
      `);
      const target = axe.utils.querySelectorAll(axe._tree[0], '#target')[0];

      assert.isNull(axe.commons.aria.labelVirtual(target));
    });

    // ariaLabelledByElements (reflected AOM property) coverage adapted from
    // @jcfranco's work in #5187 (issue #4943)
    it('should prefer ariaLabelledByElements over aria-labelledby', () => {
      fixtureSetup(html`
        <div id="monkeys">monkeys</div>
        <div id="bananas">bananas</div>
        <input id="target" aria-labelledby="monkeys" />
      `);
      const target = axe.utils.querySelectorAll(axe._tree[0], '#target')[0];
      target.actualNode.ariaLabelledByElements = [
        fixture.querySelector('#bananas')
      ];
      assert.equal(axe.commons.aria.labelVirtual(target), 'bananas');
    });

    it('should prefer ariaLabelledByElements over aria-labelledby and aria-label', () => {
      fixtureSetup(html`
        <div id="monkeys">monkeys</div>
        <div id="bananas">bananas</div>
        <input id="target" aria-labelledby="monkeys" aria-label="grapes" />
      `);
      const target = axe.utils.querySelectorAll(axe._tree[0], '#target')[0];
      target.actualNode.ariaLabelledByElements = [
        fixture.querySelector('#bananas')
      ];
      assert.equal(axe.commons.aria.labelVirtual(target), 'bananas');
    });
  });

  describe('aria-label', () => {
    it('should detect it', () => {
      fixtureSetup('<input id="target" aria-label="monkeys">');
      const target = axe.utils.querySelectorAll(axe._tree[0], '#target')[0];

      assert.equal(axe.commons.aria.labelVirtual(target), 'monkeys');
    });

    it('should ignore whitespace only labels', () => {
      fixtureSetup('<input id="target" aria-label="   \n	">');
      const target = axe.utils.querySelectorAll(axe._tree[0], '#target')[0];

      assert.isNull(axe.commons.aria.labelVirtual(target));
    });
  });

  describe('elementInternals', () => {
    it('returns the visible text of aria-labelledby via elementInternals', () => {
      fixtureSetup(html`
        <div id="monkey-label">monkey</div>
        <testutils-element
          id="target"
          with-aria-labelledby="monkey-label"
        ></testutils-element>
      `);
      const target = axe.utils.querySelectorAll(axe._tree[0], '#target')[0];
      assert.equal(axe.commons.aria.labelVirtual(target), 'monkey');
    });

    it('returns the aria-label text via elementInternals', () => {
      fixtureSetup(
        html`<testutils-element
          id="target"
          with-aria-label="my label"
        ></testutils-element>`
      );
      const target = axe.utils.querySelectorAll(axe._tree[0], '#target')[0];
      assert.equal(axe.commons.aria.labelVirtual(target), 'my label');
    });
  });
});
