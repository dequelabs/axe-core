/*global tests */
(function () {
	'use strict';


	var deepEqual = function (x, y) {
	  if ((typeof x === 'object' && x !== null) && (typeof y === 'object' && y !== null)) {
	    if (Object.keys(x).length !== Object.keys(y).length) {
	      return false;
	    }

	    for (var prop in x) {
	      if (y.hasOwnProperty(prop)) {
	        if (! deepEqual(x[prop], y[prop])){
	          return false;
	        }
	      }
	      else {
	        return false;
	      }
	    }

	    return true;
	  } else if (x !== y) {
	    return false;
	  } else {
	    return true;
	  }
	};

	function flattenResult(results) {
		return {
			passes: results.passes[0],
			violations: results.violations[0]
		};
	}

	function waitForFrames(context, cb) {
		function loadListener() {
			loaded++;
			if (loaded === length) {
				cb();
			}
		}
		var loaded = 0;
		var frames = context.querySelectorAll('iframe');
		if (!frames.length) {
			return cb();
		}
		for (var index = 0, length = frames.length; index < length; index++) {
			frames[index].addEventListener('load', loadListener);
		}
	}

	var fixture = document.getElementById('fixture');
	Object.keys(tests).forEach(function (ruleId) {
		describe(ruleId, function () {
			tests[ruleId].forEach(function (test) {
				describe(test.description, function () {

					function runTest(test, collection) {
						if (!test[collection]) {
							return;
						}

						describe(collection, function () {
							var nodes;
							before(function () {
								if (typeof results[collection] === 'object') {
									nodes = results[collection].nodes;
								}
							});

							test[collection]
							.forEach(function (selector) {
								it('should find ' + JSON.stringify(selector), function () {
									if (!nodes) {
										assert(false, 'there are no ' + collection);
										return;
									}

									var matches = nodes.filter(function (node) {
										return deepEqual(node.target, selector);
									});
									matches.forEach(function (node) {
										// remove each node we find
										nodes.splice(nodes.indexOf(node), 1);
									});

									if (matches.length === 0) {
										assert(false, 'Element not found');

									} else if (matches.length === 1) {
										assert(true, 'Element found');

									} else {
										assert(false, 'Found ' + matches.length + ' elements which match the target');
									}
								});
							});

							it('should not return other results', function () {
								if (typeof nodes !== 'undefined') {
									// check that all nodes are removed
									assert.deepEqual(nodes, []);
								} else {
									assert(false, 'there are no ' + collection);
								}
							});
						});
					}

					var results;
					before(function (done) {
						fixture.innerHTML = test.content;
						waitForFrames(fixture, function () {
							axe.a11yCheck(fixture, { runOnly: { type: 'rule', values: [ruleId]}}, function (r) {
								results = flattenResult(r);
								done();
							});

						});
					});
					runTest(test, 'passes');
					runTest(test, 'violations');
				});
			});
		});
	});

}());
