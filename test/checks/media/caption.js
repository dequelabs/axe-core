describe('caption', () => {
  const fixture = document.getElementById('fixture');
  const checkSetup = axe.testUtils.checkSetup;

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('should return undefined if there is no track element', () => {
    const checkArgs = checkSetup('<audio></audio>', 'audio');
    assert.isUndefined(checks.caption.evaluate.apply(null, checkArgs));
  });

  it('should return undefined if there is no kind=captions attribute', () => {
    const checkArgs = checkSetup(
      '<audio><track kind=descriptions></audio>',
      'audio'
    );
    assert.isUndefined(checks.caption.evaluate.apply(null, checkArgs));
  });

  it('should pass if there is a kind=captions attribute', () => {
    const checkArgs = checkSetup(
      '<audio><track kind=captions></audio>',
      'audio'
    );
    assert.isFalse(checks.caption.evaluate.apply(null, checkArgs));
  });

  it('should get track from composed tree', () => {
    const node = document.createElement('div');
    node.innerHTML = '<track kind=captions>';
    const shadow = node.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<audio><slot></slot></audio>';

    const checkArgs = checkSetup(node, {}, 'audio');
    assert.isFalse(checks.caption.evaluate.apply(null, checkArgs));
  });
});
