describe('bypass fail test', () => {
  let results;
  before(done => {
    const mocha = document.getElementById('mocha'),
      html = mocha.innerHTML;
    mocha.innerHTML = '';
    axe.testUtils.awaitNestedLoad(() => {
      axe.run({ runOnly: { type: 'rule', values: ['bypass'] } }, (err, r) => {
        assert.isNull(err);

        results = r;
        mocha.innerHTML = html;
        done();
      });
    });
  });

  describe('incomplete', () => {
    it('should find 1', () => {
      assert.lengthOf(results.incomplete, 1);
    });

    it('should find html', () => {
      assert.deepEqual(results.incomplete[0].nodes[0].target, ['html']);
    });
  });

  describe('passes', () => {
    it('should find none', () => {
      assert.lengthOf(results.passes, 0);
    });
  });
});
