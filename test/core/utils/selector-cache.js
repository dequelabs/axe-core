describe('utils.selector-map', function() {
  var fixture = document.querySelector('#fixture');
  var cacheNodeSelectors =
    axe._thisWillBeDeletedDoNotUse.utils.cacheNodeSelectors;
  var getNodesMatchingSelector =
    axe._thisWillBeDeletedDoNotUse.utils.getNodesMatchingSelector;
  var cache = axe._cache;

  var vNode;
  beforeEach(function() {
    cache.set('selectorMap', {});
    fixture.innerHTML = '<div id="target" class="foo" aria-label="bar"></div>';
    vNode = new axe.VirtualNode(fixture.firstChild);
  });

  afterEach(function() {
    fixture.innerHTML = '';
  });

  describe('cacheNodeSelectors', function() {
    it('should add the node to the global selector', function() {
      cacheNodeSelectors(vNode);
      assert.deepEqual(cache.get('selectorMap')['*'], [vNode]);
    });

    it('should add the node to the nodeName', function() {
      cacheNodeSelectors(vNode);
      assert.deepEqual(cache.get('selectorMap').div, [vNode]);
    });

    it('should add the node to all attribute selectors', function() {
      cacheNodeSelectors(vNode);
      assert.deepEqual(cache.get('selectorMap')['[id]'], [vNode]);
      assert.deepEqual(cache.get('selectorMap')['[class]'], [vNode]);
      assert.deepEqual(cache.get('selectorMap')['[aria-label]'], [vNode]);
    });

    it('should not add the node to selectors it does not match', function() {
      cacheNodeSelectors(vNode);
      assert.isUndefined(cache.get('selectorMap')['[for]']);
      assert.isUndefined(cache.get('selectorMap').h1);
    });

    it('should set the node index', function() {
      assert.isUndefined(vNode._nodeIndex);
      cacheNodeSelectors(vNode);
      assert.equal(vNode._nodeIndex, 0);
    });

    it('should ignore non-element nodes', function() {
      fixture.innerHTML = 'Hello';
      vNode = new axe.VirtualNode(fixture.firstChild);
      cacheNodeSelectors(vNode);

      assert.isUndefined(cache.get('selectorMap')['#text']);
    });
  });

  describe('getNodesMatchingSelector', function() {
    var tree;
    beforeEach(function() {
      cacheNodeSelectors(vNode);
      tree = [vNode];
      tree[0]._selectorMap = cache.get('selectorMap');
    });

    it('should return undefined if the cache is not primed', function() {
      tree[0]._selectorMap = null;
      assert.isUndefined(getNodesMatchingSelector(tree, 'div'));
    });

    it('should return a list of matching nodes by global selector', function() {
      assert.lengthOf(getNodesMatchingSelector(tree, '*'), 1);
    });

    it('should return a list of matching nodes by nodeName', function() {
      assert.lengthOf(getNodesMatchingSelector(tree, 'div'), 1);
    });

    it('should return a list of matching nodes by id', function() {
      assert.lengthOf(getNodesMatchingSelector(tree, '#target'), 1);
    });

    it('should only return nodes matching shadowId when matching by id', function() {
      fixture.innerHTML = '<div id="target"></div>';
      vNode = new axe.VirtualNode(fixture.firstChild, null, 'a');
      cacheNodeSelectors(vNode);
      tree[0]._selectorMap = cache.get('selectorMap');
      assert.lengthOf(getNodesMatchingSelector(tree, '#target'), 1);
    });

    it('should return a list of matching nodes by class', function() {
      assert.lengthOf(getNodesMatchingSelector(tree, '.foo'), 1);
    });

    it('should return a list of matching nodes by attribute', function() {
      assert.lengthOf(getNodesMatchingSelector(tree, '[aria-label]'), 1);
    });

    it('should return an empty array if selector does not match', function() {
      assert.lengthOf(getNodesMatchingSelector(tree, 'span'), 0);
    });

    it('should return nodes for each expression', function() {
      fixture.innerHTML = '<div role="button" aria-label="other"></div>';
      vNode = new axe.VirtualNode(fixture.firstChild);
      cacheNodeSelectors(vNode);
      tree[0]._selectorMap = cache.get('selectorMap');

      assert.lengthOf(getNodesMatchingSelector(tree, '[role], [id]'), 2);
    });

    it('should remove duplicates', function() {
      fixture.innerHTML = '<div role="button" aria-label="other"></div>';
      vNode = new axe.VirtualNode(fixture.firstChild);
      cacheNodeSelectors(vNode);
      tree.push(vNode);
      tree[0]._selectorMap = cache.get('selectorMap');

      assert.lengthOf(getNodesMatchingSelector(tree, 'div, [aria-label]'), 2);
    });

    it('should sort nodes by added order', function() {
      cache.clear();
      for (var i = 0; i < 10; i++) {
        if (i % 2 === 0) {
          fixture.innerHTML = '<div id="id' + i + '"></div>';
        } else {
          fixture.innerHTML = '<span id="id' + i + '"></span>';
        }

        vNode = new axe.VirtualNode(fixture.firstChild);
        cacheNodeSelectors(vNode);
      }

      tree[0]._selectorMap = cache.get('selectorMap');

      var nodes = getNodesMatchingSelector(tree, 'div, span');
      var ids = [];
      for (var i = 0; i < nodes.length; i++) {
        ids.push(nodes[i].attr('id'));
      }

      assert.deepEqual(ids, [
        'id0',
        'id1',
        'id2',
        'id3',
        'id4',
        'id5',
        'id6',
        'id7',
        'id8',
        'id9'
      ]);
    });

    it('should filter nodes', function() {
      fixture.innerHTML = '<div role="button" aria-label="other"></div>';
      vNode = new axe.VirtualNode(fixture.firstChild);
      cacheNodeSelectors(vNode);
      tree[0]._selectorMap = cache.get('selectorMap');

      function filter(node) {
        return node.hasAttr('role');
      }

      assert.lengthOf(getNodesMatchingSelector(tree, 'div, [aria-label]'), 2);
      assert.lengthOf(
        getNodesMatchingSelector(tree, 'div, [aria-label]', filter),
        1
      );
    });
  });
});
