function createContentGetSelector() {
  'use strict';
  let group = document.createElement('div');
  group.innerHTML =
    '<label id="mylabel">Label</label><input id="myinput" aria-labelledby="mylabel" type="text" />';
  return group;
}

function makeShadowTreeGetSelector(node) {
  'use strict';
  let root = node.attachShadow({ mode: 'open' });
  let div = document.createElement('div');
  div.className = 'parent';
  root.appendChild(div);
  div.appendChild(createContentGetSelector());
}

function makeNonunique(fixture) {
  'use strict';
  let nonUnique = '<div><div><div></div></div></div>';
  fixture.innerHTML =
    '<main>' + nonUnique + nonUnique + nonUnique + '<div><div></div></div>';
  let node = document.createElement('div');
  let parent = fixture.querySelector('div:nth-child(4) > div');
  parent.appendChild(node);
  return node;
}

function makeNonuniqueLongAttributes(fixture) {
  'use strict';
  let nonUnique = '<div><div><div></div></div></div>';
  fixture.innerHTML =
    '<main>' + nonUnique + nonUnique + nonUnique + '<div><div></div></div>';
  let node = document.createElement('div');
  node.setAttribute('data-att', 'ddfkjghlkdddfkjghlkdddfkjghlkdddfkjghlkd');
  let parent = fixture.querySelector('div:nth-child(4) > div');
  parent.appendChild(node);
  return node;
}

