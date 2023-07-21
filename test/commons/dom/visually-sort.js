// This method is mostly tested through color-contrast integrations
describe('visually-sort', () => {
  'use strict';

  const fixture = document.querySelector('#fixture');
  const visuallySort = axe.commons.dom.visuallySort;
  const querySelectorAll = axe.utils.querySelectorAll;
  let root;

  beforeEach(() => {
    fixture.innerHTML = `
      <header id="1" style="position: absolute; z-index: 999; height: 50px; width: 100%;">
        <div id="2" style="display: flex; position: relative; height: 50px;">
          <div id="3" style="position: relative; height: 50px; width: 100%;"></div>
        </div>
      </header>
      <div id="4" style="position: absolute; z-index: 10; height: 50px; width: 100%;">
        <div id="5" style="position: absolute; transform: translate(0, -50%);">
          <div id="6">
            <div id="7" style="float: left">Text</div>
            <div id="8">Text</div>
            <span id="9">Text</span>
            <div id="10">Text</div>
            <div id="shadow-host"></div>
          </div>
        </div>
      </div>
    `;
    const shadowRoot = fixture
      .querySelector('#shadow-host')
      .attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = '<div id="shadow-child">Text</div>';
    root = axe.setup(fixture);
  });

  /*
    Array.sort() return meanings:

    compareFn(a, b) | return value sort order
    ----------------|-----------------------
    > 0             | sort a after b, e.g. [b, a]
    < 0             | sort a before b, e.g. [a, b]
    === 0           | keep original order of a and b
  */

  it('sorts a higher stack before a lower stack', () => {
    const vNodeA = querySelectorAll(root, '#1')[0];
    const vNodeB = querySelectorAll(root, '#4')[0];

    assert.isBelow(visuallySort(vNodeA, vNodeB), 0);
  });

  it('sorts a lower stack after a higher stack', () => {
    const vNodeA = querySelectorAll(root, '#4')[0];
    const vNodeB = querySelectorAll(root, '#1')[0];

    assert.isAbove(visuallySort(vNodeA, vNodeB), 0);
  });

  it('sorts a child stack before a parent stack', () => {
    const vNodeA = querySelectorAll(root, '#6')[0];
    const vNodeB = querySelectorAll(root, '#4')[0];

    assert.isBelow(visuallySort(vNodeA, vNodeB), 0);
  });

  it('sorts a parent stack after a child stack', () => {
    const vNodeA = querySelectorAll(root, '#4')[0];
    const vNodeB = querySelectorAll(root, '#6')[0];

    assert.isAbove(visuallySort(vNodeA, vNodeB), 0);
  });

  it('sorts a child of a higher stack before a child of a lower stack', () => {
    const vNodeA = querySelectorAll(root, '#3')[0];
    const vNodeB = querySelectorAll(root, '#7')[0];

    assert.isBelow(visuallySort(vNodeA, vNodeB), 0);
  });

  it('sorts a child of a lower stack after a child of a higher stack', () => {
    const vNodeA = querySelectorAll(root, '#7')[0];
    const vNodeB = querySelectorAll(root, '#3')[0];

    assert.isAbove(visuallySort(vNodeA, vNodeB), 0);
  });

  it('sorts elements by tree order when in the same stack', () => {
    const vNodeA = querySelectorAll(root, '#8')[0];
    const vNodeB = querySelectorAll(root, '#10')[0];

    assert.isAbove(visuallySort(vNodeA, vNodeB), 0);
  });

  it('sorts floated elements before other elements of the same stack', () => {
    const vNodeA = querySelectorAll(root, '#7')[0];
    const vNodeB = querySelectorAll(root, '#8')[0];

    assert.isBelow(visuallySort(vNodeA, vNodeB), 0);
  });

  it('sorts shadow DOM elements by tree order when in the same stack', () => {
    const vNodeA = querySelectorAll(root, '#8')[0];
    const vNodeB = querySelectorAll(root, '#shadow-host')[0].children[0];

    assert.isAbove(visuallySort(vNodeA, vNodeB), 0);
  });
});
