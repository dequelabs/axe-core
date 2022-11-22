describe('css-orientation-lock passes test', function () {
  'use strict';

  var shadowSupported = axe.testUtils.shadowSupport.v1;

  var styleSheets = [
    {
      href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
    },
    {
      text: '@media screen and (min-width: 10px) and (max-width: 3000px) {	html { width: 100vh; } }'
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

  it('returns PASSES when page has STYLE with MEDIA rules (not orientation)', function (done) {
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
        assert.property(res, 'passes');
        assert.lengthOf(res.passes, 1);
        var checkedNode = res.passes[0].nodes[0];
        assert.isTrue(/html/i.test(checkedNode.html));

        done();
      }
    );
  });

  (shadowSupported ? it : xit)(
    'returns PASSES whilst also accommodating shadowDOM styles with MEDIA rules (not orientation)',
    function (done) {
      // here although media styles are pumped into shadow dom
      // they are not orientation locks, so returns as passes
      var fixture = document.getElementById('shadow-fixture');
      var shadow = fixture.attachShadow({ mode: 'open' });
      shadow.innerHTML =
        '<style> @media screen and (min-width: 10px) and (max-width: 2000px) { .shadowDiv { transform: rotate(90deg); } } </style>' +
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
          assert.property(res, 'passes');
          assert.lengthOf(res.passes, 1);

          var checkedNode = res.passes[0].nodes[0];
          assert.isTrue(/html/i.test(checkedNode.html));

          var checkResult = checkedNode.all[0];
          assert.lengthOf(checkResult.relatedNodes, 0);

          done();
        }
      );
    }
  );
});
