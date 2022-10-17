describe('dom.isModalOpen', function () {
  'use strict';

  var fixtureSetup = axe.testUtils.fixtureSetup;
  var isModalOpen = axe.commons.dom.isModalOpen;
  var dialogElSupport =
    typeof document.createElement('dialog').open !== 'undefined';

  it('returns true if there is a visible element with role=dialog', function () {
    fixtureSetup('<div role="dialog">Modal</div>');
    assert.isTrue(isModalOpen());
  });

  it('returns true if there is a visible element with aria-modal=true', function () {
    fixtureSetup('<div aria-modal="true">Modal</div>');
    assert.isTrue(isModalOpen());
  });

  (dialogElSupport ? it : xit)(
    'returns true if there is a visible dialog element',
    function () {
      fixtureSetup('<dialog open><div>Modal</div></dialog>');
      assert.isTrue(isModalOpen());
    }
  );

  it('returns true if there is a visible absolutely positioned element with >= 75% width/height', function () {
    fixtureSetup(
      '<div style="position: absolute; top: 0; bottom: 0; left: 0; right: 0">Modal</div>'
    );
    assert.isTrue(isModalOpen());
  });

  it('returns true if there is a visible absolutely positioned element with >= 75% width/height and is not the top most element', function () {
    fixtureSetup(
      '<div style="position: fixed; top: 0; bottom: 0; width: 100%; height: 100%; z-index: 99999; background: rgba(0,0,0,0.5);">' +
        '<div style="display: flex; align-items: center; justify-content: center; height: 100%;">' +
        '<div style="padding: 2rem; border: 1px solid; background: white;">Modal</div>' +
        '</div>' +
        '</div>'
    );
    assert.isTrue(isModalOpen());
  });

  it('returns true if modal opens like a drawer', function () {
    fixtureSetup(
      '<div style="position: fixed; top: 0; bottom: 0; width: 100%; height: 100%; z-index: 99999; background: rgba(0,0,0,0.5);">' +
        '<div style="width: 25%; height: 100%;">' +
        '<div style="padding: 2rem; border-right: 1px solid; background: white; height: 100%;">Modal</div>' +
        '</div>' +
        '</div>'
    );
    assert.isTrue(isModalOpen());
  });

  it('returns undefined if there is no modal', function () {
    fixtureSetup('<div>Modal</div>');
    assert.isUndefined(isModalOpen());
  });

  it('returns undefined if there is a hidden element with role=dialog', function () {
    fixtureSetup('<div role="dialog" style="display: none">Modal</div>');
    assert.isUndefined(isModalOpen());
  });

  it('returns undefined if there is a hidden element with aria-modal=true', function () {
    fixtureSetup('<div aria-modal="true" style="display: none">Modal</div>');
    assert.isUndefined(isModalOpen());
  });

  (dialogElSupport ? it : xit)(
    'returns undefined if there is a hidden dialog element',
    function () {
      fixtureSetup('<dialog><div>Modal</div></dialog>');
      assert.isUndefined(isModalOpen());
    }
  );

  it('returns undefined if there is a visible absolutely positioned element with < 75% width/height', function () {
    fixtureSetup(
      '<div style="position: fixed; top: 0; bottom: 0; width: 50%; height: 50%; margin: 0 auto; transform: translateY(-50%);>Modal</div>'
    );
    assert.isUndefined(isModalOpen());
  });
});
