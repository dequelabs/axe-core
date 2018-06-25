

describe('axe.utils.preload', function () {
	'use strict';

	it('should be a function', function () {
		assert.isFunction(axe.utils.preload);
	});

	it('should return a queue', function () {
		const options = {
			preload: true
		};
		const actual = axe.utils.preload(options);
		assert.isObject(actual);
	});

	it('should ensure queue is defer(able)', function (done) {
		const options = {
			preload: false
		};
		const actual = axe.utils.preload(options);
		actual
			.defer((function (res, rej) {
				res(true);
				assert.isOk(true);
				done();
			}));
	});

	it('should ensure queue is then(able)', function (done) {
		const options = {
			preload: false
		};
		const actual = axe.utils.preload(options);
		actual
			.then((function (results) {
				assert.isOk(true);
				done();
			}));
	});

});