describe('color.getNonAlphaBlendedBackgroundColor', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var queryFixture = axe.testUtils.queryFixture;
	var getNonAlphaBlendedBackgroundColor =
		axe.commons.color.getNonAlphaBlendedBackgroundColor;
	var isPhantom = window.PHANTOMJS ? true : false;

	afterEach(function() {
		fixture.innerHTML = '';
		axe._tree = undefined;
	});

	it('returns `new axe.commons.color.Color` instance when no background is set', function() {
		var vNode = queryFixture(
			'<div id="target" style="height: 40px; width: 30px;">' + '</div>'
		);
		var actual = getNonAlphaBlendedBackgroundColor(vNode.actualNode);
		assert.equal(actual.red, 0);
		assert.equal(actual.green, 0);
		assert.equal(actual.blue, 0);
		if (!isPhantom) {
			assert.equal(actual.alpha, 0);
		}
	});

	it('returns the non-blended color with rgba values of specified background-color value', function() {
		var vNode = queryFixture(
			'<div id="target" style="height: 40px; width: 30px; background-color: pink;">' +
				'</div>'
		);
		var actual = getNonAlphaBlendedBackgroundColor(vNode.actualNode);
		assert.equal(actual.red, 255);
		assert.equal(actual.green, 192);
		assert.equal(actual.blue, 203);
		if (!isPhantom) {
			assert.equal(actual.alpha, 1);
		}
	});

	it('returns the non-blended color with rgba values excluding alpha (for blending)', function() {
		var vNode = queryFixture(
			'<div id="target" style="height: 20px; width: 15px; background-color: rgba(0, 128, 0, 0.5);">' +
				'</div>'
		);
		var actual = getNonAlphaBlendedBackgroundColor(vNode.actualNode);
		assert.equal(actual.red, 0);
		assert.equal(actual.green, 128);
		assert.equal(actual.blue, 0);
		if (!isPhantom) {
			assert.equal(actual.alpha, 0.5);
		}
	});

	it('returns the non-blended color with rgba values excluding opacity (for blending)', function() {
		var vNode = queryFixture(
			'<div id="target" style="height: 20px; width: 15px; opacity: 0.5; background-color: green;">' +
				'</div>'
		);
		var actual = getNonAlphaBlendedBackgroundColor(vNode.actualNode);
		assert.equal(actual.red, 0);
		assert.equal(actual.green, 128);
		assert.equal(actual.blue, 0);
		if (!isPhantom) {
			assert.equal(actual.alpha, 0.5);
		}
	});
});
