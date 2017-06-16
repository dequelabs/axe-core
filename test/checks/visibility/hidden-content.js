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

	it('should return undefined with display:none and children', function () {
    fixture.innerHTML = '<div id="target" style="display: none;"><p>Some paragraph text.</p></div>';
		var node = fixture.querySelector('#target');
		assert.isUndefined(checks['hidden-content'].evaluate.call(checkContext, node));
	});

	it('should return undefined with visibility:hidden and children', function () {
    fixture.innerHTML = '<div id="target" style="visibility: hidden;"><p>Some paragraph text.</p></div>';
		var node = fixture.querySelector('#target');
		assert.isUndefined(checks['hidden-content'].evaluate.call(checkContext, node));
	});

	it('should return true with visibility:hidden and parent with visibility:hidden', function () {
    fixture.innerHTML = '<div style="visibility: hidden;"><p id="target" style="visibility: hidden;">Some paragraph text.</p></div>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['hidden-content'].evaluate.call(checkContext, node));
	});

	it('should return true with aria-hidden and no content', function () {
		fixture.innerHTML = '<span id="target" class="icon" aria-hidden="true"></span>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['hidden-content'].evaluate.call(checkContext, node));
	});

	it('should skip whitelisted elements', function () {
		var node = document.querySelector('head');
		assert.isTrue(checks['hidden-content'].evaluate.call(checkContext, node));
	});
});
