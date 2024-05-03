describe('landmark', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let checkSetup = axe.testUtils.checkSetup;
  let shadowSupport = axe.testUtils.shadowSupport;
  let checkEvaluate = axe.testUtils.getCheckEvaluate('landmark');
  let checkContext = axe.testUtils.MockCheckContext();

  afterEach(function () {
    fixture.innerHTML = '';
    checkContext.reset();
  });

  it('should return true when role=main is found', function () {
    let checkArgs = checkSetup('<div role="main"></div>', '#fixture');
    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return true when <main> is found', function () {
    let checkArgs = checkSetup('<main></main>', '#fixture');
    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should otherwise return false', function () {
    let checkArgs = checkSetup('<div role="contentinfo"></div>', '#fixture');
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  (shadowSupport.v1 ? it : xit)(
    'should not automatically pass if there is a shadow tree',
    function () {
      let node = document.createElement('div');
      let shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<div></div>';
      let checkArgs = checkSetup(node, '#fixture');

      assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
    }
  );

  (shadowSupport.v1 ? it : xit)(
    'should find elements inside shadow trees',
    function () {
      let node = document.createElement('div');
      let shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<main></main>';
      let checkArgs = checkSetup(node, '#fixture');

      assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
    }
  );

  (shadowSupport.v1 ? it : xit)(
    'should find elements slotted in shadow trees',
    function () {
      let node = document.createElement('div');
      node.innerHTML = '<main></main>';
      let shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<slot></slot>';
      let checkArgs = checkSetup(node, '#fixture');

      assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
    }
  );
});
