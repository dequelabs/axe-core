/* global defineCalls */
describe('UMD define', function () {
  'use strict';

  it('should have atleast one umd global', function () {
    assert.isAtLeast(defineCalls.length, 1);
  });

  it('calls define and passes it axe', function () {
    var call = defineCalls[defineCalls.length - 1];
    assert.isFunction(call[2]);
    assert.strictEqual(call[2](), axe);
  });

  it('defines module name as axe-core', function () {
    var call = defineCalls[defineCalls.length - 1];
    assert.equal(call[0], 'axe-core');
  });
});
