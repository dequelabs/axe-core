describe('submit-button', function() {
	'use strict';

	var fixture = document.getElementById('fixture');

	var checkSetup = axe.testUtils.checkSetup;
	var shadowSupport = axe.testUtils.shadowSupport;

	afterEach(function() {
		fixture.innerHTML = '';
		axe._tree = undefined;
	});

	it('should return true as form has img with submit', function() {
		var params = checkSetup(
			'<form><img type="submit" /><input /></form>',
			'#fixture'
		);
		assert.isTrue(checks['submit-button'].evaluate.apply(null, params));
	});

	it('should return true as form has button with submit', function() {
		var params = checkSetup(
			'<form><button></button><input /></form>',
			'#fixture'
		);
		assert.isTrue(checks['submit-button'].evaluate.apply(null, params));
	});

	it('should return true as form has input with submit', function() {
		var params = checkSetup(
			'<form><input type="submit" /><input /></form>',
			'#fixture'
		);
		assert.isTrue(checks['submit-button'].evaluate.apply(null, params));
	});

	it('should return undefiend as form only contains textareas', function() {
		var params = checkSetup('<form><textarea></textarea></form>', '#fixture');
		assert.isUndefined(checks['submit-button'].evaluate.apply(null, params));
	});

	it('should return undefiend as no button. img or input with submit was found', function() {
		var params = checkSetup('<form><input /><input /></form>', '#fixture');
		assert.isUndefined(checks['submit-button'].evaluate.apply(null, params));
	});

	it('should return undefiend as form has img with submit and disabled', function() {
		var params = checkSetup(
			'<form><img type="submit" disabled/><input /></form>',
			'#fixture'
		);
		assert.isUndefined(checks['submit-button'].evaluate.apply(null, params));
	});

	it('should return undefiend as form has button that is disabled', function() {
		var params = checkSetup(
			'<form><button disabled></button><input /></form>',
			'#fixture'
		);
		assert.isUndefined(checks['submit-button'].evaluate.apply(null, params));
	});

	it('should return undefiend as form has input with submit and disabled', function() {
		var params = checkSetup(
			'<form><input type="submit" disabled/><input /></form>',
			'#fixture'
		);
		assert.isUndefined(checks['submit-button'].evaluate.apply(null, params));
	});

	it('should return undefiend as form has button with type reset ', function() {
		var params = checkSetup(
			'<form><button type="reset"></button><input /></form>',
			'#fixture'
		);
		assert.isUndefined(checks['submit-button'].evaluate.apply(null, params));
	});

	it('should return undefiend as form has button with type submit', function() {
		var params = checkSetup(
			'<form><button type="button"></button><input /></form>',
			'#fixture'
		);
		assert.isUndefined(checks['submit-button'].evaluate.apply(null, params));
	});

	(shadowSupport.v1 ? it : xit)(
		'should find elements inside shadow trees',
		function() {
			var node2 = document.createElement('form');
			var node = document.createElement('div');
			node2.appendChild(node);
			var shadow = node.attachShadow({ mode: 'open' });
			shadow.innerHTML = '<button></button><input />';
			var checkArgs = checkSetup(node2, '#fixture');

			assert.isTrue(checks['submit-button'].evaluate.apply(null, checkArgs));
		}
	);
});
