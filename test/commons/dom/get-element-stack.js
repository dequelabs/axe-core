describe('dom.getElementStack', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var getElementStack = axe.commons.dom.getElementStack;
  var shadowSupported = axe.testUtils.shadowSupport.v1;

  function mapToIDs(stack) {
    return stack
      .map(function (node) {
        return node.id;
      })
      .filter(function (id) {
        return !!id;
      });
  }

  afterEach(function () {
    fixture.innerHTML = '';
  });

  describe('stack order', function () {
    it('should return stack in DOM order of non-positioned elements', function () {
      fixture.innerHTML =
        '<main id="1">' +
        '<div id="2">' +
        '<p id="target">Hello World</p>' +
        '</div>' +
        '</main>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#target');
      var stack = mapToIDs(getElementStack(target));
      assert.deepEqual(stack, ['target', '2', '1', 'fixture']);
    });

    it('should not return elements outside of the stack', function () {
      fixture.innerHTML =
        '<main id="1">' +
        '<div id="2">' +
        '<span style="display:block">Foo</span>' +
        '<p id="target">Hello World</p>' +
        '</div>' +
        '</main>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#target');
      var stack = mapToIDs(getElementStack(target));
      assert.deepEqual(stack, ['target', '2', '1', 'fixture']);
    });

    it('should return stack in DOM order of non-positioned elements with z-index', function () {
      fixture.innerHTML =
        '<div id="1" style=";width:40px;height:40px;">' +
        '<div id="target" style="width:40px;height:40px;z-index:100">hello world</div>' +
        '</div>' +
        '<div id="2" style="width:40px;height:40px;margin-top:-33px;">' +
        '<div id="3" style="width:40px;height:40px;">Some text</div>' +
        '</div>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#target');
      var stack = mapToIDs(getElementStack(target));
      // Browsers seem to be buggy, which suggest  [3, target, 2, 1, fixture]
      // We're following the spec in this.
      // @see https://codepen.io/straker/pen/gOxpJyE
      assert.deepEqual(stack, ['3', '2', 'target', '1', 'fixture']);
    });

    it('should should handle positioned elements without z-index', function () {
      // see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/Stacking_without_z-index
      fixture.innerHTML =
        '<div id="1" style="width:40px;height:40px;position:absolute;top:0;">' +
        'DIV #1<br />position:absolute;</div>' +
        '<div id="2" style="width:40px;height:40px;position:relative;top:0;">' +
        'DIV #2<br />position:relative;</div>' +
        '<div id="3" style="width:40px;height:40px;position:relative;top:-40px;">' +
        'DIV #3<br />position:relative;</div>' +
        '<div id="4" style="width:40px;height:40px;position:absolute;top:0;">' +
        'DIV #4<br />position:absolute;</div>' +
        '<div id="target" style="width:40px;height:40px;margin-top:-80px;">' +
        'DIV #5<br />position:static;</div>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#target');
      var stack = mapToIDs(getElementStack(target));
      assert.deepEqual(stack, ['4', '3', '2', '1', 'target', 'fixture']);
    });

    it('should handle floating and positioned elements without z-index', function () {
      // see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/Stacking_and_float
      fixture.innerHTML =
        '<div id="1" style="width:40px;height:40px;position:absolute;top:0;">' +
        'DIV #1<br />position:absolute;</div>' +
        '<div id="2" style="width:40px;height:40px;float:left;">' +
        'DIV #2<br />float:left;</div>' +
        '<div id="target" style="width:40px;height:40px;">' +
        'DIV #3<br />no positioning</div>' +
        '<div id="4" style="width:40px;height:40px;position:absolute;top:0;">' +
        'DIV #4<br />position:absolute;</div>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#target');
      var stack = mapToIDs(getElementStack(target));
      assert.deepEqual(stack, ['4', '1', '2', 'target', 'fixture']);
    });

    it('should handle floating parent elements', function () {
      fixture.innerHTML =
        '<div id="1" style="float: left; background: #000000; color: #fff;">' +
        '<div id="2"><span id="target">whole picture</span></div>' +
        '</div>' +
        '<div id="3">' +
        '<div id="4" style="background: #f2f2f2;">English</div>' +
        '</div>';

      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#target');
      var stack = mapToIDs(getElementStack(target));
      assert.deepEqual(stack, ['target', '2', '1', '4', '3', 'fixture']);
    });

    it('should handle z-index positioned elements in the same stacking context', function () {
      // see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/Stacking_context_example_1
      fixture.innerHTML =
        '<div id="target" style="width:40px;height:40px;position:relative;">' +
        '<br />DIV #1' +
        '<br />position:relative;' +
        '<div id="2" style="width:40px;height:40px;position:absolute;top:0;z-index:1;">' +
        '<br />DIV #2' +
        '<br />position:absolute;' +
        '<br />z-index:1;' +
        '</div>' +
        '</div>' +
        '<br />' +
        '<div id="3" style="width:40px;height:40px;position:relative;    margin-top:-58px;">' +
        '<br />DIV #3' +
        '<br />position:relative;' +
        '<div id="4" style="width:40px;height:40px;position:absolute;top:0;z-index:2;">' +
        '<br />DIV #4' +
        '<br />position:absolute;' +
        '<br />z-index:2;' +
        '</div>' +
        '</div>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#target');
      var stack = mapToIDs(getElementStack(target));
      assert.deepEqual(stack, ['4', '2', '3', 'target', 'fixture']);
    });

    it('should handle z-index positioned elements in different stacking contexts', function () {
      // see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/Stacking_context_example_2
      fixture.innerHTML =
        '<div id="target" style="width:40px;height:40px;position:relative;">' +
        '<br />DIV #1' +
        '<br />position:relative;' +
        '<div id="2" style="width:40px;height:40px;position:absolute;top:0;z-index:2;">' +
        '<br />DIV #2' +
        '<br />position:absolute;' +
        '<br />z-index:2;' +
        '</div>' +
        '</div>' +
        '<br />' +
        '<div id="3" style="width:40px;height:40px;position:relative;    margin-top:-58px;z-index:1">' +
        '<br />DIV #3' +
        '<br />position:relative;' +
        '<div id="4" style="width:40px;height:40px;position:absolute;top:0;z-index:10;">' +
        '<br />DIV #4' +
        '<br />position:absolute;' +
        '<br />z-index:10;' +
        '</div>' +
        '</div>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#target');
      var stack = mapToIDs(getElementStack(target));
      assert.deepEqual(stack, ['2', '4', '3', 'target', 'fixture']);
    });

    it('should handle complex stacking context', function () {
      // see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context
      fixture.innerHTML =
        '<div id="1" style="position:absolute;top:0;left:0;width:40px;height:40px;z-index:5;">' +
        'Division Element #1<br/>' +
        'position: relative;<br/>' +
        'z-index: 5;' +
        '</div>' +
        '<div id="2" style="position:absolute;top:0;left:0;width:40px;height:40px;z-index:2;">' +
        'Division Element #2<br/>' +
        'position: relative;<br/>' +
        'z-index: 2;' +
        '</div>' +
        '<div id="3" style="position:absolute;top:0;left:0;width:40px;height:40px;z-index:4;">' +
        '<div id="4" style="position:absolute;top:0;left:0;width:40px;height:40px;z-index:6;">' +
        'Division Element #4<br/>' +
        'position: relative;<br/>' +
        'z-index: 6;' +
        '</div>' +
        'Division Element #3<br/>' +
        'position: absolute;<br/>' +
        'z-index: 4;' +
        '<div id="5" style="position:absolute;top:0;left:0;width:40px;height:40px;z-index:1;">' +
        'Division Element #5<br/>' +
        'position: relative;<br/>' +
        'z-index: 1;' +
        '</div>' +
        '' +
        '<div id="target" style="position:absolute;top:0;left:0;width:40px;height:40px;z-index:3;">' +
        'Division Element #6<br/>' +
        'position: absolute;<br/>' +
        'z-index: 3;' +
        '</div>' +
        '</div>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#target');
      var stack = mapToIDs(getElementStack(target));
      assert.deepEqual(stack, ['1', '4', 'target', '5', '3', '2']);
    });

    it('should correctly order children of position elements without z-index', function () {
      fixture.innerHTML =
        '<div id="1" style="position:relative;width:40px;height:40px;">' +
        '<div id="target" style="width:40px;height:40px;"></div>' +
        '</div>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#target');
      var stack = mapToIDs(getElementStack(target));
      assert.deepEqual(stack, ['target', '1', 'fixture']);
    });

    it('should correctly order children of position elements with z-index', function () {
      fixture.innerHTML =
        '<div id="1" style="position:relative;width:40px;height:40px;z-index:1">' +
        '<div id="target" style="width:40px;height:40px;"></div>' +
        '</div>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#target');
      var stack = mapToIDs(getElementStack(target));
      assert.deepEqual(stack, ['target', '1', 'fixture']);
    });

    it('should handle modals on top of the stack', function () {
      fixture.innerHTML =
        '<main id="1">' +
        '<div id="2">' +
        '<p id="target">Hello World</p>' +
        '</div>' +
        '</main>' +
        '<div id="3" style="position:absolute;top:0;left:0;right:0;height:100px"></div>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#target');
      var stack = mapToIDs(getElementStack(target));
      assert.deepEqual(stack, ['3', 'target', '2', '1', 'fixture']);
    });

    it('should handle "pointer-events:none"', function () {
      fixture.innerHTML =
        '<main id="1">' +
        '<div id="2">' +
        '<p id="target">Hello World</p>' +
        '</div>' +
        '</main>' +
        '<div id="3" style="position:absolute;top:0;left:0;right:0;height:100px;pointer-events:none"></div>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#target');
      var stack = mapToIDs(getElementStack(target));
      assert.deepEqual(stack, ['3', 'target', '2', '1', 'fixture']);
    });

    it('should return elements left out by document.elementsFromPoint', function () {
      fixture.innerHTML =
        '<main id="1">' +
        '<div id="2">' +
        '<label id="3">Foo<input id="target"></label>' +
        '</div>' +
        '</main>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#target');
      var stack = mapToIDs(getElementStack(target));
      assert.deepEqual(stack, ['target', '3', '2', '1', 'fixture']);
    });

    it('should not return elements that do not fully cover the target', function () {
      fixture.innerHTML =
        '<div id="1" style="position:relative;">' +
        '<div id="2" style="position:absolute;width:300px;height:19px;"></div>' +
        '<p id="target" style="position:relative;z-index:1;width:300px;height:40px;">Text oh heyyyy <a href="#" id="target">and here\'s <br>a link</a></p>' +
        '</div>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#target');
      var stack = mapToIDs(getElementStack(target));
      assert.deepEqual(stack, ['target', '1', 'fixture']);
    });

    it('should not return parent elements that do not fully cover the target', function () {
      fixture.innerHTML =
        '<div id="1" style="height:20px;position:relative;">' +
        '<div id="target" style="position:absolute;top:21px;">Text</div>' +
        '</div>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#target');
      var stack = mapToIDs(getElementStack(target));
      assert.deepEqual(stack, ['target']);
    });

    it('should return elements that partially cover the target', function () {
      fixture.innerHTML =
        '<div id="1" style="height:40px;position:relative;">' +
        '<div id="2" style="height:20px;"></div>' +
        '<div id="target" style="position:absolute;margin-top:-11px;">Text</div>' +
        '</div>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#target');
      var stack = mapToIDs(getElementStack(target));
      assert.deepEqual(stack, ['target', '2', '1', 'fixture']);
    });

    it('should handle negative z-index', function () {
      fixture.innerHTML =
        '<main id="1">' +
        '<div id="2" style="position:relative;z-index:-10">' +
        '<p id="target">Hello World</p>' +
        '</div>' +
        '</main>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#target');
      var stack = mapToIDs(getElementStack(target));
      assert.deepEqual(stack, ['1', 'fixture', 'target', '2']);
    });

    it('should not add hidden elements', function () {
      fixture.innerHTML =
        '<main id="1">' +
        '<div id="2" style="position: absolute; display: none;">Some text</div>' +
        '<div id="3" style="position: absolute; visibility: hidden">Some text</div>' +
        '<div id="4" style="position: absolute; opacity: 0">Some text</div>' +
        '<span id="target">Hello World</span>' +
        '</main>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#target');
      var stack = mapToIDs(getElementStack(target));
      assert.deepEqual(stack, ['target', '1', 'fixture']);
    });

    it('should correctly position children of positioned parents', function () {
      fixture.innerHTML =
        '<div id="1" style="position: relative; padding: 60px 0;">Some text</div>' +
        '<section id="2" style="position: relative; padding: 60px 0;">' +
        '<div id="3" style="margin-top: -120px;">' +
        '<h3 id="target">Hi, Hello World.</h3>' +
        '</div>' +
        '</section>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#target');
      var stack = mapToIDs(getElementStack(target));
      assert.deepEqual(stack, ['target', '3', '1', 'fixture']);
    });

    it('should correctly position siblings with positioned children correctly', function () {
      fixture.innerHTML =
        '<div id="1">Some text</div>' +
        '<div id="2" style="position: absolute; top: 0; left: 0;">Some text</div>' +
        '<div id="3" style="position: absolute; top: 0; left: 0;">' +
        '<div id="4" style="position: absolute; top: 0; left: 0;">Some text</div>' +
        '<div id="5">' +
        '<div id="target">Some text</div>' +
        '</div>' +
        '</div>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#target');
      var stack = mapToIDs(getElementStack(target));
      assert.deepEqual(stack, ['4', 'target', '5', '3', '2', '1', 'fixture']);
    });

    it('should correctly position children of float elements with position elements', function () {
      fixture.innerHTML =
        '<div id="1" style="width: 50px; height: 50px; position: relative;">' +
        '<div id="2" style="width: 50px; height: 50px; float: left;">' +
        '<div id="3" style="width: 50px; height: 50px;">' +
        '<div id="4" style="width: 50px; height: 50px;">' +
        '<div id="target" style="width: 50px; height: 50px; position: relative;"></div>' +
        '</div>' +
        '</div>' +
        '<div id="5" style="width: 50px; height: 50px; position: absolute; top:0"></div>' +
        '</div>' +
        '</div>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#target');
      var stack = mapToIDs(getElementStack(target));
      assert.deepEqual(stack, ['5', 'target', '4', '3', '2', '1', 'fixture']);
    });

    it('should return empty array for hidden elements', function () {
      fixture.innerHTML =
        '<main id="1">' +
        '<div id="2" style="position: absolute; display: none">' +
        '<span id="3">text</span>' +
        '<span id="target">Hello World</span>' +
        '</div>' +
        '</main>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#target');
      var stack = mapToIDs(getElementStack(target));
      assert.deepEqual(stack, []);
    });

    it('should return empty array for children of 0 height scrollable regions', function () {
      fixture.innerHTML =
        '<main id="1">' +
        '<div id="2" style="overflow: scroll; height: 0">' +
        '<span id="3">text</span>' +
        '<span id="target">Hello World</span>' +
        '</div>' +
        '</main>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#target');
      var stack = mapToIDs(getElementStack(target));
      assert.deepEqual(stack, []);
    });

    it('should throw error if element midpoint-x exceeds the grid', function () {
      fixture.innerHTML = '<div id="target">Hello World</div>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#target');
      var vNode = axe.utils.getNodeFromTree(target);
      Object.defineProperty(vNode, 'boundingClientRect', {
        get: function () {
          return {
            left: 0,
            top: 10,
            width: 10000,
            height: 10
          };
        }
      });
      assert.throws(function () {
        getElementStack(target);
      }, 'Element midpoint exceeds the grid bounds');
    });

    it('should throw error if element midpoint-y exceeds the grid', function () {
      fixture.innerHTML = '<div id="target">Hello World</div>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#target');
      var vNode = axe.utils.getNodeFromTree(target);
      Object.defineProperty(vNode, 'boundingClientRect', {
        get: function () {
          return {
            left: 0,
            top: 10,
            width: 10,
            height: 10000
          };
        }
      });
      assert.throws(function () {
        getElementStack(target);
      }, 'Element midpoint exceeds the grid bounds');
    });

    it('should ignore element which exactly overlaps midpoint of target element', function () {
      fixture.innerHTML =
        '<div id="target" style="width: 100%; height: 50px;">' +
        '<h4 id="1" style="margin: 0; width: 100%; height: 25px;">Foo</h4>' +
        'Bar' +
        '</div>';

      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#target');
      var stack = mapToIDs(getElementStack(target));
      assert.deepEqual(stack, ['target', 'fixture']);
    });

    // IE11 either only supports clip paths defined by url() or not at all,
    // MDN and caniuse.com give different results...
    it('should not add hidden elements using clip-path', function () {
      fixture.innerHTML =
        '<main id="1">' +
        '<div id="2" style="position: absolute; clip: rect(1px, 1px, 1px, 1px);">Some text</div>' +
        '<span id="target">Hello World</span>' +
        '</main>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#target');
      var stack = mapToIDs(getElementStack(target));
      assert.deepEqual(stack, ['target', '1', 'fixture']);
    });

    (shadowSupported ? it : xit)(
      'should sort shadow dom elements correctly',
      function () {
        fixture.innerHTML = '<div id="container"></div>';
        var container = fixture.querySelector('#container');
        var shadow = container.attachShadow({ mode: 'open' });
        shadow.innerHTML = '<span id="shadowTarget">Text</span>';
        axe.testUtils.flatTreeSetup(fixture);

        var target = shadow.querySelector('#shadowTarget');
        var stack = mapToIDs(getElementStack(target));
        assert.deepEqual(stack, ['shadowTarget', 'container', 'fixture']);
      }
    );

    (shadowSupported ? it : xit)(
      'should sort nested shadow dom elements correctly',
      function () {
        fixture.innerHTML = '<div id="container"></div>';
        var container = fixture.querySelector('#container');
        var shadow = container.attachShadow({ mode: 'open' });

        shadow.innerHTML = '<div id="shadowContainer"></div>';
        var nestedContainer = shadow.querySelector('#shadowContainer');
        var nestedShadow = nestedContainer.attachShadow({ mode: 'open' });

        nestedShadow.innerHTML = '<span id="shadowTarget">Text</span>';
        axe.testUtils.flatTreeSetup(fixture);

        var target = nestedShadow.querySelector('#shadowTarget');
        var stack = mapToIDs(getElementStack(target));
        assert.deepEqual(stack, [
          'shadowTarget',
          'shadowContainer',
          'container',
          'fixture'
        ]);
      }
    );

    (shadowSupported ? it : xit)(
      'should sort positioned shadow elements correctly',
      function () {
        fixture.innerHTML = '<div id="container"></div>';
        var container = fixture.querySelector('#container');
        var shadow = container.attachShadow({ mode: 'open' });

        shadow.innerHTML =
          '<div id="shadowContainer" style="position: relative; z-index: -1;"></div>';
        var nestedContainer = shadow.querySelector('#shadowContainer');
        var nestedShadow = nestedContainer.attachShadow({ mode: 'open' });

        nestedShadow.innerHTML = '<span id="shadowTarget">Text</span>';
        axe.testUtils.flatTreeSetup(fixture);

        var target = nestedShadow.querySelector('#shadowTarget');
        var stack = mapToIDs(getElementStack(target));
        assert.deepEqual(stack, [
          'container',
          'fixture',
          'shadowTarget',
          'shadowContainer'
        ]);
      }
    );

    (shadowSupported ? it : xit)(
      'should sort shadow elements with different trees correctly',
      function () {
        fixture.innerHTML =
          '<div id="container1"></div><div id="container2"  style="position: absolute; top: 0;">';
        var container1 = fixture.querySelector('#container1');
        var shadow1 = container1.attachShadow({ mode: 'open' });
        shadow1.innerHTML = '<span id="shadowTarget">Text</span>';

        var container2 = fixture.querySelector('#container2');
        var shadow2 = container2.attachShadow({ mode: 'open' });
        shadow2.innerHTML = '<span id="1">Container 2 text</span>';
        axe.testUtils.flatTreeSetup(fixture);

        var target = shadow1.querySelector('#shadowTarget');
        var stack = mapToIDs(getElementStack(target));
        assert.deepEqual(stack, [
          '1',
          'container2',
          'shadowTarget',
          'container1',
          'fixture'
        ]);
      }
    );
  });

  describe('scroll regions', function () {
    var origHeight = document.documentElement.style.height;
    var origOverflow = document.documentElement.style.overflowY;

    afterEach(function () {
      document.documentElement.style.height = origHeight;
      document.documentElement.style.overflowY = origOverflow;
    });

    it('should return stack of scroll regions', function () {
      fixture.innerHTML =
        '<main id="1">' +
        '<div id="2" style="overflow:auto">' +
        '<div id="3" style="height:100px">' +
        '<p id="target">Hello World</p>' +
        '</div>' +
        '</div>' +
        '</main>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#target');
      var stack = mapToIDs(getElementStack(target));
      assert.deepEqual(stack, ['target', '3', '2', '1', 'fixture']);
    });

    it('should return stack when scroll region is larger than parent', function () {
      fixture.innerHTML =
        '<main id="1">' +
        '<div id="2" style="overflow:auto;height:40px">' +
        '<div id="3" style="height:100px">' +
        '<p id="target">Hello World</p>' +
        '</div>' +
        '</div>' +
        '</main>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#target');
      var stack = mapToIDs(getElementStack(target));
      assert.deepEqual(stack, ['target', '3', '2', '1', 'fixture']);
    });

    it('should return stack of recursive scroll regions', function () {
      fixture.innerHTML =
        '<main id="1">' +
        '<div id="2" style="overflow:auto;height:40px">' +
        '<div id="3" style="height:100px">' +
        '<div id="4" style="overflow:auto;height:40px">' +
        '<div id="5" style="overflow:auto;height:100px">' +
        '<p id="target">Hello World</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</main>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#target');
      var stack = mapToIDs(getElementStack(target));
      assert.deepEqual(stack, ['target', '5', '4', '3', '2', '1', 'fixture']);
    });

    it('should handle html as a scroll region', function () {
      fixture.innerHTML =
        '<main id="1">' +
        '<div id="2" style="overflow:auto">' +
        '<div id="3" style="height:100px">' +
        '<p id="target">Hello World</p>' +
        '</div>' +
        '</div>' +
        '</main>';
      document.documentElement.style.height = '5000px';
      document.documentElement.style.overflowY = 'scroll';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#target');
      var stack = mapToIDs(getElementStack(target));
      assert.deepEqual(stack, ['target', '3', '2', '1', 'fixture']);
    });

    it('should use correct scroll region parent', function () {
      fixture.innerHTML =
        '<div id="1" style="overflow: scroll; height: 50px;">' +
        '<div id="2" style="overflow: scroll; height: 100px;">' +
        '<div id="3">' +
        '<div id="target" style="margin-top: 200px;">text</div>' +
        '</div>' +
        '</div>' +
        '</div>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#target');
      var stack = mapToIDs(getElementStack(target));
      assert.deepEqual(stack, ['target', '3', '2', '1', 'fixture']);
    });
  });
});
