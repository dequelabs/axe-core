/*global Promise */
describe('UMD window', function () {
  'use strict';

  it('should expose axe as a property of window', function () {
    assert.property(window, 'axe');
  });

  it('should expose Promise as a property of window', function () {
    assert.property(window, 'Promise');
  });

  it('should resolve Promise(s)', function (done) {
    var p1 = new Promise(function (resolve) {
      setTimeout(function () {
        resolve('Hello');
      });
    });
    var p2 = new Promise(function (resolve) {
      setTimeout(function () {
        resolve('World!');
      });
    });
    Promise.all([p1, p2])
      .then(function (values) {
        assert.lengthOf(values, 2);
        assert.equal(values.join(' '), 'Hello World!');
        done();
      })
      .catch(function () {
        done(new Error('Expected to resolve.'));
      });
  });
  it('should reject Promise', function (done) {
    new Promise(function (resolve, reject) {
      setTimeout(function () {
        reject(new Error('Boom!'));
      });
    })
      .then(function () {
        done(new Error('Expected to reject.'));
      })
      .catch(function (err) {
        assert.isDefined(err);
        done();
      });
  });

  it('should ensure axe has prototype chained keys', function () {
    assert.hasAnyKeys(axe, ['utils', 'commons', 'core']);
  });
});
