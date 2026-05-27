describe('dom.visuallyContains', () => {
  const html = axe.testUtils.html;

  const fixture = document.getElementById('fixture');
  const queryFixture = axe.testUtils.queryFixture;

  afterEach(() => {
    document.getElementById('fixture').innerHTML = '';
  });

  it('should return true when element is trivially contained', () => {
    const target = queryFixture(html`
      <div style="height: 40px; width: 30px; background-color: red;">
        <div
          id="target"
          style="height: 20px; width: 15px; background-color: green;"
        ></div>
      </div>
    `);
    assert.isTrue(
      axe.commons.dom.visuallyContains(
        target.actualNode,
        target.parent.actualNode
      )
    );
  });

  it('should return false when overflow is hidden', () => {
    const target = queryFixture(html`
      <div
        style="height: 20px; width: 30px; background-color: red; overflow: hidden;"
      >
        <div
          id="target"
          style="height:20px; top: 25px; width: 45px; background-color: green; position:absolute;"
        ></div>
      </div>
    `);
    const result = axe.commons.dom.visuallyContains(
      target.actualNode,
      target.parent.actualNode
    );
    assert.isFalse(result);
  });

  it('should return false when absolutely positioned content does not overlap', () => {
    const target = queryFixture(html`
      <div style="height:20px; width:30px; background-color:red;">
        <div
          id="target"
          style="height:20px; top:25px; width:45px; background-color:green; position:absolute;"
        >
          Text
        </div>
      </div>
    `);
    const result = axe.commons.dom.visuallyContains(
      target.actualNode,
      target.parent.actualNode
    );
    assert.isFalse(result);
  });

  it('should return false when element is outside of margin', () => {
    const target = queryFixture(html`
      <div
        style="height: 40px; width: 30px; margin-left: 30px; background-color: red;"
      >
        <div
          id="target"
          style="height: 20px; width: 45px; margin-left: -20px; background-color: green;"
        ></div>
      </div>
    `);
    assert.isFalse(
      axe.commons.dom.visuallyContains(
        target.actualNode,
        target.parent.actualNode
      )
    );
  });

  it('should return false when overflow is visible', () => {
    const target = queryFixture(html`
      <div
        style="height: 40px; width: 30px; background-color: red; overflow: visible;"
      >
        <div
          id="target"
          style="height: 20px; width: 45px; background-color: green;"
        ></div>
      </div>
    `);
    assert.isFalse(
      axe.commons.dom.visuallyContains(
        target.actualNode,
        target.parent.actualNode
      )
    );
  });

  it('should return true when element is scrollable', () => {
    const target = queryFixture(html`
      <div
        style="height: 40px; width: 30px; background-color: red; overflow: scroll;"
      >
        <div
          id="target"
          style="height: 20px; width: 45px; background-color: green;"
        ></div>
      </div>
    `);
    assert.isTrue(
      axe.commons.dom.visuallyContains(
        target.actualNode,
        target.parent.actualNode
      )
    );
  });

  it('should return true when element is inline', () => {
    // result depends on the display property of the element
    const target = queryFixture(html`
      <label> My label <input type="text" id="target" /> </label>
    `);
    assert.isTrue(
      axe.commons.dom.visuallyContains(
        target.actualNode,
        target.parent.actualNode
      )
    );
  });

  it('should return false when element is partially contained', () => {
    const target = queryFixture(html`
      <div style="background-color:red; height:20px;">
        <p id="target" style="margin:0; position:absolute;">
          Text<br />more text
        </p>
      </div>
    `);
    const result = axe.commons.dom.visuallyContains(
      target.actualNode,
      target.parent.actualNode
    );
    assert.isFalse(result);
  });

  it('should return true when element is contained by scroll region', () => {
    const target = queryFixture(html`
      <div id="parent">
        <div style="overflow: scroll; height: 200px;">
          <div style="margin-top: 400px; height: 10px;"></div>
          <p id="target">Text</p>
        </div>
      </div>
    `);
    const parent = fixture.querySelector('#parent');
    const result = axe.commons.dom.visuallyContains(target.actualNode, parent);
    assert.isTrue(result);
  });

  it('should return true for child with truncated text', () => {
    const target = queryFixture(html`
      <p
        style="max-width: 200px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;"
      >
        <span id="target"
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
          sollicitudin quam. Fuscemi odio, egestas pulvinar erat eget, vehicula
          tempus est. Proin vitae ullamcorper velit. Donec sagittis est justo,
          mattis iaculis arcu facilisis id. Proin pulvinar ornare arcu a
          fermentum. Quisque et dignissim nulla,sit amet consectetur ipsum.
          Donec in libero porttitor, dapibus neque imperdiet, aliquam est.
          Vivamus blandit volutpat fringilla. In mi magna, mollis sit amet
          imperdiet eu, rutrum ut tellus. Mauris vel condimentum nibh, quis
          ultricies nisi. Vivamus accumsan quam mauris, id iaculis quam
          fringilla ac. Curabitur pulvinar dolor ac magna vehicula, non auctor
          ligula dignissim. Nam ac nibh porttitor, malesuada tortor varius,
          feugiat turpis. Mauris dapibus, tellus ut viverra porta, ipsum turpis
          bibendum ligula, at tempor felis ante non libero.</span
        >
      </p>
    `);
    const result = axe.commons.dom.visuallyContains(
      target.actualNode,
      target.parent.actualNode
    );
    assert.isTrue(result);
  });

  it('should return false if element is outside overflow hidden', () => {
    const target = queryFixture(html`
      <div id="parent" style="width: 200px; height: 200px; overflow: hidden;">
        <div id="target" style="margin-top: 300px;">Some text</div>
      </div>
    `);

    const parent = fixture.querySelector('#parent');
    const result = axe.commons.dom.visuallyContains(target.actualNode, parent);
    assert.isFalse(result);
  });

  it('should allow subpixel contains due to rounding', () => {
    const target = queryFixture(html`
      <div id="parent" style="width: 200px; height: 200px;">
        <div
          id="target"
          style="margin-left: -0.1px; margin-top: -0.9px; width: 200.5px; height: 200.9px"
        >
          Some text
        </div>
      </div>
    `);

    const parent = fixture.querySelector('#parent');
    const result = axe.commons.dom.visuallyContains(target.actualNode, parent);
    assert.isTrue(result);
  });

  it('should return true when element is visually contained across shadow boundary', () => {
    fixture.innerHTML =
      '<div style="height:40px; background-color:red;" id="container"></div>';
    const container = fixture.querySelector('#container');
    const shadow = container.attachShadow({ mode: 'open' });
    shadow.innerHTML =
      '<div id="target" style="height: 20px; width: 45px; background-color: green;"></div>';
    axe.testUtils.flatTreeSetup(fixture);
    const target = shadow.querySelector('#target');
    const result = axe.commons.dom.visuallyContains(target, container);
    assert.isTrue(result);
  });

  it('should return true when element is contained by scroll region across shadow boundary', () => {
    fixture.innerHTML = html`
      <div id="parent">
        <div style="overflow: scroll; height: 200px;">
          <div style="margin-top: 400px; height: 10px;"></div>
          <div id="container"></div>
        </div>
      </div>
    `;
    const container = fixture.querySelector('#container');
    const shadow = container.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<p id="target">Text</p>';
    axe.testUtils.flatTreeSetup(fixture);
    const target = shadow.querySelector('#target');
    const parent = fixture.querySelector('#parent');
    const result = axe.commons.dom.visuallyContains(target, parent);
    assert.isTrue(result);
  });

  it('should return false when element is not visually contained across shadow boundary', () => {
    fixture.innerHTML =
      '<div id="container" style="height:20px;background-color:red;overflow:hidden;"></div>';
    const container = fixture.querySelector('#container');
    const shadow = container.attachShadow({ mode: 'open' });
    shadow.innerHTML =
      '<div id="target" style="top:20px;height:20px;background-color:green;position:absolute;"><div>';
    axe.testUtils.flatTreeSetup(fixture);
    const target = shadow.querySelector('#target');
    const result = axe.commons.dom.visuallyContains(target, container);
    assert.isFalse(result);
  });

  it('should return false when element is absolutely positioned off of background across shadow boundary', () => {
    fixture.innerHTML =
      '<div id="container" style="background-color:black; height:20px;"></div>';
    const container = fixture.querySelector('#container');
    const shadow = container.attachShadow({ mode: 'open' });
    shadow.innerHTML =
      '<div id="shadowTarget" style="color:#333; height:20px; position:absolute; top:20px;">Text</div>';
    axe.testUtils.flatTreeSetup(fixture);
    const target = shadow.querySelector('#shadowTarget');
    const result = axe.commons.dom.visuallyContains(target, container);
    assert.isFalse(result);
  });

  it('should return false when element is partially positioned off of background across shadow boundary', () => {
    fixture.innerHTML =
      '<div id="container" style="background-color:black; height:20px; position:relative;"></div>';
    const container = fixture.querySelector('#container');
    const shadow = container.attachShadow({ mode: 'open' });
    shadow.innerHTML =
      '<div id="shadowTarget" style="color:#333; height:20px; position:absolute; top:10px;">Text</div>';
    axe.testUtils.flatTreeSetup(fixture);
    const target = shadow.querySelector('#shadowTarget');
    const result = axe.commons.dom.visuallyContains(target, container);
    assert.isFalse(result);
  });
});
