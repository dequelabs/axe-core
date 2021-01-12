describe('utils.selector-cache', function() {
  var fixture = document.querySelector('#fixture');
  var cacheNodeSelectors =
    axe._thisWillBeDeletedDoNotUse.utils.cacheNodeSelectors;
  var getNodesMatchingSelector =
    axe._thisWillBeDeletedDoNotUse.utils.getNodesMatchingSelector;

  var vNode;
  beforeEach(function() {
    fixture.innerHTML = '<div id="target" class="foo" aria-label="bar"></div>';
    vNode = new axe.VirtualNode(fixture.firstChild);
  });

  afterEach(function() {
    fixture.innerHTML = '';
  });

  describe('cacheNodeSelectors', function() {
    it('should add the node to the global selector', function() {
      cacheNodeSelectors(vNode);
      assert.deepEqual(vNode._selectorMap['*'], [vNode]);
    });

    it('should add the node to the nodeName', function() {
      cacheNodeSelectors(vNode);
      assert.deepEqual(vNode._selectorMap.div, [vNode]);
    });

    it('should add the node to all attribute selectors', function() {
      cacheNodeSelectors(vNode);
      assert.deepEqual(vNode._selectorMap['[id]'], [vNode]);
      assert.deepEqual(vNode._selectorMap['[class]'], [vNode]);
      assert.deepEqual(vNode._selectorMap['[aria-label]'], [vNode]);
    });

    it('should not add the node to selectors it does not match', function() {
      cacheNodeSelectors(vNode);
      assert.isUndefined(vNode._selectorMap['[for]']);
      assert.isUndefined(vNode._selectorMap.h1);
    });

    it('should set the node index', function() {
      assert.isUndefined(vNode._nodeIndex);
      cacheNodeSelectors(vNode, 2);
      assert.equal(vNode._nodeIndex, 2);
    });

    it('should ignore non-element nodes', function() {
      fixture.innerHTML = 'Hello';
      vNode = new axe.VirtualNode(fixture.firstChild);
      cacheNodeSelectors(vNode);

      assert.isUndefined(vNode._selectorMap);
    });
  });

  describe('getNodesMatchingSelector', function() {
    var tree;

    function createTree(useShadowId) {
      tree = [];
      for (var i = 0; i < fixture.children.length; i++) {
        var child = fixture.children[i];
        vNode = new axe.VirtualNode(child, null, useShadowId ? i : null);
        cacheNodeSelectors(vNode, i);
        tree.push(vNode);
      }
    }

    beforeEach(function() {
      cacheNodeSelectors(vNode);
      tree = [vNode];
    });

    it('should return undefined if the cache is not primed', function() {
      vNode._selectorMap = null;
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
      fixture.innerHTML = '<div id="target"></div><div id="target"></div>';
      createTree(true);
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
      fixture.innerHTML =
        '<div role="button" aria-label="other"></div><span id="foo"></span>';
      createTree();
      assert.lengthOf(getNodesMatchingSelector(tree, '[role], [id]'), 2);
    });

    it('should remove duplicates', function() {
      fixture.innerHTML = '<div role="button" aria-label="other"></div>';
      createTree();
      assert.lengthOf(getNodesMatchingSelector(tree, 'div, [aria-label]'), 1);
    });

    it('should sort nodes by added order', function() {
      fixture.innerHTML =
        '<div id="id0"></div>' +
        '<span id="id1"></span>' +
        '<div id="id2"></div>' +
        '<span id="id3"></span>' +
        '<div id="id4"></div>' +
        '<span id="id5"></span>' +
        '<div id="id6"></div>' +
        '<span id="id7"></span>' +
        '<div id="id8"></div>' +
        '<span id="id9"></span>';
      createTree();

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
      fixture.innerHTML =
        '<div role="button" aria-label="other"></div><div></div>';
      createTree();

      function filter(node) {
        return node.hasAttr('role');
      }

      var nonFilteredNodes = getNodesMatchingSelector(
        tree,
        'div, [aria-label]'
      );
      var filteredNodes = getNodesMatchingSelector(
        tree,
        'div, [aria-label]',
        filter
      );
      assert.lengthOf(nonFilteredNodes, 2);
      assert.lengthOf(filteredNodes, 1);
    });
  });
});
