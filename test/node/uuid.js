var assert = require('chai').assert;
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var crypto = require('crypto'); // Node package

// 16 byte array, all 0's
var returnVal = new Array(16).fill(0);
var cryptoStub = sinon.stub(crypto, 'randomBytes').returns(returnVal);

describe('uuid.v4', function() {
	var axe = proxyquire('../../', { crypto: cryptoStub });
	var uuidV4 = axe.utils.uuid.v4;

	it('uses node crypto', function() {
		var uuid = uuidV4();
		assert.isTrue(cryptoStub.randomBytes.called);
		assert.deepEqual(uuid, '00000000-0000-4000-8000-000000000000');
	});
});