describe('axe.utils.getSelector', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let shadowSupported = axe.testUtils.shadowSupport.v1;
  let fixtureSetup = axe.testUtils.fixtureSetup;

  afterEach(function () {
    fixture.innerHTML = '';
    axe._tree = undefined;
    axe._selectorData = undefined;
  });

  it('should be a function', function () {
    assert.isFunction(axe.utils.getSelector);
  });

  it('throws if axe._selectorData is undefined', function () {
    assert.throws(function () {
      let node = document.createElement('div');
      fixture.appendChild(node);
      axe.utils.getSelector(node);
    });
  });

  it('should generate a unique CSS selector', function () {
    let node = document.createElement('div');
    fixtureSetup(node);
    let sel = axe.utils.getSelector(node);

    let result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node);
  });

  it('should still work if an element has nothing but whitespace as a className', function () {
    let node = document.createElement('div');
    node.className = '    ';
    fixtureSetup(node);
    let sel = axe.utils.getSelector(node);

    let result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node);
  });

  it('should handle special characters in IDs', function () {
    let node = document.createElement('div');
    node.id = 'monkeys#are.animals\\ok';
    fixtureSetup(node);

    let result = document.querySelectorAll(axe.utils.getSelector(node));
    assert.lengthOf(result, 1);
    assert.equal(result[0], node);
  });

  it('should handle special characters in classNames', function () {
    let node = document.createElement('div');
    node.className = '.  bb-required';
    fixtureSetup(node);

    let result = document.querySelectorAll(axe.utils.getSelector(node));
    assert.lengthOf(result, 1);
    assert.equal(result[0], node);
  });

  it('should be able to fall back to positional selectors', function () {
    let node, expected;
    let nodes = [];
    for (let i = 0; i < 10; i++) {
      node = document.createElement('div');
      nodes.push(node);
      if (i === 5) {
        expected = node;
      }
    }
    fixtureSetup(nodes);
    let result = document.querySelectorAll(axe.utils.getSelector(expected));
    assert.lengthOf(result, 1);
    assert.equal(result[0], expected);
  });

  it('should use a unique ID', function () {
    let node = document.createElement('div');
    node.id = 'monkeys';
    fixtureSetup(node);

    let sel = axe.utils.getSelector(node);

    assert.equal(sel, '#monkeys');

    let result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node);
  });

  it('should not use ids if they are not unique', function () {
    let node1 = document.createElement('div');
    let node2 = document.createElement('div');
    node1.id = 'monkeys';
    node2.id = 'monkeys';

    fixtureSetup([node1, node2]);
    let sel = axe.utils.getSelector(node2);

    assert.notInclude(sel, '#monkeys');
    let result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node2);
  });

  it('should use classes if available and unique', function () {
    let node1 = document.createElement('div');
    let node2 = document.createElement('div');
    node1.className = 'monkeys simian';
    node2.className = 'dogs cats';

    fixtureSetup([node1, node2]);
    let sel = axe.utils.getSelector(node2);

    assert.equal(sel, '.dogs');

    let result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node2);
  });

  it('should use classes if more unique than the tag', function () {
    let node1 = document.createElement('p');
    let node2 = document.createElement('p');
    node1.className = 'monkeys simian cats';
    node2.className = 'dogs cats';

    fixtureSetup([node1, node2]);
    let sel = axe.utils.getSelector(node2);
    assert.equal(sel, '.dogs');

    let result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node2);
  });

  it('should NOT use classes if they are more common than the tag', function () {
    let node1 = document.createElement('p');
    let node2 = document.createElement('p');
    node1.className = 'dogs cats';
    node2.className = 'dogs cats';

    fixtureSetup([node1, node2]);
    let sel = axe.utils.getSelector(node2);

    assert.isTrue(sel.indexOf('.dogs') === -1);
    assert.isTrue(sel.indexOf('p') === 0);

    let result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node2);
  });

  it('should use the most unique class', function () {
    let node1 = document.createElement('div');
    let node2 = document.createElement('div');
    node1.className = 'dogs';
    node2.className = 'dogs cats';

    fixtureSetup([node1, node2]);
    let sel = axe.utils.getSelector(node2);
    assert.equal(sel, '.cats');

    let result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node2);
  });

  it('should use the most unique class and not the unique attribute', function () {
    let node1 = document.createElement('div');
    let node2 = document.createElement('div');

    node1.className = 'dogs';
    node2.className = 'dogs cats';
    node2.setAttribute('data-axe', 'hello');

    fixtureSetup([node1, node2]);
    let sel = axe.utils.getSelector(node2);

    assert.equal(sel, '.cats');

    let result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node2);
  });

  it('should use only a single unique attribute', function () {
    let node1 = document.createElement('div');
    let node2 = document.createElement('div');

    node1.setAttribute('data-thing', 'hello');
    node2.setAttribute('data-thing', 'hello');
    node2.setAttribute('data-axe', 'hello');

    fixtureSetup([node1, node2]);
    let sel = axe.utils.getSelector(node2);

    assert.equal(sel, 'div[data-axe="hello"]');

    let result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node2);
  });

  it('should use three uncommon but not unique features', function () {
    let node1 = document.createElement('div');
    node1.setAttribute('data-axe', 'hello');
    node1.setAttribute('data-thing', 'hello');
    node1.className = 'thing';

    let node2 = document.createElement('div');
    node2.setAttribute('data-axe', 'hello');
    node2.setAttribute('data-thing', 'hello');
    node2.className = 'thing';

    fixtureSetup([node1, node2]);
    let sel = axe.utils.getSelector(node2);
    let clsIndex = sel.indexOf('.thing');
    let attIndex = Math.min(
      sel.indexOf('[data-axe="hello"]'),
      sel.indexOf('[data-thing="hello"]')
    );

    assert.isTrue(clsIndex !== -1);
    assert.isTrue(sel.indexOf('[data-axe="hello"]') !== -1);
    assert.isTrue(sel.indexOf('[data-thing="hello"]') !== -1);

    assert.isTrue(clsIndex < attIndex, 'classes first');

    let result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node2);
  });

  it('should use only three uncommon but not unique features', function () {
    let node1 = document.createElement('div');
    node1.setAttribute('data-axe', 'hello');
    node1.setAttribute('data-thing', 'hello');
    node1.setAttribute('data-thang', 'hello');
    node1.className = 'thing thang';

    let node2 = document.createElement('div');
    node2.setAttribute('data-axe', 'hello');
    node2.setAttribute('data-thing', 'hello');
    node2.setAttribute('data-thang', 'hello');
    node2.className = 'thing thang';

    fixtureSetup([node1, node2]);
    let sel = axe.utils.getSelector(node2);
    let parts = sel.split('.');
    parts = parts
      .reduce(function (val, item) {
        let its = item.split('[');
        return val.concat(its);
      }, [])
      .filter(function (item) {
        return item !== '';
      });
    assert.equal(parts.length, 3);

    let result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node2);
  });

  it('should use only three uncommon but not unique classes', function () {
    let node1 = document.createElement('div');
    let node2 = document.createElement('div');
    node1.className = 'thing thang thug thick';
    node2.className = 'thing thang thug thick';

    fixtureSetup([node1, node2]);
    let sel = axe.utils.getSelector(node2);
    let parts = sel.split('.');
    parts = parts
      .reduce(function (val, item) {
        let its = item.split('[');
        return val.concat(its);
      }, [])
      .filter(function (item) {
        return item !== '';
      });
    assert.equal(parts.length, 3);

    let result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node2);
  });

  it('should use only three uncommon but not unique attributes', function () {
    let node1 = document.createElement('div');
    node1.setAttribute('data-axe', 'hello');
    node1.setAttribute('data-thug', 'hello');
    node1.setAttribute('data-thing', 'hello');
    node1.setAttribute('data-thang', 'hello');

    let node2 = document.createElement('div');
    node2.setAttribute('data-axe', 'hello');
    node2.setAttribute('data-thing', 'hello');
    node2.setAttribute('data-thang', 'hello');
    node2.setAttribute('data-thug', 'hello');

    fixtureSetup([node1, node2]);
    let sel = axe.utils.getSelector(node2);
    let parts = sel.split('.');
    parts = parts
      .reduce(function (val, item) {
        let its = item.split('[');
        return val.concat(its);
      }, [])
      .filter(function (item) {
        return item !== '';
      });
    assert.equal(parts.length, 4);

    let result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node2);
  });

  it('should not use long attributes', function () {
    let node = makeNonuniqueLongAttributes(fixture);
    fixtureSetup();
    let sel = axe.utils.getSelector(node, {});
    assert.isTrue(sel.indexOf('data-att') === -1);
  });

  it('should use :root when not unique html element', function () {
    let node = document.createElement('html');
    node.setAttribute('lang', 'en');
    fixtureSetup(node);

    let sel = axe.utils.getSelector(document.documentElement, {});
    assert.equal(sel, ':root');
  });

  it('should use position if classes are not unique', function () {
    let node1 = document.createElement('div');
    node1.className = 'monkeys simian';

    let node2 = document.createElement('div');
    node2.className = 'monkeys simian';

    fixtureSetup([node1, node2]);
    let sel = axe.utils.getSelector(node2);

    assert.equal(sel, '.monkeys.simian:nth-child(2)');

    let result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node2);
  });

  it('should work on the documentElement', function () {
    fixtureSetup();

    let sel = axe.utils.getSelector(document.documentElement);
    let result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], document.documentElement);
  });

  it('should work on the documentElement with classes', function () {
    let orig = document.documentElement.className;
    document.documentElement.className = 'stuff and other things';
    fixtureSetup();

    let sel = axe.utils.getSelector(document.documentElement);
    let result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], document.documentElement);
    document.documentElement.className = orig;
  });

  it('should work on the body', function () {
    fixtureSetup();
    let sel = axe.utils.getSelector(document.body);
    let result = document.querySelectorAll(sel);

    assert.lengthOf(result, 1);
    assert.equal(result[0], document.body);
  });

  it('should work on namespaced elements', function () {
    fixtureSetup('<hx:include>Hello</hx:include>');
    let node = fixture.firstChild;

    let sel = axe.utils.getSelector(node);
    let result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node);
  });

  it('should work on complex namespaced elements', function () {
    fixtureSetup(
      '<m:math xmlns:m="http://www.w3.org/1998/Math/MathML">' +
        '<m:mi>x</m:mi>' +
        '<m:annotation-xml encoding="MathML-Content">' +
        '<m:ci>x</m:ci>' +
        '</m:annotation-xml>' +
        '</m:math>'
    );

    let node = fixture.querySelector('m\\:ci');
    let sel = axe.utils.getSelector(node);
    let result = document.querySelectorAll(sel);
    assert.lengthOf(result, 1);
    assert.equal(result[0], node);
  });

  it('should not use ignored attributes', function () {
    let node = document.createElement('div');
    let ignoredAttributes = [
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
    ignoredAttributes.forEach(function (att) {
      node.setAttribute(att, 'true');
    });
    fixtureSetup(node);

    assert.isTrue(axe.utils.getSelector(node).indexOf('[') === -1);
  });

  it('should use href and src attributes, shortened', function () {
    let link1 = document.createElement('a');
    link1.setAttribute('href', '//deque.com/thang/');

    let link2 = document.createElement('a');
    link2.setAttribute('href', '//deque.com/about/');

    let img1 = document.createElement('img');
    img1.setAttribute('src', '//deque.com/thang.png');
    let img2 = document.createElement('img');
    img2.setAttribute('src', '//deque.com/logo.png');

    fixtureSetup([link1, link2, img1, img2]);
    assert.equal(axe.utils.getSelector(link2), 'a[href$="about/"]');
    assert.equal(axe.utils.getSelector(img2), 'img[src$="logo.png"]');
  });

  it('should escape href attributes', function () {
    let link1 = document.createElement('a');
    link1.setAttribute('href', '//deque.com/about/');

    let link2 = document.createElement('a');
    link2.setAttribute('href', '//deque.com/child/ \n\n\n');

    fixtureSetup([link1, link2]);
    assert.equal(
      axe.utils.getSelector(link2),
      'a[href="//deque.com/child/ \\a \\a \\a "]'
    );
  });

  it('should not URL encode or token escape href attribute', function () {
    let link1 = document.createElement('a');
    link1.setAttribute('href', '3 Seater');

    let link2 = document.createElement('a');
    link2.setAttribute('href', '1 Seater');

    let expected = 'a[href$="1 Seater"]';
    fixtureSetup([link1, link2]);
    assert.equal(axe.utils.getSelector(link2), expected);
    assert.isTrue(axe.utils.matchesSelector(link2, expected));
  });

  it('should escape certain special characters in attribute', function () {
    let div1 = document.createElement('div');
    div1.setAttribute('data-thing', 'foobar');

    let div2 = document.createElement('div');
    div2.setAttribute('data-thing', '!@#$%^&*()_+[]\\;\',./{}|:"<>?');

    let expected = 'div[data-thing="!@#$%^&*()_+[]\\\\;\',./{}|:\\"<>?"]';
    fixtureSetup([div1, div2]);
    assert.equal(axe.utils.getSelector(div2), expected);
    assert.isTrue(axe.utils.matchesSelector(div2, expected));
  });

  it('should escape newline characters in attribute', function () {
    let div1 = document.createElement('div');
    div1.setAttribute('data-thing', 'foobar');

    let div2 = document.createElement('div');
    div2.setAttribute('data-thing', '  \n\n\n');

    let expected = 'div[data-thing="  \\a \\a \\a "]';
    fixtureSetup([div1, div2]);
    assert.equal(axe.utils.getSelector(div2), expected);
    assert.isTrue(axe.utils.matchesSelector(div2, expected));
  });

  it('should not generate universal selectors', function () {
    let node = document.createElement('div');
    node.setAttribute('role', 'menuitem');
    fixtureSetup(node);

    assert.equal(axe.utils.getSelector(node), 'div[role="menuitem"]');
  });

  it('should work correctly when a URL attribute cannot be shortened', function () {
    let href1 = 'mars2.html?a=be_bold';
    let node1 = document.createElement('a');
    node1.setAttribute('href', href1);

    let href2 = 'mars2.html?a=be_italic';
    let node2 = document.createElement('a');
    node2.setAttribute('href', href2);
    fixtureSetup([node1, node2]);

    assert.include(axe.utils.getSelector(node1), 'mars2.html?a=be_bold');
    assert.include(axe.utils.getSelector(node2), 'mars2.html?a=be_italic');
  });

  // shadow DOM v1 - note: v0 is compatible with this code, so no need
  // to specifically test this
  (shadowSupported ? it : xit)(
    'no options: should work with shadow DOM',
    function () {
      let shadEl;
      fixture.innerHTML = '<div></div>';
      makeShadowTreeGetSelector(fixture.firstChild);
      fixtureSetup();

      shadEl = fixture.firstChild.shadowRoot.querySelector('input#myinput');
      assert.deepEqual(axe.utils.getSelector(shadEl), [
        '#fixture > div',
        '#myinput'
      ]);
    }
  );

  // shadow DOM v1 - note: v0 is compatible with this code, so no need
  // to specifically test this
  (shadowSupported ? it : xit)(
    'toRoot: should work with shadow DOM',
    function () {
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
    }
  );

  it('should correctly calculate unique selector when no discernable features', function () {
    let node = makeNonunique(fixture);
    fixtureSetup();

    let sel = axe.utils.getSelector(node, {});
    let mine = document.querySelector(sel);
    assert.isTrue(mine === node);
  });

  it('should not traverse further up than required when no discernable features', function () {
    let node = makeNonunique(fixture);
    fixtureSetup();

    let top = fixture.querySelector('div:nth-child(4)');
    let sel = axe.utils.getSelector(node, {});
    sel = sel.substring(0, sel.indexOf(' >'));
    let test = document.querySelector(sel);
    assert.isTrue(test === top);
  });

  it('should not error if fragment is no longer in the DOM', function () {
    let fragment = document.createDocumentFragment();
    let node = document.createElement('div');
    fragment.appendChild(node);
    fixtureSetup();
    assert.doesNotThrow(function () {
      axe.utils.getSelector(node);
    });
  });
});
