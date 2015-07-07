
describe('helpers.formatNode', function () {
	'use strict';

	it('should return selector as target', function () {
		var result = helpers.formatNode({ selector: 'foo' });
		assert.equal(result.target, 'foo');
	});

	it('should return source as html', function () {
		var result = helpers.formatNode({ source: 'foo' });
		assert.equal(result.html, 'foo');
	});

	it('should default target to null', function () {
		var result = helpers.formatNode(null);
		assert.isNull(result.target);
	});

	it('should default html to null', function () {
		var result = helpers.formatNode(null);
		assert.isNull(result.html);
	});
});
