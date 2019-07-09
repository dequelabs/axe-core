describe('aria.validateAttrValue', function() {
	'use strict';

	var orig = axe.commons.aria.lookupTable.attributes,
		fixture = document.getElementById('fixture');

	var shadowSupport = axe.testUtils.shadowSupport;

	afterEach(function() {
		axe.commons.aria.lookupTable.attributes = orig;
		fixture.innerHTML = '';
	});

	it('should return true if there is no matching attribute (future-compat???)', function() {
		var node = document.createElement('div');
		node.setAttribute('cats', 'hello');

		assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));
	});

	it('returns true for empty attributes with allowEmpty:true', function() {
		axe.commons.aria.lookupTable.attributes = {
			cats: {
				type: 'nmtoken',
				allowEmpty: true,
				values: ['valid']
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
			}
		};

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
	});
	it('returns true for whitespace-only attributes with allowEmpty:true', function() {
		axe.commons.aria.lookupTable.attributes = {
			cats: {
				type: 'nmtoken',
				allowEmpty: true,
				values: ['valid']
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
			}
		};

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
	});
	describe('schema defintions', function() {
		describe('enumerated values', function() {
			it('should validate against enumerated .values if present', function() {
				axe.commons.aria.lookupTable.attributes = {
					cats: {
						type: 'nmtoken',
						values: ['valid']
					}
				};
				var node = document.createElement('div');
				node.setAttribute('cats', 'valid');

				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', 'invalid');

				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cats'));
			});
			it('should be case-insensitive for enumerated values', function() {
				axe.commons.aria.lookupTable.attributes = {
					cats: {
						type: 'nmtoken',
						values: ['valid']
					}
				};
				var node = document.createElement('div');
				node.setAttribute('cats', 'vaLiD');

				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));
			});
			it('should reject empty strings', function() {
				axe.commons.aria.lookupTable.attributes = {
					cats: {
						type: 'nmtoken',
						values: ['valid']
					}
				};
				var node = document.createElement('div');
				node.setAttribute('cats', '');

				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cats'));
			});
		});
		describe('idref', function() {
			it('should validate the referenced node exists', function() {
				axe.commons.aria.lookupTable.attributes = {
					cats: {
						type: 'idref'
					}
				};

				var node = document.createElement('div');
				fixture.innerHTML = '<div id="target"></div>';
				node.setAttribute('cats', 'target');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', 'invalid');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cats'));
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
				axe.commons.aria.lookupTable.attributes = {
					cats: {
						type: 'idref'
					}
				};
				var node = document.createElement('div');
				node.setAttribute('cats', '');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cats'));
			});
		});
		describe('idrefs', function() {
			var node = document.createElement('div');
			beforeEach(function() {
				axe.commons.aria.lookupTable.attributes = {
					cats: {
						type: 'idrefs'
					}
				};
			});

			it('should return false when a single referenced node is not found', function() {
				node.setAttribute('cats', 'invalid');
				// target2 not found
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cats'));
			});

			it('should return false when at no referenced element is found', function() {
				fixture.innerHTML = '<div id="target"></div>';
				node.setAttribute('cats', 'target2 target3');
				// target2 not found
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cats'));
			});

			it('should return true when at least one referenced element is found', function() {
				fixture.innerHTML = '<div id="target"></div>';
				node.setAttribute('cats', 'target target2');
				// target2 not found
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));
			});

			it('should return true when all targets are found', function() {
				fixture.innerHTML = '<div id="target"></div><div id="target2"></div>';
				node.setAttribute('cats', 'target target2');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));
			});

			it('should not fail on weird whitespace', function() {
				fixture.innerHTML = '<div id="target"></div><div id="target2"></div>';
				node.setAttribute('cats', ' \t \ttarget   \t   target2      ');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));
			});

			it('returns false if empty without allowEmpty: true', function() {
				axe.commons.aria.lookupTable.attributes = {
					cats: {
						type: 'idrefs'
					}
				};
				var node = document.createElement('div');
				node.setAttribute('cats', '');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cats'));
			});
		});

		describe('string', function() {
			it('returns true for non-empty strings', function() {
				axe.commons.aria.lookupTable.attributes = {
					cats: {
						type: 'string'
					}
				};
				var node = document.createElement('div');
				node.setAttribute('cats', 'hi');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));
			});
			it('returns false for non-empty strings without allowEmpty:true', function() {
				axe.commons.aria.lookupTable.attributes = {
					cats: {
						type: 'string'
					}
				};
				var node = document.createElement('div');
				node.setAttribute('cats', '');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cats'));
			});
		});

		describe('decimal', function() {
			var node = document.createElement('div');
			beforeEach(function() {
				axe.commons.aria.lookupTable.attributes = {
					cats: {
						type: 'decimal'
					}
				};
			});

			it('should allow, but not require, a preceeding sign', function() {
				node.setAttribute('cats', '+1.12');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '-1.12');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '1.12');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));
			});

			it('should make the decimal separator optional', function() {
				node.setAttribute('cats', '+1');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '-1');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '1');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));
			});

			it('should make the whole number optional', function() {
				node.setAttribute('cats', '+.1');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '-.1');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '.1');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));
			});

			it('should make the right-side optional', function() {
				node.setAttribute('cats', '+1.');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '-1.');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '1.');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));
			});

			it('should validate the entire string', function() {
				node.setAttribute('cats', ' +1.12 ');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', 'invalid +1.12');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '+1.12 invalid');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cats'));
			});

			it('should only allow for numbers', function() {
				node.setAttribute('cats', '+a.12');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '+1.b');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', 'b1.1');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cats'));
			});

			it('should require at least one number', function() {
				node.setAttribute('cats', '+.');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '-.');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '+');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '-');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '.');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cats'));
			});

			it('returns false for empty strings without allowEmpty:true', function() {
				node.setAttribute('cats', '');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cats'));
			});
		});

		describe('int', function() {
			var node = document.createElement('div');
			beforeEach(function() {
				axe.commons.aria.lookupTable.attributes = {
					cats: {
						type: 'int'
					}
				};
			});

			it('should only allow for numbers by an optional preceeding sign', function() {
				node.setAttribute('cats', '+1234234');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '-137456745');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '1234523452');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));
			});
			it('returns false for empty strings without allowEmpty:true', function() {
				node.setAttribute('cats', '');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cats'));
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
