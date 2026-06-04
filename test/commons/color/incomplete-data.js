describe('axe.commons.color.incompleteData', () => {
  const fixture = document.getElementById('fixture');

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('should be an object', () => {
    assert.isObject(axe.commons.color.incompleteData);
  });

  it('should store a string with a key for the incomplete check', () => {
    const node = document.createElement('div');
    fixture.appendChild(node);
    axe.commons.color.incompleteData.set('fgColor', 'bgImage');

    assert.equal(axe.commons.color.incompleteData.get('fgColor'), 'bgImage');
  });

  it('should throw an error if key is not a string', () => {
    assert.throws(() => {
      axe.commons.color.incompleteData.set();
    }, /key must be a string/);
  });

  it('should store a reason that matches a list of possibilities', () => {
    axe.commons.color.incompleteData.set('bgColor', 'bgImage');
    assert.equal(axe.commons.color.incompleteData.get('bgColor'), 'bgImage');
  });

  it('should clear the data object on request', () => {
    axe.commons.color.incompleteData.set('fgColor', 'bgOverlap');
    axe.commons.color.incompleteData.clear();
    assert.isUndefined(
      axe.commons.color.incompleteData.get('fgColor'),
      'bgOverlap'
    );
  });
});
