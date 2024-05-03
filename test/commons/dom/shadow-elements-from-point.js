describe('dom.shadowElementsFromPoint', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let shadowSupported = axe.testUtils.shadowSupport.v1;

  afterEach(function () {
    document.getElementById('fixture').innerHTML = '';
  });

  (shadowSupported ? it : xit)(
    'should return an array from inside and outside of shadow dom',
    function () {
      fixture.innerHTML =
        '<div id="container" style="background-color:#000;position:relative;"></div>';
      let container = fixture.querySelector('#container');
      let shadow1 = container.attachShadow({ mode: 'open' });
      shadow1.innerHTML =
        '<p style="background-color:red;">Text</p>' +
        '<div id="shadowHost2" style="position:absolute;"></div>';
      let paragraph = shadow1.querySelector('p');
      let container2 = shadow1.querySelector('#shadowHost2');
      let shadow2 = container2.attachShadow({ mode: 'open' });
      shadow2.innerHTML = '<span>Text</span>';
      let shadowSpan = shadow2.querySelector('span');
      axe.testUtils.flatTreeSetup(fixture);

      container.scrollIntoView();

      let spanCoords = shadowSpan.getBoundingClientRect();
      let result = axe.commons.dom.shadowElementsFromPoint(
        spanCoords.x,
        spanCoords.y
      );
      let pCoords = paragraph.getBoundingClientRect();
      let result2 = axe.commons.dom.shadowElementsFromPoint(
        pCoords.x,
        pCoords.y
      );

      assert.includeMembers(result, [shadowSpan, container2]);
      assert.notInclude(result, paragraph);
      assert.includeMembers(result2, [paragraph, container]);
      assert.notInclude(result2, shadowSpan);
    }
  );

  it('does not throw when elementsFromPoints returns null', function () {
    let mockDocument = {
      elementsFromPoint: function () {
        return null;
      }
    };
    let out;
    assert.doesNotThrow(function () {
      out = axe.commons.dom.shadowElementsFromPoint(10, 10, mockDocument);
    });
    assert.deepEqual(out, []);
  });
});
