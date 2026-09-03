function createContentGetSelector() {
  const group = document.createElement('div');
  group.innerHTML =
    '<label id="mylabel">Label</label><input id="myinput" aria-labelledby="mylabel" type="text" />';
  return group;
}

function makeShadowTreeGetSelector(node) {
  const root = node.attachShadow({ mode: 'open' });
  const div = document.createElement('div');
  div.className = 'parent';
  root.appendChild(div);
  div.appendChild(createContentGetSelector());
}

function makeNonunique(fixture) {
  const nonUnique = '<div><div><div></div></div></div>';
  fixture.innerHTML = `<main>${nonUnique}${nonUnique}${nonUnique}<div><div></div></div>`;
  const node = document.createElement('div');
  const parent = fixture.querySelector('div:nth-child(4) > div');
  parent.appendChild(node);
  return node;
}

function makeNonuniqueLongAttributes(fixture) {
  const nonUnique = '<div><div><div></div></div></div>';
  fixture.innerHTML = `<main>${nonUnique}${nonUnique}${nonUnique}<div><div></div></div>`;
  const node = document.createElement('div');
  node.setAttribute('data-att', 'ddfkjghlkdddfkjghlkdddfkjghlkdddfkjghlkd');
  const parent = fixture.querySelector('div:nth-child(4) > div');
  parent.appendChild(node);
  return node;
}

