
describe('aria.requiredAttr', function () {
	'use strict';

	var orig;
	beforeEach(function () {
		orig = commons.aria._lut.role;
	});

	afterEach(function () {
		commons.aria._lut.role = orig;
	});

	it('should returned the attributes property for the proper role', function () {
		commons.aria._lut.role = {
			'cats': {
				attributes: {
					required: 'yes'
				}
			}
		};
		assert.equal(commons.aria.requiredAttr('cats'), 'yes');

	});

	it('should return an empty array if there are no required attributes', function () {
		commons.aria._lut.role = {};
		var result = commons.aria.requiredAttr('cats');

		assert.deepEqual(result, []);

	});
});

describe('aria.allowedAttr', function () {
	'use strict';

	var orig;
	beforeEach(function () {
		orig = commons.aria._lut.role;
	});

	afterEach(function () {
		commons.aria._lut.role = orig;
	});

	it('should returned the attributes property for the proper role', function () {
		var orig = commons.aria._lut.globalAttributes = ['world'];
		commons.aria._lut.role = {
			'cats': {
				attributes: {
					allowed: ['hello']
				}
			}
		};

		assert.deepEqual(commons.aria.allowedAttr('cats'), ['hello', 'world']);
		commons.aria._lut.globalAttributes = orig;
	});

	it('should also check required attributes', function () {
		var orig = commons.aria._lut.globalAttributes = ['world'];
		commons.aria._lut.role = {
			'cats': {
				attributes: {
					required: ['hello'],
					allowed: ['ok']
				}
			}
		};

		assert.deepEqual(commons.aria.allowedAttr('cats'), ['ok', 'world', 'hello']);
		commons.aria._lut.globalAttributes = orig;
	});

	it('should return an array with globally allowed attributes', function () {
		var result,
			orig = commons.aria._lut.globalAttributes = ['world'];

		commons.aria._lut.role = {};
		result = commons.aria.allowedAttr('cats');

		assert.deepEqual(result, ['world']);
		commons.aria._lut.globalAttributes = orig;

	});
});

describe('aria.validateAttr', function () {
	'use strict';

	var orig;
	beforeEach(function () {
		orig = commons.aria._lut.attributes;
	});

	afterEach(function () {
		commons.aria._lut.attributes = orig;
	});

	it('should return true if attribute is found in lut', function () {
		commons.aria._lut.attributes = {
			'cats': {}
		};

		assert.isTrue(commons.aria.validateAttr('cats'));
	});

	it('should return false if attribute is found in lut', function () {
		commons.aria._lut.attributes = {};

		assert.isFalse(commons.aria.validateAttr('cats'));
	});
});

