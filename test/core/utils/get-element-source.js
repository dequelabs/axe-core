describe('axe.utils.getElementSource', () => {
  const html = axe.testUtils.html;
  const getElementSource = axe.utils.getElementSource;
  const queryFixture = axe.testUtils.queryFixture;

  afterEach(() => {
    axe.reset();
  });

  it('should be exposed to utils', () => {
    assert.equal(typeof axe.utils.getElementSource, 'function');
  });

  it('should return empty string for null/undefined element', () => {
    assert.equal(getElementSource(null), '');
    assert.equal(getElementSource(undefined), '');
  });

  it('should return nodeValue for text nodes', () => {
    const vNode = queryFixture('<div id="target">Hello world</div>');
    const textNode = vNode.actualNode.firstChild;
    assert.equal(textNode.nodeType, 3);
    assert.equal(getElementSource(textNode), 'Hello world');
  });

  it('should return nodeValue for comment nodes', () => {
    const vNode = queryFixture(
      '<div id="target"><!-- example comment --></div>'
    );
    const commentNode = vNode.actualNode.firstChild;
    assert.equal(commentNode.nodeType, 8);
    assert.equal(getElementSource(commentNode), ' example comment ');
  });

  it('should truncate long nodeValue for non-element nodes', () => {
    const textNode = document.createTextNode('x'.repeat(500));
    const result = getElementSource(textNode, { maxLength: 50 });
    assert.equal(result, `${'x'.repeat(50)}...`);
  });

  it('should work without the virtual tree (element not in axe context)', () => {
    const el = document.createElement('div');
    el.setAttribute('id', 'standalone');
    el.textContent = 'Hello';
    const result = getElementSource(el);
    assert.equal(result, '<div id="standalone">Hello</div>');
  });

  it('should include the outerHTML of the element', () => {
    const vNode = queryFixture('<div class="bar" id="target">Hello!</div>');
    const outerHTML = vNode.actualNode.outerHTML;
    const result = getElementSource(vNode.actualNode);
    assert.equal(result, outerHTML);
  });

  it('should work with SVG elements', () => {
    const vNode = queryFixture('<svg aria-label="foo" id="target"></svg>');
    const result = getElementSource(vNode.actualNode);
    assert.equal(result, vNode.actualNode.outerHTML);
  });

  it('should work with MathML', () => {
    const vNode = queryFixture(html`
      <math display="block" id="target">
        <mrow
          ><msup><mi>x</mi><mn>2</mn></msup></mrow
        >
      </math>
    `);

    const result = getElementSource(vNode.actualNode);
    assert.equal(result, vNode.actualNode.outerHTML);
  });

  describe('XML namespaces', () => {
    it('should work with SVG and xlink:href attribute', () => {
      const vNode = queryFixture(html`
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <a id="target" xlink:href="#section"><text>Link</text></a>
        </svg>
      `);
      const result = getElementSource(vNode.actualNode);

      assert.include(result, 'xlink:href');
      assert.include(result, '#section');
      assert.equal(result, vNode.actualNode.outerHTML);
    });

    it('should truncate SVG with namespaced attributes correctly', () => {
      const vNode = queryFixture(
        html`<svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <a id="target" xlink:href="#section" class="link">
            ${'x'.repeat(400)}
          </a>
        </svg>`
      );
      const result = getElementSource(vNode.actualNode, { maxLength: 50 });
      assert.match(result, /<a\s/);
      assert.include(result, 'xlink:href');
      assert.match(result, /\.\.\.>$/);
    });

    it('should work with createElementNS for elements in SVG namespace', () => {
      const svgNS = 'http://www.w3.org/2000/svg';
      const el = document.createElementNS(svgNS, 'rect');
      el.setAttributeNS(null, 'id', 'target');
      el.setAttribute('width', '100');
      el.setAttribute('height', '50');
      const result = getElementSource(el);
      assert.include(result, 'rect');
      assert.include(result, 'id="target"');
      assert.include(result, 'width="100"');
      assert.include(result, 'height="50"');
      assert.equal(result, el.outerHTML);
    });

    it('should work with setAttributeNS for namespaced attributes', () => {
      const xlinkNS = 'http://www.w3.org/1999/xlink';
      const svgNS = 'http://www.w3.org/2000/svg';
      const el = document.createElementNS(svgNS, 'image');
      el.setAttributeNS(xlinkNS, 'xlink:href', 'test.png');
      el.setAttributeNS(null, 'id', 'target');
      const result = getElementSource(el);
      assert.include(result, 'xlink:href');
      assert.include(result, 'test.png');
      assert.include(result, 'id="target"');
      assert.equal(result, el.outerHTML);
    });
  });

  it('should truncate large elements', () => {
    let div = '<div class="foo" id="target">';
    for (let i = 0; i < 300; i++) {
      div += i;
    }
    div += '</div>';
    const vNode = queryFixture(div);
    const result = getElementSource(vNode.actualNode);
    assert.equal(result, '<div class="foo" id="target">');
  });

  it('should truncate large attributes of large element', () => {
    const el = document.createElement('div');
    let attributeName = 'data-';
    let attributeValue = '';
    for (let i = 0; i < 500; i++) {
      attributeName += 'foo';
      attributeValue += i;
    }
    el.setAttribute(attributeName, attributeValue);

    const result = getElementSource(el);
    assert.equal(
      result,
      html`<div
        ${attributeName.substring(0, 20)}...="${attributeValue.substring(
          0,
          20
        )}..."
      ></div>`
    );
  });

  it('should remove attributes for a large element having a large number of attributes', () => {
    let customElement = '<div id="target"';
    for (let i = 0; i < 100; i++) {
      customElement += ` attr${i}="value${i}"`;
    }
    customElement += html`>
      <div></div>`;

    const vNode = queryFixture(customElement);
    const result = getElementSource(vNode.actualNode);
    const truncatedAttrCount = (result.match(/attr/g) || []).length;
    assert.isBelow(truncatedAttrCount, 100);
    assert.isAtLeast(truncatedAttrCount, 10);
  });

  it('should truncate a large element with long custom tag name', () => {
    let longCustomElementTagName = new Array(300).join('b');
    let customElement = `<${longCustomElementTagName} id="target">A</${longCustomElementTagName}>`;
    const vNode = queryFixture(customElement);
    const result = getElementSource(vNode.actualNode);
    assert.equal(result, `${customElement.substring(0, 300)} ...>`);
  });

  it('should not truncate attributes if children are long but attribute itself is within limits', () => {
    let el = document.createElement('div');
    let attributeValue = '';
    let innerHtml = '';
    for (let i = 0; i < 50; i++) {
      attributeValue += 'a';
      innerHtml += 'foobar';
    }
    el.setAttribute('long-attribute', attributeValue);
    el.innerHTML = innerHtml;

    const result = getElementSource(el);
    assert.equal(result, html`<div long-attribute="${attributeValue}"></div>`);
  });

  describe('options', () => {
    it('should respect custom maxLength', () => {
      const vNode = queryFixture(
        html`<div class="foo" id="target">${'x'.repeat(200)}</div>`
      );
      const result = getElementSource(vNode.actualNode, { maxLength: 25 });
      assert.equal(result, '<div class="foo" ...>');
    });

    it('should respect custom attrLimit', () => {
      const el = document.createElement('div');
      const longName = `data-${'x'.repeat(300)}`;
      const longValue = 'y'.repeat(300);
      el.setAttribute(longName, longValue);

      const result = getElementSource(el, { attrLimit: 10 });
      assert.equal(result, '<div data-xxxxx...="yyyyyyyyyy...">');
    });

    it('should include later attributes that fit after skipping long ones', () => {
      const vNode = queryFixture(
        html`<div
          id="target"
          data-very-long-attr="${'x'.repeat(200)}"
          class="foo"
        >
          content
        </div>`
      );
      const result = getElementSource(vNode.actualNode, { maxLength: 50 });
      assert.equal(result, '<div id="target" class="foo" ...>');
    });

    it('should use defaults when options is empty', () => {
      let div = '<div class="foo" id="target">';
      for (let i = 0; i < 300; i++) {
        div += i;
      }
      div += '</div>';
      const vNode = queryFixture(div);
      const result = getElementSource(vNode.actualNode, {});
      assert.equal(result, '<div class="foo" id="target">');
    });
  });
});
