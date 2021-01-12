describe('not-html-matches', function() {
  'use strict';

  var fixture = document.getElementById('fixture');
  var rule;

  beforeEach(function() {
    rule = axe._audit.rules.find(function(rule) {
      return rule.id === 'valid-lang';
    });
  });

  afterEach(function() {
    fixture.innerHTML = '';
  });

  it('returns true when element is not the html element', function() {
    assert.isTrue(rule.matches(fixture));
  });

  it('returns false when element is the html element', function() {
    assert.isFalse(rule.matches(document.documentElement));
  });
});
