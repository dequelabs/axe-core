describe('aria.namedFromContents', function () {
  var aria = axe.commons.aria;
  var namedFromContents = aria.namedFromContents;
  var fixture = document.querySelector('#fixture');
  var flatTreeSetup = axe.testUtils.flatTreeSetup;

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('returns true when the element has an explicit role named from content', function () {
    fixture.innerHTML = '<div role="foo"></div>';
    flatTreeSetup(fixture);
    assert.isTrue(namedFromContents(fixture.firstChild));
  });

  it('works on virtual nodes', function () {
    var vNode = axe.testUtils.queryFixture(
      '<div id="target" role="foo"></div>'
    );
    assert.isTrue(namedFromContents(vNode));
  });

  it('returns true when the element has an implicit role named from content', function () {
    fixture.innerHTML = '<h1>foo</h1>';
    flatTreeSetup(fixture);
    assert.isTrue(namedFromContents(fixture.firstChild));
  });

  it('returns false when the element has a role not named from content', function () {
    fixture.innerHTML = '<main role="main"></main>';
    flatTreeSetup(fixture);
    assert.isFalse(namedFromContents(fixture.firstChild));
  });

  it('returns false node is not a DOM element', function () {
    fixture.innerHTML = 'text node';
    flatTreeSetup(fixture);
    assert.isFalse(namedFromContents(fixture.firstChild));
  });

  describe('{ strict: false }', function () {
    it('returns true when the element has no role named from content', function () {
      fixture.innerHTML = '<div>foo</div>';
      flatTreeSetup(fixture);
      assert.isNull(aria.getRole(fixture.firstChild));
      assert.isTrue(namedFromContents(fixture.firstChild, { strict: false }));
    });

    it('is default for aria.namedFromContents', function () {
      fixture.innerHTML = '<div>foo</div>';
      flatTreeSetup(fixture);
      assert.isNull(aria.getRole(fixture.firstChild));
      assert.isTrue(namedFromContents(fixture.firstChild));
    });

    it('returns true when the element has role=presentation', function () {
      fixture.innerHTML = '<div role="presentation">foo</div>';
      flatTreeSetup(fixture);
      assert.isTrue(namedFromContents(fixture.firstChild, { strict: false }));
    });

    it('returns true when the element has role=none', function () {
      fixture.innerHTML = '<div role="none">foo</div>';
      flatTreeSetup(fixture);
      assert.isTrue(namedFromContents(fixture.firstChild, { strict: false }));
    });

    it('returns true when the implicit role is null', function () {
      fixture.innerHTML = '<div role="bar">foo</div>';
      flatTreeSetup(fixture);
      assert.isTrue(namedFromContents(fixture.firstChild, { strict: false }));
    });
  });

  describe('{ strict: true }', function () {
    it('returns false when the element has no role named from content', function () {
      fixture.innerHTML = '<div>foo</div>';
      flatTreeSetup(fixture);
      assert.isNull(aria.getRole(fixture.firstChild));
      assert.isFalse(namedFromContents(fixture.firstChild, { strict: true }));
    });

    it('returns false when the element has role=presentation', function () {
      fixture.innerHTML = '<div role="presentation">foo</div>';
      flatTreeSetup(fixture);
      assert.isFalse(namedFromContents(fixture.firstChild, { strict: true }));
    });

    it('returns false when the element has role=none', function () {
      fixture.innerHTML = '<div role="none">foo</div>';
      flatTreeSetup(fixture);
      assert.isFalse(namedFromContents(fixture.firstChild, { strict: true }));
    });
  });
});
