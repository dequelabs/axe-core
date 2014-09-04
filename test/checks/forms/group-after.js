
describe('group-after', function () {
	'use strict';

	function createResult(type, name) {
		return {
			data: {
				type: type,
				name: name
			}
		};
	}

	function tests(checkID) {

		describe(checkID, function () {

			it('should remove duplicate names', function () {
				assert.deepEqual(
					checks[checkID].after([
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
	}

	tests('fieldset');
	tests('labelledby');

});