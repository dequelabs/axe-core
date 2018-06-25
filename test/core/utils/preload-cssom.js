describe('axe.utils.preloadCssom', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var pageTpl = '<!DOCTYPE html><html><head><style>html {width: 100vh;}</style></head><body></body></html>';

	afterEach(function () {
		fixture.innerHTML = '';
		axe._tree = undefined;
	});

	it('should be a function', function () {
		assert.isFunction(axe.utils.preloadCssom);
	});

	it('should return a queue', function () {
		fixture.innerHTML = pageTpl;
		var tree = axe._tree = axe.utils.getFlattenedTree(fixture);
		var args = {
			asset: ['cssom'],
			timeout: 30000,
			treeRoot: tree
		};
		var actual = axe.utils.preloadCssom(args);
		assert.isObject(actual);
	});

	it('should ensure queue is defer(able)', function (done) {
		fixture.innerHTML = pageTpl;
		var tree = axe._tree = axe.utils.getFlattenedTree(fixture);
		var args = {
			asset: ['cssom'],
			timeout: 30000,
			treeRoot: tree
		};
		var actual = axe.utils.preloadCssom(args);
		actual
			.defer((function (res, rej) {
				res(true);
				assert.isFunction(rej);
				assert.isOk(true);
				done();
			}));
	});

	it('should ensure queue is then(able)', function (done) {
		fixture.innerHTML = pageTpl;
		var tree = axe._tree = axe.utils.getFlattenedTree(fixture);
		var args = {
			asset: ['cssom'],
			timeout: 30000,
			treeRoot: tree
		};
		var actual = axe.utils.preloadCssom(args);
		actual
			.then((function (results) {
				assert.isDefined(results);
				assert.isOk(true);
				done();
			}));
	});

	it('should ensure result has cssom property', function (done) {
		fixture.innerHTML = pageTpl;
		var tree = axe._tree = axe.utils.getFlattenedTree(fixture);
		var args = {
			asset: ['cssom'],
			timeout: 30000,
			treeRoot: tree
		};
		var actual = axe.utils.preloadCssom(args);
		actual
			.then((function (results) {
				var r = results[0];
				assert.property(r, 'cssom');
				done();
			}));
	});

	it('should ensure result is an array', function (done) {
		fixture.innerHTML = pageTpl;
		var target = fixture.children[0];
		var tree = axe._tree = axe.utils.getFlattenedTree(target);
		var args = {
			asset: ['cssom'],
			timeout: 30000,
			treeRoot: tree
		};
		var actual = axe.utils.preloadCssom(args);
		actual
			.then((function (results) {
				var sheets = results[0].cssom;
				assert.isTrue(Array.isArray(sheets));
				assert.lengthOf(sheets, 2);
				done();
			}));
	});

	it('should ensure all returned stylesheet is defined and has readable sheet/ cssrules', function (done) {
		fixture.innerHTML = pageTpl;
		var target = fixture.children[0];
		var tree = axe._tree = axe.utils.getFlattenedTree(target);
		var args = {
			asset: ['cssom'],
			timeout: 30000,
			treeRoot: tree
		};
		var actual = axe.utils.preloadCssom(args);
		actual
			.then(function (results) {
				var sheets = results[0].cssom;
				sheets.forEach(function (s) {
					assert.isDefined(s);
					assert.property(s, 'cssRules');
				});
				done();
			});
	});

});