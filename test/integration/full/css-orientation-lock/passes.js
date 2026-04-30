describe('css-orientation-lock passes test', () => {
  const html = axe.testUtils.html;

  const styleSheets = [
    {
      href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
    },
    {
      text: '@media screen and (min-width: 10px) and (max-width: 3000px) {	html { width: 100vh; } }'
    }
  ];

  before(done => {
    axe.testUtils
      .addStyleSheets(styleSheets)
      .then(() => {
        done();
      })
      .catch(error => {
        done(new Error(`Could not load stylesheets for testing. ${error}`));
      });
  });

  it('returns PASSES when page has STYLE with MEDIA rules (not orientation)', done => {
    // the sheets included in the html, have styles for transform and rotate, hence the violation
    axe.run(
      {
        runOnly: {
          type: 'rule',
          values: ['css-orientation-lock']
        }
      },
      (err, res) => {
        assert.isNull(err);
        assert.isDefined(res);

        // check for violation
        assert.property(res, 'passes');
        assert.lengthOf(res.passes, 1);
        const checkedNode = res.passes[0].nodes[0];
        assert.isTrue(/html/i.test(checkedNode.html));

        done();
      }
    );
  });

  it('returns PASSES whilst also accommodating shadowDOM styles with MEDIA rules (not orientation)', done => {
    // here although media styles are pumped into shadow dom
    // they are not orientation locks, so returns as passes
    const fixture = document.getElementById('shadow-fixture');
    const shadow = fixture.attachShadow({ mode: 'open' });
    shadow.innerHTML = html`
      <style>
        @media screen and (min-width: 10px) and (max-width: 2000px) {
          .shadowDiv {
            transform: rotate(90deg);
          }
        }
      </style>
      <div class="green">green</div>
      <div class="shadowDiv">red</div>
    `;

    axe.run(
      {
        runOnly: {
          type: 'rule',
          values: ['css-orientation-lock']
        }
      },
      (err, res) => {
        assert.isNull(err);
        assert.isDefined(res);

        // check for violation
        assert.property(res, 'passes');
        assert.lengthOf(res.passes, 1);

        const checkedNode = res.passes[0].nodes[0];
        assert.isTrue(/html/i.test(checkedNode.html));

        const checkResult = checkedNode.all[0];
        assert.lengthOf(checkResult.relatedNodes, 0);

        done();
      }
    );
  });
});
