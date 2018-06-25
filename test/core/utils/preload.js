

describe('axe.utils.preload', function () {
	'use strict';

	it('should be a function', function () {
		assert.isFunction(axe.utils.preload);
	});

	it('should return a queue', function () {
		var options = {
			preload: true
		};
		var actual = axe.utils.preload(options);
		assert.isObject(actual);
	});

	it('should ensure queue is defer(able)', function (done) {
		var options = {
			preload: false
		};
		var actual = axe.utils.preload(options);
		actual
			.defer((function (res, rej) {
				assert.isFunction(rej);
				res(true);
				assert.isOk(true);
				done();
			}));
	});

	it('should ensure queue is then(able)', function (done) {
		var options = {
			preload: false
		};
		var actual = axe.utils.preload(options);
		actual
			.then((function (results) {
				assert.isDefined(results);
				assert.isOk(true);
				done();
			}));
	});

});