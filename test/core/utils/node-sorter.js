describe('axe.utils.nodeSorter', () => {
  function $id(id) {
    return document.getElementById(id);
  }

  const fixture = document.getElementById('fixture');

  it('should exist', () => {
    assert.isFunction(axe.utils.nodeSorter);
  });

  it('should return -1 if a comes before b', () => {
    fixture.innerHTML = '<div id="a"></div><div id="b"></div>';

    assert.equal(
      axe.utils.nodeSorter({ actualNode: $id('a') }, { actualNode: $id('b') }),
      -1
    );
  });

  it('should return -1 if a comes before b - nested', () => {
    fixture.innerHTML = '<div id="a"><div id="b"></div></div>';

    assert.equal(
      axe.utils.nodeSorter({ actualNode: $id('a') }, { actualNode: $id('b') }),
      -1
    );
  });

  it('should return 1 if b comes before a', () => {
    fixture.innerHTML = '<div id="b"></div><div id="a"></div>';

    assert.equal(
      axe.utils.nodeSorter({ actualNode: $id('a') }, { actualNode: $id('b') }),
      1
    );
  });

  it('should return 1 if b comes before a - nested', () => {
    fixture.innerHTML = '<div id="b"><div id="a"></div></div>';

    assert.equal(
      axe.utils.nodeSorter({ actualNode: $id('a') }, { actualNode: $id('b') }),
      1
    );
  });

  it('should return 0 if a === b', () => {
    fixture.innerHTML = '<div id="a"></div>';

    assert.equal(
      axe.utils.nodeSorter({ actualNode: $id('a') }, { actualNode: $id('a') }),
      0
    );
  });
});
