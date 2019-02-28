describe('landmark-is-unique-after', function() {
	'use strict';

	function createResult(result, data) {
		return {
			result: result,
			data: data
		};
	}

	it('should update duplicate landmarks with failed result', function() {
		var result = checks['landmark-is-unique'].after([
			createResult(true, {
				role: 'some role',
				label: 'some label'
			}),
			createResult(true, {
				role: 'some role',
				label: 'some label'
			}),
			createResult(true, {
				role: 'different role',
				label: 'some label'
			}),
			createResult(true, {
				role: 'some role',
				label: 'different label'
			})
		]);

		assert.deepEqual(result, [
			createResult(false, {
				role: 'some role',
				label: 'some label'
			}),
			createResult(false, {
				role: 'some role',
				label: 'some label'
			}),
			createResult(true, {
				role: 'different role',
				label: 'some label'
			}),
			createResult(true, {
				role: 'some role',
				label: 'different label'
			})
		]);
	});
});
