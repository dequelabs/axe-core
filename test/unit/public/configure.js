describe('dqre.configure', function() {
	'use strict';

	beforeEach(function() {
		dqre._audit = null;
	});

	it('should throw if audit is not configured', function() {
		assert.throws(function () {
			dqre.configure({});
    }, Error, /^No audit configured/);
	});

	it('should override an audit\'s reporter - string', function() {
		dqre._load({ reporter: function (results, callback) { callback(results); } });
		dqre.configure({ reporter: 'v1' });
		assert.equal(dqre._audit.reporter, 'v1');
	});

	it('should not allow setting to an un-registered reporter', function () {
		dqre._load({ reporter: 'v1' });
		dqre.configure({ reporter: 'no-exist-evar-plz' });
		assert.equal(dqre._audit.reporter, 'v1');
	});

});
