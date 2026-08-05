describe('document.elementsFromPoint pollyfills', () => {
  const html = axe.testUtils.html;

  const fixture = document.getElementById('fixture');

  afterEach(() => {
    document.getElementById('fixture').innerHTML = '';
  });

  it('ensures document.elementsFromPoint is always there', () => {
    assert.isFunction(document.elementsFromPoint);
  });

  it('returns document.elementsFromPoint if it is set', () => {
    const orig = document.elementsFromPoint;
    document.elementsFromPoint = () => {
      return 123;
    };

    const elmFromPt = axe.utils.pollyfillElementsFromPoint();
    assert.equal(elmFromPt(), 123);
    document.elementsFromPoint = orig;
  });

  it('returns document.msElementsFromPoint if elementsFromPoint is undefined', () => {
    const orig = document.elementsFromPoint;
    const msOrig = document.msElementsFromPoint;

    document.elementsFromPoint = undefined;
    document.msElementsFromPoint = () => {
      return 123;
    };

    const elmFromPt = axe.utils.pollyfillElementsFromPoint();
    assert.equal(elmFromPt(), 123);

    document.elementsFromPoint = orig;
    document.msElementsFromPoint = msOrig;
  });

  it('returns the pollyfill no native function is available', () => {
    const orig = document.elementsFromPoint;
    const msOrig = document.msElementsFromPoint;

    document.elementsFromPoint = undefined;
    document.msElementsFromPoint = undefined;

    const elmFromPt = axe.utils.pollyfillElementsFromPoint();
    assert.isFunction(elmFromPt);

    document.elementsFromPoint = orig;
    document.msElementsFromPoint = msOrig;
  });

  describe('pollyfill function', () => {
    let orig, msOrig;
    before(() => {
      orig = document.elementsFromPoint;
      msOrig = document.msElementsFromPoint;

      document.elementsFromPoint = undefined;
      document.msElementsFromPoint = undefined;

      document.elementsFromPoint = axe.utils.pollyfillElementsFromPoint();
    });

    after(() => {
      document.elementsFromPoint = orig;
      document.msElementsFromPoint = msOrig;
    });

    it('should return positioned elements properly', () => {
      fixture.innerHTML = html`
        <div
          id="container"
          style="position: absolute; top: 0px; left: 0px; height: 100px; 
        width: 90px; background-color: rgba(0, 128, 0, 0.5);"
        >
          <div
            id="pos"
            style="position: absolute; top: 50px; left: 40px; height: 40px; 
        width: 30px; background-color: rgba(0, 128, 0, 0.5);"
          ></div>
          <div
            id="parent"
            style="position: absolute; top: 0px; left: 0px; height: 40px; 
        width: 30px; background-color: rgba(0, 128, 0, 0.5);"
          >
            <div
              id="target"
              style="position: absolute; top: 60px; left: 45px; height: 20px; 
        width: 15px; background-color: rgba(0, 128, 0, 0.5);"
            ></div>
          </div>
        </div>
      `;
      const target = fixture.querySelector('#target');
      const pos = fixture.querySelector('#pos');
      const container = fixture.querySelector('#container');

      target.scrollIntoView();
      const rect = target.getBoundingClientRect();

      const visualParents = document.elementsFromPoint(
        Math.ceil(rect.left + 1),
        Math.ceil(rect.top + 1)
      );
      assert.deepEqual(visualParents.slice(0, 3), [target, pos, container]);
    });

    it('should return inline elements properly', () => {
      fixture.innerHTML = html`
        <div
          id="container"
          style="position: absolute; top: 0px; left: 0px; height: 100px; 
        width: 90px; background-color: rgba(0, 128, 0, 0.5);"
        >
          <span
            id="pos"
            style="position: absolute; top: 60px; left: 45px;
        background-color: rgba(0, 128, 0, 0.5);"
            >Text goes here</span
          >
          <span
            id="parent"
            style="position: absolute; top: 0px; left: 0px;
        background-color: rgba(0, 128, 0, 0.5);"
          >
            <span
              id="target"
              style="position: absolute; top: 60px; left: 45px;
        background-color: rgba(0, 128, 0, 0.5);"
              >Text goes here
            </span></span
          >
        </div>
      `;
      const target = fixture.querySelector('#target');
      const pos = fixture.querySelector('#pos');
      const container = fixture.querySelector('#container');

      target.scrollIntoView();
      const rect = target.getBoundingClientRect();

      const visualParents = document.elementsFromPoint(
        Math.ceil(rect.left + 1),
        Math.ceil(rect.top + 1)
      );
      assert.deepEqual(visualParents.slice(0, 3), [target, pos, container]);
    });

    it('should return normal flow elements properly', () => {
      fixture.innerHTML = html`
        <div
          id="parent"
          style="background-color: rgba(0, 128, 0, 0.5); height: 40px; width: 30px;"
        >
          <div
            id="target"
            style="background-color: rgba(0, 128, 0, 0.5); height: 20px; width: 15px;"
          ></div>
        </div>
      `;
      const target = fixture.querySelector('#target');
      const parent = fixture.querySelector('#parent');

      target.scrollIntoView();
      const rect = target.getBoundingClientRect();

      const visualParents = document.elementsFromPoint(
        Math.ceil(rect.left),
        Math.ceil(rect.top)
      );
      assert.deepEqual(visualParents.slice(0, 3), [target, parent, fixture]);
    });

    it('returns elements with negative z-index after the body', () => {
      fixture.innerHTML = html`
        <div id="target" style="z-index:-1; position:absolute;">Target!</div>
        <div id="sibling">Some text</div>
      `;
      const target = fixture.querySelector('#target');

      target.scrollIntoView();
      const rect = target.getBoundingClientRect();

      const visualParents = document.elementsFromPoint(
        Math.ceil(rect.left),
        Math.ceil(rect.top)
      );

      // Last two element should be: body, target (due to z-index:-1), html
      assert.deepEqual(visualParents.slice(-3), [
        document.body,
        target,
        document.documentElement
      ]);
    });
  });
});
