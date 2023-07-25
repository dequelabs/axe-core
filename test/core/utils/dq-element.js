describe('DqElement', function () {
  'use strict';

  var DqElement = axe.utils.DqElement;
  var fixture = document.getElementById('fixture');
  var fixtureSetup = axe.testUtils.fixtureSetup;
  var queryFixture = axe.testUtils.queryFixture;

  afterEach(function () {
    axe.reset();
  });

  it('should be exposed to utils', function () {
    assert.equal(axe.utils.DqElement, DqElement);
  });

  it('should take a virtual node as a parameter and return an object', function () {
    var vNode = queryFixture('<div id="target"></div>');
    var result = new DqElement(vNode);
    assert.equal(result.element, vNode.actualNode);
  });

  it('should take an actual node as a parameter and return an object', function () {
    var vNode = queryFixture('<div id="target"></div>');
    var result = new DqElement(vNode.actualNode);
    assert.equal(result.element, vNode.actualNode);
  });

  describe('element', function () {
    it('should store reference to the element', function () {
      var vNode = queryFixture('<div id="target"></div>');
      var dqEl = new DqElement(vNode);
      assert.equal(dqEl.element, vNode.actualNode);
    });

    it('should not be present in stringified version', function () {
      var vNode = queryFixture('<div id="target"></div>');
      var dqEl = new DqElement(vNode);
      assert.isUndefined(JSON.parse(JSON.stringify(dqEl)).element);
    });
  });

  describe('source', function () {
    it('should include the outerHTML of the element', function () {
      var vNode = queryFixture('<div class="bar" id="target">Hello!</div>');
      var outerHTML = vNode.actualNode.outerHTML;
      var result = new DqElement(vNode);
      assert.equal(result.source, outerHTML);
    });

    it('should work with SVG elements', function () {
      var vNode = queryFixture('<svg aria-label="foo" id="target"></svg>');
      var result = new DqElement(vNode);
      assert.equal(result.source, vNode.actualNode.outerHTML);
    });

    it('should work with MathML', function () {
      var vNode = queryFixture(
        '<math display="block" id="target">' +
          '<mrow><msup><mi>x</mi><mn>2</mn></msup></mrow>' +
          '</math>'
      );

      var result = new DqElement(vNode);
      assert.equal(result.source, vNode.actualNode.outerHTML);
    });

    it('should truncate large elements', function () {
      var div = '<div class="foo" id="target">';
      for (var i = 0; i < 300; i++) {
        div += i;
      }
      div += '</div>';
      var vNode = queryFixture(div);
      var result = new DqElement(vNode);
      assert.equal(result.source, '<div class="foo" id="target">');
    });

    it('should use spec object over passed element', function () {
      var vNode = queryFixture('<div id="target" class="bar">Hello!</div>');
      var spec = { source: 'woot' };
      var result = new DqElement(vNode, {}, spec);
      assert.equal(result.source, 'woot');
    });

    it('should return null if audit.noHtml is set', function () {
      axe.configure({ noHtml: true });
      var vNode = queryFixture('<div class="bar" id="target">Hello!</div>');
      var result = new DqElement(vNode);
      assert.isNull(result.source);
    });

    it('should not use spec object over passed element if audit.noHtml is set', function () {
      axe.configure({ noHtml: true });
      var vNode = queryFixture('<div id="target" class="bar">Hello!</div>');
      var spec = { source: 'woot' };
      var result = new DqElement(vNode, {}, spec);
      assert.isNull(result.source);
    });
  });

  describe('selector', function () {
    it('should prefer selector from spec object', function () {
      var vNode = queryFixture('<div id="target" class="bar">Hello!</div>');
      var spec = { selector: 'woot' };
      var result = new DqElement(vNode, {}, spec);
      assert.equal(result.selector, 'woot');
    });
  });

  describe('ancestry', function () {
    it('should prefer selector from spec object', function () {
      var vNode = queryFixture('<div id="target" class="bar">Hello!</div>');
      var spec = { ancestry: 'woot' };
      var result = new DqElement(vNode, {}, spec);
      assert.equal(result.ancestry, 'woot');
    });
  });

  describe('xpath', function () {
    it('should prefer selector from spec object', function () {
      var vNode = queryFixture('<div id="target" class="bar">Hello!</div>');
      var spec = { xpath: 'woot' };
      var result = new DqElement(vNode, {}, spec);
      assert.equal(result.xpath, 'woot');
    });
  });

  describe('absolutePaths', function () {
    it('creates a path all the way to root', function () {
      var vNode = queryFixture('<div id="target" class="bar">Hello!</div>');
      var result = new DqElement(vNode, {
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
      var vNode = queryFixture('<div id="target"></div>');
      var spec = { nodeIndexes: [123, 456] };
      var dqElm = new DqElement(vNode, {}, spec);
      assert.deepEqual(dqElm.nodeIndexes, [123, 456]);
    });

    it('is [] when the element is not in the virtual tree.', function () {
      var div = document.createElement('div');
      var dqElm = new DqElement(div);
      assert.deepEqual(dqElm.nodeIndexes, []);
    });
  });

  describe('toJSON', function () {
    it('should only stringify selector and source', function () {
      var spec = {
        selector: ['foo > bar > joe'],
        source: '<joe aria-required="true">',
        xpath: ['/foo/bar/joe'],
        ancestry: ['foo > bar > joe'],
        nodeIndexes: [123],
        fromFrame: false
      };

      var div = document.createElement('div');
      var result = new DqElement(div, {}, spec);
      assert.deepEqual(result.toJSON(), spec);
    });
  });

  describe('merging frames', function () {
    var dqMain, dqIframe;
    beforeEach(function () {
      var tree = fixtureSetup(
        '<main id="main"></main><iframe id="iframe"></iframe>'
      );
      var main = axe.utils.querySelectorAll(tree, 'main')[0];
      var mainSpec = {
        selector: ['#main'],
        ancestry: ['html > body > main'],
        xpath: ['/main']
      };
      dqMain = new DqElement(main, {}, mainSpec);

      var iframe = axe.utils.querySelectorAll(tree, 'iframe')[0];
      var iframeSpec = {
        selector: ['#iframe'],
        ancestry: ['html > body > iframe'],
        xpath: ['/iframe']
      };
      dqIframe = new DqElement(iframe, {}, iframeSpec);
    });

    describe('.mergeSpecs', function () {
      var mainSpec, iframeSpec;
      beforeEach(function () {
        mainSpec = dqMain.toJSON();
        iframeSpec = dqIframe.toJSON();
      });

      it('merges node and frame selectors', function () {
        var mergedSpec = DqElement.mergeSpecs(mainSpec, iframeSpec);
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
        var mergedSpec = DqElement.mergeSpecs(mainSpec, iframeSpec);
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
        var options = { absolutePaths: true };
        var dqElm = DqElement.fromFrame(dqMain, options, dqIframe);
        assert.isTrue(dqElm._options.toRoot);
      });

      it('has props as from mergeSpecs', function () {
        var spec = DqElement.mergeSpecs(dqMain.toJSON(), dqIframe.toJSON());
        var dqElm = DqElement.fromFrame(dqMain, {}, dqIframe);
        assert.deepEqual(dqElm.toJSON(), spec);
      });
    });

    describe('DqElement.prototype.fromFrame', function () {
      it('is false when created without a spec', function () {
        assert.isFalse(dqMain.fromFrame);
      });

      it('is false when spec is not from a frame', function () {
        var specMain = dqMain.toJSON();
        var dqElm = new DqElement(dqMain, {}, specMain);
        assert.isFalse(dqElm.fromFrame);
      });

      it('is true when created with a spec', function () {
        var dqElm = DqElement.fromFrame(dqMain, {}, dqIframe);
        assert.isTrue(dqElm.fromFrame);
      });
    });
  });

  describe('DqElement.setRunOptions', function () {
    it('sets options for DqElement', function () {
      axe.setup();
      var options = { absolutePaths: true, elementRef: true };
      DqElement.setRunOptions(options);
      var dqElm = new DqElement(document.body);

      const { element, selector } = dqElm.toJSON();
      assert.equal(element, document.body);
      assert.equal(selector, 'html > body');
    });

    it('is reset by axe.teardown', () => {
      var options = { absolutePaths: true, elementRef: true };
      DqElement.setRunOptions(options);
      axe.teardown();

      axe.setup();
      var dqElm = new DqElement(document.body);
      const { element, selector } = dqElm.toJSON();
      assert.isUndefined(element);
      assert.equal(selector, 'body');
    });
  });
});
