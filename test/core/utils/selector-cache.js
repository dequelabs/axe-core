describe('utils.selector-cache', function() {
  var fixture = document.querySelector('#fixture');
  var cacheNodeSelectors =
    axe._thisWillBeDeletedDoNotUse.utils.cacheNodeSelectors;
  var getNodesMatchingExpression =
    axe._thisWillBeDeletedDoNotUse.utils.getNodesMatchingExpression;
  var convertSelector = axe.utils.convertSelector;

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

    it('should add the node to the id map', function() {
      cacheNodeSelectors(vNode);
      assert.deepEqual(vNode._selectorMap[' [idsMap]'].target, [vNode]);
    });

    it('should not add the node to selectors it does not match', function() {
      cacheNodeSelectors(vNode);
      assert.isUndefined(vNode._selectorMap['[for]']);
      assert.isUndefined(vNode._selectorMap.h1);
    });

    it('should ignore non-element nodes', function() {
      fixture.innerHTML = 'Hello';
      vNode = new axe.VirtualNode(fixture.firstChild);
      cacheNodeSelectors(vNode);

      assert.isUndefined(vNode._selectorMap);
    });
  });

  describe('getNodesMatchingExpression', function() {
    var tree;
    var spanVNode;
    var headingVNode;

    function createTree() {
      var parent = document.createElement('section');
      var parentVNode = new axe.VirtualNode(parent);
      tree = [parentVNode];
      var nodes = [];

      for (var i = 0; i < fixture.children.length; i++) {
        var child = fixture.children[i];
        var isShadow = child.hasAttribute('data-shadow');
        var childVNode = new axe.VirtualNode(
          child,
          parentVNode,
          isShadow ? i : undefined
        );
        parentVNode.children.push(child);
        nodes.push(childVNode);
      }

      return nodes;
    }

    beforeEach(function() {
      var heading = document.createElement('h1');
      headingVNode = new axe.VirtualNode(heading, vNode);

      var span = document.createElement('span');
      span.setAttribute('class', 'bar');
      span.setAttribute('id', 'notTarget');
      span.setAttribute('aria-labelledby', 'target');
      spanVNode = new axe.VirtualNode(span, headingVNode);

      vNode.children.push(headingVNode);
      headingVNode.children.push(spanVNode);
      tree = [vNode];
    });

    it('should return undefined if the cache is not primed', function() {
      tree[0]._selectorMap = null;
      var expression = convertSelector('div');
      assert.isUndefined(getNodesMatchingExpression(tree, expression));
    });

    it('should return a list of matching nodes by global selector', function() {
      var expression = convertSelector('*');
      assert.deepEqual(getNodesMatchingExpression(tree, expression), [
        vNode,
        headingVNode,
        spanVNode
      ]);
    });

    it('should return a list of matching nodes by nodeName', function() {
      var expression = convertSelector('div');
      assert.deepEqual(getNodesMatchingExpression(tree, expression), [vNode]);
    });

    it('should return a list of matching nodes by id', function() {
      var expression = convertSelector('#target');
      assert.deepEqual(getNodesMatchingExpression(tree, expression), [vNode]);
    });

    it('should only return nodes matching shadowId when matching by id', function() {
      fixture.innerHTML =
        '<div id="target"></div><div id="target" data-shadow></div>';
      var nodes = createTree();
      var expression = convertSelector('#target');
      assert.deepEqual(getNodesMatchingExpression(tree, expression), [
        nodes[0]
      ]);
    });

    it('should return a list of matching nodes by class', function() {
      var expression = convertSelector('.foo');
      assert.deepEqual(getNodesMatchingExpression(tree, expression), [vNode]);
    });

    it('should return a list of matching nodes by attribute', function() {
      var expression = convertSelector('[aria-label]');
      assert.deepEqual(getNodesMatchingExpression(tree, expression), [vNode]);
    });

    it('should return an empty array if selector does not match', function() {
      var expression = convertSelector('main');
      assert.lengthOf(getNodesMatchingExpression(tree, expression), 0);
    });

    it('should return nodes for each expression', function() {
      fixture.innerHTML =
        '<div role="button" aria-label="other"></div><span id="foo"></span>';
      var nodes = createTree();
      var expression = convertSelector('[role], [id]');
      assert.deepEqual(getNodesMatchingExpression(tree, expression), nodes);
    });

    it('should return nodes for child combinator selector', function() {
      var expression = convertSelector('div span');
      assert.deepEqual(getNodesMatchingExpression(tree, expression), [
        spanVNode
      ]);
    });

    it('should return nodes for direct child combinator selector', function() {
      var expression = convertSelector('div > h1');
      assert.deepEqual(getNodesMatchingExpression(tree, expression), [
        headingVNode
      ]);
    });

    it('should not return nodes for direct child combinator selector that does not match', function() {
      var expression = convertSelector('div > span');
      assert.lengthOf(getNodesMatchingExpression(tree, expression), 0);
    });

    it('should return nodes for attribute value selector', function() {
      var expression = convertSelector('[id="target"]');
      assert.deepEqual(getNodesMatchingExpression(tree, expression), [vNode]);
    });

    it('should return undefined for combinator selector with global selector', function() {
      var expression = convertSelector('body *');
      assert.isUndefined(getNodesMatchingExpression(tree, expression));
    });

    it('should return nodes for multipart selectors', function() {
      var expression = convertSelector('div.foo[id]');
      assert.deepEqual(getNodesMatchingExpression(tree, expression), [vNode]);
    });

    it('should remove duplicates', function() {
      fixture.innerHTML = '<div role="button" aria-label="other"></div>';
      var nodes = createTree();
      var expression = convertSelector('div, [aria-label]');
      assert.deepEqual(getNodesMatchingExpression(tree, expression), nodes);
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

      var expression = convertSelector('div, span');
      var nodes = getNodesMatchingExpression(tree, expression);
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
      var nodes = createTree();

      function filter(node) {
        return node.hasAttr('role');
      }

      var nonFilteredNodes = getNodesMatchingExpression(
        tree,
        convertSelector('div, [aria-label]')
      );
      var filteredNodes = getNodesMatchingExpression(
        tree,
        convertSelector('div, [aria-label]'),
        filter
      );
      assert.deepEqual(nonFilteredNodes, nodes);
      assert.deepEqual(filteredNodes, [nodes[0]]);
    });
  });
});
