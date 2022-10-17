var shadowSupported = axe.testUtils.shadowSupport.v1;
var testSuite = shadowSupported ? describe : describe.skip;

testSuite('utils.shadowSelect', function () {
  var shadowSelect = axe.utils.shadowSelect;
  var fixture = document.querySelector('#fixture');

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('throws when not passed a string or array', function () {
    assert.throws(function () {
      shadowSelect(123);
    });
  });

  it('throws when passed an array with non-string values', function () {
    assert.throws(function () {
      shadowSelect([123]);
    });
  });

  describe('given a string', function () {
    it('returns null if no node is found', function () {
      fixture.innerHTML = '<b class="hello"></b>';
      assert.isNull(shadowSelect('.goodbye'));
    });

    it('returns the first matching element in the document', function () {
      fixture.innerHTML = '<b class="hello"></b><i class="hello"></i>';
      var node = shadowSelect('.hello');
      assert.equal(node.nodeName.toLowerCase(), 'b');
    });
  });

  describe('given an array of string', function () {
    function appendShadowTree(parentNode, nodeName) {
      var node = document.createElement(nodeName);
      parentNode.appendChild(node);
      return node.attachShadow({ mode: 'open' });
    }

    it('returns null given an empty array', function () {
      assert.isNull(shadowSelect([]));
    });

    it('returns null if the node does not exist in the shadow tree', function () {
      var shadowRoot = appendShadowTree(fixture, 'div');
      shadowRoot.innerHTML = '<b class="hello"></b>';
      assert.isNull(shadowSelect(['#fixture > div', '.goodbye']));
    });

    it('returns null if an intermediate node is not a shadow root', function () {
      var shadowRoot = appendShadowTree(fixture, 'article');
      shadowRoot.innerHTML = '<section><p class="hello"></p></section>';
      assert.isNull(shadowSelect(['#fixture > article', 'section', 'p']));
    });

    it('returns from Document with a length of 1', function () {
      fixture.innerHTML = '<b class="hello"></b><i class="hello"></i>';
      var node = shadowSelect(['.hello']);
      assert.equal(node.nodeName.toLowerCase(), 'b');
    });

    it('returns from a shadow tree with length 2', function () {
      var shadowRoot = appendShadowTree(fixture, 'div');
      shadowRoot.innerHTML = '<b class="hello"></b><i class="hello"></i>';

      var node = shadowSelect(['#fixture > div', '.hello']);
      assert.equal(node.nodeName.toLowerCase(), 'b');
    });

    it('returns a node from multiple trees deep', function () {
      var root = fixture;
      var nodes = ['article', 'section', 'div', 'p'];
      nodes.forEach(function (nodeName) {
        root = appendShadowTree(root, nodeName);
      });
      root.innerHTML = '<b class="hello"></b><i class="hello"></i>';

      var node = shadowSelect([
        '#fixture > article',
        'section',
        'div',
        'p',
        '.hello'
      ]);
      assert.equal(node.nodeName.toLowerCase(), 'b');
    });
  });
});
