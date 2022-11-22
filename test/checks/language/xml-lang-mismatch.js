describe('xml-lang-mismatch', function () {
  'use strict';

  var checkContext = axe.testUtils.MockCheckContext();
  var queryFixture = axe.testUtils.queryFixture;

  beforeEach(function () {
    // using a div element (instead of html), as the check is agnostic of element type
  });

  afterEach(function () {
    checkContext.reset();
  });

  // the rule matches filters out node of type HTML, and tests cover this scenario to ensure other elements are not allowed for this check
  // hence below tests are only for HTML element, although the logic in the check looks for matches in value os lang and xml:lang
  // rather than node type match - hence the check can be re-used.

  it('should return false if a only lang is supplied', function () {
    var vNode = queryFixture('<div id="target" lang="en"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('xml-lang-mismatch')
        .call(checkContext, null, {}, vNode)
    );
  });

  it('should return false if a only xml:lang is supplied albeit with region', function () {
    var vNode = queryFixture('<div id="target" xml:lang="fr-FR"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('xml-lang-mismatch')
        .call(checkContext, null, {}, vNode)
    );
  });

  it('should return false if lang is undefined', function () {
    var node = document.createElement('div');
    node.setAttribute('lang', undefined);
    var tree = axe.testUtils.flatTreeSetup(node);
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('xml-lang-mismatch')
        .call(checkContext, null, {}, tree[0])
    );
  });

  it('should return true if lang and xml:lang is identical', function () {
    var vNode = queryFixture(
      '<div id="target" xml:lang="en-GB" lang="en-GB"></div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('xml-lang-mismatch')
        .call(checkContext, null, {}, vNode)
    );
  });

  it('should return true if lang and xml:lang have identical primary sub tag', function () {
    var vNode = queryFixture(
      '<div id="target" xml:lang="en-US" lang="en-GB"></div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('xml-lang-mismatch')
        .call(checkContext, null, {}, vNode)
    );
  });

  it('should return false if lang and xml:lang are not identical', function () {
    var vNode = queryFixture(
      '<div id="target" xml:lang="fr-FR" lang="en"></div>'
    );
    var actual = axe.testUtils
      .getCheckEvaluate('xml-lang-mismatch')
      .call(checkContext, null, {}, vNode);
    assert.isFalse(actual);
  });
});
