describe('landmark-unique-matches', function() {
	'use strict';
	var rule;
	var fixture;
	var axeFixtureSetup;
	var shadowSupport = axe.testUtils.shadowSupport.v1;
	var excludedDescendantsForHeadersFooters = [
		'article',
		'aside',
		'main',
		'nav',
		'section'
	];
	var headerFooterElements = ['header', 'footer'];

	beforeEach(function() {
		fixture = document.getElementById('fixture');
		axeFixtureSetup = axe.testUtils.fixtureSetup;
		rule = axe._audit.rules.find(function(rule) {
			return rule.id === 'landmark-unique';
		});
	});

	it('should not match because not a landmark', () => {
		axeFixtureSetup('<h1>some heading</h1>');
		var node = fixture.querySelector('h1');
		var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
		assert.isFalse(rule.matches(node, virtualNode));
	});

	it('should pass because is a landmark', () => {
		axeFixtureSetup('<div role="banner">some banner</div>');
		var node = fixture.querySelector('div');
		fixture.appendChild(node);
		var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
		assert.isTrue(rule.matches(node, virtualNode));
	});

	it('should not match because landmark is hidden', () => {
		axeFixtureSetup('<div role="banner">some banner</div>');
		var node = fixture.querySelector('div');
		node.style.display = 'none';
		fixture.appendChild(node);
		var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
		assert.isFalse(rule.matches(node, virtualNode));
	});

	describe('form and section elements must have accessible names to be matched', () => {
		var sectionFormElements = ['section', 'form'];

		sectionFormElements.forEach(elementType => {
			it(`should match because it is a ${elementType} with a label`, () => {
				axeFixtureSetup(
					`<${elementType} aria-label="sample label">some ${elementType}</${elementType}>`
				);
				var node = fixture.querySelector(`${elementType}`);
				var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
				assert.isTrue(rule.matches(node, virtualNode));
			});

			it(`should not match because it is a ${elementType} without a label`, () => {
				axeFixtureSetup(`<${elementType}>some ${elementType}</${elementType}>`);
				var node = fixture.querySelector(`${elementType}`);
				var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
				assert.isFalse(rule.matches(node, virtualNode));
			});
		});
	});

	describe('header/footers should only match when not inside the excluded descendents', () => {
		headerFooterElements.forEach(elementType => {
			excludedDescendantsForHeadersFooters.forEach(exclusionType => {
				it(`should not match because ${elementType} is contained inside in ${exclusionType}`, () => {
					axeFixtureSetup(
						`<${exclusionType} aria-label="sample label">
							<${elementType}>an element</${elementType}>
						</${exclusionType}>`
					);
					var node = fixture.querySelector(elementType);
					var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
					assert.isFalse(rule.matches(node, virtualNode));
				});
			});

			it(`should match because ${elementType} is not contained inside the excluded descendents`, () => {
				axeFixtureSetup(`<${elementType}>an element</${elementType}>`);
				var node = fixture.querySelector(elementType);
				var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
				assert.isTrue(rule.matches(node, virtualNode));
			});
		});
	});

	if (shadowSupport) {
		it('return true for landmarks contained within shadow dom', () => {
			var container = document.createElement('div');
			var shadow = container.attachShadow({ mode: 'open' });
			shadow.innerHTML = '<footer></footer>';

			axeFixtureSetup(container);
			var vNode = axe.utils.querySelectorAll(axe._tree[0], 'footer')[0];
			assert.isTrue(rule.matches(vNode.actualNode, vNode));
		});

		describe('header/footers should only match when not inside the excluded descendents within shadow dom', () => {
			var container;
			var shadow;

			beforeEach(() => {
				container = document.createElement('div');
				shadow = container.attachShadow({ mode: 'open' });
			});

			headerFooterElements.forEach(elementType => {
				excludedDescendantsForHeadersFooters.forEach(exclusionType => {
					it(`should not match because ${elementType} is contained inside in ${exclusionType}`, () => {
						shadow.innerHTML = `<${exclusionType} aria-label="sample label">
								<${elementType}>an element</${elementType}>
							</${exclusionType}>`;

						axeFixtureSetup(container);
						var virtualNode = axe.utils.querySelectorAll(
							axe._tree[0],
							elementType
						)[0];
						assert.isFalse(rule.matches(virtualNode.actualNode, virtualNode));
					});
				});

				it(`should match because ${elementType} is not contained inside the excluded descendents`, () => {
					shadow.innerHTML = `<${elementType}>an element</${elementType}>`;
					axeFixtureSetup(container);
					var virtualNode = axe.utils.querySelectorAll(
						axe._tree[0],
						elementType
					)[0];
					assert.isTrue(rule.matches(virtualNode.actualNode, virtualNode));
				});
			});
		});
	}
});
