describe('frameMessenger', function() {
  var stub = sinon.stub(axe.utils.respondable, 'updateMessenger');

  after(function() {
    stub.restore();
  });

  it('should call into axe.utils.respondable.updateMessenger', function() {
    axe.frameMessenger();
    assert.isTrue(stub.called);
  });
});
