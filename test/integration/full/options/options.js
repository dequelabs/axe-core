describe('Options', function() {
	'use strict';

	before(function (done) {
		var frame = document.getElementById('myframe');
		if (frame.contentWindow.document.readyState === 'complete') {
			done();
		} else {
			frame.addEventListener('load', function () {
				done();
			});
		}
	});

	function $id(id) {
		return document.getElementById(id);
	}

	describe('iframes', function() {
		it('should include iframes by default', function(done) {
			var config = {};
			axe.a11yCheck(document, config, function(results) {
				try {
					assert.lengthOf(results.violations, 0, 'violations');
					assert.lengthOf(results.passes, 1, 'passes');
					assert.lengthOf(results.passes[0].nodes, 2, 'results from main and iframe');
					assert.isTrue(results.passes[0].nodes.some(function(node) {
						if (node.target.length !== 2) {
							return false;
						}
						return node.target[0] === '#myframe';
					}), 'couldn\'t find iframe result');
					done();
				} catch (e) {
					done(e);
				}
			});
		});

		it('should include iframes if `iframes` is true', function(done) {
			var config = { iframes: true };
			axe.a11yCheck(document, config, function(results) {
				try {
					assert.lengthOf(results.violations, 0, 'violations');
					assert.lengthOf(results.passes, 1, 'passes');
					assert.lengthOf(results.passes[0].nodes, 2, 'results from main and iframe');
					assert.isTrue(results.passes[0].nodes.some(function(node) {
						if (node.target.length !== 2) {
							return false;
						}
						return node.target[0] === '#myframe';
					}), 'couldn\'t find iframe result');
					done();
				} catch (e) {
					done(e);
				}
			});
		});

		it('should exclude iframes if `iframes` is false', function(done) {
			var config = { iframes: false };
			axe.a11yCheck(document, config, function(results) {
				try {
					assert.lengthOf(results.violations, 0, 'violations');
					assert.lengthOf(results.passes, 1, 'passes');
					assert.lengthOf(results.passes[0].nodes, 1, 'results from main frame only');
					assert.isFalse(results.passes[0].nodes.some(function(node) {
						if (node.target.length !== 2) {
							return false;
						}	
						return node.target[0] === '#myframe';
					}), 'unexpectedly found iframe result');
					done();
				} catch (e) {
					done(e);
				}
			});
		});
	});

	describe('elementRef', function() {
		it('should not return an elementRef by default', function(done) {
			var config = {};
			axe.a11yCheck(document, config, function(results) {
				try {
					assert.lengthOf(results.violations, 0, 'violations');
					assert.lengthOf(results.passes, 1, 'passes');
					assert.lengthOf(results.passes[0].nodes, 2, '');
					assert.isFalse(results.passes[0].nodes.some(function(node) {
						return 'element' in node;
					}), 'unexpectedly foud element ref');
					done();
				} catch (e) {
					done(e);
				}
			});
		});

		it('should not return an elementRef if `elementRef` is false', function(done) {
			var config = { elementRef: false };
			axe.a11yCheck(document, config, function(results) {
				try {
					assert.lengthOf(results.violations, 0, 'violations');
					assert.lengthOf(results.passes, 1, 'passes');
					assert.lengthOf(results.passes[0].nodes, 2, 'results from main frame and iframe');
					assert.isFalse(results.passes[0].nodes.some(function(node) {
						return 'element' in node;
					}), 'unexpectedly found element ref');
					done();
				} catch (e) {
					done(e);
				}
			});
		});

		it('should return element refs for the top frame only if `elementRef` is true', function(done) {
			var config = { elementRef: true };
			axe.a11yCheck(document, config, function(results) {
				try {
					assert.lengthOf(results.violations, 0, 'violations');
					assert.lengthOf(results.passes, 1, 'passes');
					assert.lengthOf(results.passes[0].nodes, 2, '');
					assert.isTrue(results.passes[0].nodes.every(function(node) {
						if ('element' in node) {
							return node.element === $id('target');
						}
						return 'target' in node && node.target.length > 1;
					}), 'every result node should either be in an iframe or have an element ref');
					done();
				} catch (e) {
					done(e);
				}
			});
		});
	});

	describe('no selectors', function() {
		it('should return a selector by default', function(done) {
			var config = {};
			axe.a11yCheck(document, config, function(results) {
				try {
					assert.lengthOf(results.violations, 0, 'violations');
					assert.lengthOf(results.passes, 1, 'passes');
					assert.lengthOf(results.passes[0].nodes, 2, '');
					assert.isTrue(results.passes[0].nodes.every(function(node) {
						return 'target' in node;
					}), 'every result node should have a target');
					done();
				} catch (e) {
					done(e);
				}
			});
		});

		it('should return a selector if `selectors` is true', function(done) {
			var config = { selectors: true };
			axe.a11yCheck(document, config, function(results) {
				try {
					assert.lengthOf(results.violations, 0, 'violations');
					assert.lengthOf(results.passes, 1, 'passes');
					assert.lengthOf(results.passes[0].nodes, 2, '');
					assert.isTrue(results.passes[0].nodes.every(function(node) {
						return 'target' in node;
					}), 'every result node should have a target');
					done();
				} catch (e) {
					done(e);
				}
			});
		});

		it('should return no selector in top frame if `selectors` is false', function(done) {
			var config = { selectors: false };
			axe.a11yCheck(document, config, function(results) {
				try {
					assert.lengthOf(results.violations, 0, 'violations');
					assert.lengthOf(results.passes, 1, 'passes');
					assert.lengthOf(results.passes[0].nodes, 2, '');
					assert.isFalse(results.passes[0].nodes.some(function(node) {
						return 'target' in node && node.target.length === 1;
					}), 'only iframe result nodes should have a target');
					done();
				} catch (e) {
					done(e);
				}
			});
		});
	});
});
