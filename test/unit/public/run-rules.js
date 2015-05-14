/*global runRules */
describe('dqre.a11yCheck', function () {
	'use strict';

	describe('reporter', function () {

		it('should throw if no audit is configured', function () {
			dqre._audit = null;

			assert.throws(function () {
				dqre.a11yCheck(document, {});
			}, Error, /^No audit configured/);
		});

		it('should allow for option-less invocation', function (done) {

			dqre._load({ reporter: function (r, c) {
				c(r);
			}});
			dqre.a11yCheck(document, function (result) {
				assert.isArray(result);
				assert.lengthOf(result, 0);
				done();
			});
		});

		it('should use specified reporter via options - anon function', function (done) {

			dqre._load({
				reporter: function () {
					assert.fail('should not be called');
				}
			});
			dqre.a11yCheck(document, { reporter: function (result) {
				assert.isArray(result);
				assert.lengthOf(result, 0);
				done();
			}});
		});

		it('should use specified reporter via options by name', function (done) {

			var orig = window.reporters;
			dqre._load({
				reporter: function () {
					assert.fail('should not be called');
				}
			});
			dqre.reporter('foo', function (result) {
				assert.isArray(result);
				assert.lengthOf(result, 0);
				window.reporters = orig;
				done();
			});
			dqre.a11yCheck(document, { reporter: 'foo' });
		});

		it('should check configured reporter', function (done) {

			dqre._load({
				reporter: function (result) {
					assert.isArray(result);
					assert.lengthOf(result, 0);
					done();
				}
			});
			dqre.a11yCheck(document, null);
		});

		it('fallback to default configured reporter', function (done) {
			var orig = window.defaultReporter;
			window.defaultReporter = function (result) {
				assert.isArray(result);
				assert.lengthOf(result, 0);
				done();
			};

			dqre._load({});
			dqre.a11yCheck(document, null);
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

	afterEach(function () {
		fixture.innerHTML = '';
		dqre._audit = null;
	});

	it('should work', function (done) {
		this.timeout(5000);
		dqre._load({ rules: [{
			id: 'html',
			selector: 'html',
			any: [{
				id: 'html',
				evaluate: function () {
					return true;
				}
			}]
		}], messages: {}});

		createFrames(function () {
			setTimeout(function () {
				runRules(document, {}, function (r) {
					assert.lengthOf(r[0].passes, 3);
					done();
				});

			}, 500);

		});
	});

	it('should properly order iframes', function (done) {
		this.timeout(5000);
		dqre._load({ rules: [{
			id: 'iframe',
			selector: 'iframe',
			any: [{
				id: 'iframe',
				evaluate: function () {
					return true;
				}
			}]
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
				});

			}, 500);

		});
		frame.id = 'level0';
		frame.src = '../mock/frames/nested0.html';
		fixture.appendChild(frame);
	});
	it('should properly calculate context and return results from matching frames', function (done) {

		dqre._load({
			rules: [{
				id: 'div#target',
				selector: '#target',
				any: [{
					id: 'has-target',
					evaluate: function () {
						return true;
					}
				}]
			}, {
				id: 'first-div',
				selector: 'div',
				any: [{
					id: 'first-div',
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
				}]
			}],
			messages: {}
		});

		iframeReady('../mock/frames/context.html', fixture, 'context-test', function () {
			var div = document.createElement('div');
			fixture.appendChild(div);

			runRules('#fixture', {}, function (results) {
				assert.deepEqual(JSON.parse(JSON.stringify(results)), [{
					id: 'div#target',
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
			});

		});
	});

	it('should pull metadata from configuration', function (done) {
		dqre._load({
			rules: [{
				id: 'div#target',
				selector: '#target',
				any: [{
					id: 'has-target',
					evaluate: function () {
						return false;
					}
				}]
			}, {
				id: 'first-div',
				selector: 'div',
				any: [{
					id: 'first-div',
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
				}]
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
		});
	});
});
