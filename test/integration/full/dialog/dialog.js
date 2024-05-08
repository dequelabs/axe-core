describe('dialog tests', () => {
  const dialog = document.querySelector('dialog');
  const target = document.querySelector('#target');

  async function getViolations() {
    const results = await axe.run(target);
    const buttonName = results.violations.find(
      ({ id }) => id === 'button-name'
    );
    const colorContrast = results.violations.find(
      ({ id }) => id === 'color-contrast'
    );

    return { buttonName, colorContrast };
  }

  afterEach(function () {
    dialog.close();
  });

  it('should not find violations inside a closed dialog', async () => {
    // DAISY-AXE
    //, colorContrast
    const { buttonName } = await getViolations();

    assert.lengthOf(buttonName.nodes, 1);
    assert.deepEqual(buttonName.nodes[0].target, ['#root-button']);
    // DAISY-AXE
    // assert.lengthOf(colorContrast.nodes, 1);
    // assert.deepEqual(colorContrast.nodes[0].target, ['#root-color']);
  });

  it('should not find violations outside a modal dialog', async () => {
    dialog.showModal();
    // DAISY-AXE
    //, colorContrast
    const { buttonName } = await getViolations();

    assert.lengthOf(buttonName.nodes, 1);
    assert.deepEqual(buttonName.nodes[0].target, ['#dialog-button']);
    // DAISY-AXE
    // assert.lengthOf(colorContrast.nodes, 1);
    // assert.deepEqual(colorContrast.nodes[0].target, ['#dialog-color']);
  });

  it('should find violations inside and outside an open dialog', async () => {
    dialog.show();
    // DAISY-AXE
    //, colorContrast
    const { buttonName } = await getViolations();

    assert.lengthOf(buttonName.nodes, 2);
    assert.deepEqual(buttonName.nodes[0].target, ['#root-button']);
    assert.deepEqual(buttonName.nodes[1].target, ['#dialog-button']);
    // DAISY-AXE
    // assert.lengthOf(colorContrast.nodes, 2);
    // assert.deepEqual(colorContrast.nodes[0].target, ['#root-color']);
    // assert.deepEqual(colorContrast.nodes[1].target, ['#dialog-color']);
  });
});
