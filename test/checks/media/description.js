describe('description', function () {
	'use strict';

	var shadowSupport = axe.testUtils.shadowSupport;
	var checkSetup = axe.testUtils.checkSetup;

	afterEach(function () {
		document.getElementById('fixture').innerHTML = '';
	});

	it('should return undefined if there is no track element', function () {
		var checkArgs = checkSetup('<video></video>', 'video');
		assert.isUndefined(checks.description.evaluate.apply(null, checkArgs));
	});

	it('should fail if there is no kind=captions attribute', function () {
		var checkArgs = checkSetup('<video><track kind=captions></video>', 'video');
		assert.isTrue(checks.description.evaluate.apply(null, checkArgs));
	});

	it('should fail if there is no kind attribute', function () {
		var checkArgs = checkSetup('<video><track></video>', 'video');
		assert.isTrue(checks.description.evaluate.apply(null, checkArgs));
	});

	it('should pass if there is a kind=descriptions attribute', function () {
		var checkArgs = checkSetup('<video><track kind=descriptions></video>', 'video');
		assert.isFalse(checks.description.evaluate.apply(null, checkArgs));
	});

	(shadowSupport.v1 ? it : xit)('should get track from composed tree', function () {
		var node = document.createElement('div');
		node.innerHTML = '<track kind=descriptions>';
		var shadow = node.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<video><slot></slot></video>';

		var checkArgs = checkSetup(node, {}, 'video');
		axe.log(checkArgs);
		assert.isFalse(checks.description.evaluate.apply(null, checkArgs));
	});

});
