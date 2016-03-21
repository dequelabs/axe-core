
describe('aria.requiredAttr', function () {
	'use strict';

	var orig;
	beforeEach(function () {
		orig = axe.commons.aria._lut.role;
	});

	afterEach(function () {
		axe.commons.aria._lut.role = orig;
	});

	it('should returned the attributes property for the proper role', function () {
		axe.commons.aria._lut.role = {
			'cats': {
				attributes: {
					required: 'yes'
				}
			}
		};
		assert.equal(axe.commons.aria.requiredAttr('cats'), 'yes');

	});

	it('should return an empty array if there are no required attributes', function () {
		axe.commons.aria._lut.role = {};
		var result = axe.commons.aria.requiredAttr('cats');

		assert.deepEqual(result, []);

	});
});

describe('aria.allowedAttr', function () {
	'use strict';

	var orig;
	beforeEach(function () {
		orig = axe.commons.aria._lut.role;
	});

	afterEach(function () {
		axe.commons.aria._lut.role = orig;
	});

	it('should returned the attributes property for the proper role', function () {
		var orig = axe.commons.aria._lut.globalAttributes = ['world'];
		axe.commons.aria._lut.role = {
			'cats': {
				attributes: {
					allowed: ['hello']
				}
			}
		};

		assert.deepEqual(axe.commons.aria.allowedAttr('cats'), ['hello', 'world']);
		axe.commons.aria._lut.globalAttributes = orig;
	});

	it('should also check required attributes', function () {
		var orig = axe.commons.aria._lut.globalAttributes = ['world'];
		axe.commons.aria._lut.role = {
			'cats': {
				attributes: {
					required: ['hello'],
					allowed: ['ok']
				}
			}
		};

		assert.deepEqual(axe.commons.aria.allowedAttr('cats'), ['ok', 'world', 'hello']);
		axe.commons.aria._lut.globalAttributes = orig;
	});

	it('should return an array with globally allowed attributes', function () {
		var result,
			orig = axe.commons.aria._lut.globalAttributes = ['world'];

		axe.commons.aria._lut.role = {};
		result = axe.commons.aria.allowedAttr('cats');

		assert.deepEqual(result, ['world']);
		axe.commons.aria._lut.globalAttributes = orig;

	});
});

describe('aria.validateAttr', function () {
	'use strict';

	var orig;
	beforeEach(function () {
		orig = axe.commons.aria._lut.attributes;
	});

	afterEach(function () {
		axe.commons.aria._lut.attributes = orig;
	});

	it('should return true if attribute is found in lut', function () {
		axe.commons.aria._lut.attributes = {
			'cats': {}
		};

		assert.isTrue(axe.commons.aria.validateAttr('cats'));
	});

	it('should return false if attribute is found in lut', function () {
		axe.commons.aria._lut.attributes = {};

		assert.isFalse(axe.commons.aria.validateAttr('cats'));
	});
});

describe('aria.validateAttrValue', function () {
	'use strict';

	var orig = axe.commons.aria._lut.attributes,
		fixture = document.getElementById('fixture');

	afterEach(function () {
		axe.commons.aria._lut.attributes = orig;
		fixture.innerHTML = '';
	});

	it('should return true if there is no matching attribute (future-compat???)', function () {
		var node = document.createElement('div');
		node.setAttribute('cats', 'hello');

		assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));
	});

	describe('schema defintions', function () {

		describe('enumerated values', function () {
			it('should validate against enumerated .values if present', function () {
				axe.commons.aria._lut.attributes = {
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
			it('should be case-insensitive for enumerated values', function () {
				axe.commons.aria._lut.attributes = {
					cats: {
						type: 'nmtoken',
						values: ['valid']
					}
				};
				var node = document.createElement('div');
				node.setAttribute('cats', 'vaLiD');

				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));

			});
			it('should reject empty strings', function () {
				axe.commons.aria._lut.attributes = {
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
		describe('idref', function () {
			it('should validate the referenced node exists', function () {
				axe.commons.aria._lut.attributes = {
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
		});
		describe('idrefs', function () {

			var node = document.createElement('div');
			beforeEach(function () {
				axe.commons.aria._lut.attributes = {
					cats: {
						type: 'idrefs'
					}
				};
			});

			it('should return false when a single referenced node is not found', function () {

				node.setAttribute('cats', 'invalid');
				// target2 not found
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cats'));
			});

			it('should return false when a referenced element is not found', function () {

				fixture.innerHTML = '<div id="target"></div>';
				node.setAttribute('cats', 'target target2');
				// target2 not found
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cats'));
			});

			it('should return true when all targets are found', function () {
				fixture.innerHTML = '<div id="target"></div><div id="target2"></div>';
				node.setAttribute('cats', 'target target2');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));
			});

			it('should not fail on weird whitespace', function () {
				fixture.innerHTML = '<div id="target"></div><div id="target2"></div>';
				node.setAttribute('cats', ' \t \ttarget   \t   target2      ');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));
			});

		});

		describe('string', function () {
			it('should always return true', function () {
				axe.commons.aria._lut.attributes = {
					cats: {
						type: 'string'
					}
				};
				var node = document.createElement('div');
				node.setAttribute('cats', 'hi');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));
			});
		});

		describe('decimal', function () {
			var node = document.createElement('div');
			beforeEach(function () {
				axe.commons.aria._lut.attributes = {
					cats: {
						type: 'decimal'
					}
				};
			});

			it('should allow, but not require, a preceeding sign', function () {
				node.setAttribute('cats', '+1.12');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '-1.12');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '1.12');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));
			});

			it('should make the decimal separator optional', function () {
				node.setAttribute('cats', '+1');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '-1');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '1');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));
			});

			it('should make the whole number optional', function () {
				node.setAttribute('cats', '+.1');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '-.1');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '.1');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));
			});

			it('should make the right-side optional', function () {
				node.setAttribute('cats', '+1.');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '-1.');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '1.');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));

			});

			it('should validate the entire string', function () {
				node.setAttribute('cats', ' +1.12 ');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', 'invalid +1.12');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '+1.12 invalid');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cats'));

			});

			it('should only allow for numbers', function () {
				node.setAttribute('cats', '+a.12');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '+1.b');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', 'b1.1');
				assert.isFalse(axe.commons.aria.validateAttrValue(node, 'cats'));

			});

			it('should require at least one number', function () {
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
		});

		describe('int', function () {
			var node = document.createElement('div');
			beforeEach(function () {
				axe.commons.aria._lut.attributes = {
					cats: {
						type: 'int'
					}
				};
			});

			it('should only allow for numbers by an optional preceeding sign', function () {

				node.setAttribute('cats', '+1234234');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '-137456745');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '1234523452');
				assert.isTrue(axe.commons.aria.validateAttrValue(node, 'cats'));
			});
		});
	});
});
