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

  it('returns null for an opened dialog', () => {
    fixture.innerHTML = `
      <dialog open><span>Hello</span></dialog>
    `;
    flatTreeSetup(fixture);

    assert.isNull(getModalDialog());
  });

  it('returns null for a closed dialog', () => {
    fixture.innerHTML = `
      <dialog><span>Hello</span></dialog>
    `;
    flatTreeSetup(fixture);

    assert.isNull(getModalDialog());
  });

  it('returns null when there is no dialog', () => {
    fixture.innerHTML = `
      <div>World</div>
    `;
    flatTreeSetup(fixture);

    assert.isNull(getModalDialog());
  });

  it('returns null if the modal dialog is not visible', () => {
    fixture.innerHTML = `
      <style>dialog[open] { display: none }</style>
      <dialog id="target"><span>Hello</span></dialog>
    `;
    document.querySelector('#target').showModal();
    flatTreeSetup(fixture);

    assert.isNull(getModalDialog());
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

      assert.isNull(getModalDialog());
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

    it('returns the modal dialog when two dialogs are open', () => {
      fixture.innerHTML = `
        <style>dialog::backdrop { display: none; }</style>
        <dialog id="not-modal" open><span>Hello</span></dialog>
        <dialog id="target"><span>Hello</span></dialog>
        <div>World</div>
      `;
      document.querySelector('#target').showModal();
      const tree = flatTreeSetup(fixture);
      const vNode = axe.utils.querySelectorAll(tree, '#target')[0];

      assert.equal(getModalDialog(), vNode);
    });

    it('returns the outer modal when a dialog modal contains a non-dialog modal', () => {
      fixture.innerHTML = `
        <style>dialog::backdrop { display: none; }</style>
        <dialog id="target">
          <span>Hello</span>
          <dialog open>Open modal</dialog>
        </dialog>
        <div>World</div>
      `;
      document.querySelector('#target').showModal();
      const tree = flatTreeSetup(fixture);
      const vNode = axe.utils.querySelectorAll(tree, '#target')[0];

      assert.equal(getModalDialog(), vNode);
    });
  });
});
