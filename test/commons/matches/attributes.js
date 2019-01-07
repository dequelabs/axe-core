describe('matches.attributes', function() {
	var attributes = axe.commons.matches.attributes;
	var fixture = document.querySelector('#fixture');
	beforeEach(function() {
		fixture.innerHTML = '';
	});

	it('returns true if all attributes match', function() {
		fixture.innerHTML = '<span foo="baz" bar="foo" baz="bar"></span>';
		assert.isTrue(
			attributes(fixture.firstChild, {
				foo: 'baz',
				bar: 'foo',
				baz: 'bar'
			})
		);
	});

	it('returns false if some attributes do not match', function() {
		fixture.innerHTML = '<span foo="baz" bar="foo" baz="bar"></span>';
		assert.isFalse(
			attributes(fixture.firstChild, {
				foo: 'baz',
				bar: 'foo',
				baz: 'baz'
			})
		);
	});

	it('returns false if any attributes are missing', function() {
		fixture.innerHTML = '<span foo="baz" baz="bar"></span>';
		assert.isFalse(
			attributes(fixture.firstChild, {
				foo: 'baz',
				bar: 'foo',
				baz: 'bar'
			})
		);
	});

	it('works with virtual nodes', function() {
		fixture.innerHTML = '<span foo="bar" bar="foo"></span>';
		assert.isTrue(
			attributes(
				{
					actualNode: fixture.firstChild
				},
				{
					foo: 'bar',
					bar: 'foo'
				}
			)
		);
		assert.isFalse(
			attributes(
				{
					actualNode: fixture.firstChild
				},
				{
					baz: 'baz'
				}
			)
		);
	});
});
