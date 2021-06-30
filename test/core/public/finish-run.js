describe('axe.finishRun', function() {
  var fixture = document.querySelector('#fixture');

  it('takes a single partial results and outputs a finished report', function(done) {
    axe
      .runPartial()
      .then(axe.finishRun)
      .then(function(results) {
        assert.property(results, 'violations');
        assert.property(results, 'passes');
        assert.property(results, 'incomplete');
        assert.property(results, 'inapplicable');
        done();
      })
      .catch(done);
  });

  it('uses option.reporter to create the report', function(done) {
    axe
      .runPartial()
      .then(function(results) {
        return axe.finishRun(results, { reporter: 'raw' });
      })
      .then(function(results) {
        assert.notProperty(results, 'violations');
        assert.notProperty(results, 'passes');
        assert.notProperty(results, 'incomplete');
        assert.notProperty(results, 'inapplicable');
        done();
      })
      .catch(done);
  });

  it('can report violations results', function(done) {
    fixture.innerHTML = '<div id="fail" aria-label="foo"></div>';

    axe
      .runPartial({ include: ['#fail'] }, { runOnly: 'aria-allowed-attr' })
      .then(axe.finishRun)
      .then(function(results) {
        assert.lengthOf(results.violations, 1);
        assert.lengthOf(results.passes, 0);
        assert.lengthOf(results.incomplete, 0);
        assert.lengthOf(results.inapplicable, 0);
        done();
      })
      .catch(done);
  });

  it('can report passes results', function(done) {
    fixture.innerHTML = '<div id="pass" role="button" aria-label="foo"></div>';

    axe
      .runPartial({ include: ['#pass'] }, { runOnly: 'aria-allowed-attr' })
      .then(axe.finishRun)
      .then(function(results) {
        assert.lengthOf(results.violations, 0);
        assert.lengthOf(results.passes, 1);
        assert.lengthOf(results.incomplete, 0);
        assert.lengthOf(results.inapplicable, 0);
        done();
      })
      .catch(done);
  });

  it('can report incomplete results', function(done) {
    fixture.innerHTML =
      '<div id="incomplete" aria-describedby="missing"></div>';

    axe
      .runPartial(
        { include: ['#incomplete'] },
        { runOnly: 'aria-valid-attr-value' }
      )
      .then(axe.finishRun)
      .then(function(results) {
        assert.lengthOf(results.violations, 0);
        assert.lengthOf(results.passes, 0);
        assert.lengthOf(results.incomplete, 1);
        assert.lengthOf(results.inapplicable, 0);
        done();
      })
      .catch(done);
  });

  it('can report inapplicable results', function(done) {
    axe
      .runPartial({ include: ['#fixture'] }, { runOnly: 'aria-allowed-attr' })
      .then(axe.finishRun)
      .then(function(results) {
        assert.lengthOf(results.violations, 0);
        assert.lengthOf(results.passes, 0);
        assert.lengthOf(results.incomplete, 0);
        assert.lengthOf(results.inapplicable, 1);
        done();
      })
      .catch(done);
  });

  it('takes multiple partial results and outputs a finished report', function(done) {
    fixture.innerHTML =
      '<div id="fail" aria-label="foo"></div>' +
      '<div id="pass" role="button" aria-label="foo"></div>' +
      '<div id="incomplete" aria-describedby="missing"></div>';
    var allResults = [];

    axe
      .runPartial({ include: ['#pass'] }, { runOnly: 'aria-allowed-attr' })
      .then(function(results) {
        allResults.push(results);
        return axe.runPartial(
          { include: ['#fail'] },
          { runOnly: 'aria-allowed-attr' }
        );
      })
      .then(function(results) {
        allResults.push(results);
        return axe.runPartial(
          { include: ['#incomplete'] },
          { runOnly: 'aria-valid-attr-value' }
        );
      })
      .then(function(results) {
        return axe.finishRun(allResults.concat(results));
      })
      .then(function(results) {
        assert.lengthOf(results.violations, 1);
        assert.lengthOf(results.passes, 1);
        assert.lengthOf(results.incomplete, 1);
        assert.lengthOf(results.inapplicable, 0);
        done();
      })
      .catch(done);
  });

  describe('frames', function() {
    it('reconstructs which node is in which frame');

    it('handles nodes in nested iframes');
  });

  describe('calling audit.after', function() {
    it('passes results with iframe ancestries');

    it('provides the options object');
  });
});
