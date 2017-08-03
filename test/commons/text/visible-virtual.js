describe('text.visible', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var shadowSupported = axe.testUtils.shadowSupport.v1;
	var visibleVirtual = axe.commons.text.visibleVirtual;

	afterEach(function () {
		document.getElementById('fixture').innerHTML = '';
	});

	describe('non-screen-reader', function () {
		it('should not return elements with visibility: hidden', function () {
			fixture.innerHTML = 'Hello<span style="visibility: hidden;">Hi</span>';
			var tree = axe.utils.getFlattenedTree(fixture);
			assert.equal(visibleVirtual(tree[0]), 'Hello');
		});

		it('should handle implicitly recursive calls', function () {
			fixture.innerHTML = 'Hello<span><span>Hi</span></span>';
			var tree = axe.utils.getFlattenedTree(fixture);
			assert.equal(visibleVirtual(tree[0]), 'HelloHi');
		});

		it('should handle explicitly recursive calls', function () {
			fixture.innerHTML = 'Hello<span><span>Hi</span></span>';
			var tree = axe.utils.getFlattenedTree(fixture);
			assert.equal(visibleVirtual(tree[0], null, false), 'HelloHi');
		});

		it('should handle non-recursive calls', function () {
			fixture.innerHTML = 'Hello<span><span>Hi</span></span>';
			var tree = axe.utils.getFlattenedTree(fixture);
			assert.equal(visibleVirtual(tree[0], null, true), 'Hello');
		});

		it('should know how visibility works', function () {
			fixture.innerHTML = 'Hello <span style="visibility: hidden;">' +
					'<span style="visibility: visible;">Hi</span>' +
				'</span>';

			var tree = axe.utils.getFlattenedTree(fixture);
			assert.equal(visibleVirtual(tree[0]), 'Hello Hi');
		});

		it('should not return elements with display: none', function () {
			fixture.innerHTML = 'Hello<span style="display: none;"><span>Hi</span></span>';

			var tree = axe.utils.getFlattenedTree(fixture);
			assert.equal(visibleVirtual(tree[0]), 'Hello');
		});

		it('should trim the result', function () {
			fixture.innerHTML = '   &nbsp;\u00A0    Hello  &nbsp;\r\n   Hi     \n \n &nbsp; \n   ';
			var tree = axe.utils.getFlattenedTree(fixture);
			assert.equal(visibleVirtual(tree[0]), 'Hello Hi');
		});

		it('should ignore script and style tags', function () {
			fixture.innerHTML = '<script> // hello </script><style> /*hello */</style>' +
				'Hello';

			var tree = axe.utils.getFlattenedTree(fixture);
			assert.equal(visibleVirtual(tree[0]), 'Hello');
		});

		it('should not take into account position of parents', function () {
			fixture.innerHTML = '<div style="position: absolute; top: -9999px;">' +
					'<div style="position: absolute; top: 10000px;">Hello</div>' +
				'</div>';

			var tree = axe.utils.getFlattenedTree(fixture);
			assert.equal(visibleVirtual(tree[0]), 'Hello');
		});

		it('should correctly handle slotted elements', function () {
	        function createContentSlotted() {
	            var group = document.createElement('div');
	            group.innerHTML = '<div id="target">Stuff<slot></slot></div>';
	            return group;
	        }
			function makeShadowTree(node) {
				var root = node.attachShadow({mode: 'open'});
				var div = document.createElement('div');
				root.appendChild(div);
				div.appendChild(createContentSlotted());
			}
			if (shadowSupported) {
				fixture.innerHTML = '<div><a>hello</a></div>';
				makeShadowTree(fixture.firstChild);
				var tree = axe.utils.getFlattenedTree(fixture.firstChild);
				assert.equal(visibleVirtual(tree[0]), 'Stuffhello');
			}
		});
	});

	describe('screen reader', function () {
		it('should not return elements with visibility: hidden', function () {
			fixture.innerHTML = 'Hello<span style="visibility: hidden;">Hi</span>';

			var tree = axe.utils.getFlattenedTree(fixture);
			assert.equal(visibleVirtual(tree[0], true), 'Hello');
		});

		it('should know how visibility works', function () {
			fixture.innerHTML = 'Hello <span style="visibility: hidden;">' +
					'<span style="visibility: visible;">Hi</span>' +
				'</span>';

			var tree = axe.utils.getFlattenedTree(fixture);
			assert.equal(visibleVirtual(tree[0], true), 'Hello Hi');
		});

		it('should not return elements with display: none', function () {
			fixture.innerHTML = 'Hello<span style="display: none;"><span>Hi</span></span>';

			var tree = axe.utils.getFlattenedTree(fixture);
			assert.equal(visibleVirtual(tree[0], true), 'Hello');
		});

		it('should trim the result', function () {
			fixture.innerHTML = '   &nbsp;\u00A0    Hello  &nbsp;\r\n   Hi     \n \n &nbsp; \n   ';
			var tree = axe.utils.getFlattenedTree(fixture);
			assert.equal(visibleVirtual(tree[0], true), 'Hello Hi');
		});

		it('should ignore script and style tags', function () {
			fixture.innerHTML = '<script> // hello </script><style> /*hello */</style>' +
				'Hello';

			var tree = axe.utils.getFlattenedTree(fixture);
			assert.equal(visibleVirtual(tree[0], true), 'Hello');
		});

		it('should not consider offscreen text as hidden (position)', function () {
			fixture.innerHTML = '<div style="position: absolute; top: -9999px;">' +
					'<div>Hello</div>' +
				'</div>';

			var tree = axe.utils.getFlattenedTree(fixture);
			assert.equal(visibleVirtual(tree[0], true), 'Hello');

		});

		it('should not consider offscreen text as hidden (text-indent)', function () {
			fixture.innerHTML = '<div style="text-indent: -9999px;">' +
					'Hello</div>';

			var tree = axe.utils.getFlattenedTree(fixture);
			assert.equal(visibleVirtual(tree[0], true), 'Hello');
		});
	});

});
