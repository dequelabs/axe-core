describe('matches.fromDefinition', function() {
	var fromDefinition = axe.commons.matches.fromDefinition;
	var fixture = document.querySelector('#fixture');
	beforeEach(function() {
		fixture.innerHTML = '';
	});

	it('applies a css selector when the matcher is a string', function() {
		fixture.innerHTML = '<div>foo</div>';
		assert.isTrue(fromDefinition(fixture.firstChild, '#fixture > div'));
		assert.isFalse(fromDefinition(fixture.firstChild, '#fixture > span'));
	});

	it('matches a definition with a `nodeName` property', function() {
		fixture.innerHTML = '<div>foo</div>';
		var matchers = [
			'div',
			['div', 'span'],
			/div/,
			function(nodeName) {
				return nodeName === 'div';
			}
		];
		matchers.forEach(function(matcher) {
			assert.isTrue(
				fromDefinition(fixture.firstChild, {
					nodeName: matcher
				})
			);
		});
		assert.isFalse(
			fromDefinition(fixture.firstChild, {
				nodeName: 'span'
			})
		);
	});

	it('matches a definition with an `attributes` property', function() {
		fixture.innerHTML = '<div foo="bar">foo</div>';
		var matchers = [
			'bar',
			['bar', 'baz'],
			/bar/,
			function(attributeName) {
				return attributeName === 'bar';
			}
		];
		matchers.forEach(function(matcher) {
			assert.isTrue(
				fromDefinition(fixture.firstChild, {
					attributes: {
						foo: matcher
					}
				})
			);
		});
		assert.isFalse(
			fromDefinition(fixture.firstChild, {
				attributes: {
					foo: 'baz'
				}
			})
		);
	});

	it('matches a definition with a `properties` property', function() {
		fixture.innerHTML = '<input />';
		var matchers = [
			'text',
			['text', 'password'],
			/text/,
			function(type) {
				return type === 'text';
			}
		];
		matchers.forEach(function(matcher) {
			assert.isTrue(
				fromDefinition(fixture.firstChild, {
					properties: {
						type: matcher
					}
				})
			);
		});
		assert.isFalse(
			fromDefinition(fixture.firstChild, {
				properties: {
					type: 'password'
				}
			})
		);
	});

	it('returns true when all matching properties return true', function() {
		fixture.innerHTML = '<input value="bar" aria-disabled="true" />';
		assert.isTrue(
			fromDefinition(fixture.firstChild, {
				nodeName: 'input',
				properties: {
					type: 'text',
					value: 'bar'
				},
				attributes: {
					'aria-disabled': 'true'
				}
			})
		);
	});

	it('returns false when some matching properties return false', function() {
		fixture.innerHTML = '<input value="bar" aria-disabled="true" />';
		assert.isFalse(
			fromDefinition(fixture.firstChild, {
				nodeName: 'input',
				attributes: {
					'aria-disabled': 'false'
				}
			})
		);
	});

	describe('with virtual nodes', function() {
		it('matches using a string', function() {
			fixture.innerHTML = '<div>foo</div>';
			var node = { actualNode: fixture.firstChild };
			assert.isTrue(fromDefinition(node, 'div'));
			assert.isFalse(fromDefinition(node, 'span'));
		});

		it('matches nodeName', function() {
			fixture.innerHTML = '<div>foo</div>';
			var node = { actualNode: fixture.firstChild };
			assert.isTrue(
				fromDefinition(node, {
					nodeName: 'div'
				})
			);
			assert.isFalse(
				fromDefinition(node, {
					nodeName: 'span'
				})
			);
		});

		it('matches attributes', function() {
			fixture.innerHTML = '<div foo="bar">foo</div>';
			var node = { actualNode: fixture.firstChild };
			assert.isTrue(
				fromDefinition(node, {
					attributes: {
						foo: 'bar'
					}
				})
			);
			assert.isFalse(
				fromDefinition(node, {
					attributes: {
						foo: 'baz'
					}
				})
			);
		});

		it('matches properties', function() {
			fixture.innerHTML = '<input value="foo" />';
			var node = { actualNode: fixture.firstChild };
			assert.isTrue(
				fromDefinition(node, {
					properties: {
						value: 'foo'
					}
				})
			);
			assert.isFalse(
				fromDefinition(node, {
					properties: {
						value: 'bar'
					}
				})
			);
		});
	});

	describe('with a `condition` property', function() {
		it('calls condition and uses its return value as a matcher', function() {
			fixture.innerHTML = '<div>foo</div>';
			assert.isTrue(
				fromDefinition(fixture.firstChild, {
					condition: function(node) {
						assert.deepEqual(node, fixture.firstChild);
						node.setAttribute('foo', 'bar');
						return true;
					}
				})
			);
			assert.isFalse(
				fromDefinition(fixture.firstChild, {
					condition: function() {
						return false;
					}
				})
			);
			assert.equal(fixture.firstChild.getAttribute('foo'), 'bar');
		});

		it('uses the return value as a matcher', function() {
			var returnVal = 'true';
			function condition() {
				return returnVal;
			}
			assert.isTrue(
				fromDefinition(fixture, {
					condition: condition // Truthy test
				})
			);

			returnVal = 0; // Falsey test
			assert.isFalse(
				fromDefinition(fixture, {
					condition: condition
				})
			);
		});
	});

	describe('with an `array` of definitions', function() {
		it('returns true if any definition in the array matches', function() {
			fixture.innerHTML = '<div>foo</div>';
			assert.isTrue(
				fromDefinition(fixture.firstChild, [
					{ nodeName: 'span' },
					{ nodeName: 'div' },
					{ nodeName: 'h1' }
				])
			);
		});

		it('returns false if none definition in the array matches', function() {
			fixture.innerHTML = '<input />';
			assert.isFalse(
				fromDefinition(fixture.firstChild, [
					{ nodeName: 'span' },
					{ nodeName: 'div' },
					{ nodeName: 'h1' }
				])
			);
		});
	});
});
