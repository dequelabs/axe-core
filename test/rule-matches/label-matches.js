describe('label-matches', () => {
  const html = axe.testUtils.html;

  const fixture = document.getElementById('fixture');
  const queryFixture = axe.testUtils.queryFixture;
  let rule;

  beforeEach(() => {
    fixture.innerHTML = '';
    rule = axe.utils.getRule('label');
  });

  it('returns true for non-input elements', () => {
    const vNode = queryFixture('<textarea id="target"></textarea>');
    assert.isTrue(rule.matches(null, vNode));
  });

  it('returns true for input elements without type', () => {
    const vNode = queryFixture('<input id="target" />');

    assert.isTrue(rule.matches(null, vNode));
  });

  it('returns false for input buttons', () => {
    ['button', 'submit', 'image', 'reset'].forEach(type => {
      const vNode = queryFixture(html`<input id="target" type="${type}" />`);
      assert.isFalse(rule.matches(null, vNode));
    });
  });

  it('returns false for input elements type=hidden', () => {
    const vNode = queryFixture('<input id="target" type="hidden" />');

    assert.isFalse(rule.matches(null, vNode));
  });

  it('returns true for other input types', () => {
    ['text', 'password', 'url', 'range', 'date', 'checkbox', 'radio'].forEach(
      type => {
        const vNode = queryFixture(html`<input id="target" type="${type}" />`);
        assert.isTrue(rule.matches(null, vNode));
      }
    );
  });
});
