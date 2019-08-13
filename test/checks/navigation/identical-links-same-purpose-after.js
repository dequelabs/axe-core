describe('identical-links-same-purpose-after tests', function() {
	'use strict';

	var check = checks['identical-links-same-purpose'];

	it('sets results of check result to `undefined` if links do not serve identical purpose', function() {
		var checkResults = [
			{
				data: { name: 'follow us', resource: 'http://facebook.com' },
				result: true
			},
			{
				data: { name: 'follow us', resource: 'http://instagram.com' },
				result: true
			}
		];
		var results = check.after(checkResults);
		assert.lengthOf(results, 2);
		assert.isUndefined(results[0].result);
		assert.isUndefined(results[1].result);
	});

	it('sets results of check result to `true` if links serve identical purpose', function() {
		var checkResults = [
			{
				data: { name: 'Axe Core', resource: 'http://deque.com/axe-core' },
				result: true
			},
			{
				data: {
					name: 'Axe Core',
					resource: 'http://deque.com/axe-core/index.html'
				},
				result: true
			}
		];
		var results = check.after(checkResults);
		assert.lengthOf(results, 2);
		assert.isTrue(results[0].result);
		assert.isTrue(results[1].result);
	});
});
