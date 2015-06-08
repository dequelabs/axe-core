describe('axe.configure', function() {
	'use strict';

	beforeEach(function() {
		axe._audit = null;
	});

	it('should throw if audit is not configured', function() {
		assert.throws(function () {
			axe.configure({});
    }, Error, /^No audit configured/);
	});

	it('should override an audit\'s reporter - string', function() {
		axe._load({ reporter: function (results, callback) { callback(results); } });
		axe.configure({ reporter: 'v1' });
		assert.equal(axe._audit.reporter, 'v1');
	});

	it('should not allow setting to an un-registered reporter', function () {
		axe._load({ reporter: 'v1' });
		axe.configure({ reporter: 'no-exist-evar-plz' });
		assert.equal(axe._audit.reporter, 'v1');
	});

});
