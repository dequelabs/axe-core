describe('color-contrast shadow dom test', () => {
  const html = axe.testUtils.html;

  const shadowSupported = axe.testUtils.shadowSupport.v1;

  before(() => {
    const fixture = document.querySelector('#fixture');
    if (shadowSupported) {
      var shadow = fixture.attachShadow({ mode: 'open' });
      shadow.innerHTML = html`
        <button style="background-color:red;color:white;">Go!</button>
        <span style="color:#ccc;">Text</span>
        <div>
          <label style="color:#ccc;">Text<input type="text" /></label>
        </div>
        <div style="background-color:black; height:20px;">
          <div style="color:#666; position:absolute;">Text</div>
        </div>
      `;

      const slotShadow = document
        .querySelector('#slotFixture')
        .attachShadow({ mode: 'open' });
      slotShadow.innerHTML = html`
        <button style="background-color:black;color:white;">
          <slot style="display:inline-block;"></slot>
        </button>
      `;
    }
  });

  describe('violations', () => {
    it('should find issues in shadow tree', done => {
      axe.run(
        '#fixture',
        { runOnly: { type: 'rule', values: ['color-contrast'] } },
        (err, results) => {
          assert.isNull(err);
          assert.lengthOf(results.violations, 1);
          assert.lengthOf(results.violations[0].nodes, 2);
          assert.equal(
            results.violations[0].nodes[1].any[0].data.bgColor,
            '#000000'
          );
          assert.lengthOf(results.incomplete, 0);
          done();
        }
      );
    });
  });

  describe('passes', () => {
    // @see https://github.com/dequelabs/axe-core/issues/4468
    it('should find text slotted into a slot with a box', done => {
      axe.run(
        '#slotFixture',
        { runOnly: { type: 'rule', values: ['color-contrast'] } },
        (err, results) => {
          assert.isNull(err);
          assert.lengthOf(results.violations, 0);
          assert.lengthOf(results.incomplete, 0);
          assert.lengthOf(results.passes, 1);
          done();
        }
      );
    });
  });
});
