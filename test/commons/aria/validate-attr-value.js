describe('aria.validateAttrValue', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var shadowSupport = axe.testUtils.shadowSupport;

	afterEach(function() {
		fixture.innerHTML = '';
		axe.reset();
	});

	it('should return true if there is no matching attribute (future-compat???)', function() {
		var node = document.createElement('div');
		node.setAttribute('unknown-attr', 'hello');

		assert.isTrue(axe.commons.aria.validateAttrValue(node, 'unknown-attr'));
	});

	describe('allowEmpty', function() {
		beforeEach(function() {
			axe.configure({
				standards: {
					ariaAttrs: {
						cats: {
							type: 'nmtoken',
							values: ['valid'],
							allowEmpty: true
						},
						dogs: {
							type: 'idref',
							allowEmpty: true
						},
						goats: {
							type: 'idrefs',
							allowEmpty: true
						},
						cows: {
							type: 'string',
							allowEmpty: true
						},
						sheep: {
							type: 'decimal',
							allowEmpty: true
						},
						pigs: {
							type: 'int',
							allowEmpty: true
						},
						horses: {
							type: 'boolean',
							allowEmpty: true
						}
					}
				}
			});
		});

		it('returns true for empty attributes with allowEmpty:true', function() {
			var node = document.createElement('div');
			node.setAttribute('cats', '');
			assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));

			node.setAttribute('dogs', '');
			assert.isTrue(axe.commons.aria.validateAttrValue(node, 'dogs'));

			node.setAttribute('goats', '');
			assert.isTrue(axe.commons.aria.validateAttrValue(node, 'goats'));

			node.setAttribute('sheep', '');
			assert.isTrue(axe.commons.aria.validateAttrValue(node, 'sheep'));

			node.setAttribute('cows', '');
			assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cows'));

			node.setAttribute('pigs', '');
			assert.isTrue(axe.commons.aria.validateAttrValue(node, 'pigs'));

			node.setAttribute('horses', '');
			assert.isTrue(axe.commons.aria.validateAttrValue(node, 'horses'));
		});

		it('returns true for whitespace-only attributes with allowEmpty:true', function() {
			var node = document.createElement('div');
			node.setAttribute('cats', '  \r\n\t  ');
			assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));

			node.setAttribute('dogs', '  \r\n\t  ');
			assert.isTrue(axe.commons.aria.validateAttrValue(node, 'dogs'));

			node.setAttribute('goats', '  \r\n\t  ');
			assert.isTrue(axe.commons.aria.validateAttrValue(node, 'goats'));

			node.setAttribute('cows', '  \r\n\t  ');
			assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cows'));

			node.setAttribute('pigs', '  \r\n\t  ');
			assert.isTrue(axe.commons.aria.validateAttrValue(node, 'sheep'));

			node.setAttribute('sheep', '  \r\n\t  ');
			assert.isTrue(axe.commons.aria.validateAttrValue(node, 'pigs'));

			node.setAttribute('horses', '  \r\n\t  ');
			assert.isTrue(axe.commons.aria.validateAttrValue(node, 'horses'));
		});
	});

	describe('schema defintions', function() {
		describe('enumerated values', function() {
			beforeEach(function() {
				axe.configure({
					standards: {
						ariaAttrs: {
							cats: {
								type: 'nmtoken',
								values: ['valid']
							}
						}
					}
				});
			});

			it('should validate against enumerated .values if present', function() {
				var node = document.createElement('div');
				node.setAttribute('cats', 'valid');

				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', 'invalid');

				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cats'));
			});

			it('should be case-insensitive for enumerated values', function() {
				var node = document.createElement('div');
				node.setAttribute('cats', 'vaLiD');

				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));
			});

			it('should reject empty strings', function() {
				var node = document.createElement('div');
				node.setAttribute('cats', '');

				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cats'));
			});
		});

		describe('idref', function() {
			beforeEach(function() {
				axe.configure({
					standards: {
						ariaAttrs: {
							dogs: {
								type: 'idref'
							}
						}
					}
				});
			});

			it('should validate the referenced node exists', function() {
				var node = document.createElement('div');
				fixture.innerHTML = '<div id="target"></div>';
				node.setAttribute('dogs', 'target');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'dogs'));

				node.setAttribute('dogs', 'invalid');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'dogs'));
			});

			it('should work in shadow DOM', function() {
				var shadEl;

				if (shadowSupport.v1) {
					// shadow DOM v1 - note: v0 is compatible with this code, so no need
					// to specifically test this
					fixture.innerHTML = '<div></div>';
					makeShadowTreeVAV(fixture.firstChild);
					shadEl = fixture.firstChild.shadowRoot.querySelector('input#myinput');
					assert.isTrue(
						axe.commons.aria.validateAttrValue(shadEl, 'aria-labelledby')
					);
					shadEl = fixture.firstChild.shadowRoot.querySelector('input#invalid');
					assert.isFalse(
						axe.commons.aria.validateAttrValue(shadEl, 'aria-labelledby')
					);
				}
			});

			it('returns false if empty without allowEmpty: true', function() {
				var node = document.createElement('div');
				node.setAttribute('dogs', '');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'dogs'));
			});
		});

		describe('idrefs', function() {
			var node = document.createElement('div');

			beforeEach(function() {
				axe.configure({
					standards: {
						ariaAttrs: {
							goats: {
								type: 'idrefs'
							}
						}
					}
				});
			});

			it('should return false when a single referenced node is not found', function() {
				node.setAttribute('goats', 'invalid');
				// target2 not found
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'goats'));
			});

			it('should return false when no referenced element is found', function() {
				fixture.innerHTML = '<div id="target"></div>';
				node.setAttribute('goats', 'target2 target3');
				// target2 not found
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'goats'));
			});

			it('should return true when at least one referenced element is found', function() {
				fixture.innerHTML = '<div id="target"></div>';
				node.setAttribute('goats', 'target target2');
				// target2 not found
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'goats'));
			});

			it('should return true when all targets are found', function() {
				fixture.innerHTML = '<div id="target"></div><div id="target2"></div>';
				node.setAttribute('goats', 'target target2');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'goats'));
			});

			it('should not fail on weird whitespace', function() {
				fixture.innerHTML = '<div id="target"></div><div id="target2"></div>';
				node.setAttribute('goats', ' \t \ttarget   \t   target2      ');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'goats'));
			});

			it('returns false if empty without allowEmpty: true', function() {
				var node = document.createElement('div');
				node.setAttribute('goats', '');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'goats'));
			});
		});

		describe('string', function() {
			beforeEach(function() {
				axe.configure({
					standards: {
						ariaAttrs: {
							cows: {
								type: 'string'
							}
						}
					}
				});
			});

			it('returns true for non-empty strings', function() {
				var node = document.createElement('div');
				node.setAttribute('cows', 'hi');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cows'));
			});

			it('returns false for non-empty strings without allowEmpty:true', function() {
				var node = document.createElement('div');
				node.setAttribute('cows', '');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cows'));
			});
		});

		describe('decimal', function() {
			var node = document.createElement('div');

			beforeEach(function() {
				axe.configure({
					standards: {
						ariaAttrs: {
							sheep: {
								type: 'decimal'
							}
						}
					}
				});
			});

			it('should allow, but not require, a preceeding sign', function() {
				node.setAttribute('sheep', '+1.12');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'sheep'));

				node.setAttribute('sheep', '-1.12');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'sheep'));

				node.setAttribute('sheep', '1.12');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'sheep'));
			});

			it('should make the decimal separator optional', function() {
				node.setAttribute('sheep', '+1');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'sheep'));

				node.setAttribute('sheep', '-1');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'sheep'));

				node.setAttribute('sheep', '1');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'sheep'));
			});

			it('should make the whole number optional', function() {
				node.setAttribute('sheep', '+.1');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'sheep'));

				node.setAttribute('sheep', '-.1');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'sheep'));

				node.setAttribute('sheep', '.1');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'sheep'));
			});

			it('should make the right-side optional', function() {
				node.setAttribute('sheep', '+1.');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'sheep'));

				node.setAttribute('sheep', '-1.');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'sheep'));

				node.setAttribute('sheep', '1.');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'sheep'));
			});

			it('should validate the entire string', function() {
				node.setAttribute('sheep', ' +1.12 ');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'sheep'));

				node.setAttribute('sheep', 'invalid +1.12');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'sheep'));

				node.setAttribute('sheep', '+1.12 invalid');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'sheep'));
			});

			it('should only allow for numbers', function() {
				node.setAttribute('sheep', '+a.12');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'sheep'));

				node.setAttribute('sheep', '+1.b');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'sheep'));

				node.setAttribute('sheep', 'b1.1');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'sheep'));
			});

			it('should require at least one number', function() {
				node.setAttribute('sheep', '+.');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'sheep'));

				node.setAttribute('sheep', '-.');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'sheep'));

				node.setAttribute('sheep', '+');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'sheep'));

				node.setAttribute('sheep', '-');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'sheep'));

				node.setAttribute('sheep', '.');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'sheep'));

				node.setAttribute('sheep', '');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'sheep'));
			});

			it('returns false for empty strings without allowEmpty:true', function() {
				node.setAttribute('sheep', '');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'sheep'));
			});
		});

		describe('int', function() {
			var node = document.createElement('div');

			beforeEach(function() {
				axe.configure({
					standards: {
						ariaAttrs: {
							pigs: {
								type: 'int'
							}
						}
					}
				});
			});

			it('should only allow for numbers by an optional preceeding sign', function() {
				node.setAttribute('pigs', '+1234234');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'pigs'));

				node.setAttribute('pigs', '-137456745');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'pigs'));

				node.setAttribute('pigs', '1234523452');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'pigs'));
			});

			it('returns false for empty strings without allowEmpty:true', function() {
				node.setAttribute('pigs', '');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'pigs'));
			});
		});

		describe('boolean', function() {
			beforeEach(function() {
				axe.configure({
					standards: {
						ariaAttrs: {
							horses: {
								type: 'boolean'
							}
						}
					}
				});
			});

			it('returns true for boolean value', function() {
				var node = document.createElement('div');
				node.setAttribute('horses', 'true');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'horses'));

				node.setAttribute('horses', 'false');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'horses'));
			});

			it('should be case-insensitive', function() {
				var node = document.createElement('div');
				node.setAttribute('horses', 'trUE');

				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'horses'));
			});

			it('returns false for non-boolean values', function() {
				var node = document.createElement('div');
				node.setAttribute('horses', 'hi');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'horses'));

				node.setAttribute('horses', '1');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'horses'));
			});

			it('returns false for non-empty strings without allowEmpty:true', function() {
				var node = document.createElement('div');
				node.setAttribute('horses', '');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'horses'));
			});
		});
	});
});

function makeShadowTreeVAV(node) {
	'use strict';
	var root = node.attachShadow({ mode: 'open' });
	var div = document.createElement('div');
	div.className = 'parent';
	root.appendChild(div);
	div.appendChild(createContentVAV());
}

function createContentVAV() {
	'use strict';
	var group = document.createElement('div');
	group.innerHTML =
		'<label id="mylabel">Label</label>' +
		'<input id="myinput" aria-labelledby="mylabel" type="text" />' +
		'<input id="invalid" aria-labelledby="doesnotexist" type="text" />';
	return group;
}
