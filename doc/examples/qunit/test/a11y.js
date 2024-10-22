/* global QUnit, document, axe */

QUnit.module('axe');

QUnit.test('should pass accessibility test for valid HTML', function (assert) {
  var n = document.getElementById('working');
  assert.expect(2);

  var done = assert.async();
  axe.run(n, function (err, result) {
    assert.equal(err, null);
    assert.equal(result.violations.length, 0);
    done();
  });
});

QUnit.test('should fail accessibility test for invalid HTML', function (assert) {
  var n = document.getElementById('broken');
  assert.expect(2);

  var done = assert.async();
  axe.run(n, function (err, result) {
    assert.equal(err, null);
    assert.equal(result.violations.length, 1);
    done();
  });
});
