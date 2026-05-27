describe('xml-lang-mismatch-matches', () => {
  // nested this on a per rule basis, for future-proofing writing tests for multiple rules using the same matches
  describe('for rule: html-xml-lang-mismatch', () => {
    let rule;
    let dom;
    const fixture = document.getElementById('fixture');

    beforeEach(() => {
      rule = axe.utils.getRule('html-xml-lang-mismatch');
      dom = document.createElement('html');
    });

    afterEach(() => {
      fixture.innerHTML = '';
    });

    it('is a function', () => {
      const actual = rule.matches;
      assert.isFunction(actual);
    });

    it('returns false if the element does not contain lang or xml:lang attribute', () => {
      const actual = rule.matches(dom);
      assert.isFalse(actual);
    });

    it('returns false if the element contains either/ only one of the lang or xml:lang attribute', () => {
      dom.setAttribute('lang', 'nl');
      const actual = rule.matches(dom);
      assert.isFalse(actual);
    });

    it('returns true if the element contains both lang and xml:lang attribute', () => {
      dom.setAttribute('lang', 'en');
      dom.setAttribute('xml:lang', 'nl');
      const actual = rule.matches(dom);
      assert.isTrue(actual);
    });

    it('returns false for element of type that is not HTML', () => {
      const node = document.createElement('svg');
      node.setAttribute('lang', '');
      node.setAttribute('xml:lang', 'nl');
      const actual = rule.matches(node);
      assert.isFalse(actual);
    });
  });
});
