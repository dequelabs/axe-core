describe('axe.utils.processMessage', function () {
  'use strict';

  let original = axe._audit;

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
    let message = 'Hello ${data}';
    let output = axe.utils.processMessage(message, 'World!');
    assert.equal(output, 'Hello World!');
  });

  it('should replace a ${ data } (with whitespace)', function () {
    let message = 'Hello ${ data }';
    let output = axe.utils.processMessage(message, 'World!');
    assert.equal(output, 'Hello World!');
  });

  it('should replace ${data.prop}', function () {
    let message = 'Hello ${data.world}';
    let output = axe.utils.processMessage(message, { world: 'World!' });
    assert.equal(output, 'Hello World!');
  });

  it('should replace ${data.prop}', function () {
    let message = 'Hello ${data.world}';
    let output = axe.utils.processMessage(message, { world: undefined });
    assert.equal(output, 'Hello ');
  });

  it('should replace ${ data.prop } (with whitespace)', function () {
    let message = 'Hello ${ data.world }';
    let output = axe.utils.processMessage(message, { world: 'World!' });
    assert.equal(output, 'Hello World!');
  });

  describe('data is array', function () {
    it('should replace ${data.values} with comma separated list of values', function () {
      let message = 'Output: ${data.values}';
      let output = axe.utils.processMessage(message, ['one', 'two']);
      assert.equal(output, 'Output: one, two');
    });

    it('should handle singular message', function () {
      let message = {
        singular: 'Singular message: ${data.values}',
        plural: 'Plural messages: ${ data.values }'
      };
      let output = axe.utils.processMessage(message, ['one']);
      assert.equal(output, 'Singular message: one');
    });

    it('should handle plural message', function () {
      let message = {
        singular: 'Singular message: ${data.values}',
        plural: 'Plural messages: ${ data.values }'
      };
      let output = axe.utils.processMessage(message, ['one', 'two']);
      assert.equal(output, 'Plural messages: one, two');
    });
  });

  describe('message is object', function () {
    it('should handle message based on messageKey', function () {
      let message = {
        prop1: 'prop1 message',
        prop2: 'prop2 message'
      };
      let output = axe.utils.processMessage(message, { messageKey: 'prop2' });
      assert.equal(output, 'prop2 message');
    });

    it('should replace ${data}', function () {
      let message = {
        prop1: 'prop1 message',
        prop2: '${data.world} message'
      };
      let output = axe.utils.processMessage(message, {
        messageKey: 'prop2',
        world: 'World!'
      });
      assert.equal(output, 'World! message');
    });

    it('should use default message', function () {
      let message = {
        default: 'default message',
        prop1: 'prop1 message',
        prop2: 'prop2 message'
      };
      let output = axe.utils.processMessage(message);
      assert.equal(output, 'default message');
    });

    it('should use fallback message if no default', function () {
      let message = {
        prop1: 'prop1 message',
        prop2: 'prop2 message'
      };
      let output = axe.utils.processMessage(message);
      assert.equal(output, 'fallback message');
    });
  });
});
