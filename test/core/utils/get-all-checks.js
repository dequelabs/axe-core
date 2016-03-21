
describe('axe.utils.getAllChecks', function () {
	'use strict';

	it('should be a function', function () {
		assert.isFunction(axe.utils.getAllChecks);
	});

  it('should concatenate all 3 check collections', function () {
    var r = {
      any: ['any:foo', 'any:bar'],
      all: ['all:foo', 'all:bar'],
      none: ['none:foo', 'none:bar']
    };
    assert.deepEqual(axe.utils.getAllChecks(r), [
      'any:foo', 'any:bar',
      'all:foo', 'all:bar',
      'none:foo', 'none:bar'
    ]);
  });

	it('should safely ignore missing collections - all', function () {
    var r = {
      any: ['any:foo', 'any:bar'],
      none: ['none:foo', 'none:bar']
    };
    assert.deepEqual(axe.utils.getAllChecks(r), [
      'any:foo', 'any:bar',
      'none:foo', 'none:bar'
    ]);

	});

	it('should safely ignore missing collections - any', function () {
    var r = {
      all: ['all:foo', 'all:bar'],
      none: ['none:foo', 'none:bar']
    };
    assert.deepEqual(axe.utils.getAllChecks(r), [
      'all:foo', 'all:bar',
      'none:foo', 'none:bar'
    ]);

	});

	it('should safely ignore missing collections - none', function () {
    var r = {
      any: ['any:foo', 'any:bar'],
      all: ['all:foo', 'all:bar']
    };
    assert.deepEqual(axe.utils.getAllChecks(r), [
      'any:foo', 'any:bar',
      'all:foo', 'all:bar'
    ]);

	});
});
