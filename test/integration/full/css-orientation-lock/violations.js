describe('css-orientation-lock violations test', () => {
  const shadowSupported = axe.testUtils.shadowSupport.v1;

  const styleSheets = [
    {
      href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
    },
    {
      href: 'violations.css'
    }
  ];

  before(done => {
    axe.testUtils
      .addStyleSheets(styleSheets)
      .then(() => {
        done();
      })
      .catch(error => {
        done(new Error('Could not load stylesheets for testing. ' + error));
      });
  });

  function assertViolatedSelectors(relatedNodes, violatedSelectors) {
    relatedNodes.forEach(node => {
      const target = node.target[0];
      const className = Array.isArray(target) ? target.reverse()[0] : target;
      assert.isTrue(violatedSelectors.indexOf(className) !== -1);
    });
  }

  it('returns VIOLATIONS if preload is set to TRUE', done => {
    // the sheets included in the html, have styles for transform and rotate, hence the violation
    axe.run(
      {
        runOnly: {
          type: 'rule',
          values: ['css-orientation-lock']
        }
      },
      (err, res) => {
        try {
          assert.isNull(err);
          assert.isDefined(res);

          // check for violation
          assert.property(res, 'violations');
          assert.lengthOf(res.violations, 1);

          // assert the node
          const checkedNode = res.violations[0].nodes[0];
          assert.isTrue(/html/i.test(checkedNode.html));

          // assert the relatedNodes
          const checkResult = checkedNode.all[0];
          assert.lengthOf(checkResult.relatedNodes, 4);
          assertViolatedSelectors(checkResult.relatedNodes, [
            '.someDiv',
            '.thatDiv',
            '.rotateDiv',
            '.rotateMatrix'
          ]);

          done();
        } catch (e) {
          done(e);
        }
      }
    );
  });

  (shadowSupported ? it : xit)(
    'returns VIOLATIONS whilst also accommodating shadowDOM styles',
    done => {
      const fixture = document.getElementById('shadow-fixture');
      const shadow = fixture.attachShadow({ mode: 'open' });
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
        (err, res) => {
          try {
            assert.isNull(err);
            assert.isDefined(res);

            // check for violation
            assert.property(res, 'violations');
            assert.lengthOf(res.violations, 1);

            // assert the node
            const checkedNode = res.violations[0].nodes[0];
            assert.isTrue(/html/i.test(checkedNode.html));

            // assert the relatedNodes
            const checkResult = checkedNode.all[0];
            assert.lengthOf(checkResult.relatedNodes, 5);
            assertViolatedSelectors(checkResult.relatedNodes, [
              '.someDiv',
              '.thatDiv',
              '.rotateDiv',
              '.rotateMatrix',
              '.shadowDiv'
            ]);

            done();
          } catch (e) {
            done(e);
          }
        }
      );
    }
  );
});
