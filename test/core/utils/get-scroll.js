describe('axe.utils.getScroll', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var queryFixture = axe.testUtils.queryFixture;
  var shadowSupported = axe.testUtils.shadowSupport.v1;

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('is a function', function () {
    assert.isFunction(axe.utils.getScroll);
  });

  it('returns undefined when element is not scrollable', function () {
    var target = queryFixture(
      '<section id="target">This element is not scrollable</section>'
    );
    var actual = axe.utils.getScroll(target.actualNode);
    assert.isUndefined(actual);
  });

  it('returns undefined when element does not overflow', function () {
    var target = queryFixture(
      '<div id="target" style="height: 200px; width: 200px;">' +
        '<div style="height: 10px; width: 10px; background-color: pink;">' +
        '<p> Content </p>' +
        '</div>' +
        '</div>'
    );
    var actual = axe.utils.getScroll(target.actualNode);
    assert.isUndefined(actual);
  });

  it('returns undefined when element overflow is hidden', function () {
    var target = queryFixture(
      '<div id="target" style="height: 200px; width: 200px; overflow: hidden">' +
        '<div style="height: 2000px; width: 100px; background-color: pink;">' +
        '<p> Content </p>' +
        '</div>' +
        '</div>'
    );
    var actual = axe.utils.getScroll(target.actualNode);
    assert.isUndefined(actual);
  });

  it('returns undefined when element overflow is clip', function () {
    var target = queryFixture(
      '<div id="target" style="height: 200px; width: 200px; overflow: clip">' +
        '<div style="height: 2000px; width: 100px; background-color: pink;">' +
        '<p> Content </p>' +
        '</div>' +
        '</div>'
    );
    var actual = axe.utils.getScroll(target.actualNode);
    assert.isUndefined(actual);
  });

  it('returns scroll offset when element overflow is auto', function () {
    var target = queryFixture(
      '<div id="target" style="height: 200px; width: 200px; overflow: auto">' +
        '<div style="height: 10px; width: 2000px; background-color: red;">' +
        '<p> Content </p>' +
        '</div>' +
        '</div>'
    );
    var actual = axe.utils.getScroll(target.actualNode);
    assert.isDefined(actual);
    assert.hasAllKeys(actual, ['elm', 'top', 'left']);
    assert.equal(actual.top, 0);
    assert.equal(actual.left, 0);
  });

  it('returns undefined when element overflow is visible', function () {
    var target = queryFixture(
      '<p id="target" style="width: 12em; height: 2em; border: dotted; overflow: visible;">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>'
    );
    var actual = axe.utils.getScroll(target.actualNode);
    assert.isUndefined(actual);
  });

  it('returns scroll offset when element overflow is scroll', function () {
    var target = queryFixture(
      '<p id="target" style="width: 12em; height: 2em; border: dotted; overflow: scroll;">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>'
    );
    var actual = axe.utils.getScroll(target.actualNode);
    assert.isDefined(actual);
    assert.hasAllKeys(actual, ['elm', 'top', 'left']);
    assert.equal(actual.top, 0);
    assert.equal(actual.left, 0);
  });

  describe('shadowDOM - axe.utils.getScroll', function () {
    before(function () {
      if (!shadowSupported) {
        this.skip();
      }
    });

    it('returns undefined when shadowDOM element does not overflow', function () {
      fixture.innerHTML = '<div></div>';

      var root = fixture.firstChild.attachShadow({ mode: 'open' });
      var slotted = document.createElement('div');
      slotted.innerHTML =
        '<p id="target" style="width: 12em; height: 2em; border: dotted;">Sed.</p>';
      root.appendChild(slotted);
      var tree = axe.utils.getFlattenedTree(fixture.firstChild);
      var target = axe.utils.querySelectorAll(tree, 'p')[0];
      var actual = axe.utils.getScroll(target.actualNode);
      assert.isUndefined(actual);
    });

    it('returns scroll offset when shadowDOM element has overflow', function () {
      fixture.innerHTML = '<div></div>';

      var root = fixture.firstChild.attachShadow({ mode: 'open' });
      var slotted = document.createElement('div');
      slotted.innerHTML =
        '<p id="target" style="width: 12em; height: 2em; border: dotted; overflow: auto;">This is a repeated long sentence, This is a repeated long sentence, This is a repeated long sentence, This is a repeated long sentence, This is a repeated long sentence.</p>';
      root.appendChild(slotted);
      var tree = axe.utils.getFlattenedTree(fixture.firstChild);
      var target = axe.utils.querySelectorAll(tree, 'p')[0];
      var actual = axe.utils.getScroll(target.actualNode);
      assert.isDefined(actual);
      assert.hasAllKeys(actual, ['elm', 'top', 'left']);
      assert.equal(actual.top, 0);
      assert.equal(actual.left, 0);
    });
  });
});
