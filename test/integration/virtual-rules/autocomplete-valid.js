describe('autocomplete-valid virtual-rule', function () {
  it('should pass when autocomplete is valid', function () {
    var results = axe.runVirtualRule('autocomplete-valid', {
      nodeName: 'input',
      attributes: {
        type: 'text',
        autocomplete: 'country-name'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass when autocomplete is correctly used', function () {
    var results = axe.runVirtualRule('autocomplete-valid', {
      nodeName: 'input',
      attributes: {
        type: 'text',
        autocomplete: 'email'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail autocomplete is not valid', function () {
    var results = axe.runVirtualRule('autocomplete-valid', {
      nodeName: 'input',
      attributes: {
        type: 'text',
        autocomplete: 'foobar'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
