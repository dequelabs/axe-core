describe('object-is-loaded-matches', () => {
  let rule, fixture;
  const data = `data:text/html,Object%20content`;

  // Give enough time for the browser to load / decide it cannot load objects
  async function delayedQueryFixture(html, delay = 250) {
    fixture.innerHTML = html;
    await new Promise(r => setTimeout(r, delay));
    const tree = axe.setup();
    return axe.utils.querySelectorAll(tree, '#target')[0];
  }

  before(() => {
    fixture = document.querySelector('#fixture');
    rule = axe.utils.getRule('object-alt');
  });

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it(`returns true objects with hidden fallback content`, async () => {
    const vNode = await delayedQueryFixture(
      `<object data="${data}" height="30" id="target">
          Fallback content
        </object>`
    );
    assert.isTrue(rule.matches(vNode.actualNode, vNode));
  });

  it(`returns false if the object shows any content`, async () => {
    const vNode = await delayedQueryFixture(
      `<object data="invalid" height="30" id="target">
          Fallback content
        </object>`
    );
    assert.isFalse(rule.matches(vNode.actualNode, vNode));
  });

  it(`returns true if the object shows no content`, async () => {
    const vNode = await delayedQueryFixture(
      `<object data="invalid" height="30" id="target"></object>`
    );
    // Ideally, this should be false, don't know it can be done
    assert.isTrue(rule.matches(vNode.actualNode, vNode));
  });

  it(`returns false if the object has a role that doesn't require a name`, async () => {
    const vNode = await delayedQueryFixture(
      `<object data="${data}" height="30" id="target" role="grid">
          Fallback content
        </object>`
    );
    assert.isFalse(rule.matches(vNode.actualNode, vNode));
  });
});
