describe('only-dlitems', () => {
  const fixture = document.getElementById('fixture');
  const checkSetup = axe.testUtils.checkSetup;
  const checkContext = axe.testUtils.MockCheckContext();
  const checkEvaluate = axe.testUtils.getCheckEvaluate('only-dlitems');

  afterEach(() => {
    checkContext.reset();
  });

  it('should return false if the list has no contents', () => {
    const checkArgs = checkSetup('<dl id="target"></dl>');
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return true if the list has non-dd/dt contents', () => {
    const checkArgs = checkSetup('<dl id="target"><p>Not a list</p></dl>');

    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
    assert.deepEqual(checkContext._relatedNodes, [fixture.querySelector('p')]);
    assert.deepEqual(checkContext._data, { values: 'p' });
  });

  it('should return true if the list has non-dd content through role change', () => {
    const checkArgs = checkSetup(
      '<dl id="target"><dd role="menuitem">Not a list</dd></dl>'
    );

    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
    assert.deepEqual(checkContext._data, { values: '[role=menuitem]' });
  });

  it('should return true if the list has non-dt content through role change', () => {
    const checkArgs = checkSetup(
      '<dl id="target"><dt role="menuitem">Not a list</dt></dl>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
    assert.deepEqual(checkContext._data, { values: '[role=menuitem]' });
  });

  it('should return false if the list has only a dd', () => {
    const checkArgs = checkSetup('<dl id="target"><dd>A list</dd></dl>');
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return true if <link> is used along side dt with its role changed', () => {
    const checkArgs = checkSetup(
      '<dl id="target"><link rel="stylesheet" href="theme.css"><dt role="menuitem">A list</dt></dl>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
    assert.deepEqual(checkContext._data, { values: '[role=menuitem]' });
  });

  it('should return false if the list has only a dt', () => {
    const checkArgs = checkSetup('<dl id="target"><dt>A list</dt></dl>');
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return false if the list has dt and dd with child content', () => {
    const checkArgs = checkSetup(
      '<dl id="target"><dt><p>An item</p></dt><dd>A list</dd></dl>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return false if the list has dt and dd', () => {
    const checkArgs = checkSetup(
      '<dl id="target"><dt>An item</dt><dd>A list</dd></dl>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return false if the list has dt, dd and a comment', () => {
    const checkArgs = checkSetup(
      '<dl id="target"><dt>An item</dt><dd>A list</dd><!-- foo --></dl>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return true if the list has a dt and dd with other content', () => {
    const checkArgs = checkSetup(
      '<dl id="target"><dt>Item one</dt><dd>Description</dd><p>Not a list</p></dl>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
    assert.deepEqual(checkContext._relatedNodes, [fixture.querySelector('p')]);
    assert.deepEqual(checkContext._data, { values: 'p' });
  });

  it('should return true if the list has a textNode as a child', () => {
    const checkArgs = checkSetup(
      '<dl id="target"><!--hi--><dt>hi</dt>hello<dd>hi</dd></dl>'
    );

    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
    assert.deepEqual(checkContext._relatedNodes, []);
    assert.deepEqual(checkContext._data, { values: '#text' });
  });

  it('should return false if <link> is used along side dt', () => {
    const checkArgs = checkSetup(
      '<dl id="target"><link rel="stylesheet" href="theme.css"><dt>A list</dt></dl>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return false if <meta> is used along side dt', () => {
    const checkArgs = checkSetup(
      '<dl id="target"><meta name="description" content=""><dt>A list</dt></dl>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return false if <script> is used along side dt', () => {
    const checkArgs = checkSetup(
      '<dl id="target"><script src="script.js"></script><dt>A list</dt></dl>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return false if <style> is used along side dt', () => {
    const checkArgs = checkSetup(
      '<dl id="target"><style></style><dt>A list</dt></dl>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return false if <template> is used along side dt', () => {
    const checkArgs = checkSetup(
      '<dl id="target"><template></template><dt>A list</dt></dl>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return false if the list has dt and dd inside a div group', () => {
    const checkArgs = checkSetup(
      '<dl id="target"><div><dt>An item</dt><dd>A list</dd></div></dl>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return true if the list has dt and dd inside a div group with a role', () => {
    const checkArgs = checkSetup(
      '<dl id="target"><div role="list"><dt>An item</dt><dd>A list</dd></div></dl>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
    assert.deepEqual(checkContext._data, { values: '[role=list]' });
  });

  it('should return true if the list mixed items inside a div group with a role', () => {
    const checkArgs = checkSetup(
      '<dl id="target"><div><dt>An item</dt><dd>A list</dd><p>Not a list</p></div></dl>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
    assert.deepEqual(checkContext._data, { values: 'div > p' });
  });

  it('should return false if there is an empty div', () => {
    const checkArgs = checkSetup('<dl id="target"><div></div></dl>');
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('returns false if there are display:none elements that normally would not be allowed', () => {
    const checkArgs = checkSetup(
      '<dl id="target"> <dt>An item</dt> <dd>A list</dd> <h1 style="display:none">heading</h1> </dl>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return true if there is a div with text', () => {
    const checkArgs = checkSetup('<dl id="target"><div>text</div></dl>');
    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
    assert.deepEqual(checkContext._data, { values: 'div > #text' });
  });

  it('returns false if there are visibility:hidden elements that normally would not be allowed', () => {
    const checkArgs = checkSetup(
      '<dl id="target"> <dt>An item</dt> <dd>A list</dd> <h1 style="visibility:hidden">heading</h1> </dl>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return true if there is a div with non-dd / dt elements', () => {
    const checkArgs = checkSetup(
      '<dl id="target"><div> <p>text</p> </div></dl>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
    assert.deepEqual(checkContext._data, { values: 'div > p' });
  });

  it('returns false if there are aria-hidden=true elements that normally would not be allowed', () => {
    const checkArgs = checkSetup(
      '<dl id="target"> <dt>An item</dt> <dd>A list</dd> <h1 aria-hidden="true">heading</h1> </dl>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('returns true if there are aria-hidden=false elements that normally would not be allowed', () => {
    const checkArgs = checkSetup(
      '<dl id="target"> <dt>An item</dt> <dd>A list</dd> <h1 aria-hidden="false">heading</h1> </dl>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
    assert.deepEqual(checkContext._data, { values: 'h1' });
  });

  describe('shadow DOM', () => {
    it('should return false in a shadow DOM pass', () => {
      const node = document.createElement('div');
      node.innerHTML = '<dt>My list item </dt>';
      const shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<dl><slot></slot></dl>';

      const checkArgs = checkSetup(node, 'dl');
      assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
    });

    it('should return true in a shadow DOM fail', () => {
      const node = document.createElement('div');
      node.innerHTML = '<p>Not a list</p>';
      const shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<dl><slot></slot></dl>';

      const checkArgs = checkSetup(node, 'dl');
      assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
      assert.deepEqual(checkContext._data, { values: 'p' });
    });
  });
});
