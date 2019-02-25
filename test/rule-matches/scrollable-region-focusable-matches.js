describe('scrollable-region-focusable-matches', function() {
	'use strict';
	// TODO: Write tests

	var fixture = document.getElementById('fixture');
	var rule = axe._audit.rules.find(function(rule) {
		return rule.id === 'scrollable-region-focusable';
	});

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('is a function', function() {
		assert.isFunction(rule.matches);
	});

	// it('returns false when element is not scrollable', function () {
	// 	fixture.innerHTML = '<section>This is short content & not scrollable</section>'
	// })
});

// TODO: tests

// <div id=1 style="height: 200px; width: 200px; overflow: auto">
//   <div style="height: 2000px; width: 100px; background-color: pink;">
//     <p>
//       Temp
//     </p>
//   </div>
// </div>

// <div id=4 style="height: 200px; width: 200px; overflow: hidden">
//   <div style="height: 2000px; width: 100px; background-color: pink;">
//     <p>
//       Temp
//     </p>
//   </div>
// </div>

// <div id=2 style="height: 200px; width: 200px; overflow: auto">
//   <div style="height: 10px; width: 2000px; background-color: red;">
//     <p>
//       Temp
//     </p>
//   </div>
// </div>

// <div id=3 style="height: 200px; width: 200px;">
// </div>
