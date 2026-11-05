describe('select button visibility', () => {
  const { fixture } = axe.testUtils;

  function createSelect(appearance) {
    const select = document.createElement('select');
    select.style.appearance = appearance;
    const firstButton = document.createElement('button');
    firstButton.id = 'first-button';
    const secondButton = document.createElement('button');
    secondButton.id = 'second-button';
    const wrapper = document.createElement('span');
    const wrappedButton = document.createElement('button');
    wrappedButton.id = 'wrapped-button';
    wrapper.appendChild(wrappedButton);
    const option = document.createElement('option');
    option.textContent = 'Apple';
    select.append(firstButton, secondButton, wrapper, option);
    fixture.appendChild(select);
    return select;
  }

  it('should exclude buttons inside a native select from button-name results', async () => {
    createSelect('auto');
    const results = await axe.run(fixture, { runOnly: ['button-name'] });

    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.incomplete, 0);
    assert.equal(results.inapplicable[0].id, 'button-name');
  });

  (CSS.supports('appearance: base-select') ? it : xit)(
    'should check later and wrapped buttons in a customizable select',
    async () => {
      const style = document.createElement('style');
      style.textContent = 'select::picker(select) { appearance: base-select; }';
      fixture.appendChild(style);
      createSelect('base-select');
      const results = await axe.run(fixture, { runOnly: ['button-name'] });

      assert.lengthOf(results.violations, 1);
      assert.deepEqual(
        results.violations[0].nodes.map(node => node.target),
        [['#second-button'], ['#wrapped-button']]
      );
      assert.lengthOf(results.passes, 0);
      assert.lengthOf(results.incomplete, 0);
    }
  );
});
