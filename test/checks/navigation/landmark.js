describe('landmark', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var checkSetup = axe.testUtils.checkSetup;
  var shadowSupport = axe.testUtils.shadowSupport;
  var checkEvaluate = axe.testUtils.getCheckEvaluate('landmark');
  var checkContext = axe.testUtils.MockCheckContext();

  afterEach(function () {
    fixture.innerHTML = '';
    checkContext.reset();
  });

  it('should return true when role=main is found', function () {
    var checkArgs = checkSetup('<div role="main"></div>', '#fixture');
    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should return true when <main> is found', function () {
    var checkArgs = checkSetup('<main></main>', '#fixture');
    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('should otherwise return false', function () {
    var checkArgs = checkSetup('<div role="contentinfo"></div>', '#fixture');
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
  });

  (shadowSupport.v1 ? it : xit)(
    'should not automatically pass if there is a shadow tree',
    function () {
      var node = document.createElement('div');
      var shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<div></div>';
      var checkArgs = checkSetup(node, '#fixture');

      assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
    }
  );

  (shadowSupport.v1 ? it : xit)(
    'should find elements inside shadow trees',
    function () {
      var node = document.createElement('div');
      var shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<main></main>';
      var checkArgs = checkSetup(node, '#fixture');

      assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
    }
  );

  (shadowSupport.v1 ? it : xit)(
    'should find elements slotted in shadow trees',
    function () {
      var node = document.createElement('div');
      node.innerHTML = '<main></main>';
      var shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<slot></slot>';
      var checkArgs = checkSetup(node, '#fixture');

      assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
    }
  );
});
