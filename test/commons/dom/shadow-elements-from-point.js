describe('dom.shadowElementsFromPoint', () => {
  const html = axe.testUtils.html;

  const fixture = document.getElementById('fixture');

  afterEach(() => {
    document.getElementById('fixture').innerHTML = '';
  });

  it('should return an array from inside and outside of shadow dom', () => {
    fixture.innerHTML =
      '<div id="container" style="background-color:#000;position:relative;"></div>';
    const container = fixture.querySelector('#container');
    const shadow1 = container.attachShadow({ mode: 'open' });
    shadow1.innerHTML = html`
      <p style="background-color:red;">Text</p>
      <div id="shadowHost2" style="position:absolute;"></div>
    `;
    const paragraph = shadow1.querySelector('p');
    const container2 = shadow1.querySelector('#shadowHost2');
    const shadow2 = container2.attachShadow({ mode: 'open' });
    shadow2.innerHTML = '<span>Text</span>';
    const shadowSpan = shadow2.querySelector('span');
    axe.testUtils.flatTreeSetup(fixture);

    container.scrollIntoView();

    const spanCoords = shadowSpan.getBoundingClientRect();
    const result = axe.commons.dom.shadowElementsFromPoint(
      spanCoords.x,
      spanCoords.y
    );
    const pCoords = paragraph.getBoundingClientRect();
    const result2 = axe.commons.dom.shadowElementsFromPoint(
      pCoords.x,
      pCoords.y
    );

    assert.includeMembers(result, [shadowSpan, container2]);
    assert.notInclude(result, paragraph);
    assert.includeMembers(result2, [paragraph, container]);
    assert.notInclude(result2, shadowSpan);
  });

  it('does not throw when elementsFromPoints returns null', () => {
    const mockDocument = {
      elementsFromPoint: () => {
        return null;
      }
    };
    let out;
    assert.doesNotThrow(() => {
      out = axe.commons.dom.shadowElementsFromPoint(10, 10, mockDocument);
    });
    assert.deepEqual(out, []);
  });
});
