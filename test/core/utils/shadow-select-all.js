describe('utils.shadowSelectAll', () => {
  const shadowSelectAll = axe.utils.shadowSelectAll;
  const fixture = document.querySelector('#fixture');
  const mapNodeName = elms => elms.map(elm => elm.nodeName.toLowerCase());

  it('throws when not passed a string or array', () => {
    assert.throws(() => {
      shadowSelectAll(123);
    });
  });

  it('throws when passed an array with non-string values', () => {
    assert.throws(() => {
      shadowSelectAll([123]);
    });
  });

  describe('given a string', () => {
    it('returns [] if no node is found', () => {
      fixture.innerHTML = '<b class="hello"></b>';
      assert.deepEqual(shadowSelectAll('.goodbye'), []);
    });

    it('returns the each matching element in the document', () => {
      fixture.innerHTML = `<b class="hello"></b>
        <s class="goodbye"></s>
        <i class="hello"></i>`;
      const nodes = shadowSelectAll('#fixture > .hello');
      assert.deepEqual(mapNodeName(nodes), ['b', 'i']);
    });
  });

  describe('given an array of string', () => {
    function addShadowTree(host, html) {
      const root = host.attachShadow({ mode: 'open' });
      root.innerHTML = html;
      return root;
    }

    it('returns [] given an empty array', () => {
      assert.deepEqual(shadowSelectAll([]), []);
    });

    it('returns [] if the shadow host does not exist', () => {
      fixture.innerHTML = '<div></div>';
      addShadowTree(fixture.children[0], `<b></b>`);
      assert.deepEqual(shadowSelectAll(['#fixture > span', 'b']), []);
    });

    it('returns [] if the no final element exists', () => {
      fixture.innerHTML = '<span></span>';
      addShadowTree(fixture.children[0], `<i></i>`);
      assert.deepEqual(shadowSelectAll(['span', 'b']), []);
    });

    it('returns nodes from a shadow tree', () => {
      fixture.innerHTML = '<span></span>';
      addShadowTree(fixture.children[0], `<b></b><i></i>`);
      const nodeNames = mapNodeName(shadowSelectAll(['#fixture > span', '*']));
      assert.deepEqual(nodeNames, ['b', 'i']);
    });

    it('returns nodes from multiple shadow trees', () => {
      fixture.innerHTML = '<span></span><span></span>';
      addShadowTree(fixture.children[0], `<a></a><b></b>`);
      addShadowTree(fixture.children[1], `<i></i><s></s>`);
      const nodeNames = mapNodeName(shadowSelectAll(['#fixture > span', '*']));
      assert.deepEqual(nodeNames, ['a', 'b', 'i', 's']);
    });

    it('returns nodes from multiple trees deep', () => {
      fixture.innerHTML = '<div></div><div></div>';
      const root1 = addShadowTree(
        fixture.children[0],
        '<span></span><span></span>'
      );
      const root2 = addShadowTree(
        fixture.children[1],
        '<div></div><span></span>'
      );

      addShadowTree(root1.children[0], '<a></a>');
      addShadowTree(root1.children[1], '<b></b>');
      addShadowTree(root2.children[0], '<i></i>');
      addShadowTree(root2.children[1], '<s></s>');

      const nodeNames = mapNodeName(
        shadowSelectAll(['#fixture > div', 'span', '*'])
      );
      assert.deepEqual(nodeNames, ['a', 'b', 's']);
    });
  });
});
