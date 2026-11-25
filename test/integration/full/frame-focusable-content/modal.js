describe('frame-focusable-content modal dialogs', () => {
  const fixture = document.querySelector('#fixture');
  let expectations;

  before(async () => {
    const response = await fetch('modal.json');
    assert.isTrue(response.ok);
    expectations = await response.json();
  });

  beforeEach(async () => {
    document
      .querySelector('#modal-host')
      .shadowRoot.querySelector('dialog')
      .close();
    fixture.innerHTML = document.querySelector('#modal-fixture').innerHTML;
    await Promise.all(
      Array.from(fixture.querySelectorAll('iframe')).map(frame => {
        return new Promise(resolve => {
          frame.addEventListener('load', resolve, { once: true });
        });
      })
    );
  });

  async function assertOutcome(name) {
    const results = await axe.run(fixture, { runOnly: expectations.rule });
    const expected = expectations[name];
    ['violations', 'passes', 'incomplete'].forEach(collection => {
      const targets = results[collection].flatMap(result => {
        return result.nodes.map(node => node.target);
      });
      assert.deepEqual(targets, expected[collection] || [], collection);
    });
    assert.deepEqual(
      results.inapplicable.map(result => result.id),
      expected.inapplicable || [],
      'inapplicable'
    );
  }

  it('makes frames blocked by showModal() inapplicable', async () => {
    const dialog = fixture.querySelector('#first-modal');
    // Keep only background frames so the rule has no applicable targets.
    dialog.querySelector('iframe').remove();
    dialog.showModal();

    await assertOutcome('inapplicable');
  });

  it('fails a negative-tabindex frame inside the active modal', async () => {
    fixture.querySelector('#first-modal').showModal();

    const results = await axe.run(fixture, { runOnly: expectations.rule });
    const targets = results.violations.flatMap(result => {
      return result.nodes.map(node => node.target);
    });
    assert.deepInclude(targets, expectations['first-modal'].violations[0]);
    assert.isEmpty(results.passes);
    assert.isEmpty(results.incomplete);
  });

  it('fails background frames when a nonmodal dialog uses show()', async () => {
    const dialog = fixture.querySelector('#first-modal');
    dialog.querySelector('iframe').remove();
    dialog.show();

    await assertOutcome('background');
  });

  it('fails background frames when a nonmodal dialog has open', async () => {
    const dialog = fixture.querySelector('#first-modal');
    dialog.querySelector('iframe').remove();
    dialog.open = true;

    await assertOutcome('background');
  });

  it('restores violations after closing the modal while tabindex stays negative', async () => {
    const dialog = fixture.querySelector('#first-modal');
    dialog.showModal();
    await axe.run(fixture, { runOnly: expectations.rule });
    dialog.close();

    assert.equal(fixture.querySelector('#background-frame').tabIndex, -1);
    await assertOutcome('background');
  });

  it('keeps explicitly inert frames inapplicable', async () => {
    fixture.querySelector('#background-frame').inert = true;
    fixture.querySelector('#sibling-frame').inert = true;

    await assertOutcome('inapplicable');
  });

  it('uses the topmost modal when activation order differs from DOM order', async () => {
    const first = fixture.querySelector('#first-modal');
    const second = fixture.querySelector('#second-modal');
    second.showModal();
    first.showModal();

    await assertOutcome('first-modal');
    first.close();
    await assertOutcome('second-modal');
  });

  it('makes frames blocked by a shadow-root modal inapplicable', async () => {
    document
      .querySelector('#modal-host')
      .shadowRoot.querySelector('dialog')
      .showModal();

    await assertOutcome('inapplicable');
  });

  it('does not let an iframe-local modal block sibling frames in the parent', async () => {
    fixture
      .querySelector('#background-frame')
      .contentDocument.querySelector('dialog')
      .showModal();

    const results = await axe.run(fixture, { runOnly: expectations.rule });
    const targets = results.violations.flatMap(result => {
      return result.nodes.map(node => node.target);
    });
    assert.deepInclude(targets, expectations.background.violations[1]);
  });
});
