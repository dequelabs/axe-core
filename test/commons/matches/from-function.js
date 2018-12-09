describe('matches.fromFunction', function () {
  var fromFunction = axe.commons.matches.fromFunction
  function noop () {}

  it('throws an error when the matcher is a number', function () {
    assert.throws(function () {
      fromFunction(noop, 123)
    })
  })

  it('throws an error when the matcher is a string', function () {
    assert.throws(function () {
      fromFunction(noop, 'foo')
    })
  })

  it('throws an error when the matcher is an array', function () {
    assert.throws(function () {
      fromFunction(noop, ['foo'])
    })
  })

  it('throws an error when the matcher is a RegExp', function () {
    assert.throws(function () {
      fromFunction(noop, /foo/)
    })
  })

  describe('with void matchers', function () {
    it('returns true for null', function () {
      assert.isTrue(fromFunction(noop, null))
    })
    it('returns true for undefined', function () {
      assert.isTrue(fromFunction(noop, undefined))
    })
  })

  describe('with object matches', function () {
    var keyMap = {}
    function getValue (key) {
      return keyMap[key]
    }

    it('passes every object key to the getValue function once', function () {
      var keys = ['foo', 'bar', 'baz']
      function getValue (key) {
        var index = keys.indexOf(key)
        assert.notEqual(index, -1)
        keys.splice(index, 1)
        return true
      }

      fromFunction(getValue, {
        foo: true,
        bar: true,
        baz: true,
      })
      assert.lengthOf(keys, 0);
    })

    it('returns true if every value is true', function () {
      keyMap = {
        foo: true,
        bar: true,
        baz: true,
      }
      assert.isTrue(fromFunction(getValue, keyMap))
    })

    it('returns false if any value is false', function () {
      keyMap = {
        foo: true,
        bar: false,
        baz: true,
      }
      assert.isTrue(fromFunction(getValue, keyMap))
    })

    it('returns true if there are no keys', function () {
      assert.isTrue(fromFunction(getValue, {}))
    })
  })
})
