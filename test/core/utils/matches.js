describe('utils.matches', () => {
  const matches = axe.utils.matches;
  const fixture = document.querySelector('#fixture');
  const queryFixture = axe.testUtils.queryFixture;
  const convertSelector = axe._thisWillBeDeletedDoNotUse.utils.convertSelector;

  afterEach(() => {
    fixture.innerHTML = '';
  });

  describe('tag', () => {
    it('returns true if tag matches', () => {
      const virtualNode = queryFixture('<h1 id="target">foo</h1>');
      assert.isTrue(matches(virtualNode, 'h1'));
    });

    it('returns false if the tag does not match', () => {
      const virtualNode = queryFixture('<h1 id="target">foo</h1>');
      assert.isFalse(matches(virtualNode, 'div'));
    });

    it('is case sensitive for XHTML', () => {
      const virtualNode = queryFixture('<H1 id="target">foo</H1>');
      delete virtualNode._cache.props;
      virtualNode._isXHTML = true;
      assert.isFalse(matches(virtualNode, 'h1'));
    });

    it('is case insensitive for HTML, but not for XHTML', () => {
      const virtualNode = queryFixture('<H1 id="target">foo</H1>');
      delete virtualNode._cache.props;
      virtualNode._isXHTML = true;
      assert.isFalse(matches(virtualNode, 'h1'));
    });
  });

  describe('classes', () => {
    it('returns true if all classes match', () => {
      const virtualNode = queryFixture(
        '<span id="target" class="foo bar baz"></span>'
      );
      assert.isTrue(matches(virtualNode, '.foo.bar.baz'));
    });

    it('returns false if some classes do not match', () => {
      const virtualNode = queryFixture(
        '<span id="target" class="foo bar baz"></span>'
      );
      assert.isFalse(matches(virtualNode, '.foo.bar.bazz'));
    });

    it('returns false if any classes are missing', () => {
      const virtualNode = queryFixture(
        '<span id="target" class="foo bar"></span>'
      );
      assert.isFalse(matches(virtualNode, '.foo.bar.baz'));
    });
  });

  describe('attributes', () => {
    it('returns true if attribute exists', () => {
      const virtualNode = queryFixture(
        '<span id="target" foo="baz" bar="foo" baz="bar"></span>'
      );
      assert.isTrue(matches(virtualNode, '[foo]'));
    });

    it('returns true if attribute matches', () => {
      const virtualNode = queryFixture(
        '<span id="target" foo="baz" bar="foo" baz="bar"></span>'
      );
      assert.isTrue(matches(virtualNode, '[foo=baz]'));
    });

    it('returns true if all attributes match', () => {
      const virtualNode = queryFixture(
        '<span id="target" foo="baz" bar="foo" baz="bar"></span>'
      );
      assert.isTrue(matches(virtualNode, '[foo="baz"][bar="foo"][baz="bar"]'));
    });

    it('returns false if some attributes do not match', () => {
      const virtualNode = queryFixture(
        '<span id="target" foo="baz" bar="foo" baz="bar"></span>'
      );
      assert.isFalse(matches(virtualNode, '[foo="baz"][bar="foo"][baz="baz"]'));
    });

    it('returns false if any attributes are missing', () => {
      const virtualNode = queryFixture(
        '<span id="target" foo="baz" baz="bar"></span>'
      );
      assert.isFalse(matches(virtualNode, '[foo="baz"][bar="foo"][baz="bar"]'));
    });

    it('returns true if attribute starts with value', () => {
      const virtualNode = queryFixture(
        '<span id="target" foo="bazaphone" bar="foo" baz="bar"></span>'
      );
      assert.isTrue(matches(virtualNode, '[foo^="baz"]'));
    });

    it('returns true if attribute ends with value', () => {
      const virtualNode = queryFixture(
        '<span id="target" foo="bazaphone" bar="foo" baz="bar"></span>'
      );
      assert.isTrue(matches(virtualNode, '[foo$="hone"]'));
    });

    it('returns true if attribute contains value', () => {
      const virtualNode = queryFixture(
        '<span id="target" foo="bazaphone" bar="foo" baz="bar"></span>'
      );
      assert.isTrue(matches(virtualNode, '[foo*="baz"]'));
    });

    it('returns true if attribute has value', () => {
      const virtualNode = queryFixture(
        '<span id="target" foo="bar baz" bar="foo" baz="bar"></span>'
      );
      assert.isTrue(matches(virtualNode, '[foo~="baz"]'));
    });

    it('returns true if attribute matches having an empty value', () => {
      const virtualNode = queryFixture(
        '<span id="target" foo="" bar="foo" baz="bar"></span>'
      );
      assert.isTrue(matches(virtualNode, '[foo=""]'));
    });

    it('returns true if attribute matches not having value', () => {
      const virtualNode = queryFixture(
        '<span id="target" foo bar="foo" baz="bar"></span>'
      );
      assert.isTrue(matches(virtualNode, '[foo=""]'));
    });

    it('returns false if attribute should not have value', () => {
      const virtualNode = queryFixture(
        '<span id="target" foo="bar baz" bar="foo" baz="bar"></span>'
      );
      assert.isFalse(matches(virtualNode, '[foo=""]'));
    });

    it('should return true if attribute exists without value', () => {
      const virtualNode = queryFixture(
        '<span id="target" foo bar="foo" baz="bar"></span>'
      );
      assert.isTrue(matches(virtualNode, '[foo]'));
    });
  });

  describe('id', () => {
    it('returns true if id matches', () => {
      const virtualNode = queryFixture('<h1 id="target">foo</h1>');
      assert.isTrue(matches(virtualNode, '#target'));
    });

    it('returns false if the id does not match', () => {
      const virtualNode = queryFixture('<h1 id="target">foo</h1>');
      assert.isFalse(matches(virtualNode, '#notTarget'));
    });
  });

  describe('pseudos', () => {
    it('throws error if pseudo is not implemented', () => {
      const virtualNode = queryFixture('<h1 id="target">foo</h1>');
      assert.throws(() => {
        matches(virtualNode, 'h1:empty');
      });
      assert.throws(() => {
        matches(virtualNode, 'h1::before');
      });
    });

    describe(':not', () => {
      it('returns true if :not matches using tag', () => {
        const virtualNode = queryFixture('<h1 id="target">foo</h1>');
        assert.isTrue(matches(virtualNode, 'h1:not(span)'));
      });

      it('returns true if :not matches using class', () => {
        const virtualNode = queryFixture('<h1 id="target">foo</h1>');
        assert.isTrue(matches(virtualNode, 'h1:not(.foo)'));
      });

      it('returns true if :not matches using attribute', () => {
        const virtualNode = queryFixture('<h1 id="target">foo</h1>');
        assert.isTrue(matches(virtualNode, 'h1:not([class])'));
      });

      it('returns true if :not matches using id', () => {
        const virtualNode = queryFixture('<h1 id="target">foo</h1>');
        assert.isTrue(matches(virtualNode, 'h1:not(#foo)'));
      });

      it('returns true if :not matches none of the selectors', () => {
        const virtualNode = queryFixture('<h1 id="target">foo</h1>');
        assert.isTrue(matches(virtualNode, 'h1:not([role=heading], span)'));
      });

      it('returns false if :not matches element', () => {
        const virtualNode = queryFixture('<h1 id="target">foo</h1>');
        assert.isFalse(matches(virtualNode, 'h1:not([id])'));
      });

      it('returns false if :not matches one of the selectors', () => {
        const virtualNode = queryFixture('<h1 id="target">foo</h1>');
        assert.isFalse(matches(virtualNode, 'h1:not([role=heading], [id])'));
      });
    });

    describe(':is', () => {
      it('returns true if :is matches using tag', () => {
        const virtualNode = queryFixture('<h1 id="target">foo</h1>');
        assert.isTrue(matches(virtualNode, ':is(h1)'));
      });

      it('returns true if :is matches using class', () => {
        const virtualNode = queryFixture(
          '<h1 id="target" class="foo">foo</h1>'
        );
        assert.isTrue(matches(virtualNode, 'h1:is(.foo)'));
      });

      it('returns true if :is matches using attribute', () => {
        const virtualNode = queryFixture(
          '<h1 id="target" class="foo">foo</h1>'
        );
        assert.isTrue(matches(virtualNode, 'h1:is([class])'));
      });

      it('returns true if :is matches using id', () => {
        const virtualNode = queryFixture('<h1 id="target">foo</h1>');
        assert.isTrue(matches(virtualNode, 'h1:is(#target)'));
      });

      it('returns true if :is matches one of the selectors', () => {
        const virtualNode = queryFixture('<h1 id="target">foo</h1>');
        assert.isTrue(matches(virtualNode, ':is([role=heading], h1)'));
      });

      it('returns true if :is matches complex selector', () => {
        const virtualNode = queryFixture('<div><h1 id="target">foo</h1></div>');
        assert.isTrue(matches(virtualNode, 'h1:is(div > #target)'));
      });

      it('returns false if :is does not match element', () => {
        const virtualNode = queryFixture('<h1 id="target">foo</h1>');
        assert.isFalse(matches(virtualNode, 'h1:is([class])'));
      });

      it('returns false if :is matches none of the selectors', () => {
        const virtualNode = queryFixture('<h1 id="target">foo</h1>');
        assert.isFalse(
          matches(virtualNode, 'h1:is([class], span, #foo, .bar)')
        );
      });
    });
  });

  describe('complex', () => {
    it('returns true for complex selector', () => {
      const virtualNode = queryFixture(
        '<span id="target" class="foo bar baz"></span>'
      );
      assert.isTrue(matches(virtualNode, 'span.foo[id="target"]:not(div)'));
    });

    it('returns false if any part of the selector does not match', () => {
      const virtualNode = queryFixture(
        '<span id="target" class="foo bar baz"></span>'
      );
      assert.isFalse(matches(virtualNode, 'span.foo[id="target"]:not(span)'));
    });

    it('returns true if a comma-separated list of selectors match', () => {
      const virtualNode = queryFixture(
        '<span id="target" class="foo bar baz"></span>'
      );
      assert.isTrue(matches(virtualNode, 'div, p, span'));
    });
  });

  describe('combinator', () => {
    it('returns true if parent selector matches', () => {
      const virtualNode = queryFixture('<div><h1 id="target">foo</h1></div>');
      assert.isTrue(matches(virtualNode, 'div > h1'));
    });

    it('returns true if nested parent selector matches', () => {
      const virtualNode = queryFixture(
        '<main><div><h1 id="target">foo</h1></div><main>'
      );
      assert.isTrue(matches(virtualNode, 'main > div > h1'));
    });

    it('returns true if hierarchical selector matches', () => {
      const virtualNode = queryFixture('<div><h1 id="target">foo</h1></div>');
      assert.isTrue(matches(virtualNode, 'div h1'));
    });

    it('returns true if nested hierarchical selector matches', () => {
      const virtualNode = queryFixture(
        '<div><table><tr><td><h1 id="target">foo</h1></td></tr></table></div>'
      );
      assert.isTrue(matches(virtualNode, 'div tr h1'));
    });

    it('returns true if mixed parent and hierarchical selector matches', () => {
      const virtualNode = queryFixture(
        '<div><table><tr><td><h1 id="target">foo</h1></td></tr></table></div>'
      );
      assert.isTrue(matches(virtualNode, 'div tr > td h1'));
    });

    it('returns false if parent selector does not match', () => {
      const virtualNode = queryFixture('<div><h1 id="target">foo</h1></div>');
      assert.isFalse(matches(virtualNode, 'span > h1'));
    });

    it('returns false if nested parent selector does not match', () => {
      const virtualNode = queryFixture(
        '<main><div><h1 id="target">foo</h1></div><main>'
      );
      assert.isFalse(matches(virtualNode, 'span > div > h1'));
    });

    it('returns false if hierarchical selector does not match', () => {
      const virtualNode = queryFixture('<div><h1 id="target">foo</h1></div>');
      assert.isFalse(matches(virtualNode, 'span h1'));
    });

    it('returns false if nested hierarchical selector does not match', () => {
      const virtualNode = queryFixture(
        '<div><table><tr><td><h1 id="target">foo</h1></td></tr></table></div>'
      );
      assert.isFalse(matches(virtualNode, 'div span h1'));
    });

    it('returns false if mixed parent and hierarchical selector does not match', () => {
      const virtualNode = queryFixture(
        '<div><table><tr><td><h1 id="target">foo</h1></td></tr></table></div>'
      );
      assert.isFalse(matches(virtualNode, 'div span > td h1'));
    });

    it('throws error if combinator is not implemented', () => {
      const virtualNode = queryFixture('<div></div><h1 id="target">foo</h1>');
      assert.throws(() => {
        matches(virtualNode, 'div + h1');
      });
      assert.throws(() => {
        matches(virtualNode, 'div ~ h1');
      });
    });
  });

  describe('convertSelector', () => {
    it('should set type to attrExist for attribute selector', () => {
      const expression = convertSelector('[disabled]');
      assert.equal(expression[0][0].attributes[0].type, 'attrExist');
    });

    it('should set type to attrValue for attribute value selector', () => {
      const expression = convertSelector('[aria-pressed="true"]');
      assert.equal(expression[0][0].attributes[0].type, 'attrValue');
    });

    it('should set type to attrValue for empty attribute value selector', () => {
      const expression = convertSelector('[aria-pressed=""]');
      assert.equal(expression[0][0].attributes[0].type, 'attrValue');
    });
  });
});
