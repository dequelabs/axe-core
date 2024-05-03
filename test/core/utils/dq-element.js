describe('DqElement', function () {
  'use strict';

  let DqElement = axe.utils.DqElement;
  let fixture = document.getElementById('fixture');
  let fixtureSetup = axe.testUtils.fixtureSetup;
  let queryFixture = axe.testUtils.queryFixture;

  afterEach(function () {
    axe.reset();
  });

  it('should be exposed to utils', function () {
    assert.equal(axe.utils.DqElement, DqElement);
  });

  it('should take a virtual node as a parameter and return an object', function () {
    let vNode = queryFixture('<div id="target"></div>');
    let result = new DqElement(vNode);
    assert.equal(result.element, vNode.actualNode);
  });

  it('should take an actual node as a parameter and return an object', function () {
    let vNode = queryFixture('<div id="target"></div>');
    let result = new DqElement(vNode.actualNode);
    assert.equal(result.element, vNode.actualNode);
  });

  describe('element', function () {
    it('should store reference to the element', function () {
      let vNode = queryFixture('<div id="target"></div>');
      let dqEl = new DqElement(vNode);
      assert.equal(dqEl.element, vNode.actualNode);
    });

    it('should not be present in stringified version', function () {
      let vNode = queryFixture('<div id="target"></div>');
      let dqEl = new DqElement(vNode);
      assert.isUndefined(JSON.parse(JSON.stringify(dqEl)).element);
    });
  });

  describe('source', function () {
    it('should include the outerHTML of the element', function () {
      let vNode = queryFixture('<div class="bar" id="target">Hello!</div>');
      let outerHTML = vNode.actualNode.outerHTML;
      let result = new DqElement(vNode);
      assert.equal(result.source, outerHTML);
    });

    it('should work with SVG elements', function () {
      let vNode = queryFixture('<svg aria-label="foo" id="target"></svg>');
      let result = new DqElement(vNode);
      assert.equal(result.source, vNode.actualNode.outerHTML);
    });

    it('should work with MathML', function () {
      let vNode = queryFixture(
        '<math display="block" id="target">' +
          '<mrow><msup><mi>x</mi><mn>2</mn></msup></mrow>' +
          '</math>'
      );

      let result = new DqElement(vNode);
      assert.equal(result.source, vNode.actualNode.outerHTML);
    });

    it('should truncate large elements', function () {
      let div = '<div class="foo" id="target">';
      for (let i = 0; i < 300; i++) {
        div += i;
      }
      div += '</div>';
      let vNode = queryFixture(div);
      let result = new DqElement(vNode);
      assert.equal(result.source, '<div class="foo" id="target">');
    });

    it('should use spec object over passed element', function () {
      let vNode = queryFixture('<div id="target" class="bar">Hello!</div>');
      let spec = { source: 'woot' };
      let result = new DqElement(vNode, {}, spec);
      assert.equal(result.source, 'woot');
    });

    it('should return null if audit.noHtml is set', function () {
      axe.configure({ noHtml: true });
      let vNode = queryFixture('<div class="bar" id="target">Hello!</div>');
      let result = new DqElement(vNode);
      assert.isNull(result.source);
    });

    it('should not use spec object over passed element if audit.noHtml is set', function () {
      axe.configure({ noHtml: true });
      let vNode = queryFixture('<div id="target" class="bar">Hello!</div>');
      let spec = { source: 'woot' };
      let result = new DqElement(vNode, {}, spec);
      assert.isNull(result.source);
    });
  });

  describe('selector', function () {
    it('should prefer selector from spec object', function () {
      let vNode = queryFixture('<div id="target" class="bar">Hello!</div>');
      let spec = { selector: 'woot' };
      let result = new DqElement(vNode, {}, spec);
      assert.equal(result.selector, 'woot');
    });
  });

  describe('ancestry', function () {
    it('should prefer selector from spec object', function () {
      let vNode = queryFixture('<div id="target" class="bar">Hello!</div>');
      let spec = { ancestry: 'woot' };
      let result = new DqElement(vNode, {}, spec);
      assert.equal(result.ancestry, 'woot');
    });
  });

  describe('xpath', function () {
    it('should prefer selector from spec object', function () {
      let vNode = queryFixture('<div id="target" class="bar">Hello!</div>');
      let spec = { xpath: 'woot' };
      let result = new DqElement(vNode, {}, spec);
      assert.equal(result.xpath, 'woot');
    });
  });

  describe('absolutePaths', function () {
    it('creates a path all the way to root', function () {
      let vNode = queryFixture('<div id="target" class="bar">Hello!</div>');
      let result = new DqElement(vNode, {
        absolutePaths: true
      });
      assert.include(result.selector[0], 'html > ');
      assert.include(result.selector[0], '#fixture > ');
      assert.include(result.selector[0], '#target');
    });
  });

  describe('nodeIndexes', function () {
    it('is taken from virtualNode', function () {
      fixtureSetup('<i></i><b></b><s></s>');
      assert.deepEqual(new DqElement(fixture.children[0]).nodeIndexes, [1]);
      assert.deepEqual(new DqElement(fixture.children[1]).nodeIndexes, [2]);
      assert.deepEqual(new DqElement(fixture.children[2]).nodeIndexes, [3]);
    });

    it('is taken from spec, over virtualNode', function () {
      let vNode = queryFixture('<div id="target"></div>');
      let spec = { nodeIndexes: [123, 456] };
      let dqElm = new DqElement(vNode, {}, spec);
      assert.deepEqual(dqElm.nodeIndexes, [123, 456]);
    });

    it('is [] when the element is not in the virtual tree.', function () {
      let div = document.createElement('div');
      let dqElm = new DqElement(div);
      assert.deepEqual(dqElm.nodeIndexes, []);
    });
  });

  describe('toJSON', function () {
    it('should only stringify selector and source', function () {
      let spec = {
        selector: ['foo > bar > joe'],
        source: '<joe aria-required="true">',
        xpath: ['/foo/bar/joe'],
        ancestry: ['foo > bar > joe'],
        nodeIndexes: [123],
        fromFrame: false
      };

      let div = document.createElement('div');
      let result = new DqElement(div, {}, spec);
      assert.deepEqual(result.toJSON(), spec);
    });
  });

  describe('merging frames', function () {
    let dqMain, dqIframe;
    beforeEach(function () {
      let tree = fixtureSetup(
        '<main id="main"></main><iframe id="iframe"></iframe>'
      );
      let main = axe.utils.querySelectorAll(tree, 'main')[0];
      let mainSpec = {
        selector: ['#main'],
        ancestry: ['html > body > main'],
        xpath: ['/main']
      };
      dqMain = new DqElement(main, {}, mainSpec);

      let iframe = axe.utils.querySelectorAll(tree, 'iframe')[0];
      let iframeSpec = {
        selector: ['#iframe'],
        ancestry: ['html > body > iframe'],
        xpath: ['/iframe']
      };
      dqIframe = new DqElement(iframe, {}, iframeSpec);
    });

    describe('.mergeSpecs', function () {
      let mainSpec, iframeSpec;
      beforeEach(function () {
        mainSpec = dqMain.toJSON();
        iframeSpec = dqIframe.toJSON();
      });

      it('merges node and frame selectors', function () {
        let mergedSpec = DqElement.mergeSpecs(mainSpec, iframeSpec);
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

      it('merges nodeIndexes', function () {
        let mergedSpec = DqElement.mergeSpecs(mainSpec, iframeSpec);
        assert.deepEqual(mergedSpec.nodeIndexes, [
          iframeSpec.nodeIndexes[0],
          mainSpec.nodeIndexes[0]
        ]);
      });
    });

    describe('DqElement.fromFrame', function () {
      it('returns a new DqElement', function () {
        assert.instanceOf(DqElement.fromFrame(dqMain, {}, dqIframe), DqElement);
      });

      it('sets options for DqElement', function () {
        let options = { absolutePaths: true };
        let dqElm = DqElement.fromFrame(dqMain, options, dqIframe);
        assert.isTrue(dqElm._options.toRoot);
      });

      it('has props as from mergeSpecs', function () {
        let spec = DqElement.mergeSpecs(dqMain.toJSON(), dqIframe.toJSON());
        let dqElm = DqElement.fromFrame(dqMain, {}, dqIframe);
        assert.deepEqual(dqElm.toJSON(), spec);
      });
    });

    describe('DqElement.prototype.fromFrame', function () {
      it('is false when created without a spec', function () {
        assert.isFalse(dqMain.fromFrame);
      });

      it('is false when spec is not from a frame', function () {
        let specMain = dqMain.toJSON();
        let dqElm = new DqElement(dqMain, {}, specMain);
        assert.isFalse(dqElm.fromFrame);
      });

      it('is true when created with a spec', function () {
        let dqElm = DqElement.fromFrame(dqMain, {}, dqIframe);
        assert.isTrue(dqElm.fromFrame);
      });
    });
  });

  describe('DqElement.setRunOptions', function () {
    it('sets options for DqElement', function () {
      axe.setup();
      let options = { absolutePaths: true, elementRef: true };
      DqElement.setRunOptions(options);
      let dqElm = new DqElement(document.body);

      const { element, selector } = dqElm.toJSON();
      assert.equal(element, document.body);
      assert.equal(selector, 'html > body');
    });

    it('is reset by axe.teardown', () => {
      let options = { absolutePaths: true, elementRef: true };
      DqElement.setRunOptions(options);
      axe.teardown();

      axe.setup();
      let dqElm = new DqElement(document.body);
      const { element, selector } = dqElm.toJSON();
      assert.isUndefined(element);
      assert.equal(selector, 'body');
    });
  });
});
