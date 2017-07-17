describe('same-caption-summary', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var fixtureSetup = axe.testUtils.fixtureSetup;
	var shadowSupport = axe.testUtils.shadowSupport;

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return false there is no caption', function () {
		fixtureSetup('<table summary="hi"><tr><td></td></tr></table>');
		var node = fixture.querySelector('table');

		assert.isFalse(checks['same-caption-summary'].evaluate(node));

	});

	it('should return false there is no summary', function () {
		fixtureSetup('<table><caption>Hi</caption><tr><td></td></tr></table>');
		var node = fixture.querySelector('table');

		assert.isFalse(checks['same-caption-summary'].evaluate(node));

	});

	it('should return false if summary and caption are different', function () {
		fixtureSetup('<table summary="bye"><caption>Hi</caption><tr><td></td></tr></table>');
		var node = fixture.querySelector('table');

		assert.isFalse(checks['same-caption-summary'].evaluate(node));

	});

	it('should return true if summary and caption are the same', function () {
		fixtureSetup('<table summary="Hi"><caption>Hi</caption><tr><td></td></tr></table>');
		var node = fixture.querySelector('table');

		assert.isTrue(checks['same-caption-summary'].evaluate(node));
	});

	(shadowSupport.v1 ? it : xit)('should match slotted caption elements', function () {
		var node = document.createElement('div');
		node.innerHTML = '<span slot="caption">Caption</span>' +
			'<span slot="one">Data element 1</span>' +
			'<span slot="two">Data element 2</span>';

		var root = node.attachShadow({ mode: 'open' });
		var table = document.createElement('table');
		table.innerHTML = '<caption><slot name="caption"></slot></caption>' +
				'<tr><td><slot name="one"></slot></td><td><slot name="two"></slot></td></tr>';
		table.setAttribute('summary', 'Caption');
		root.appendChild(table);
		fixtureSetup(node);

		assert.isTrue(checks['same-caption-summary'].evaluate(table));
	});

});