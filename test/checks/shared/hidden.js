describe('hidden', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should call kslib.dom.isVisible', function () {
		var orig = kslib.dom.isVisible;
		var success = false;

		kslib.dom.isVisible = function (n, sr) {
			assert.equal(n, node);
			assert.isTrue(sr, 'should pass `true` as second parameter (screenreader)');
			success = true;
		};

		var node = document.createElement('div');
		fixture.appendChild(node);

		checks.hidden.evaluate(node);
		assert.isTrue(success);

		kslib.dom.isVisible = orig;

	});

});