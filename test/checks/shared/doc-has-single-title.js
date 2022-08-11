describe('doc-has-single-title', function () {
  'use strict';

  var fixture = document.getElementById('fixture');

  afterEach(function () {
    fixture.innerHTML = '';
    // test runner has its own title, so we must remove it first to evaluate
    Array.from(document.getElementsByTagName('title')).forEach(function (elem) {
      document.head.removeChild(elem);
    });
  });

  it('should return false if there is not only 1 title', function () {
    var orig = document.title;

    var title1 = document.createElement('title');
    title1.text = 'Bananas';
    document.head.appendChild(title1);

    var title2 = document.createElement('title');
    title2.text = 'Apples';
    document.title = title2.text;
    document.head.appendChild(title2);

    assert.isFalse(
      axe.testUtils.getCheckEvaluate('doc-has-single-title')(fixture)
    );
    document.title = orig;
    document.head.removeChild(title1);
    document.head.removeChild(title2);
  });

  it('should return true if there is only 1 title', function () {
    var orig = document.title;
    var title1 = document.createElement('title');
    title1.text = 'Bananas';
    document.head.appendChild(title1);

    assert.isTrue(
      axe.testUtils.getCheckEvaluate('doc-has-single-title')(fixture)
    );
    document.title = orig;
    document.head.removeChild(title1);
  });
});
