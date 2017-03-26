describe('axe.utils.contains', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should first check contains', function () {
		var success = false,
			node2 = { actualNode: 'not really a node but it doesnt matter' },
			node1 = {
				actualNode: {
					contains: function (n2) {
						success = true;
						assert.deepEqual(n2, node2.actualNode);
					},
					compareDocumentPosition: function () {
						success = false;
						assert.ok(false, 'should not be called');

					}
				}
			};

		axe.utils.contains(node1, node2);
		assert.isTrue(success);
	});

	it('should fallback to compareDocumentPosition', function () {
		var success = false,
			node2 = { actualNode: 'not really a node but it doesnt matter' },
			node1 = {
				actualNode: {
					compareDocumentPosition: function (n2) {
						success = true;
						assert.deepEqual(n2, node2.actualNode);
					}
				}
			};

		axe.utils.contains(node1, node2);
		assert.isTrue(success);
	});

	it('should compareDocumentPosition against bitwise & 16', function () {
		var node2 = { actualNode: 'not really a node but it doesnt matter' },
			node1 = {
				actualNode: {
					compareDocumentPosition: function () {
						return 20;
					}
				}
			};

		assert.isTrue(axe.utils.contains(node1, node2));
	});

	it('should work', function () {
		fixture.innerHTML = '<div id="outer"><div id="inner"></div></div>';
		var inner = axe.utils.getComposedTree(document.getElementById('inner'))[0];
		var outer = axe.utils.getComposedTree(document.getElementById('outer'))[0];

		assert.isTrue(axe.utils.contains(outer, inner));
		assert.isFalse(axe.utils.contains(inner, outer));
	});
});