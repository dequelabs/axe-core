describe('dom.getModalDialog', () => {
  const fixture = document.querySelector('#fixture');
  const getModalDialog = axe.commons.dom.getModalDialog;
  const { flatTreeSetup } = axe.testUtils;

  it('returns a modal dialog', () => {
    fixture.innerHTML = `
      <dialog id="target"><span>Hello</span></dialog>
    `;
    document.querySelector('#target').showModal();
    const tree = flatTreeSetup(fixture);
    const vNode = axe.utils.querySelectorAll(tree, '#target')[0];

    assert.equal(getModalDialog(), vNode);
  });

  it('returns undefined for an opened dialog', () => {
    fixture.innerHTML = `
      <dialog open><span>Hello</span></dialog>
    `;
    flatTreeSetup(fixture);

    assert.isUndefined(getModalDialog());
  });

  it('returns undefined for a closed dialog', () => {
    fixture.innerHTML = `
      <dialog><span>Hello</span></dialog>
    `;
    flatTreeSetup(fixture);

    assert.isUndefined(getModalDialog());
  });

  it('returns undefined when there is no dialog', () => {
    fixture.innerHTML = `
      <div>World</div>
    `;
    flatTreeSetup(fixture);

    assert.isUndefined(getModalDialog());
  });

  it('returns undefined if the modal dialog is not visible', () => {
    fixture.innerHTML = `
      <style>dialog[open] { display: none }</style>
      <dialog id="target"><span>Hello</span></dialog>
    `;
    document.querySelector('#target').showModal();
    flatTreeSetup(fixture);

    assert.isUndefined(getModalDialog());
  });

  describe('fallback', () => {
    it('returns true for modal dialog when elementsFromPoint does not return the dialog', () => {
      fixture.innerHTML = `
        <style>dialog::backdrop { display: none; }</style>
        <dialog id="target"><span>Hello</span></dialog>
        <div>World</div>
      `;
      document.querySelector('#target').showModal();
      const tree = flatTreeSetup(fixture);
      const vNode = axe.utils.querySelectorAll(tree, '#target')[0];

      assert.equal(getModalDialog(), vNode);
    });

    it('skips checking elements with pointer-events: none', () => {
      fixture.innerHTML = `
        <style>body { pointer-events: none; } dialog::backdrop { display: none; }</style>
        <dialog id="target"><span>Hello</span></dialog>
        <div>World</div>
      `;
      document.querySelector('#target').showModal();
      flatTreeSetup(fixture);

      assert.isUndefined(getModalDialog());
    });

    it('takes into account a scrolled page', () => {
      fixture.innerHTML = `
        <style>
          dialog::backdrop { display: none; }
          #large-scroll { height: 200vh; margin-bottom: 100px; }
        </style>
        <div id="large-scroll"></div>
        <dialog id="target"><span>Hello</span></dialog>
        <div id="scroll-target">World</div>
      `;
      document.querySelector('#scroll-target').scrollIntoView();
      document.querySelector('#target').showModal();
      const tree = flatTreeSetup(fixture);
      const vNode = axe.utils.querySelectorAll(tree, '#target')[0];

      assert.equal(getModalDialog(), vNode);
    });
  });
});
