var shadowSupported = axe.testUtils.shadowSupport.v1;
var testSuite = shadowSupported ? describe : describe.skip;

testSuite('utils.shadowSelect', () => {
  const shadowSelect = axe.utils.shadowSelect;
  const fixture = document.querySelector('#fixture');

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('throws when not passed a string or array', () => {
    assert.throws(() => {
      shadowSelect(123);
    });
  });

  it('throws when passed an array with non-string values', () => {
    assert.throws(() => {
      shadowSelect([123]);
    });
  });

  describe('given a string', () => {
    it('returns null if no node is found', () => {
      fixture.innerHTML = '<b class="hello"></b>';
      assert.isNull(shadowSelect('.goodbye'));
    });

    it('returns the first matching element in the document', () => {
      fixture.innerHTML = '<b class="hello"></b><i class="hello"></i>';
      const node = shadowSelect('.hello');
      assert.equal(node.nodeName.toLowerCase(), 'b');
    });
  });

  describe('given an array of string', () => {
    function appendShadowTree(parentNode, nodeName) {
      const node = document.createElement(nodeName);
      parentNode.appendChild(node);
      return node.attachShadow({ mode: 'open' });
    }

    it('returns null given an empty array', () => {
      assert.isNull(shadowSelect([]));
    });

    it('returns null if the node does not exist in the shadow tree', () => {
      const shadowRoot = appendShadowTree(fixture, 'div');
      shadowRoot.innerHTML = '<b class="hello"></b>';
      assert.isNull(shadowSelect(['#fixture > div', '.goodbye']));
    });

    it('returns null if an intermediate node is not a shadow root', () => {
      const shadowRoot = appendShadowTree(fixture, 'article');
      shadowRoot.innerHTML = '<section><p class="hello"></p></section>';
      assert.isNull(shadowSelect(['#fixture > article', 'section', 'p']));
    });

    it('returns from Document with a length of 1', () => {
      fixture.innerHTML = '<b class="hello"></b><i class="hello"></i>';
      const node = shadowSelect(['.hello']);
      assert.equal(node.nodeName.toLowerCase(), 'b');
    });

    it('returns from a shadow tree with length 2', () => {
      const shadowRoot = appendShadowTree(fixture, 'div');
      shadowRoot.innerHTML = '<b class="hello"></b><i class="hello"></i>';

      const node = shadowSelect(['#fixture > div', '.hello']);
      assert.equal(node.nodeName.toLowerCase(), 'b');
    });

    it('returns a node from multiple trees deep', () => {
      let root = fixture;
      const nodes = ['article', 'section', 'div', 'p'];
      nodes.forEach(nodeName => {
        root = appendShadowTree(root, nodeName);
      });
      root.innerHTML = '<b class="hello"></b><i class="hello"></i>';

      const node = shadowSelect([
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
