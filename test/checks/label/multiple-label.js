describe('multiple-label', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let shadowSupported = axe.testUtils.shadowSupport.v1;
  let checkContext = axe.testUtils.MockCheckContext();
  let fixtureSetup = axe.testUtils.fixtureSetup;

  afterEach(function () {
    checkContext.reset();
  });

  it('should return undefined if there are multiple implicit labels', function () {
    fixtureSetup(
      '<label id="l2"><label id="l1"><input type="text" id="target"></label></label>'
    );
    let target = fixture.querySelector('#target');
    let l1 = fixture.querySelector('#l1');
    let l2 = fixture.querySelector('#l2');
    assert.isUndefined(
      axe.testUtils
        .getCheckEvaluate('multiple-label')
        .call(checkContext, target)
    );
    assert.deepEqual(checkContext._relatedNodes, [l1, l2]);
  });

  it('should return false if there is only one implicit label', function () {
    fixtureSetup('<label id="l1"><input type="text" id="target"></label>');
    let target = fixture.querySelector('#target');
    let l1 = fixture.querySelector('#l1');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('multiple-label')
        .call(checkContext, target)
    );
    assert.deepEqual(checkContext._relatedNodes, [l1]);
  });

  it('should return undefined if there are multiple explicit labels', function () {
    fixtureSetup(
      '<label id="l1" for="target">Foo</label>' +
        '<label id="l2" for="target">Bar</label>' +
        '<label id="l3" for="target">Bat</label>' +
        '<input type="text" id="target">'
    );
    let target = fixture.querySelector('#target');
    let l1 = fixture.querySelector('#l1');
    let l2 = fixture.querySelector('#l2');
    let l3 = fixture.querySelector('#l3');
    assert.isUndefined(
      axe.testUtils
        .getCheckEvaluate('multiple-label')
        .call(checkContext, target)
    );
    assert.deepEqual(checkContext._relatedNodes, [l1, l2, l3]);
  });

  it('should return false if there is only one explicit label', function () {
    fixtureSetup(
      '<label id="l1" for="target">Foo</label><input type="text" id="target">'
    );
    let target = fixture.querySelector('#target');
    let l1 = fixture.querySelector('#l1');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('multiple-label')
        .call(checkContext, target)
    );
    assert.deepEqual(checkContext._relatedNodes, [l1]);
  });

  it('should return false if there are multiple explicit labels but one is hidden', function () {
    fixtureSetup(
      '<label for="test-input2" id="l1">label one</label>' +
        '<label for="test-input2" style="display:none" id="lnone">label two</label>' +
        '<input id="test-input2" type="text">'
    );
    let target = fixture.querySelector('#test-input2');
    let l1 = fixture.querySelector('#l1');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('multiple-label')
        .call(checkContext, target)
    );
    assert.deepEqual(checkContext._relatedNodes, [l1]);
  });

  it('should return undefined if there are multiple implicit labels and one is visually hidden', function () {
    fixtureSetup(
      '<label id="l2"><label id="l1" style="opacity: 0"><input type="text" id="target"></label></label>'
    );
    let target = fixture.querySelector('#target');
    let l1 = fixture.querySelector('#l1');
    let l2 = fixture.querySelector('#l2');
    assert.isUndefined(
      axe.testUtils
        .getCheckEvaluate('multiple-label')
        .call(checkContext, target)
    );
    assert.deepEqual(checkContext._relatedNodes, [l1, l2]);
  });

  it('should return undefined if there are multiple explicit labels but some are hidden', function () {
    fixtureSetup(
      '<label for="me" id="l1">visible</label>' +
        '<label for="me" style="display:none;" id="l2">hidden</label>' +
        '<label for="me" id="l3">visible</label>' +
        '<input id="me" type="text">'
    );
    let target = fixture.querySelector('#me');
    let l1 = fixture.querySelector('#l1');
    let l3 = fixture.querySelector('#l3');
    assert.isUndefined(
      axe.testUtils
        .getCheckEvaluate('multiple-label')
        .call(checkContext, target)
    );
    assert.deepEqual(checkContext._relatedNodes, [l1, l3]);
  });

  it('should return undefined if there are multiple explicit labels and one is visually hidden', function () {
    fixtureSetup(
      '<label for="me" id="l1">visible</label>' +
        '<label for="me" id="l2" style="opacity: 0">visible</label>' +
        '<input id="me" type="text">'
    );
    let target = fixture.querySelector('#me');
    let l1 = fixture.querySelector('#l1');
    let l2 = fixture.querySelector('#l2');
    assert.isUndefined(
      axe.testUtils
        .getCheckEvaluate('multiple-label')
        .call(checkContext, target)
    );
    assert.deepEqual(checkContext._relatedNodes, [l1, l2]);
  });

  it('should return undefined if there are multiple explicit labels and one is screen reader hidden', function () {
    fixtureSetup(
      '<label for="me" id="l1">visible</label>' +
        '<label for="me" id="l2" aria-hidden="true">visible</label>' +
        '<input id="me" type="text">'
    );
    let target = fixture.querySelector('#me');
    let l1 = fixture.querySelector('#l1');
    let l2 = fixture.querySelector('#l2');
    assert.isUndefined(
      axe.testUtils
        .getCheckEvaluate('multiple-label')
        .call(checkContext, target)
    );
    assert.deepEqual(checkContext._relatedNodes, [l1, l2]);
  });

  it('should return undefined if there are implicit and explicit labels', function () {
    fixtureSetup(
      '<label id="l1" for="target">Foo</label><label id="l2"><input type="text" id="target"></label>'
    );
    let target = fixture.querySelector('#target');
    let l1 = fixture.querySelector('#l1');
    let l2 = fixture.querySelector('#l2');
    assert.isUndefined(
      axe.testUtils
        .getCheckEvaluate('multiple-label')
        .call(checkContext, target)
    );
    assert.deepEqual(checkContext._relatedNodes, [l1, l2]);
  });

  it('should return false if there an implicit label uses for attribute', function () {
    fixtureSetup(
      '<label for="target">Foo<input type="text" id="target"></label>'
    );
    let target = fixture.querySelector('#target');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('multiple-label')
        .call(checkContext, target)
    );
  });

  it('should return undefined given multiple labels and no aria-labelledby', function () {
    fixtureSetup(
      '<input type="checkbox" id="A">' +
        '<label for="A">Please</label>' +
        '<label for="A">Excuse</label>' +
        '<label for="A">My</label>' +
        '<label for="A">Dear</label>' +
        '<label for="A">Aunt</label>' +
        '<label for="A">Sally</label>'
    );
    let target = fixture.querySelector('#A');
    assert.isUndefined(
      axe.testUtils
        .getCheckEvaluate('multiple-label')
        .call(checkContext, target)
    );
  });

  it('should return undefined given multiple labels, one label AT visible, and no aria-labelledby', function () {
    fixtureSetup(
      '<input type="checkbox" id="B">' +
        '<label for="B">Please</label>' +
        '<label for="B" aria-hidden="true">Excuse</label>' +
        '<label for="B" aria-hidden="true">My</label>' +
        '<label for="B" aria-hidden="true">Dear</label>' +
        '<label for="B" aria-hidden="true">Aunt</label>' +
        '<label for="B" aria-hidden="true">Sally</label>'
    );
    let target = fixture.querySelector('#B');
    assert.isUndefined(
      axe.testUtils
        .getCheckEvaluate('multiple-label')
        .call(checkContext, target)
    );
  });

  it('should return false given multiple labels, one label AT visible, and aria-labelledby for AT visible', function () {
    fixtureSetup(
      '<input type="checkbox" id="D" aria-labelledby="E"/>' +
        '<label for="D" aria-hidden="true">Please</label>' +
        '<label for="D" id="E">Excuse</label>'
    );
    let target = fixture.querySelector('#D');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('multiple-label')
        .call(checkContext, target)
    );
  });

  it('should return false given multiple labels, one label AT visible, and aria-labelledby for all', function () {
    fixtureSetup(
      '<input type="checkbox" id="F" aria-labelledby="G H"/>' +
        '<label for="F" id="G" aria-hidden="true">Please</label>' +
        '<label for="F" id="H">Excuse</label>'
    );
    let target = fixture.querySelector('#F');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('multiple-label')
        .call(checkContext, target)
    );
  });

  it('should return false given multiple labels, one label visible, and no aria-labelledby', function () {
    fixtureSetup(
      '<input type="checkbox" id="I"/>' +
        '<label for="I" style="display:none">Please</label>' +
        '<label for="I" >Excuse</label>'
    );
    let target = fixture.querySelector('#I');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('multiple-label')
        .call(checkContext, target)
    );
  });

  it('should return undefined given multiple labels, all visible, aria-labelledby for all', function () {
    fixtureSetup(
      '<input type="checkbox" id="J" aria-labelledby="K L M N O P">' +
        '<label for="J" id="K">Please</label>' +
        '<label for="J" id="L">Excuse</label>' +
        '<label for="J" id="M">My</label>' +
        '<label for="J" id="N">Dear</label>' +
        '<label for="J" id="O">Aunt</label>' +
        '<label for="J" id="P">Sally</label>'
    );
    let target = fixture.querySelector('#J');
    assert.isUndefined(
      axe.testUtils
        .getCheckEvaluate('multiple-label')
        .call(checkContext, target)
    );
  });

  it('should return undefined given multiple labels, one AT visible, no aria-labelledby', function () {
    fixtureSetup(
      '<input type="checkbox" id="Q"/>' +
        '<label for="Q" aria-hidden="true"></label>' +
        '<label for="Q" >Excuse</label>'
    );
    let target = fixture.querySelector('#Q');
    assert.isUndefined(
      axe.testUtils
        .getCheckEvaluate('multiple-label')
        .call(checkContext, target)
    );
  });

  (shadowSupported ? it : xit)(
    'should consider labels in the same document/shadow tree',
    function () {
      fixture.innerHTML = '<div id="target"></div>';
      let target = document.querySelector('#target');
      let shadowRoot = target.attachShadow({ mode: 'open' });
      shadowRoot.innerHTML =
        '<input id="myinput" /><label for="myinput">normal</label>';
      let shadowTarget = target.shadowRoot;
      fixtureSetup();
      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('multiple-label')
          .call(checkContext, shadowTarget.firstElementChild)
      );
    }
  );

  (shadowSupported ? it : xit)(
    'should return false for valid multiple labels in the same document/shadow tree',
    function () {
      fixture.innerHTML = '<div id="target"></div>';
      let target = document.querySelector('#target');
      let shadowRoot = target.attachShadow({ mode: 'open' });
      let innerHTML = '<input type="checkbox" id="D" aria-labelledby="E"/>';
      innerHTML += '<label for="D" aria-hidden="true">Please</label>';
      innerHTML += '<label for="D" id="E">Excuse</label>';
      shadowRoot.innerHTML = innerHTML;
      fixtureSetup();
      let shadowTarget = target.shadowRoot;
      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('multiple-label')
          .call(checkContext, shadowTarget.firstElementChild)
      );
    }
  );

  (shadowSupported ? it : xit)(
    'should return undefined for invalid multiple labels in the same document/shadow tree',
    function () {
      fixture.innerHTML = '<div id="target"></div>';
      let target = document.querySelector('#target');
      let shadowRoot = target.attachShadow({ mode: 'open' });
      let innerHTML = '<input type="checkbox" id="Q"/>';
      innerHTML += '<label for="Q" aria-hidden="true"></label>';
      innerHTML += '<label for="Q" >Excuse</label>';
      shadowRoot.innerHTML = innerHTML;
      fixtureSetup();
      let shadowTarget = target.shadowRoot;
      assert.isUndefined(
        axe.testUtils
          .getCheckEvaluate('multiple-label')
          .call(checkContext, shadowTarget.firstElementChild)
      );
    }
  );
});
