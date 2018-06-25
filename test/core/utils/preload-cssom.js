

describe('axe.utils.preloadCssom', function () {
	'use strict';
	
	let fixture = document.getElementById('fixture');
	const pageTpl = `
	<!DOCTYPE html>
	<html>
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title>Sandbox::Preload</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" />
		<link rel="stylesheet" type="text/css" media="screen" href="sandbox-preload.css" />
		<style>
			@media screen and (min-width: 320px) and (max-width: 767px) and (orientation: landscape) {
				html {
					transform: rotate(-90deg);
					transform-origin: left top;
					width: 100vh;
					overflow-x: hidden;
					position: absolute;
					top: 100%;
					left: 0;
				}
			}
		</style>
	</head>
	<body>
	</body>
	</html>
	`;

	afterEach(function () {
		fixture.innerHTML = '';
		axe._tree = undefined;
	});

	it('should be a function', function () {
		assert.isFunction(axe.utils.preloadCssom);
	});

	it('should return a queue', function () {
		fixture.innerHTML = pageTpl;
		const tree = axe._tree = axe.utils.getFlattenedTree(fixture);
		const args = {
			asset: ['cssom'],
			timeout: 30000,
			treeRoot: tree
		};
		const actual = axe.utils.preloadCssom(args);
		assert.isObject(actual);
	});

	it('should ensure queue is defer(able)', function (done) {
		fixture.innerHTML = pageTpl;
		const tree = axe._tree = axe.utils.getFlattenedTree(fixture);
		const args = {
			asset: ['cssom'],
			timeout: 30000,
			treeRoot: tree
		};
		const actual = axe.utils.preloadCssom(args);
		actual
			.defer((function (res, rej) {
				res(true);
				assert.isOk(true);
				done();
			}));
	});

	it('should ensure queue is then(able)', function (done) {
		fixture.innerHTML = pageTpl;
		const tree = axe._tree = axe.utils.getFlattenedTree(fixture);
		const args = {
			asset: ['cssom'],
			timeout: 30000,
			treeRoot: tree
		};
		const actual = axe.utils.preloadCssom(args);
		actual
			.then((function (results) {
				assert.isOk(true);
				done();
			}));
	});

	it('should ensure result has cssom property', function (done) {
		fixture.innerHTML = pageTpl;
		const tree = axe._tree = axe.utils.getFlattenedTree(fixture);
		const args = {
			asset: ['cssom'],
			timeout: 30000,
			treeRoot: tree
		};
		const actual = axe.utils.preloadCssom(args);
		actual
			.then((function (results) {
				const r = results[0];
				assert.property(r, 'cssom');
				done();
			}));
	});

	it('should ensure result is an array', function (done) {
		fixture.innerHTML = pageTpl;
		const target = fixture.children[0];
		const tree = axe._tree = axe.utils.getFlattenedTree(target);
		const args = {
			asset: ['cssom'],
			timeout: 30000,
			treeRoot: tree
		};
		const actual = axe.utils.preloadCssom(args);
		actual
			.then((function (results) {
				const sheets = results[0].cssom;
				assert.isTrue(Array.isArray(sheets));
				assert.lengthOf(sheets, 2);
				done();
			}));
	});

	it('should ensure all returned stylesheet is defined and has readable sheet/ cssrules', function (done) {
		fixture.innerHTML = pageTpl;
		const target = fixture.children[0];
		const tree = axe._tree = axe.utils.getFlattenedTree(target);
		const args = {
			asset: ['cssom'],
			timeout: 30000,
			treeRoot: tree
		};
		const actual = axe.utils.preloadCssom(args);
		actual
			.then(function (results) {
				const sheets = results[0].cssom;
				sheets.forEach(function(s){
					assert.isDefined(s);
					assert.property(s, 'cssRules');
				});
				done();
			});
	});

});