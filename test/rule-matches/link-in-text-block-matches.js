describe('link-in-text-block-matches', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var fixtureSetup = axe.testUtils.fixtureSetup;
  var rule;

  beforeEach(function () {
    rule = axe.utils.getRule('link-in-text-block');
  });

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should return true if link is in text block', function () {
    fixtureSetup(
      '<p>Some paragraph with text <a id="target" href="#">world</a></p>'
    );
    var node = document.getElementById('target');
    assert.isTrue(rule.matches(node));
  });

  it('should return false if element has a non-link role', function () {
    fixtureSetup(
      '<p>Some paragraph with text <a id="target" href="#" role="button">hello</a></p>'
    );
    var node = document.getElementById('target');
    assert.isFalse(rule.matches(node));
  });

  it('should should return false if element does not have text', function () {
    fixtureSetup(
      '<p>Some paragraph with text <a id="target" href="#"></a></p>'
    );
    var node = document.getElementById('target');
    assert.isFalse(rule.matches(node));
  });

  it('should return false if element is hidden', function () {
    fixtureSetup(
      '<p>Some paragraph with text <a id="target" href="#"" style="display: none">hello</a></p>'
    );
    var node = document.getElementById('target');
    assert.isFalse(rule.matches(node));
  });

  it('should return false if link is not in text block', function () {
    fixtureSetup('<a id="target" href="#">hello</a>');
    var node = document.getElementById('target');
    assert.isFalse(rule.matches(node));
  });

  it('should return false if link is only text in block', function () {
    fixtureSetup('<p><a id="target" href="#">world</a></p>');
    var node = document.getElementById('target');
    assert.isFalse(rule.matches(node));
  });

  it('should return false if link is display block', function () {
    fixtureSetup(
      '<p>Some paragraph with text <a id="target" href="#" style="display: block">world</a></p>'
    );
    var node = document.getElementById('target');
    assert.isFalse(rule.matches(node));
  });
});
