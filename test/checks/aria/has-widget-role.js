describe('has-widget-role', () => {
  const queryFixture = axe.testUtils.queryFixture;
  const checkContext = axe.testUtils.MockCheckContext();

  afterEach(() => {
    checkContext._data = null;
  });

  it('should return false for elements with no role', () => {
    const vNode = queryFixture('<div id="target"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false for elements with nonsensical roles', () => {
    const vNode = queryFixture(
      '<div id="target" role="buttonbuttonbutton"></div>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  // Widget roles
  it('should return true for role=button', () => {
    const vNode = queryFixture('<div id="target" role="button"></div>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true for role=checkbox', () => {
    const vNode = queryFixture('<div id="target" role="checkbox"></div>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true for role=gridcell', () => {
    const vNode = queryFixture('<div id="target" role="gridcell"></div>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true for role=link', () => {
    const vNode = queryFixture('<div id="target" role="link"></div>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true for role=menuitem', () => {
    const vNode = queryFixture('<div id="target" role="menuitem"></div>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true for role=menuitemcheckbox', () => {
    const vNode = queryFixture(
      '<div id="target" role="menuitemcheckbox"></div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true for role=menuitemradio', () => {
    const vNode = queryFixture('<div id="target" role="menuitemradio"></div>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true for role=option', () => {
    const vNode = queryFixture('<div id="target" role="option"></div>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true for role=progressbar', () => {
    const vNode = queryFixture('<div id="target" role="progressbar"></div>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true for role=radio', () => {
    const vNode = queryFixture('<div id="target" role="radio"></div>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true for role=scrollbar', () => {
    const vNode = queryFixture('<div id="target" role="scrollbar"></div>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true for role=searchbox', () => {
    const vNode = queryFixture('<div id="target" role="searchbox"></div>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true for role=slider', () => {
    const vNode = queryFixture('<div id="target" role="slider"></div>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true for role=spinbutton', () => {
    const vNode = queryFixture('<div id="target" role="spinbutton"></div>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true for role=switch', () => {
    const vNode = queryFixture('<div id="target" role="switch"></div>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true for role=tab', () => {
    const vNode = queryFixture('<div id="target" role="tab"></div>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true for role=textbox', () => {
    const vNode = queryFixture('<div id="target" role="textbox"></div>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true for role=treeitem', () => {
    const vNode = queryFixture('<div id="target" role="treeitem"></div>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  // Composite widget roles
  it('should return true for role=combobox', () => {
    const vNode = queryFixture('<div id="target" role="combobox"></div>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true for role=grid', () => {
    const vNode = queryFixture('<div id="target" role="grid"></div>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true for role=listbox', () => {
    const vNode = queryFixture('<div id="target" role="listbox"></div>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true for role=menu', () => {
    const vNode = queryFixture('<div id="target" role="menu"></div>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true for role=menubar', () => {
    const vNode = queryFixture('<div id="target" role="menubar"></div>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true for role=radiogroup', () => {
    const vNode = queryFixture('<div id="target" role="radiogroup"></div>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true for role=tablist', () => {
    const vNode = queryFixture('<div id="target" role="tablist"></div>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true for role=tree', () => {
    const vNode = queryFixture('<div id="target" role="tree"></div>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return true for role=treegrid', () => {
    const vNode = queryFixture('<div id="target" role="treegrid"></div>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false for role=application', () => {
    const vNode = queryFixture('<div id="target" role="application"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false for role=article', () => {
    const vNode = queryFixture('<div id="target" role="article"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false for role=cell', () => {
    const vNode = queryFixture('<div id="target" role="cell"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false for role=columnheader', () => {
    const vNode = queryFixture('<div id="target" role="columnheader"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false for role=definition', () => {
    const vNode = queryFixture('<div id="target" role="definition"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false for role=directory', () => {
    const vNode = queryFixture('<div id="target" role="directory"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false for role=document', () => {
    const vNode = queryFixture('<div id="target" role="document"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false for role=feed', () => {
    const vNode = queryFixture('<div id="target" role="feed"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false for role=figure', () => {
    const vNode = queryFixture('<div id="target" role="figure"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false for role=group', () => {
    const vNode = queryFixture('<div id="target" role="group"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false for role=heading', () => {
    const vNode = queryFixture('<div id="target" role="heading"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false for role=img', () => {
    const vNode = queryFixture('<div id="target" role="img"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false for role=list', () => {
    const vNode = queryFixture('<div id="target" role="list"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false for role=listitem', () => {
    const vNode = queryFixture('<div id="target" role="listitem"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false for role=math', () => {
    const vNode = queryFixture('<div id="target" role="math"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false for role=none', () => {
    const vNode = queryFixture('<div id="target" role="none"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false for role=note', () => {
    const vNode = queryFixture('<div id="target" role="note"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false for role=presentation', () => {
    const vNode = queryFixture('<div id="target" role="presentation"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false for role=row', () => {
    const vNode = queryFixture('<div id="target" role="row"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false for role=rowgroup', () => {
    const vNode = queryFixture('<div id="target" role="rowgroup"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false for role=rowheader', () => {
    const vNode = queryFixture('<div id="target" role="rowheader"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false for role=table', () => {
    const vNode = queryFixture('<div id="target" role="table"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false for role=tabpanel', () => {
    const vNode = queryFixture('<div id="target" role="tabpanel"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false for role=term', () => {
    const vNode = queryFixture('<div id="target" role="term"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false for role=toolbar', () => {
    const vNode = queryFixture('<div id="target" role="toolbar"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  // Landmark Roles
  it('should return false for role=banner', () => {
    const vNode = queryFixture('<div id="target" role="banner"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false for role=complementary', () => {
    const vNode = queryFixture('<div id="target" role="complementary"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false for role=contentinfo', () => {
    const vNode = queryFixture('<div id="target" role="contentinfo"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false for role=form', () => {
    const vNode = queryFixture('<div id="target" role="form"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false for role=main', () => {
    const vNode = queryFixture('<div id="target" role="main"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false for role=navigation', () => {
    const vNode = queryFixture('<div id="target" role="navigation"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false for role=region', () => {
    const vNode = queryFixture('<div id="target" role="region"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should return false for role=search', () => {
    const vNode = queryFixture('<div id="target" role="search"></div>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-widget-role')
        .call(checkContext, null, null, vNode)
    );
  });
});
