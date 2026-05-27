describe('forms.isDisabled', () => {
  const html = axe.testUtils.html;
  const isDisabled = axe.commons.forms.isDisabled;
  const fixtureSetup = axe.testUtils.fixtureSetup;
  const fixture = document.getElementById('fixture');

  afterEach(() => {
    fixture.innerHTML = '';
  });

  describe('with disabled attr', () => {
    it('returns false when not set', () => {
      fixtureSetup('<input type="text" />');
      const node = axe.utils.querySelectorAll(axe._tree[0], 'input')[0];

      assert.isFalse(isDisabled(node));
    });

    it('returns true for an element that can be disabled', () => {
      fixtureSetup('<input type="text" disabled />');
      const node = axe.utils.querySelectorAll(axe._tree[0], 'input')[0];

      assert.isTrue(isDisabled(node));
    });

    it('returns false for an element that can not be disabled', () => {
      fixtureSetup('<span disabled>Hello</span>');
      const node = axe.utils.querySelectorAll(axe._tree[0], 'span')[0];

      assert.isFalse(isDisabled(node));
    });

    it('returns true when disabled has a value', () => {
      fixtureSetup('<input type="text" disabled="yes" />');
      const node = axe.utils.querySelectorAll(axe._tree[0], 'input')[0];

      assert.isTrue(isDisabled(node));
    });

    it('returns true when in a disabled fieldset', () => {
      fixtureSetup(html`
        <fieldset disabled>
          <span>Hello world</span>
        </fieldset>
      `);
      const node = axe.utils.querySelectorAll(axe._tree[0], 'span')[0];

      assert.isTrue(isDisabled(node));
    });

    it('returns true when in a disabled button', () => {
      fixtureSetup(html`
        <button disabled>
          <span>Hello world</span>
        </button>
      `);
      const node = axe.utils.querySelectorAll(axe._tree[0], 'span')[0];

      assert.isTrue(isDisabled(node));
    });

    it('returns true for an ancestor in the flat tree that can be disabled', () => {
      fixture.innerHTML = '<fieldset disabled><section></section</fieldset>';
      const shadowRoot = fixture
        .querySelector('section')
        .attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = '<input type="text" />';
      axe._tree = axe.utils.getFlattenedTree(fixture);

      const node = axe.utils.querySelectorAll(axe._tree[0], 'input')[0];
      assert.isTrue(isDisabled(node));
    });
  });

  describe('with aria-disabled attr', () => {
    it('returns true for an element with aria-disabled=true', () => {
      fixtureSetup('<span aria-disabled="true">hello</span>');
      const node = axe.utils.querySelectorAll(axe._tree[0], 'span')[0];

      assert.isTrue(isDisabled(node));
    });

    it('returns false for an element when aria-disabled is not true', () => {
      fixtureSetup('<span aria-disabled="not true">hello</span>');
      const node = axe.utils.querySelectorAll(axe._tree[0], 'span')[0];

      assert.isFalse(isDisabled(node));
    });

    it('returns true if the closest ancestor with aria-disabled is set to true', () => {
      fixtureSetup(html`
        <section aria-disabled="false">
          <div aria-disabled="true"><span>hello</span></div>
        </section>
      `);
      const node = axe.utils.querySelectorAll(axe._tree[0], 'span')[0];

      assert.isTrue(isDisabled(node));
    });

    it('returns false if the closest ancestor with aria-disabled is set to false', () => {
      fixtureSetup(html`
        <section aria-disabled="true">
          <div aria-disabled="false"><span>hello</span></div>
        </section>
      `);
      const node = axe.utils.querySelectorAll(axe._tree[0], 'span')[0];

      assert.isFalse(isDisabled(node));
    });
  });

  describe('with both disabled and aria-disabled', () => {
    it('returns true when aria-disabled=false and disabled=disabled', () => {
      fixtureSetup(html`
        <fieldset aria-disabled="false" disabled>
          <span>hello</span>
        </fieldset>
      `);
      const node = axe.utils.querySelectorAll(axe._tree[0], 'span')[0];

      assert.isTrue(isDisabled(node));
    });
  });
});
