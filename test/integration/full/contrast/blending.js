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
          var id = node.target[0].split('-')[0];
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
