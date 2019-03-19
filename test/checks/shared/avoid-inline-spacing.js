describe('avoid-inline-spacing tests', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var queryFixture = axe.testUtils.queryFixture;
	var check = checks['avoid-inline-spacing'];

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('returns true when no inline spacing styles are specified', function() {
		var vNode = queryFixture(
			'<p id="target" style="font-size: 200%;">The quick brown fox jumped over the lazy dog</p>'
		);
		var actual = check.evaluate(vNode.actualNode);
		assert.isTrue(actual);
	});

	it('returns true when `line-height` style specified has no `!important` priority', function() {
		var vNode = queryFixture(
			'<p id="target" style="line-height: 1.5;">The quick brown fox jumped over the lazy dog</p>'
		);
		var actual = check.evaluate(vNode.actualNode);
		assert.isTrue(actual);
	});

	it('returns true when `letter-spacing` style specified has no `!important` priority', function() {
		var vNode = queryFixture(
			'<p id="target" style="letter-spacing: 50px;">The quick brown fox jumped over the lazy dog</p>'
		);
		var actual = check.evaluate(vNode.actualNode);
		assert.isTrue(actual);
	});

	it('returns true when `word-spacing` style specified has no `!important` priority', function() {
		var vNode = queryFixture(
			'<p id="target" style="word-spacing: 10px;">The quick brown fox jumped over the lazy dog</p>'
		);
		var actual = check.evaluate(vNode.actualNode);
		assert.isTrue(actual);
	});

	it('returns true when none of the multiple inline spacing styles specified have priority of `!important`', function() {
		var vNode = queryFixture(
			'<p id="target" style="word-spacing: 20ch; letter-spacing: 50rem; line-height: 3;">The quick brown fox jumped over the lazy dog</p>'
		);
		var actual = check.evaluate(vNode.actualNode);
		assert.isTrue(actual);
	});

	it('returns false when `line-height` style specified has `!important` priority', function() {
		var vNode = queryFixture(
			'<p id="target" style="line-height: 1.5 !important;">The quick brown fox jumped over the lazy dog</p>'
		);
		var actual = check.evaluate(vNode.actualNode);
		assert.isFalse(actual);
	});

	it('returns false when `letter-spacing` style specified has `!important` priority', function() {
		var vNode = queryFixture(
			'<p id="target" style="letter-spacing: 100em !important;">The quick brown fox jumped over the lazy dog</p>'
		);
		var actual = check.evaluate(vNode.actualNode);
		assert.isFalse(actual);
	});

	it('returns false when `word-spacing` style specified has `!important` priority', function() {
		var vNode = queryFixture(
			'<p id="target" style="word-spacing: -.4ch !important;">The quick brown fox jumped over the lazy dog</p>'
		);
		var actual = check.evaluate(vNode.actualNode);
		assert.isFalse(actual);
	});

	it('returns false when one(any) of the multiple inline spacing styles specified priority of `!important`', function() {
		var vNode = queryFixture(
			'<p id="target" style="word-spacing: 200%; letter-spacing: 50rem !important; line-height: 3;">The quick brown fox jumped over the lazy dog</p>'
		);
		var actual = check.evaluate(vNode.actualNode);
		assert.isFalse(actual);
	});
});
