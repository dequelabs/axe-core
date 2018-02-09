describe('has-visible-text', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkSetup = axe.testUtils.checkSetup;

	var checkContext = {
		_data: null,
		data: function (d) {
			this._data = d;
		}
	};

	afterEach(function () {
		fixture.innerHTML = '';
		axe._tree = undefined;
		checkContext._data = null;
	});

	it('should return false if there is no visible text', function () {
		var params = checkSetup('<object id="target"></object>');
		assert.isFalse(checks['has-visible-text'].evaluate.apply(checkContext, params));
	});

	it('should return false if there is text, but its hidden', function () {
		var params = checkSetup('<object id="target"><span style="display:none">hello!</span></object>');
		assert.isFalse(checks['has-visible-text'].evaluate.apply(checkContext, params));
	});

	it('should return true if there is visible text', function () {
		var params = checkSetup('<object id="target">hello!</object>');
		assert.isTrue(checks['has-visible-text'].evaluate.apply(checkContext, params));
	});

});
