describe('structured-dlitems', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var checkSetup = axe.testUtils.checkSetup;
  var shadowSupport = axe.testUtils.shadowSupport;

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should return false if the list has no contents', function () {
    var checkArgs = checkSetup('<dl id="target"></dl>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('structured-dlitems')
        .apply(null, checkArgs)
    );
  });

  it('should return true if the list has only a dd', function () {
    var checkArgs = checkSetup('<dl id="target"><dd>A list</dd></dl>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('structured-dlitems')
        .apply(null, checkArgs)
    );
  });

  it('should return true if the list has only a dt', function () {
    var checkArgs = checkSetup('<dl id="target"><dt>A list</dt></dl>');

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('structured-dlitems')
        .apply(null, checkArgs)
    );
  });

  it('should return true if the list has dt and dd in the incorrect order', function () {
    var checkArgs = checkSetup(
      '<dl id="target"><dd>A list</dd><dt>An item</dt></dl>'
    );

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('structured-dlitems')
        .apply(null, checkArgs)
    );
  });

  it('should return true if the list has dt and dd in the correct order as non-child descendants', function () {
    var checkArgs = checkSetup(
      '<dl id="target"><dd><dl><dt>An item</dt><dd>A list</dd></dl></dd></dl>'
    );

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('structured-dlitems')
        .apply(null, checkArgs)
    );
  });

  it('should return false if the list has dt and dd in the correct order', function () {
    var checkArgs = checkSetup(
      '<dl id="target"><dt>An item</dt><dd>A list</dd></dl>'
    );

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('structured-dlitems')
        .apply(null, checkArgs)
    );
  });

  it('should return false if the list has a correctly-ordered dt and dd with other content', function () {
    var checkArgs = checkSetup(
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
      var node = document.createElement('div');
      node.innerHTML = '<dt>Grayhound bus</dt><dd>at dawn</dd>';
      var shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<dl><slot></slot></dl>';

      var checkArgs = checkSetup(node, 'dl');
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
      var node = document.createElement('div');
      node.innerHTML = '<dd>Galileo</dd><dt>Figaro</dt>';
      var shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<dl><slot></slot></dl>';

      var checkArgs = checkSetup(node, 'dl');
      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('structured-dlitems')
          .apply(null, checkArgs)
      );
    }
  );

  (shadowSupport.v1 ? describe : describe.skip)(
    'custom elements with shadow DOM',
    function () {
      it('should return false when custom elements wrap <dt> and <dd> in correct order', function () {
        var term = document.createElement('my-term');
        term.attachShadow({ mode: 'open' }).innerHTML =
          '<dt><slot></slot></dt>';
        term.textContent = 'Term';

        var def = document.createElement('my-definition');
        def.attachShadow({ mode: 'open' }).innerHTML = '<dd><slot></slot></dd>';
        def.textContent = 'Definition';

        var host = document.createElement('div');
        host.appendChild(term);
        host.appendChild(def);
        host.attachShadow({ mode: 'open' }).innerHTML =
          '<dl><slot></slot></dl>';

        var checkArgs = checkSetup(host, 'dl');
        assert.isFalse(
          axe.testUtils
            .getCheckEvaluate('structured-dlitems')
            .apply(null, checkArgs)
        );
      });

      it('should return true when custom elements wrap <dt> and <dd> in wrong order', function () {
        var def = document.createElement('my-definition');
        def.attachShadow({ mode: 'open' }).innerHTML = '<dd><slot></slot></dd>';
        def.textContent = 'Definition';

        var term = document.createElement('my-term');
        term.attachShadow({ mode: 'open' }).innerHTML =
          '<dt><slot></slot></dt>';
        term.textContent = 'Term';

        var host = document.createElement('div');
        host.appendChild(def);
        host.appendChild(term);
        host.attachShadow({ mode: 'open' }).innerHTML =
          '<dl><slot></slot></dl>';

        var checkArgs = checkSetup(host, 'dl');
        assert.isTrue(
          axe.testUtils
            .getCheckEvaluate('structured-dlitems')
            .apply(null, checkArgs)
        );
      });

      it('should return false when custom element wraps <dt> followed by native <dd>', function () {
        var term = document.createElement('my-term');
        term.attachShadow({ mode: 'open' }).innerHTML =
          '<dt><slot></slot></dt>';
        term.textContent = 'Term';

        var dd = document.createElement('dd');
        dd.textContent = 'Definition';

        var host = document.createElement('div');
        host.appendChild(term);
        host.appendChild(dd);
        host.attachShadow({ mode: 'open' }).innerHTML =
          '<dl><slot></slot></dl>';

        var checkArgs = checkSetup(host, 'dl');
        assert.isFalse(
          axe.testUtils
            .getCheckEvaluate('structured-dlitems')
            .apply(null, checkArgs)
        );
      });

      it('should return false when native <dt> followed by custom element wrapping <dd>', function () {
        var dt = document.createElement('dt');
        dt.textContent = 'Term';

        var def = document.createElement('my-definition');
        def.attachShadow({ mode: 'open' }).innerHTML = '<dd><slot></slot></dd>';
        def.textContent = 'Definition';

        var host = document.createElement('div');
        host.appendChild(dt);
        host.appendChild(def);
        host.attachShadow({ mode: 'open' }).innerHTML =
          '<dl><slot></slot></dl>';

        var checkArgs = checkSetup(host, 'dl');
        assert.isFalse(
          axe.testUtils
            .getCheckEvaluate('structured-dlitems')
            .apply(null, checkArgs)
        );
      });
    }
  );
});
