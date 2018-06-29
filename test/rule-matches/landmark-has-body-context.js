describe('landmark-has-body-context', function() {
	'use strict';
	var fixtureSetup = axe.testUtils.fixtureSetup;
	var rule;
	var shadowSupport = axe.testUtils.shadowSupport.v1;

	beforeEach(function() {
		rule = axe._audit.rules.find(function(rule) {
			return rule.id === 'landmark-banner-is-top-level';
		});
	});

	it('returns true for elements with a role', function() {
		fixtureSetup('<main><footer role="contentinfo"></footer></main>');

		var vNode = axe.utils.querySelectorAll(axe._tree[0], 'footer')[0];
		assert.isTrue(rule.matches(vNode.actualNode, vNode));
	});

	it('returns true for elements not contained in a landmark', function() {
		fixtureSetup('<div><footer role="contentinfo"></footer></div>');

		var vNode = axe.utils.querySelectorAll(axe._tree[0], 'footer')[0];
		assert.isTrue(rule.matches(vNode.actualNode, vNode));
	});

	it('returns false for elements contained in a landmark', function() {
		fixtureSetup('<main><footer></footer></main>');

		var vNode = axe.utils.querySelectorAll(axe._tree[0], 'footer')[0];
		assert.isFalse(rule.matches(vNode.actualNode, vNode));
	});

	(shadowSupport ? it : xit)(
		'returns false for elements contained in a landmark in a shadow DOM tree',
		function() {
			var main = document.createElement('main');
			var shadow = main.attachShadow({ mode: 'open' });
			shadow.innerHTML = '<footer></fotoer>';

			fixtureSetup(main);
			var vNode = axe.utils.querySelectorAll(axe._tree[0], 'footer')[0];
			assert.isFalse(rule.matches(vNode.actualNode, vNode));
		}
	);
});
