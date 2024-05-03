describe('caption', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let shadowSupport = axe.testUtils.shadowSupport;
  let checkSetup = axe.testUtils.checkSetup;

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should return undefined if there is no track element', function () {
    let checkArgs = checkSetup('<audio></audio>', 'audio');
    assert.isUndefined(checks.caption.evaluate.apply(null, checkArgs));
  });

  it('should return undefined if there is no kind=captions attribute', function () {
    let checkArgs = checkSetup(
      '<audio><track kind=descriptions></audio>',
      'audio'
    );
    assert.isUndefined(checks.caption.evaluate.apply(null, checkArgs));
  });

  it('should pass if there is a kind=captions attribute', function () {
    let checkArgs = checkSetup('<audio><track kind=captions></audio>', 'audio');
    assert.isFalse(checks.caption.evaluate.apply(null, checkArgs));
  });

  (shadowSupport.v1 ? it : xit)(
    'should get track from composed tree',
    function () {
      let node = document.createElement('div');
      node.innerHTML = '<track kind=captions>';
      let shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<audio><slot></slot></audio>';

      let checkArgs = checkSetup(node, {}, 'audio');
      assert.isFalse(checks.caption.evaluate.apply(null, checkArgs));
    }
  );
});
