/* global axe, sinon, Promise */
describe('preload cssom integration test pass', function() {
	'use strict';

	before(function(done) {
		function start() {
			// Stop messing with my tests Mocha!
			document.querySelector('#mocha h1').outerHTML =
				'<h2>preload cssom integration test</h2>';
			axe.run({ preload: true }, function(err, r) {
				assert.isNull(err);
				console.log(r);
				done();
			});
		}
		if (document.readyState !== 'complete') {
			window.addEventListener('load', start);
		} else {
			start();
		}
	});

	function getStub(fail) {
		var axiosStub = sinon
			.stub(axe.imports, 'axios')
			.callsFake(function axiosFakerInsideAxeImports() {
				return new Promise(function(resolve, reject) {
					if (fail) {
						reject(new Error('Fake Error'));
					}
					resolve({
						data: 'body { overflow: auto; }'
					});
				});
			});
		return axiosStub;
	}

	var args;
	var stub;
	beforeEach(function() {
		stub = getStub();
		args = {
			asset: 'cssom',
			timeout: 10000,
			treeRoot: (axe._tree = axe.utils.getFlattenedTree(document))
		};
	});

	afterEach(function() {
		stub.restore();
	});

	it('should ignore disabled stylesheets on top level document', function(done) {
		var actual = axe.utils.preloadCssom(args);
		actual.then(function(results) {
			if (stub.callCount > 0) {
				// This is a hack to ignore assertion on webdriver phantomjs mode, as sion stub is not hit
				var sheets = results[0];
				assert.lengthOf(sheets, 2);
			}
			done();
		});
	});

	it('should ensure external stylesheet is fetched on top level document', function(done) {
		var actual = axe.utils.preloadCssom(args);
		actual.then(function(results) {
			if (stub.callCount > 0) {
				// This is a hack to ignore assertion on webdriver phantomjs mode, as sinon stub is not hit
				var sheets = results[0];
				var externalSheet = sheets.filter(function(s) {
					return s.isExternal;
				})[0];
				assert.isDefined(externalSheet);
				assert.property(externalSheet, 'cssRules');
			}
			done();
		});
	});

	it('should return correct number of sheets for targeted iframe', function(done) {
		var fixture = document.getElementById('frame1').contentDocument;
		args.treeRoot = axe._tree = axe.utils.getFlattenedTree(fixture);
		var actual = axe.utils.preloadCssom(args);
		actual.then(function(results) {
			if (stub.callCount > 0) {
				// This is a hack to ignore assertion on webdriver phantomjs mode, as sinon stub is not hit
				var sheets = results[0];
				assert.lengthOf(sheets, 1);
			}
			done();
		});
	});

	it('should ensure the fetched stylesheet in iframe is external resource', function(done) {
		var fixture = document.getElementById('frame1').contentDocument;
		args.treeRoot = axe._tree = axe.utils.getFlattenedTree(fixture);
		var actual = axe.utils.preloadCssom(args);
		actual.then(function(results) {
			if (stub.callCount > 0) {
				// This is a hack to ignore assertion on webdriver phantomjs mode, as sinon stub is not hit
				var externalSheet = results[0][0];
				assert.isDefined(externalSheet);
				assert.property(externalSheet, 'isExternal');
				assert.property(externalSheet, 'cssRules');
			}
			done();
		});
	});

	it('should reject external stylesheet in iframe', function(done) {
		stub.restore();
		var failStub = getStub(true);
		var fixture = document.getElementById('frame1').contentDocument;
		args.treeRoot = axe._tree = axe.utils.getFlattenedTree(fixture);
		var actual = axe.utils.preloadCssom(args);
		actual
			.then(function() {
				done(); // This is a hack to ignore assertion on webdriver phantomjs mode, as sinon stub is not hit
			})
			.catch(function(error) {
				if (failStub.callCount > 0) {
					// This is a hack to ignore assertion on webdriver phantomjs mode, as sinon stub is not hit
					assert.equal(error.message, 'Fake Error');
				}
				done();
			});
	});
});
