describe('color-contrast blending test', function () {
  var include = [];
  var resultElms = [];
  var expected = [
    // normal
    'rgb(223, 112, 96)',
    'rgb(255, 128, 128)',
    'rgb(191, 223, 191)',
    'rgb(125, 38, 54)',
    'rgb(179, 38, 0)',
    'rgb(179, 0, 77)',
    'rgb(144, 192, 81)',
    'rgb(147, 154, 120)',
    'rgb(221, 221, 221)',
    // multiply
    'rgb(191, 112, 96)',
    'rgb(255, 128, 128)',
    'rgb(191, 223, 191)',
    'rgb(125, 0, 54)',
    'rgb(179, 0, 0)',
    'rgb(179, 0, 0)',
    'rgb(144, 171, 81)',
    'rgb(147, 154, 112)',
    'rgb(213, 213, 213)',
    // screen
    'rgb(223, 223, 191)',
    'rgb(255, 255, 255)',
    'rgb(255, 255, 255)',
    'rgb(179, 38, 77)',
    'rgb(255, 38, 0)',
    'rgb(255, 0, 77)',
    'rgb(165, 192, 81)',
    'rgb(150, 157, 120)',
    'rgb(228, 228, 228)',
    // overlay
    'rgb(223, 207, 159)',
    'rgb(255, 255, 255)',
    'rgb(255, 255, 255)',
    'rgb(156, 0, 54)',
    'rgb(255, 0, 0)',
    'rgb(255, 0, 0)',
    'rgb(148, 187, 81)',
    'rgb(147, 154, 114)',
    'rgb(226, 226, 226)',
    // darken
    'rgb(191, 112, 96)',
    'rgb(255, 128, 128)',
    'rgb(191, 223, 191)',
    'rgb(125, 0, 54)',
    'rgb(179, 0, 0)',
    'rgb(179, 0, 0)',
    'rgb(144, 171, 81)',
    'rgb(147, 154, 112)',
    'rgb(221, 221, 221)',
    // lighten
    'rgb(223, 223, 191)',
    'rgb(255, 255, 255)',
    'rgb(255, 255, 255)',
    'rgb(179, 38, 77)',
    'rgb(255, 38, 0)',
    'rgb(255, 0, 77)',
    'rgb(165, 192, 81)',
    'rgb(150, 157, 120)',
    'rgb(221, 221, 221)',
    // color-dodge
    'rgb(223, 223, 191)',
    'rgb(255, 255, 255)',
    'rgb(255, 255, 255)',
    'rgb(179, 0, 77)',
    'rgb(255, 0, 0)',
    'rgb(255, 0, 0)',
    'rgb(165, 192, 81)',
    'rgb(150, 157, 120)',
    'rgb(230, 230, 230)',
    // color-burn
    'rgb(191, 112, 96)',
    'rgb(255, 255, 255)',
    'rgb(255, 255, 255)',
    'rgb(125, 0, 54)',
    'rgb(255, 0, 0)',
    'rgb(255, 0, 0)',
    'rgb(144, 171, 81)',
    'rgb(147, 154, 112)',
    'rgb(219, 219, 219)',
    // hard-light
    'rgb(223, 112, 96)',
    'rgb(255, 128, 128)',
    'rgb(191, 255, 191)',
    'rgb(125, 0, 54)',
    'rgb(179, 0, 0)',
    'rgb(179, 0, 77)',
    'rgb(144, 192, 81)',
    'rgb(147, 154, 120)',
    'rgb(226, 226, 226)',
    // soft-light
    'rgb(206, 209, 167)',
    'rgb(255, 255, 255)',
    'rgb(255, 255, 255)',
    'rgb(163, 0, 61)',
    'rgb(255, 0, 0)',
    'rgb(255, 0, 0)',
    'rgb(155, 180, 81)',
    'rgb(148, 155, 115)',
    'rgb(223, 223, 223)',
    // difference
    'rgb(128, 223, 191)',
    'rgb(128, 255, 255)',
    'rgb(255, 223, 255)',
    'rgb(179, 38, 77)',
    'rgb(255, 38, 0)',
    'rgb(255, 0, 77)',
    'rgb(165, 176, 81)',
    'rgb(150, 157, 119)',
    'rgb(183, 183, 183)',
    // exclusion
    'rgb(128, 223, 191)',
    'rgb(128, 255, 255)',
    'rgb(255, 223, 255)',
    'rgb(179, 38, 77)',
    'rgb(255, 38, 0)',
    'rgb(255, 0, 77)',
    'rgb(165, 176, 81)',
    'rgb(150, 157, 119)',
    'rgb(198, 198, 198)'
  ];

  var fixture = document.querySelector('#fixture');
  var testGroup = document.querySelector('.test-group');
  [
    'multiply',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'hard-light',
    'soft-light',
    'difference',
    'exclusion'
  ].forEach(function (blendMode) {
    var nodes = testGroup.cloneNode(true);
    var group = testGroup.cloneNode();

    var heading = document.createElement('h2');
    heading.textContent = blendMode;
    fixture.appendChild(heading);

    Array.from(nodes.children).forEach(function (node, index) {
      var id = node.id;
      var target = node.querySelector('#' + id + '-target');
      var result = node.querySelector('#' + id + '-result');
      var blendModeIndex = blendMode + (index + 1);

      node.id = blendModeIndex;
      target.id = blendModeIndex + '-target';
      result.id = blendModeIndex + '-result';

      target.textContent = blendModeIndex;
      result.textContent = blendModeIndex + ' result';

      target.style.mixBlendMode = blendMode;
      group.appendChild(node);
    });

    fixture.appendChild(group);
  });
  var testElms = Array.from(document.querySelectorAll('.test-group > div'));
  testElms.forEach(function (testElm) {
    var id = testElm.id;
    var target = testElm.querySelector('#' + id + '-target');
    var result = testElm.querySelector('#' + id + '-result');
    include.push(target);
    resultElms.push(result);
  });

  before(function (done) {
    axe.run(
      { include: include },
      { runOnly: ['color-contrast'] },
      function (err, res) {
        assert.isNull(err);

        // don't care where the result goes as we just want to
        // extract the background color for each one
        var results = []
          .concat(res.passes)
          .concat(res.violations)
          .concat(res.incomplete);
        results.forEach(function (result) {
          result.nodes.forEach(function (node) {
            var bgColor = node.any[0].data.bgColor;
            var id = node.target[0].substring(
              0,
              node.target[0].lastIndexOf('-')
            );
            var result = document.querySelector(id + '-result');
            result.style.backgroundColor = bgColor;
          });
        });

        done();
      }
    );
  });

  resultElms.forEach(function (elm, index) {
    it('produces the correct blended color for ' + elm.id, function () {
      var style = window.getComputedStyle(elm);
      assert.equal(style.getPropertyValue('background-color'), expected[index]);
    });
  });
});
