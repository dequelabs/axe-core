describe('axe.utils.processMessage', function () {
  'use strict';

  var original = axe._audit;

  beforeEach(function () {
    axe._audit = {
      data: {
        incompleteFallbackMessage: 'fallback message'
      }
    };
  });

  after(function () {
    axe._audit = original;
  });

  it('should replace a ${data}', function () {
    var message = 'Hello ${data}';
    var output = axe.utils.processMessage(message, 'World!');
    assert.equal(output, 'Hello World!');
  });

  it('should replace a ${ data } (with whitespace)', function () {
    var message = 'Hello ${ data }';
    var output = axe.utils.processMessage(message, 'World!');
    assert.equal(output, 'Hello World!');
  });

  it('should replace ${data.prop}', function () {
    var message = 'Hello ${data.world}';
    var output = axe.utils.processMessage(message, { world: 'World!' });
    assert.equal(output, 'Hello World!');
  });

  it('should replace ${data.prop}', function () {
    var message = 'Hello ${data.world}';
    var output = axe.utils.processMessage(message, { world: undefined });
    assert.equal(output, 'Hello ');
  });

  it('should replace ${ data.prop } (with whitespace)', function () {
    var message = 'Hello ${ data.world }';
    var output = axe.utils.processMessage(message, { world: 'World!' });
    assert.equal(output, 'Hello World!');
  });

  describe('data is array', function () {
    it('should replace ${data.values} with comma separated list of values', function () {
      var message = 'Output: ${data.values}';
      var output = axe.utils.processMessage(message, ['one', 'two']);
      assert.equal(output, 'Output: one, two');
    });

    it('should handle singular message', function () {
      var message = {
        singular: 'Singular message: ${data.values}',
        plural: 'Plural messages: ${ data.values }'
      };
      var output = axe.utils.processMessage(message, ['one']);
      assert.equal(output, 'Singular message: one');
    });

    it('should handle plural message', function () {
      var message = {
        singular: 'Singular message: ${data.values}',
        plural: 'Plural messages: ${ data.values }'
      };
      var output = axe.utils.processMessage(message, ['one', 'two']);
      assert.equal(output, 'Plural messages: one, two');
    });
  });

  describe('message is object', function () {
    it('should handle message based on messageKey', function () {
      var message = {
        prop1: 'prop1 message',
        prop2: 'prop2 message'
      };
      var output = axe.utils.processMessage(message, { messageKey: 'prop2' });
      assert.equal(output, 'prop2 message');
    });

    it('should replace ${data}', function () {
      var message = {
        prop1: 'prop1 message',
        prop2: '${data.world} message'
      };
      var output = axe.utils.processMessage(message, {
        messageKey: 'prop2',
        world: 'World!'
      });
      assert.equal(output, 'World! message');
    });

    it('should use default message', function () {
      var message = {
        default: 'default message',
        prop1: 'prop1 message',
        prop2: 'prop2 message'
      };
      var output = axe.utils.processMessage(message);
      assert.equal(output, 'default message');
    });

    it('should use fallback message if no default', function () {
      var message = {
        prop1: 'prop1 message',
        prop2: 'prop2 message'
      };
      var output = axe.utils.processMessage(message);
      assert.equal(output, 'fallback message');
    });
  });
});
