describe('dlitem', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var checkSetup = axe.testUtils.checkSetup;
  var shadowSupport = axe.testUtils.shadowSupport;

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should pass if the dlitem has a parent <dl>', function () {
    var checkArgs = checkSetup('<dl><dt id="target">My list item</dt></dl>');

    assert.isTrue(checks.dlitem.evaluate.apply(null, checkArgs));
  });

  it('should fail if the dt element has an incorrect parent', function () {
    var checkArgs = checkSetup(
      '<video><dt id="target">My list item</dt></video>'
    );

    assert.isFalse(checks.dlitem.evaluate.apply(null, checkArgs));
  });

  it('should pass if the dt element has a parent <dl> with role="list"', function () {
    var checkArgs = checkSetup(
      '<dl role="list"><dt id="target">My list item</dt></dl>'
    );
    assert.isTrue(checks.dlitem.evaluate.apply(null, checkArgs));
  });

  it('should pass if the dt element has a parent <dl> with role="presentation"', function () {
    var checkArgs = checkSetup(
      '<dl role="presentation"><dt id="target">My list item</dt></dl>'
    );
    assert.isTrue(checks.dlitem.evaluate.apply(null, checkArgs));
  });

  it('should fail if the dt element has a parent <dl> with a changed role', function () {
    var checkArgs = checkSetup(
      '<dl role="menubar"><dt id="target">My list item<</dt>/dl>'
    );
    assert.isFalse(checks.dlitem.evaluate.apply(null, checkArgs));
  });

  it('should pass if the dt element has a parent <dl> with an abstract role', function () {
    var checkArgs = checkSetup(
      '<dl role="section"><dt id="target">My list item</dt></dl>'
    );
    assert.isTrue(checks.dlitem.evaluate.apply(null, checkArgs));
  });

  it('should pass if the dt element has a parent <dl> with an invalid role', function () {
    var checkArgs = checkSetup(
      '<dl role="invalid-role"><dt id="target">My list item</dt></dl>'
    );
    assert.isTrue(checks.dlitem.evaluate.apply(null, checkArgs));
  });

  it('should fail if the dt element has a parent <dl> with a changed role', function () {
    var checkArgs = checkSetup(
      '<dl role="menubar"><dt id="target">My list item</dt></dl>'
    );
    assert.isFalse(checks.dlitem.evaluate.apply(null, checkArgs));
  });

  it('returns true if the dd/dt is in a div with a dl as grandparent', function () {
    var nodeNames = ['dd', 'dt'];
    nodeNames.forEach(function (nodeName) {
      var checkArgs = checkSetup(
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
    var nodeNames = ['dd', 'dt'];
    nodeNames.forEach(function (nodeName) {
      var checkArgs = checkSetup(
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
    var nodeNames = ['dd', 'dt'];
    nodeNames.forEach(function (nodeName) {
      var checkArgs = checkSetup(
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
    var nodeNames = ['dd', 'dt'];
    nodeNames.forEach(function (nodeName) {
      var checkArgs = checkSetup(
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
      var node = document.createElement('div');
      node.innerHTML = '<dt>My list item </dt>';
      var shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<dl><slot></slot></dl>';

      var checkArgs = checkSetup(node, 'dt');
      assert.isTrue(checks.dlitem.evaluate.apply(null, checkArgs));
    }
  );

  (shadowSupport.v1 ? it : xit)(
    'should return false in a shadow DOM fail',
    function () {
      var node = document.createElement('div');
      node.innerHTML = '<dt>My list item </dt>';
      var shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<div><slot></slot></div>';

      var checkArgs = checkSetup(node, 'dt');
      assert.isFalse(checks.dlitem.evaluate.apply(null, checkArgs));
    }
  );

  (shadowSupport.v1 ? it : xit)(
    'should return true when the item is grouped in dl > div in a shadow DOM',
    function () {
      var node = document.createElement('div');
      node.innerHTML = '<dt>My list item </dt>';
      var shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<dl><div><slot></slot></div></dl>';

      var checkArgs = checkSetup(node, 'dt');
      assert.isTrue(checks.dlitem.evaluate.apply(null, checkArgs));
    }
  );
});
