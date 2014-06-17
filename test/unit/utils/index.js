describe('utils', function () {
	'use strict';

	it('should be an object', function () {
		assert.isObject(window.utils);
	});
});

describe('utils.escapeSelector', function () {
	'use strict';

	it('should be a function', function () {
		assert.isFunction(utils.escapeSelector);
	});
});

describe('utils.matchesSelector', function () {
	'use strict';

	it('should be a function', function () {
		assert.isFunction(utils.matchesSelector);
	});
});

describe('utils.clone', function () {
	'use strict';

	it('should be a function', function () {
		assert.isFunction(utils.clone);
	});
});