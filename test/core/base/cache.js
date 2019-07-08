describe('axe._cache', function() {
	'use strict';

	it('should set items from the cache without error', function() {
		function fn() {
			axe._cache.set('foo', 'bar');
		}
		assert.doesNotThrow(fn);
	});

	it('should not throw for non-string keys', function() {
		function fn() {
			axe._cache.set(1, 'bar');
			axe._cache.set({}, 'bar');
			axe._cache.set(null, 'bar');
		}
		assert.doesNotThrow(fn);
	});

	it('should get an item from the cache', function() {
		axe._cache.set('foo', 'bar');
		var value = axe._cache.get('foo');
		assert.equal(value, 'bar');
	});

	it('should clear the cache', function() {
		axe._cache.set('foo', 'bar');
		axe._cache.clear();
		var value = axe._cache.get('foo');
		assert.isUndefined(value);
	});
});
