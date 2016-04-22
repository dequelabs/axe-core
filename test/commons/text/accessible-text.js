describe('text.accessibleText', function() {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('should match the first example from the ARIA spec', function() {
		fixture.innerHTML = '<ul role="menubar">' +
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
		var rule2a = fixture.querySelector('#rule2a');
		var rule2c = fixture.querySelector('#rule2c');
		assert.equal(axe.commons.text.accessibleText(rule2a), 'File');
		assert.equal(axe.commons.text.accessibleText(rule2c), 'New');

	});

	it('should match the second example from the ARIA spec', function() {
		fixture.innerHTML = '<fieldset>' +
			'  <legend>Meeting alarms</legend>' +
			'  <!-- Rule 2A: "Beep" label given by native HTML label element -->' +
			'  <input type="checkbox" id="beep"> <label for="beep">Beep</label> <br>' +
			'  <input type="checkbox" id="mtgTitle"> <label for="mtgTitle">Display the meeting title</label> <br>' +
			'  <!-- Rule 2B -->' +
			'  <input type="checkbox" id="flash">' +
			'  <label for="flash">' +
			'    Flash the screen' +
			'    <!-- Rule 2A: label of text input given by aria-label, "Number of times to flash screen" -->' +
			'    <input type="text" value="3" size="2" id="numTimes" aria-label="Number of times to flash screen">' +
			'    times' +
			'  </label>' +
			'</fieldset>';

		var rule2a = fixture.querySelector('#beep');
		var rule2b = fixture.querySelector('#flash');
		assert.equal(axe.commons.text.accessibleText(rule2a), 'Beep');
		assert.equal(axe.commons.text.accessibleText(rule2b), 'Flash the screen 3 times');
	});


	it('should use aria-labelledby if present', function() {
		fixture.innerHTML = '<div id="t2label">This is <input type="text" value="the value" ' +
			'aria-labelledby="t1label" aria-label="ARIA Label" id="t1"> of <i>everything</i></div>' +
			'<div id="t1label">This is a <b>label</b></div>' +
			'<label for="t1">HTML Label</label>' +
			'<input type="text" id="t2" aria-labelledby="t2label">';

		var target = fixture.querySelector('#t1');
		assert.equal(axe.commons.text.accessibleText(target), 'This is a label');
	});

	it('should use recusive aria-labelledby properly', function() {
		fixture.innerHTML = '<div id="t2label">This is <input type="text" value="the value" ' +
			'aria-labelledby="t1 t1label" aria-label="ARIA Label" id="t1"> of <i>everything</i></div>' +
			'<div id="t1label">This is a <b>label</b></div>' +
			'<label for="t1">HTML Label</label>' +
			'<input type="text" id="t2" aria-labelledby="t2label">';

		var target = fixture.querySelector('#t1');
		assert.equal(axe.commons.text.accessibleText(target), 'ARIA Label This is a label');
	});

	it('should include hidden text referred to with aria-labelledby', function () {
		fixture.innerHTML = '<div id="t1label" style="display:none">This is a ' +
			'<span style="visibility:hidden">hidden </span>' +
			'<span aria-hidden="true">secret</span></div>'+
			'<label for="t1">HTML Label</label>' +
			'<input type="text" id="t1" aria-labelledby="t1label">';

		var target = fixture.querySelector('#t1');
 		assert.equal(axe.commons.text.accessibleText(target), 'This is a hidden secret');
	});

	it('should allow setting the initial inLabelledbyContext value', function () {
		fixture.innerHTML = '<label id="lbl1" style="display:none;">hidden label</label>';

		var target = fixture.querySelector('#lbl1');
 		assert.equal(axe.commons.text.accessibleText(target, false), '');
 		assert.equal(axe.commons.text.accessibleText(target, true), 'hidden label');
	});

	it('should use aria-label if present with no labelledby', function() {
		fixture.innerHTML = '<div id="t2label">This is <input type="text" value="the value" ' +
			'aria-label="ARIA Label" id="t1"> of <i>everything</i></div>' +
			'<div id="t1label">This is a <b>label</b></div>' +
			'<label for="t1">HTML Label</label>' +
			'<input type="text" id="t2" aria-labelledby="t2label">';

		var target = fixture.querySelector('#t1');
		assert.equal(axe.commons.text.accessibleText(target), 'ARIA Label');
	});

	it('should use alt on imgs with no ARIA', function() {
		fixture.innerHTML = '<div id="t2label">This is <input type="text" value="the value" ' +
			'id="t1"> of <i>everything</i></div>' +
			'<img alt="Alt text goes here" id="target">' +
			'<div id="t1label">This is a <b>label</b></div>' +
			'<label for="t1">HTML Label</label>' +
			'<input type="text" id="t2" aria-labelledby="t2label">';

		var target = fixture.querySelector('#target');
		assert.equal(axe.commons.text.accessibleText(target), 'Alt text goes here');
	});

	it('should use alt on image inputs with no ARIA', function() {
		fixture.innerHTML = '<div id="t2label">This is <input type="text" value="the value" ' +
			'id="t1"> of <i>everything</i></div>' +
			'<input type="image" alt="Alt text goes here" id="target">' +
			'<div id="t1label">This is a <b>label</b></div>' +
			'<label for="t1">HTML Label</label>' +
			'<input type="text" id="t2" aria-labelledby="t2label">';

		var target = fixture.querySelector('#target');
		assert.equal(axe.commons.text.accessibleText(target), 'Alt text goes here');
	});

	it('should use not use alt on text inputs with no ARIA', function() {
		fixture.innerHTML = '<div id="t2label">This is <input type="text" value="the value" ' +
			'id="t1"> of <i>everything</i></div>' +
			'<input type="text" alt="Alt text goes here" id="target">' +
			'<div id="t1label">This is a <b>label</b></div>' +
			'<label for="t1">HTML Label</label>' +
			'<input type="text" id="t2" aria-labelledby="t2label">';

		var target = fixture.querySelector('#target');
		assert.equal(axe.commons.text.accessibleText(target), '');
	});

	it('should use HTML label if no ARIA information', function() {
		fixture.innerHTML = '<div id="t2label">This is <input type="text" value="the value" ' +
			'id="t1"> of <i>everything</i></div>' +
			'<div id="t1label">This is a <b>label</b></div>' +
			'<label for="t1">HTML Label</label>' +
			'<input type="text" id="t2" aria-labelledby="t2label">';

		var target = fixture.querySelector('#t1');
		assert.equal(axe.commons.text.accessibleText(target), 'HTML Label');
	});

	it('should handle last ditch title attribute', function() {
		fixture.innerHTML = '<div id="t2label">This is <input type="text" value="the value" ' +
			'aria-labelledby="t1label" aria-label="ARIA Label" id="t1"> of <i title="italics"></i></div>' +
			'<div id="t1label">This is a <b>label</b></div>' +
			'<label for="t1">HTML Label</label>' +
			'<input type="text" id="t2" aria-labelledby="t2label">';

		var target = fixture.querySelector('#t2label');
		assert.equal(axe.commons.text.accessibleText(target), 'This is This is a label of italics');
	});

	it('should handle totally empty elements', function() {
		fixture.innerHTML = '<div id="t2label">This is <input type="text" value="the value" ' +
			'aria-labelledby="t1label" aria-label="ARIA Label" id="t1"> of <i></i></div>' +
			'<div id="t1label">This is a <b>label</b></div>' +
			'<label for="t1">HTML Label</label>' +
			'<input type="text" id="t2" aria-labelledby="t2label">';

		var target = fixture.querySelector('#t2label');
		assert.equal(axe.commons.text.accessibleText(target), 'This is This is a label of');
	});


	it('should handle author name-from roles properly', function() {
		fixture.innerHTML = '<div id="t2label">This is <input type="text" value="the value" ' +
			'aria-labelledby="t1label" aria-label="ARIA Label" id="t1"> of <i role="alert">everything</i></div>' +
			'<div id="t1label">This is a <b>label</b></div>' +
			'<label for="t1">HTML Label</label>' +
			'<input type="text" id="t2" aria-labelledby="t2label">';

		var target = fixture.querySelector('#t2label');
		assert.equal(axe.commons.text.accessibleText(target), 'This is This is a label of');
	});

	it('should only show each node once when label is before input', function() {
		fixture.innerHTML = '<div id="target"><label for="tb1">My form input</label>' +
			'<input type="text" id="tb1"></div>';
		var target = fixture.querySelector('#target');
		assert.equal(axe.commons.text.accessibleText(target), 'My form input');
	});

	it('should only show each node once when label follows input', function() {
		fixture.innerHTML = '<div id="target">' +
			'<input type="text" id="tb1"></div>' +
			'<label for="tb1">My form input</label>';
		var target = fixture.querySelector('#target');
		assert.equal(axe.commons.text.accessibleText(target), 'My form input');
	});

	it('should handle nested inputs in normal context', function() {
		fixture.innerHTML = '<div id="t2label">This is <input type="text" value="the value" ' +
			'aria-labelledby="t1label" aria-label="ARIA Label" id="t1"> of <i>everything</i></div>' +
			'<div id="t1label">This is a <b>label</b></div>' +
			'<label for="t1">HTML Label</label>' +
			'<input type="text" id="t2" aria-labelledby="t2label">';

		var target = fixture.querySelector('#t2label');
		assert.equal(axe.commons.text.accessibleText(target), 'This is This is a label of everything');
	});

	it('should use handle nested inputs properly in labelledby context', function() {
		fixture.innerHTML = '<div id="t2label">This is <input type="text" value="the value" ' +
			'aria-labelledby="t1label" aria-label="ARIA Label" id="t1"> of <i>everything</i></div>' +
			'<div id="t1label">This is a <b>label</b></div>' +
			'<label for="t1">HTML Label</label>' +
			'<input type="text" id="t2" aria-labelledby="t2label">';

		var target = fixture.querySelector('#t2');
		assert.equal(axe.commons.text.accessibleText(target), 'This is the value of everything');
	});

	it('should use ignore hidden inputs', function() {
		fixture.innerHTML = '<div id="t2label">This is <input type="hidden" value="the value" ' +
			'Label" id="t1"> of <i>everything</i></div>' +
			'<div id="t1label">This is a <b>label</b></div>' +
			'<label for="t1">HTML Label</label>' +
			'<input type="text" id="t2" aria-labelledby="t2label">';

		var target = fixture.querySelector('#t2');
		assert.equal(axe.commons.text.accessibleText(target), 'This is of everything');
	});

	it('should use handle inputs with no type as if they were text inputs', function() {
		fixture.innerHTML = '<div id="t2label">This is <input value="the value" ' +
			'aria-labelledby="t1label" aria-label="ARIA Label" id="t1"> of <i>everything</i></div>' +
			'<div id="t1label">This is a <b>label</b></div>' +
			'<label for="t1">HTML Label</label>' +
			'<input type="text" id="t2" aria-labelledby="t2label">';

		var target = fixture.querySelector('#t2');
		assert.equal(axe.commons.text.accessibleText(target), 'This is the value of everything');
	});

	it('should use handle nested selects properly in labelledby context', function() {
		fixture.innerHTML = '<div id="t2label">This is <select multiple ' +
			'aria-labelledby="t1label" aria-label="ARIA Label" id="t1">' +
			'<option selected>first</option><option>second</option><option selected>third</option>' +
			'</select> of <i>everything</i></div>' +
			'<div id="t1label">This is a <b>label</b></div>' +
			'<label for="t1">HTML Label</label>' +
			'<input type="text" id="t2" aria-labelledby="t2label">';

		var target = fixture.querySelector('#t2');
		assert.equal(axe.commons.text.accessibleText(target), 'This is first third of everything');
	});

	it('should use handle nested textareas properly in labelledby context', function() {
		fixture.innerHTML = '<div id="t2label">This is <textarea ' +
			'aria-labelledby="t1label" aria-label="ARIA Label" id="t1">the value</textarea> of <i>everything</i></div>' +
			'<div id="t1label">This is a <b>label</b></div>' +
			'<label for="t1">HTML Label</label>' +
			'<input type="text" id="t2" aria-labelledby="t2label">';

		var target = fixture.querySelector('#t2');
		assert.equal(axe.commons.text.accessibleText(target), 'This is the value of everything');
	});

	it('should use handle ARIA labels properly in labelledby context', function() {
		fixture.innerHTML = '<div id="t2label">This <span aria-label="not a span">span</span>' +
			' is <input type="text" value="the value" ' +
			'aria-labelledby="t1label" aria-label="ARIA Label" id="t1"> of <i>everything</i></div>' +
			'<div id="t1label">This is a <b>label</b></div>' +
			'<label for="t1">HTML Label</label>' +
			'<input type="text" id="t2" aria-labelledby="t2label">';

		var target = fixture.querySelector('#t2');
		assert.equal(axe.commons.text.accessibleText(target), 'This not a span is the value of everything');
	});

	it('shoud properly fall back to title', function() {
		fixture.innerHTML = '<a href="#" role="presentation" title="Hello"></a>';
		var target = fixture.querySelector('a');
		assert.equal(axe.commons.text.accessibleText(target), 'Hello');
	});

	it('should give text even for role=presentation on anchors', function() {
		fixture.innerHTML = '<a href="#" role="presentation">Hello</a>';
		var target = fixture.querySelector('a');
		assert.equal(axe.commons.text.accessibleText(target), 'Hello');
	});

	it('should give text even for role=presentation on buttons', function() {
		fixture.innerHTML = '<button role="presentation">Hello</button>';
		var target = fixture.querySelector('button');
		assert.equal(axe.commons.text.accessibleText(target), 'Hello');
	});

	it('should give text even for role=presentation on summary', function() {
		fixture.innerHTML = '<summary role="presentation">Hello</summary>';
		var target = fixture.querySelector('summary');
		assert.equal(axe.commons.text.accessibleText(target), 'Hello');
	});

	it('shoud properly fall back to title', function() {
		fixture.innerHTML = '<a href="#" role="none" title="Hello"></a>';
		var target = fixture.querySelector('a');
		assert.equal(axe.commons.text.accessibleText(target), 'Hello');
	});

	it('should give text even for role=none on anchors', function() {
		fixture.innerHTML = '<a href="#" role="none">Hello</a>';
		var target = fixture.querySelector('a');
		assert.equal(axe.commons.text.accessibleText(target), 'Hello');
	});

	it('should give text even for role=none on buttons', function() {
		fixture.innerHTML = '<button role="none">Hello</button>';
		var target = fixture.querySelector('button');
		assert.equal(axe.commons.text.accessibleText(target), 'Hello');
	});

	it('should give text even for role=none on summary', function() {
		fixture.innerHTML = '<summary role="none">Hello</summary>';
		var target = fixture.querySelector('summary');
		assert.equal(axe.commons.text.accessibleText(target), 'Hello');
	});

	it('should not add extra spaces around phrasing elements', function() {
		fixture.innerHTML = '<a href="#">Hello<span>World</span></a>';
		var target = fixture.querySelector('a');
		assert.equal(axe.commons.text.accessibleText(target), 'HelloWorld');
	});

	it('should add spaces around non-phrasing elements', function() {
		fixture.innerHTML = '<a href="#">Hello<div>World</div></a>';
		var target = fixture.querySelector('a');
		assert.equal(axe.commons.text.accessibleText(target), 'Hello World');
	});

	it('should not look at scripts', function() {
		fixture.innerHTML = '<a href="#"><script> var ajiasdf = true; </script></a>';
		var target = fixture.querySelector('a');
		assert.equal(axe.commons.text.accessibleText(target), '');
	});

	it('should use <label> for input buttons', function() {
		fixture.innerHTML = '<label><input type="button"></label>';
		var target = fixture.querySelector('input');
		assert.equal(axe.commons.text.accessibleText(target), '');
	});

	describe('figure', function() {

		it('shoud check aria-labelledby', function() {
			fixture.innerHTML = '<div id="t1">Hello</div>' +
				'<figure aria-labelledby="t1">Not part of a11yName <figcaption>Fail</figcaption></figure>';
			var target = fixture.querySelector('figure');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello');
		});

		it('shoud check aria-label', function() {
			fixture.innerHTML = '<figure aria-label="Hello">Not part of a11yName <figcaption>Fail</figcaption></figure>';
			var target = fixture.querySelector('figure');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello');
		});

		it('shoud check the figures figcaption', function() {
			fixture.innerHTML = '<figure>Not part of a11yName <figcaption>Hello</figcaption></figure>';
			var target = fixture.querySelector('figure');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello');
		});

		it('shoud check title on figure', function() {
			fixture.innerHTML = '<figure title="Hello">Not part of a11yName <figcaption></figcaption></figure>';
			var target = fixture.querySelector('figure');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello');
		});

		it('should not visit innerText of figure', function() {
			fixture.innerHTML = '<figure>Hello<figcaption></figcaption></figure>';
			var target = fixture.querySelector('figure');
			assert.equal(axe.commons.text.accessibleText(target), '');
		});
	});

	describe('img', function() {
		it('should work with aria-labelledby attribute', function() {
			fixture.innerHTML = '<div id="t1">Hello</div><div id="t2">World</div>' +
				'<img aria-labelledby="t1 t2">';

			var target = fixture.querySelector('img');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello World');
		});

		it('should work with aria-label attribute', function() {
			fixture.innerHTML = '<img aria-label="Hello World">';

			var target = fixture.querySelector('img');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello World');
		});

		it('should work with alt attribute', function() {
			fixture.innerHTML = '<img alt="Hello World">';

			var target = fixture.querySelector('img');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello World');
		});

		it('should work with title attribute', function() {
			fixture.innerHTML = '<img title="Hello World">';

			var target = fixture.querySelector('img');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello World');
		});
	});

	describe('input buttons', function() {
		it('should find value for input type=button', function() {
			fixture.innerHTML = '<input type="button" value="Hello">';
			var target = fixture.querySelector('input');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello');
		});

		it('should find value for input type=reset', function() {
			fixture.innerHTML = '<input type="reset" value="Hello">';
			var target = fixture.querySelector('input');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello');
		});

		it('should find value for input type=submit', function() {
			fixture.innerHTML = '<input type="submit" value="Hello">';
			var target = fixture.querySelector('input');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello');
		});

		it('should provide a default value for input type="submit"', function() {
			fixture.innerHTML = '<input type="submit">';
			var target = fixture.querySelector('input');
			// IE inserts this for us, thanks!
			assert.equal(axe.commons.text.accessibleText(target), target.value || 'Submit');
		});

		it('should provide a default value for input type="reset"', function() {
			fixture.innerHTML = '<input type="reset">';
			var target = fixture.querySelector('input');
			var defaultText = axe.commons.text.accessibleText(target);
			assert.isString(defaultText);
			assert.notEqual(defaultText.trim(), '');
		});

		it('should find title for input type=button', function() {
			fixture.innerHTML = '<input type="button" title="Hello">';
			var target = fixture.querySelector('input');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello');
		});

		it('should find title for input type=reset', function() {
			fixture.innerHTML = '<input type="reset" title="Hello">';
			var target = fixture.querySelector('input');
			// IE does not use title; but will use default value instead
			assert.equal(axe.commons.text.accessibleText(target), target.value || 'Hello');
		});

		it('should find title for input type=submit', function() {
			fixture.innerHTML = '<input type="submit" title="Hello">';
			var target = fixture.querySelector('input');
			// Again, default value takes precedence over title
			assert.equal(axe.commons.text.accessibleText(target), target.value || 'Hello');
		});
	});

	describe('tables', function() {
		it('should work with aria-labelledby', function() {
			fixture.innerHTML = '<div id="t1">Hello</div><div id="t2">World</div>' +
				'<table aria-labelledby="t1 t2"></table>';

			var target = fixture.querySelector('table');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello World');
		});

		it('should work with aria-label', function() {
			fixture.innerHTML = '<table aria-label="Hello World"></table>';

			var target = fixture.querySelector('table');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello World');
		});

		it('should work with the caption element', function() {
			fixture.innerHTML = '<table><caption>Hello World</caption><tr><td>Stuff</td></tr></table>';

			var target = fixture.querySelector('table');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello World');
		});

		it('should work with the title attribute', function() {
			fixture.innerHTML = '<table title="Hello World"></table>';

			var target = fixture.querySelector('table');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello World');
		});

		it('should work with the summary attribute', function() {
			fixture.innerHTML = '<table summary="Hello World"></table>';

			var target = fixture.querySelector('table');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello World');
		});

		it('should prefer title attribute over summary attribute', function() {
			fixture.innerHTML = '<table title="Hello World" summary="FAIL"></table>';

			var target = fixture.querySelector('table');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello World');
		});
	});


	describe('text inputs', function() {
		var types = ['text', 'password', 'search', 'tel', 'email', 'url', null];

		it('should find aria-labelledby', function() {
			types.forEach(function(type) {
				var t = type ? ' type="' + type + '"' : '';
				fixture.innerHTML = '<div id="t1">Hello</div><div id="t2">World</div>' +
					'<input' + t + ' aria-labelledby="t1 t2">';

				var target = fixture.querySelector('input');
				assert.equal(axe.commons.text.accessibleText(target), 'Hello World', type);
			});
		});

		it('should find aria-label', function() {
			types.forEach(function(type) {
				var t = type ? ' type="' + type + '"' : '';
				fixture.innerHTML = '<input' + t + ' aria-label="Hello World">';

				var target = fixture.querySelector('input');
				assert.equal(axe.commons.text.accessibleText(target), 'Hello World', type);
			});
		});

		it('should find an implicit label', function() {
			types.forEach(function(type) {
				var t = type ? ' type="' + type + '"' : '';
				fixture.innerHTML = '<label for="t1">Hello World' +
					'<input' + t + '></label>';

				var target = fixture.querySelector('input');
				assert.equal(axe.commons.text.accessibleText(target), 'Hello World', type);
			});
		});

		it('should find an explicit label', function() {
			types.forEach(function(type) {
				var t = type ? ' type="' + type + '"' : '';
				fixture.innerHTML = '<label for="t1">Hello World</label>' +
					'<input' + t + ' id="t1">';

				var target = fixture.querySelector('input');
				assert.equal(axe.commons.text.accessibleText(target), 'Hello World', type);
			});
		});

		// not implemented yet, doesn't work accross ATs
		it.skip('should find a placeholder attribute', function() {
			types.forEach(function(type) {
				var t = type ? ' type="' + type + '"' : '';
				fixture.innerHTML = '<input' + t + ' placeholder="Hello World">';

				var target = fixture.querySelector('input');
				assert.equal(axe.commons.text.accessibleText(target), 'Hello World', type);
			});
		});

		it('should find a title attribute', function() {
			types.forEach(function(type) {
				var t = type ? ' type="' + type + '"' : '';
				fixture.innerHTML = '<input' + t + ' title="Hello World">';

				var target = fixture.querySelector('input');
				assert.equal(axe.commons.text.accessibleText(target), 'Hello World', type);
			});
		});

		it('should otherwise be empty string', function() {
			types.forEach(function(type) {
				var t = type ? ' type="' + type + '"' : '';
				fixture.innerHTML = '<input' + t + '>';

				var target = fixture.querySelector('input');
				assert.equal(axe.commons.text.accessibleText(target), '');
			});
		});
	});

	describe('textarea', function() {

		it('should find aria-labelledby', function() {
			fixture.innerHTML = '<div id="t1">Hello</div><div id="t2">World</div>' +
				'<textarea aria-labelledby="t1 t2"></textarea>';

			var target = fixture.querySelector('textarea');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello World');
		});

		it('should find aria-label', function() {
			fixture.innerHTML = '<textarea aria-label="Hello World"></textarea>';

			var target = fixture.querySelector('textarea');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello World');
		});

		it('should find an implicit label', function() {
			fixture.innerHTML = '<label for="t1">Hello World' +
				'<textarea></textarea></label>';

			var target = fixture.querySelector('textarea');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello World');
		});

		it('should find an explicit label', function() {
			fixture.innerHTML = '<label for="t1">Hello World</label>' +
				'<textarea id="t1"></textarea>';

			var target = fixture.querySelector('textarea');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello World');
		});

		// not implemented yet, doesn't work accross ATs
		it.skip('should find a placeholder attribute', function() {
			fixture.innerHTML = '<textarea placeholder="Hello World"></textarea>';

			var target = fixture.querySelector('textarea');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello World');
		});

		it('should find a title attribute', function() {
			fixture.innerHTML = '<textarea title="Hello World"></textarea>';

			var target = fixture.querySelector('textarea');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello World');
		});

		it('should otherwise be empty string', function() {
			fixture.innerHTML = '<textarea></textarea>';

			var target = fixture.querySelector('textarea');
			assert.equal(axe.commons.text.accessibleText(target), '');
		});
	});

	describe('image inputs', function() {

		it('should find aria-labelledby', function() {
			fixture.innerHTML = '<div id="t1">Hello</div><div id="t2">World</div>' +
				'<input type="image" aria-labelledby="t1 t2">';

			var target = fixture.querySelector('input');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello World');
		});

		it('should find aria-label', function() {
			fixture.innerHTML = '<input type="image" aria-label="Hello World">';

			var target = fixture.querySelector('input');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello World');
		});

		it('should find an alt attribute', function() {
			fixture.innerHTML = '<input type="image" alt="Hello World">';

			var target = fixture.querySelector('input');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello World');
		});

		// doesn't work consistently across ATs yet
		it.skip('should find a value attribute', function() {
			fixture.innerHTML = '<input type="image" value="Hello World">';

			var target = fixture.querySelector('input');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello World');
		});

		it('should find a title attribute', function() {
			fixture.innerHTML = '<input type="image" title="Hello World">';

			var target = fixture.querySelector('input');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello World');
		});

		it('should otherwise be empty string', function() {
			fixture.innerHTML = '<input type="image">';

			var target = fixture.querySelector('input');
			assert.equal(axe.commons.text.accessibleText(target), '');
		});
	});

	describe('a', function() {
		it('should find aria-labelledby', function() {
			fixture.innerHTML = '<div id="t1">Hello</div><div id="t2">World</div>' +
				'<a aria-labelledby="t1 t2"></a>';

			var target = fixture.querySelector('a');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello World');
		});

		it('should find aria-label', function() {
			fixture.innerHTML = '<a aria-label="Hello World"></a>';

			var target = fixture.querySelector('a');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello World');
		});

		it('should check subtree', function() {
			fixture.innerHTML = '<a><span>Hello<span> World</span></span></a>';

			var target = fixture.querySelector('a');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello World');
		});

		it('should find a title attribute', function() {
			fixture.innerHTML = '<a title="Hello World"></a>';

			var target = fixture.querySelector('a');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello World');
		});

		it('should otherwise be empty string', function() {
			fixture.innerHTML = '<a></a>';

			var target = fixture.querySelector('a');
			assert.equal(axe.commons.text.accessibleText(target), '');
		});
	});

	describe('button', function() {
		it('should find aria-labelledby', function() {
			fixture.innerHTML = '<div id="t1">Hello</div><div id="t2">World</div>' +
				'<button aria-labelledby="t1 t2"></button>';

			var target = fixture.querySelector('button');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello World');
		});

		it('should find aria-label', function() {
			fixture.innerHTML = '<button aria-label="Hello World"></button>';

			var target = fixture.querySelector('button');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello World');
		});

		it('should check subtree', function() {
			fixture.innerHTML = '<button><span>Hello<span> World</span></span></button>';

			var target = fixture.querySelector('button');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello World');
		});

		it('should find a title attribute', function() {
			fixture.innerHTML = '<button title="Hello World"></button>';

			var target = fixture.querySelector('button');
			assert.equal(axe.commons.text.accessibleText(target), 'Hello World');
		});

		it('should otherwise be empty string', function() {
			fixture.innerHTML = '<button></button>';

			var target = fixture.querySelector('button');
			assert.equal(axe.commons.text.accessibleText(target), '');
		});
	});

	describe('text level semantics', function() {
		var tags = ['em', 'strong', 'small', 's', 'cite', 'q', 'dfn', 'abbr', 'time', 'code', 'var', 'samp', 'kbd',
			'sub', 'sup', 'i', 'b', 'u', 'mark', 'ruby', 'rt', 'rp', 'bdi', 'bdo', 'br', 'wbr'
		];

		it('should find aria-labelledby', function() {
			tags.forEach(function(tag) {
				fixture.innerHTML = '<div id="t1">Hello</div><div id="t2">World</div>';
				var target = document.createElement(tag);
				target.setAttribute('aria-labelledby', 't1 t2');
				target.style.display = 'inline'; // Firefox hides some of these elements because reasons...
				fixture.appendChild(target);

				var result = axe.commons.text.accessibleText(target);
				assert.equal(result, 'Hello World', tag);
			});
		});

		it('should find aria-label', function() {
			tags.forEach(function(tag) {
				var target = document.createElement(tag);
				target.setAttribute('aria-label', 'Hello World');
				target.style.display = 'inline'; // Firefox hack, see above
				fixture.appendChild(target);

				var result = axe.commons.text.accessibleText(target);
				assert.equal(result, 'Hello World', tag);
			});
		});

		it('should find a title attribute', function() {
			tags.forEach(function(tag) {
				var target = document.createElement(tag);
				target.setAttribute('title', 'Hello World');
				target.style.display = 'inline'; // Firefox hack, see above
				fixture.appendChild(target);

				var result = axe.commons.text.accessibleText(target);
				assert.equal(result, 'Hello World', tag);
			});
		});

		it('should otherwise be empty string', function() {
			tags.forEach(function(tag) {
				fixture.innerHTML = '<' + tag + '></' + tag + '>';

				var target = fixture.querySelector(tag);
				assert.equal(axe.commons.text.accessibleText(target), '');
			});
		});
	});


});
