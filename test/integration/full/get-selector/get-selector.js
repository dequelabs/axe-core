describe('axe.utils.getSelector', function () {
  'use strict';
  before(function () {
    axe.setup();
  });
  it('should work on namespaced elements', function () {
    let fixture = document.querySelector('#fixture');
    let node = fixture.firstElementChild;
    let sel = axe.utils.getSelector(node);
    let result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node);
  });
});
