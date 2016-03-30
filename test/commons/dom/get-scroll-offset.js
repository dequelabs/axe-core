

describe('dom.getScrollOffset', function () {
	'use strict';

	it('should return scrollTop and scrollLeft for normal nodes', function () {
		var offset = axe.commons.dom.getScrollOffset({
			nodeType: 3,
			scrollTop: 42,
			scrollLeft: 98
		});

		assert.equal(offset.left, 98);
		assert.equal(offset.top, 42);
	});

	it('should get the scroll from the documentElement if a document is passed in', function () {
		var offset = axe.commons.dom.getScrollOffset({
			nodeType: 9,
			documentElement: {
				scrollTop: 42,
				scrollLeft: 98
			}
		});

		assert.equal(offset.left, 98);
		assert.equal(offset.top, 42);
	});

	it('should get the scroll from the document.body if a document is passed in and it has no documentElement',
		function () {

		var offset = axe.commons.dom.getScrollOffset({
			nodeType: 9,
			body: {
				scrollTop: 42,
				scrollLeft: 98
			}
		});

		assert.equal(offset.left, 98);
		assert.equal(offset.top, 42);
	});

	it('should work on a window object', function () {
		var offset = axe.commons.dom.getScrollOffset({
			document: {
				nodeType: 9,
				documentElement: {
					scrollTop: 42,
					scrollLeft: 98
				}
			}
		});

		assert.equal(offset.left, 98);
		assert.equal(offset.top, 42);
	});

});
