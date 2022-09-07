describe('color.getBackgroundColor', function () {
  'use strict';

  var fixture = document.getElementById('fixture');

  var shadowSupported = axe.testUtils.shadowSupport.v1;
  var origBodyBg;
  var origHtmlBg;

  before(function () {
    origBodyBg = document.body.style.background;
    origHtmlBg = document.documentElement.style.background;
  });

  afterEach(function () {
    document.body.style.background = origBodyBg;
    document.documentElement.style.background = origHtmlBg;

    axe.commons.color.incompleteData.clear();
    axe._tree = undefined;
  });

  it('should return the blended color if it has no background set', function () {
    fixture.innerHTML =
      '<div id="parent" style="height: 40px; width: 30px; background-color: #800000;">' +
      '<div id="target" style="height: 20px; width: 15px;">' +
      '</div></div>';
    var target = fixture.querySelector('#target');
    var parent = fixture.querySelector('#parent');
    var bgNodes = [];
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(target, bgNodes);
    var expected = new axe.commons.color.Color(128, 0, 0, 1);
    assert.closeTo(actual.red, expected.red, 0.5);
    assert.closeTo(actual.green, expected.green, 0.5);
    assert.closeTo(actual.blue, expected.blue, 0.5);
    assert.closeTo(actual.alpha, expected.alpha, 0.1);
    assert.deepEqual(bgNodes, [parent]);
  });

  it('should return the blended color if it is transparent and positioned', function () {
    fixture.innerHTML =
      '<div style="position: absolute; top: 0px; left: 0px; height: 100px; ' +
      'width: 90px; background-color: #000080;">' +
      '<div id="pos" style="position: absolute; top: 50px; left: 40px; height: 40px; ' +
      'width: 30px; background-color: #800000;"></div>' +
      '<div id="parent" style="position: absolute; top: 0px; left: 0px; height: 40px; ' +
      'width: 30px; background-color: #ffffff">' +
      '<div id="target" style="position: absolute; top: 60px; left: 45px; height: 20px; ' +
      'width: 15px; background-color: rgba(0, 128, 0, 0.5);">' +
      '</div></div></div>';
    var target = fixture.querySelector('#target');
    var pos = fixture.querySelector('#pos');
    var bgNodes = [];
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(target, bgNodes);
    var expected = new axe.commons.color.Color(64, 64, 0, 1);

    assert.closeTo(actual.red, expected.red, 0.5);
    assert.closeTo(actual.green, expected.green, 0.5);
    assert.closeTo(actual.blue, expected.blue, 0.5);
    assert.closeTo(actual.alpha, expected.alpha, 0.1);
    assert.deepEqual(bgNodes, [target, pos]);
  });

  it('should do alpha blending from the back forward', function () {
    fixture.innerHTML =
      '<div id="under" style="height: 20px; width: 15px; background-color: #800000;">' +
      '<div id="transparent" style="height: 20px; width: 15px; background-color: rgba(0, 0, 0, 0);">' +
      '<div id="target" style="height: 20px; width: 15px; background-color: rgba(0, 128, 0, 0.5);">' +
      '</div></div></div>';
    var target = fixture.querySelector('#target');
    var under = fixture.querySelector('#under');
    var bgNodes = [];
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(target, bgNodes);
    var expected = new axe.commons.color.Color(64, 64, 0, 1);
    assert.closeTo(actual.red, expected.red, 0.5);
    assert.closeTo(actual.green, expected.green, 0.5);
    assert.closeTo(actual.blue, expected.blue, 0.5);
    assert.closeTo(actual.alpha, expected.alpha, 0.1);
    assert.deepEqual(bgNodes, [target, under]);
  });

  it('should only look at what is underneath original element when blended and positioned', function () {
    fixture.innerHTML =
      '<div style="position: absolute; top: 0px; left: 0px; height: 100px; ' +
      'width: 90px; background-color: #000080;">' +
      '<div id="under" style="position: absolute; top: 50px; left: 40px; height: 40px; ' +
      'width: 30px; background-color: #800000;"></div>' +
      '<div id="pos" style="position: absolute; top: 0px; left: 0px; height: 90px; ' +
      'width: 70px; background-color: rgba(0, 0, 0, 0);"></div>' +
      '<div id="parent" style="position: absolute; top: 0px; left: 0px; height: 40px; ' +
      'width: 30px; background-color: #ffffff">' +
      '<div id="target" style="position: absolute; top: 60px; left: 45px; height: 20px; ' +
      'width: 15px; background-color: rgba(0, 128, 0, 0.5);">' +
      '</div></div></div>';
    var target = fixture.querySelector('#target');
    var under = fixture.querySelector('#under');
    var bgNodes = [];
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(target, bgNodes);
    var expected = new axe.commons.color.Color(64, 64, 0, 1);

    assert.closeTo(actual.red, expected.red, 0.5);
    assert.closeTo(actual.green, expected.green, 0.5);
    assert.closeTo(actual.blue, expected.blue, 0.5);
    assert.closeTo(actual.alpha, expected.alpha, 0.1);
    assert.deepEqual(bgNodes, [target, under]);
  });

  it('should return the proper blended color if it has alpha set', function () {
    fixture.innerHTML =
      '<div id="parent" style="height: 40px; width: 30px; background-color: #800000;">' +
      '<div id="target" style="height: 20px; width: 15px; background-color: rgba(0, 128, 0, 0.5);">' +
      '</div></div>';
    var target = fixture.querySelector('#target');
    var parent = fixture.querySelector('#parent');
    var bgNodes = [];
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(target, bgNodes);
    var expected = new axe.commons.color.Color(64, 64, 0, 1);
    assert.closeTo(actual.red, expected.red, 0.5);
    assert.closeTo(actual.green, expected.green, 0.5);
    assert.closeTo(actual.blue, expected.blue, 0.5);
    assert.closeTo(actual.alpha, expected.alpha, 0.1);
    assert.deepEqual(bgNodes, [target, parent]);
  });

  it('should return the blended color if it has opacity set', function () {
    fixture.innerHTML =
      '<div id="parent" style="height: 40px; width: 30px; background-color: #800000;">' +
      '<div id="target" style="height: 20px; width: 15px; opacity: 0.5; background-color: green;">' +
      '</div></div>';
    var target = fixture.querySelector('#target');
    var parent = fixture.querySelector('#parent');
    var bgNodes = [];
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(target, bgNodes);
    var expected = new axe.commons.color.Color(64, 64, 0, 1);
    assert.equal(actual.red, expected.red);
    assert.equal(actual.green, expected.green);
    assert.equal(actual.blue, expected.blue);
    assert.equal(actual.alpha, expected.alpha);
    assert.deepEqual(bgNodes, [target, parent]);
  });

  it('should return null if containing parent has a background image and is non-opaque', function () {
    fixture.innerHTML =
      '<div id="parent" style="height: 40px; width: 30px;' +
      'background-color: #800000; background-image: url(image.png);">' +
      '<div id="target" style="height: 20px; width: 15px; background-color: green; opacity: 0.5;">' +
      '</div></div>';
    var target = fixture.querySelector('#target');
    var parent = fixture.querySelector('#parent');
    var bgNodes = [];
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(target, bgNodes);
    assert.isNull(actual);
    assert.deepEqual(bgNodes, [target, parent]);
    assert.equal(axe.commons.color.incompleteData.get('bgColor'), 'bgImage');
  });

  it('should return white if transparency goes all the way up to document', function () {
    fixture.innerHTML = '<div id="target" style="height: 10px; width: 30px;">';
    var target = fixture.querySelector('#target');
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(target);
    var expected = new axe.commons.color.Color(255, 255, 255, 1);
    assert.equal(actual.red, expected.red);
    assert.equal(actual.green, expected.green);
    assert.equal(actual.blue, expected.blue);
    assert.equal(actual.alpha, expected.alpha);
  });

  it('should return null if there is a background image', function () {
    fixture.innerHTML =
      '<div style="height: 40px; width: 30px; background-color: #800000;">' +
      '<div id="target" style="height: 20px; width: 15px; background-color: green; background-image: url(image.png);">' +
      '</div></div>';
    var target = fixture.querySelector('#target');
    var bgNodes = [];
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(target, bgNodes);
    assert.isNull(actual);
    assert.deepEqual(bgNodes, [target]);
    assert.equal(axe.commons.color.incompleteData.get('bgColor'), 'bgImage');
  });

  it('should return null if something non-opaque is obscuring it', function () {
    fixture.innerHTML =
      '<div style="width:100%; height: 100px; background: #000"></div>' +
      '<div id="target" style="position: relative; top: -50px; z-index:-1;color:#fff;">Hello</div>';
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(
      document.getElementById('target'),
      []
    );
    assert.equal(axe.commons.color.incompleteData.get('bgColor'), 'bgOverlap');
    assert.isNull(actual);
  });

  it('should return null if something non-opaque is obscuring it, scrolled out of view', function () {
    fixture.innerHTML =
      '<div style="height: 1em; overflow: auto; position: relative;">' +
      '  <div style="background: rgba(0, 255, 255, 0.7); ' +
      '    margin-bottom: -1em; height: 1em; position:relative;"></div>' +
      '  <div id="target">foo</div>' +
      '</div>';
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(
      document.getElementById('target')
    );
    assert.equal(axe.commons.color.incompleteData.get('bgColor'), 'bgOverlap');
    assert.isNull(actual);
  });

  it('should return an actual if something opaque is obscuring it', function () {
    fixture.innerHTML =
      '<div style="width:100%; height: 100px; background: rgba(0, 0, 0, 0.5)"></div>' +
      '<div id="target" style="position: relative; top: -50px; z-index:-1;color:#fff;">Hello</div>';
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(
      document.getElementById('target'),
      []
    );
    assert.equal(axe.commons.color.incompleteData.get('bgColor'), 'bgOverlap');
    assert.isNull(actual);
  });

  it('should return the bgcolor if it is solid', function () {
    fixture.innerHTML =
      '<div style="height: 40px; width: 30px; background-color: red;">' +
      '<div id="target" style="height: 20px; width: 15px; background-color: green;">' +
      '</div></div>';
    var target = fixture.querySelector('#target');
    var bgNodes = [];
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(target, bgNodes);
    var expected = new axe.commons.color.Color(0, 128, 0, 1);
    assert.equal(actual.red, expected.red);
    assert.equal(actual.green, expected.green);
    assert.equal(actual.blue, expected.blue);
    assert.equal(actual.alpha, expected.alpha);
    assert.deepEqual(bgNodes, [target]);
  });

  it('should return a bgcolor for a multiline inline element fully covering the background', function () {
    fixture.innerHTML =
      '<div style="position:relative;">' +
      '<div style="background-color:rgba(0,0,0,1);position:absolute;width:300px;height:200px;"></div>' +
      '<p style="position: relative;z-index:1;">Text oh heyyyy <a href="#" id="target">and here\'s <br>a link</a></p>' +
      '</div>';
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(
      document.getElementById('target'),
      []
    );
    assert.isNotNull(actual);
    assert.equal(Math.round(actual.blue), 0);
    assert.equal(Math.round(actual.red), 0);
    assert.equal(Math.round(actual.green), 0);
  });

  it('should return null if a multiline inline element does not fully cover background', function () {
    fixture.innerHTML =
      '<div style="position:relative;">' +
      '<div style="background-color:rgba(0,0,0,1);position:absolute;width:300px;height:20px;"></div>' +
      '<p style="position: relative;z-index:1;">Text oh heyyyy <a href="#" id="target">and here\'s <br>a link</a></p>' +
      '</div>';
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(
      document.getElementById('target'),
      []
    );
    assert.isNull(actual);
    assert.equal(
      axe.commons.color.incompleteData.get('bgColor'),
      'elmPartiallyObscuring'
    );
  });

  it('should return an actual if an absolutely positioned element does not cover background', function () {
    fixture.innerHTML =
      '<div style="background-color:black; height:20px; position:relative;">' +
      '<div style="color:#333; position:absolute; top:21px;" id="target">Text</div>' +
      '</div>';
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(
      document.getElementById('target'),
      []
    );
    assert.equal(Math.round(actual.blue), 255);
    assert.equal(Math.round(actual.red), 255);
    assert.equal(Math.round(actual.green), 255);
  });

  it('should return null if an absolutely positioned element partially obsures background', function () {
    fixture.innerHTML =
      '<div style="height:40px; position:relative;">' +
      '<div style="background-color:black; height:20px;"></div>' +
      '<div style="color:#333; position:absolute; margin-top:-11px;" id="target">Text</div>' +
      '</div>';
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(
      document.getElementById('target'),
      []
    );
    assert.isNull(actual);
    assert.equal(
      axe.commons.color.incompleteData.get('bgColor'),
      'elmPartiallyObscured'
    );
  });

  it('should count a TR as a background element for TD', function () {
    fixture.innerHTML =
      '<div style="background-color:#007acc;">' +
      '<table style="width:100%">' +
      '<tr style="background-color:#f3f3f3; height:40px;" id="parent">' +
      '<td style="color:#007acc" id="target">' +
      'Cell content</td>' +
      '</tr>' +
      '</table></div>';
    var target = fixture.querySelector('#target'),
      parent = fixture.querySelector('#parent');
    var bgNodes = [];
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(target, bgNodes);
    var expected = new axe.commons.color.Color(243, 243, 243, 1);
    assert.equal(actual.red, expected.red);
    assert.equal(actual.green, expected.green);
    assert.equal(actual.blue, expected.blue);
    assert.equal(actual.alpha, expected.alpha);
    assert.deepEqual(bgNodes, [parent]);
  });

  it('should count a TR as a background element for TH', function () {
    fixture.innerHTML =
      '<div style="background-color:#007acc;">' +
      '<table style="width:100%">' +
      '<tr style="background-color:#f3f3f3; height:40px;" id="parent">' +
      '<th style="color:#007acc" id="target">' +
      'Header content</th>' +
      '</tr>' +
      '</table></div>';
    var target = fixture.querySelector('#target'),
      parent = fixture.querySelector('#parent');
    var bgNodes = [];
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(target, bgNodes);
    var expected = new axe.commons.color.Color(243, 243, 243, 1);
    assert.equal(actual.red, expected.red);
    assert.equal(actual.green, expected.green);
    assert.equal(actual.blue, expected.blue);
    assert.equal(actual.alpha, expected.alpha);
    assert.deepEqual(bgNodes, [parent]);
  });

  it('should count a TR as a background element for a child element', function () {
    fixture.innerHTML =
      '<div style="background-color:#007acc;">' +
      '<table style="width:100%">' +
      '<tr style="background-color:#f3f3f3; height:40px;" id="parent">' +
      '<td>' +
      '<span style="color:#007acc" id="target">Cell content</span>' +
      '</td></tr>' +
      '</table></div>';
    var target = fixture.querySelector('#target'),
      parent = fixture.querySelector('#parent');
    var bgNodes = [];
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(target, bgNodes);
    var expected = new axe.commons.color.Color(243, 243, 243, 1);
    assert.equal(actual.red, expected.red);
    assert.equal(actual.green, expected.green);
    assert.equal(actual.blue, expected.blue);
    assert.equal(actual.alpha, expected.alpha);
    assert.deepEqual(bgNodes, [parent]);
  });

  it('should count a THEAD as a background element for a child element', function () {
    fixture.innerHTML =
      '<div style="background-color:#007acc;">' +
      '<table style="width:100%">' +
      '<thead style="background-color:#f3f3f3; height:40px;" id="parent">' +
      '<td>' +
      '<span style="color:#007acc" id="target">Cell content</span>' +
      '</td></thead>' +
      '</table></div>';
    var target = fixture.querySelector('#target'),
      parent = fixture.querySelector('#parent');
    var bgNodes = [];
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(target, bgNodes);
    var expected = new axe.commons.color.Color(243, 243, 243, 1);
    assert.equal(actual.red, expected.red);
    assert.equal(actual.green, expected.green);
    assert.equal(actual.blue, expected.blue);
    assert.equal(actual.alpha, expected.alpha);
    assert.deepEqual(bgNodes, [parent]);
  });

  it('should count a TBODY as a background element for a child element', function () {
    fixture.innerHTML =
      '<div style="background-color:#007acc;">' +
      '<table style="width:100%">' +
      '<tbody style="background-color:#f3f3f3; height:40px;" id="parent">' +
      '<td>' +
      '<span style="color:#007acc" id="target">Cell content</span>' +
      '</td></tbody>' +
      '</table></div>';
    var target = fixture.querySelector('#target'),
      parent = fixture.querySelector('#parent');
    var bgNodes = [];
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(target, bgNodes);
    var expected = new axe.commons.color.Color(243, 243, 243, 1);
    assert.equal(actual.red, expected.red);
    assert.equal(actual.green, expected.green);
    assert.equal(actual.blue, expected.blue);
    assert.equal(actual.alpha, expected.alpha);
    assert.deepEqual(bgNodes, [parent]);
  });

  it('should count a TFOOT as a background element for a child element', function () {
    fixture.innerHTML =
      '<div style="background-color:#007acc;">' +
      '<table style="width:100%">' +
      '<tfoot style="background-color:#f3f3f3; height:40px;" id="parent">' +
      '<td>' +
      '<span style="color:#007acc" id="target">Cell content</span>' +
      '</td></tfoot>' +
      '</table></div>';
    var target = fixture.querySelector('#target'),
      parent = fixture.querySelector('#parent');
    var bgNodes = [];
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(target, bgNodes);
    var expected = new axe.commons.color.Color(243, 243, 243, 1);
    assert.equal(actual.red, expected.red);
    assert.equal(actual.green, expected.green);
    assert.equal(actual.blue, expected.blue);
    assert.equal(actual.alpha, expected.alpha);
    assert.deepEqual(bgNodes, [parent]);
  });

  it("should ignore TR elements that don't overlap", function () {
    fixture.innerHTML =
      '<table style="position:relative; width:100%;">' +
      '<tr style="background-color:black; height:10px; width:100%;" id="parent">' +
      '<td style="position:absolute; top: 14px;" id="target">Content</td>' +
      '</tr></table>';
    var bgNodes = [];
    var target = fixture.querySelector('#target');
    var parent = fixture.querySelector('#parent');
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(target, bgNodes);
    var expected = new axe.commons.color.Color(255, 255, 255, 1);
    assert.equal(actual.red, expected.red);
    assert.equal(actual.green, expected.green);
    assert.equal(actual.blue, expected.blue);
    assert.equal(actual.alpha, expected.alpha);
    assert.notEqual(bgNodes, [parent]);
  });

  it('should count an implicit label as a background element', function () {
    fixture.innerHTML =
      '<label id="target" style="background-color: #000;">My label' +
      '<input type="text">' +
      '</label>';
    var target = fixture.querySelector('#target');
    var bgNodes = [];
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(target, bgNodes);
    var expected = new axe.commons.color.Color(0, 0, 0, 1);
    assert.equal(actual.red, expected.red);
    assert.equal(actual.green, expected.green);
    assert.equal(actual.blue, expected.blue);
    assert.equal(actual.alpha, expected.alpha);
  });

  it('handles nested inline elements in the middle of a text', function () {
    fixture.innerHTML =
      '<div style="height: 1em; overflow:auto; background: cyan">' +
      '  <br>' +
      '  <b id="target">Text <i style="display: inline-block">' +
      '    <s><img width="100" height="16"></s>' +
      '  </i></b>' +
      '</div>';

    var target = fixture.querySelector('#target');
    var bgNodes = [];
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(target, bgNodes);
    assert.equal(actual.red, 0);
    assert.equal(actual.green, 255);
    assert.equal(actual.blue, 255);
    assert.equal(actual.alpha, 1);
  });

  it('should return null for inline elements with position:absolute', function () {
    fixture.innerHTML =
      '<div style="height: 1em; overflow:auto; position: relative">' +
      '  <br>' +
      '  <b id="target">' +
      '    <img style="width:100px; height:16px; position:absolute"> Text' +
      '  </b>' +
      '</div>';
    axe.testUtils.flatTreeSetup(fixture);
    var target = fixture.querySelector('#target');
    var actual = axe.commons.color.getBackgroundColor(target);
    assert.equal(axe.commons.color.incompleteData.get('bgColor'), 'bgOverlap');
    assert.isNull(actual);
  });

  it('should ignore inline ancestors of non-overlapping elements', function () {
    fixture.innerHTML =
      '<div style="position:relative;">' +
      '<label style="background-color:black;" id="parent">Label' +
      '<input style="position:absolute; top:20px;" id="target">' +
      '</label></div>';
    var target = fixture.querySelector('#target');
    var parent = fixture.querySelector('#parent');
    var bgNodes = [];
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(target, bgNodes);
    var expected = new axe.commons.color.Color(255, 255, 255, 1);
    assert.equal(actual.red, expected.red);
    assert.equal(actual.green, expected.green);
    assert.equal(actual.blue, expected.blue);
    assert.equal(actual.alpha, expected.alpha);
    assert.notEqual(bgNodes, [parent]);
  });

  it('should handle multiple ancestors of the same name', function () {
    fixture.innerHTML =
      '<div style="background-color: #007acc;">' +
      '<table style="width: 100%;">' +
      '<tr style="background-color: #fff;"><td>' +
      '<table style="width:100%">' +
      '<tr style="background-color: #f3f3f3; height:40px;" id="parent">' +
      '<td style="display: table-cell; color:#007acc" id="target">' +
      'Cell content</td>' +
      '</tr>' +
      '</table>' +
      '</td></tr>' +
      '</table></div>';
    var target = fixture.querySelector('#target'),
      parent = fixture.querySelector('#parent');
    var bgNodes = [];
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(target, bgNodes);
    var expected = new axe.commons.color.Color(243, 243, 243, 1);
    assert.equal(actual.red, expected.red);
    assert.equal(actual.green, expected.green);
    assert.equal(actual.blue, expected.blue);
    assert.equal(actual.alpha, expected.alpha);
    assert.deepEqual(bgNodes, [parent]);
  });

  it('should use hierarchical DOM traversal if possible', function () {
    fixture.innerHTML =
      '<div id="parent" style="height: 40px; width: 30px; ' +
      ' background-color: white;">' +
      '	<div id="target" style="height: 20px; width: 25px; z-index: 25; position:relative;">' +
      '	</div>' +
      '</div>' +
      '<div id="shifted" style="position: relative; top: -10px; height: 40px; width: 35px; ' +
      ' background-color: black; z-index: 15;"></div>';
    var target = fixture.querySelector('#target');
    var parent = fixture.querySelector('#parent');
    var bgNodes = [];
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(target, bgNodes);

    var expected = new axe.commons.color.Color(255, 255, 255, 1);
    assert.closeTo(actual.red, expected.red, 0.5);
    assert.closeTo(actual.green, expected.green, 0.5);
    assert.closeTo(actual.blue, expected.blue, 0.5);
    assert.closeTo(actual.alpha, expected.alpha, 0.1);
    assert.deepEqual(bgNodes, [parent]);
  });

  it('should ignore 0-height elements', function () {
    fixture.innerHTML =
      '<div id="parent" style="height: 40px; width: 30px; ' +
      'background-color: white; position: relative; z-index: 5">' +
      '	<div float="left" style="height: 0px; background-color: black">' +
      '		<div id="target" style="height: 20px; width: 25px; z-index: 25;">' +
      '</div></div></div>';
    var target = fixture.querySelector('#target');
    var parent = fixture.querySelector('#parent');
    var bgNodes = [];
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(target, bgNodes);

    var expected = new axe.commons.color.Color(255, 255, 255, 1);
    assert.closeTo(actual.red, expected.red, 0.5);
    assert.closeTo(actual.green, expected.green, 0.5);
    assert.closeTo(actual.blue, expected.blue, 0.5);
    assert.closeTo(actual.alpha, expected.alpha, 0.1);
    assert.deepEqual(bgNodes, [parent]);
  });

  it('should use visual traversal when needed', function () {
    fixture.innerHTML =
      '<div id="parent" style="height: 40px; width: 30px; ' +
      ' background-color: white; position: relative; z-index: 5">' +
      '	<div id="target" style="position: relative; top: 1px; height: 20px; width: 25px; z-index: 25;">' +
      '	</div>' +
      '<div id="shifted" style="position: relative; top: -30px; height: 40px; width: 35px; ' +
      ' background-color: black; z-index: 15;"></div></div>';

    var target = fixture.querySelector('#target');
    var shifted = fixture.querySelector('#shifted');
    var bgNodes = [];
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(target, bgNodes, false);
    var expected = new axe.commons.color.Color(0, 0, 0, 1);

    assert.deepEqual(bgNodes, [shifted]);

    assert.closeTo(actual.red, expected.red, 0.5);
    assert.closeTo(actual.green, expected.green, 0.5);
    assert.closeTo(actual.blue, expected.blue, 0.5);
    assert.closeTo(actual.alpha, expected.alpha, 0.1);
  });

  it('should return null when encountering background images during visual traversal', function () {
    fixture.innerHTML =
      '<div id="parent" style="height: 40px; width: 30px; ' +
      ' background-color: white; position: relative; z-index: 5"> ' +
      '	<div id="target" style="position: relative; top: 1px; height: 20px;' +
      '	 width: 25px; z-index: 25; background:rgba(0,125,0,0.5);"></div> ' +
      '	<div id="shifted" style="position: absolute; top: 0px; height: 40px; ' +
      '		background-image: url(foobar.png);' +
      '	 width: 35px; z-index: 15;">' +
      '	</div>' +
      '</div>';

    var target = fixture.querySelector('#target');
    var bgNodes = [];
    axe.testUtils.flatTreeSetup(fixture);
    var outcome = axe.commons.color.getBackgroundColor(target, bgNodes, false);
    assert.isNull(outcome);
    assert.equal(axe.commons.color.incompleteData.get('bgColor'), 'bgImage');
  });

  it('should return null when encountering image nodes during visual traversal', function () {
    fixture.innerHTML =
      '<div id="parent" style="height: 40px; width: 30px; ' +
      ' background-color: white; position: relative; z-index: 5"> ' +
      '	<div id="shifted" style="position: absolute; top: -10px; height: 40px; ' +
      '	 width: 35px; z-index: 15;">' +
      '		<img src="some-img.png" width="35" height="40">' +
      '	</div>' +
      '	<div id="target" style="position: relative; top: 1px; height: 20px;' +
      '	 width: 25px; z-index: 25; background:rgba(0,125,0,0.5);"></div> ' +
      '</div>';

    var target = fixture.querySelector('#target');
    var bgNodes = [];
    axe.testUtils.flatTreeSetup(fixture);
    var outcome = axe.commons.color.getBackgroundColor(target, bgNodes, false);
    assert.isNull(outcome);
    assert.equal(axe.commons.color.incompleteData.get('bgColor'), 'imgNode');
  });

  it('returns elements with negative z-index', function () {
    fixture.innerHTML =
      '<div id="sibling" ' +
      'style="z-index:-1; position:absolute; width:100%; height:2em; background: #000"></div>' +
      '<div id="target">Some text</div>';

    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(
      document.getElementById('target'),
      []
    );

    var expected = new axe.commons.color.Color(0, 0, 0, 1);

    assert.closeTo(actual.red, expected.red, 0.5);
    assert.closeTo(actual.green, expected.green, 0.5);
    assert.closeTo(actual.blue, expected.blue, 0.5);
    assert.closeTo(actual.alpha, expected.alpha, 0.1);
  });

  it('returns negative z-index elements when body has a background', function () {
    fixture.innerHTML =
      '<div id="sibling" ' +
      'style="z-index:-1; position:absolute; width:100%; height:2em; background: #000"></div>' +
      '<div id="target">Some text</div>';

    document.body.style.background = '#FFF';
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(
      document.getElementById('target'),
      []
    );

    var expected = new axe.commons.color.Color(0, 0, 0, 1);

    assert.closeTo(actual.red, expected.red, 0.5);
    assert.closeTo(actual.green, expected.green, 0.5);
    assert.closeTo(actual.blue, expected.blue, 0.5);
    assert.closeTo(actual.alpha, expected.alpha, 0.1);
  });

  it('should return null for negative z-index element when html and body have a background', function () {
    fixture.innerHTML =
      '<div style="width: 200px; height: 200px;"></div>' +
      '<div id="target" ' +
      'style="z-index:-1; position:absolute; top: 100px; width:100%; height:2em; background: #000"></div>';

    document.documentElement.style.background = '#0F0';
    document.body.style.background = '#FFF';
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(
      document.getElementById('target'),
      []
    );

    assert.isNull(actual);
  });

  it('should return background color for inline elements that do not fit the viewport', function () {
    var html = '';
    for (var i = 0; i < 300; i++) {
      html += 'foo<br />';
    }
    fixture.innerHTML = '<em>' + html + '</em>';
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(fixture, []);
    var expected = new axe.commons.color.Color(255, 255, 255, 1);

    assert.closeTo(actual.red, expected.red, 0.5);
    assert.closeTo(actual.green, expected.green, 0.5);
    assert.closeTo(actual.blue, expected.blue, 0.5);
    assert.closeTo(actual.alpha, expected.alpha, 0.1);
  });

  it('should return the body bgColor when content does not overlap', function () {
    fixture.innerHTML =
      '<div style="height: 20px; width: 30px; background-color: red;">' +
      '<div id="target" style="height:20px; top: 25px; width: 45px; position:absolute;">Text' +
      '</div></div>';
    axe.testUtils.flatTreeSetup(fixture);
    var target = fixture.querySelector('#target');
    var actual = axe.commons.color.getBackgroundColor(target, []);

    assert.closeTo(actual.red, 255, 0);
    assert.closeTo(actual.green, 255, 0);
    assert.closeTo(actual.blue, 255, 0);
    assert.closeTo(actual.alpha, 1, 0);
  });

  it('should return the html canvas inherited from body bgColor when element content does not overlap with body', function () {
    fixture.innerHTML =
      '<div id="target" style="position: relative; top: 2px; height: 10px;">Text</div>';

    // size body element so that target element is positioned outside of background
    var originalHeight = document.body.style.height;
    var originalMargin = document.body.style.margin;
    document.body.style.height = '1px';
    document.body.style.background = '#000';
    document.body.style.margin = 0;

    axe.testUtils.flatTreeSetup(fixture);
    var target = fixture.querySelector('#target');
    var actual = axe.commons.color.getBackgroundColor(target, []);

    assert.closeTo(actual.red, 0, 0);
    assert.closeTo(actual.green, 0, 0);
    assert.closeTo(actual.blue, 0, 0);
    assert.closeTo(actual.alpha, 1, 0);

    document.body.style.height = originalHeight;
    document.body.style.margin = originalMargin;
  });

  it('should return the html canvas bgColor when element content does not overlap with body', function () {
    fixture.innerHTML =
      '<div id="target" style="position: relative; top: 2px;">Text</div>';

    // size body element so that target element is positioned outside of background
    var originalHeight = document.body.style.height;
    document.body.style.height = '1px';
    document.body.style.background = '#0f0';
    document.documentElement.style.background = '#f00';

    axe.testUtils.flatTreeSetup(fixture);
    var target = fixture.querySelector('#target');
    var actual = axe.commons.color.getBackgroundColor(target, []);

    assert.closeTo(actual.red, 255, 0);
    assert.closeTo(actual.green, 0, 0);
    assert.closeTo(actual.blue, 0, 0);
    assert.closeTo(actual.alpha, 1, 0);

    document.body.style.height = originalHeight;
  });

  (shadowSupported ? it : xit)(
    'finds colors in shadow boundaries',
    function () {
      fixture.innerHTML = '<div id="container"></div>';
      var container = fixture.querySelector('#container');
      var shadow = container.attachShadow({ mode: 'open' });
      shadow.innerHTML =
        '<div style="background-color: black;">' +
        '<span id="shadowTarget" style="color: #ccc;">Text</span>' +
        '</div>';
      axe.testUtils.flatTreeSetup(fixture);

      var target = shadow.querySelector('#shadowTarget');
      var actual = axe.commons.color.getBackgroundColor(target, []);

      assert.closeTo(actual.red, 0, 0);
      assert.closeTo(actual.green, 0, 0);
      assert.closeTo(actual.blue, 0, 0);
      assert.closeTo(actual.alpha, 1, 0);
    }
  );

  (shadowSupported ? it : xit)(
    'finds colors across shadow boundaries',
    function () {
      fixture.innerHTML =
        '<div id="container" style="background-color:black;"></div>';
      var container = fixture.querySelector('#container');
      var shadow = container.attachShadow({ mode: 'open' });
      shadow.innerHTML =
        '<span id="shadowTarget" style="color:#ccc;">Text</span>';
      axe.testUtils.flatTreeSetup(fixture);

      var target = shadow.querySelector('#shadowTarget');
      var actual = axe.commons.color.getBackgroundColor(target, [], false);

      assert.equal(actual.red, 0);
      assert.equal(actual.green, 0);
      assert.equal(actual.blue, 0);
      assert.equal(actual.alpha, 1);
    }
  );

  (shadowSupported ? it : xit)(
    'should count an implicit label as a background element inside shadow dom',
    function () {
      fixture.innerHTML = '<div id="container"></div>';
      var container = fixture.querySelector('#container');
      var shadow = container.attachShadow({ mode: 'open' });
      shadow.innerHTML =
        '<div><label id="target" style="background-color:#000;">Text<input type="text"></label></div>';

      var target = shadow.querySelector('#target');
      axe.testUtils.flatTreeSetup(fixture);
      var actual = axe.commons.color.getBackgroundColor(target, []);
      var expected = new axe.commons.color.Color(0, 0, 0, 1);

      assert.equal(actual.red, expected.red);
      assert.equal(actual.green, expected.green);
      assert.equal(actual.blue, expected.blue);
      assert.equal(actual.alpha, expected.alpha);
    }
  );

  (shadowSupported ? it : xit)(
    'finds colors for absolutely positioned elements across shadow boundaries',
    function () {
      fixture.innerHTML =
        '<div id="container" style="background-color:black; height:20px; position:relative;"></div>';
      var container = fixture.querySelector('#container');
      var shadow = container.attachShadow({ mode: 'open' });
      shadow.innerHTML =
        '<div id="shadowTarget" style="color:#333; height:20px; position:absolute; top:20px;">Text</div>';
      axe.testUtils.flatTreeSetup(fixture);

      var target = shadow.querySelector('#shadowTarget');
      axe.testUtils.flatTreeSetup(fixture);
      var actual = axe.commons.color.getBackgroundColor(target, []);
      assert.equal(actual.red, 255);
      assert.equal(actual.green, 255);
      assert.equal(actual.blue, 255);
      assert.equal(actual.alpha, 1);
    }
  );

  (shadowSupported ? it : xit)(
    'finds a color for absolutely positioned content when background is in shadow dom',
    function () {
      fixture.innerHTML =
        '<div id="elm1" style="width:10em; height:0; position:absolute;"></div>' +
        '<div id="elm2" style="color:green; position:absolute;">Text</div>';

      var elm1 = document.querySelector('#elm1');
      var shadow1 = elm1.attachShadow({ mode: 'open' });
      shadow1.innerHTML =
        '<div style="background:rgba(0,0,0,1); height:10em;"></div>';
      var elm2 = document.querySelector('#elm2');
      axe.testUtils.flatTreeSetup(fixture);
      var actual = axe.commons.color.getBackgroundColor(elm2, []);
      assert.equal(actual.red, 0);
      assert.equal(actual.blue, 0);
      assert.equal(actual.green, 0);
      assert.equal(actual.alpha, 1);
    }
  );

  (shadowSupported ? it : xit)(
    'finds colors for content rendered across multiple shadow boundaries',
    function () {
      fixture.innerHTML =
        '<div style="position:relative;"><div id="elm1" style="width:10em;"></div>' +
        '<div id="elm2"></div></div>';

      var elm1 = document.querySelector('#elm1');
      var shadow1 = elm1.attachShadow({ mode: 'open' });
      shadow1.innerHTML =
        '<div style="background:rgba(0,0,0,1); height:10em;"></div>';
      var elm2 = document.querySelector('#elm2');
      var shadow2 = elm2.attachShadow({ mode: 'open' });
      shadow2.innerHTML =
        '' +
        '<div id="elm3" style="background:rgba(255,255,255,0.5);color:green;height:10em;top:0;position:absolute;">' +
        'Text' +
        '</div>';

      var elm3 = shadow2.querySelector('#elm3');
      axe.testUtils.flatTreeSetup(fixture);
      var actual = axe.commons.color.getBackgroundColor(elm3, []);
      assert.closeTo(actual.red, 128, 2);
      assert.closeTo(actual.blue, 128, 2);
      assert.closeTo(actual.green, 128, 2);
      assert.closeTo(actual.alpha, 1, 0);
    }
  );

  (shadowSupported ? it : xit)(
    'finds colors for multiline elements across shadow boundaries',
    function () {
      fixture.innerHTML =
        '<div id="container" style="background-color:black; height:40px;"></div>';
      var container = fixture.querySelector('#container');
      var shadow = container.attachShadow({ mode: 'open' });
      shadow.innerHTML =
        '<div id="shadowTarget" style="color:#333;">Text<br>More text</div>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = shadow.querySelector('#shadowTarget');
      var actual = axe.commons.color.getBackgroundColor(target, []);
      assert.equal(actual.red, 0);
      assert.equal(actual.green, 0);
      assert.equal(actual.blue, 0);
      assert.equal(actual.alpha, 1);
    }
  );

  (shadowSupported ? xit : xit)(
    'returns null for multiline elements not fully covering parents across shadow boundaries',
    function () {
      fixture.innerHTML =
        '<div id="container" style="background-color:black; height:20px;"></div>';
      var container = fixture.querySelector('#container');
      var shadow = container.attachShadow({ mode: 'open' });
      shadow.innerHTML =
        '<div id="shadowTarget" style="color:#333;">Text<br>More text</div>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = shadow.querySelector('#shadowTarget');
      var actual = axe.commons.color.getBackgroundColor(target, []);
      assert.isNull(actual);
    }
  );

  (shadowSupported ? it : xit)(
    'returns a color for slotted content',
    function () {
      fixture.innerHTML = '<div id="container"></div>';
      var div = fixture.querySelector('#container');
      div.innerHTML = '<a href="">Link</a>';
      var shadow = div.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<p style="background-color: #000;"><slot></slot></p>';
      axe.testUtils.flatTreeSetup(fixture);
      var linkElm = div.querySelector('a');
      var actual = axe.commons.color.getBackgroundColor(linkElm, []);
      assert.equal(actual.red, 0);
      assert.equal(actual.green, 0);
      assert.equal(actual.blue, 0);
      assert.equal(actual.alpha, 1);
    }
  );

  it('should return the text-shadow mixed in with the background', function () {
    fixture.innerHTML =
      '<div id="parent" style="height: 40px; width: 30px; background-color: #800000;">' +
      '<div id="target" style="height: 20px; width: 15px; text-shadow: red 0 0 1em">foo' +
      '</div></div>';
    var target = fixture.querySelector('#target');
    var parent = fixture.querySelector('#parent');
    var bgNodes = [];
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(target, bgNodes);

    // is 128 without the shadow
    var expected = new axe.commons.color.Color(145, 0, 0, 1);
    assert.closeTo(actual.red, expected.red, 0.5);
    assert.closeTo(actual.green, expected.green, 0.5);
    assert.closeTo(actual.blue, expected.blue, 0.5);
    assert.closeTo(actual.alpha, expected.alpha, 0.1);
    assert.deepEqual(bgNodes, [parent]);
  });

  it('ignores thin text-shadows', function () {
    fixture.innerHTML =
      '<div id="parent" style="height: 40px; width: 30px; background-color: #000;">' +
      '<div id="target" style="height: 20px; width: 15px; text-shadow: red 0 0 0.05em">foo' +
      '</div></div>';
    var target = fixture.querySelector('#target');
    var bgNodes = [];
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(target, bgNodes);

    assert.equal(actual.red, 0);
    assert.equal(actual.green, 0);
    assert.equal(actual.blue, 0);
    assert.equal(actual.alpha, 1);
  });

  it('ignores text-shadows thinner than shadowOutlineEmMax', function () {
    fixture.innerHTML =
      '<div style="height: 40px; width: 30px; background-color: #800000;">' +
      '<div id="target" style="height: 20px; width: 15px; text-shadow: red 0 0 1em, green 0 0 0.5em">foo' +
      '</div></div>';
    var target = fixture.querySelector('#target');
    var bgNodes = [];
    axe.testUtils.flatTreeSetup(fixture);
    var actual = axe.commons.color.getBackgroundColor(target, bgNodes, 1);

    // is 128 without the shadow
    var expected = new axe.commons.color.Color(145, 0, 0, 1);
    assert.closeTo(actual.red, expected.red, 0.5);
    assert.closeTo(actual.green, expected.green, 0.5);
    assert.closeTo(actual.blue, expected.blue, 0.5);
    assert.closeTo(actual.alpha, expected.alpha, 0.1);
  });

  describe('body and document', function () {
    it('returns the body background', function () {
      fixture.innerHTML = '<div id="target">elm</div>';
      document.body.style.background = '#F00';

      axe.testUtils.flatTreeSetup(fixture);
      var actual = axe.commons.color.getBackgroundColor(
        document.getElementById('target'),
        []
      );
      var expected = new axe.commons.color.Color(255, 0, 0, 1);

      assert.closeTo(actual.red, expected.red, 0.5);
      assert.closeTo(actual.green, expected.green, 0.5);
      assert.closeTo(actual.blue, expected.blue, 0.5);
      assert.closeTo(actual.alpha, expected.alpha, 0.1);
    });

    it('returns the body background even when the body is MUCH larger than the screen', function () {
      fixture.innerHTML = '<div id="target" style="height:20000px;">elm</div>';
      document.body.style.background = '#F00';

      axe.testUtils.flatTreeSetup(fixture);
      var actual = axe.commons.color.getBackgroundColor(
        document.getElementById('target'),
        []
      );
      var expected = new axe.commons.color.Color(255, 0, 0, 1);

      assert.closeTo(actual.red, expected.red, 0.5);
      assert.closeTo(actual.green, expected.green, 0.5);
      assert.closeTo(actual.blue, expected.blue, 0.5);
      assert.closeTo(actual.alpha, expected.alpha, 0.1);
    });

    it('returns the html background', function () {
      fixture.innerHTML = '<div id="target"><label>elm<input></label></div>';
      document.documentElement.style.background = '#0F0';

      axe.testUtils.flatTreeSetup(fixture);
      var actual = axe.commons.color.getBackgroundColor(
        document.getElementById('target'),
        []
      );
      var expected = new axe.commons.color.Color(0, 255, 0, 1);

      assert.closeTo(actual.red, expected.red, 0.5);
      assert.closeTo(actual.green, expected.green, 0.5);
      assert.closeTo(actual.blue, expected.blue, 0.5);
      assert.closeTo(actual.alpha, expected.alpha, 0.1);
    });

    it('returns the html background when body does not cover the element', function () {
      fixture.innerHTML =
        '<div id="target" style="position: absolute; top: 1000px;">elm<input></div>';
      document.documentElement.style.background = '#0F0';
      document.body.style.background = '#00F';

      axe.testUtils.flatTreeSetup(fixture);
      var actual = axe.commons.color.getBackgroundColor(
        document.getElementById('target'),
        []
      );
      var expected = new axe.commons.color.Color(0, 255, 0, 1);

      assert.closeTo(actual.red, expected.red, 0.5);
      assert.closeTo(actual.green, expected.green, 0.5);
      assert.closeTo(actual.blue, expected.blue, 0.5);
      assert.closeTo(actual.alpha, expected.alpha, 0.1);
    });

    it('returns the body background when body does cover the element', function () {
      fixture.innerHTML = '<div id="target"><label>elm<input></label></div>';
      document.documentElement.style.background = '#0F0';
      document.body.style.background = '#00F';

      axe.testUtils.flatTreeSetup(fixture);
      var actual = axe.commons.color.getBackgroundColor(
        document.getElementById('target'),
        []
      );
      var expected = new axe.commons.color.Color(0, 0, 255, 1);

      assert.closeTo(actual.red, expected.red, 0.5);
      assert.closeTo(actual.green, expected.green, 0.5);
      assert.closeTo(actual.blue, expected.blue, 0.5);
      assert.closeTo(actual.alpha, expected.alpha, 0.1);
    });

    it('returns both the html and body background if the body has alpha', function () {
      fixture.innerHTML = '<div id="target"><label>elm<input></label></div>';
      document.documentElement.style.background = '#0F0';
      document.body.style.background = 'rgba(0, 0, 255, 0.5)';

      axe.testUtils.flatTreeSetup(fixture);
      var actual = axe.commons.color.getBackgroundColor(
        document.getElementById('target'),
        []
      );
      var expected = new axe.commons.color.Color(0, 128, 128, 1);

      assert.closeTo(actual.red, expected.red, 0.5);
      assert.closeTo(actual.green, expected.green, 0.5);
      assert.closeTo(actual.blue, expected.blue, 0.5);
      assert.closeTo(actual.alpha, expected.alpha, 0.1);
    });
  });
});
