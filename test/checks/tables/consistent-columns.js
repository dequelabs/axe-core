describe('consistent-columns', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return false when there are differing row widths', function () {
		fixture.innerHTML = '<table>' +
				'<tr><td></td></tr>' +
				'<tr><th></th><td></td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isFalse(checks['consistent-columns'].evaluate(node));
	});

	it('should return false when there are differing row widths - thead', function () {
		fixture.innerHTML = '<table>' +
				'<thead><tr><td></td></tr></thead>' +
				'<tbody><tr><th></th><td></td></tr></tbody>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isFalse(checks['consistent-columns'].evaluate(node));
	});

	it('should return false when there are differing row widths - multiple tbodies', function () {
		fixture.innerHTML = '<table>' +
				'<thead><tr><td></td></tr></thead>' +
				'<tbody><tr><td></td></tr></tbody>' +
				'<tbody><tr><th></th><td></td></tr></tbody>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isFalse(checks['consistent-columns'].evaluate(node));
	});

	it('should return false when there are differing row widths - colspan', function () {
		fixture.innerHTML = '<table>' +
				'<thead><tr><td></td><td></td></tr></thead>' +
				'<tbody><tr><td></td><td></td></tr></tbody>' +
				'<tbody><tr><th colspan="2"></th><td></td></tr></tbody>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isFalse(checks['consistent-columns'].evaluate(node));
	});

	it('should return true row widths are made the same with colspan', function () {
		fixture.innerHTML = '<table>' +
				'<thead><tr><td colspan="2"></td><td></td></tr></thead>' +
				'<tbody><tr><td colspan="2"></td><td></td></tr></tbody>' +
				'<tbody><tr><th></th><td></td><td></td></tr></tbody>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isTrue(checks['consistent-columns'].evaluate(node));
	});

	it('should return true row widths are made the same with rowspan', function () {
		fixture.innerHTML = '<table>' +
				'<thead><tr><td rowspan="2"></td><td></td><td></td></tr></thead>' +
				'<tbody><tr><td></td><td></td></tr></tbody>' +
				'<tbody><tr><th></th><td></td><td></td></tr></tbody>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isTrue(checks['consistent-columns'].evaluate(node));
	});

	it('should return true row widths are made the same with rowspan and colspan', function () {
		fixture.innerHTML = '<table>' +
				'<thead><tr><td rowspan="2" colspan="2"></td><td></td></tr></thead>' +
				'<tbody><tr><td></td></tr></tbody>' +
				'<tbody><tr><th></th><td></td><td></td></tr></tbody>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isTrue(checks['consistent-columns'].evaluate(node));
	});

	it('should return false row widths are made the different with rowspan and colspan', function () {
		fixture.innerHTML = '<table>' +
				'<thead><tr><td rowspan="2" colspan="2"></td><td></td></tr></thead>' +
				'<tbody><tr><td></td><td></td></tr></tbody>' +
				'<tbody><tr><th></th><td></td><td></td></tr></tbody>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isFalse(checks['consistent-columns'].evaluate(node));
	});

});