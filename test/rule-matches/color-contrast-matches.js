describe('color-contrast-matches', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var shadowSupport =
    document.body && typeof document.body.attachShadow === 'function';
  var rule;

  beforeEach(function () {
    rule = axe.utils.getRule('color-contrast');
  });

  afterEach(function () {
    fixture.innerHTML = '';
    axe._tree = undefined;
  });

  it('is a function', function () {
    assert.isFunction(rule.matches);
  });

  it('should not match when there is no text', function () {
    fixture.innerHTML =
      '<div style="color: yellow; background-color: white;" id="target">' +
      ' </div>';
    var target = fixture.querySelector('#target');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should match when there is text', function () {
    fixture.innerHTML =
      '<div style="color: yellow; background-color: white;" id="target">' +
      'My text</div>';
    var target = fixture.querySelector('#target');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isTrue(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should not match when text only contains emoji', function () {
    fixture.innerHTML =
      '<div style="color: yellow; background-color: white;" id="target">' +
      '🌎</div>';
    var target = fixture.querySelector('#target');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should not match when text only contains punctuation', function () {
    fixture.innerHTML =
      '<div style="color: yellow; background-color: white;" id="target">' +
      '&rlm;</div>';
    var target = fixture.querySelector('#target');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should match when text only contains nonBmp unicode', function () {
    fixture.innerHTML =
      '<div style="color: yellow; background-color: white;" id="target">' +
      '◓</div>';
    var target = fixture.querySelector('#target');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isTrue(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should not match when there is text that is out of the container', function () {
    fixture.innerHTML =
      '<div style="color: yellow; text-indent: -9999px; background-color: white;" id="target">' +
      'My text</div>';
    var target = fixture.querySelector('#target');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should not match input when there is text that is out of the container', function () {
    fixture.innerHTML =
      '<input style="text-indent: -9999px" type="submit" value="Search" />';
    var target = fixture.querySelector('input');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should not match select when there is text that is out of the container', function () {
    fixture.innerHTML =
      '<select style="text-indent: -9999px">' +
      '<option selected>My text</option>' +
      '</select>';
    var target = fixture.querySelector('select');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should not match textarea when there is text that is out of the container', function () {
    fixture.innerHTML =
      '<textarea style="text-indent: -9999px">My text</textarea>';
    var target = fixture.querySelector('textarea');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should not match when there is text that is out of the container with overflow hidden', function () {
    fixture.innerHTML =
      '<div style="color: yellow; width: 100px; overflow: hidden; text-indent: 200px; background-color: white;" id="target">' +
      'text</div>';
    var target = fixture.querySelector('#target');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should match when there is text that is in the scroll reach of container', function () {
    fixture.innerHTML =
      '<div style="color: yellow; width: 100px; overflow: scroll; text-indent: 200px; background-color: white;" id="target">' +
      'text</div>';
    var target = fixture.querySelector('#target');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isTrue(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should match when there is text that is only partially out of the container', function () {
    fixture.innerHTML =
      '<div style="color: yellow; text-indent: -20px; background-color: white;" id="target">' +
      'My text</div>';
    var target = fixture.querySelector('#target');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isTrue(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should match <input type="text">', function () {
    fixture.innerHTML = '<input type="text">';
    var target = fixture.querySelector('input');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isTrue(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should not match <input type="hidden">', function () {
    fixture.innerHTML = '<input type="hidden">';
    var target = fixture.querySelector('input');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should not match <input type="checkbox">', function () {
    fixture.innerHTML = '<input type="checkbox">';
    var target = fixture.querySelector('input');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should not match <input type="radio">', function () {
    fixture.innerHTML = '<input type="radio">';
    var target = fixture.querySelector('input');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should not match <input type="color">', function () {
    fixture.innerHTML = '<input type="color">';
    var target = fixture.querySelector('input');
    axe.testUtils.flatTreeSetup(fixture);
    // Some browsers will fallback to type=text for unknown input types (looking at you IE)
    if (target.type === 'color') {
      assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
    }
  });

  it('should not match <input type="range">', function () {
    fixture.innerHTML = '<input type="range">';
    var target = fixture.querySelector('input');
    axe.testUtils.flatTreeSetup(fixture);
    // Some browsers will fallback to type=text for unknown input types (looking at you IE)
    if (target.type === 'range') {
      assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
    }
  });

  it('should match <select> with options', function () {
    fixture.innerHTML = '<select><option>Hello</option></select>';
    var target = fixture.querySelector('select');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isTrue(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should not match <select> with no options', function () {
    fixture.innerHTML = '<select></select>';
    var target = fixture.querySelector('select');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should match <textarea>', function () {
    fixture.innerHTML = '<textarea></textarea>';
    var target = fixture.querySelector('textarea');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isTrue(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should not match <option>', function () {
    fixture.innerHTML = '<select><option>hi</option></select>';
    var target = fixture.querySelector('option');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should not match inputs that are disabled', function () {
    fixture.innerHTML = '<input type="text" disabled>';
    var target = fixture.querySelector('input');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should not match a disabled implicit label child', function () {
    fixture.innerHTML =
      '<label>' +
      '<input type="checkbox" style="position: absolute;display: inline-block;width: 1.5rem;height: 1.5rem;opacity: 0;" disabled checked>' +
      '<span style="background-color:rgba(0, 0, 0, 0.26);display:inline-block;width: 1.5rem;height: 1.5rem;" aria-hidden="true"></span>' +
      '<span style="color:rgba(0, 0, 0, 0.38);" id="target">Baseball</span>' +
      '</label>';
    var target = fixture.querySelector('#target');
    axe.testUtils.flatTreeSetup(fixture);
    var result = rule.matches(target, axe.utils.getNodeFromTree(target));
    assert.isFalse(result);
  });

  it('should not match <textarea disabled>', function () {
    fixture.innerHTML = '<textarea disabled></textarea>';
    var target = fixture.querySelector('textarea');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should not match <select> with options', function () {
    fixture.innerHTML = '<select disabled><option>Hello</option></select>';
    var target = fixture.querySelector('select');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should match <button>', function () {
    fixture.innerHTML = '<button>hi</button>';
    var target = fixture.querySelector('button');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isTrue(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should not match <button disabled>', function () {
    fixture.innerHTML = '<button disabled>hi</button>';
    var target = fixture.querySelector('button');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should not match <button disabled><span></span></button>', function () {
    fixture.innerHTML = '<button disabled><span>Hi</span></button>';
    var target = fixture.querySelector('button');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(
      rule.matches(
        target.querySelector('span'),
        axe.utils.getNodeFromTree(target.querySelector('span'))
      )
    );
  });

  it('should not match <button disabled><span><i></i></span></button>', function () {
    fixture.innerHTML = '<button disabled><span><i>Hi</i></span></button>';
    var target = fixture.querySelector('button');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(
      rule.matches(
        target.querySelector('i'),
        axe.utils.getNodeFromTree(target.querySelector('i'))
      )
    );
  });

  it('should not match <input type=image>', function () {
    fixture.innerHTML = '<input type="image">';
    var target = fixture.querySelector('input');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it("should not match a disabled input's label - explicit label", function () {
    fixture.innerHTML =
      '<label for="t1">Test</label><input type="text" id="t1" disabled>';
    var target = fixture.querySelector('label');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it("should not match an aria-disabled input's label - explicit label", function () {
    fixture.innerHTML =
      '<label for="t1">Test</label><input type="text" id="t1" aria-disabled="true">';
    var target = fixture.querySelector('label');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it("should not match a parent aria-disabled input's label - explicit label", function () {
    fixture.innerHTML =
      '<label for="t1">Test</label><div aria-disabled="true"><input type="text" id="t1"></div>';
    var target = fixture.querySelector('label');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it("should not match a disabled input's label - implicit label (input)", function () {
    fixture.innerHTML = '<label>Test<input type="text" disabled></label>';
    var target = fixture.querySelector('label');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it("should not match a disabled input's label - implicit label (textarea)", function () {
    fixture.innerHTML = '<label>Test<textarea disabled>Hi</textarea></label>';
    var target = fixture.querySelector('label');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it("should not match a disabled input's label - implicit label (select)", function () {
    fixture.innerHTML =
      '<label>Test<select disabled><option>Test</option></select></label>';
    var target = fixture.querySelector('label');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it("should not match a disabled input's label - aria-labelledby", function () {
    fixture.innerHTML =
      '<div id="t1">Test</div><input type="text" aria-labelledby="bob t1 fred" disabled>';
    var target = fixture.querySelector('div');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should match when at least one input is not disabled - aria-labelledby', function () {
    fixture.innerHTML =
      '<div id="t1">Test</div>' +
      '<input type="text" aria-labelledby="t1" disabled />' +
      '<input type="text" aria-labelledby="t1" />';
    var target = fixture.querySelector('div');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isTrue(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should not match when inputs are disabled by an ancestor - aria-labelledby', function () {
    fixture.innerHTML =
      '<div id="t1">Test</div>' +
      '<fieldset disabled>' +
      '<input type="text" aria-labelledby="t1" />' +
      '<input type="text" aria-labelledby="t1" />' +
      '</fieldset>';
    var target = fixture.querySelector('div');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should not match aria-disabled=true', function () {
    fixture.innerHTML = '<div aria-disabled="true">hi</div>';
    var target = fixture.querySelector('div');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should not match a descendant of aria-disabled=true', function () {
    fixture.innerHTML = '<div aria-disabled="true"><span>hi</span></div>';
    var target = fixture.querySelector('span');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it("should not match an aria-disabled input's label - aria-labelledby", function () {
    fixture.innerHTML =
      '<div id="t1"><span>Test</span></div>' +
      '<div role="textbox" aria-labelledby="bob t1 fred" aria-disabled="true"></div>';
    var target = fixture.querySelector('span');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should not match a descendant of a disabled fieldset', function () {
    fixture.innerHTML =
      '<fieldset disabled><label>hi <input type="checkbox"></label></fieldset>';
    var target = fixture.querySelector('label');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should not match a descendant of an explicit label for a disabled input', function () {
    fixture.innerHTML =
      '<input id="input" type="checkbox" disabled><label for="input"><span>hi</span></label>';
    var target = fixture.querySelector('span');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should not match a descendant of an implicit label for a disabled input', function () {
    fixture.innerHTML =
      '<label for="input"><span>hi</span><input id="input" type="checkbox" disabled></label>';
    var target = fixture.querySelector('span');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should not match inert', function () {
    fixture.innerHTML = '<div inert>hi</div>';
    var target = fixture.querySelector('div');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should not match a descendant of inert', function () {
    fixture.innerHTML = '<div inert><span>hi</span></div>';
    var target = fixture.querySelector('span');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  it('should not match text outside overflow', () => {
    fixture.innerHTML = `
      <div style="overflow: hidden; width: 50px;">
        <div style="overflow: hidden; width: 25px">
          <div id="target" style="padding-left: 65px;">Hello World</div>
        </div>
      </div>
    `;
    var target = fixture.querySelector('#target');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
  });

  if (shadowSupport) {
    it('should match a descendant of an element across a shadow boundary', function () {
      fixture.innerHTML =
        '<div id="parent" style="background-color: #000;">' + '</div>';

      var shadowRoot = document
        .getElementById('parent')
        .attachShadow({ mode: 'open' });
      shadowRoot.innerHTML =
        '<div id="shadowTarget" style="color: #333">Text</div>';

      var shadowTarget =
        fixture.firstChild.shadowRoot.querySelector('#shadowTarget');
      axe.testUtils.flatTreeSetup(fixture);
      assert.isTrue(
        rule.matches(shadowTarget, axe.utils.getNodeFromTree(shadowTarget))
      );
    });

    it('should look at the correct root node when looking up an explicit label and disabled input', function () {
      fixture.innerHTML = '<div id="parent">' + '<input id="input">' + '</div>';

      var shadowRoot = document
        .getElementById('parent')
        .attachShadow({ mode: 'open' });
      shadowRoot.innerHTML =
        '<div id="shadowParent">' +
        '<label for="input" id="shadowLabel">Label</label>' +
        '<input id="input" disabled>' +
        '</div>';

      var shadowLabel =
        fixture.firstChild.shadowRoot.querySelector('#shadowLabel');
      axe.testUtils.flatTreeSetup(fixture);
      assert.isFalse(
        rule.matches(shadowLabel, axe.utils.getNodeFromTree(shadowLabel))
      );
    });

    it('should look at the correct root node when looking up implicit label and disabled input', function () {
      fixture.innerHTML = '<div id="parent">' + '<input>' + '</div>';

      var shadowRoot = document
        .getElementById('parent')
        .attachShadow({ mode: 'open' });
      shadowRoot.innerHTML =
        '<div id="shadowParent">' +
        '<label id="shadowLabel">Label <input disabled></label>' +
        '</div>';

      var shadowLabel =
        fixture.firstChild.shadowRoot.querySelector('#shadowLabel');
      axe.testUtils.flatTreeSetup(fixture);
      assert.isFalse(
        rule.matches(shadowLabel, axe.utils.getNodeFromTree(shadowLabel))
      );
    });

    it("should look at the correct root node for a disabled control's label associated w/ aria-labelledby", function () {
      fixture.innerHTML = '<div id="parent">' + '<input id="input">' + '</div>';

      var shadowRoot = document
        .getElementById('parent')
        .attachShadow({ mode: 'open' });
      shadowRoot.innerHTML =
        '<div id="shadowParent">' +
        '<label id="shadowLabel">Label</label>' +
        '<input aria-labelledby="shadowLabel" disabled>' +
        '</div>';

      var shadowLabel =
        fixture.firstChild.shadowRoot.querySelector('#shadowLabel');
      axe.testUtils.flatTreeSetup(fixture);
      assert.isFalse(
        rule.matches(shadowLabel, axe.utils.getNodeFromTree(shadowLabel))
      );
    });

    it('should handle input/label spread across the shadow boundary', function () {
      fixture.innerHTML = '<label>Text <div id="firstChild"></div></label>';

      var container = document.getElementById('firstChild');
      var shadowRoot = container.attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = '<input type="text" id="input" disabled />';

      var shadowTarget = container.shadowRoot.querySelector('#input');
      axe.testUtils.flatTreeSetup(fixture);
      assert.isFalse(
        rule.matches(shadowTarget, axe.utils.getNodeFromTree(shadowTarget))
      );
    });

    it('should look at the children of a virtual node for overlap', function () {
      fixture.innerHTML =
        '<div id="parent">' +
        '<div id="firstChild" style="background-color: #ccc; color: #fff;"></div>' +
        '</div>';

      var shadowRoot = document
        .getElementById('firstChild')
        .attachShadow({ mode: 'open' });
      shadowRoot.innerHTML =
        'Some text' +
        '<p style="color: #fff;" id="shadowTarget">Other text</p>';

      var firstChild = fixture.querySelector('#firstChild');
      axe.testUtils.flatTreeSetup(fixture);
      assert.isTrue(
        rule.matches(firstChild, axe.utils.getNodeFromTree(firstChild))
      );
    });

    it('should handle an input added through slotted content', function () {
      fixture.innerHTML =
        '<label>Option 1 <span class="slotted">' +
        '<input type="text" name="slottedLabel" />' +
        '</span></label>';

      function createContentSlotted() {
        var group = document.createElement('span');
        group.innerHTML = '<slot></slot>';
        return group;
      }

      var slotted = fixture.querySelector('.slotted');
      var shadowRoot = slotted.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(createContentSlotted());

      var input = slotted.querySelector('input');
      axe.testUtils.flatTreeSetup(fixture);
      assert.isTrue(rule.matches(input, axe.utils.getNodeFromTree(input)));
    });
  }

  describe('with font icons', () => {
    before(async () => {
      const materialFont = new FontFace(
        'Material Icons',
        'url(/test/assets/MaterialIcons.woff2)'
      );
      await materialFont.load();
      document.fonts.add(materialFont);
    });

    it('is false for a single icon', () => {
      fixture.innerHTML =
        '<div id="target" style="font-family: \'Material Icons\'">delete</div>';
      const target = fixture.querySelector('#target');
      axe.testUtils.flatTreeSetup(fixture);
      assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
    });

    it('is false for multiple icons', () => {
      fixture.innerHTML = `<div id="target" style="font-family: \'Material Icons\'">
          check star favorite
        </div>`;
      const target = fixture.querySelector('#target');
      axe.testUtils.flatTreeSetup(fixture);
      assert.isFalse(rule.matches(target, axe.utils.getNodeFromTree(target)));
    });
  });
});
