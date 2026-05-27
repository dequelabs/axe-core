describe('utils.matchesSelector', () => {
  const matchesSelector = axe.utils.matchesSelector;

  function mockMethod(method, returnValue) {
    const result = {};
    result[method] = () => {
      return returnValue;
    };
    result.ownerDocument = {
      defaultView: {
        Element: {
          prototype: {}
        }
      }
    };
    result.ownerDocument.defaultView.Element.prototype[method] = () => {};

    return result;
  }

  it('should check the prototype of the Element object for matching methods', () => {
    assert.equal(matchesSelector(mockMethod('matches', 'test1')), 'test1');
    assert.equal(
      matchesSelector(mockMethod('matchesSelector', 'test2')),
      'test2'
    );
    assert.equal(
      matchesSelector(mockMethod('mozMatchesSelector', 'test3')),
      'test3'
    );
    assert.equal(
      matchesSelector(mockMethod('webkitMatchesSelector', 'test4')),
      'test4'
    );
    assert.equal(
      matchesSelector(mockMethod('msMatchesSelector', 'test5')),
      'test5'
    );
  });

  it('should actually work', () => {
    let target;
    const fixture = document.getElementById('fixture');

    fixture.innerHTML = '<div id="test">Hi</div>';
    target = document.getElementById('test');
    assert.ok(matchesSelector(target, '#test'));

    fixture.innerHTML = '';
  });

  it('should return false if the element does not have a matching method', () => {
    let target;
    const fixture = document.getElementById('fixture');

    fixture.innerHTML = '<div id="test">Hi</div>';
    target = document.getElementById('test');

    target.matches = null;
    target.matchesSelector = null;
    target.mozMatchesSelector = null;
    target.webkitMatchesSelector = null;
    target.msMatchesSelector = null;

    assert.isFalse(matchesSelector(target, '#test'));

    fixture.innerHTML = '';
  });
});
