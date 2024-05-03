describe('focusable-modal-open', function () {
  'use strict';

  let check;
  let fixture = document.getElementById('fixture');
  let checkContext = axe.testUtils.MockCheckContext();
  let checkSetup = axe.testUtils.checkSetup;

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
    let params = checkSetup(
      '<div id="target" aria-hidden="true">' +
        '<button>Some button</button>' +
        '</div>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  it('returns undefined if a modal is open', function () {
    let params = checkSetup(
      '<div id="target" aria-hidden="true">' +
        '<button>Some button</button>' +
        '</div>' +
        '<div role="dialog">Modal</div>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isUndefined(actual);
  });

  it('sets the tabbable elements as related nodes', function () {
    let params = checkSetup(
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
