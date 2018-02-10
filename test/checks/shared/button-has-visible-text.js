describe('button-has-visible-text', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkSetup = axe.testUtils.checkSetup;
	var checkContext = axe.testUtils.MockCheckContext();

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext.reset();
	});

	it('should return false if button element is empty', function () {
		var checkArgs = checkSetup('<button></button>', 'button');

		assert.isFalse(checks['button-has-visible-text'].evaluate.apply(checkContext, checkArgs));
	});

	it('should return true if a button element has text', function () {
		var checkArgs = checkSetup('<button>Name</button>', 'button');

		assert.isTrue(checks['button-has-visible-text'].evaluate.apply(checkContext, checkArgs));
		assert.deepEqual(checkContext._data, 'Name');
	});

	it('should return true if ARIA button has text', function () {
		var checkArgs = checkSetup('<div role="button">Text</div>', '[role=button]');

		assert.isTrue(checks['button-has-visible-text'].evaluate.apply(checkContext, checkArgs));
		assert.deepEqual(checkContext._data, 'Text');
	});

	it('should return false if ARIA button has no text', function () {
		var checkArgs = checkSetup('<div role="button"></div>', '[role=button]');

		assert.isFalse(checks['button-has-visible-text'].evaluate.apply(checkContext, checkArgs));
	});
});