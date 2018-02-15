describe('heading-matches', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var rule;

  beforeEach(function () {
    rule = axe._audit.rules.find(function (rule) {
      return rule.id === 'empty-heading';
    });
  });

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('is a function', function () {
    assert.isFunction(rule.matches);
  });

  it('should return false on elements that are not headings', function () {
    var div = document.createElement('div');
    assert.isFalse(rule.matches(div));
  });

  it('should return true on elements with "heading" in the role', function () {
    var div = document.createElement('div');
    div.setAttribute('role', 'heading');
    assert.isTrue(rule.matches(div));

    div.setAttribute('role', 'slider heading');
    assert.isTrue(rule.matches(div));
  });

  it('should return true on regular headings without roles', function () {
    var h1 = document.createElement('h1');
    var h2 = document.createElement('h2');
    var h3 = document.createElement('h3');
    assert.isTrue(rule.matches(h1));
    assert.isTrue(rule.matches(h2));
    assert.isTrue(rule.matches(h3));
  });

  it('should return false on headings with their role changes', function () {
    var h1 = document.createElement('h1');
    h1.setAttribute('role', 'banner');
    assert.isFalse(rule.matches(h1));
  });

  it('should return true on headings with their role changes to an invalid role', function () {
    var h1 = document.createElement('h1');
    h1.setAttribute('role', 'bruce');
    assert.isTrue(rule.matches(h1));
  });
});