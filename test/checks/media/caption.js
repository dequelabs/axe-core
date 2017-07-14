describe('caption', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var shadowSupport = axe.testUtils.shadowSupport;
	var checkSetup = axe.testUtils.checkSetup;

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return undefined if there is no track element', function () {
		var checkArgs = checkSetup('<audio></audio>', 'audio');
		assert.isUndefined(checks.caption.evaluate.apply(null, checkArgs));
	});

	it('should fail if there is no kind=captions attribute', function () {
		var checkArgs = checkSetup('<audio><track kind=descriptions></audio>', 'audio');
		assert.isTrue(checks.caption.evaluate.apply(null, checkArgs));
	});

	it('should fail if there is no kind attribute', function () {
		var checkArgs = checkSetup('<video><track></video>', 'video');
		assert.isTrue(checks.description.evaluate.apply(null, checkArgs));
	});

	it('should pass if there is a kind=captions attribute', function () {
		var checkArgs = checkSetup('<audio><track kind=captions></audio>', 'audio');
		assert.isFalse(checks.caption.evaluate.apply(null, checkArgs));
	});

	(shadowSupport.v1 ? it : xit)('should get track from composed tree', function () {
		var node = document.createElement('div');
		node.innerHTML = '<track kind=descriptions>';
		var shadow = node.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<audio><slot></slot></audio>';

		var checkArgs = checkSetup(node, {}, 'audio');
		assert.isTrue(checks.caption.evaluate.apply(null, checkArgs));
	});
});
