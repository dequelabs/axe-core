describe('layout-table-matches', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var flatTreeSetup = axe.testUtils.flatTreeSetup;
  var rule;

  beforeEach(function () {
    axe.configure({
      rules: [
        {
          id: 'layout-rule',
          matches: 'layout-table-matches'
        }
      ]
    });

    rule = axe.utils.getRule('layout-rule');
  });

  afterEach(function () {
    fixture.innerHTML = '';
    axe.reset();
  });

  it('should return false for data table', function () {
    fixture.innerHTML = '<table><caption>Hello></caption></table>';
    flatTreeSetup(fixture);
    var node = fixture.firstChild;

    assert.isFalse(rule.matches(node));
  });

  it('should return false if the table is focusable', function () {
    fixture.innerHTML = '<table tabindex="0"></table>';
    flatTreeSetup(fixture);
    var node = fixture.firstChild;

    assert.isFalse(rule.matches(node));
  });

  it('should return true if table has role=presentation', function () {
    fixture.innerHTML = '<table role="presentation"></table>';
    flatTreeSetup(fixture);
    var node = fixture.firstChild;

    assert.isTrue(rule.matches(node));
  });

  it('should return true if table has role=none', function () {
    fixture.innerHTML = '<table role="none"></table>';
    flatTreeSetup(fixture);
    var node = fixture.firstChild;

    assert.isTrue(rule.matches(node));
  });
});
