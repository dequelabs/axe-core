describe('only-listitems', () => {
  const fixture = document.getElementById('fixture');
  const checkSetup = axe.testUtils.checkSetup;
  const checkContext = axe.testUtils.MockCheckContext();
  const checkEvaluate = axe.testUtils.getCheckEvaluate('only-listitems');

  afterEach(() => {
    checkContext.reset();
  });

  it('should return false if the list has no contents', () => {
    const checkArgs = checkSetup('<ol id="target"></ol>');
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return false if the list has only spaces as content', () => {
    const checkArgs = checkSetup('<ol id="target">   </ol>');
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return false if the list has whitespace', () => {
    const checkArgs = checkSetup('<ol id="target"><li>Item</li>    </ol>');
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return false if the list has only an element with role listitem', () => {
    const checkArgs = checkSetup(
      '<ol id="target"><div role="listitem">A list</div></ol>'
    );

    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return false if the list has only multiple mixed elements with role listitem', () => {
    const checkArgs = checkSetup(
      '<ol id="target"><div role="listitem">list</div><li role="listitem">list</li><div role="listitem">list</div></ol>'
    );

    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return false if the list has non-li comments', () => {
    const checkArgs = checkSetup(
      '<ol id="target"><li>Item</li><!--comment--></ol>'
    );

    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return true if the list has non-li text contents', () => {
    const checkArgs = checkSetup(
      '<ol id="target"><li>Item</li>Not an item</ol>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
    assert.deepEqual(checkContext._data, {
      values: '#text'
    });
  });

  it('should return true if the list has non-li contents', () => {
    const checkArgs = checkSetup('<ol id="target"><p>Not a list</p></ol>');
    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
    assert.deepEqual(checkContext._relatedNodes, [fixture.querySelector('p')]);
    assert.deepEqual(checkContext._data, {
      values: 'p'
    });
  });

  it('should return false if the list has only an li with child content', () => {
    const checkArgs = checkSetup('<ol id="target"><li>A <i>list</i></li></ol>');
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return false if the list has only an li', () => {
    const checkArgs = checkSetup('<ol id="target"><li>A list</li></ol>');
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return true if the list has an li with other content', () => {
    const checkArgs = checkSetup(
      '<ol id="target"><li>A list</li><p>Not a list</p></ol>'
    );

    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
    assert.deepEqual(checkContext._relatedNodes, [fixture.querySelector('p')]);
    assert.deepEqual(checkContext._data, {
      values: 'p'
    });
  });

  it('should return true if the list has at least one li while others have their roles changed', () => {
    const checkArgs = checkSetup(
      '<ol id="target"><li >A list item</li><li role="menuitem">Not a list item</li></ol>'
    );

    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
    assert.deepEqual(checkContext._relatedNodes, [
      fixture.querySelector('[role="menuitem"]')
    ]);
    assert.deepEqual(checkContext._data, {
      values: '[role=menuitem]'
    });
  });

  it('should return true if the list has only li items with their roles changed', () => {
    const checkArgs = checkSetup(
      '<ol id="target"><li id="fail1" role="menuitem">Not a list item</li><li id="fail2" role="menuitem">Not a list item</li></ol>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
    assert.deepEqual(checkContext._data, {
      values: '[role=menuitem]'
    });
    assert.deepEqual(checkContext._relatedNodes, [
      fixture.querySelector('#fail1'),
      fixture.querySelector('#fail2')
    ]);
  });

  it('should return true if <link> is used along side only li items with their roles changed', () => {
    const checkArgs = checkSetup(
      '<ol id="target"><link rel="stylesheet" href="theme.css"><li role="menuitem">Not a list item</li></ol>'
    );

    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
    assert.deepEqual(checkContext._data, {
      values: '[role=menuitem]'
    });
  });

  it('should return false if <link> is used along side li', () => {
    const checkArgs = checkSetup(
      '<ol id="target"><link rel="stylesheet" href="theme.css"><li>A list</li></ol>'
    );

    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return false if <meta> is used along side li', () => {
    const checkArgs = checkSetup(
      '<ol id="target"><meta name="description" content=""><li>A list</li></ol>'
    );

    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return false if <script> is used along side li', () => {
    const checkArgs = checkSetup(
      '<ol id="target"><script src="script.js"></script><li>A list</li></ol>'
    );

    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return false if <style> is used along side li', () => {
    const checkArgs = checkSetup(
      '<ol id="target"><style></style><li>A list</li></ol>'
    );

    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return false if <template> is used along side li', () => {
    const checkArgs = checkSetup(
      '<ol id="target"><template></template><li>A list</li></ol>'
    );

    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('returns false if there are display:none elements that normally would not be allowed', () => {
    const checkArgs = checkSetup(
      '<ul id="target"> <li>An item</li> <h1 style="display:none">heading</h1> </ul>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('returns false if there are visibility:hidden elements that normally would not be allowed', () => {
    const checkArgs = checkSetup(
      '<ul id="target"> <li>An item</li> <h1 style="visibility:hidden">heading</h1> </ul>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('returns false if there are aria-hidden=true elements that normally would not be allowed', () => {
    const checkArgs = checkSetup(
      '<ul id="target"> <li>An item</li> <h1 aria-hidden="true">heading</h1> </ul>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('returns true if there are aria-hidden=false elements that normally would not be allowed', () => {
    const checkArgs = checkSetup(
      '<ul id="target"> <li>An item</li> <h1 aria-hidden="false">heading</h1> </ul>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
    assert.deepEqual(checkContext._data, {
      values: 'h1'
    });
  });

  describe('nodeNames', () => {
    it('returns multiple node names', () => {
      const checkArgs = checkSetup(
        '<ul id="target"> <a></a><b></b><s></s> </ul>'
      );
      assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
      assert.deepEqual(checkContext._data, {
        values: 'a, b, s'
      });
    });

    it('does only shows unique nodes names', () => {
      const checkArgs = checkSetup(
        '<ul id="target"> <a></a><b></b><a></a> </ul>'
      );
      assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
      assert.deepEqual(checkContext._data, {
        values: 'a, b'
      });
    });
  });

  describe('shadow DOM', () => {
    it('should return false in a shadow DOM pass', () => {
      const node = document.createElement('div');
      node.innerHTML = '<li>My list item </li>';
      const shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<ul><slot></slot></ul>';

      const checkArgs = checkSetup(node, 'ul');
      assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
    });

    it('should return true in a shadow DOM fail', () => {
      const node = document.createElement('div');
      node.innerHTML = '<p>Not a list item</p>';
      const shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<ul><slot></slot></ul>';

      const checkArgs = checkSetup(node, 'ul');
      assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
      assert.deepEqual(checkContext._data, {
        values: 'p'
      });
    });
  });
});
