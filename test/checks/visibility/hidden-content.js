describe('hidden content', function () {
	'use strict';

  var fixture = document.getElementById('fixture');

	var checkContext = {
		_data: null,
		data: function (d) {
			this._data = d;
		}
	};

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext._data = null;
	});

	it('was present on the page with aria-hidden', function () {
    fixture.innerHTML = '<div id="target" aria-hidden="true"><p>Nothing here.</p></div>';
		var node = fixture.querySelector('#target');
		assert.isUndefined(checks['hidden-content'].evaluate.call(checkContext, node));
	});

	it('was present on the page with display: none', function () {
    fixture.innerHTML = '<div id="target" style="display: none;"><p>Nothing here.</p></div>';
		var node = fixture.querySelector('#target');
		assert.isUndefined(checks['hidden-content'].evaluate.call(checkContext, node));
	});

	it('was present on the page with visibility: hidden', function () {
    fixture.innerHTML = '<div id="target" style="visibility: hidden;"><p>Nothing here.</p></div>';
		var node = fixture.querySelector('#target');
		assert.isUndefined(checks['hidden-content'].evaluate.call(checkContext, node));
	});

	it('was present on the page within a span with aria-hidden but skipped', function () {
    fixture.innerHTML = '<span id="target" aria-hidden="true">Nothing here.</span>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['hidden-content'].evaluate.call(checkContext, node));
	});

});
