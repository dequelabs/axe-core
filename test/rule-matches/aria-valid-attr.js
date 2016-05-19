describe('aria-valid-attr matches', function () {

	var fixture = document.getElementById('fixture');
	var rule;

	beforeEach(function () {
		rule = axe._audit.rules.find(function (rule) {
			return rule.id === 'aria-valid-attr';
		});
	});

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('is a function', function () {
		assert.isFunction(rule.matches);
	});

});