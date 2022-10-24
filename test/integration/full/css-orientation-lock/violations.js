describe('css-orientation-lock violations test', function () {
  'use strict';

  var shadowSupported = axe.testUtils.shadowSupport.v1;

  var styleSheets = [
    {
      href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
    },
    {
      href: 'violations.css'
    }
  ];

  before(function (done) {
    axe.testUtils
      .addStyleSheets(styleSheets)
      .then(function () {
        done();
      })
      .catch(function (error) {
        done(new Error('Could not load stylesheets for testing. ' + error));
      });
  });

  function assertViolatedSelectors(relatedNodes, violatedSelectors) {
    relatedNodes.forEach(function (node) {
      var target = node.target[0];
      var className = Array.isArray(target) ? target.reverse()[0] : target;
      assert.isTrue(violatedSelectors.indexOf(className) !== -1);
    });
  }

  it('returns VIOLATIONS if preload is set to TRUE', function (done) {
    // the sheets included in the html, have styles for transform and rotate, hence the violation
    axe.run(
      {
        runOnly: {
          type: 'rule',
          values: ['css-orientation-lock']
        }
      },
      function (err, res) {
        assert.isNull(err);
        assert.isDefined(res);

        // check for violation
        assert.property(res, 'violations');
        assert.lengthOf(res.violations, 1);

        // assert the node
        var checkedNode = res.violations[0].nodes[0];
        assert.isTrue(/html/i.test(checkedNode.html));

        // assert the relatedNodes
        var checkResult = checkedNode.all[0];
        assert.lengthOf(checkResult.relatedNodes, 2);
        assertViolatedSelectors(checkResult.relatedNodes, [
          '.someDiv',
          '.thatDiv'
        ]);

        done();
      }
    );
  });

  (shadowSupported ? it : xit)(
    'returns VIOLATIONS whilst also accommodating shadowDOM styles',
    function (done) {
      var fixture = document.getElementById('shadow-fixture');
      var shadow = fixture.attachShadow({ mode: 'open' });
      shadow.innerHTML =
        '<style> @media screen and (min-width: 10px) and (max-width: 2000px) and (orientation: portrait) { .shadowDiv { transform: rotate3d(0,0,1,90deg); } } .green { background-color: green; } </style>' +
        '<div class="green">green</div>' +
        '<div class="shadowDiv">red</div>';

      axe.run(
        {
          runOnly: {
            type: 'rule',
            values: ['css-orientation-lock']
          }
        },
        function (err, res) {
          assert.isNull(err);
          assert.isDefined(res);

          // check for violation
          assert.property(res, 'violations');
          assert.lengthOf(res.violations, 1);

          // assert the node
          var checkedNode = res.violations[0].nodes[0];
          assert.isTrue(/html/i.test(checkedNode.html));

          // assert the relatedNodes
          var checkResult = checkedNode.all[0];
          assert.lengthOf(checkResult.relatedNodes, 3);
          assertViolatedSelectors(checkResult.relatedNodes, [
            '.someDiv',
            '.thatDiv',
            '.shadowDiv'
          ]);

          done();
        }
      );
    }
  );
});
