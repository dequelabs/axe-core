
describe('fieldset-after', function () {
	'use strict';

	function createResult(result, data) {
		return {
			result: result,
			data: data
		};
	}

	it('should remove duplicate results', function () {
		var result = checks.fieldset.after([
			createResult(true, {
				name: 'ape',
				type: 'checkbox'
			}),
			createResult(true, {
				name: 'monkey',
				type: 'checkbox'
			}),
			createResult(false, {
				failureCode: 'no-legend',
				name: 'ape',
				type: 'checkbox'
			}),
			createResult(false, {
				failureCode: 'no-group',
				name: 'ape',
				type: 'checkbox'
			}),
			createResult(true, {
				name: 'monkey',
				type: 'checkbox'
			}),
			createResult(false, {
				failureCode: 'no-group',
				name: 'ape',
				type: 'radio'
			}),
			{},
			createResult(false, {
				failureCode: 'no-group',
				name: 'ape',
				type: 'checkbox'
			}),
			{ data: null }
		]);

		assert.deepEqual(result, [
			createResult(true, {
				name: 'ape',
				type: 'checkbox'
			}),
			createResult(true, {
				name: 'monkey',
				type: 'checkbox'
			}),
			createResult(false, {
				failureCode: 'no-legend',
				name: 'ape',
				type: 'checkbox'
			}),
			createResult(false, {
				failureCode: 'no-group',
				name: 'ape',
				type: 'checkbox'
			}),
			createResult(true, {
				name: 'monkey',
				type: 'checkbox'
			}),
			createResult(false, {
				failureCode: 'no-group',
				name: 'ape',
				type: 'radio'
			}),
		]);
	});
});
