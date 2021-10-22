describe('color-contrast blending test', function() {
  var include = [];
  var resultElms = [];
  var expected = [
    'rgb(223, 112, 96)',
    'rgb(255, 128, 128)',
    'rgb(191, 223, 191)',
    'rgb(125, 38, 54)',
    'rgb(179, 38, 0)',
    'rgb(179, 0, 77)',
    'rgb(143, 192, 80)',
    'rgb(147, 153, 119)',
    'rgb(221, 221, 221)'
  ];

  var fixture = document.querySelector('#fixture');
  var clonedFixture = fixture.cloneNode(true);
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
  ].forEach(function(blendMode) {
    var nodes = clonedFixture.cloneNode(true);

    Array.from(nodes.children).forEach(function(node, index) {
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
      fixture.appendChild(node);
    });
  });
  var testElms = Array.from(document.querySelectorAll('#fixture > div'));
  testElms.forEach(function(testElm) {
    var id = testElm.id;
    var target = testElm.querySelector('#' + id + '-target');
    var result = testElm.querySelector('#' + id + '-result');
    include.push(target);
    resultElms.push(result);
  });

  before(function(done) {
    axe.run({ include: include }, { runOnly: ['color-contrast'] }, function(
      err,
      res
    ) {
      assert.isNull(err);

      // don't care where the result goes as we just want to
      // extract the background color for each one
      var results = []
        .concat(res.passes)
        .concat(res.violations)
        .concat(res.incomplete);
      results.forEach(function(result) {
        result.nodes.forEach(function(node) {
          var bgColor = node.any[0].data.bgColor;
          var id = node.target[0].substring(0, node.target[0].lastIndexOf('-'));
          var result = document.querySelector(id + '-result');
          result.style.backgroundColor = bgColor;
        });
      });

      done();
    });
  });

  resultElms.forEach(function(elm, index) {
    it('produces the correct blended color for ' + elm.id, function() {
      var style = window.getComputedStyle(elm);
      assert.equal(style.getPropertyValue('background-color'), expected[index]);
    });
  });
});
