describe('DqElement', () => {
  const DqElement = axe.utils.DqElement;
  const fixture = document.getElementById('fixture');
  const fixtureSetup = axe.testUtils.fixtureSetup;
  const queryFixture = axe.testUtils.queryFixture;

  afterEach(() => {
    axe.reset();
  });

  it('should be exposed to utils', () => {
    assert.equal(axe.utils.DqElement, DqElement);
  });

  it('should take a virtual node as a parameter and return an object', () => {
    const vNode = queryFixture('<div id="target"></div>');
    const result = new DqElement(vNode);
    assert.equal(result.element, vNode.actualNode);
  });

  it('should take an actual node as a parameter and return an object', () => {
    const vNode = queryFixture('<div id="target"></div>');
    const result = new DqElement(vNode.actualNode);
    assert.equal(result.element, vNode.actualNode);
  });

  it('should return the same DqElement when instantiated with the same element', () => {
    const vNode = queryFixture('<div id="target"></div>');
    const result = new DqElement(vNode);
    const result2 = new DqElement(vNode);
    assert.equal(result, result2);
  });

  describe('element', () => {
    it('should store reference to the element', () => {
      const vNode = queryFixture('<div id="target"></div>');
      const dqEl = new DqElement(vNode);
      assert.equal(dqEl.element, vNode.actualNode);
    });

    it('should not be present in stringified version', () => {
      const vNode = queryFixture('<div id="target"></div>');
      const dqEl = new DqElement(vNode);
      assert.isUndefined(JSON.parse(JSON.stringify(dqEl)).element);
    });
  });

  describe('source', () => {
    it('should include the outerHTML of the element', () => {
      const vNode = queryFixture('<div class="bar" id="target">Hello!</div>');
      const outerHTML = vNode.actualNode.outerHTML;
      const result = new DqElement(vNode);
      assert.equal(result.source, outerHTML);
    });

    it('should work with SVG elements', () => {
      const vNode = queryFixture('<svg aria-label="foo" id="target"></svg>');
      const result = new DqElement(vNode);
      assert.equal(result.source, vNode.actualNode.outerHTML);
    });

    it('should work with MathML', () => {
      const vNode = queryFixture(
        '<math display="block" id="target">' +
          '<mrow><msup><mi>x</mi><mn>2</mn></msup></mrow>' +
          '</math>'
      );

      const result = new DqElement(vNode);
      assert.equal(result.source, vNode.actualNode.outerHTML);
    });

    it('should truncate large elements', () => {
      let div = '<div class="foo" id="target">';
      for (let i = 0; i < 300; i++) {
        div += i;
      }
      div += '</div>';
      const vNode = queryFixture(div);
      const result = new DqElement(vNode);
      assert.equal(result.source, '<div class="foo" id="target">');
    });

    it('should use spec object over passed element', () => {
      const vNode = queryFixture('<div id="target" class="bar">Hello!</div>');
      const spec = { source: 'woot' };
      const result = new DqElement(vNode, {}, spec);
      assert.equal(result.source, 'woot');
    });

    it('should return null if audit.noHtml is set', () => {
      axe.configure({ noHtml: true });
      const vNode = queryFixture('<div class="bar" id="target">Hello!</div>');
      const result = new DqElement(vNode);
      assert.isNull(result.source);
    });

    it('should not use spec object over passed element if audit.noHtml is set', () => {
      axe.configure({ noHtml: true });
      const vNode = queryFixture('<div id="target" class="bar">Hello!</div>');
      const spec = { source: 'woot' };
      const result = new DqElement(vNode, {}, spec);
      assert.isNull(result.source);
    });
  });

  describe('selector', () => {
    it('should prefer selector from spec object', () => {
      const vNode = queryFixture('<div id="target" class="bar">Hello!</div>');
      const spec = { selector: 'woot' };
      const result = new DqElement(vNode, {}, spec);
      assert.equal(result.selector, 'woot');
    });
  });

  describe('ancestry', () => {
    it('should prefer selector from spec object', () => {
      const vNode = queryFixture('<div id="target" class="bar">Hello!</div>');
      const spec = { ancestry: 'woot' };
      const result = new DqElement(vNode, {}, spec);
      assert.equal(result.ancestry, 'woot');
    });
  });

  describe('xpath', () => {
    it('should prefer selector from spec object', () => {
      const vNode = queryFixture('<div id="target" class="bar">Hello!</div>');
      const spec = { xpath: 'woot' };
      const result = new DqElement(vNode, {}, spec);
      assert.equal(result.xpath, 'woot');
    });
  });

  describe('absolutePaths', () => {
    it('creates a path all the way to root', () => {
      const vNode = queryFixture('<div id="target" class="bar">Hello!</div>');
      const result = new DqElement(vNode, {
        absolutePaths: true
      });
      assert.include(result.selector[0], 'html > ');
      assert.include(result.selector[0], '#fixture > ');
      assert.include(result.selector[0], '#target');
    });
  });

  describe('nodeIndexes', () => {
    it('is taken from virtualNode', () => {
      fixtureSetup('<i></i><b></b><s></s>');
      assert.deepEqual(new DqElement(fixture.children[0]).nodeIndexes, [1]);
      assert.deepEqual(new DqElement(fixture.children[1]).nodeIndexes, [2]);
      assert.deepEqual(new DqElement(fixture.children[2]).nodeIndexes, [3]);
    });

    it('is taken from spec, over virtualNode', () => {
      const vNode = queryFixture('<div id="target"></div>');
      const spec = { nodeIndexes: [123, 456] };
      const dqElm = new DqElement(vNode, {}, spec);
      assert.deepEqual(dqElm.nodeIndexes, [123, 456]);
    });

    it('is [] when the element is not in the virtual tree.', () => {
      const div = document.createElement('div');
      const dqElm = new DqElement(div);
      assert.deepEqual(dqElm.nodeIndexes, []);
    });
  });

  describe('toJSON', () => {
    it('should only stringify selector and source', () => {
      const spec = {
        selector: ['foo > bar > joe'],
        source: '<joe aria-required="true">',
        xpath: ['/foo/bar/joe'],
        ancestry: ['foo > bar > joe'],
        nodeIndexes: [123],
        fromFrame: false
      };

      const div = document.createElement('div');
      const result = new DqElement(div, {}, spec);
      assert.deepEqual(result.toJSON(), spec);
    });
  });

  describe('merging frames', () => {
    let dqMain, dqIframe;
    beforeEach(() => {
      const tree = fixtureSetup(
        '<main id="main"></main><iframe id="iframe"></iframe>'
      );
      const main = axe.utils.querySelectorAll(tree, 'main')[0];
      const mainSpec = {
        selector: ['#main'],
        ancestry: ['html > body > main'],
        xpath: ['/main']
      };
      dqMain = new DqElement(main, {}, mainSpec);

      const iframe = axe.utils.querySelectorAll(tree, 'iframe')[0];
      const iframeSpec = {
        selector: ['#iframe'],
        ancestry: ['html > body > iframe'],
        xpath: ['/iframe']
      };
      dqIframe = new DqElement(iframe, {}, iframeSpec);
    });

    describe('.mergeSpecs', () => {
      let mainSpec, iframeSpec;
      beforeEach(() => {
        mainSpec = dqMain.toJSON();
        iframeSpec = dqIframe.toJSON();
      });

      it('merges node and frame selectors', () => {
        const mergedSpec = DqElement.mergeSpecs(mainSpec, iframeSpec);
        assert.deepEqual(mergedSpec.selector, [
          iframeSpec.selector[0],
          mainSpec.selector[0]
        ]);
        assert.deepEqual(mergedSpec.ancestry, [
          iframeSpec.ancestry[0],
          mainSpec.ancestry[0]
        ]);
        assert.deepEqual(mergedSpec.xpath, [
          iframeSpec.xpath[0],
          mainSpec.xpath[0]
        ]);
      });

      it('merges nodeIndexes', () => {
        const mergedSpec = DqElement.mergeSpecs(mainSpec, iframeSpec);
        assert.deepEqual(mergedSpec.nodeIndexes, [
          iframeSpec.nodeIndexes[0],
          mainSpec.nodeIndexes[0]
        ]);
      });
    });

    describe('DqElement.fromFrame', () => {
      it('returns a new DqElement', () => {
        assert.instanceOf(DqElement.fromFrame(dqMain, {}, dqIframe), DqElement);
      });

      it('sets options for DqElement', () => {
        const options = { absolutePaths: true };
        const dqElm = DqElement.fromFrame(dqMain, options, dqIframe);
        assert.isTrue(dqElm._options.toRoot);
      });

      it('has props as from mergeSpecs', () => {
        const spec = DqElement.mergeSpecs(dqMain.toJSON(), dqIframe.toJSON());
        const dqElm = DqElement.fromFrame(dqMain, {}, dqIframe);
        assert.deepEqual(dqElm.toJSON(), spec);
      });
    });

    describe('DqElement.prototype.fromFrame', () => {
      it('is false when created without a spec', () => {
        assert.isFalse(dqMain.fromFrame);
      });

      it('is false when spec is not from a frame', () => {
        const specMain = dqMain.toJSON();
        const dqElm = new DqElement(dqMain, {}, specMain);
        assert.isFalse(dqElm.fromFrame);
      });

      it('is true when created with a spec', () => {
        const dqElm = DqElement.fromFrame(dqMain, {}, dqIframe);
        assert.isTrue(dqElm.fromFrame);
      });
    });
  });

  describe('DqElement.setRunOptions', () => {
    it('sets options for DqElement', () => {
      axe.setup();
      const options = { absolutePaths: true, elementRef: true };
      DqElement.setRunOptions(options);
      const dqElm = new DqElement(document.body);

      const { element, selector } = dqElm.toJSON();
      assert.equal(element, document.body);
      assert.equal(selector, 'html > body');
    });

    it('is reset by axe.teardown', () => {
      const options = { absolutePaths: true, elementRef: true };
      DqElement.setRunOptions(options);
      axe.teardown();

      axe.setup();
      const dqElm = new DqElement(document.body);
      const { element, selector } = dqElm.toJSON();
      assert.isUndefined(element);
      assert.equal(selector, 'body');
    });
  });
});
