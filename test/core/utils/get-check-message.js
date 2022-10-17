describe('axe.utils.getCheckMessage', function () {
  var getCheckMessage = axe.utils.getCheckMessage;

  beforeEach(function () {
    axe._audit = {
      data: {
        checks: {
          'my-check': {
            messages: {
              pass: 'Pass message',
              fail: 'Fail message',
              incomplete: 'Incomplete message'
            }
          }
        }
      }
    };
  });

  afterEach(function () {
    axe._audit = undefined;
  });

  it('should return the pass message', function () {
    assert.equal(getCheckMessage('my-check', 'pass'), 'Pass message');
  });

  it('should return the fail message', function () {
    assert.equal(getCheckMessage('my-check', 'fail'), 'Fail message');
  });

  it('should return the incomplete message', function () {
    assert.equal(
      getCheckMessage('my-check', 'incomplete'),
      'Incomplete message'
    );
  });

  it('should handle data', function () {
    axe._audit.data.checks['my-check'].messages.pass =
      'Pass message with ${data.message}';
    assert.equal(
      getCheckMessage('my-check', 'pass', { message: 'hello world!' }),
      'Pass message with hello world!'
    );
  });

  it('should error when check does not exist', function () {
    assert.throws(function () {
      getCheckMessage('invalid-check', 'pass');
    });
  });

  it('should error when check message does not exist', function () {
    assert.throws(function () {
      getCheckMessage('invalid-check', 'invalid');
    });
  });
});
