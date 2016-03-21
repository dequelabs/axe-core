describe('utils.tokenList', function () {
	'use strict';

	it('should split by space', function () {
		assert.deepEqual(axe.commons.utils.tokenList('bananas monkeys 42'), ['bananas', 'monkeys', '42']);
	});

	it('should trim first', function () {
		assert.deepEqual(axe.commons.utils.tokenList(' \r   bananas monkeys 42	\n  '), ['bananas', 'monkeys', '42']);
	});

	it('should collapse whitespace', function () {
		assert.deepEqual(axe.commons.utils.tokenList(' \r   bananas \r \n	monkeys		42	\n  '), ['bananas', 'monkeys', '42']);
	});
});