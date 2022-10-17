describe('forms.isDisabled', function () {
  'use strict';
  var isDisabled = axe.commons.forms.isDisabled;
  var fixtureSetup = axe.testUtils.fixtureSetup;
  var fixture = document.getElementById('fixture');
  var shadowSupport = axe.testUtils.shadowSupport;

  afterEach(function () {
    fixture.innerHTML = '';
  });

  describe('with disabled attr', function () {
    it('returns false when not set', function () {
      fixtureSetup('<input type="text" />');
      var node = axe.utils.querySelectorAll(axe._tree[0], 'input')[0];

      assert.isFalse(isDisabled(node));
    });

    it('returns true for an element that can be disabled', function () {
      fixtureSetup('<input type="text" disabled />');
      var node = axe.utils.querySelectorAll(axe._tree[0], 'input')[0];

      assert.isTrue(isDisabled(node));
    });

    it('returns false for an element that can not be disabled', function () {
      fixtureSetup('<span disabled>Hello</span>');
      var node = axe.utils.querySelectorAll(axe._tree[0], 'span')[0];

      assert.isFalse(isDisabled(node));
    });

    it('returns true when disabled has a value', function () {
      fixtureSetup('<input type="text" disabled="yes" />');
      var node = axe.utils.querySelectorAll(axe._tree[0], 'input')[0];

      assert.isTrue(isDisabled(node));
    });

    it('returns true when in a disabled fieldset', function () {
      fixtureSetup(
        '<fieldset disabled>' + '<span>Hello world</span>' + '</fieldset>'
      );
      var node = axe.utils.querySelectorAll(axe._tree[0], 'span')[0];

      assert.isTrue(isDisabled(node));
    });

    it('returns true when in a disabled button', function () {
      fixtureSetup(
        '<button disabled>' + '<span>Hello world</span>' + '</button>'
      );
      var node = axe.utils.querySelectorAll(axe._tree[0], 'span')[0];

      assert.isTrue(isDisabled(node));
    });

    (shadowSupport.v1 ? it : xit)(
      'returns true for an ancestor in the flat tree that can be disabled',
      function () {
        fixture.innerHTML = '<fieldset disabled><section></section</fieldset>';
        var shadowRoot = fixture
          .querySelector('section')
          .attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = '<input type="text" />';
        axe._tree = axe.utils.getFlattenedTree(fixture);

        var node = axe.utils.querySelectorAll(axe._tree[0], 'input')[0];
        assert.isTrue(isDisabled(node));
      }
    );
  });

  describe('with aria-disabled attr', function () {
    it('returns true for an element with aria-disabled=true', function () {
      fixtureSetup('<span aria-disabled="true">hello</span>');
      var node = axe.utils.querySelectorAll(axe._tree[0], 'span')[0];

      assert.isTrue(isDisabled(node));
    });

    it('returns false for an element when aria-disabled is not true', function () {
      fixtureSetup('<span aria-disabled="not true">hello</span>');
      var node = axe.utils.querySelectorAll(axe._tree[0], 'span')[0];

      assert.isFalse(isDisabled(node));
    });

    it('returns true if the closest ancestor with aria-disabled is set to true', function () {
      fixtureSetup(
        '<section aria-disabled="false">' +
          '<div aria-disabled="true"><span>hello</span></div>' +
          '</section>'
      );
      var node = axe.utils.querySelectorAll(axe._tree[0], 'span')[0];

      assert.isTrue(isDisabled(node));
    });

    it('returns false if the closest ancestor with aria-disabled is set to false', function () {
      fixtureSetup(
        '<section aria-disabled="true">' +
          '<div aria-disabled="false"><span>hello</span></div>' +
          '</section>'
      );
      var node = axe.utils.querySelectorAll(axe._tree[0], 'span')[0];

      assert.isFalse(isDisabled(node));
    });
  });

  describe('with both disabled and aria-disabled', function () {
    it('returns true when aria-disabled=false and disabled=disabled', function () {
      fixtureSetup(
        '<fieldset aria-disabled="false" disabled>' +
          '<span>hello</span>' +
          '</fieldset>'
      );
      var node = axe.utils.querySelectorAll(axe._tree[0], 'span')[0];

      assert.isTrue(isDisabled(node));
    });
  });
});
