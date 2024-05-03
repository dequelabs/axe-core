describe('dlitem', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let checkSetup = axe.testUtils.checkSetup;
  let shadowSupport = axe.testUtils.shadowSupport;

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should pass if the dlitem has a parent <dl>', function () {
    let checkArgs = checkSetup('<dl><dt id="target">My list item</dt></dl>');

    assert.isTrue(checks.dlitem.evaluate.apply(null, checkArgs));
  });

  it('should fail if the dt element has an incorrect parent', function () {
    let checkArgs = checkSetup(
      '<video><dt id="target">My list item</dt></video>'
    );

    assert.isFalse(checks.dlitem.evaluate.apply(null, checkArgs));
  });

  it('should pass if the dt element has a parent <dl> with role="list"', function () {
    let checkArgs = checkSetup(
      '<dl role="list"><dt id="target">My list item</dt></dl>'
    );
    assert.isTrue(checks.dlitem.evaluate.apply(null, checkArgs));
  });

  it('should pass if the dt element has a parent <dl> with role="presentation"', function () {
    let checkArgs = checkSetup(
      '<dl role="presentation"><dt id="target">My list item</dt></dl>'
    );
    assert.isTrue(checks.dlitem.evaluate.apply(null, checkArgs));
  });

  it('should fail if the dt element has a parent <dl> with a changed role', function () {
    let checkArgs = checkSetup(
      '<dl role="menubar"><dt id="target">My list item<</dt>/dl>'
    );
    assert.isFalse(checks.dlitem.evaluate.apply(null, checkArgs));
  });

  it('should pass if the dt element has a parent <dl> with an abstract role', function () {
    let checkArgs = checkSetup(
      '<dl role="section"><dt id="target">My list item</dt></dl>'
    );
    assert.isTrue(checks.dlitem.evaluate.apply(null, checkArgs));
  });

  it('should pass if the dt element has a parent <dl> with an invalid role', function () {
    let checkArgs = checkSetup(
      '<dl role="invalid-role"><dt id="target">My list item</dt></dl>'
    );
    assert.isTrue(checks.dlitem.evaluate.apply(null, checkArgs));
  });

  it('should fail if the dt element has a parent <dl> with a changed role', function () {
    let checkArgs = checkSetup(
      '<dl role="menubar"><dt id="target">My list item</dt></dl>'
    );
    assert.isFalse(checks.dlitem.evaluate.apply(null, checkArgs));
  });

  it('returns true if the dd/dt is in a div with a dl as grandparent', function () {
    let nodeNames = ['dd', 'dt'];
    nodeNames.forEach(function (nodeName) {
      let checkArgs = checkSetup(
        '<dl><div><' +
          nodeName +
          ' id="target">My list item</' +
          nodeName +
          '></div></dl>'
      );
      assert.isTrue(checks.dlitem.evaluate.apply(null, checkArgs));
    });
  });

  it('returns false if the dd/dt is in a div with a role with a dl as grandparent with a list role', function () {
    let nodeNames = ['dd', 'dt'];
    nodeNames.forEach(function (nodeName) {
      let checkArgs = checkSetup(
        '<dl><div role="list"><' +
          nodeName +
          ' id="target">My list item</' +
          nodeName +
          '></div></dl>'
      );
      assert.isFalse(checks.dlitem.evaluate.apply(null, checkArgs));
    });
  });

  it('returns false if the dd/dt is in a div[role=presentation] with a dl as grandparent', function () {
    let nodeNames = ['dd', 'dt'];
    nodeNames.forEach(function (nodeName) {
      let checkArgs = checkSetup(
        '<dl><div role="presentation"><' +
          nodeName +
          ' id="target">My list item</' +
          nodeName +
          '></div></dl>'
      );
      assert.isTrue(checks.dlitem.evaluate.apply(null, checkArgs));
    });
  });

  it('returns false if the dd/dt is in a div[role=none] with a dl as grandparent', function () {
    let nodeNames = ['dd', 'dt'];
    nodeNames.forEach(function (nodeName) {
      let checkArgs = checkSetup(
        '<dl><div role="none"><' +
          nodeName +
          ' id="target">My list item</' +
          nodeName +
          '></div></dl>'
      );
      assert.isTrue(checks.dlitem.evaluate.apply(null, checkArgs));
    });
  });

  (shadowSupport.v1 ? it : xit)(
    'should return true in a shadow DOM pass',
    function () {
      let node = document.createElement('div');
      node.innerHTML = '<dt>My list item </dt>';
      let shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<dl><slot></slot></dl>';

      let checkArgs = checkSetup(node, 'dt');
      assert.isTrue(checks.dlitem.evaluate.apply(null, checkArgs));
    }
  );

  (shadowSupport.v1 ? it : xit)(
    'should return false in a shadow DOM fail',
    function () {
      let node = document.createElement('div');
      node.innerHTML = '<dt>My list item </dt>';
      let shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<div><slot></slot></div>';

      let checkArgs = checkSetup(node, 'dt');
      assert.isFalse(checks.dlitem.evaluate.apply(null, checkArgs));
    }
  );

  (shadowSupport.v1 ? it : xit)(
    'should return true when the item is grouped in dl > div in a shadow DOM',
    function () {
      let node = document.createElement('div');
      node.innerHTML = '<dt>My list item </dt>';
      let shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<dl><div><slot></slot></div></dl>';

      let checkArgs = checkSetup(node, 'dt');
      assert.isTrue(checks.dlitem.evaluate.apply(null, checkArgs));
    }
  );
});
