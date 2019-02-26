describe('landmark-unique-matches', function() {
	'use strict';
	let rule;
	let fixture;
	let axeFixtureSetup;

	beforeEach(function() {
		fixture = document.getElementById('fixture');
		axeFixtureSetup = axe.testUtils.fixtureSetup;
		rule = axe._audit.rules.find(function(rule) {
			return rule.id === 'landmark-unique';
		});
	});

	it('should not match because not a landmark', () => {
		const node = document.createElement('h1');
		assert.isFalse(rule.matches(node, null));
	});

	it('should pass because is a landmark', () => {
		const node = document.createElement('div');
		node.setAttribute('role', 'banner');
		fixture.appendChild(node);
		assert.isTrue(rule.matches(node, null));
	});

	it('should not match because landmark is hidden', () => {
		const node = document.createElement('div');
		node.setAttribute('role', 'banner');
		node.style.display = 'none';
		fixture.appendChild(node);
		assert.isFalse(rule.matches(node, null));
	});

	it('should match because it is a section with a label', () => {
		axeFixtureSetup(
			'<section aria-label="sample label">some section</section>'
		);
		const node = fixture.querySelector('section');
		assert.isTrue(rule.matches(node, null));
	});

	it('should not match because it is a section without a label', () => {
		axeFixtureSetup('<section>some section</section>');
		const node = fixture.querySelector('section');
		assert.isFalse(rule.matches(node, null));
	});

	describe('header/footers should only match when not inside the excluded descendents', () => {
		const excludedDescendants = ['article', 'aside', 'main', 'nav', 'section'];
		const elements = ['header', 'footer'];

		elements.forEach(elementType => {
			excludedDescendants.forEach(exclusionType => {
				it(`should not match because ${elementType} is contained inside in ${exclusionType}`, () => {
					const node = document.createElement(elementType);
					const sectionNode = document.createElement(exclusionType);
					sectionNode.append(node);
					fixture.appendChild(sectionNode);
					assert.isFalse(rule.matches(node, null));
				});
			});

			it(`should match because ${elementType} is not contained inside the excluded descendents`, () => {
				const node = document.createElement(elementType);
				fixture.appendChild(node);
				assert.isTrue(rule.matches(node, null));
			});
		});
	});
});
