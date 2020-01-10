describe('no-autoplay-audio-matches', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var queryFixture = axe.testUtils.queryFixture;
	var rule;

	beforeEach(function() {
		rule = axe._audit.rules.find(function(rule) {
			return rule.id === 'no-autoplay-audio';
		});
	});

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('returns false for <video> element that is paused', function() {
		var vNode = queryFixture(
			'<video id="target" autoplay="true" paused="true"><source src="/test/assets/video.mp4" type="video/mp4" /></video>'
		);
		var actual = rule.matches(vNode.actualNode);
		assert.isFalse(actual);
	});

	it('returns false for <video> element that is muted', function() {
		var vNode = queryFixture(
			'<video id="target" autoplay="true" muted="true"><source src="/test/assets/video.mp4" type="video/mp4" /></video>'
		);
		var actual = rule.matches(vNode.actualNode);
		assert.isFalse(actual);
	});

	it('returns true for <audio> element that has loop attribute', function() {
		var vNode = queryFixture(
			'<video id="target" loop="true"><source src="/test/assets/video.mp4" type="video/mp4" /></video>'
		);
		var actual = rule.matches(vNode.actualNode);
		assert.isTrue(actual);
	});
});
