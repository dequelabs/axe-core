describe('dom.visuallyOverlaps', () => {
  const html = axe.testUtils.html;

  const fixture = document.getElementById('fixture');

  afterEach(() => {
    document.getElementById('fixture').innerHTML = '';
  });

  it('should return true when element is trivially contained', () => {
    fixture.innerHTML = html`
      <div style="height: 40px; width: 30px; background-color: red;">
        <div
          id="target"
          style="height: 20px; width: 15px; background-color: green;"
        ></div>
      </div>
    `;
    const target = fixture.querySelector('#target');
    const targetRect = target.getBoundingClientRect();
    assert.isTrue(
      axe.commons.dom.visuallyOverlaps(targetRect, target.parentNode)
    );
  });

  it('should return false when rect has no overlap', () => {
    fixture.innerHTML = html`
      <div
        style="position: absolute; top: 0px; left: 0px; height: 40px;
       width: 30px; background-color: red;"
      >
        <div
          id="target"
          style="position: absolute; top: 50px; left: 0px; height: 20px;
       width: 45px; background-color: green;"
        ></div>
      </div>
    `;
    const target = fixture.querySelector('#target');
    const targetRect = target.getBoundingClientRect();

    assert.isFalse(
      axe.commons.dom.visuallyOverlaps(targetRect, target.parentNode)
    );
  });

  it('should return true when rect has overlap', () => {
    fixture.innerHTML = html`
      <div
        style="position: absolute; top: 0px; left: 0px;; height: 40px; width: 30px;
       background-color: red;"
      >
        <div
          id="target"
          style="position: absolute; top: 0px; left: 0px; height: 20px;
       width: 45px; background-color: green;"
        ></div>
      </div>
    `;
    const target = fixture.querySelector('#target');
    const targetRect = target.getBoundingClientRect();
    assert.isTrue(
      axe.commons.dom.visuallyOverlaps(targetRect, target.parentNode)
    );
  });

  it('should return true when container is scrollable and rect is in the scroll area', () => {
    fixture.innerHTML = html`
      <div
        style="position: relative; height: 40px; width: 30px; overflow: scroll;"
      >
        <div
          id="target"
          style="position: absolute; top: 60px; height: 20px; width: 45px;"
        ></div>
      </div>
    `;
    const target = fixture.querySelector('#target');
    const targetRect = target.getBoundingClientRect();
    assert.isTrue(
      axe.commons.dom.visuallyOverlaps(targetRect, target.parentNode)
    );
  });

  it('should return false when container has overflow hidden and rect is in the scroll area', () => {
    fixture.innerHTML = html`
      <div
        style="position: relative; height: 40px; width: 30px; overflow: hidden;"
      >
        <div
          id="target"
          style="position: absolute; top: 60px; height: 20px; width: 45px;"
        ></div>
      </div>
    `;
    const target = fixture.querySelector('#target');
    const targetRect = target.getBoundingClientRect();
    assert.isFalse(
      axe.commons.dom.visuallyOverlaps(targetRect, target.parentNode)
    );
  });
});
