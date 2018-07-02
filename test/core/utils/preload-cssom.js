describe('axe.utils.preloadCssom', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var pageTpl =
		'<!DOCTYPE html><html><head><style>html {width: 100vh;}</style></head><body></body></html>';
	var args;

	beforeEach(function() {
		args = {
			asset: 'cssom',
			timeout: 10000
		};
	});

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('should be a function', function() {
		assert.isFunction(axe.utils.preloadCssom);
	});

	it('should return a queue', function() {
		fixture.innerHTML = pageTpl;
		var tree = (axe._tree = axe.utils.getFlattenedTree(fixture));
		args.treeRoot = tree;
		var actual = axe.utils.preloadCssom(args);
		assert.isObject(actual);
		assert.containsAllKeys(actual, ['then', 'defer', 'catch']);
	});

	it('should ensure result has cssom property', function(done) {
		fixture.innerHTML = pageTpl;
		var tree = (axe._tree = axe.utils.getFlattenedTree(fixture));
		args.treeRoot = tree;
		var actual = axe.utils.preloadCssom(args);
		actual
			.then(function(results) {
				var r = results[0];
				assert.property(r, 'cssom');
				done();
			})
			.catch(function(error) {
				done(error);
			});
	});

	it('should ensure result of cssom returned is an array of sheets', function(done) {
		fixture.innerHTML = pageTpl;
		var tree = (axe._tree = axe.utils.getFlattenedTree(fixture));
		args.treeRoot = tree;
		var actual = axe.utils.preloadCssom(args);
		actual
			.then(function(results) {
				var sheets = results[0].cssom;
				assert.isTrue(Array.isArray(sheets));
				assert.lengthOf(sheets, 2);
				done();
			})
			.catch(function(error) {
				done(error);
			});
	});

	it('should ensure all returned stylesheet is defined and has readable sheet/ cssrules', function(done) {
		fixture.innerHTML = pageTpl;
		var tree = (axe._tree = axe.utils.getFlattenedTree(fixture));
		args.treeRoot = tree;
		var actual = axe.utils.preloadCssom(args);
		actual
			.then(function(results) {
				var sheets = results[0].cssom;
				sheets.forEach(function(s) {
					assert.isDefined(s);
					assert.property(s, 'cssRules');
				});
				done();
			})
			.catch(function(error) {
				done(error);
			});
	});

	it('should ignore disabled stylesheets', function(done) {
		var page =
			'<!DOCTYPE html><html><head> <link disabled rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" /> </head><body></body></html>';
		fixture.innerHTML = page;
		var tree = (axe._tree = axe.utils.getFlattenedTree(fixture));
		args.treeRoot = tree;
		var actual = axe.utils.preloadCssom(args);
		actual
			.then(function(results) {
				var sheets = results[0].cssom;
				assert.lengthOf(sheets, 1); // the 1 stylesheet fetched is of the parent test runner page
				done();
			})
			.catch(function(error) {
				done(error);
			});
	});

	var shadowSupported = axe.testUtils.shadowSupport.v1;
	(shadowSupported ? it : xit)(
		'should fetch all shadow DOM stylesheets',
		function(done) {
			var content =
				'<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" />';
			var shadow = fixture.attachShadow({ mode: 'open' });
			shadow.innerHTML = content;
			var tree = (axe._tree = axe.utils.getFlattenedTree(fixture));
			args.treeRoot = tree;
			var actual = axe.utils.preloadCssom(args);
			actual
				.then(function(results) {
					var sheets = results[0].cssom;
					assert.lengthOf(sheets, 1);
					done();
				})
				.catch(function(error) {
					done(error);
				});
		}
	);

	it('should make xhr for external stylesheet', function(done) {
		var page =
			'<!DOCTYPE html><html><head> <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" /> </head><body></body></html>';
		fixture.innerHTML = page;
		var tree = (axe._tree = axe.utils.getFlattenedTree(fixture));
		args.treeRoot = tree;
		var actual = axe.utils.preloadCssom(args);
		actual
			.then(function(results) {
				var sheets = results[0].cssom;
				assert.lengthOf(sheets, 1);
				sheets.forEach(function(s) {
					assert.isDefined(s);
					assert.property(s, 'href');
					assert.isDefined(s.href);
					assert.property(s, 'cssRules');
				});
				done();
			})
			.catch(function(error) {
				done(error);
			});
	});

	it('should return 2 stylesheets', function(done) {
		var page =
			'<!DOCTYPE html><html><head> <style>html {width: 100vh;}</style> <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" /> </head><body></body></html>';
		fixture.innerHTML = page;
		var tree = (axe._tree = axe.utils.getFlattenedTree(fixture));
		args.treeRoot = tree;
		var actual = axe.utils.preloadCssom(args);
		actual
			.then(function(results) {
				var sheets = results[0].cssom;
				assert.lengthOf(sheets, 2);
				done();
			})
			.catch(function(error) {
				done(error);
			});
	});
});
