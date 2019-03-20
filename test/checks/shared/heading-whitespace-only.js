describe('heading-whitespace-only', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkSetup = axe.testUtils.checkSetup;

	var checkContext = axe.testUtils.MockCheckContext();

	afterEach(function() {
		fixture.innerHTML = '';
		axe._tree = undefined;
		checkContext.reset();
	});

	it('should return true for line separator (&#8232;)', function() {
		var params = checkSetup('<h2 id="target">&#8232;</h2>');
		assert.isTrue(
			checks['heading-whitespace-only'].evaluate.apply(checkContext, params)
		);
	});

	it('should return true for paragraph separator (&#8233;)', function() {
		var params = checkSetup('<h2 id="target">&#8233;</h2>');
		assert.isTrue(
			checks['heading-whitespace-only'].evaluate.apply(checkContext, params)
		);
	});

	it('should return true for space (&#32;)', function() {
		var params = checkSetup('<h2 id="target">&#32;</h2>');
		assert.isTrue(
			checks['heading-whitespace-only'].evaluate.apply(checkContext, params)
		);
	});

	it('should return false for non-breaking space (&#160;)', function() {
		var params = checkSetup('<h2 id="target">&#160;</h2>');
		assert.isFalse(
			checks['heading-whitespace-only'].evaluate.apply(checkContext, params)
		);
	});

	it('should return true for ogham space mark (&#5760;)', function() {
		var params = checkSetup('<h2 id="target">&#5760;</h2>');
		assert.isTrue(
			checks['heading-whitespace-only'].evaluate.apply(checkContext, params)
		);
	});

	it('should return true for en quad (&#8192;)', function() {
		var params = checkSetup('<h2 id="target">&#8192;</h2>');
		assert.isTrue(
			checks['heading-whitespace-only'].evaluate.apply(checkContext, params)
		);
	});

	it('should return true for em quad (&#8193;)', function() {
		var params = checkSetup('<h2 id="target">&#8193;</h2>');
		assert.isTrue(
			checks['heading-whitespace-only'].evaluate.apply(checkContext, params)
		);
	});

	it('should return false for en space (&#8194;)', function() {
		var params = checkSetup('<h2 id="target">&#8194;</h2>');
		assert.isFalse(
			checks['heading-whitespace-only'].evaluate.apply(checkContext, params)
		);
	});

	it('should return false for em space (&#8195;)', function() {
		var params = checkSetup('<h2 id="target">&#8195;</h2>');
		assert.isFalse(
			checks['heading-whitespace-only'].evaluate.apply(checkContext, params)
		);
	});

	it('should return true for three-per-em space (&#8196;)', function() {
		var params = checkSetup('<h2 id="target">&#8196;</h2>');
		assert.isTrue(
			checks['heading-whitespace-only'].evaluate.apply(checkContext, params)
		);
	});

	it('should return true for six-per-em space (&#8198;)', function() {
		var params = checkSetup('<h2 id="target">&#8198;</h2>');
		assert.isTrue(
			checks['heading-whitespace-only'].evaluate.apply(checkContext, params)
		);
	});

	it('should return true for figure space (&#8199;)', function() {
		var params = checkSetup('<h2 id="target">&#8199;</h2>');
		assert.isTrue(
			checks['heading-whitespace-only'].evaluate.apply(checkContext, params)
		);
	});

	it('should return true for punctuation space (&#8200;)', function() {
		var params = checkSetup('<h2 id="target">&#8200;</h2>');
		assert.isTrue(
			checks['heading-whitespace-only'].evaluate.apply(checkContext, params)
		);
	});

	it('should return false for thin space (&#8201;)', function() {
		var params = checkSetup('<h2 id="target">&#8201;</h2>');
		assert.isFalse(
			checks['heading-whitespace-only'].evaluate.apply(checkContext, params)
		);
	});

	it('should return true for hair space (&#8202;)', function() {
		var params = checkSetup('<h2 id="target">&#8202;</h2>');
		assert.isTrue(
			checks['heading-whitespace-only'].evaluate.apply(checkContext, params)
		);
	});

	it('should return true for narrow no-break space (&#8239;)', function() {
		var params = checkSetup('<h2 id="target">&#8239;</h2>');
		assert.isTrue(
			checks['heading-whitespace-only'].evaluate.apply(checkContext, params)
		);
	});

	it('should return true for medium mathematical space (&#8287;)', function() {
		var params = checkSetup('<h2 id="target">&#8287;</h2>');
		assert.isTrue(
			checks['heading-whitespace-only'].evaluate.apply(checkContext, params)
		);
	});

	it('should return true for ideographic space (&#12288;)', function() {
		var params = checkSetup('<h2 id="target">&#12288;</h2>');
		assert.isTrue(
			checks['heading-whitespace-only'].evaluate.apply(checkContext, params)
		);
	});

	it('should return false for <br>', function() {
		var params = checkSetup('<h2 id="target"><br></h2>');
		assert.isFalse(
			checks['heading-whitespace-only'].evaluate.apply(checkContext, params)
		);
	});

	it('should return false for <wbr>', function() {
		var params = checkSetup('<h2 id="target"><wbr></h2>');
		assert.isFalse(
			checks['heading-whitespace-only'].evaluate.apply(checkContext, params)
		);
	});

	it('should return true for newline', function() {
		var params = checkSetup(`<h2 id="target">
      </h2>`);
		assert.isTrue(
			checks['heading-whitespace-only'].evaluate.apply(checkContext, params)
		);
	});

	it('should return true for tab', function() {
		var params = checkSetup(`<h2 id="target"> </h2>`);
		assert.isTrue(
			checks['heading-whitespace-only'].evaluate.apply(checkContext, params)
		);
	});

	it('should return true for empty alt on image', function() {
		var params = checkSetup('<h2 id="target"><img src="#" alt=""></h2>');
		assert.isTrue(
			checks['heading-whitespace-only'].evaluate.apply(checkContext, params)
		);
	});

	it('should return true for accessible text', function() {
		var params = checkSetup('<h2 id="target">My Heading</h2>');
		assert.isTrue(
			checks['heading-whitespace-only'].evaluate.apply(checkContext, params)
		);
	});

	it('should return false for nested <br>', function() {
		var params = checkSetup(
			'<h2 id="target"><span><span><br/></span></span></h2>'
		);
		assert.isFalse(
			checks['heading-whitespace-only'].evaluate.apply(checkContext, params)
		);
	});
});
