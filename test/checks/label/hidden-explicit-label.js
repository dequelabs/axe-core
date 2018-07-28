describe('hidden-explicit-label', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var fixtureSetup = axe.testUtils.fixtureSetup;
	var shadowSupport = axe.testUtils.shadowSupport;
	var shadowCheckSetup = axe.testUtils.shadowCheckSetup;
	var checkContext = axe.testUtils.MockCheckContext();

	afterEach(function() {
		checkContext.reset();
	});

	it('should return true if a hidden non-empty label is present', function() {
		fixtureSetup(
			'<label for="target" style="display:none">Text</label><input type="text" id="target">'
		);
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['hidden-explicit-label'].evaluate(node));
	});

	it('should return false if a visible non-empty label is present', function() {
		fixtureSetup(
			'<label for="target">Label</label><input type="text" id="target">'
		);
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['hidden-explicit-label'].evaluate(node));
	});

	it('should return true if an invisible empty label is present', function() {
		fixtureSetup(
			'<label for="target" style="display: none;"></label><input type="text" id="target">'
		);
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['explicit-label'].evaluate(node));
	});

	(shadowSupport.v1 ? it : xit)(
		'should return true if content is inside of shadow DOM',
		function() {
			var params = shadowCheckSetup(
				'<div></div>',
				'<label for="target" style="display:none">Text</label><input type="text" id="target">'
			);

			assert.isTrue(
				checks['hidden-explicit-label'].evaluate.apply(shadowCheckSetup, params)
			);
		}
	);

	(shadowSupport.v1 ? it : xit)(
		'should return false if part of the pairing is inside of shadow DOM',
		function() {
			var params = shadowCheckSetup(
				'<div><label for="target" style="display:none">Text</label></div>',
				'<input type="text" id="target">'
			);

			assert.isFalse(
				checks['hidden-explicit-label'].evaluate.apply(shadowCheckSetup, params)
			);
		}
	);
});
