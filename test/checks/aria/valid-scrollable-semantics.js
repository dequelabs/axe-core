describe('valid-scrollable-semantics', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var flatTreeSetup = axe.testUtils.flatTreeSetup;
  var checkContext = axe.testUtils.MockCheckContext();

  afterEach(function () {
    fixture.innerHTML = '';
    checkContext._data = null;
  });

  it('should return false for role=banner', function () {
    var node = document.createElement('div');
    node.setAttribute('role', '"banner');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('valid-scrollable-semantics')
        .call(checkContext, node)
    );
  });

  it('should return false for role=search', function () {
    var node = document.createElement('div');
    node.setAttribute('role', 'search');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('valid-scrollable-semantics')
        .call(checkContext, node)
    );
  });

  it('should return true for role=form', function () {
    var node = document.createElement('div');
    node.setAttribute('role', 'form');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('valid-scrollable-semantics')
        .call(checkContext, node)
    );
  });

  it('should return true for role=navigation', function () {
    var node = document.createElement('div');
    node.setAttribute('role', 'navigation');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('valid-scrollable-semantics')
        .call(checkContext, node)
    );
  });

  it('should return true for role=complementary', function () {
    var node = document.createElement('div');
    node.setAttribute('role', 'complementary');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('valid-scrollable-semantics')
        .call(checkContext, node)
    );
  });

  it('should return true for role=contentinfo', function () {
    var node = document.createElement('div');
    node.setAttribute('role', 'contentinfo');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('valid-scrollable-semantics')
        .call(checkContext, node)
    );
  });

  it('should return true for role=main', function () {
    var node = document.createElement('div');
    node.setAttribute('role', 'main');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('valid-scrollable-semantics')
        .call(checkContext, node)
    );
  });

  it('should return true for role=region', function () {
    var node = document.createElement('div');
    node.setAttribute('role', 'region');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('valid-scrollable-semantics')
        .call(checkContext, node)
    );
  });

  it('should return true for role=alertdialog', function () {
    var node = document.createElement('div');
    node.setAttribute('role', 'alertdialog');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('valid-scrollable-semantics')
        .call(checkContext, node)
    );
  });

  it('should return true for role=article', function () {
    var node = document.createElement('div');
    node.setAttribute('role', 'article');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('valid-scrollable-semantics')
        .call(checkContext, node)
    );
  });

  it('should return true for role=dialog', function () {
    var node = document.createElement('div');
    node.setAttribute('role', 'dialog');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('valid-scrollable-semantics')
        .call(checkContext, node)
    );
  });

  it('should return true for nav elements', function () {
    var node = document.createElement('nav');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('valid-scrollable-semantics')
        .call(checkContext, node)
    );
  });

  it('should return true for section elements', function () {
    var node = document.createElement('section');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('valid-scrollable-semantics')
        .call(checkContext, node)
    );
  });

  it('should return true for article elements', function () {
    var node = document.createElement('article');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('valid-scrollable-semantics')
        .call(checkContext, node)
    );
  });

  it('should return true for aside elements', function () {
    var node = document.createElement('aside');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('valid-scrollable-semantics')
        .call(checkContext, node)
    );
  });

  it('should return true for role=tabpanel', function () {
    var node = document.createElement('div');
    node.setAttribute('role', 'tabpanel');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('valid-scrollable-semantics')
        .call(checkContext, node)
    );
  });

  it('should return true for role=tooltip', function () {
    var node = document.createElement('div');
    node.setAttribute('role', 'tooltip');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('valid-scrollable-semantics')
        .call(checkContext, node)
    );
  });

  describe('options', function () {
    it('should allow options.roles to return true for role', function () {
      var node = document.createElement('div');
      node.setAttribute('role', 'banner');
      fixture.appendChild(node);
      flatTreeSetup(fixture);
      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('valid-scrollable-semantics')
          .call(checkContext, node, { roles: ['banner'] })
      );
    });
  });
});
