
describe('utils.getAllChecks', function () {
	'use strict';

	it('should be a function', function () {
		assert.isFunction(utils.getAllChecks);
	});

  it('should concatenate all 3 check collections', function () {
    var r = {
      any: ['any:foo', 'any:bar'],
      all: ['all:foo', 'all:bar'],
      none: ['none:foo', 'none:bar'],
    }
    assert.deepEqual(utils.getAllChecks(r), [
      'any:foo', 'any:bar',
      'all:foo', 'all:bar',
      'none:foo', 'none:bar'
    ]);
  });
});
