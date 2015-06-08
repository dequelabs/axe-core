describe('utils.contains', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should first check contains', function () {
		var success = false,
			node2 = 'not really a node but it doesnt matter',
			node1 = {
				contains: function (n2) {
					success = true;
					assert.equal(n2, node2);
				},
				compareDocumentPosition: function () {
					success = false;
					assert.ok(false, 'should not be called');

				}
			};

		utils.contains(node1, node2);
		assert.isTrue(success);
	});

	it('should fallback to compareDocumentPosition', function () {
		var success = false,
			node2 = 'not really a node but it doesnt matter',
			node1 = {
				compareDocumentPosition: function (n2) {
					success = true;
					assert.equal(n2, node2);
				}
			};

		utils.contains(node1, node2);
		assert.isTrue(success);
	});

	it('should compareDocumentPosition against bitwise & 16', function () {
		var node2 = 'not really a node but it doesnt matter',
			node1 = {
				compareDocumentPosition: function () {
					return 20;
				}
			};

		assert.isTrue(utils.contains(node1, node2));
	});

	it('should work', function () {
		fixture.innerHTML = '<div id="outer"><div id="inner"></div></div>';
		var inner = document.getElementById('inner');
		var outer = document.getElementById('outer');

		assert.isTrue(utils.contains(outer, inner));
		assert.isFalse(utils.contains(inner, outer));
	});
});