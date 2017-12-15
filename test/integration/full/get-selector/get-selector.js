
describe('axe.utils.getSelector', function () {
	'use strict';
	it('should work on namespaced elements', function () {
		var fixture = document.querySelector('#fixture');
		var node = fixture.firstElementChild;
		var sel = axe.utils.getSelector(node);
		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], node);
	});
});
