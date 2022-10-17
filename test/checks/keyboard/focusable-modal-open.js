describe('focusable-modal-open', function () {
  'use strict';

  var check;
  var fixture = document.getElementById('fixture');
  var checkContext = axe.testUtils.MockCheckContext();
  var checkSetup = axe.testUtils.checkSetup;

  before(function () {
    check = checks['focusable-modal-open'];
  });

  afterEach(function () {
    fixture.innerHTML = '';
    axe._tree = undefined;
    axe._selectorData = undefined;
    checkContext.reset();
  });

  it('returns true when no modal is open', function () {
    var params = checkSetup(
      '<div id="target" aria-hidden="true">' +
        '<button>Some button</button>' +
        '</div>'
    );
    var actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  it('returns undefined if a modal is open', function () {
    var params = checkSetup(
      '<div id="target" aria-hidden="true">' +
        '<button>Some button</button>' +
        '</div>' +
        '<div role="dialog">Modal</div>'
    );
    var actual = check.evaluate.apply(checkContext, params);
    assert.isUndefined(actual);
  });

  it('sets the tabbable elements as related nodes', function () {
    var params = checkSetup(
      '<div id="target" aria-hidden="true">' +
        '<button>Some button</button>' +
        '</div>' +
        '<div role="dialog">Modal</div>'
    );
    check.evaluate.apply(checkContext, params);
    assert.lengthOf(checkContext._relatedNodes, 1);
    assert.deepEqual(
      checkContext._relatedNodes,
      Array.from(fixture.querySelectorAll('button'))
    );
  });
});
