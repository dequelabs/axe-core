describe('utils.getFrames', function () {
	'use strict';

	it('should call utils.select and pass parameter', function () {
		var called = false;
		var orig = utils.select;
		var context = 'cats, dogs and things';

		utils.select = function (sel, cxt) {
			called = true;
			assert.equal(sel, 'frame, iframe');
			assert.equal(cxt, context);
			return [];
		};

		utils.getFrames(context);
		assert.isTrue(called);

		utils.select = orig;

	});

	it('should return a real array', function () {
		assert.isArray(utils.getFrames({ include: [document] }));
	});
});
