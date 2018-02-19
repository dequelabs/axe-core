describe('unique-frame-title-after', function () {
	'use strict';

	var checkContext = axe.testUtils.MockCheckContext();

	afterEach(function () {
		checkContext.reset();
	});


	it('should remove any check whose data only appears once', function () {
		var result = checks['unique-frame-title'].after([{
				data: 'bananas'
			}, {
				data: 'monkeys'
			}, {
				data: 'bananas'
			}, {
				data: 'apples'
			}, {
				data: 'monkeys'
			}]);

		assert.deepEqual(result, [{
				data: 'bananas',
				result: true
			}, {
				data: 'monkeys',
				result: true
			}, {
				data: 'bananas',
				result: true
			}, {
				data: 'apples',
				result: false
			}, {
				data: 'monkeys',
				result: true
		}]);
	});
});
