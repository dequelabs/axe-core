describe('axe.utils.select', () => {
  const $id = id => document.getElementById(id);
  const { Context } = axe._thisWillBeDeletedDoNotUse.base;
  const { fixtureSetup } = axe.testUtils;

  it('should be a function', () => {
    assert.isFunction(axe.utils.select);
  });

  it('should return an array', () => {
    assert.isArray(axe.utils.select('div', { include: [] }));
  });

  describe('selector', () => {
    it('should accept a selector', () => {
      fixtureSetup('<div id="monkeys"></div>');
      const context = new Context(document, axe._tree);
      const result = axe.utils.select('#monkeys', context);
      assert.equal(result[0].actualNode, $id('monkeys'));
    });
  });

  describe('context', () => {
    it('should include', () => {
      fixtureSetup(
        '<div id="monkeys"><div id="bananas" class="bananas"></div></div>'
      );
      const context = new Context('#monkeys', axe._tree);
      const result = axe.utils.select('.bananas', context);
      assert.deepEqual(result[0].actualNode, $id('bananas'));
    });

    it('should exclude', () => {
      fixtureSetup(
        '<div id="monkeys"><div id="bananas" class="bananas"></div></div>'
      );
      const context = new Context(
        {
          include: [['#fixture']],
          exclude: [['#monkeys']]
        },
        axe._tree
      );
      const result = axe.utils.select('.bananas', context);
      assert.isEmpty(result);
    });

    it('should pick the deepest exclude/include - exclude winning', () => {
      fixtureSetup(
        `<div id="include1">
        	<div id="exclude1">
        		<div id="include2">
        			<div id="exclude2">
        				<div class="bananas"></div>
        			</div>
        		</div>
        	</div>
        </div>`
      );
      const context = new Context(
        {
          include: [['#include1'], ['#include2']],
          exclude: [['#exclude1'], ['#exclude2']]
        },
        axe._tree
      );
      const result = axe.utils.select('.bananas', context);
      assert.deepEqual(result, []);
    });

    it('should pick the deepest exclude/include - include winning', () => {
      fixtureSetup(
        `<div id="include1"> 
        	<div id="exclude1"> 
        		<div id="include2"> 
        			<div id="exclude2"> 
        				<div id="include3"> 
        					<div id="bananas" class="bananas"></div> 
        				</div> 
        			</div> 
        		</div> 
        	</div> 
        </div>`
      );
      const context = new Context(
        {
          include: [['#include3'], ['#include2'], ['#include1']],
          exclude: [['#exclude1'], ['#exclude2']]
        },
        axe._tree
      );
      const result = axe.utils.select('.bananas', context);
      assert.deepEqual(result[0].actualNode, $id('bananas'));
    });
  });

  it('should only contain unique elements', () => {
    fixtureSetup(
      '<div id="monkeys"><div id="bananas" class="bananas"></div></div>'
    );
    const context = new Context(
      {
        include: [['#fixture'], ['#monkeys']]
      },
      axe._tree
    );

    const result = axe.utils.select('.bananas', context);
    assert.lengthOf(result, 1);
    assert.equal(result[0].actualNode, $id('bananas'));
  });

  it('should not return duplicates on overlapping includes', () => {
    fixtureSetup(
      '<div id="zero"><div id="one"><div id="target1" class="bananas"></div></div>' +
        '<div id="two"><div id="target2" class="bananas"></div></div></div>'
    );
    const context = new Context(
      {
        include: [['#zero'], ['#one']]
      },
      axe._tree
    );

    const result = axe.utils.select('.bananas', context);
    assert.deepEqual(
      result.map(n => n.actualNode),
      [$id('target1'), $id('target2')]
    );
    assert.equal(result.length, 2);
  });

  it('should return the cached result if one exists', () => {
    fixtureSetup(
      '<div id="zero"><div id="one"><div id="target1" class="bananas"></div></div>' +
        '<div id="two"><div id="target2" class="bananas"></div></div></div>'
    );

    axe._selectCache = [
      {
        selector: '.bananas',
        result: 'fruit bat'
      }
    ];
    const context = new Context([['#zero']], axe._tree);
    const result = axe.utils.select('.bananas', context);
    assert.equal(result, 'fruit bat');
  });
});
