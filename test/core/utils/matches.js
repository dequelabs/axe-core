describe('utils.matches', function() {
	var matches = axe.utils.matches;
	var fixture = document.querySelector('#fixture');
	var queryFixture = axe.testUtils.queryFixture;

	afterEach(function() {
		fixture.innerHTML = '';
	});

	describe('tag', function() {
		it('returns true if tag matches', function() {
			var virtualNode = queryFixture('<h1 id="target">foo</h1>');
			assert.isTrue(matches(virtualNode, 'h1'));
		});

		it('returns false if the tag does not match', function() {
			var virtualNode = queryFixture('<h1 id="target">foo</h1>');
			assert.isFalse(matches(virtualNode, 'div'));
		});

		it('is case sensitive for XHTML', function() {
			var virtualNode = queryFixture('<H1 id="target">foo</H1>');
			virtualNode._isXHTML = true;
			assert.isFalse(matches(virtualNode, 'h1'));
		});

		it('is case insensitive for HTML, but not for XHTML', function() {
			var virtualNode = queryFixture('<H1 id="target">foo</H1>');
			virtualNode._isXHTML = true;
			assert.isFalse(matches(virtualNode, 'h1'));
		});
	});

	describe('classes', function() {
		it('returns true if all classes match', function() {
			var virtualNode = queryFixture(
				'<span id="target" class="foo bar baz"></span>'
			);
			assert.isTrue(matches(virtualNode, '.foo.bar.baz'));
		});

		it('returns false if some classes do not match', function() {
			var virtualNode = queryFixture(
				'<span id="target" class="foo bar baz"></span>'
			);
			assert.isFalse(matches(virtualNode, '.foo.bar.bazz'));
		});

		it('returns false if any classes are missing', function() {
			var virtualNode = queryFixture(
				'<span id="target" class="foo bar"></span>'
			);
			assert.isFalse(matches(virtualNode, '.foo.bar.baz'));
		});
	});

	describe('attributes', function() {
		it('returns true if attribute exists', function() {
			var virtualNode = queryFixture(
				'<span id="target" foo="baz" bar="foo" baz="bar"></span>'
			);
			assert.isTrue(matches(virtualNode, '[foo]'));
		});

		it('returns true if attribute matches', function() {
			var virtualNode = queryFixture(
				'<span id="target" foo="baz" bar="foo" baz="bar"></span>'
			);
			assert.isTrue(matches(virtualNode, '[foo=baz]'));
		});

		it('returns true if all attributes match', function() {
			var virtualNode = queryFixture(
				'<span id="target" foo="baz" bar="foo" baz="bar"></span>'
			);
			assert.isTrue(matches(virtualNode, '[foo="baz"][bar="foo"][baz="bar"]'));
		});

		it('returns false if some attributes do not match', function() {
			var virtualNode = queryFixture(
				'<span id="target" foo="baz" bar="foo" baz="bar"></span>'
			);
			assert.isFalse(matches(virtualNode, '[foo="baz"][bar="foo"][baz="baz"]'));
		});

		it('returns false if any attributes are missing', function() {
			var virtualNode = queryFixture(
				'<span id="target" foo="baz" baz="bar"></span>'
			);
			assert.isFalse(matches(virtualNode, '[foo="baz"][bar="foo"][baz="bar"]'));
		});
	});

	describe('id', function() {
		it('returns true if id matches', function() {
			var virtualNode = queryFixture('<h1 id="target">foo</h1>');
			assert.isTrue(matches(virtualNode, '#target'));
		});

		it('returns false if the id does not match', function() {
			var virtualNode = queryFixture('<h1 id="target">foo</h1>');
			assert.isFalse(matches(virtualNode, '#notTarget'));
		});
	});

	describe('pseudos', function() {
		it('returns true if :not matches using tag', function() {
			var virtualNode = queryFixture('<h1 id="target">foo</h1>');
			assert.isTrue(matches(virtualNode, 'h1:not(span)'));
		});

		it('returns true if :not matches using class', function() {
			var virtualNode = queryFixture('<h1 id="target">foo</h1>');
			assert.isTrue(matches(virtualNode, 'h1:not(.foo)'));
		});

		it('returns true if :not matches using attribute', function() {
			var virtualNode = queryFixture('<h1 id="target">foo</h1>');
			assert.isTrue(matches(virtualNode, 'h1:not([class])'));
		});

		it('returns true if :not matches using id', function() {
			var virtualNode = queryFixture('<h1 id="target">foo</h1>');
			assert.isTrue(matches(virtualNode, 'h1:not(#foo)'));
		});

		it('returns false if :not matches element', function() {
			var virtualNode = queryFixture('<h1 id="target">foo</h1>');
			assert.isFalse(matches(virtualNode, 'h1:not([id])'));
		});

		it('throws error if pseudo is not implemented', function() {
			var virtualNode = queryFixture('<h1 id="target">foo</h1>');
			assert.throws(function() {
				matches(virtualNode, 'h1:empty');
			});
			assert.throws(function() {
				matches(virtualNode, 'h1::before');
			});
		});
	});

	describe('complex', function() {
		it('returns true for complex selector', function() {
			var virtualNode = queryFixture(
				'<span id="target" class="foo bar baz"></span>'
			);
			assert.isTrue(matches(virtualNode, 'span.foo[id="target"]:not(div)'));
		});

		it('returns false if any part of the selector does not match', function() {
			var virtualNode = queryFixture(
				'<span id="target" class="foo bar baz"></span>'
			);
			assert.isFalse(matches(virtualNode, 'span.foo[id="target"]:not(span)'));
		});

		it('returns true if a comma-separated list of selectors match', function() {
			var virtualNode = queryFixture(
				'<span id="target" class="foo bar baz"></span>'
			);
			assert.isTrue(matches(virtualNode, 'div, p, span'));
		});
	});

	describe('combinator', function() {
		it('returns true if parent selector matches', function() {
			var virtualNode = queryFixture('<div><h1 id="target">foo</h1></div>');
			assert.isTrue(matches(virtualNode, 'div > h1'));
		});

		it('returns true if nested parent selector matches', function() {
			var virtualNode = queryFixture(
				'<main><div><h1 id="target">foo</h1></div><main>'
			);
			assert.isTrue(matches(virtualNode, 'main > div > h1'));
		});

		it('returns true if hierarchical selector matches', function() {
			var virtualNode = queryFixture('<div><h1 id="target">foo</h1></div>');
			assert.isTrue(matches(virtualNode, 'div h1'));
		});

		it('returns true if nested hierarchical selector matches', function() {
			var virtualNode = queryFixture(
				'<div><table><tr><td><h1 id="target">foo</h1></td></tr></table></div>'
			);
			assert.isTrue(matches(virtualNode, 'div tr h1'));
		});

		it('returns true if mixed parent and hierarchical selector matches', function() {
			var virtualNode = queryFixture(
				'<div><table><tr><td><h1 id="target">foo</h1></td></tr></table></div>'
			);
			assert.isTrue(matches(virtualNode, 'div tr > td h1'));
		});

		it('returns false if parent selector does not match', function() {
			var virtualNode = queryFixture('<div><h1 id="target">foo</h1></div>');
			assert.isFalse(matches(virtualNode, 'span > h1'));
		});

		it('returns false if nested parent selector does not match', function() {
			var virtualNode = queryFixture(
				'<main><div><h1 id="target">foo</h1></div><main>'
			);
			assert.isFalse(matches(virtualNode, 'span > div > h1'));
		});

		it('returns false if hierarchical selector does not match', function() {
			var virtualNode = queryFixture('<div><h1 id="target">foo</h1></div>');
			assert.isFalse(matches(virtualNode, 'span h1'));
		});

		it('returns false if nested hierarchical selector does not match', function() {
			var virtualNode = queryFixture(
				'<div><table><tr><td><h1 id="target">foo</h1></td></tr></table></div>'
			);
			assert.isFalse(matches(virtualNode, 'div span h1'));
		});

		it('returns false if mixed parent and hierarchical selector does not match', function() {
			var virtualNode = queryFixture(
				'<div><table><tr><td><h1 id="target">foo</h1></td></tr></table></div>'
			);
			assert.isFalse(matches(virtualNode, 'div span > td h1'));
		});

		it('throws error if combinator is not implemented', function() {
			var virtualNode = queryFixture('<div></div><h1 id="target">foo</h1>');
			assert.throws(function() {
				matches(virtualNode, 'div + h1');
			});
			assert.throws(function() {
				matches(virtualNode, 'div ~ h1');
			});
		});
	});
});
