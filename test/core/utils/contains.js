describe('axe.utils.contains', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var shadowSupported = axe.testUtils.shadowSupport.v1;

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

	it('should work when the child is inside shadow DOM', function () {
		var tree, node1, node2;

		function createContentContains() {
			var group = document.createElement('div');
			group.innerHTML = '<label id="mylabel">Label</label><input aria-labelledby="mylabel" type="text" />';
			return group;
		}

		function makeShadowTreeContains(node) {
			var root = node.attachShadow({mode: 'open'});
			var div = document.createElement('div');
			div.className = 'parent';
			root.appendChild(div);
			div.appendChild(createContentContains());
		}
		if (shadowSupported) {
			// shadow DOM v1 - note: v0 is compatible with this code, so no need
			// to specifically test this
			fixture.innerHTML = '<div></div>';
			makeShadowTreeContains(fixture.firstChild);
			tree = axe.utils.getFlattenedTree(fixture.firstChild);
			node1 = axe.utils.querySelectorAll(tree, '.parent')[0];
			node2 = axe.utils.querySelectorAll(tree, 'input')[0];
			assert.isTrue(axe.utils.contains(node1, node2));
		}
	});

	it('should work with slotted elements inside shadow DOM', function () {
		var tree, node1, node2;

        function createContentSlotted() {
            var group = document.createElement('div');
            group.innerHTML = '<div id="target">Stuff<slot></slot></div>';
            return group;
        }
		function makeShadowTree(node) {
			var root = node.attachShadow({mode: 'open'});
			var div = document.createElement('div');
			var a = document.createElement('a');
			div.appendChild(a);
			root.appendChild(div);
			div.appendChild(createContentSlotted());
		}
		if (shadowSupported) {
			fixture.innerHTML = '<div></div>';
			makeShadowTree(fixture.firstChild);
			tree = axe.utils.getFlattenedTree(fixture.firstChild)[0].children;
			node1 = axe.utils.querySelectorAll(tree, '#target')[0];
			node2 = axe.utils.querySelectorAll(tree, 'a')[0];
			assert.isTrue(axe.utils.contains(node1, node2));
		}
	});

	it('should work', function () {
		fixture.innerHTML = '<div id="outer"><div id="inner"></div></div>';
		var inner = axe.utils.getFlattenedTree(document.getElementById('inner'))[0];
		var outer = axe.utils.getFlattenedTree(document.getElementById('outer'))[0];

		assert.isTrue(axe.utils.contains(outer, inner));
		assert.isFalse(axe.utils.contains(inner, outer));
	});
});