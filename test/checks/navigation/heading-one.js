describe('heading-one', function () {
  'use strict';

  var checkSetup = axe.testUtils.checkSetup;
  var shadowSupported = axe.testUtils.shadowSupport.v1;

  var fixture = document.getElementById('fixture');
  var checkContext = {
    _data: null,
    data: function (d) {
      this._data = d;
    }
  };

  afterEach(function () {
    fixture.innerHTML = '';
    checkContext._data = null;
  });

  it('returns true there is an h1', function () {
    var params = checkSetup('<h1>Heading!</h1>', '#fixture');

    assert.isTrue(checks['heading-one'].evaluate.apply(checkContext, params));
  });

  it('returns true if there is a role=heading / aria-level=1', function () {
    var params = checkSetup(
      '<div role="heading" aria-level="1">Heading!</div>', '#fixture');

    assert.isTrue(checks['heading-one'].evaluate.apply(checkContext, params));
  });

  it('returns true if there are multiple h1s', function () {
    var params = checkSetup('<h1>Heading!</h1>' + 
      '<div role="heading" aria-level="1">Heading!</div>', '#fixture');

    assert.isTrue(checks['heading-one'].evaluate.apply(checkContext, params));
  });

  it('returns false if aria-level != 1', function () {
    var params = checkSetup(
      '<div role="heading" aria-level="0">Heading!</div>' +
      '<div role="heading" aria-level="2">Heading!</div>' +
      '<div role="heading" aria-level="3">Heading!</div>' +
      '<div role="heading" aria-level="4">Heading!</div>' +
      '<div role="heading" aria-level="5">Heading!</div>' +
      '<div role="heading" aria-level="6">Heading!</div>', '#fixture');

    assert.isFalse(checks['heading-one'].evaluate.apply(checkContext, params));
  });

  it('returns undefined if the h1 is hidden with css', function () {
    var params = checkSetup('<h1 style="display:none;">Heading!</h1>', '#fixture');

    assert.isUndefined(checks['heading-one'].evaluate.apply(checkContext, params));
  });

  it('returns undefined if the h1 is in aria-hidden', function () {
    var params = checkSetup('<div aria-hidden="true">' +
      '  <h1>Heading!</h1>' + 
      '</div>', '#fixture');

    assert.isUndefined(checks['heading-one'].evaluate.apply(checkContext, params));
  });

  (shadowSupported ? it : xit)
  ('returns true if the h1 is in a shadow tree', function () {
    fixture.innerHTML = '<div id="shadow"></div>';

    var shadow = document.querySelector('#shadow');
    var shadowRoot = shadow.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = '<h1>Heading here!</h1>';

    var tree = axe._tree = axe.utils.getFlattenedTree(fixture);
    var params = [fixture, undefined, tree[0]];
    assert.isTrue(checks['heading-one'].evaluate.apply(checkContext, params));
  });
});
