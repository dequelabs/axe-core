describe('same-caption-summary', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkSetup = axe.testUtils.checkSetup;
	var shadowCheckSetup = axe.testUtils.shadowCheckSetup;
	var shadowSupport = axe.testUtils.shadowSupport;

	var checkContext = axe.testUtils.MockCheckContext();


	afterEach(function () {
		fixture.innerHTML = '';
		checkContext.reset();
		axe._tree = undefined;
	});

	it('should return false there is no caption', function () {
		var params = checkSetup('<table summary="hi" id="target"><tr><td></td></tr></table>');

		assert.isFalse(checks['same-caption-summary'].evaluate.apply(checkContext, params));

	});

	it('should return false there is no summary', function () {
		var params = checkSetup('<table id="target"><caption>Hi</caption><tr><td></td></tr></table>');

		assert.isFalse(checks['same-caption-summary'].evaluate.apply(checkContext, params));

	});

	it('should return false if summary and caption are different', function () {
		var params = checkSetup('<table summary="bye" id="target"><caption>Hi</caption><tr><td></td></tr></table>');

		assert.isFalse(checks['same-caption-summary'].evaluate.apply(checkContext, params));

	});

	it('should return true if summary and caption are the same', function () {
		var params = checkSetup('<table summary="Hi" id="target"><caption>Hi</caption><tr><td></td></tr></table>');

		assert.isTrue(checks['same-caption-summary'].evaluate.apply(checkContext, params));
	});

	(shadowSupport.v1 ? it : xit)('should match slotted caption elements', function () {
		var params = shadowCheckSetup(
			'<div>' +
				'<span slot="caption">Caption</span>' +
				'<span slot="one">Data element 1</span>' +
				'<span slot="two">Data element 2</span>' +
			'</div>',
			'<table summary="Caption" id="target">' +
				'<caption><slot name="caption"></slot></caption>' +
				'<tr><td><slot name="one"></slot></td><td><slot name="two"></slot></td></tr>' +
			'</table>'
		);

		assert.isTrue(checks['same-caption-summary'].evaluate.apply(checkContext, params));
	});

});