describe('utils.isHidden', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should be a function', function () {
		assert.isFunction(utils.isHidden);
	});

	it('should return false on detached elements', function () {
		var el = document.createElement('div');
		el.innerHTML = 'I am not visible because I am detached!';

		assert.isTrue(utils.isHidden(el));
	});

	it('should return false on a document', function () {
		assert.isFalse(utils.isHidden(document));
	});

	it('should return true if `aria-hidden` is set', function () {
		fixture.innerHTML = '<div id="target" aria-hidden="true">Hidden from screen readers</div>';

		var el = document.getElementById('target');
		assert.isTrue(utils.isHidden(el));
	});

	it('should return true if `display: none` is set', function () {
		fixture.innerHTML = '<div id="target" style="display: none">Hidden from screen readers</div>';

		var el = document.getElementById('target');
		assert.isTrue(utils.isHidden(el));
	});

	it('should return true if `aria-hidden` is set on parent', function () {
		fixture.innerHTML = '<div aria-hidden="true"><div id="target">Hidden from screen readers</div></div>';

		var el = document.getElementById('target');
		assert.isTrue(utils.isHidden(el));
	});

	it('should know how `visibility` works', function () {
		fixture.innerHTML = '<div style="visibility: hidden;">' +
				'<div id="target" style="visibility: visible;">Hi</div>' +
			'</div>';

		var el = document.getElementById('target');
		assert.isFalse(utils.isHidden(el));
	});



});