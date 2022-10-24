var fixture = document.getElementById('fixture');
var shadowSupport = axe.testUtils.shadowSupport;

describe('axe.utils.isShadowRoot', function () {
  'use strict';

  function createStyle(box) {
    var style = document.createElement('style');
    style.textContent =
      'div.breaking { color: Red;font-size: 20px; border: 1px dashed Purple; }' +
      (box ? 'slot { display: block; }' : '') +
      'div.other { padding: 2px 0 0 0; border: 1px solid Cyan; }';
    return style;
  }

  var isShadowRoot = axe.utils.isShadowRoot;

  it('returns false if the node has no shadowRoot', function () {
    assert.isFalse(isShadowRoot({ nodeName: 'DIV', shadowRoot: undefined }));
  });
  it('returns true if the native element allows shadow DOM', function () {
    assert.isTrue(isShadowRoot({ nodeName: 'DIV', shadowRoot: {} }));
    assert.isTrue(isShadowRoot({ nodeName: 'H1', shadowRoot: {} }));
    assert.isTrue(isShadowRoot({ nodeName: 'ASIDE', shadowRoot: {} }));
  });
  it('returns true if a custom element with shadowRoot', function () {
    assert.isTrue(isShadowRoot({ nodeName: 'X-BUTTON', shadowRoot: {} }));
    assert.isTrue(
      isShadowRoot({ nodeName: 'T1000-SCHWARZENEGGER', shadowRoot: {} })
    );
  });
  it('returns true if an invalid custom element with shadowRoot', function () {
    assert.isFalse(isShadowRoot({ nodeName: '0-BUZZ', shadowRoot: {} }));
    assert.isFalse(isShadowRoot({ nodeName: '--ELM--', shadowRoot: {} }));
  });
  it('returns false if the native element does not allow shadow DOM', function () {
    assert.isFalse(isShadowRoot({ nodeName: 'IFRAME', shadowRoot: {} }));
    assert.isFalse(isShadowRoot({ nodeName: 'STRONG', shadowRoot: {} }));
  });

  if (shadowSupport.v1) {
    describe('shadow DOM v1', function () {
      afterEach(function () {
        fixture.innerHTML = '';
      });
      beforeEach(function () {
        function createStoryGroup(className, slotName) {
          var group = document.createElement('div');
          group.className = className;
          // Empty string in slot name attribute or absence thereof work the same, so no need for special handling.
          group.innerHTML =
            '<ul><slot name="' +
            slotName +
            '">fallback content<li>one</li></slot></ul>';
          return group;
        }

        function makeShadowTree(storyList) {
          var root = storyList.attachShadow({ mode: 'open' });
          root.appendChild(createStyle());
          root.appendChild(createStoryGroup('breaking', 'breaking'));
          root.appendChild(createStoryGroup('other', ''));
        }
        var str =
          '<div class="stories"><li>1</li>' +
          '<li>2</li><li class="breaking" slot="breaking">3</li>' +
          '<li>4</li><li>5</li><li class="breaking" slot="breaking">6</li></div>';
        str +=
          '<div class="stories"><li>1</li>' +
          '<li>2</li><li class="breaking" slot="breaking">3</li>' +
          '<li>4</li><li>5</li><li class="breaking" slot="breaking">6</li></div>';
        str += '<div class="stories"></div>';
        fixture.innerHTML = str;

        fixture.querySelectorAll('.stories').forEach(makeShadowTree);
      });
      it('should support shadow DOM v1', function () {
        assert.isDefined(fixture.firstChild.shadowRoot);
      });
    });
  }
});
