/*global runRules */
describe('axe.a11yCheck', function () {
	'use strict';

	describe('reporter', function () {

		it('should throw if no audit is configured', function () {
			axe._audit = null;

			assert.throws(function () {
				axe.a11yCheck(document, {});
			}, Error, /^No audit configured/);
		});

		it('should allow for option-less invocation', function (done) {

			axe._load({ reporter: function (r, c) {
				c(r);
			}});
			axe.a11yCheck(document, function (result) {
				assert.isArray(result);
				assert.lengthOf(result, 0);
				done();
			});
		});

		it('should use specified reporter via options - anon function', function (done) {

			axe._load({
				reporter: function () {
					assert.fail('should not be called');
				}
			});
			axe.a11yCheck(document, { reporter: function (result) {
				assert.isArray(result);
				assert.lengthOf(result, 0);
				done();
			}});
		});

		it('should use specified reporter via options by name', function (done) {

			var orig = window.reporters;
			axe._load({
				reporter: function () {
					assert.fail('should not be called');
				}
			});
			axe.reporter('foo', function (result) {
				assert.isArray(result);
				assert.lengthOf(result, 0);
				window.reporters = orig;
				done();
			});
			axe.a11yCheck(document, { reporter: 'foo' });
		});

		it('should check configured reporter', function (done) {

			axe._load({
				reporter: function (result) {
					assert.isArray(result);
					assert.lengthOf(result, 0);
					done();
				}
			});
			axe.a11yCheck(document, null);
		});

		it('fallback to default configured reporter', function (done) {
			var orig = window.defaultReporter;
			window.defaultReporter = function (result) {
				assert.isArray(result);
				assert.lengthOf(result, 0);
				done();
			};

			axe._load({});
			axe.a11yCheck(document, null);
			window.defaultReporter = orig;
		});
	});
});
describe('runRules', function () {
	'use strict';

	function iframeReady(src, context, id, cb) {
		var i = document.createElement('iframe');
		i.addEventListener('load', function () {
			cb();
		});
		i.src = src;
		i.id = id;
		context.appendChild(i);
	}

	function createFrames(callback) {
		var frame, num = 2,
			loaded = 0;

		function onLoad() {
			loaded++;
			if (loaded >= (num)) {
				callback();
			}
		}

		frame = document.createElement('iframe');
		frame.src = '../mock/frames/frame-frame.html';

		frame.addEventListener('load', onLoad);
		fixture.appendChild(frame);

		frame = document.createElement('iframe');
		frame.src = '../mock/frames/nocode.html';
		frame.addEventListener('load', onLoad);
		fixture.appendChild(frame);
	}

	var fixture = document.getElementById('fixture');

	var isNotCalled;
	beforeEach(function () {
		isNotCalled = function () {
			assert.ok(false, 'Reject should not be called');
		};
	});

	afterEach(function () {
		fixture.innerHTML = '';
		axe._audit = null;
	});

	it('should work', function (done) {
		axe._load({ rules: [{
			id: 'html',
			selector: 'html',
			any: ['html']
		}], checks: [{
			id: 'html',
			evaluate: function () {
				return true;
			}
		}], messages: {}});


		var frame = document.createElement('iframe');
		frame.src = '../mock/frames/frame-frame.html';

		frame.addEventListener('load', function () {
			setTimeout(function () {
				runRules(document, {}, function (r) {
					assert.lengthOf(r[0].passes, 3);
					done();
				}, isNotCalled);
			}, 500);
		});
		fixture.appendChild(frame);
	});

	it('should properly order iframes', function (done) {
		axe._load({ rules: [{
			id: 'iframe',
			selector: 'iframe',
			any: ['iframe']
		}], checks:[{
			id: 'iframe',
			evaluate: function () {
				return true;
			}
		}], messages: {}});

		var frame = document.createElement('iframe');
		frame.addEventListener('load', function () {
			setTimeout(function () {
				runRules(document, {}, function (r) {
					var nodes = r[0].passes.map(function (detail) {
						return detail.node.selector;
					});

					assert.deepEqual(nodes, [
						['#level0'],
						['#level0', '#level1'],
						['#level0', '#level1', '#level2a'],
						['#level0', '#level1', '#level2b']
					]);
					done();
				}, isNotCalled);

			}, 500);

		});
		frame.id = 'level0';
		frame.src = '../mock/frames/nested0.html';
		fixture.appendChild(frame);
	});
	it('should properly calculate context and return results from matching frames', function (done) {

		axe._load({
			rules: [{
				id: 'div#target',
				selector: '#target',
				any: ['has-target']
			}, {
				id: 'first-div',
				selector: 'div',
				any: ['first-div']
			}],
			checks: [{
				id: 'has-target',
				evaluate: function () {
					return true;
				}
			}, {
				id: 'first-div',
				selector: ':not(#fixture)',
				evaluate: function (node) {
					this.relatedNodes([node]);
					return false;
				},
				after: function (results) {
					if (results.length) {
						results[0].result = true;
					}
					return [results[0]];
				}
			}],
			messages: {}
		});

		iframeReady('../mock/frames/context.html', fixture, 'context-test', function () {
			var div = document.createElement('div');
			fixture.appendChild(div);

			runRules('#fixture', {}, function (results) {
				assert.deepEqual(JSON.parse(JSON.stringify(results)), [{
					id: 'div#target',
					helpUrl: 'https://dequeuniversity.com/rules/axe/2.0/div#target?application=axeAPI',
					pageLevel: false,
					impact: null,
					violations: [],
					passes: [{
						node: {
							selector: ['#context-test', '#target'],
							source: '<div id="target"></div>'
						},
						any: [{
							id: 'has-target',
							data: null,
							relatedNodes: []
						}],
						all: [],
						none: []
					}],
					result: 'PASS',
					tags: []
				}, {
					id: 'first-div',
					helpUrl: 'https://dequeuniversity.com/rules/axe/2.0/first-div?application=axeAPI',
					pageLevel: false,
					impact: null,
					violations: [],
					passes: [{
						node: {
							selector: ['#context-test', '#foo'],
							source: '<div id="foo">\n		<div id="bar"></div>\n	</div>'
						},
						any: [{
							id: 'first-div',
							data: null,
							relatedNodes: [{
								selector: ['#context-test', '#foo'],
								source: '<div id="foo">\n		<div id="bar"></div>\n	</div>'
							}]
						}],
						all: [],
						none: []
					}],
					result: 'PASS',
					tags: []
				}]);

				done();
			}, isNotCalled);

		});
	});

	it('should accept a jQuery-like object', function (done) {
		axe._load({
			rules: [{
				id: 'test',
				selector: '*',
				none: ['bob']
			}],
			checks: [{
				id: 'bob',
				evaluate: function () {
					return true;
				}
			}]
		});

		fixture.innerHTML = '<div id="t1"><span></span></div><div id="t2"><em></em></div>';

		var $test = {
			0: fixture.querySelector('#t1'),
			1: fixture.querySelector('#t2'),
			length: 2
		};

		axe.run($test, function (results, err) {
			if (err) throw err;
			assert.lengthOf(results.violations, 1);
			assert.lengthOf(results.violations[0].nodes, 4);
			assert.deepEqual(results.violations[0].nodes[0].target, ['#t1']);
			assert.deepEqual(results.violations[0].nodes[1].target, ['#t1 > span']);
			assert.deepEqual(results.violations[0].nodes[2].target, ['#t2']);
			assert.deepEqual(results.violations[0].nodes[3].target, ['#t2 > em']);
			done();
		});
	});

	it('should accept a NodeList', function (done) {
		axe._load({
			rules: [{
				id: 'test',
				selector: '*',
				none: ['fred']
			}],
			checks: [{
				id: 'fred',
				evaluate: function () {
					return true;
				}
			}]
		});

		fixture.innerHTML = '<div class="foo" id="t1"><span></span></div><div class="foo" id="t2"><em></em></div>';

		var test = fixture.querySelectorAll('.foo');
		axe.run(test, function (err, results) {
			if (err) throw err;
			assert.lengthOf(results.violations, 1);
			assert.lengthOf(results.violations[0].nodes, 4);
			assert.deepEqual(results.violations[0].nodes[0].target, ['#t1']);
			assert.deepEqual(results.violations[0].nodes[1].target, ['#t1 > span']);
			assert.deepEqual(results.violations[0].nodes[2].target, ['#t2']);
			assert.deepEqual(results.violations[0].nodes[3].target, ['#t2 > em']);
			done();
		});
	});

	it('should pull metadata from configuration', function (done) {
		axe._load({
			rules: [{
				id: 'div#target',
				selector: '#target',
				any: ['has-target']
			}, {
				id: 'first-div',
				selector: 'div',
				any: ['first-div'],
			}],
			checks: [{
				id: 'has-target',
				evaluate: function () {
					return false;
				}
			}, {
				id: 'first-div',
				selector: ':not(#fixture)',
				evaluate: function (node) {
					this.relatedNodes([node]);
					return false;
				},
				after: function (results) {
					if (results.length) {
						results[0].result = true;
					}
					return [results[0]];
				}
			}],
			data: {
				rules: {
					'div#target': {
						foo: 'bar',
						stuff: 'blah'
					},
					'first-div': {
						bar: 'foo',
						stuff: 'no'
					}
				},
				checks: {
					'first-div': {
						thingy: true,
						impact: 'serious',
						messages: {
							fail: function (checkResult) {
								return checkResult.id === 'first-div' ? 'failing is not good' : 'y u wrong rule?';
							},
							pass: function (checkResult) {
								return checkResult.id === 'first-div' ? 'passing is good' : 'y u wrong rule?';
							}
						}
					},
					'has-target': {
						otherThingy: true,
						impact: 'moderate',
						messages: {
							fail: function (checkResult) {
								return checkResult.id === 'has-target' ? 'failing is not good' : 'y u wrong rule?';
							},
							pass: function (checkResult) {
								return checkResult.id === 'has-target' ? 'passing is good' : 'y u wrong rule?';
							}
						}
					}
				}
			}
		});
		fixture.innerHTML = '<div id="target">Target!</div><div>ok</div>';
		runRules('#fixture', {}, function (results) {
			assert.deepEqual(JSON.parse(JSON.stringify(results)), [{
					id: 'div#target',
					helpUrl: 'https://dequeuniversity.com/rules/axe/2.0/div#target?application=axeAPI',
					pageLevel: false,
					foo: 'bar',
					stuff: 'blah',
					impact: 'moderate',
					passes: [],
					violations: [{
						node: {
							selector: ['#target'],
							source: '<div id="target">Target!</div>'
						},
						impact: 'moderate',
						any: [{
							impact: 'moderate',
							otherThingy: true,
							message: 'failing is not good',
							id: 'has-target',
							data: null,
							relatedNodes: []
						}],
						all: [],
						none: []
					}],
					result: 'FAIL',
					tags: []
				}, {
					id: 'first-div',
					helpUrl: 'https://dequeuniversity.com/rules/axe/2.0/first-div?application=axeAPI',
					pageLevel: false,
					bar: 'foo',
					stuff: 'no',
					impact: null,
					violations: [],
					passes: [{
						node: {
							selector: ['#target'],
							source: '<div id="target">Target!</div>'
						},
						any: [{
							impact: 'serious',
							id: 'first-div',
							thingy: true,
							message: 'passing is good',
							data: null,
							relatedNodes: [{
								selector: ['#target'],
								source: '<div id="target">Target!</div>'
							}]
						}],
						all: [],
						none: []
					}],
					result: 'PASS',
					tags: []
				}]);
			done();
		}, isNotCalled);
	});

	it('should call the reject argument if an error occurs', function (done) {
		axe._load({ rules: [{
			id: 'invalidRule'
		}], checks: [], messages: {}});

		createFrames(function () {
			setTimeout(function () {
				runRules(document, {}, function () {
					assert.ok(false, 'You shall not pass!');
					done();
				},
				function (err) {
					assert.instanceOf(err, Error);
					done();
				}, isNotCalled);
			}, 100);
		});
	});


});
