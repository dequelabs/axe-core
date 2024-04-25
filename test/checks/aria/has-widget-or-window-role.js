describe('has-widget-or-window-role', function () {
  'use strict';

  let node;
  const fixture = document.getElementById('fixture');
  const checkContext = axe.testUtils.MockCheckContext();
  const evaluate = currentNode =>
    axe.testUtils
      .getCheckEvaluate('has-widget-or-window-role')
      .call(checkContext, currentNode);
  const roles = {
    widget: {
      button: true,
      checkbox: true,
      gridcell: true,
      link: true,
      menuitem: true,
      menuitemcheckbox: true,
      menuitemradio: true,
      option: true,
      progressbar: true,
      radio: true,
      scrollbar: true,
      searchbox: true,
      slider: true,
      spinbutton: true,
      switch: true,
      tab: true,
      tabpanel: true,
      textbox: true,
      treeitem: true
    },
    composite: {
      combobox: true,
      grid: true,
      listbox: true,
      menu: true,
      menubar: true,
      radiogroup: true,
      tablist: true,
      tree: true,
      treegrid: true,

      application: false,
      article: false,
      cell: false,
      columnheader: false,
      definition: false,
      directory: false,
      document: false,
      feed: false,
      figure: false,
      group: false,
      heading: false,
      img: false,
      list: false,
      listitem: false,
      math: false,
      none: false,
      note: false,
      presentation: false,
      row: false,
      rowgroup: false,
      rowheader: false,
      table: false,
      term: false,
      toolbar: false
    },
    window: {
      alertdialog: true,
      dialog: true
    },
    landmark: {
      banner: false,
      complimentary: false,
      contentinfo: false,
      form: false,
      name: false,
      navigation: false,
      region: false,
      search: false
    }
  };

  afterEach(function () {
    node.innerHTML = '';
    checkContext._data = null;
  });

  it('should return false for elements with no role', function () {
    node = document.createElement('div');
    fixture.appendChild(node);

    assert.isFalse(evaluate(node));
  });

  it('should return false for elements with nonsensical roles', function () {
    node = document.createElement('div');
    node.setAttribute('role', 'buttonbuttonbutton');
    fixture.appendChild(node);

    assert.isFalse(evaluate(node));
  });

  Object.keys(roles).forEach(category => {
    describe(category, function () {
      Object.keys(roles[category]).forEach(role => {
        it(`should return ${roles[category][role]} for role="${role}"`, function () {
          node = document.createElement('div');
          node.setAttribute('role', role);
          fixture.appendChild(node);

          assert.equal(evaluate(node), roles[category][role]);
        });
      });
    });
  });
});
