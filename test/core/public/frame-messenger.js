describe('frameMessenger', function () {
  let stub;

  after(function () {
    stub.restore();
  });

  it('should call into axe.utils.respondable.updateMessenger', function () {
    stub = sinon.stub(axe.utils.respondable, 'updateMessenger');
    axe.frameMessenger();
    assert.isTrue(stub.called);
  });
});
