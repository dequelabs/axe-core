describe('layout-table-matches', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var rule;

  beforeEach(function () {
    rule = axe.utils.getRule('frame-title-unique');
  });

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should return true if title attribute has text', function () {
    fixture.innerHTML = '<iframe title="hello"></iframe>';
    var node = fixture.firstChild;
    assert.isTrue(rule.matches(node));
  });

  it('should return false if title attribute is empty', function () {
    fixture.innerHTML = '<iframe title=""></iframe>';
    var node = fixture.firstChild;
    assert.isFalse(rule.matches(node));
  });

  it('should return false if title attribute contains only whitespace', function () {
    fixture.innerHTML = '<iframe title="    "></iframe>';
    var node = fixture.firstChild;
    assert.isFalse(rule.matches(node));
  });
});
