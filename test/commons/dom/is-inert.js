describe('dom.isInert', () => {
  const html = axe.testUtils.html;
  const fixture = document.querySelector('#fixture');
  const isInert = axe.commons.dom.isInert;
  const { queryFixture, queryShadowFixture, flatTreeSetup } = axe.testUtils;

  it('returns true for element with "inert=false`', () => {
    const vNode = queryFixture('<div id="target" inert="false"></div>');

    assert.isTrue(isInert(vNode));
  });

  it('returns true for element with "inert`', () => {
    const vNode = queryFixture('<div id="target" inert></div>');

    assert.isTrue(isInert(vNode));
  });

  it('returns false for element without inert', () => {
    const vNode = queryFixture('<div id="target"></div>');

    assert.isFalse(isInert(vNode));
  });

  it('returns true for ancestor with inert', () => {
    const vNode = queryFixture(
      '<div inert><div><div id="target"></div></div></div>'
    );

    assert.isTrue(isInert(vNode));
  });

  it('returns false for closed dialog', () => {
    const vNode = queryFixture(html`
      <dialog><span>Hello</span></dialog>
      <div id="target">World</div>
    `);

    assert.isFalse(isInert(vNode));
  });

  it('returns false for non-modal dialog', () => {
    const vNode = queryFixture(html`
      <dialog open><span>Hello</span></dialog>
      <div id="target">World</div>
    `);

    assert.isFalse(isInert(vNode));
  });

  it('returns true for modal dialog', () => {
    fixture.innerHTML = html`
      <dialog id="modal"><span>Hello</span></dialog>
      <div id="target">World</div>
    `;
    document.querySelector('#modal').showModal();
    const tree = flatTreeSetup(fixture);
    const vNode = axe.utils.querySelectorAll(tree, '#target')[0];

    assert.isTrue(isInert(vNode));
  });

  it('returns false for the modal dialog element', () => {
    fixture.innerHTML = html` <dialog id="target"><span>Hello</span></dialog> `;
    document.querySelector('#target').showModal();
    const tree = flatTreeSetup(fixture);
    const vNode = axe.utils.querySelectorAll(tree, '#target')[0];

    assert.isFalse(isInert(vNode));
  });

  it('returns false for a descendant of the modal dialog', () => {
    fixture.innerHTML = html`
      <dialog id="modal"><span id="target">Hello</span></dialog>
    `;
    document.querySelector('#modal').showModal();
    const tree = flatTreeSetup(fixture);
    const vNode = axe.utils.querySelectorAll(tree, '#target')[0];

    assert.isFalse(isInert(vNode));
  });

  describe('select button/selectedcontent', () => {
    it('returns true for a button that is a direct child of select', () => {
      const vNode = queryFixture(html`
        <select>
          <button id="target"><selectedcontent></selectedcontent></button>
          <option>a</option>
        </select>
      `);

      assert.isTrue(isInert(vNode));
    });

    it('returns true for selectedcontent', () => {
      const vNode = queryFixture(html`
        <select>
          <button><selectedcontent id="target"></selectedcontent></button>
          <option>a</option>
        </select>
      `);

      assert.isTrue(isInert(vNode));
    });

    it('returns true for a descendant of the select button', () => {
      const vNode = queryFixture(html`
        <select>
          <button><span id="target">v</span></button>
          <option>a</option>
        </select>
      `);

      assert.isTrue(isInert(vNode));
    });

    it('returns false for the select element itself', () => {
      const vNode = queryFixture(html`
        <select id="target">
          <button><selectedcontent></selectedcontent></button>
          <option>a</option>
        </select>
      `);

      assert.isFalse(isInert(vNode));
    });

    it('returns false for an option inside the select', () => {
      const vNode = queryFixture(html`
        <select>
          <button><selectedcontent></selectedcontent></button>
          <option id="target">a</option>
        </select>
      `);

      assert.isFalse(isInert(vNode));
    });

    it('returns false for a button that is not inside a select', () => {
      const vNode = queryFixture('<button id="target">click</button>');

      assert.isFalse(isInert(vNode));
    });

    it('returns false for a button that is not a direct child of select', () => {
      const vNode = queryFixture(html`
        <select>
          <div><button id="target"></button></div>
          <option>a</option>
        </select>
      `);

      assert.isFalse(isInert(vNode));
    });

    it('returns true with skipAncestors true for the select button itself', () => {
      const vNode = queryFixture(html`
        <select>
          <button id="target"><selectedcontent></selectedcontent></button>
          <option>a</option>
        </select>
      `);

      assert.isTrue(isInert(vNode, { skipAncestors: true }));
    });

    it('returns false with skipAncestors true for a descendant of the select button', () => {
      const vNode = queryFixture(html`
        <select>
          <button><span id="target">v</span></button>
          <option>a</option>
        </select>
      `);

      assert.isFalse(isInert(vNode, { skipAncestors: true }));
    });

    it('returns true for a select button inside an open shadow DOM', () => {
      const vNode = queryShadowFixture(
        '<div id="shadow"></div>',
        '<select><button id="target"><selectedcontent></selectedcontent></button><option>a</option></select>'
      );

      assert.isTrue(isInert(vNode));
    });
  });

  describe('options.skipAncestors', () => {
    it('returns false for ancestor with inert', () => {
      const vNode = queryFixture(
        '<div inert><div><div id="target"></div></div></div>'
      );

      assert.isFalse(isInert(vNode, { skipAncestors: true }));
    });
  });

  describe('options.isAncestor', () => {
    it('return false for modal dialog', () => {
      fixture.innerHTML = html`
        <dialog id="modal"><span>Hello</span></dialog>
        <div id="target">World</div>
      `;
      document.querySelector('#modal').showModal();
      const tree = flatTreeSetup(fixture);
      const vNode = axe.utils.querySelectorAll(tree, '#target')[0];

      assert.isFalse(isInert(vNode, { isAncestor: true }));
    });
  });
});