describe('aria.validateAttrValue', function () {
	'use strict';

	var orig = commons.aria._lut.attributes,
		fixture = document.getElementById('fixture');

	afterEach(function () {
		commons.aria._lut.attributes = orig;
		fixture.innerHTML = '';
	});

	it('should return true if there is no matching attribute (future-compat???)', function () {
		var node = document.createElement('div');
		node.setAttribute('cats', 'hello');

		assert.isTrue(commons.aria.validateAttrValue(node, 'cats'));
	});

	describe('schema defintions', function () {

		describe('enumerated values', function () {
			it('should validate against enumerated .values if present', function () {
				commons.aria._lut.attributes = {
					cats: {
						values: ['valid']
					}
				};
				var node = document.createElement('div');
				node.setAttribute('cats', 'valid');

				assert.isTrue(commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', 'invalid');

				assert.isFalse(commons.aria.validateAttrValue(node, 'cats'));

			});
			it('should be case-insensitive for enumerated values', function () {
				commons.aria._lut.attributes = {
					cats: {
						values: ['valid']
					}
				};
				var node = document.createElement('div');
				node.setAttribute('cats', 'vaLiD');

				assert.isTrue(commons.aria.validateAttrValue(node, 'cats'));

			});
			it('should reject empty strings', function () {
				commons.aria._lut.attributes = {
					cats: {
						values: ['valid']
					}
				};
				var node = document.createElement('div');
				node.setAttribute('cats', '');

				assert.isFalse(commons.aria.validateAttrValue(node, 'cats'));
			});
		});
		describe('http://www.w3.org/2001/XMLSchema#idref', function () {
			it('should validate the referenced node exists', function () {
				commons.aria._lut.attributes = {
					cats: {
						type: 'http://www.w3.org/2001/XMLSchema#idref'
					}
				};

				var node = document.createElement('div');
				fixture.innerHTML = '<div id="target"></div>';
				node.setAttribute('cats', 'target');
				assert.isTrue(commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', 'invalid');
				assert.isFalse(commons.aria.validateAttrValue(node, 'cats'));
			});
		});
		describe('http://www.w3.org/2001/XMLSchema#idrefs', function () {

			var node = document.createElement('div');
			beforeEach(function () {
				commons.aria._lut.attributes = {
					cats: {
						type: 'http://www.w3.org/2001/XMLSchema#idrefs'
					}
				};
			});

			it('should return false when a single referenced node is not found', function () {

				node.setAttribute('cats', 'invalid');
				// target2 not found
				assert.isFalse(commons.aria.validateAttrValue(node, 'cats'));
			});

			it('should return false when a referenced element is not found', function () {

				fixture.innerHTML = '<div id="target"></div>';
				node.setAttribute('cats', 'target target2');
				// target2 not found
				assert.isFalse(commons.aria.validateAttrValue(node, 'cats'));
			});

			it('should return true when all targets are found', function () {
				fixture.innerHTML = '<div id="target"></div><div id="target2"></div>';
				node.setAttribute('cats', 'target target2');
				assert.isTrue(commons.aria.validateAttrValue(node, 'cats'));
			});

			it('should not fail on weird whitespace', function () {
				fixture.innerHTML = '<div id="target"></div><div id="target2"></div>';
				node.setAttribute('cats', ' \t \ttarget   \t   target2      ');
				assert.isTrue(commons.aria.validateAttrValue(node, 'cats'));
			});

		});

		describe('http://www.w3.org/2001/XMLSchema#string', function () {
			it('should always return true', function () {
				commons.aria._lut.attributes = {
					cats: {
						type: 'http://www.w3.org/2001/XMLSchema#string'
					}
				};
				var node = document.createElement('div');
				node.setAttribute('cats', 'hi');
				assert.isTrue(commons.aria.validateAttrValue(node, 'cats'));
			});
		});

		describe('http://www.w3.org/2001/XMLSchema#decimal', function () {
			var node = document.createElement('div');
			beforeEach(function () {
				commons.aria._lut.attributes = {
					cats: {
						type: 'http://www.w3.org/2001/XMLSchema#decimal'
					}
				};
			});

			it('should allow, but not require, a preceeding sign', function () {
				node.setAttribute('cats', '+1.12');
				assert.isTrue(commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '-1.12');
				assert.isTrue(commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '1.12');
				assert.isTrue(commons.aria.validateAttrValue(node, 'cats'));
			});

			it('should make the decimal separator optional', function () {
				node.setAttribute('cats', '+1');
				assert.isTrue(commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '-1');
				assert.isTrue(commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '1');
				assert.isTrue(commons.aria.validateAttrValue(node, 'cats'));
			});

			it('should make the whole number optional', function () {
				node.setAttribute('cats', '+.1');
				assert.isTrue(commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '-.1');
				assert.isTrue(commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '.1');
				assert.isTrue(commons.aria.validateAttrValue(node, 'cats'));
			});

			it('should make the right-side optional', function () {
				node.setAttribute('cats', '+1.');
				assert.isTrue(commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '-1.');
				assert.isTrue(commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '1.');
				assert.isTrue(commons.aria.validateAttrValue(node, 'cats'));

			});

			it('should validate the entire string', function () {
				node.setAttribute('cats', ' +1.12 ');
				assert.isFalse(commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', 'invalid +1.12');
				assert.isFalse(commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '+1.12 invalid');
				assert.isFalse(commons.aria.validateAttrValue(node, 'cats'));

			});

			it('should only allow for numbers', function () {
				node.setAttribute('cats', '+a.12');
				assert.isFalse(commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '+1.b');
				assert.isFalse(commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', 'b1.1');
				assert.isFalse(commons.aria.validateAttrValue(node, 'cats'));

			});

			it('should require at least one number', function () {
				node.setAttribute('cats', '+.');
				assert.isFalse(commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '-.');
				assert.isFalse(commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '+');
				assert.isFalse(commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '-');
				assert.isFalse(commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '.');
				assert.isFalse(commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '');
				assert.isFalse(commons.aria.validateAttrValue(node, 'cats'));

			});
		});

		describe('http://www.w3.org/2001/XMLSchema#int', function () {
			var node = document.createElement('div');
			beforeEach(function () {
				commons.aria._lut.attributes = {
					cats: {
						type: 'http://www.w3.org/2001/XMLSchema#int'
					}
				};
			});

			it('should only allow for numbers by an optional preceeding sign', function () {

				node.setAttribute('cats', '+1234234');
				assert.isTrue(commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '-137456745');
				assert.isTrue(commons.aria.validateAttrValue(node, 'cats'));

				node.setAttribute('cats', '1234523452');
				assert.isTrue(commons.aria.validateAttrValue(node, 'cats'));
			});
		});
	});
});
