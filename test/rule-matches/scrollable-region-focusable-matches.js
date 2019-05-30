describe('scrollable-region-focusable-matches', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var queryFixture = axe.testUtils.queryFixture;
	var shadowSupported = axe.testUtils.shadowSupport.v1;
	var rule = axe._audit.rules.find(function(rule) {
		return rule.id === 'scrollable-region-focusable';
	});

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('returns false when element is not scrollable', function() {
		var target = queryFixture(
			'<section id="target">This element is not scrollable</section>'
		);
		var actual = rule.matches(target.actualNode, target);
		assert.isFalse(actual);
	});

	it('returns false when element has no visible children', function() {
		var target = queryFixture(
			'<div id="target" style="height: 200px; width: 200px;">' +
				'<div style="display:none; height: 2000px; width: 100px;">' +
				'<p> Content </p>' +
				'</div>' +
				'</div>'
		);
		var actual = rule.matches(target.actualNode, target);
		assert.isFalse(actual);
	});

	it('returns false when element does not overflow', function() {
		var target = queryFixture(
			'<div id="target" style="height: 200px; width: 200px; overflow: auto;">' +
				'<div style="height: 10px; width: 100x;">Content</div>' +
				'</div>'
		);
		var actual = rule.matches(target.actualNode, target);
		assert.isFalse(actual);
	});

	it('returns false when element is not scrollable (overflow=hidden)', function() {
		var target = queryFixture(
			'<div id="target" style="height: 200px; width: 200px; overflow: hidden">' +
				'<div style="height: 2000px; width: 100px; background-color: pink;">' +
				'<p> Content </p>' +
				'</div>' +
				'</div>'
		);
		var actual = rule.matches(target.actualNode, target);
		assert.isFalse(actual);
	});

	it('returns true when element is scrollable (overflow=auto)', function() {
		var target = queryFixture(
			'<div id="target" style="height: 200px; width: 200px; overflow: auto">' +
				'<div style="height: 10px; width: 2000px; background-color: red;">' +
				'<p> Content </p>' +
				'</div>' +
				'</div>'
		);
		var actual = rule.matches(target.actualNode, target);
		assert.isTrue(actual);
	});

	it('returns false when element overflow is visible', function() {
		var target = queryFixture(
			'<p id="target" style="width: 12em; height: 2em; border: dotted; overflow: visible;">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>'
		);
		var actual = rule.matches(target.actualNode, target);
		assert.isFalse(actual);
	});

	it('returns true when element overflow is scroll', function() {
		var target = queryFixture(
			'<p id="target" style="width: 12em; height: 2em; border: dotted; overflow: scroll;">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>'
		);
		var actual = rule.matches(target.actualNode, target);
		assert.isTrue(actual);
	});

	describe('shadowDOM - scrollable-region-focusable-matches', function() {
		before(function() {
			if (!shadowSupported) {
				this.skip();
			}
		});

		afterEach(function() {
			axe._tree = undefined;
		});

		it('returns false when shadowDOM element does not overflow', function() {
			fixture.innerHTML = '<div></div>';

			var root = fixture.firstChild.attachShadow({ mode: 'open' });
			var slotted = document.createElement('div');
			slotted.innerHTML =
				'<p id="target" style="width: 12em; height: 2em; border: dotted;">Sed.</p>';
			root.appendChild(slotted);
			var tree = (axe._tree = axe.utils.getFlattenedTree(fixture.firstChild));
			var target = axe.utils.querySelectorAll(tree, 'p')[0];
			var actual = rule.matches(target.actualNode, target);
			assert.isFalse(actual);
		});

		it('returns true when shadowDOM element has overflow', function() {
			fixture.innerHTML = '<div></div>';

			var root = fixture.firstChild.attachShadow({ mode: 'open' });
			var slotted = document.createElement('div');
			slotted.innerHTML =
				'<p id="target" style="width: 12em; height: 2em; border: dotted; overflow: auto;">This is a repeated long sentence, This is a repeated long sentence, This is a repeated long sentence, This is a repeated long sentence, This is a repeated long sentence.</p>';
			root.appendChild(slotted);
			var tree = (axe._tree = axe.utils.getFlattenedTree(fixture.firstChild));
			var target = axe.utils.querySelectorAll(tree, 'p')[0];
			var actual = rule.matches(target.actualNode, target);
			assert.isTrue(actual);
		});
	});
});
