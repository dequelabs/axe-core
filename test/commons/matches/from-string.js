describe('matches.fromString', function() {
	var fromString = axe.commons.matches.fromString;

	it('returns true when strictly equal', function() {
		assert.isTrue(fromString('foo', 'foo'));
	});
	it('returns false when not strictly equal', function() {
		assert.isFalse(fromString('foo', 'bar'));
	});

	describe('with array matchers', function() {
		it('returns true if the string is included', function() {
			assert.isTrue(fromString('bar', ['foo', 'bar', 'baz']));
		});
		it('returns false if the string is not included', function() {
			assert.isFalse(fromString('foo bar', ['foo', 'bar', 'baz']));
		});
		it('returns false when passed `undefined`', function() {
			assert.isFalse(fromString(undefined, ['foo', 'bar', 'baz']));
		});
	});

	describe('with function matchers', function() {
		it('returns true if the function returns a truthy value', function() {
			assert.isTrue(
				fromString('foo', function(val) {
					assert.equal(val, 'foo');
					return true;
				})
			);
			assert.isTrue(
				fromString('foo', function() {
					return 123;
				})
			);
			assert.isTrue(
				fromString('foo', function() {
					return {};
				})
			);
		});
		it('returns false if the function returns a falsey value', function() {
			assert.isFalse(
				fromString('foo', function(val) {
					assert.equal(val, 'foo');
					return false;
				})
			);
			assert.isFalse(
				fromString('foo', function() {
					return 0;
				})
			);
			assert.isFalse(
				fromString('foo', function() {
					return undefined;
				})
			);
		});
	});

	describe('with RegExp matchers', function() {
		it('returns true if the regexp matches', function() {
			assert.isTrue(fromString('bar', /^(foo|bar|baz)$/));
		});
		it('returns false if the regexp does not match', function() {
			assert.isFalse(fromString('foobar', /^(foo|bar|baz)$/));
		});
	});
});
