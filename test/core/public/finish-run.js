describe('axe.finishRun', function () {
  it('takes partial results and outputs a finished report');

  it('uses option.reporter to create the report');

  it('can report violations results');

  it('can report passes results');

  it('can report inapplicable results');

  it('can report incomplete results');

  describe('frames', function () {
    it('reconstructs which node is in which frame');

    it('handles nodes in nested iframes');
  });

  describe('calling audit.after', function () {
    it('passes results with iframe ancestries');

    it('provides the options object');
  });
});
