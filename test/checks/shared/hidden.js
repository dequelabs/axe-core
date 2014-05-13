describe('hidden', function () {

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should call felib.dom.isVisible', function () {
		var orig = felib.dom.isVisible;
		var success = false;

		felib.dom.isVisible = function (n, sr) {
			assert.equal(n, node);
			assert.isTrue(sr, 'should pass `true` as second parameter (screenreader)');
			success = true;
		};

		var node = document.createElement('div');
		fixture.appendChild(node);

		checks['hidden'].execute(node);
		assert.isTrue(success);

		felib.dom.isVisible = orig;

	});

});