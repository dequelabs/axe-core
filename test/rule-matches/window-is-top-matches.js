describe('window-is-top-matches', function() {
	var rule;
	var fixture = document.getElementById('fixture');

	beforeEach(function() {
		rule = axe._audit.rules.find(function(rule) {
			return rule.id === 'html-has-lang';
		});
	});

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('should return true when element is in the top window', function() {
		assert.isTrue(rule.matches(fixture));
	});

	it('should return false when element is not in the top window', function() {
		var frame = document.createElement('iframe');
		fixture.appendChild(frame);

		var doc = frame.contentDocument;
		var div = doc.createElement('div');
		doc.body.appendChild(div);

		assert.isFalse(rule.matches(div));
	});

	it('should return true when "isTopWindow" has been set', function() {
		var frame = document.createElement('iframe');
		fixture.appendChild(frame);

		var doc = frame.contentDocument;
		var div = doc.createElement('div');
		doc.body.appendChild(div);

		axe._cache.set('isTopWindow', true);
		assert.isTrue(rule.matches(div));
	});
});
