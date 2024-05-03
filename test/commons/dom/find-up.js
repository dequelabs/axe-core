/* global xit */
describe('dom.findUp', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let shadowSupport = axe.testUtils.shadowSupport;

  afterEach(function () {
    fixture.innerHTML = '';
    axe._tree = undefined;
  });

  it('should find parents based on selector', function () {
    fixture.innerHTML =
      '<div class="target"><div id="target" class="target"><span><span><span><div>' +
      '<div><div id="start"></div></div></div></span></span></span></div></div>';

    let start = document.getElementById('start'),
      target = document.getElementById('target');

    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.equal(
      axe.commons.dom.findUp(start, '.target'),
      target,
      'Should find it!'
    );
  });

  it('should return null if it cant find a match anywhere in the document', function () {
    fixture.innerHTML = '<div id="start"></div>';
    let start = document.getElementById('start');

    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isNull(axe.commons.dom.findUp(start, '.nomatchyplzkthx'));
  });

  it('should return null if it cant find a match anywhere above the start', function () {
    fixture.innerHTML = '<div id="start"></div><div class="target"></div>';
    let start = document.getElementById('start');

    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isNull(axe.commons.dom.findUp(start, '.target'));
  });

  (shadowSupport.v0 ? it : xit)(
    'should walk up the assigned content (v0)',
    function () {
      function createContentSlotted() {
        let group = document.createElement('div');
        group.innerHTML =
          '<div id="target" style="display:none;">Stuff<content></content></div>';
        return group;
      }
      function makeShadowTree(node) {
        let root = node.createShadowRoot();
        let div = document.createElement('div');
        root.appendChild(div);
        div.appendChild(createContentSlotted());
      }

      fixture.innerHTML = '<label><div><p><a>hello</a></p></div></label>';
      makeShadowTree(fixture.querySelector('div'));
      let tree = axe.testUtils.flatTreeSetup(fixture.firstChild);
      let el = axe.utils.querySelectorAll(tree, 'a')[0];
      assert.equal(
        axe.commons.dom.findUp(el.actualNode, 'label'),
        fixture.firstChild
      );
    }
  );

  (shadowSupport.v0 ? it : xit)(
    'should walk down the shadow DOM v0',
    function () {
      function createContent() {
        let group = document.createElement('div');
        group.innerHTML = '<a>thing</a>';
        return group;
      }
      function makeShadowTree(node) {
        let root = node.createShadowRoot();
        let div = document.createElement('div');
        div.appendChild(createContent());
        root.appendChild(div);
      }

      fixture.innerHTML = '<label><div></div></label>';
      makeShadowTree(fixture.querySelector('div'));
      let tree = axe.testUtils.flatTreeSetup(fixture.firstChild);
      let el = axe.utils.querySelectorAll(tree, 'a')[0];
      assert.equal(
        axe.commons.dom.findUp(el.actualNode, 'label'),
        fixture.firstChild
      );
    }
  );

  (shadowSupport.v0 ? it : xit)(
    'should work on shadow root children',
    function () {
      fixture.innerHTML = '<div role="list" id="something"></div>';
      let shadow = fixture.querySelector('#something').createShadowRoot();

      shadow.innerHTML = '<div role="listitem">item 1</div>';
      let listItem = shadow.querySelector('[role=listitem]');

      axe.testUtils.flatTreeSetup(fixture.firstChild);
      assert.equal(
        axe.commons.dom.findUp(listItem, '[role=list]'),
        fixture.firstChild
      );
    }
  );

  (shadowSupport.v1 ? it : xit)(
    'should walk up the assigned slot',
    function () {
      function createContentSlotted() {
        let group = document.createElement('div');
        group.innerHTML =
          '<div id="target" style="display:none;">Stuff<slot></slot></div>';
        return group;
      }
      function makeShadowTree(node) {
        let root = node.attachShadow({ mode: 'open' });
        let div = document.createElement('div');
        root.appendChild(div);
        div.appendChild(createContentSlotted());
      }

      fixture.innerHTML = '<label><div><p><a>hello</a></p></div></label>';
      makeShadowTree(fixture.querySelector('div'));
      let tree = axe.testUtils.flatTreeSetup(fixture.firstChild);
      let el = axe.utils.querySelectorAll(tree, 'a')[0];
      assert.equal(
        axe.commons.dom.findUp(el.actualNode, 'label'),
        fixture.firstChild
      );
    }
  );

  (shadowSupport.v1 ? it : xit)(
    'should find element in assigned slot, not in the host document',
    function () {
      function createContentSlotted() {
        let group = document.createElement('div');
        group.className = 'target';
        let slot = document.createElement('slot');
        group.appendChild(slot);
        return group;
      }
      function makeShadowTree(node) {
        let root = node.attachShadow({ mode: 'open' });
        let div = document.createElement('div');
        root.appendChild(div);
        div.appendChild(createContentSlotted());
      }

      fixture.innerHTML = '<label><div><p><a>hello</a></p></div></label>';
      makeShadowTree(fixture.querySelector('div'));
      let tree = axe.testUtils.flatTreeSetup(fixture.firstChild);
      let el = axe.utils.querySelectorAll(tree, 'a')[0];
      let target = axe.utils.querySelectorAll(tree, '.target')[0];
      assert.equal(
        axe.commons.dom.findUp(el.actualNode, 'div'),
        target.actualNode
      );
    }
  );

  (shadowSupport.v1 ? it : xit)('should walk up the shadow DOM', function () {
    function createContent() {
      let group = document.createElement('div');
      group.innerHTML = '<a>thing</a>';
      return group;
    }
    function makeShadowTree(node) {
      let root = node.attachShadow({ mode: 'open' });
      let div = document.createElement('div');
      root.appendChild(div);
      div.appendChild(createContent());
    }

    fixture.innerHTML = '<label><div></div></label>';
    makeShadowTree(fixture.querySelector('div'));
    let tree = axe.testUtils.flatTreeSetup(fixture.firstChild);
    let el = axe.utils.querySelectorAll(tree, 'a')[0];
    assert.equal(
      axe.commons.dom.findUp(el.actualNode, 'label'),
      fixture.firstChild
    );
  });

  (shadowSupport.v1 ? it : xit)(
    'should work on shadow root children',
    function () {
      fixture.innerHTML = '<div role="list" id="something"></div>';
      let shadow = fixture
        .querySelector('#something')
        .attachShadow({ mode: 'open' });

      shadow.innerHTML = '<div role="listitem">item 1</div>';
      let listItem = shadow.querySelector('[role=listitem]');

      axe.testUtils.flatTreeSetup(fixture.firstChild);
      assert.equal(
        axe.commons.dom.findUp(listItem, '[role=list]'),
        fixture.firstChild
      );
    }
  );
});
