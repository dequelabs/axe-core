describe('widget-not-inline-matches', () => {
  let rule;
  const { queryFixture, queryShadowFixture } = axe.testUtils;

  beforeEach(() => {
    rule = axe.utils.getRule('target-size');
  });

  it('returns true for native widgets', () => {
    const vNode = queryFixture('<button id="target"></button>');
    const node = vNode.actualNode;
    assert.isTrue(rule.matches(node, vNode));
  });

  it('returns false for non-widget elements', () => {
    const vNode = queryFixture('<div role="banner" id="target"></div>');
    const node = vNode.actualNode;
    assert.isFalse(rule.matches(node, vNode));
  });

  it('returns false for non-focusable native widgets', () => {
    const vNode = queryFixture('<button disabled id="target"></button>');
    const node = vNode.actualNode;
    assert.isFalse(rule.matches(node, vNode));
  });

  it('returns false for non-focusable custom widgets', () => {
    const vNode = queryFixture('<div role="button" id="target"></div>');
    const node = vNode.actualNode;
    assert.isFalse(rule.matches(node, vNode));
  });

  describe('non-native components', () => {
    it('returns true for a tabbable button', () => {
      const vNode = queryFixture(
        '<div role="button" tabindex="0" id="target"></div>'
      );
      const node = vNode.actualNode;
      assert.isTrue(rule.matches(node, vNode));
    });

    it('returns true for button with tabindex="-1"', () => {
      const vNode = queryFixture(
        '<div role="button" tabindex="-1" id="target"></div>'
      );
      const node = vNode.actualNode;
      assert.isTrue(rule.matches(node, vNode));
    });

    it('returns false for a non-tabbable button (widgets)', () => {
      const vNode = queryFixture('<div role="button" id="target"></div>');
      const node = vNode.actualNode;
      assert.isFalse(rule.matches(node, vNode));
    });

    it('returns true for a listbox (component)', () => {
      const vNode = queryFixture(
        '<div role="listbox" tabindex="0" id="target"></div>'
      );
      const node = vNode.actualNode;
      assert.isTrue(rule.matches(node, vNode));
    });

    it('returns true for a combobox (component)', () => {
      const vNode = queryFixture(
        '<div role="combobox" tabindex="0" id="target"></div>'
      );
      const node = vNode.actualNode;
      assert.isTrue(rule.matches(node, vNode));
    });
  });

  describe('inline components', () => {
    it('returns false for elements inline with text', () => {
      const vNode = queryFixture(
        '<p>Some ' + ' <a href="#" id="target">link</a>' + '</p>'
      );
      const node = vNode.actualNode;
      assert.isFalse(rule.matches(node, vNode));
    });

    it('returns false for multiple inline links', () => {
      const vNode = queryFixture(
        '<p>' +
          ' <a href="#" id="target">link 1</a>, ' +
          ' <a href="#">link 2</a>, ' +
          ' <a href="#">link 3</a>' +
          '</p>'
      );
      const node = vNode.actualNode;
      assert.isFalse(rule.matches(node, vNode));
    });

    it('returns true if the widget is the only element in its block parent', () => {
      const vNode = queryFixture('<p><a href="#" id="target">link</a></p>');
      const node = vNode.actualNode;
      assert.isTrue(rule.matches(node, vNode));
    });
  });

  describe('graphics (for which size may be essential)', () => {
    it('returns false for area elements', () => {
      const vNode = queryFixture(
        '<img usemap="#imgmap" src="#" alt="img"/>' +
          '<map name="imgmap">' +
          '  <area id="target" shape="circle" coords="10,10,10" href="#" alt="map" />' +
          '</map>'
      );
      const node = vNode.actualNode;
      assert.isFalse(rule.matches(node, vNode));
    });

    it('returns false SVG elements', () => {
      const vNode = queryFixture(
        '<svg role="button" tabindex="0" id="target"></svg>'
      );
      const node = vNode.actualNode;
      assert.isFalse(rule.matches(node, vNode));
    });

    it('returns false descendants of SVG elements', () => {
      const vNode = queryFixture(
        '<svg><a href="#" id="target">' +
          '  <text y="15">link</text></a>' +
          '</svg>'
      );
      const node = vNode.actualNode;
      assert.isFalse(rule.matches(node, vNode));
    });
  });

  describe('nested widget', () => {
    describe('that are is in the tab order', () => {
      it('is true when the target is in the tab order', () => {
        const vNode = queryFixture(`
          <span role="link" tabindex="0">
            Link text
            <a href="#" id="target">Nested link</a>
          </span>`);
        const node = vNode.actualNode;
        assert.isTrue(rule.matches(node, vNode));
      });

      it('is false when the target is not in the tab order', () => {
        const vNode = queryFixture(`
          <span role="link" tabindex="0">
            Link text
            <a href="#" id="target" tabindex="-1">Nested link</a>
          </span>`);
        const node = vNode.actualNode;
        assert.isFalse(rule.matches(node, vNode));
      });

      describe('within a shadow DOM tree', () => {
        it('is true when the target is in the tab order', () => {
          const vNode = queryShadowFixture(
            `<div role="link" tabindex="0"><span id="shadow"></span></div>`,
            `<a href="#" id="target">Nested link</a>`
          );
          const node = vNode.actualNode;
          assert.isTrue(rule.matches(node, vNode));
        });

        it('is false when the target is not in the tab order', () => {
          const vNode = queryShadowFixture(
            `<div role="link" tabindex="0"><span id="shadow"></span></div>`,
            `<a href="#" id="target" tabindex="-1">Nested link</a>`
          );
          const node = vNode.actualNode;
          assert.isFalse(rule.matches(node, vNode));
        });
      });
    });

    describe('that is not in the tab order', () => {
      it('is true when the target is in the tab order', () => {
        const vNode = queryFixture(`
          <span role="link" tabindex="-1">
            Link text
            <a href="#" id="target">Nested link</a>
          </span>`);
        const node = vNode.actualNode;
        assert.isTrue(rule.matches(node, vNode));
      });

      it('is true when the target is not in the tab order', () => {
        const vNode = queryFixture(`
          <span role="link" tabindex="-1">
            Link text
            <a href="#" id="target" tabindex="-1">Nested link</a>
          </span>`);
        const node = vNode.actualNode;
        assert.isTrue(rule.matches(node, vNode));
      });
    });
  });
});
