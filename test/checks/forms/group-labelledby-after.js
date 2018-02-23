
describe('group-labelledby-after', function () {
	'use strict';

	function createResult(type, name) {
		return {
			data: {
				type: type,
				name: name
			}
		};
	}

	it('should remove duplicate names', function () {
		assert.deepEqual(
			checks['group-labelledby'].after([
				createResult('monkey', 'george'),
				createResult('monkey', 'fred'),
				createResult('ape', 'george'),
				createResult('monkey', 'george'),
				createResult('monkey', 'sally'),
				createResult('ape', 'sally'),
				createResult('ape', ''),
				createResult('ape', ''),
				{},
				{ data: null }
			]),
			[
				createResult('monkey', 'george'),
				createResult('monkey', 'fred'),
				createResult('ape', 'george'),
				createResult('monkey', 'sally'),
				createResult('ape', 'sally'),
				createResult('ape', '')
			]);
	});
});
