describe('matches.properties', function() {
	var properties = axe.commons.matches.properties;

	it('returns true if all properties match', function() {
		assert.isTrue(
			properties(
				{
					foo: 'baz',
					bar: 'foo',
					baz: 'bar'
				},
				{
					foo: 'baz',
					baz: 'bar'
				}
			)
		);
	});

	it('returns false if some properties do not match', function() {
		assert.isFalse(
			properties(
				{
					foo: 'baz',
					bar: 'foo',
					baz: 'bar'
				},
				{
					foo: 'baz',
					bar: 'foo',
					baz: 'baz'
				}
			)
		);
	});

	it('returns false if any properties are missing', function() {
		assert.isFalse(
			properties(
				{
					foo: 'baz',
					baz: 'bar'
				},
				{
					foo: 'baz',
					bar: 'foo',
					baz: 'bar'
				}
			)
		);
	});

	it('works with virtual nodes', function() {
		assert.isTrue(
			properties(
				{
					actualNode: {
						foo: 'bar',
						bar: 'foo'
					}
				},
				{
					foo: 'bar',
					bar: 'foo'
				}
			)
		);
		assert.isFalse(
			properties(
				{
					actualNode: {
						foo: 'bar',
						bar: 'foo'
					}
				},
				{
					baz: 'baz'
				}
			)
		);
	});
});
