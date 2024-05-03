describe('structured-dlitems', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let checkSetup = axe.testUtils.checkSetup;
  let shadowSupport = axe.testUtils.shadowSupport;

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should return false if the list has no contents', function () {
    let checkArgs = checkSetup('<dl id="target"></dl>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('structured-dlitems')
        .apply(null, checkArgs)
    );
  });

  it('should return true if the list has only a dd', function () {
    let checkArgs = checkSetup('<dl id="target"><dd>A list</dd></dl>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('structured-dlitems')
        .apply(null, checkArgs)
    );
  });

  it('should return true if the list has only a dt', function () {
    let checkArgs = checkSetup('<dl id="target"><dt>A list</dt></dl>');

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('structured-dlitems')
        .apply(null, checkArgs)
    );
  });

  it('should return true if the list has dt and dd in the incorrect order', function () {
    let checkArgs = checkSetup(
      '<dl id="target"><dd>A list</dd><dt>An item</dt></dl>'
    );

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('structured-dlitems')
        .apply(null, checkArgs)
    );
  });

  it('should return true if the list has dt and dd in the correct order as non-child descendants', function () {
    let checkArgs = checkSetup(
      '<dl id="target"><dd><dl><dt>An item</dt><dd>A list</dd></dl></dd></dl>'
    );

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('structured-dlitems')
        .apply(null, checkArgs)
    );
  });

  it('should return false if the list has dt and dd in the correct order', function () {
    let checkArgs = checkSetup(
      '<dl id="target"><dt>An item</dt><dd>A list</dd></dl>'
    );

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('structured-dlitems')
        .apply(null, checkArgs)
    );
  });

  it('should return false if the list has a correctly-ordered dt and dd with other content', function () {
    let checkArgs = checkSetup(
      '<dl id="target"><dt>Stuff</dt><dt>Item one</dt><dd>Description</dd><p>Not a list</p></dl>'
    );

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('structured-dlitems')
        .apply(null, checkArgs)
    );
  });

  (shadowSupport.v1 ? it : xit)(
    'should return false in a shadow DOM pass',
    function () {
      let node = document.createElement('div');
      node.innerHTML = '<dt>Grayhound bus</dt><dd>at dawn</dd>';
      let shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<dl><slot></slot></dl>';

      let checkArgs = checkSetup(node, 'dl');
      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('structured-dlitems')
          .apply(null, checkArgs)
      );
    }
  );

  (shadowSupport.v1 ? it : xit)(
    'should return true in a shadow DOM fail',
    function () {
      let node = document.createElement('div');
      node.innerHTML = '<dd>Galileo</dd><dt>Figaro</dt>';
      let shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<dl><slot></slot></dl>';

      let checkArgs = checkSetup(node, 'dl');
      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('structured-dlitems')
          .apply(null, checkArgs)
      );
    }
  );
});