describe('axe.utils.getSelector', () => {
  const html = axe.testUtils.html;

  const fixture = document.getElementById('fixture');
  const fixtureSetup = axe.testUtils.fixtureSetup;

  afterEach(() => {
    fixture.innerHTML = '';
    axe._tree = undefined;
    axe._selectorData = undefined;
  });

  it('should be a function', () => {
    assert.isFunction(axe.utils.getSelector);
  });

  it('throws if axe._selectorData is undefined', () => {
    assert.throws(() => {
      const node = document.createElement('div');
      fixture.appendChild(node);
      axe.utils.getSelector(node);
    });
  });

  it('should generate a unique CSS selector', () => {
    const node = document.createElement('div');
    fixtureSetup(node);
    const sel = axe.utils.getSelector(node);

    const result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node);
  });

  it('should still work if an element has nothing but whitespace as a className', () => {
    const node = document.createElement('div');
    node.className = '    ';
    fixtureSetup(node);
    const sel = axe.utils.getSelector(node);

    const result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node);
  });

  it('should handle special characters in IDs', () => {
    const node = document.createElement('div');
    node.id = 'monkeys#are.animals\\ok';
    fixtureSetup(node);

    const result = document.querySelectorAll(axe.utils.getSelector(node));
    assert.lengthOf(result, 1);
    assert.equal(result[0], node);
  });

  it('should handle special characters in classNames', () => {
    const node = document.createElement('div');
    node.className = '.  bb-required';
    fixtureSetup(node);

    const result = document.querySelectorAll(axe.utils.getSelector(node));
    assert.lengthOf(result, 1);
    assert.equal(result[0], node);
  });

  it('should be able to fall back to positional selectors', () => {
    let node, expected;
    const nodes = [];
    for (var i = 0; i < 10; i++) {
      node = document.createElement('div');
      nodes.push(node);
      if (i === 5) {
        expected = node;
      }
    }
    fixtureSetup(nodes);
    const result = document.querySelectorAll(axe.utils.getSelector(expected));
    assert.lengthOf(result, 1);
    assert.equal(result[0], expected);
  });

  it('should use a unique ID', () => {
    const node = document.createElement('div');
    node.id = 'monkeys';
    fixtureSetup(node);

    const sel = axe.utils.getSelector(node);

    assert.equal(sel, '#monkeys');

    const result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node);
  });

  it('should not use ids if they are not unique', () => {
    const node1 = document.createElement('div');
    const node2 = document.createElement('div');
    node1.id = 'monkeys';
    node2.id = 'monkeys';

    fixtureSetup([node1, node2]);
    const sel = axe.utils.getSelector(node2);

    assert.notInclude(sel, '#monkeys');
    const result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node2);
  });

  it('should use classes if available and unique', () => {
    const node1 = document.createElement('div');
    const node2 = document.createElement('div');
    node1.className = 'monkeys simian';
    node2.className = 'dogs cats';

    fixtureSetup([node1, node2]);
    const sel = axe.utils.getSelector(node2);

    assert.equal(sel, '.dogs');

    const result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node2);
  });

  it('should use classes if more unique than the tag', () => {
    const node1 = document.createElement('p');
    const node2 = document.createElement('p');
    node1.className = 'monkeys simian cats';
    node2.className = 'dogs cats';

    fixtureSetup([node1, node2]);
    const sel = axe.utils.getSelector(node2);
    assert.equal(sel, '.dogs');

    const result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node2);
  });

  it('should NOT use classes if they are more common than the tag', () => {
    const node1 = document.createElement('p');
    const node2 = document.createElement('p');
    node1.className = 'dogs cats';
    node2.className = 'dogs cats';

    fixtureSetup([node1, node2]);
    const sel = axe.utils.getSelector(node2);

    assert.isTrue(sel.indexOf('.dogs') === -1);
    assert.isTrue(sel.indexOf('p') === 0);

    const result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node2);
  });

  it('should use the most unique class', () => {
    const node1 = document.createElement('div');
    const node2 = document.createElement('div');
    node1.className = 'dogs';
    node2.className = 'dogs cats';

    fixtureSetup([node1, node2]);
    const sel = axe.utils.getSelector(node2);
    assert.equal(sel, '.cats');

    const result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node2);
  });

  it('should use the most unique class and not the unique attribute', () => {
    const node1 = document.createElement('div');
    const node2 = document.createElement('div');

    node1.className = 'dogs';
    node2.className = 'dogs cats';
    node2.setAttribute('data-axe', 'hello');

    fixtureSetup([node1, node2]);
    const sel = axe.utils.getSelector(node2);

    assert.equal(sel, '.cats');

    const result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node2);
  });

  it('should use only a single unique attribute', () => {
    const node1 = document.createElement('div');
    const node2 = document.createElement('div');

    node1.setAttribute('data-thing', 'hello');
    node2.setAttribute('data-thing', 'hello');
    node2.setAttribute('data-axe', 'hello');

    fixtureSetup([node1, node2]);
    const sel = axe.utils.getSelector(node2);

    assert.equal(sel, 'div[data-axe="hello"]');

    const result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node2);
  });

  it('should use three uncommon but not unique features', () => {
    const node1 = document.createElement('div');
    node1.setAttribute('data-axe', 'hello');
    node1.setAttribute('data-thing', 'hello');
    node1.className = 'thing';

    const node2 = document.createElement('div');
    node2.setAttribute('data-axe', 'hello');
    node2.setAttribute('data-thing', 'hello');
    node2.className = 'thing';

    fixtureSetup([node1, node2]);
    const sel = axe.utils.getSelector(node2);
    const clsIndex = sel.indexOf('.thing');
    const attIndex = Math.min(
      sel.indexOf('[data-axe="hello"]'),
      sel.indexOf('[data-thing="hello"]')
    );

    assert.isTrue(clsIndex !== -1);
    assert.isTrue(sel.indexOf('[data-axe="hello"]') !== -1);
    assert.isTrue(sel.indexOf('[data-thing="hello"]') !== -1);

    assert.isTrue(clsIndex < attIndex, 'classes first');

    const result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node2);
  });

  it('should use only three uncommon but not unique features', () => {
    const node1 = document.createElement('div');
    node1.setAttribute('data-axe', 'hello');
    node1.setAttribute('data-thing', 'hello');
    node1.setAttribute('data-thang', 'hello');
    node1.className = 'thing thang';

    const node2 = document.createElement('div');
    node2.setAttribute('data-axe', 'hello');
    node2.setAttribute('data-thing', 'hello');
    node2.setAttribute('data-thang', 'hello');
    node2.className = 'thing thang';

    fixtureSetup([node1, node2]);
    const sel = axe.utils.getSelector(node2);
    let parts = sel.split('.');
    parts = parts
      .reduce((val, item) => {
        const its = item.split('[');
        return val.concat(its);
      }, [])
      .filter(item => {
        return item !== '';
      });
    assert.equal(parts.length, 3);

    const result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node2);
  });

  it('should use only three uncommon but not unique classes', () => {
    const node1 = document.createElement('div');
    const node2 = document.createElement('div');
    node1.className = 'thing thang thug thick';
    node2.className = 'thing thang thug thick';

    fixtureSetup([node1, node2]);
    const sel = axe.utils.getSelector(node2);
    let parts = sel.split('.');
    parts = parts
      .reduce((val, item) => {
        const its = item.split('[');
        return val.concat(its);
      }, [])
      .filter(item => {
        return item !== '';
      });
    assert.equal(parts.length, 3);

    const result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node2);
  });

  it('should use only three uncommon but not unique attributes', () => {
    const node1 = document.createElement('div');
    node1.setAttribute('data-axe', 'hello');
    node1.setAttribute('data-thug', 'hello');
    node1.setAttribute('data-thing', 'hello');
    node1.setAttribute('data-thang', 'hello');

    const node2 = document.createElement('div');
    node2.setAttribute('data-axe', 'hello');
    node2.setAttribute('data-thing', 'hello');
    node2.setAttribute('data-thang', 'hello');
    node2.setAttribute('data-thug', 'hello');

    fixtureSetup([node1, node2]);
    const sel = axe.utils.getSelector(node2);
    let parts = sel.split('.');
    parts = parts
      .reduce((val, item) => {
        const its = item.split('[');
        return val.concat(its);
      }, [])
      .filter(item => {
        return item !== '';
      });
    assert.equal(parts.length, 4);

    const result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node2);
  });

  it('should not use long attributes', () => {
    const node = makeNonuniqueLongAttributes(fixture);
    fixtureSetup();
    const sel = axe.utils.getSelector(node, {});
    assert.isTrue(sel.indexOf('data-att') === -1);
  });

  it('should use :root when not unique html element', () => {
    const node = document.createElement('html');
    node.setAttribute('lang', 'en');
    fixtureSetup(node);

    const sel = axe.utils.getSelector(document.documentElement, {});
    assert.equal(sel, ':root');
  });

  it('should use position if classes are not unique', () => {
    const node1 = document.createElement('div');
    node1.className = 'monkeys simian';

    const node2 = document.createElement('div');
    node2.className = 'monkeys simian';

    fixtureSetup([node1, node2]);
    const sel = axe.utils.getSelector(node2);

    assert.equal(sel, '.monkeys.simian:nth-child(2)');

    const result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node2);
  });

  it('should work on the documentElement', () => {
    fixtureSetup();

    const sel = axe.utils.getSelector(document.documentElement);
    const result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], document.documentElement);
  });

  it('should work on the documentElement with classes', () => {
    const orig = document.documentElement.className;
    document.documentElement.className = 'stuff and other things';
    fixtureSetup();

    const sel = axe.utils.getSelector(document.documentElement);
    const result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], document.documentElement);
    document.documentElement.className = orig;
  });

  it('should work on the body', () => {
    fixtureSetup();
    const sel = axe.utils.getSelector(document.body);
    const result = document.querySelectorAll(sel);

    assert.lengthOf(result, 1);
    assert.equal(result[0], document.body);
  });

  it('should work on namespaced elements', () => {
    fixtureSetup('<hx:include>Hello</hx:include>');
    const node = fixture.firstChild;

    const sel = axe.utils.getSelector(node);
    const result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node);
  });

  it('should work on complex namespaced elements', () => {
    fixtureSetup(html`
      <m:math xmlns:m="http://www.w3.org/1998/Math/MathML">
        <m:mi>x</m:mi>
        <m:annotation-xml encoding="MathML-Content">
          <m:ci>x</m:ci>
        </m:annotation-xml>
      </m:math>
    `);

    const node = fixture.querySelector('m\\:ci');
    const sel = axe.utils.getSelector(node);
    const result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node);
  });

  it('should not use ignored attributes', () => {
    const node = document.createElement('div');
    const ignoredAttributes = [
      'style',
      'selected',
      'checked',
      'disabled',
      'tabindex',
      'aria-checked',
      'aria-selected',
      'aria-invalid',
      'aria-activedescendant',
      'aria-busy',
      'aria-disabled',
      'aria-expanded',
      'aria-grabbed',
      'aria-pressed',
      'aria-valuenow',
      'xmlns'
    ];
    ignoredAttributes.forEach(att => {
      node.setAttribute(att, 'true');
    });
    fixtureSetup(node);

    assert.isTrue(axe.utils.getSelector(node).indexOf('[') === -1);
  });

  it('should use href and src attributes, shortened', () => {
    const link1 = document.createElement('a');
    link1.setAttribute('href', '//deque.com/thang/');

    const link2 = document.createElement('a');
    link2.setAttribute('href', '//deque.com/about/');

    const img1 = document.createElement('img');
    img1.setAttribute('src', '//deque.com/thang.png');
    const img2 = document.createElement('img');
    img2.setAttribute('src', '//deque.com/logo.png');

    fixtureSetup([link1, link2, img1, img2]);
    assert.equal(axe.utils.getSelector(link2), 'a[href$="about/"]');
    assert.equal(axe.utils.getSelector(img2), 'img[src$="logo.png"]');
  });

  it('should escape href attributes', () => {
    const link1 = document.createElement('a');
    link1.setAttribute('href', '//deque.com/about/');

    const link2 = document.createElement('a');
    link2.setAttribute('href', '//deque.com/child/ \n\n\n');

    fixtureSetup([link1, link2]);
    assert.equal(
      axe.utils.getSelector(link2),
      'a[href="//deque.com/child/ \\a \\a \\a "]'
    );
  });

  it('should not URL encode or token escape href attribute', () => {
    const link1 = document.createElement('a');
    link1.setAttribute('href', '3 Seater');

    const link2 = document.createElement('a');
    link2.setAttribute('href', '1 Seater');

    const expected = 'a[href$="1 Seater"]';
    fixtureSetup([link1, link2]);
    assert.equal(axe.utils.getSelector(link2), expected);
    assert.isTrue(axe.utils.matchesSelector(link2, expected));
  });

  it('should escape certain special characters in attribute', () => {
    const div1 = document.createElement('div');
    div1.setAttribute('data-thing', 'foobar');

    const div2 = document.createElement('div');
    div2.setAttribute('data-thing', '!@#$%^&*()_+[]\\;\',./{}|:"<>?');

    const expected = 'div[data-thing="!@#$%^&*()_+[]\\\\;\',./{}|:\\"<>?"]';
    fixtureSetup([div1, div2]);
    assert.equal(axe.utils.getSelector(div2), expected);
    assert.isTrue(axe.utils.matchesSelector(div2, expected));
  });

  it('should escape newline characters in attribute', () => {
    const div1 = document.createElement('div');
    div1.setAttribute('data-thing', 'foobar');

    const div2 = document.createElement('div');
    div2.setAttribute('data-thing', '  \n\n\n');

    const expected = 'div[data-thing="  \\a \\a \\a "]';
    fixtureSetup([div1, div2]);
    assert.equal(axe.utils.getSelector(div2), expected);
    assert.isTrue(axe.utils.matchesSelector(div2, expected));
  });

  it('should escape control characters in attribute (issue 5204)', () => {
    const div1 = document.createElement('div');
    div1.setAttribute('data-thing', 'foobar');

    const div2 = document.createElement('div');
    // Form feed (U+000C), vertical tab (U+000B) and U+001F previously passed
    // through raw, producing an invalid selector that threw in matches().
    div2.setAttribute(
      'data-thing',
      ' ' + String.fromCharCode(0x0c, 0x0b, 0x1f)
    );

    const expected = 'div[data-thing=" \\c \\b \\1f "]';
    fixtureSetup([div1, div2]);
    assert.equal(axe.utils.getSelector(div2), expected);
    assert.isTrue(axe.utils.matchesSelector(div2, expected));
  });

  it('should escape CR and CRLF in attribute (issue 5204)', () => {
    const div1 = document.createElement('div');
    div1.setAttribute('data-thing', 'foobar');

    const div2 = document.createElement('div');
    // CR (U+000D) and CRLF now round-trip as `\d ` / `\d \a ` rather than
    // collapsing to `\a ` (the old newline handling this change subsumes).
    div2.setAttribute(
      'data-thing',
      'a' +
        String.fromCharCode(0x0d) +
        'b' +
        String.fromCharCode(0x0d, 0x0a) +
        'c'
    );

    const expected = 'div[data-thing="a\\d b\\d \\a c"]';
    fixtureSetup([div1, div2]);
    assert.equal(axe.utils.getSelector(div2), expected);
    assert.isTrue(axe.utils.matchesSelector(div2, expected));
  });

  it('should not generate universal selectors', () => {
    const node = document.createElement('div');
    node.setAttribute('role', 'menuitem');
    fixtureSetup(node);

    assert.equal(axe.utils.getSelector(node), 'div[role="menuitem"]');
  });

  it('should work correctly when a URL attribute cannot be shortened', () => {
    const href1 = 'mars2.html?a=be_bold';
    const node1 = document.createElement('a');
    node1.setAttribute('href', href1);

    const href2 = 'mars2.html?a=be_italic';
    const node2 = document.createElement('a');
    node2.setAttribute('href', href2);
    fixtureSetup([node1, node2]);

    assert.include(axe.utils.getSelector(node1), 'mars2.html?a=be_bold');
    assert.include(axe.utils.getSelector(node2), 'mars2.html?a=be_italic');
  });

  // shadow DOM v1 - note: v0 is compatible with this code, so no need
  // to specifically test this
  it('no options: should work with shadow DOM', () => {
    let shadEl;
    fixture.innerHTML = '<div></div>';
    makeShadowTreeGetSelector(fixture.firstChild);
    fixtureSetup();

    shadEl = fixture.firstChild.shadowRoot.querySelector('input#myinput');
    assert.deepEqual(axe.utils.getSelector(shadEl), [
      '#fixture > div',
      '#myinput'
    ]);
  });

  // shadow DOM v1 - note: v0 is compatible with this code, so no need
  // to specifically test this
  it('toRoot: should work with shadow DOM', () => {
    let shadEl;
    fixture.innerHTML = '<div></div>';
    makeShadowTreeGetSelector(fixture.firstChild);
    axe._tree = axe.utils.getFlattenedTree(document);
    axe._selectorData = axe.utils.getSelectorData(axe._tree);

    shadEl = fixture.firstChild.shadowRoot.querySelector('input#myinput');
    assert.deepEqual(axe.utils.getSelector(shadEl, { toRoot: true }), [
      'html > body > #fixture > div',
      '.parent > div > #myinput'
    ]);
  });

  it('should correctly calculate unique selector when no discernable features', () => {
    const node = makeNonunique(fixture);
    fixtureSetup();

    const sel = axe.utils.getSelector(node, {});
    const mine = document.querySelector(sel);
    assert.isTrue(mine === node);
  });

  it('should not traverse further up than required when no discernable features', () => {
    const node = makeNonunique(fixture);
    fixtureSetup();

    const top = fixture.querySelector('div:nth-child(4)');
    let sel = axe.utils.getSelector(node, {});
    sel = sel.substring(0, sel.indexOf(' >'));
    const test = document.querySelector(sel);
    assert.isTrue(test === top);
  });

  it('should not error if fragment is no longer in the DOM', () => {
    const fragment = document.createDocumentFragment();
    const node = document.createElement('div');
    fragment.appendChild(node);
    fixtureSetup();
    assert.doesNotThrow(() => {
      axe.utils.getSelector(node);
    });
  });

  it('returns an empty string for an element in a detached DocumentFragment', () => {
    const fragment = document.createDocumentFragment();
    const node = document.createElement('div');
    fragment.appendChild(node);
    fixtureSetup();
    assert.strictEqual(axe.utils.getSelector(node), '');
  });

  it('produces a valid selector for an element appended after axe processed the page', () => {
    fixtureSetup(document.createElement('div'));
    const late = document.createElement('button');
    late.className = 'appended-later';
    fixture.appendChild(late);
    const sel = axe.utils.getSelector(late);
    assert.isString(sel);
    assert.isAbove(sel.length, 0);
  });

  it('produces a working selector for an appended element sharing an id with a tree element', () => {
    const inTree = document.createElement('div');
    inTree.id = 'shared';
    fixtureSetup(inTree);
    const appended = document.createElement('span');
    appended.id = 'shared';
    fixture.appendChild(appended);
    const sel = axe.utils.getSelector(appended);
    const matches = document.querySelectorAll(sel);
    assert.lengthOf(matches, 1);
    assert.strictEqual(matches[0], appended);
  });

  it('does not throw when generating a selector for an element in a shadow root attached after axe processed the page', () => {
    const host = document.createElement('div');
    fixtureSetup(host);
    const shadow = host.attachShadow({ mode: 'open' });
    const inner = document.createElement('span');
    inner.className = 'late-shadow';
    shadow.appendChild(inner);
    let sel;
    assert.doesNotThrow(() => {
      sel = axe.utils.getSelector(inner);
    });
    const parts = Array.isArray(sel) ? sel : [sel];
    parts.forEach(part => {
      assert.isString(part);
      assert.isAbove(part.length, 0);
    });
  });

  it('produces distinct working selectors for many siblings that share the same self-fragment', () => {
    const parent = document.createElement('ul');
    for (let i = 0; i < 30; i++) {
      const li = document.createElement('li');
      li.textContent = 'item ' + i;
      parent.appendChild(li);
    }
    fixtureSetup(parent);
    const seen = new Set();
    fixture.querySelectorAll('li').forEach(li => {
      const sel = axe.utils.getSelector(li);
      const matches = document.querySelectorAll(sel);
      assert.lengthOf(
        matches,
        1,
        'selector "' + sel + '" did not uniquely match'
      );
      assert.strictEqual(matches[0], li);
      seen.add(sel);
    });
    assert.equal(seen.size, 30, 'every sibling should get a distinct selector');
  });

  it('produces distinct working selectors for identically-shaped subtrees', () => {
    fixture.innerHTML =
      '<section>' +
      '  <div><span class="leaf">a</span><span class="leaf">b</span></div>' +
      '  <div><span class="leaf">c</span><span class="leaf">d</span></div>' +
      '</section>' +
      '<section>' +
      '  <div><span class="leaf">e</span><span class="leaf">f</span></div>' +
      '  <div><span class="leaf">g</span><span class="leaf">h</span></div>' +
      '</section>';
    fixtureSetup();
    const leaves = fixture.querySelectorAll('.leaf');
    leaves.forEach(leaf => {
      const sel = axe.utils.getSelector(leaf);
      const matches = document.querySelectorAll(sel);
      assert.lengthOf(
        matches,
        1,
        'selector "' + sel + '" did not uniquely match'
      );
      assert.strictEqual(matches[0], leaf);
    });
  });

  it('produces a working selector at extreme nesting depth', () => {
    let current = fixture;
    let deepest = null;
    for (let i = 0; i < 50; i++) {
      const child = document.createElement('div');
      current.appendChild(child);
      current = child;
      if (i === 49) {
        deepest = child;
      }
    }
    fixtureSetup();
    const sel = axe.utils.getSelector(deepest);
    const matches = document.querySelectorAll(sel);
    assert.lengthOf(matches, 1);
    assert.strictEqual(matches[0], deepest);
  });

  it('produces working selectors when many targets share their entire self-fragment', () => {
    let markup = '';
    for (let i = 0; i < 20; i++) {
      markup +=
        '<article><header><h2 class="title" data-idx="' +
        i +
        '">n</h2></header></article>';
    }
    fixture.innerHTML = markup;
    fixtureSetup();
    fixture.querySelectorAll('.title').forEach(h => {
      const sel = axe.utils.getSelector(h);
      const matches = document.querySelectorAll(sel);
      assert.lengthOf(matches, 1);
      assert.strictEqual(matches[0], h);
    });
  });

  it('produces working selectors when only one ancestor level distinguishes targets', () => {
    fixture.innerHTML =
      '<div class="branch-a"><div><div><span>x</span></div></div></div>' +
      '<div class="branch-b"><div><div><span>x</span></div></div></div>' +
      '<div class="branch-c"><div><div><span>x</span></div></div></div>';
    fixtureSetup();
    fixture.querySelectorAll('span').forEach(span => {
      const sel = axe.utils.getSelector(span);
      const matches = document.querySelectorAll(sel);
      assert.lengthOf(matches, 1);
      assert.strictEqual(matches[0], span);
    });
  });

  it('produces a unique selector when a shadow slot shares a class with the target', () => {
    const host = document.createElement('div');
    host.attachShadow({ mode: 'open' }).innerHTML = html`
      <div><span class="cta"></span></div>
      <span></span><slot class="cta"></slot>
    `;
    fixtureSetup(host);

    const target = host.shadowRoot.querySelector('.cta');
    const sel = axe.utils.getSelector(target);
    const matches = host.shadowRoot.querySelectorAll(sel[1]);
    assert.lengthOf(matches, 1, `selector "${sel[1]}" also matched the slot`);
    assert.strictEqual(matches[0], target);
  });

  it('produces a unique selector when a nested shadow slot shares a class with the target', () => {
    const host = document.createElement('div');
    host.attachShadow({ mode: 'open' }).innerHTML = html`
      <div>
        <div><span class="cta"></span></div>
        <slot class="cta"></slot>
      </div>
      <span></span>
    `;
    fixtureSetup(host);

    const target = host.shadowRoot.querySelector('span.cta');
    const sel = axe.utils.getSelector(target);
    const matches = host.shadowRoot.querySelectorAll(sel[1]);
    assert.lengthOf(matches, 1, `selector "${sel[1]}" also matched the slot`);
    assert.strictEqual(matches[0], target);
  });

  it('produces a unique selector when a shadow slot shares an id with the target', () => {
    const host = document.createElement('div');
    host.attachShadow({ mode: 'open' }).innerHTML = html`
      <div><span id="dup"></span></div>
      <slot id="dup"></slot>
    `;
    fixtureSetup(host);

    const target = host.shadowRoot.querySelector('span');
    const sel = axe.utils.getSelector(target);
    const matches = host.shadowRoot.querySelectorAll(sel[1]);
    assert.lengthOf(matches, 1, `selector "${sel[1]}" also matched the slot`);
    assert.strictEqual(matches[0], target);

    // Attributes always get the tag name, so no need for
    // a separate slot[attr] test
  });

  it('produces a unique selector when an unslotted host sibling would collide', () => {
    const hostB = document.createElement('div');
    hostB.attachShadow({ mode: 'open' }).innerHTML =
      '<slot name="nope"></slot>';
    hostB.innerHTML = '<p><img src="y.png"></p>';

    const hostA = document.createElement('div');
    hostA.attachShadow({ mode: 'open' }).innerHTML = '<slot></slot>';
    hostA.innerHTML = '<p><img src="x.png"></p>';

    fixture.appendChild(hostB);
    fixture.appendChild(hostA);
    fixtureSetup();

    const slottedImg = hostA.querySelector('img');
    const sel = axe.utils.getSelector(slottedImg);
    const finalSel = Array.isArray(sel) ? sel[sel.length - 1] : sel;
    const matches = document.querySelectorAll(finalSel);
    assert.lengthOf(matches, 1);
    assert.strictEqual(matches[0], slottedImg);
  });

  it('produces a unique selector when a slot has assigned content that shadows fallback markup', () => {
    const host = document.createElement('div');
    host.attachShadow({ mode: 'open' }).innerHTML =
      '<slot><span class="zz">fallback</span></slot>' +
      '<div><span class="zz">target</span></div>';
    host.innerHTML = '<em>assigned</em>';
    fixture.appendChild(host);
    fixtureSetup();

    const target = host.shadowRoot.querySelector('div > span.zz');
    const sel = axe.utils.getSelector(target);
    const inner = Array.isArray(sel) ? sel[sel.length - 1] : sel;
    const found = host.shadowRoot.querySelectorAll(inner);
    assert.lengthOf(found, 1);
    assert.strictEqual(found[0], target);
  });

  it('produces a unique selector when a slot has a distinguishing feature its parent lacks', () => {
    const host = document.createElement('div');
    host.attachShadow({ mode: 'open' }).innerHTML =
      '<main>' +
      '<section><slot class="wrap"><span>fallback</span></slot></section>' +
      '<div class="wrap"><span>target</span></div>' +
      '<div></div><div></div><div></div>' +
      '</main>';
    host.innerHTML = '<em>assigned</em>';
    fixture.appendChild(host);
    fixtureSetup();

    const target = host.shadowRoot.querySelector('div.wrap > span');
    const sel = axe.utils.getSelector(target);
    const inner = Array.isArray(sel) ? sel[sel.length - 1] : sel;
    const found = host.shadowRoot.querySelectorAll(inner);
    assert.lengthOf(found, 1);
    assert.strictEqual(found[0], target);
  });

  it('produces a unique selector when a slot is unfilled and its fallback shares features with the target', () => {
    const host = document.createElement('div');
    host.attachShadow({ mode: 'open' }).innerHTML =
      '<main>' +
      '<section><slot class="wrap"><span>fallback</span></slot></section>' +
      '<div class="wrap"><span>target</span></div>' +
      '<div></div><div></div><div></div>' +
      '</main>';
    fixture.appendChild(host);
    fixtureSetup();

    const target = host.shadowRoot.querySelector('div.wrap > span');
    const sel = axe.utils.getSelector(target);
    const inner = Array.isArray(sel) ? sel[sel.length - 1] : sel;
    const found = host.shadowRoot.querySelectorAll(inner);
    assert.lengthOf(found, 1);
    assert.strictEqual(found[0], target);
  });

  it('produces working selectors for elements whose tag matches an inherited property name across shadow roots', () => {
    fixture.innerHTML =
      '<div><constructor></constructor></div>' +
      '<section><constructor></constructor></section>';
    const host = document.createElement('div');
    host.attachShadow({ mode: 'open' }).innerHTML =
      '<constructor></constructor>';
    fixture.appendChild(host);
    fixtureSetup();

    fixture
      .querySelectorAll('div > constructor, section > constructor')
      .forEach(c => axe.utils.getSelector(c));

    const shadowConstructor = host.shadowRoot.querySelector('constructor');
    const sel = axe.utils.getSelector(shadowConstructor);
    const inner = Array.isArray(sel) ? sel[sel.length - 1] : sel;
    const found = host.shadowRoot.querySelectorAll(inner);
    assert.lengthOf(found, 1);
    assert.strictEqual(found[0], shadowConstructor);
  });

  it('produces a working selector for an attribute name ending in "$"', () => {
    fixture.innerHTML =
      '<div id="w">' +
      '<span data-x$="q1"></span>' +
      '<span data-x$="q2"></span>' +
      '</div>';
    fixtureSetup();
    const first = fixture.querySelector('span');
    const sel = axe.utils.getSelector(first);
    const matches = document.querySelectorAll(sel);
    assert.lengthOf(matches, 1);
    assert.strictEqual(matches[0], first);
  });
});
