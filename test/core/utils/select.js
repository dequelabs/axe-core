describe('axe.utils.select', function () {
  'use strict';
  // TODO: Refactor

  function $id(id) {
    return document.getElementById(id);
  }

  var fixture = document.getElementById('fixture');

  afterEach(function () {
    fixture.innerHTML = '';
    axe._selectCache = undefined;
  });

  it('should be a function', function () {
    assert.isFunction(axe.utils.select);
  });

  it('should return an array', function () {
    assert.isArray(axe.utils.select('div', { include: [] }));
  });

  describe('selector', function () {
    it('should accept a selector', function () {
      var div = document.createElement('div');
      div.id = 'monkeys';
      fixture.appendChild(div);

      var result = axe.utils.select('#monkeys', {
        include: [axe.utils.getFlattenedTree(document)[0]]
      });

      assert.equal(result[0].actualNode, div);
    });
  });

  describe('context', function () {
    it('should include', function () {
      fixture.innerHTML =
        '<div id="monkeys"><div id="bananas" class="bananas"></div></div>';

      var result = axe.utils.select('.bananas', {
        include: [axe.utils.getFlattenedTree($id('monkeys'))[0]]
      });

      assert.deepEqual([result[0].actualNode], [$id('bananas')]);
    });

    it('should exclude', function () {
      fixture.innerHTML =
        '<div id="monkeys"><div id="bananas" class="bananas"></div></div>';
      axe.setup();

      var result = axe.utils.select('.bananas', {
        include: [axe.utils.getNodeFromTree($id('fixture'))],
        exclude: [axe.utils.getNodeFromTree($id('monkeys'))]
      });

      assert.deepEqual(result, []);
    });

    it('should pick the deepest exclude/include - exclude winning', function () {
      fixture.innerHTML =
        '<div id="include1">' +
        '	<div id="exclude1">' +
        '		<div id="include2">' +
        '			<div id="exclude2">' +
        '				<div class="bananas"></div>' +
        '			</div>' +
        '		</div>' +
        '	</div>' +
        '</div>';
      axe.setup(fixture);

      var result = axe.utils.select('.bananas', {
        include: [
          axe.utils.getNodeFromTree($id('include1')),
          axe.utils.getNodeFromTree($id('include2'))
        ],
        exclude: [
          axe.utils.getNodeFromTree($id('exclude1')),
          axe.utils.getNodeFromTree($id('exclude2'))
        ]
      });
      assert.deepEqual(result, []);
    });

    it('should pick the deepest exclude/include - include winning', function () {
      fixture.innerHTML =
        '<div id="include1">' +
        '	<div id="exclude1">' +
        '		<div id="include2">' +
        '			<div id="exclude2">' +
        '				<div id="include3">' +
        '					<div id="bananas" class="bananas"></div>' +
        '				</div>' +
        '			</div>' +
        '		</div>' +
        '	</div>' +
        '</div>';
      axe.setup();

      var result = axe.utils.select('.bananas', {
        include: [
          axe.utils.getNodeFromTree($id('include3')),
          axe.utils.getNodeFromTree($id('include2')),
          axe.utils.getNodeFromTree($id('include1'))
        ],
        exclude: [
          axe.utils.getNodeFromTree($id('exclude1')),
          axe.utils.getNodeFromTree($id('exclude2'))
        ]
      });

      assert.deepEqual([result[0].actualNode], [$id('bananas')]);
    });
  });

  it('should only contain unique elements', function () {
    fixture.innerHTML =
      '<div id="monkeys"><div id="bananas" class="bananas"></div></div>';
    var tree = axe.utils.getFlattenedTree($id('fixture'))[0];
    var monkeys = tree.children[0];
    var result = axe.utils.select('.bananas', {
      include: [tree, monkeys]
    });

    assert.lengthOf(result, 1);
    assert.equal(result[0].actualNode, $id('bananas'));
  });

  it('should not return duplicates on overlapping includes', function () {
    fixture.innerHTML =
      '<div id="zero"><div id="one"><div id="target1" class="bananas"></div></div>' +
      '<div id="two"><div id="target2" class="bananas"></div></div></div>';
    axe.setup();

    var result = axe.utils.select('.bananas', {
      include: [
        axe.utils.getNodeFromTree($id('zero')),
        axe.utils.getNodeFromTree($id('one'))
      ]
    });

    assert.deepEqual(
      result.map(function (n) {
        return n.actualNode;
      }),
      [$id('target1'), $id('target2')]
    );
    assert.equal(result.length, 2);
  });

  it('should return the cached result if one exists', function () {
    fixture.innerHTML =
      '<div id="zero"><div id="one"><div id="target1" class="bananas"></div></div>' +
      '<div id="two"><div id="target2" class="bananas"></div></div></div>';

    axe._selectCache = [
      {
        selector: '.bananas',
        result: 'fruit bat'
      }
    ];
    var result = axe.utils.select('.bananas', {
      include: [axe.utils.getFlattenedTree($id('zero'))[0]]
    });
    assert.equal(result, 'fruit bat');
  });
});
