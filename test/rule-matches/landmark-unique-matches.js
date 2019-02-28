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
		axeFixtureSetup('<h1>some heading</h1>');
		const node = fixture.querySelector('h1');
		assert.isFalse(rule.matches(node, null));
	});

	it('should pass because is a landmark', () => {
		axeFixtureSetup('<div role="banner">some banner</div>');
		const node = fixture.querySelector('div');
		fixture.appendChild(node);
		assert.isTrue(rule.matches(node, null));
	});

	it('should not match because landmark is hidden', () => {
		axeFixtureSetup('<div role="banner">some banner</div>');
		const node = fixture.querySelector('div');
		node.style.display = 'none';
		fixture.appendChild(node);
		assert.isFalse(rule.matches(node, null));
	});

	describe('form and section elements must have accessible names to be matched', () => {
		const elements = ['section', 'form'];

		elements.forEach(elementType => {
			it(`should match because it is a ${elementType} with a label`, () => {
				axeFixtureSetup(
					`<${elementType} aria-label="sample label">some ${elementType}</${elementType}>`
				);
				const node = fixture.querySelector(`${elementType}`);
				assert.isTrue(rule.matches(node, null));
			});

			it(`should not match because it is a ${elementType} without a label`, () => {
				axeFixtureSetup(`<${elementType}>some ${elementType}</${elementType}>`);
				const node = fixture.querySelector(`${elementType}`);
				assert.isFalse(rule.matches(node, null));
			});
		});
	});

	describe('header/footers should only match when not inside the excluded descendents', () => {
		const excludedDescendants = ['article', 'aside', 'main', 'nav', 'section'];
		const elements = ['header', 'footer'];

		elements.forEach(elementType => {
			excludedDescendants.forEach(exclusionType => {
				it(`should not match because ${elementType} is contained inside in ${exclusionType}`, () => {
					axeFixtureSetup(
						`<${exclusionType} aria-label="sample label">
							<${elementType}>an element</${elementType}>
						</${exclusionType}>`
					);
					const node = fixture.querySelector(elementType);
					assert.isFalse(rule.matches(node, null));
				});
			});

			it(`should match because ${elementType} is not contained inside the excluded descendents`, () => {
				axeFixtureSetup(`<${elementType}>an element</${elementType}>`);
				const node = fixture.querySelector(elementType);
				assert.isTrue(rule.matches(node, null));
			});
		});
	});
});
