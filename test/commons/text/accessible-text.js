describe('text.accessibleTextVirtual', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var shadowSupport = axe.testUtils.shadowSupport;

  afterEach(function () {
    fixture.innerHTML = '';
    axe._tree = null;
  });

  it('is called through accessibleText with a DOM node', function () {
    var accessibleText = axe.commons.text.accessibleText;
    fixture.innerHTML = '<label><input type="button"></label>';
    axe.testUtils.flatTreeSetup(fixture);
    var target = fixture.querySelector('input');
    assert.equal(accessibleText(target), '');
  });

  it('should match the first example from the ARIA spec', function () {
    fixture.innerHTML =
      '<ul role="menubar">' +
      ' <!-- Rule 2A: "File" label via aria-labelledby -->' +
      '  <li role="menuitem" aria-haspopup="true" aria-labelledby="fileLabel" id="rule2a">' +
      '    <span id="fileLabel">File</span>' +
      '    <ul role="menu">' +
      '      <!-- Rule 2C: "New" label via Namefrom:contents -->' +
      '      <li role="menuitem" id="rule2c">New</li>' +
      '      <li role="menuitem">Open…</li>' +
      '      …' +
      '    </ul>' +
      '  </li>' +
      '</ul>';
    axe.testUtils.flatTreeSetup(fixture);

    var rule2a = axe.utils.querySelectorAll(axe._tree, '#rule2a')[0];
    var rule2c = axe.utils.querySelectorAll(axe._tree, '#rule2c')[0];

    assert.equal(axe.commons.text.accessibleTextVirtual(rule2a), 'File');
    assert.equal(axe.commons.text.accessibleTextVirtual(rule2c), 'New');
  });

  it('should match the second example from the ARIA spec', function () {
    fixture.innerHTML =
      '<fieldset>' +
      '  <legend>Meeting alarms</legend>' +
      '  <!-- Rule 2A: "Beep" label given by native HTML label element -->' +
      '  <input type="checkbox" id="beep"> <label for="beep">Beep</label> <br>' +
      '  <input type="checkbox" id="mtgTitle"> <label for="mtgTitle">Display the meeting title</label> <br>' +
      '  <!-- Rule 2B -->' +
      '  <input type="checkbox" id="flash">' +
      '  <label for="flash">' +
      '    Flash the screen' +
      '    <!-- Rule 2A: label of text input given by aria-label, "Number of times to flash screen" -->' +
      '    <input type="text" value="3" size="2" id="numTimes" title="Number of times to flash screen">' +
      '    times' +
      '  </label>' +
      '</fieldset>';
    axe.testUtils.flatTreeSetup(fixture);

    var rule2a = axe.utils.querySelectorAll(axe._tree, '#beep')[0];
    var rule2b = axe.utils.querySelectorAll(axe._tree, '#flash')[0];
    assert.equal(axe.commons.text.accessibleTextVirtual(rule2a), 'Beep');
    // Chrome 72: "Flash the screen 3 times"
    // Firefox 62: "Flash the screen 3 times"
    // Safari 12.0: "Flash the screen 3 times"
    assert.equal(
      axe.commons.text.accessibleTextVirtual(rule2b),
      'Flash the screen 3 times'
    );
  });

  it('should use aria-labelledby if present', function () {
    fixture.innerHTML =
      '<div id="t2label">This is <input type="text" value="the value" ' +
      'aria-labelledby="t1label" aria-label="ARIA Label" id="t1"> of <i>everything</i></div>' +
      '<div id="t1label">This is a <b>label</b></div>' +
      '<label for="t1">HTML Label</label>' +
      '<input type="text" id="t2" aria-labelledby="t2label">';
    axe.testUtils.flatTreeSetup(fixture);

    var target = axe.utils.querySelectorAll(axe._tree, '#t1')[0];
    assert.equal(
      axe.commons.text.accessibleTextVirtual(target),
      'This is a label'
    );
  });

  it('should use recusive aria-labelledby properly', function () {
    fixture.innerHTML =
      '<div id="t2label">This is <input type="text" value="the value" ' +
      'aria-labelledby="t1 t1label" aria-label="ARIA Label" id="t1"> of <i>everything</i></div>' +
      '<div id="t1label">This is a <b>label</b></div>' +
      '<label for="t1">HTML Label</label>' +
      '<input type="text" id="t2" aria-labelledby="t2label">';
    axe.testUtils.flatTreeSetup(fixture);

    var target = axe.utils.querySelectorAll(axe._tree, '#t1')[0];
    assert.equal(
      axe.commons.text.accessibleTextVirtual(target),
      'ARIA Label This is a label'
    );
  });

  it('should include hidden text referred to with aria-labelledby', function () {
    fixture.innerHTML =
      '<div id="t1label" style="display:none">This is a ' +
      '<span style="visibility:hidden">hidden </span>' +
      '<span aria-hidden="true">secret</span></div>' +
      '<label for="t1">HTML Label</label>' +
      '<input type="text" id="t1" aria-labelledby="t1label">';
    axe.testUtils.flatTreeSetup(fixture);

    var target = axe.utils.querySelectorAll(axe._tree, '#t1')[0];
    assert.equal(
      axe.commons.text.accessibleTextVirtual(target),
      'This is a hidden secret'
    );
  });

  it('should allow setting the initial includeHidden value', function () {
    fixture.innerHTML =
      '<label id="lbl1" style="display:none;">hidden label</label>';
    axe.testUtils.flatTreeSetup(fixture);

    var target = axe.utils.querySelectorAll(axe._tree, '#lbl1')[0];
    assert.equal(
      axe.commons.text.accessibleTextVirtual(target, {
        includeHidden: false
      }),
      ''
    );

    assert.equal(
      axe.commons.text.accessibleTextVirtual(target, {
        includeHidden: true
      }),
      'hidden label'
    );
  });

  it('should use aria-label if present with no labelledby', function () {
    fixture.innerHTML =
      '<div id="t2label">This is <input type="text" value="the value" ' +
      'aria-label="ARIA Label" id="t1"> of <i>everything</i></div>' +
      '<div id="t1label">This is a <b>label</b></div>' +
      '<label for="t1">HTML Label</label>' +
      '<input type="text" id="t2" aria-labelledby="t2label">';
    axe.testUtils.flatTreeSetup(fixture);

    var target = axe.utils.querySelectorAll(axe._tree, '#t1')[0];
    assert.equal(axe.commons.text.accessibleTextVirtual(target), 'ARIA Label');
  });

  it('should use alt on imgs with no ARIA', function () {
    fixture.innerHTML =
      '<div id="t2label">This is <input type="text" value="the value" ' +
      'id="t1"> of <i>everything</i></div>' +
      '<img alt="Alt text goes here" id="target">' +
      '<div id="t1label">This is a <b>label</b></div>' +
      '<label for="t1">HTML Label</label>' +
      '<input type="text" id="t2" aria-labelledby="t2label">';
    axe.testUtils.flatTreeSetup(fixture);

    var target = axe.utils.querySelectorAll(axe._tree, '#target')[0];
    assert.equal(
      axe.commons.text.accessibleTextVirtual(target),
      'Alt text goes here'
    );
  });

  it('should use alt on image inputs with no ARIA', function () {
    fixture.innerHTML =
      '<div id="t2label">This is <input type="text" value="the value" ' +
      'id="t1"> of <i>everything</i></div>' +
      '<input type="image" alt="Alt text goes here" id="target">' +
      '<div id="t1label">This is a <b>label</b></div>' +
      '<label for="t1">HTML Label</label>' +
      '<input type="text" id="t2" aria-labelledby="t2label">';
    axe.testUtils.flatTreeSetup(fixture);

    var target = axe.utils.querySelectorAll(axe._tree, '#target')[0];
    assert.equal(
      axe.commons.text.accessibleTextVirtual(target),
      'Alt text goes here'
    );
  });

  it('should use not use alt on text inputs with no ARIA', function () {
    fixture.innerHTML =
      '<div id="t2label">This is <input type="text" value="the value" ' +
      'id="t1"> of <i>everything</i></div>' +
      '<input type="text" alt="Alt text goes here" id="target">' +
      '<div id="t1label">This is a <b>label</b></div>' +
      '<label for="t1">HTML Label</label>' +
      '<input type="text" id="t2" aria-labelledby="t2label">';
    axe.testUtils.flatTreeSetup(fixture);

    var target = axe.utils.querySelectorAll(axe._tree, '#target')[0];
    assert.equal(axe.commons.text.accessibleTextVirtual(target), '');
  });

  it('should use HTML label if no ARIA information', function () {
    fixture.innerHTML =
      '<div id="t2label">This is <input type="text" value="the value" ' +
      'id="t1"> of <i>everything</i></div>' +
      '<div id="t1label">This is a <b>label</b></div>' +
      '<label for="t1">HTML Label</label>' +
      '<input type="text" id="t2" aria-labelledby="t2label">';
    axe.testUtils.flatTreeSetup(fixture);

    var target = axe.utils.querySelectorAll(axe._tree, '#t1')[0];
    assert.equal(axe.commons.text.accessibleTextVirtual(target), 'HTML Label');
  });

  it('should handle last ditch title attribute', function () {
    fixture.innerHTML =
      '<div id="t2label">This is <input type="text" value="the value" ' +
      'aria-labelledby="t1label" aria-label="ARIA Label" id="t1"> of <i title="italics"></i></div>' +
      '<div id="t1label">This is a <b>label</b></div>' +
      '<label for="t1">HTML Label</label>' +
      '<input type="text" id="t2" aria-labelledby="t2label">';
    axe.testUtils.flatTreeSetup(fixture);

    var target = axe.utils.querySelectorAll(axe._tree, '#t2label')[0];
    assert.equal(
      axe.commons.text.accessibleTextVirtual(target),
      'This is This is a label of italics'
    );
  });

  it('should handle totally empty elements', function () {
    fixture.innerHTML =
      '<div id="t2label">This is <input type="text" value="the value" ' +
      'aria-labelledby="t1label" aria-label="ARIA Label" id="t1"> of <i></i></div>' +
      '<div id="t1label">This is a <b>label</b></div>' +
      '<label for="t1">HTML Label</label>' +
      '<input type="text" id="t2" aria-labelledby="t2label">';
    axe.testUtils.flatTreeSetup(fixture);

    var target = axe.utils.querySelectorAll(axe._tree, '#t2label')[0];
    assert.equal(
      axe.commons.text.accessibleTextVirtual(target),
      'This is This is a label of'
    );
  });

  it('should handle author name-from roles properly', function () {
    fixture.innerHTML =
      '<div id="t2label" role="heading">This is ' +
      '  <input type="text" value="the value" ' +
      '    aria-labelledby="t1label" aria-label="ARIA Label" id="t1">' +
      '  of <i role="alert">everything</i></div>' +
      '<div id="t1label">This is a <b>label</b></div>' +
      '<label for="t1">HTML Label</label>' +
      '<input type="text" id="t2" aria-labelledby="t2label">';
    axe.testUtils.flatTreeSetup(fixture);

    var target = axe.utils.querySelectorAll(axe._tree, '#t2label')[0];
    // Chrome 86: This is This is a label of
    // Firefox 82: This is ARIA Label everything
    // Safari 14.0: This is This is a label of everything
    assert.equal(
      axe.commons.text.accessibleTextVirtual(target),
      'This is This is a label of everything'
    );
  });

  it('should only show each node once when label is before input', function () {
    fixture.innerHTML =
      '<div id="target"><label for="tb1">My form input</label>' +
      '<input type="text" id="tb1"></div>';
    axe.testUtils.flatTreeSetup(fixture);
    var target = axe.utils.querySelectorAll(axe._tree, '#target')[0];
    assert.equal(
      axe.commons.text.accessibleTextVirtual(target),
      'My form input'
    );
  });

  it('should only show each node once when label follows input', function () {
    fixture.innerHTML =
      '<div id="target">' +
      '<input type="text" id="tb1"></div>' +
      '<label for="tb1">My form input</label>';
    axe.testUtils.flatTreeSetup(fixture);
    var target = axe.utils.querySelectorAll(axe._tree, '#target')[0];
    assert.equal(
      axe.commons.text.accessibleTextVirtual(target),
      'My form input'
    );
  });

  it('should handle nested inputs in normal context', function () {
    fixture.innerHTML =
      '<div id="t2label">This is <input type="text" value="the value" ' +
      'aria-labelledby="t1label" aria-label="ARIA Label" id="t1"> of <i>everything</i></div>' +
      '<div id="t1label">This is a <b>label</b></div>' +
      '<label for="t1">HTML Label</label>' +
      '<input type="text" id="t2" aria-labelledby="t2label">';
    axe.testUtils.flatTreeSetup(fixture);

    var target = axe.utils.querySelectorAll(axe._tree, '#t2label')[0];
    assert.equal(
      axe.commons.text.accessibleTextVirtual(target),
      'This is This is a label of everything'
    );
  });

  it('should use handle nested inputs properly in labelledby context', function () {
    // Chrome 72: This is This is a label of everything
    // Firefox 62: This is ARIA Label the value of everything
    // Safari 12.0: THis is This is a label of everything
    fixture.innerHTML =
      '<div id="t2label">This is <input type="text" value="the value" ' +
      'aria-labelledby="t1label" aria-label="ARIA Label" id="t1"> of <i>everything</i></div>' +
      '<div id="t1label">This is a <b>label</b></div>' +
      '<label for="t1">HTML Label</label>' +
      '<input type="text" id="t2" aria-labelledby="t2label">';
    axe.testUtils.flatTreeSetup(fixture);

    var target = axe.utils.querySelectorAll(axe._tree, '#t2')[0];
    assert.equal(
      axe.commons.text.accessibleTextVirtual(target),
      'This is ARIA Label of everything'
    );
  });

  it('should use ignore hidden inputs', function () {
    fixture.innerHTML =
      '<div id="t2label">This is <input type="hidden" value="the value" ' +
      'Label" id="t1"> of <i>everything</i></div>' +
      '<div id="t1label">This is a <b>label</b></div>' +
      '<label for="t1">HTML Label</label>' +
      '<input type="text" id="t2" aria-labelledby="t2label">';
    axe.testUtils.flatTreeSetup(fixture);

    var target = axe.utils.querySelectorAll(axe._tree, '#t2')[0];
    assert.equal(
      axe.commons.text.accessibleTextVirtual(target),
      'This is of everything'
    );
  });

  it('should use handle inputs with no type as if they were text inputs', function () {
    fixture.innerHTML =
      '<div id="t2label">This is <input value="the value" ' +
      'aria-labelledby="t1label" id="t1"> of <i>everything</i></div>' +
      '<div id="t1label">This is a <b>label</b></div>' +
      '<label for="t1">HTML Label</label>' +
      '<input type="text" id="t2" aria-labelledby="t2label">';
    axe.testUtils.flatTreeSetup(fixture);

    var target = axe.utils.querySelectorAll(axe._tree, '#t2')[0];
    // Chrome 70: "This is This is a label of everything"
    // Firefox 62: "This is the value of everything"
    // Safari 12.0: "This is This is a label of everything"
    assert.equal(
      axe.commons.text.accessibleTextVirtual(target),
      'This is the value of everything'
    );
  });

  it('should use handle nested selects properly in labelledby context', function () {
    fixture.innerHTML =
      '<div id="t2label">This is <select multiple ' +
      'aria-labelledby="t1label" id="t1">' +
      '<option selected>first</option><option>second</option><option selected>third</option>' +
      '</select> of <i>everything</i></div>' +
      '<div id="t1label">This is a <b>label</b></div>' +
      '<label for="t1">HTML Label</label>' +
      '<input type="text" id="t2" aria-labelledby="t2label">';
    axe.testUtils.flatTreeSetup(fixture);

    var target = axe.utils.querySelectorAll(axe._tree, '#t2')[0];
    // Chrome 70: "This is This is a label of everything"
    // Firefox 62: "This is of everything"
    // Safari 12.0: "This is first third label of"
    assert.equal(
      axe.commons.text.accessibleTextVirtual(target),
      'This is of everything'
    );
  });

  it('should use handle nested textareas properly in labelledby context', function () {
    fixture.innerHTML =
      '<div id="t2label">This is <textarea ' +
      'aria-labelledby="t1label" id="t1">the value</textarea> of <i>everything</i></div>' +
      '<div id="t1label">This is a <b>label</b></div>' +
      '<label for="t1">HTML Label</label>' +
      '<input type="text" id="t2" aria-labelledby="t2label">';
    axe.testUtils.flatTreeSetup(fixture);

    var target = axe.utils.querySelectorAll(axe._tree, '#t2')[0];
    // Chrome 70: "This is This is a label of everything"
    // Firefox 62: "This is ARIA Label the value of everything"
    // Safari 12.0: "This is This is a label of everything"
    assert.equal(
      axe.commons.text.accessibleTextVirtual(target),
      'This is the value of everything'
    );
  });

  it('should use handle ARIA labels properly in labelledby context', function () {
    fixture.innerHTML =
      '<div id="t2label">This <span aria-label="not a span">span</span>' +
      ' is <input type="text" value="the value" ' +
      'aria-labelledby="t1label" id="t1"> of <i>everything</i></div>' +
      '<div id="t1label">This is a <b>label</b></div>' +
      '<label for="t1">HTML Label</label>' +
      '<input type="text" id="t2" aria-labelledby="t2label">';
    axe.testUtils.flatTreeSetup(fixture);

    var target = axe.utils.querySelectorAll(axe._tree, '#t2')[0];
    assert.equal(
      axe.commons.text.accessibleTextVirtual(target),
      'This not a span is the value of everything'
    );
  });

  it('should come up empty if input is labeled only by select options', function () {
    fixture.innerHTML =
      '<label for="target">' +
      '<select id="select">' +
      '	<option selected="selected">Chosen</option>' +
      '	<option>Not Selected</option>' +
      '</select>' +
      '</label>' +
      '<input id="target" type="text" />';
    axe.testUtils.flatTreeSetup(fixture);
    var target = axe.utils.querySelectorAll(axe._tree, '#target')[0];
    // Chrome 70: ""
    // Firefox 62: "Chosen"
    // Safari 12.0: "Chosen"
    assert.equal(axe.commons.text.accessibleTextVirtual(target), '');
  });

  it("should be empty if input is labeled by labeled select (ref'd string labels have spotty support)", function () {
    fixture.innerHTML =
      '<label for="select">My Select</label>' +
      '<label for="target">' +
      '<select id="select">' +
      '	<option selected="selected">Chosen</option>' +
      '	<option>Not Selected</option>' +
      '</select>' +
      '</label>' +
      '<input id="target" type="text" />';
    axe.testUtils.flatTreeSetup(fixture);
    var target = axe.utils.querySelectorAll(axe._tree, '#target')[0];
    assert.equal(axe.commons.text.accessibleTextVirtual(target), '');
  });

  it('should be empty for an empty label wrapping a select', function () {
    fixture.innerHTML =
      '<label>' +
      '<span class="label"></span>' +
      '<select id="target">' +
      '<option value="1" selected="selected">Please choose a region</option>' +
      '<option value="2">Coastal</option>' +
      '<option value="3">Forest</option>' +
      '<option value="4">Grasslands</option>' +
      '<option value="5">Mountains</option>' +
      '</select>' +
      '</label>';
    axe.testUtils.flatTreeSetup(fixture);
    var target = axe.utils.querySelectorAll(axe._tree, '#target')[0];
    assert.equal(axe.commons.text.accessibleTextVirtual(target), '');
  });

  it('should not return select options if input is aria-labelled by a select', function () {
    fixture.innerHTML =
      '<label>' +
      '<select id="select">' +
      '	<option selected="selected">Chosen</option>' +
      '	<option>Not Selected</option>' +
      '</select>' +
      '</label>' +
      '<input aria-labelledby="select" type="text" id="target" />';
    axe.testUtils.flatTreeSetup(fixture);
    var target = axe.utils.querySelectorAll(axe._tree, '#target')[0];
    // Chrome 70: ""
    // Firefox 62: ""
    // Safari 12.0: "Chosen"
    assert.equal(axe.commons.text.accessibleTextVirtual(target), '');
  });

  it('shoud properly fall back to title', function () {
    fixture.innerHTML = '<a href="#" role="presentation" title="Hello"></a>';
    axe.testUtils.flatTreeSetup(fixture);

    var target = axe.utils.querySelectorAll(axe._tree, 'a')[0];
    assert.equal(axe.commons.text.accessibleTextVirtual(target), 'Hello');
  });

  it('should give text even for role=presentation on anchors', function () {
    fixture.innerHTML = '<a href="#" role="presentation">Hello</a>';
    axe.testUtils.flatTreeSetup(fixture);

    var target = axe.utils.querySelectorAll(axe._tree, 'a')[0];
    assert.equal(axe.commons.text.accessibleTextVirtual(target), 'Hello');
  });

  it('should give text even for role=presentation on buttons', function () {
    fixture.innerHTML = '<button role="presentation">Hello</button>';
    axe.testUtils.flatTreeSetup(fixture);

    var target = axe.utils.querySelectorAll(axe._tree, 'button')[0];
    assert.equal(axe.commons.text.accessibleTextVirtual(target), 'Hello');
  });

  it('should give text even for role=presentation on summary', function () {
    fixture.innerHTML = '<summary role="presentation">Hello</summary>';
    axe.testUtils.flatTreeSetup(fixture);
    var target = axe.utils.querySelectorAll(axe._tree, 'summary')[0];
    assert.equal(axe.commons.text.accessibleTextVirtual(target), 'Hello');
  });

  it('shoud properly fall back to title', function () {
    fixture.innerHTML = '<a href="#" role="none" title="Hello"></a>';
    axe.testUtils.flatTreeSetup(fixture);
    var target = axe.utils.querySelectorAll(axe._tree, 'a')[0];
    assert.equal(axe.commons.text.accessibleTextVirtual(target), 'Hello');
  });

  it('should give text even for role=none on anchors', function () {
    fixture.innerHTML = '<a href="#" role="none">Hello</a>';
    axe.testUtils.flatTreeSetup(fixture);

    var target = axe.utils.querySelectorAll(axe._tree, 'a')[0];
    assert.equal(axe.commons.text.accessibleTextVirtual(target), 'Hello');
  });

  it('should give text even for role=none on buttons', function () {
    fixture.innerHTML = '<button role="none">Hello</button>';
    axe.testUtils.flatTreeSetup(fixture);

    var target = axe.utils.querySelectorAll(axe._tree, 'button')[0];
    assert.equal(axe.commons.text.accessibleTextVirtual(target), 'Hello');
  });

  it('should give text even for role=none on summary', function () {
    fixture.innerHTML = '<summary role="none">Hello</summary>';
    axe.testUtils.flatTreeSetup(fixture);

    var target = axe.utils.querySelectorAll(axe._tree, 'summary')[0];
    assert.equal(axe.commons.text.accessibleTextVirtual(target), 'Hello');
  });

  it('should not add extra spaces around phrasing elements', function () {
    fixture.innerHTML = '<a href="#">Hello<span>World</span></a>';
    axe.testUtils.flatTreeSetup(fixture);

    var target = axe.utils.querySelectorAll(axe._tree, 'a')[0];
    assert.equal(axe.commons.text.accessibleTextVirtual(target), 'HelloWorld');
  });

  it('should add spaces around non-phrasing elements', function () {
    fixture.innerHTML = '<a href="#">Hello<div>World</div></a>';
    axe.testUtils.flatTreeSetup(fixture);

    var target = axe.utils.querySelectorAll(axe._tree, 'a')[0];
    assert.equal(axe.commons.text.accessibleTextVirtual(target), 'Hello World');
  });

  it('should not look at scripts', function () {
    fixture.innerHTML =
      '<a href="#"><script> var ajiasdf = true; </script></a>';
    axe.testUtils.flatTreeSetup(fixture);

    var target = axe.utils.querySelectorAll(axe._tree, 'a')[0];
    assert.equal(axe.commons.text.accessibleTextVirtual(target), '');
  });

  it('should use <label> for input buttons', function () {
    fixture.innerHTML = '<label><input type="button"></label>';
    axe.testUtils.flatTreeSetup(fixture);

    var target = axe.utils.querySelectorAll(axe._tree, 'input')[0];
    assert.equal(axe.commons.text.accessibleTextVirtual(target), '');
  });

  it('should not stop when attributes contain whitespace', function () {
    fixture.innerHTML =
      '<button aria-label=" " aria-labelledby=" ">Hello World</button>';
    axe.testUtils.flatTreeSetup(fixture);

    var target = axe.utils.querySelectorAll(axe._tree, 'button')[0];
    assert.equal(axe.commons.text.accessibleTextVirtual(target), 'Hello World');
  });

  (!!document.fonts ? it : xit)(
    'should allow ignoring icon ligatures',
    function (done) {
      var materialFont = new FontFace(
        'Material Icons',
        'url(https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2)'
      );
      materialFont.load().then(function () {
        document.fonts.add(materialFont);

        fixture.innerHTML =
          '<button id="target">Hello World<span style="font-family: \'Material Icons\'">delete</span></button>';
        axe.testUtils.flatTreeSetup(fixture);

        var target = axe.utils.querySelectorAll(axe._tree, 'button')[0];
        try {
          assert.equal(
            axe.commons.text.accessibleTextVirtual(target, {
              ignoreIconLigature: true
            }),
            'Hello World'
          );
          done();
        } catch (err) {
          done(err);
        }
      });
    }
  );

  (shadowSupport.v1 ? it : xit)(
    'should only find aria-labelledby element in the same context ',
    function () {
      fixture.innerHTML =
        '<div id="t2label">This is <input type="text" value="the value" ' +
        'aria-labelledby="t1label" aria-label="ARIA Label" id="t1"> of <i>everything</i></div>' +
        '<div id="shadow"></div>';

      var shadow = document
        .getElementById('shadow')
        .attachShadow({ mode: 'open' });
      shadow.innerHTML =
        '<div id="t1label">This is a <b>label</b></div>' +
        '<label for="t1">HTML Label</label>' +
        '<input type="text" id="t2" aria-labelledby="t2label">';

      axe.testUtils.flatTreeSetup(fixture);
      var target = axe.utils.querySelectorAll(axe._tree, '#t1')[0];
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        'ARIA Label'
      );
    }
  );

  (shadowSupport.v1 ? it : xit)(
    'should find attributes within a shadow tree',
    function () {
      fixture.innerHTML = '<div id="shadow"></div>';

      var shadow = document
        .getElementById('shadow')
        .attachShadow({ mode: 'open' });
      shadow.innerHTML = '<input type="text" id="t1" title="I will be king">';

      axe.testUtils.flatTreeSetup(fixture);
      var target = axe.utils.querySelectorAll(axe._tree, 'input')[0];
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        'I will be king'
      );
    }
  );

  (shadowSupport.v1 ? it : xit)(
    'should find attributes within a slot on the shadow tree',
    function () {
      fixture.innerHTML =
        '<div id="shadow"><input type="text" id="t1" title="you will be queen"></div>';

      var shadow = document
        .getElementById('shadow')
        .attachShadow({ mode: 'open' });
      shadow.innerHTML = '<slot></slot>';

      axe.testUtils.flatTreeSetup(fixture);
      var target = axe.utils.querySelectorAll(axe._tree, 'input')[0];
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        'you will be queen'
      );
    }
  );

  (shadowSupport.v1 ? it : xit)(
    'should find fallback content for shadow DOM',
    function () {
      fixture.innerHTML = '<div id="shadow"></div>';

      var shadow = document
        .getElementById('shadow')
        .attachShadow({ mode: 'open' });
      shadow.innerHTML =
        '<input type="text" id="t1">' +
        '<label for="t1"><slot>Fallback content heroes</slot></label>';

      axe.testUtils.flatTreeSetup(fixture);
      var target = axe.utils.querySelectorAll(axe._tree, 'input')[0];
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        'Fallback content heroes'
      );
    }
  );

  describe('figure', function () {
    it('should check aria-labelledby', function () {
      fixture.innerHTML =
        '<div id="t1">Hello</div>' +
        '<figure aria-labelledby="t1">Not part of a11yName <figcaption>Fail</figcaption></figure>';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'figure')[0];
      assert.equal(axe.commons.text.accessibleTextVirtual(target), 'Hello');
    });

    it('should check aria-label', function () {
      fixture.innerHTML =
        '<figure aria-label="Hello">Not part of a11yName <figcaption>Fail</figcaption></figure>';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'figure')[0];
      assert.equal(axe.commons.text.accessibleTextVirtual(target), 'Hello');
    });

    it('should check the figures figcaption', function () {
      fixture.innerHTML =
        '<figure>Not part of a11yName <figcaption>Hello</figcaption></figure>';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'figure')[0];
      assert.equal(axe.commons.text.accessibleTextVirtual(target), 'Hello');
    });

    it('should check title on figure', function () {
      fixture.innerHTML =
        '<figure title="Hello">Not part of a11yName <figcaption></figcaption></figure>';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'figure')[0];
      assert.equal(axe.commons.text.accessibleTextVirtual(target), 'Hello');
    });

    it('should fall back to innerText of figure', function () {
      fixture.innerHTML = '<figure>Hello<figcaption></figcaption></figure>';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'figure')[0];
      assert.equal(axe.commons.text.accessibleTextVirtual(target), 'Hello');
    });

    (shadowSupport.v1 ? it : xit)(
      'should check within the composed (shadow) tree',
      function () {
        var node = document.createElement('div');
        node.innerHTML = 'Hello';
        var shadowRoot = node.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML =
          '<figure>Not part of a11yName <figcaption><slot></slot></figcaption></figure>';
        fixture.appendChild(node);
        axe.testUtils.flatTreeSetup(fixture);

        var target = axe.utils.querySelectorAll(axe._tree, 'figure')[0];
        assert.equal(axe.commons.text.accessibleTextVirtual(target), 'Hello');
      }
    );
  });

  describe('img', function () {
    it('should work with aria-labelledby attribute', function () {
      fixture.innerHTML =
        '<div id="t1">Hello</div><div id="t2">World</div>' +
        '<img aria-labelledby="t1 t2">';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'img')[0];
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        'Hello World'
      );
    });

    it('should work with aria-label attribute', function () {
      fixture.innerHTML = '<img aria-label="Hello World">';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'img')[0];
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        'Hello World'
      );
    });

    it('should work with alt attribute', function () {
      fixture.innerHTML = '<img alt="Hello World">';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'img')[0];
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        'Hello World'
      );
    });

    it('should work with title attribute', function () {
      fixture.innerHTML = '<img title="Hello World">';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'img')[0];
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        'Hello World'
      );
    });
  });

  describe('input buttons', function () {
    it('should find value for input type=button', function () {
      fixture.innerHTML = '<input type="button" value="Hello">';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'input')[0];
      assert.equal(axe.commons.text.accessibleTextVirtual(target), 'Hello');
    });

    it('should find value for input type=reset', function () {
      fixture.innerHTML = '<input type="reset" value="Hello">';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'input')[0];
      assert.equal(axe.commons.text.accessibleTextVirtual(target), 'Hello');
    });

    it('should find value for input type=submit', function () {
      fixture.innerHTML = '<input type="submit" value="Hello">';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'input')[0];
      assert.equal(axe.commons.text.accessibleTextVirtual(target), 'Hello');
    });

    it('should provide a default value for input type="submit"', function () {
      fixture.innerHTML = '<input type="submit">';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'input')[0];
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        target.actualNode.value || 'Submit'
      );
    });

    it('should provide a default value for input type="reset"', function () {
      fixture.innerHTML = '<input type="reset">';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'input')[0];
      var defaultText = axe.commons.text.accessibleTextVirtual(target);
      assert.isString(defaultText);
      assert.equal(defaultText, target.actualNode.value || 'Reset');
    });

    it('should find title for input type=button', function () {
      fixture.innerHTML = '<input type="button" title="Hello">';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'input')[0];
      assert.equal(axe.commons.text.accessibleTextVirtual(target), 'Hello');
    });

    it('should find title for input type=reset', function () {
      fixture.innerHTML = '<input type="reset" title="Hello">';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'input')[0];
      // IE does not use title; but will use default value instead
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        target.actualNode.value || 'Hello'
      );
    });

    it('should find title for input type=submit', function () {
      fixture.innerHTML = '<input type="submit" title="Hello">';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'input')[0];
      // Again, default value takes precedence over title
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        target.actualNode.value || 'Hello'
      );
    });
  });

  describe('tables', function () {
    it('should work with aria-labelledby', function () {
      fixture.innerHTML =
        '<div id="t1">Hello</div><div id="t2">World</div>' +
        '<table aria-labelledby="t1 t2"></table>';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'table')[0];
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        'Hello World'
      );
    });

    it('should work with aria-label', function () {
      fixture.innerHTML = '<table aria-label="Hello World"></table>';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'table')[0];
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        'Hello World'
      );
    });

    it('should work with the caption element', function () {
      fixture.innerHTML =
        '<table><caption>Hello World</caption><tr><td>Stuff</td></tr></table>';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'table')[0];
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        'Hello World'
      );
    });

    it('should work with the title attribute', function () {
      fixture.innerHTML = '<table title="Hello World"></table>';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'table')[0];
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        'Hello World'
      );
    });

    it('should work with the summary attribute', function () {
      fixture.innerHTML = '<table summary="Hello World"></table>';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'table')[0];
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        'Hello World'
      );
    });

    it('should prefer summary attribute over title attribute', function () {
      // Chrome 70: "Hello world"
      // Firefox 62: "Hello world"
      // Safari 12.0: "FAIL"
      fixture.innerHTML = '<table summary="Hello World" title="FAIL"></table>';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'table')[0];
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        'Hello World'
      );
    });
  });

  describe('text inputs', function () {
    var types = ['text', 'password', 'search', 'tel', 'email', 'url', null];

    it('should find aria-labelledby', function () {
      types.forEach(function (type) {
        var t = type ? ' type="' + type + '"' : '';
        fixture.innerHTML =
          '<div id="t1">Hello</div><div id="t2">World</div>' +
          '<input' +
          t +
          ' aria-labelledby="t1 t2">';
        axe.testUtils.flatTreeSetup(fixture);

        var target = axe.utils.querySelectorAll(axe._tree, 'input')[0];
        assert.equal(
          axe.commons.text.accessibleTextVirtual(target),
          'Hello World',
          type
        );
      });
    });

    it('should find aria-label', function () {
      types.forEach(function (type) {
        var t = type ? ' type="' + type + '"' : '';
        fixture.innerHTML = '<input' + t + ' aria-label="Hello World">';
        axe.testUtils.flatTreeSetup(fixture);

        var target = axe.utils.querySelectorAll(axe._tree, 'input')[0];
        assert.equal(
          axe.commons.text.accessibleTextVirtual(target),
          'Hello World',
          type
        );
      });
    });

    it('should find an implicit label', function () {
      types.forEach(function (type) {
        var t = type ? ' type="' + type + '"' : '';
        fixture.innerHTML =
          '<label for="t1">Hello World' + '<input' + t + '></label>';
        axe.testUtils.flatTreeSetup(fixture);

        var target = axe.utils.querySelectorAll(axe._tree, 'input')[0];
        assert.equal(
          axe.commons.text.accessibleTextVirtual(target),
          'Hello World',
          type
        );
      });
    });

    it('should find an explicit label', function () {
      types.forEach(function (type) {
        var t = type ? ' type="' + type + '"' : '';
        fixture.innerHTML =
          '<label for="t1">Hello World</label>' + '<input' + t + ' id="t1">';
        axe.testUtils.flatTreeSetup(fixture);

        var target = axe.utils.querySelectorAll(axe._tree, 'input')[0];
        assert.equal(
          axe.commons.text.accessibleTextVirtual(target),
          'Hello World',
          type
        );
      });
    });

    it('should find implicit labels with id that does not match to a label', function () {
      types.forEach(function (type) {
        var t = type ? ' type="' + type + '"' : '';
        fixture.innerHTML =
          '<label for="t1">Hello World' + '<input' + t + ' id="foo"></label>';
        axe.testUtils.flatTreeSetup(fixture);

        var target = axe.utils.querySelectorAll(axe._tree, 'input')[0];
        assert.equal(
          axe.commons.text.accessibleTextVirtual(target),
          'Hello World',
          type
        );
      });
    });

    it('should find a placeholder attribute', function () {
      types.forEach(function (type) {
        var t = type ? ' type="' + type + '"' : '';
        fixture.innerHTML = '<input' + t + ' placeholder="Hello World">';
        axe.testUtils.flatTreeSetup(fixture);

        var target = axe.utils.querySelectorAll(axe._tree, 'input')[0];
        assert.equal(
          axe.commons.text.accessibleTextVirtual(target),
          'Hello World',
          type
        );
      });
    });

    it('should find a title attribute', function () {
      types.forEach(function (type) {
        var t = type ? ' type="' + type + '"' : '';
        fixture.innerHTML = '<input' + t + ' title="Hello World">';
        axe.testUtils.flatTreeSetup(fixture);

        var target = axe.utils.querySelectorAll(axe._tree, 'input')[0];
        assert.equal(
          axe.commons.text.accessibleTextVirtual(target),
          'Hello World',
          type
        );
      });
    });

    it('should otherwise be empty string', function () {
      types.forEach(function (type) {
        var t = type ? ' type="' + type + '"' : '';
        fixture.innerHTML = '<input' + t + '>';
        axe.testUtils.flatTreeSetup(fixture);

        var target = axe.utils.querySelectorAll(axe._tree, 'input')[0];
        assert.equal(axe.commons.text.accessibleTextVirtual(target), '');
      });
    });
  });

  describe('textarea', function () {
    it('should find aria-labelledby', function () {
      fixture.innerHTML =
        '<div id="t1">Hello</div><div id="t2">World</div>' +
        '<textarea aria-labelledby="t1 t2"></textarea>';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'textarea')[0];
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        'Hello World'
      );
    });

    it('should find aria-label', function () {
      fixture.innerHTML = '<textarea aria-label="Hello World"></textarea>';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'textarea')[0];
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        'Hello World'
      );
    });

    it('should find an implicit label', function () {
      fixture.innerHTML =
        '<label for="t1">Hello World' + '<textarea></textarea></label>';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'textarea')[0];
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        'Hello World'
      );
    });

    it('should find an explicit label', function () {
      fixture.innerHTML =
        '<label for="t1">Hello World</label>' + '<textarea id="t1"></textarea>';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'textarea')[0];
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        'Hello World'
      );
    });

    it('should find a placeholder attribute', function () {
      fixture.innerHTML = '<textarea placeholder="Hello World"></textarea>';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'textarea')[0];
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        'Hello World'
      );
    });

    it('should find a title attribute', function () {
      fixture.innerHTML = '<textarea title="Hello World"></textarea>';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'textarea')[0];
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        'Hello World'
      );
    });

    it('should otherwise be empty string', function () {
      fixture.innerHTML = '<textarea></textarea>';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'textarea')[0];
      assert.equal(axe.commons.text.accessibleTextVirtual(target), '');
    });
  });

  describe('image inputs', function () {
    it('should find aria-labelledby', function () {
      fixture.innerHTML =
        '<div id="t1">Hello</div><div id="t2">World</div>' +
        '<input type="image" aria-labelledby="t1 t2">';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'input')[0];
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        'Hello World'
      );
    });

    it('should find aria-label', function () {
      fixture.innerHTML = '<input type="image" aria-label="Hello World">';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'input')[0];
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        'Hello World'
      );
    });

    it('should find an alt attribute', function () {
      fixture.innerHTML = '<input type="image" alt="Hello World">';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'input')[0];
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        'Hello World'
      );
    });

    it('should find a title attribute', function () {
      fixture.innerHTML = '<input type="image" title="Hello World">';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'input')[0];
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        'Hello World'
      );
    });

    it('should otherwise be "Submit" string', function () {
      fixture.innerHTML = '<input type="image">';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'input')[0];
      assert.equal(axe.commons.text.accessibleTextVirtual(target), 'Submit');
    });
  });

  describe('a', function () {
    it('should find aria-labelledby', function () {
      fixture.innerHTML =
        '<div id="t1">Hello</div><div id="t2">World</div>' +
        '<a aria-labelledby="t1 t2"></a>';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'a')[0];
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        'Hello World'
      );
    });

    it('should find aria-label', function () {
      fixture.innerHTML = '<a aria-label="Hello World"></a>';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'a')[0];
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        'Hello World'
      );
    });

    it('should check subtree', function () {
      fixture.innerHTML = '<a><span>Hello<span> World</span></span></a>';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'a')[0];
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        'Hello World'
      );
    });

    it('should find a title attribute', function () {
      fixture.innerHTML = '<a title="Hello World"></a>';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'a')[0];
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        'Hello World'
      );
    });

    it('should otherwise be empty string', function () {
      fixture.innerHTML = '<a></a>';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'a')[0];
      assert.equal(axe.commons.text.accessibleTextVirtual(target), '');
    });

    it('should use text from a table with a single cell and role=presentation', function () {
      fixture.innerHTML =
        '<a href="example.html">' +
        '<table role="presentation">' +
        '<tr>' +
        '<td>' +
        'Descriptive Link Text' +
        '</td>' +
        '</tr>' +
        '</table>' +
        '</a>';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'a')[0];
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        'Descriptive Link Text'
      );
    });
  });

  describe('button', function () {
    it('should find aria-labelledby', function () {
      fixture.innerHTML =
        '<div id="t1">Hello</div><div id="t2">World</div>' +
        '<button aria-labelledby="t1 t2"></button>';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'button')[0];
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        'Hello World'
      );
    });

    it('should find aria-label', function () {
      fixture.innerHTML = '<button aria-label="Hello World"></button>';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'button')[0];
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        'Hello World'
      );
    });

    it('should check subtree', function () {
      fixture.innerHTML =
        '<button><span>Hello<span> World</span></span></button>';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'button')[0];
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        'Hello World'
      );
    });

    it('should find a title attribute', function () {
      fixture.innerHTML = '<button title="Hello World"></button>';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'button')[0];
      assert.equal(
        axe.commons.text.accessibleTextVirtual(target),
        'Hello World'
      );
    });

    it('should otherwise be empty string', function () {
      fixture.innerHTML = '<button></button>';
      axe.testUtils.flatTreeSetup(fixture);

      var target = axe.utils.querySelectorAll(axe._tree, 'button')[0];
      assert.equal(axe.commons.text.accessibleTextVirtual(target), '');
    });
  });

  describe('text level semantics', function () {
    var tags = [
      'em',
      'strong',
      'small',
      's',
      'cite',
      'q',
      'dfn',
      'abbr',
      'time',
      'code',
      'var',
      'samp',
      'kbd',
      'sub',
      'sup',
      'i',
      'b',
      'u',
      'mark',
      'ruby',
      'rt',
      'rp',
      'bdi',
      'bdo',
      'br',
      'wbr'
    ];

    it('should find aria-labelledby', function () {
      tags.forEach(function (tag) {
        fixture.innerHTML = '<div id="t1">Hello</div><div id="t2">World</div>';
        axe.testUtils.flatTreeSetup(fixture);

        var elm = document.createElement(tag);
        elm.setAttribute('aria-labelledby', 't1 t2');
        elm.style.display = 'inline'; // Firefox hides some of these elements because reasons...
        fixture.appendChild(elm);
        axe.testUtils.flatTreeSetup(fixture);

        var target = axe.utils.getNodeFromTree(elm);
        var result = axe.commons.text.accessibleTextVirtual(target);
        assert.equal(result, 'Hello World', tag);
      });
    });

    it('should find aria-label', function () {
      tags.forEach(function (tag) {
        var elm = document.createElement(tag);
        elm.setAttribute('aria-label', 'Hello World');
        elm.style.display = 'inline'; // Firefox hack, see above
        fixture.appendChild(elm);
        axe.testUtils.flatTreeSetup(fixture);

        var target = axe.utils.getNodeFromTree(elm);
        var result = axe.commons.text.accessibleTextVirtual(target);
        assert.equal(result, 'Hello World', tag);
      });
    });

    it('should find a title attribute', function () {
      tags.forEach(function (tag) {
        var elm = document.createElement(tag);
        elm.setAttribute('title', 'Hello World');
        elm.style.display = 'inline'; // Firefox hack, see above
        fixture.appendChild(elm);
        axe.testUtils.flatTreeSetup(fixture);

        var target = axe.utils.getNodeFromTree(elm);
        var result = axe.commons.text.accessibleTextVirtual(target);
        assert.equal(result, 'Hello World', tag);
      });
    });

    it('should otherwise be empty string', function () {
      tags.forEach(function (tag) {
        fixture.innerHTML = '<' + tag + '></' + tag + '>';
        axe.testUtils.flatTreeSetup(fixture);

        var target = axe.utils.querySelectorAll(axe._tree, tag)[0];
        assert.equal(axe.commons.text.accessibleTextVirtual(target), '');
      });
    });

    it('inserts a space before img alt text', function () {
      var accessibleText = axe.commons.text.accessibleText;
      fixture.innerHTML =
        '<a id="test" href="../images/index.html">Images tool test page<img id="img18" aria-label="aria-label text" alt="logo" src="../images/Accessibility.jpg" width="50" height="50"></a>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(
        accessibleText(target),
        'Images tool test page aria-label text'
      );
    });
  });

  describe('text.accessibleText acceptance tests', function () {
    'use strict';
    // Tests borrowed from the AccName 1.1 testing docs
    // https://www.w3.org/wiki/AccName_1.1_Testable_Statements#Name_test_case_539

    var ariaValuetext = xit; // Not acc supported
    var pseudoText = xit; // Not acc supported

    var fixture = document.getElementById('fixture');
    var accessibleText = axe.commons.text.accessibleText;
    var _unsupported;

    before(function () {
      _unsupported = axe.commons.text.unsupported.accessibleNameFromFieldValue;
      axe.commons.text.unsupported.accessibleNameFromFieldValue = [];
    });
    after(function () {
      axe.commons.text.unsupported.accessibleNameFromFieldValue = _unsupported;
    });

    afterEach(function () {
      fixture.innerHTML = '';
      axe._tree = null;
    });

    it('passes test 1', function () {
      fixture.innerHTML = '<input type="button" aria-label="Rich" id="test">';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'Rich');
    });

    it('passes test 2', function () {
      fixture.innerHTML =
        '<div id="ID1">Rich\'s button</div>' +
        '<input type="button" aria-labelledby="ID1" id="test">';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), "Rich's button");
    });

    it('passes test 3', function () {
      fixture.innerHTML =
        '<div id="ID1">Rich\'s button</div>' +
        '<input type="button" aria-label="bar" aria-labelledby="ID1" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), "Rich's button");
    });

    it('passes test 4', function () {
      fixture.innerHTML = '<input type="reset" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'Reset');
    });

    it('passes test 5', function () {
      fixture.innerHTML = '<input type="button" id="test" value="foo"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo');
    });

    it('passes test 6', function () {
      fixture.innerHTML =
        '<input src="baz.html" type="image" id="test" alt="foo"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo');
    });

    it('passes test 7', function () {
      fixture.innerHTML =
        '<label for="test">States:</label>' + '<input type="text" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'States:');
    });

    it('passes test 8', function () {
      fixture.innerHTML =
        '<label for="test">' +
        'foo' +
        '<input type="text" value="David"/>' +
        '</label>' +
        '<input type="text" id="test" value="baz"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo David');
    });

    it('passes test 9', function () {
      fixture.innerHTML =
        '<label for="test">' +
        'crazy' +
        '  <select name="member" size="1" role="menu" tabindex="0">' +
        '    <option role="menuitem" value="beard" selected="true">clown</option>' +
        '    <option role="menuitem" value="scuba">rich</option>' +
        '  </select>' +
        '</label> ' +
        '<input type="text" id="test" value="baz"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'crazy');
    });

    ariaValuetext('passes test 10', function () {
      fixture.innerHTML =
        '<label for="test">' +
        '  crazy' +
        '   <div role="spinbutton" aria-valuetext="Monday" aria-valuemin="1" aria-valuemax="7" aria-valuenow="4">' +
        '   </div>' +
        '</label>' +
        '<input type="text" id="test" value="baz"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'crazy Monday');
    });

    it('passes test 11', function () {
      fixture.innerHTML =
        '<label for="test">' +
        '  crazy' +
        '  <div role="spinbutton" aria-valuemin="1" aria-valuemax="7" aria-valuenow="4">' +
        '  </div>' +
        '</label>' +
        '<input type="text" id="test" value="baz"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'crazy 4');
    });

    it('passes test 12', function () {
      fixture.innerHTML =
        '<input type="text" id="test" title="crazy" value="baz"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'crazy');
    });

    pseudoText('passes test 13', function () {
      fixture.innerHTML =
        '<style>' +
        '  label:before { content:"fancy "; }' +
        '</style>' +
        '<label for="test">fruit</label>' +
        '<input type="text" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'fancy fruit');
    });

    pseudoText('passes test 14', function () {
      fixture.innerHTML =
        '<style type="text/css">' +
        '  [data-after]:after { content: attr(data-after); }' +
        '</style>' +
        '<label for="test" data-after="test content"></label>' +
        '<input type="text" id="test">';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'test content');
    });

    it('passes test 15', function () {
      fixture.innerHTML = '<img id="test" src="foo.jpg" aria-label="1"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), '1');
    });

    it('passes test 16', function () {
      fixture.innerHTML =
        '<img id="test" src="foo.jpg" aria-label="1" alt="a" title="t"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), '1');
    });

    // To the best of my knowledge, this test is incorrect
    // Chrome and Firefox seem to return "peanuts", so does axe-core.
    xit('passes test 17', function () {
      fixture.innerHTML =
        '<input type="text" value="peanuts" id="test">' +
        '<img aria-labelledby="test" src="foo.jpg"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), '');
    });

    it('passes test 18', function () {
      fixture.innerHTML =
        '<img id="test" aria-labelledby="test" src="foo.jpg"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), '');
    });

    // To the best of my knowledge, this test is incorrect
    // Chrome and Firefox seem to return "peanuts", so does axe-core.
    xit('passes test 19', function () {
      fixture.innerHTML =
        '<input type="text" value="peanuts" id="test">' +
        '<img aria-labelledby="test" aria-label="1" src="foo.jpg"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), '');
    });

    it('passes test 20', function () {
      fixture.innerHTML =
        '<img id="test" aria-labelledby="test" aria-label="1" src="foo.jpg"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), '1');
    });

    it('passes test 21', function () {
      fixture.innerHTML =
        '<input type="text" value="peanuts" id="ID1">' +
        '<input type="text" value="popcorn" id="ID2">' +
        '<input type="text" value="apple jacks" id="ID3">' +
        '<img aria-labelledby="ID1 ID2 ID3" id="test" src="foo.jpg"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'peanuts popcorn apple jacks');
    });

    it('passes test 22', function () {
      fixture.innerHTML =
        '<input type="text" value="peanuts" id="ID1">' +
        '<img id="test" aria-label="l" aria-labelledby="test ID1" src="foo.jpg"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'l peanuts');
    });

    it('passes test 23', function () {
      fixture.innerHTML =
        '<input type="text" value="peanuts" id="ID1">' +
        '<input type="text" value="popcorn" id="ID2">' +
        '<img id="test" aria-label="l" aria-labelledby="test ID1 ID2" src="foo.jpg"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'l peanuts popcorn');
    });

    it('passes test 24', function () {
      fixture.innerHTML =
        '<input type="text" value="peanuts" id="ID1">' +
        '<input type="text" value="popcorn" id="ID2">' +
        '<input type="text" value="apple jacks" id="ID3">' +
        '<img id="test" aria-label="l" aria-labelledby="test ID1 ID2 ID3" alt= "a" title="t" src="foo.jpg"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'l peanuts popcorn apple jacks');
    });

    it('passes test 25', function () {
      fixture.innerHTML =
        '<input type="text" value="peanuts" id="ID1">' +
        '<input type="text" value="popcorn" id="ID2">' +
        '<input type="text" value="apple jacks" id="ID3">' +
        '<img id="test" aria-label="" aria-labelledby="test ID1 ID2 ID3" alt="" title="t" src="foo.jpg"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 't peanuts popcorn apple jacks');
    });

    it('passes test 26', function () {
      fixture.innerHTML =
        '<div id="test" aria-labelledby="ID1">foo</div>' +
        '<span id="ID1">bar</span>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'bar');
    });

    it('passes test 27', function () {
      fixture.innerHTML = '<div id="test" aria-label="Tag">foo</div>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'Tag');
    });

    it('passes test 28', function () {
      fixture.innerHTML =
        '<div id="test" aria-labelledby="ID1" aria-label="Tag">foo</div>' +
        '<span id="ID1">bar</span>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'bar');
    });

    it('passes test 29', function () {
      fixture.innerHTML =
        '<div id="test" aria-labelledby="ID0 ID1" aria-label="Tag">foo</div>' +
        '<span id="ID0">bar</span>' +
        '<span id="ID1">baz</span>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'bar baz');
    });

    // Should only pass in strict mode
    it('passes test 30', function () {
      fixture.innerHTML = '<div id="test">Div with text</div>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target, { strict: true }), '');
    });

    it('passes test 31', function () {
      fixture.innerHTML = '<div id="test" role="button">foo</div>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo');
    });

    it('passes test 32', function () {
      fixture.innerHTML =
        '<div id="test" role="button" title="Tag" style="outline:medium solid black; width:2em; height:1em;">' +
        '</div>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'Tag');
    });

    it('passes test 33', function () {
      fixture.innerHTML =
        '<div id="ID1">foo</div>' +
        '<a id="test" href="test.html" aria-labelledby="ID1">bar</a>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo');
    });

    it('passes test 34', function () {
      fixture.innerHTML =
        '<a id="test" href="test.html" aria-label="Tag">ABC</a>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'Tag');
    });

    it('passes test 35', function () {
      fixture.innerHTML =
        '<a href="test.html" id="test" aria-labelledby="ID1" aria-label="Tag">foo</a>' +
        '<p id="ID1">bar</p>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'bar');
    });

    it('passes test 36', function () {
      fixture.innerHTML =
        '<a href="test.html" id="test" aria-labelledby="test ID1" aria-label="Tag"></a>' +
        '<p id="ID1">foo</p>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'Tag foo');
    });

    it('passes test 37', function () {
      fixture.innerHTML = '<a href="test.html" id="test">ABC</a>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'ABC');
    });

    it('passes test 38', function () {
      fixture.innerHTML = '<a href="test.html" id="test" title="Tag"></a>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'Tag');
    });

    it('passes test 39', function () {
      fixture.innerHTML =
        '<input id="test" type="text" aria-labelledby="ID1 ID2 ID3">' +
        '<p id="ID1">foo</p>' +
        '<p id="ID2">bar</p>' +
        '<p id="ID3">baz</p>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo bar baz');
    });

    it('passes test 40', function () {
      fixture.innerHTML =
        '<input id="test" type="text" aria-label="bar" aria-labelledby="ID1 test">' +
        '<div id="ID1">foo</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo bar');
    });

    it('passes test 41', function () {
      fixture.innerHTML =
        '<input id="test" type="text"/>' + '<label for="test">foo</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo');
    });

    it('passes test 42', function () {
      fixture.innerHTML =
        '<input type="password" id="test">' + '<label for="test">foo</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo');
    });

    it('passes test 43', function () {
      fixture.innerHTML =
        '<input type="checkbox" id="test">' +
        '<label for="test">foo</label></body>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo');
    });

    it('passes test 44', function () {
      fixture.innerHTML =
        '<input type="radio" id="test">' + '<label for="test">foo</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo');
    });

    it('passes test 45', function () {
      fixture.innerHTML =
        '<input type="file" id="test">' + '<label for="test">foo</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo');
    });

    it('passes test 46', function () {
      fixture.innerHTML =
        '<input type="image" id="test">' + '<label for="test">foo</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo');
    });

    it('passes test 47', function () {
      fixture.innerHTML =
        '<input type="checkbox" id="test">' +
        '<label for="test">foo<input type="text" value="bar">baz</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo bar baz');
    });

    it('passes test 48', function () {
      fixture.innerHTML =
        '<input type="text" id="test">' +
        '<label for="test">foo<input type="text" value="bar">baz</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo bar baz');
    });

    it('passes test 49', function () {
      fixture.innerHTML =
        '<input type="password" id="test">' +
        '<label for="test">foo<input type="text" value="bar">baz</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo bar baz');
    });

    it('passes test 50', function () {
      fixture.innerHTML =
        '<input type="radio" id="test">' +
        '<label for="test">foo<input type="text" value="bar">baz</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo bar baz');
    });

    it('passes test 51', function () {
      fixture.innerHTML =
        '<input type="file" id="test">' +
        '<label for="test">foo <input type="text" value="bar"> baz</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo bar baz');
    });

    pseudoText('passes test 52', function () {
      fixture.innerHTML =
        '<style type="text/css">' +
        '  label:before { content: "foo"; }' +
        '  label:after { content: "baz"; }' +
        '</style>' +
        '<form>' +
        '  <label for="test" title="bar"><input id="test" type="text" name="test" title="buz"></label> ' +
        '</form>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo bar baz');
    });

    pseudoText('passes test 53', function () {
      fixture.innerHTML =
        '<style type="text/css">' +
        '  label:before { content: "foo"; }' +
        '  label:after { content: "baz"; }' +
        '</style>' +
        '<form>' +
        '  <label for="test" title="bar"><input id="test" type="password" name="test" title="buz"></label> ' +
        '</form>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo bar baz');
    });

    pseudoText('passes test 54', function () {
      fixture.innerHTML =
        '<style type="text/css">' +
        '  label:before { content: "foo"; }' +
        '  label:after { content: "baz"; }' +
        '</style>' +
        '<form>' +
        '  <label for="test"><input id="test" type="checkbox" name="test" title=" bar "></label>' +
        '</form>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo baz');
    });

    pseudoText('passes test 55', function () {
      fixture.innerHTML =
        '<style type="text/css">' +
        '  label:before { content: "foo"; }' +
        '  label:after { content: "baz"; }' +
        '</style>' +
        '<form>' +
        '  <label for="test"><input id="test" type="radio" name="test" title=" bar "></label> ' +
        '</form>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo baz');
    });

    pseudoText('passes test 56', function () {
      fixture.innerHTML =
        '<style type="text/css">' +
        '  label:before { content: "foo"; }' +
        '  label:after { content: "baz"; }' +
        '</style>' +
        '<form>' +
        '  <label for="test"><input id="test" type="file" name="test" title="bar"></label>' +
        '</form>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo baz');
    });

    pseudoText('passes test 57', function () {
      fixture.innerHTML =
        '<style type="text/css">' +
        '  label:before { content: "foo"; }' +
        '  label:after { content: "baz"; }' +
        '</style>' +
        '<form>' +
        '  <label for="test"><input id="test" type="image" src="foo.jpg" name="test" title="bar"></label>' +
        '</form>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo baz');
    });

    it('passes test 58', function () {
      fixture.innerHTML =
        '<label for="test">States:</label>' +
        '<input type="password" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'States:');
    });

    it('passes test 59', function () {
      fixture.innerHTML =
        '<label for="test">States:</label>' +
        '<input type="checkbox" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'States:');
    });

    it('passes test 60', function () {
      fixture.innerHTML =
        '<label for="test">States:</label>' + '<input type="radio" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'States:');
    });

    it('passes test 61', function () {
      fixture.innerHTML =
        '<label for="test">File:</label>' + '<input type="file" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'File:');
    });

    it('passes test 62', function () {
      fixture.innerHTML =
        '<label for="test">States:</label>' +
        '<input type="image" id="test" src="foo.jpg"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'States:');
    });

    it('passes test 63', function () {
      fixture.innerHTML =
        '<label for="test">' +
        '  foo' +
        '  <input type="text" value="David"/>' +
        '</label>' +
        '<input type="password" id="test" value="baz"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo David');
    });

    it('passes test 64', function () {
      fixture.innerHTML =
        '<label for="test">' +
        '  foo' +
        '  <input type="text" value="David"/>' +
        '</label>' +
        '<input type="checkbox" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo David');
    });

    it('passes test 65', function () {
      fixture.innerHTML =
        '<label for="test">' +
        '  foo' +
        '  <input type="text" value="David"/>' +
        '</label>' +
        '<input type="radio" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo David');
    });

    it('passes test 66', function () {
      fixture.innerHTML =
        '<label for="test">' +
        '  foo' +
        '  <input type="text" value="David"/>' +
        '</label>' +
        '<input type="file" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo David');
    });

    it('passes test 67', function () {
      fixture.innerHTML =
        '<label for="test">' +
        '  foo' +
        '  <input type="text" value="David"/>' +
        '</label>' +
        '<input type="image" id="test" src="foo.jpg"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo David');
    });

    it('passes test 68', function () {
      fixture.innerHTML =
        '<label for="test">' +
        '  crazy' +
        '  <select name="member" size="1" role="menu" tabindex="0">' +
        '    <option role="menuitem" value="beard" selected="true">clown</option>' +
        '    <option role="menuitem" value="scuba">rich</option>' +
        '  </select>' +
        '</label> ' +
        '<input type="password" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'crazy');
    });

    it('passes test 69', function () {
      fixture.innerHTML =
        '<label for="test">' +
        '  crazy' +
        '  <select name="member" size="1" role="menu" tabindex="0">' +
        '    <option role="menuitem" value="beard" selected="true">clown</option>' +
        '    <option role="menuitem" value="scuba">rich</option>' +
        '  </select>' +
        '</label> ' +
        '<input type="checkbox" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'crazy');
    });

    it('passes test 70', function () {
      fixture.innerHTML =
        '<label for="test">' +
        '  crazy' +
        '  <select name="member" size="1" role="menu" tabindex="0">' +
        '    <option role="menuitem" value="beard" selected="true">clown</option>' +
        '    <option role="menuitem" value="scuba">rich</option>' +
        '  </select>' +
        '</label> ' +
        '<input type="radio" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'crazy');
    });

    it('passes test 71', function () {
      fixture.innerHTML =
        '<label for="test">' +
        '  crazy' +
        '  <select name="member" size="1" role="menu" tabindex="0">' +
        '    <option role="menuitem" value="beard" selected="true">clown</option>' +
        '    <option role="menuitem" value="scuba">rich</option>' +
        '  </select>' +
        '</label> ' +
        '<input type="file" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'crazy');
    });

    it('passes test 72', function () {
      fixture.innerHTML =
        '<label for="test">' +
        '  crazy' +
        '  <select name="member" size="1" role="menu" tabindex="0">' +
        '    <option role="menuitem" value="beard" selected="true">clown</option>' +
        '    <option role="menuitem" value="scuba">rich</option>' +
        '  </select>' +
        '</label> ' +
        '<input type="image" id="test" src="foo.jpg"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'crazy');
    });

    ariaValuetext('passes test 73', function () {
      fixture.innerHTML =
        '<label for="test">' +
        '  crazy' +
        '  <div role="spinbutton" aria-valuetext="Monday" aria-valuemin="1" aria-valuemax="7" aria-valuenow="4">' +
        '  </div>' +
        '</label>' +
        '<input type="password" value="baz" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'crazy Monday');
    });

    ariaValuetext('passes test 74', function () {
      fixture.innerHTML =
        '<label for="test">' +
        '  crazy' +
        '  <div role="spinbutton" aria-valuetext="Monday"' +
        '   aria-valuemin="1" aria-valuemax="7" aria-valuenow="4"></div>' +
        '</label>' +
        '<input type="checkbox" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'crazy Monday');
    });

    ariaValuetext('passes test 75', function () {
      fixture.innerHTML =
        '<label for="test">' +
        '  crazy' +
        '  <div role="spinbutton" aria-valuetext="Monday"' +
        '   aria-valuemin="1" aria-valuemax="7" aria-valuenow="4"></div>' +
        '</label>' +
        '<input type="radio" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'crazy Monday');
    });

    ariaValuetext('passes test 76', function () {
      fixture.innerHTML =
        '<label for="test">' +
        '  crazy' +
        '  <div role="spinbutton" aria-valuetext="Monday"' +
        '   aria-valuemin="1" aria-valuemax="7" aria-valuenow="4"></div>' +
        '</label>' +
        '<input type="file" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'crazy Monday');
    });

    ariaValuetext('passes test 77', function () {
      fixture.innerHTML =
        '<label for="test">' +
        '  crazy' +
        '  <div role="spinbutton" aria-valuetext="Monday" aria-valuemin="1"' +
        '   aria-valuemax="7" aria-valuenow="4"></div>' +
        '</label>' +
        '<input type="image" src="foo.jpg" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'crazy Monday');
    });

    it('passes test 78', function () {
      fixture.innerHTML =
        '<label for="test">' +
        '  crazy' +
        '  <div role="spinbutton" aria-valuemin="1" aria-valuemax="7" aria-valuenow="4">' +
        '  </div>' +
        '</label>' +
        '<input type="password" id="test" value="baz"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'crazy 4');
    });

    it('passes test 79', function () {
      fixture.innerHTML =
        '<label for="test">' +
        '  crazy' +
        '  <div role="spinbutton" aria-valuemin="1" aria-valuemax="7" aria-valuenow="4">' +
        '  </div>' +
        '</label>' +
        '<input type="checkbox" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'crazy 4');
    });

    it('passes test 80', function () {
      fixture.innerHTML =
        '<label for="test">' +
        '  crazy' +
        '  <div role="spinbutton" aria-valuemin="1" aria-valuemax="7" aria-valuenow="4">' +
        '  </div>' +
        '</label>' +
        '<input type="radio" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'crazy 4');
    });

    it('passes test 81', function () {
      fixture.innerHTML =
        '<label for="test">' +
        '  crazy' +
        '  <div role="spinbutton" aria-valuemin="1" aria-valuemax="7" aria-valuenow="4">' +
        '  </div>' +
        '</label>' +
        '<input type="file" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'crazy 4');
    });

    it('passes test 82', function () {
      fixture.innerHTML =
        '<label for="test">' +
        '  crazy' +
        '  <div role="spinbutton" aria-valuemin="1" aria-valuemax="7" aria-valuenow="4">' +
        '  </div>' +
        '</label>' +
        '<input type="image" src="foo.jpg" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'crazy 4');
    });

    it('passes test 83', function () {
      fixture.innerHTML =
        '<input type="password" id="test" title="crazy" value="baz"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'crazy');
    });

    it('passes test 84', function () {
      fixture.innerHTML = '<input type="checkbox" id="test" title="crazy"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'crazy');
    });

    it('passes test 85', function () {
      fixture.innerHTML = '<input type="radio" id="test" title="crazy"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'crazy');
    });

    it('passes test 86', function () {
      fixture.innerHTML = '<input type="file" id="test" title="crazy"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'crazy');
    });

    it('passes test 87', function () {
      fixture.innerHTML =
        '<input type="image" src="foo.jpg" id="test" title="crazy"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'crazy');
    });

    pseudoText('passes test 88', function () {
      fixture.innerHTML =
        '<style>' +
        '  label:before { content:"fancy "; }' +
        '</style>' +
        '<label for="test">fruit</label>' +
        '<input type="password" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'fancy fruit');
    });

    pseudoText('passes test 89', function () {
      fixture.innerHTML =
        '<style>' +
        '  label:before { content:"fancy "; }' +
        '</style>' +
        '<label for="test">fruit</label>' +
        '<input type="checkbox" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'fancy fruit');
    });

    pseudoText('passes test 90', function () {
      fixture.innerHTML =
        '<style>' +
        '  label:before { content:"fancy "; }' +
        '</style>' +
        '<label for="test">fruit</label>' +
        '<input type="radio" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'fancy fruit');
    });

    pseudoText('passes test 91', function () {
      fixture.innerHTML =
        '<style>' +
        '  label:before { content:"fancy "; }' +
        '</style>' +
        '<label for="test">fruit</label>' +
        '<input type="file" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'fancy fruit');
    });

    pseudoText('passes test 92', function () {
      fixture.innerHTML =
        '<style>' +
        '  label:before { content:"fancy "; }' +
        '</style>' +
        '<label for="test">fruit</label>' +
        '<input type="image" src="foo.jpg" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'fancy fruit');
    });

    pseudoText('passes test 93', function () {
      fixture.innerHTML =
        '<style>' +
        '  label:after { content:" fruit"; }' +
        '</style>' +
        '<label for="test">fancy</label>' +
        '<input type="password" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'fancy fruit');
    });

    pseudoText('passes test 94', function () {
      fixture.innerHTML =
        '<style>' +
        '  label:after { content:" fruit"; }' +
        '</style>' +
        '<label for="test">fancy</label>' +
        '<input type="checkbox" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'fancy fruit');
    });

    pseudoText('passes test 95', function () {
      fixture.innerHTML =
        '<style>' +
        '  label:after { content:" fruit"; }' +
        '</style>' +
        '<label for="test">fancy</label>' +
        '<input type="radio" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'fancy fruit');
    });

    pseudoText('passes test 96', function () {
      fixture.innerHTML =
        '<style>' +
        '  label:after { content:" fruit"; }' +
        '</style>' +
        '<label for="test">fancy</label>' +
        '<input type="file" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'fancy fruit');
    });

    pseudoText('passes test 97', function () {
      fixture.innerHTML =
        '<style>' +
        '  label:after { content:" fruit"; }' +
        '</style>' +
        '<label for="test">fancy</label>' +
        '<input type="image" src="foo.jpg" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'fancy fruit');
    });

    it('passes test 98', function () {
      fixture.innerHTML =
        '<input type="checkbox" id="test" />' +
        '<label for="test">Flash the screen ' +
        '  <div role="combobox">' +
        '    <div role="textbox"></div>' +
        '    <ul role="listbox" style="list-style-type: none;">' +
        '      <li role="option" aria-selected="true">1</li>' +
        ' 	<li role="option">2</li>' +
        ' 	<li role="option">3</li>' +
        '    </ul>' +
        '  </div>' +
        '  times.' +
        '</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      // Chrome 72: "Flash the screen 1 times"
      // Safari 12.0: "Flash the screen 1 times"
      // Firefox 62: "Flash the screen 1 times"
      assert.equal(accessibleText(target), 'Flash the screen 1 times.');
    });

    it('passes test 99', function () {
      fixture.innerHTML =
        '<input type="checkbox" id="test" />' +
        '<label for="test">Flash the screen ' +
        '  <span role="menu">' +
        '    <span role="menuitem" aria-selected="true">1</span>' +
        '      <span role="menuitem" hidden>2</span>' +
        ' 	<span role="menuitem" hidden>3</span>' +
        '    </span>' +
        '    times.' +
        '</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'Flash the screen times.');
    });

    it('passes test 100', function () {
      fixture.innerHTML =
        '<input type="checkbox" id="test" />' +
        '<label for="test">Flash the screen ' +
        '  <select size="1">' +
        '    <option selected="selected">1</option>' +
        '    <option>2</option>' +
        '    <option>3</option>' +
        '  </select>' +
        '  times.' +
        '</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'Flash the screen 1 times.');
    });

    it('passes test 101', function () {
      fixture.innerHTML =
        '<input type="checkbox" id="test" />' +
        '<label for="test">foo <input role="slider" type="range" value="5" min="1" max="10" aria-valuenow="5" aria-valuemin="1" aria-valuemax="10"> baz   	' +
        '</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo 5 baz');
    });

    it('passes test 102', function () {
      fixture.innerHTML =
        '<input type="checkbox" id="test" />' +
        '<label for="test">foo <input role="spinbutton" type="number" value="5" min="1" max="10" aria-valuenow="5" aria-valuemin="1" aria-valuemax="10"> baz' +
        '</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo 5 baz');
    });

    it('passes test 103', function () {
      fixture.innerHTML = '<input type="checkbox" id="test" title="foo" />';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo');
    });

    it('passes test 104', function () {
      fixture.innerHTML =
        '<input type="file" id="test" />' +
        '<label for="test">Flash the screen ' +
        '  <div role="combobox">' +
        '    <div role="textbox"></div>' +
        '    <ul role="listbox" style="list-style-type: none;">' +
        '      <li role="option" aria-selected="true">1 </li>' +
        ' 	<li role="option">2 </li>' +
        ' 	<li role="option">3 </li>' +
        '    </ul>' +
        '  </div>' +
        '  times.' +
        '</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'Flash the screen 1 times.');
    });

    it('passes test 105', function () {
      fixture.innerHTML =
        '<input type="file" id="test" />' +
        '<label for="test">Flash the screen ' +
        '  <span role="menu">' +
        '    <span role="menuitem" aria-selected="true">1</span>' +
        '    <span role="menuitem" hidden>2</span>' +
        '    <span role="menuitem" hidden>3</span>' +
        '  </span>' +
        '  times.' +
        '</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'Flash the screen times.');
    });

    it('passes test 106', function () {
      fixture.innerHTML =
        '<input type="file" id="test" />' +
        '<label for="test">Flash the screen ' +
        '  <select size="1">' +
        '    <option selected="selected">1</option>' +
        '    <option>2</option>' +
        '    <option>3</option>' +
        '  </select>' +
        '  times.' +
        '</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'Flash the screen 1 times.');
    });

    it('passes test 107', function () {
      fixture.innerHTML =
        '<input type="file" id="test" />' +
        '<label for="test">foo <input role="slider" type="range" value="5" min="1" max="10" aria-valuenow="5" aria-valuemin="1" aria-valuemax="10"> baz' +
        '</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo 5 baz');
    });

    it('passes test 108', function () {
      fixture.innerHTML =
        '<input type="file" id="test" />' +
        '<label for="test">foo <input role="spinbutton" type="number" value="5" min="1" max="10" aria-valuenow="5" aria-valuemin="1" aria-valuemax="10"> baz' +
        '</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo 5 baz');
    });

    it('passes test 109', function () {
      fixture.innerHTML = '<input type="file" id="test" title="foo" />';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo');
    });

    it('passes test 110', function () {
      fixture.innerHTML =
        '<input type="image" src="test.png" id="test" title="foo" />';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo');
    });

    it('passes test 111', function () {
      fixture.innerHTML =
        '<input type="password" id="test" />' +
        '<label for="test">Flash the screen ' +
        '  <div role="combobox">' +
        '    <div role="textbox"></div>' +
        '    <ul role="listbox" style="list-style-type: none;">' +
        '      <li role="option" aria-selected="true">1</li>' +
        ' 	<li role="option">2</li>' +
        ' 	<li role="option">3</li>' +
        '    </ul>' +
        '  </div>' +
        '  times.' +
        '</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'Flash the screen 1 times.');
    });

    it('passes test 112', function () {
      fixture.innerHTML =
        '<input type="password" id="test" />' +
        '<label for="test">Flash the screen ' +
        '  <span role="menu">' +
        '    <span role="menuitem" aria-selected="true">1</span>' +
        '    <span role="menuitem" hidden>2</span>' +
        '    <span role="menuitem" hidden>3</span>' +
        '  </span>' +
        '  times.' +
        '</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'Flash the screen times.');
    });

    it('passes test 113', function () {
      fixture.innerHTML =
        '<input type="password" id="test" />' +
        '<label for="test">Flash the screen ' +
        '  <select size="1">' +
        '    <option selected="selected">1</option>' +
        '    <option>2</option>' +
        '    <option>3</option>' +
        '  </select>' +
        '  times.' +
        '</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'Flash the screen 1 times.');
    });

    it('passes test 114', function () {
      fixture.innerHTML =
        '<input type="password" id="test" />' +
        '<label for="test">foo <input role="slider" type="range" value="5" min="1" max="10" aria-valuenow="5" aria-valuemin="1" aria-valuemax="10"> baz' +
        '</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo 5 baz');
    });

    it('passes test 115', function () {
      fixture.innerHTML =
        '<input type="password" id="test" />' +
        '<label for="test">foo <input role="spinbutton" type="number" value="5" min="1" max="10" aria-valuenow="5" aria-valuemin="1" aria-valuemax="10"> baz' +
        '</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo 5 baz');
    });

    it('passes test 116', function () {
      fixture.innerHTML = '<input type="password" id="test" title="foo" />';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo');
    });

    it('passes test 117', function () {
      fixture.innerHTML =
        '<input type="radio" id="test" />' +
        '<label for="test">Flash the screen ' +
        '  <div role="combobox">' +
        '    <div role="textbox"></div>' +
        '    <ul role="listbox" style="list-style-type: none;">' +
        '      <li role="option" aria-selected="true">1</li>' +
        ' 	   <li role="option">2</li>' +
        ' 	   <li role="option">3</li>' +
        '    </ul>' +
        '  </div>' +
        '  times.' +
        '</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'Flash the screen 1 times.');
    });

    it('passes test 118', function () {
      fixture.innerHTML =
        '<input type="radio" id="test" />' +
        '<label for="test">Flash the screen ' +
        '  <span role="menu">' +
        '    <span role="menuitem" aria-selected="true">1</span>' +
        '    <span role="menuitem" hidden>2</span>' +
        '    <span role="menuitem" hidden>3</span>' +
        '  </span>' +
        '  times.' +
        '</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'Flash the screen times.');
    });

    it('passes test 119', function () {
      fixture.innerHTML =
        '<input type="radio" id="test" />' +
        '<label for="test">Flash the screen ' +
        '  <select size="1">' +
        '    <option selected="selected">1</option>' +
        '    <option>2</option>' +
        '    <option>3</option>' +
        '  </select>' +
        '  times.' +
        '</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      // Chrome 72: "Flash the screen 1 times"
      // Firefox 62: "Flash the screen 1 times"
      // Safari 12.0: "Flash the screen 1 times"
      assert.equal(accessibleText(target), 'Flash the screen 1 times.');
    });

    it('passes test 120', function () {
      fixture.innerHTML =
        '<input type="radio" id="test" />' +
        '<label for="test">foo <input role="slider" type="range" value="5" min="1" max="10" aria-valuenow="5" aria-valuemin="1" aria-valuemax="10"> baz' +
        '</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      // Chrome 70: Foo 5 baz
      // Firefox 62: Foo 5 baz
      // Safari 12.0: Foo 5 baz
      assert.equal(accessibleText(target), 'foo 5 baz');
    });

    it('passes test 121', function () {
      fixture.innerHTML =
        '<input type="radio" id="test" />' +
        '<label for="test">foo <input role="spinbutton"  type="number" value="5" min="1" max="10" aria-valuenow="5" aria-valuemin="1" aria-valuemax="10"> baz' +
        '</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo 5 baz');
    });

    it('passes test 122', function () {
      fixture.innerHTML = '<input type="radio" id="test" title="foo" />';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo');
    });

    it('passes test 123', function () {
      fixture.innerHTML =
        '<input type="text" id="test" />' +
        '<label for="test">Flash the screen ' +
        '  <div role="combobox">' +
        '    <div role="textbox"></div>' +
        '    <ul role="listbox" style="list-style-type: none;">' +
        '      <li role="option" aria-selected="true">1</li>' +
        ' 	   <li role="option">2</li>' +
        ' 	   <li role="option">3</li>' +
        '    </ul>' +
        '  </div>' +
        '  times.' +
        '</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      // Chrome 72: "Flash the screen 1 times."
      // Firefox 62: "Flash the screen 1 times."
      // Safari 12.0: "Flash the screen 1 times."
      assert.equal(accessibleText(target), 'Flash the screen 1 times.');
    });

    it('passes test 124', function () {
      fixture.innerHTML =
        '<input type="text" id="test" />' +
        '<label for="test">Flash the screen ' +
        '  <span role="menu">' +
        '    <span role="menuitem" aria-selected="true">1</span>' +
        '    <span role="menuitem" hidden>2</span>' +
        '    <span role="menuitem" hidden>3</span>' +
        '  </span>' +
        '  times.' +
        '</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'Flash the screen times.');
    });

    it('passes test 125', function () {
      fixture.innerHTML =
        '<input type="text" id="test" />' +
        '<label for="test">Flash the screen ' +
        '  <select size="1">' +
        '    <option selected="selected">1</option>' +
        '    <option>2</option>' +
        '    <option>3</option>' +
        '  </select>' +
        '  times.' +
        '</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      // Chrome 72: Flash the screen 1 times
      // Firefox 62: Flash the screen 1 times
      // Safari 12.0: Flash the screen 1 times
      assert.equal(accessibleText(target), 'Flash the screen 1 times.');
    });

    it('passes test 126', function () {
      fixture.innerHTML =
        '<input type="text" id="test" />' +
        '<label for="test">foo <input role="slider" type="range" value="5" min="1" max="10" aria-valuenow="5" aria-valuemin="1" aria-valuemax="10"> baz' +
        '</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo 5 baz');
    });

    it('passes test 127', function () {
      fixture.innerHTML =
        '<input type="text" id="test" />' +
        '<label for="test">foo <input role="spinbutton" type="number" value="5" min="1" max="10" aria-valuenow="5" aria-valuemin="1" aria-valuemax="10"> baz' +
        '</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo 5 baz');
    });

    it('passes test 128', function () {
      fixture.innerHTML = '<input type="text" id="test" title="foo" />';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'foo');
    });

    // Skip from 128 - 138 as those are name description cases

    it('passes test 139', function () {
      fixture.innerHTML =
        '<style>' +
        '  .hidden { display: none; }' +
        '</style>' +
        '<div id="test" role="link" tabindex="0">' +
        '  <span aria-hidden="true"><i> Hello, </i></span>' +
        '  <span>My</span> name is' +
        '  <div><img src="file.jpg" title="Bryan" alt="" role="presentation" /></div>' +
        '  <span role="presentation" aria-label="Eli">' +
        '    <span aria-label="Garaventa">Zambino</span>' +
        '  </span>' +
        '  <span>the weird.</span>' +
        '  (QED)' +
        '  <span  class="hidden"><i><b>and don\'t you forget it.</b></i></span>' +
        '  <table>' +
        '    <tr>' +
        '      <td>Where</td>' +
        '      <td style="visibility:hidden;"><div>in</div></td>' +
        '      <td><div style="display:none;">the world</div></td>' +
        '      <td>are my marbles?</td>' +
        '    </tr>' +
        '  </table>' +
        '</div>';

      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      // Chrome 72: "My name is Eli the weird. (QED) Where are my marbles?"
      // Safari 12.0: "My name is Eli the weird. (QED) Where are my marbles?"
      // Firefox 62: "Hello, My name is Eli the weird. (QED)"
      assert.equal(
        accessibleText(target),
        'My name is Eli the weird. (QED) Where are my marbles?'
      );
    });

    it('passes test 140', function () {
      fixture.innerHTML =
        '<style>' +
        '  .hidden { display: none; }' +
        '</style>' +
        '<input id="test" type="text" aria-labelledby="lblId" />' +
        '<div id="lblId" >' +
        '  <span aria-hidden="true"><i> Hello, </i></span>' +
        '  <span>My</span> name is' +
        '  <div><img src="file.jpg" title="Bryan" alt="" role="presentation" /></div>' +
        '  <span role="presentation" aria-label="Eli">' +
        '    <span aria-label="Garaventa">Zambino</span>' +
        '  </span>' +
        '  <span>the weird.</span>' +
        '  (QED)' +
        '  <span class="hidden"><i><b>and don\'t you forget it.</b></i></span>' +
        '  <table>' +
        '    <tr>' +
        '      <td>Where</td>' +
        '      <td style="visibility:hidden;"><div>in</div></td>' +
        '      <td><div style="display:none;">the world</div></td>' +
        '      <td>are my marbles?</td>' +
        '    </tr>' +
        '  </table>' +
        '</div>';

      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(
        accessibleText(target),
        'My name is Eli the weird. (QED) Where are my marbles?'
      );
    });

    // Disabling this, axe has a buggy implicitName computation
    //  shouldn't be a big deal
    xit('passes test 141', function () {
      fixture.innerHTML =
        '<style>' +
        '  .hidden { display: none; }' +
        '</style>' +
        '<input type="text" id="test" />' +
        '<label for="test" id="label">' +
        '  <span aria-hidden="true"><i> Hello, </i></span>' +
        '  <span>My</span> name is' +
        '  <div><img src="file.jpg" title="Bryan" alt="" role="presentation" /></div>' +
        '  <span role="presentation" aria-label="Eli">' +
        '    <span aria-label="Garaventa">Zambino</span>' +
        ' </span>' +
        ' <span>the weird.</span>' +
        ' (QED)' +
        ' <span class="hidden"><i><b>and don\'t you forget it.</b></i></span>' +
        ' <table>' +
        '   <tr>' +
        '     <td>Where</td>' +
        '     <td style="visibility:hidden;"><div>in</div></td>' +
        '     <td><div style="display:none;">the world</div></td>' +
        '     <td>are my marbles?</td>' +
        '  </tr>' +
        ' </table>' +
        '</label>';

      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(
        accessibleText(target),
        'My name is Eli the weird. (QED) Where are my marbles?'
      );
    });

    it('passes test 143', function () {
      fixture.innerHTML =
        '  <style>' +
        '    .hidden { display: none; }' +
        '  </style>' +
        '  <div>' +
        '    <input id="test" type="text" aria-labelledby="lbl1 lbl2" aria-describedby="descId" />' +
        '    <span>' +
        '      <span aria-hidden="true" id="lbl1">Important</span>' +
        '      <span class="hidden">' +
        '        <span aria-hidden="true" id="lbl2">stuff</span>' +
        '      </span>' +
        '    </span>' +
        '  </div>' +
        '  <div class="hidden">' +
        '    <div id="descId">' +
        '      <span aria-hidden="true"><i> Hello, </i></span>' +
        '      <span>My</span> name is' +
        '      <div><img src="file.jpg" title="Bryan" alt="" role="presentation" /></div>' +
        '      <span role="presentation" aria-label="Eli">' +
        '        <span aria-label="Garaventa">Zambino</span>' +
        '      </span>' +
        '      <span>the weird.</span>' +
        '      (QED)' +
        '      <span class="hidden"><i><b>and don\'t you forget it.</b></i></span>' +
        '      <table>' +
        '        <tr>' +
        '          <td>Where</td>' +
        '          <td style="visibility:hidden;"><div>in</div></td>' +
        '          <td><div style="display:none;">the world</div></td>' +
        '          <td>are my marbles?</td>' +
        '        </tr>' +
        '      </table>' +
        '    </div>' +
        '  </div>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'Important stuff');
    });

    it('passes test 144', function () {
      fixture.innerHTML =
        '<input id="test" role="combobox" type="text" title="Choose your language" value="English">';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'Choose your language');
    });

    it('passes test 145', function () {
      fixture.innerHTML =
        '<div id="test" role="combobox" tabindex="0" title="Choose your language.">' +
        '  <span> English </span>' +
        '</div>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'Choose your language.');
    });

    it('passes test 147', function () {
      fixture.innerHTML =
        '<input type="checkbox" id="test" />' +
        '<label for="test">Flash the screen ' +
        '  <ul role="listbox" style="list-style-type: none;">' +
        '    <li role="option" aria-selected="true">1</li>' +
        '    <li role="option">2</li>' +
        '    <li role="option">3</li>' +
        '  </ul>' +
        '  times.' +
        '</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'Flash the screen 1 times.');
    });

    pseudoText('passes test 148', function () {
      fixture.innerHTML =
        '<input type="checkbox" id="test" />' +
        '<label for="test">Flash the screen ' +
        '  <div role="textbox" contenteditable>1</div>' +
        '  times.' +
        '</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'Flash the screen 1 times.');
    });

    it('passes test 149', function () {
      fixture.innerHTML =
        '<label for="test">a test</label>' +
        '<label>This <input type="checkbox" id="test" /> is</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'a test This is');
    });

    it('passes test 150', function () {
      fixture.innerHTML =
        '<label>This <input type="checkbox" id="test" /> is</label>' +
        '<label for="test">a test</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'This is a test');
    });

    it('passes test 151', function () {
      fixture.innerHTML =
        '<input type="file" id="test" />' +
        '<label for="test">W<i>h<b>a</b></i>t<br>is<div>your<div>name<b>?</b></div></div></label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'What is your name?');
    });

    pseudoText('passes test 152', function () {
      fixture.innerHTML =
        '<style>' +
        '  label:before { content: "This"; display: block; }' +
        '  label:after { content: "."; }' +
        '</style>' +
        '<label for="test">is a test</label>' +
        '<input type="text" id="test"/>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'This is a test.');
    });

    it('passes test 153', function () {
      fixture.innerHTML =
        '<style>' +
        '  .hidden { display: none; }' +
        '</style>' +
        '<input type="file" id="test" />' +
        '<label for="test">' +
        '  <span class="hidden">1</span><span>2</span>' +
        '  <span style="visibility: hidden;">3</span><span>4</span>' +
        '  <span hidden>5</span><span>6</span>' +
        '  <span aria-hidden="true">7</span><span>8</span>' +
        '  <span aria-hidden="false" class="hidden">9</span><span>10</span>' +
        '</label>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), '2 4 6 8 10');
    });

    it('passes test 154', function () {
      fixture.innerHTML =
        '<input type="file" id="test" />' +
        '<label for="test">Flash <span aria-owns="id1">the screen</span> times.</label>' +
        '<div>' +
        '  <div id="id1" role="combobox" aria-owns="id2">' +
        '    <div role="textbox"></div>' +
        '  </div>' +
        '</div>' +
        '<div>' +
        '  <ul id="id2" role="listbox" style="list-style-type: none;">' +
        '    <li role="option" >1 </li>' +
        '    <li role="option" aria-selected="true">2 </li>' +
        '    <li role="option">3 </li>' +
        '  </ul>' +
        '</div>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'Flash the screen 2 times.');
    });

    it('passes test 155', function () {
      fixture.innerHTML =
        '<input type="file" id="test" />' +
        '<label for="test">Flash <span aria-owns="id1">the screen</span> times.</label>' +
        '<div id="id1">' +
        '  <div role="combobox">' +
        '    <div role="textbox"></div>' +
        '    <ul role="listbox" style="list-style-type: none;">' +
        '      <li role="option" aria-selected="true">1 </li>' +
        ' 	<li role="option">2 </li>' +
        ' 	<li role="option">3 </li>' +
        '    </ul>' +
        '  </div>' +
        '</div>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'Flash the screen 1 times.');
    });

    it('passes test 156', function () {
      fixture.innerHTML =
        '<style>' +
        '  .hidden { display: none; }' +
        '</style>' +
        '<div id="test" role="link" tabindex="0">' +
        '  <span aria-hidden="true"><i> Hello, </i></span>' +
        '  <span>My</span> name is' +
        '  <div><img src="file.jpg" title="Bryan" alt="" role="presentation" /></div>' +
        '  <span role="presentation" aria-label="Eli"><span aria-label="Garaventa">Zambino</span></span>' +
        '  <span>the weird.</span>' +
        '  (QED)' +
        '  <span class="hidden"><i><b>and don\'t you forget it.</b></i></span>' +
        '</div>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'My name is Eli the weird. (QED)');
    });

    it('passes test 158', function () {
      fixture.innerHTML =
        '<a id="test" href="#" aria-label="California"' +
        ' title="San Francisco">United States</a>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'California');
    });

    it('passes test 159', function () {
      fixture.innerHTML =
        '<h2 id="test">' +
        'Country of origin:' +
        '<input role="combobox" type="text" title="Choose your country." value="United States">' +
        '</h2>';
      axe.testUtils.flatTreeSetup(fixture);
      var target = fixture.querySelector('#test');
      assert.equal(accessibleText(target), 'Country of origin: United States');
    });

    /**
	// In case anyone even wants it, here's the script used to generate these test cases
	function getTestCase(content, index = 0) {
		const regex = new RegExp('if given\n([^]*)\nthen the accessible name of the element with id of "(.*)" is "(.*)"')
		const out = content.match(regex)
		if (!out || out.length !== 4) {
			return;
		}

		const [, html, id, expected] = out;
		const strings = html.split(/\n/g).map(
			line => `'${line.substr(2)}'`
		).join(' +\n      ') + ';'

		return `
		it('passes test ${index + 1}', function () {
			fixture.innerHTML = ${strings}
			axe.testUtils.flatTreeSetup(fixture);
			var target = fixture.querySelector('#${id}');
			assert.equal(accessibleText(target), '${expected}');
		});`
	}*/
  });
});
