describe('is-visible-matches', function () {
  'use strict';

  var isVisibleMatches =
    axe._thisWillBeDeletedDoNotUse.base.metadataFunctionMap[
      'is-visible-matches'
    ];
  var fixture = document.getElementById('fixture');
  var fixtureSetup = axe.testUtils.fixtureSetup;

  it('returns true for visible elements', function () {
    fixtureSetup('<p id="target">Hello world</p>');
    assert.isTrue(isVisibleMatches(fixture.firstChild));
  });

  it('returns false for elements with hidden', function () {
    fixtureSetup('<p id="target" hidden>Hello world</p>');
    assert.isFalse(isVisibleMatches(fixture.firstChild));
  });

  it('returns true for visible elements with aria-hidden="true"', function () {
    fixtureSetup('<p id="target" aria-hidden="true">Hello world</p>');
    assert.isTrue(isVisibleMatches(fixture.firstChild));
  });

  it('returns false for opacity:0 elements with accessible text', function () {
    fixtureSetup('<p id="target" style="opacity:0">Hello world</p>');
    assert.isFalse(isVisibleMatches(fixture.firstChild));
  });
});
