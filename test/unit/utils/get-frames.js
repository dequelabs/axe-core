describe('utils.getFrames', function () {
	'use strict';

	it('should call querySelectorAll on parameter', function () {
		var called = false,
			context = {
				querySelectorAll: function (param) {
					called = true;
					assert.equal(param, 'frame, iframe');
					return document.querySelectorAll('hehehehe');
				}
			};

		utils.getFrames(context);
		assert.isTrue(called);

	});

	it('should return a real array', function () {
		assert.isArray(utils.getFrames(document));
	});
});
