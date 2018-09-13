describe('has-visible-text', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkSetup = axe.testUtils.checkSetup;

	var checkContext = axe.testUtils.MockCheckContext();

	afterEach(function() {
		fixture.innerHTML = '';
		axe._tree = undefined;
		checkContext.reset();
	});

	it('should return false if there is no visible text', function() {
		var params = checkSetup('<object id="target"></object>');
		assert.isFalse(
			checks['has-visible-text'].evaluate.apply(checkContext, params)
		);
	});

	it('should return false if there is text, but its hidden', function() {
		var params = checkSetup(
			'<object id="target"><span style="display:none">hello!</span></object>'
		);
		assert.isFalse(
			checks['has-visible-text'].evaluate.apply(checkContext, params)
		);
	});

	it('should return true if there is visible text', function() {
		var params = checkSetup('<object id="target">hello!</object>');
		assert.isTrue(
			checks['has-visible-text'].evaluate.apply(checkContext, params)
		);
	});

	it('should return true if there is children with role presentation and text content', function() {
		var params = checkSetup(
			'<a id="target" href="link"><span role="presentation">Link text</span></a>'
		);
		var actual = checks['has-visible-text'].evaluate.apply(
			checkContext,
			params
		);
		assert.isTrue(actual);
	});

	it('should return false if there is children with role presentation and empty text content', function() {
		var params = checkSetup(
			'<a id="target" href="link"><span role="presentation"></span></a>'
		);
		var actual = checks['has-visible-text'].evaluate.apply(
			checkContext,
			params
		);
		assert.isFalse(actual);
	});

	it('should return true if any of the nested children with role presentation has text content', function() {
		var params = checkSetup(
			'<a id="target" href="link"><div><span role="presentation">Link text</span></div></a>'
		);
		var actual = checks['has-visible-text'].evaluate.apply(
			checkContext,
			params
		);
		assert.isTrue(actual);
	});

	it('should return true if any of the nested children has text content', function() {
		var params = checkSetup(
			'<a id="target" href="link"><div>Some content<span role="presentation"></span></div></a>'
		);
		var actual = checks['has-visible-text'].evaluate.apply(
			checkContext,
			params
		);
		assert.isTrue(actual);
	});

	it('should return true if any of the siblings has text content', function() {
		var params = checkSetup(
			'<a id="target" href="link"><div>Some content</div><span role="presentation"></span></a>'
		);
		var actual = checks['has-visible-text'].evaluate.apply(
			checkContext,
			params
		);
		assert.isTrue(actual);
	});

	it('should return false if none of the siblings has text content', function() {
		var params = checkSetup(
			'<a id="target" href="link"><div></div><span></span><i></i></a>'
		);
		var actual = checks['has-visible-text'].evaluate.apply(
			checkContext,
			params
		);
		assert.isFalse(actual);
	});

	it('should return false if there is children with role presentation and empty text content', function() {
		var params = checkSetup(
			'<a id="target" href="link"><div><span role="presentation"></span></div></a>'
		);
		var actual = checks['has-visible-text'].evaluate.apply(
			checkContext,
			params
		);
		assert.isFalse(actual);
	});
});
