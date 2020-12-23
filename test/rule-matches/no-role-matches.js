describe('link-in-text-block-matches', function() {
  'use strict';

  var fixture = document.getElementById('fixture');
  var rule;

  beforeEach(function() {
    rule = axe._audit.rules.find(function(rule) {
      return rule.id === 'definition-list';
    });
  });

  afterEach(function() {
    fixture.innerHTML = '';
  });

  it('should return true if element does not have a role attribute', function() {
    fixture.innerHTML = '<div></div>';
    var node = fixture.firstChild;
    assert.isTrue(rule.matches(node));
  });

  it('should return true if element has an empty role attribute', function() {
    fixture.innerHTML = '<div role=""></div>';
    var node = fixture.firstChild;
    assert.isTrue(rule.matches(node));
  });

  it('should return false if element has a role attribute', function() {
    fixture.innerHTML = '<div role="button"></div>';
    var node = fixture.firstChild;
    assert.isFalse(rule.matches(node));
  });
});
