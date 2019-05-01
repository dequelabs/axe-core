describe('axe.utils.cache', function() {
	'use strict';

	it('should set items from the cache without error', function() {
		function fn() {
			axe.utils.cache.set('foo', 'bar');
		}
		assert.doesNotThrow(fn);
	});

	it('should not throw for non-string keys', function() {
		function fn() {
			axe.utils.cache.set(1, 'bar');
			axe.utils.cache.set({}, 'bar');
			axe.utils.cache.set(null, 'bar');
		}
		assert.doesNotThrow(fn);
	});

	it('should get an item from the cache', function() {
		axe.utils.cache.set('foo', 'bar');
		var value = axe.utils.cache.get('foo');
		assert.equal(value, 'bar');
	});

	it('should clear the cache', function() {
		axe.utils.cache.set('foo', 'bar');
		axe.utils.cache.clear();
		var value = axe.utils.cache.get('foo');
		assert.isUndefined(value);
	});
});
