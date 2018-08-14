/* global axe, Promise */
describe('preload cssom integration test pass', function() {
	'use strict';

	var origAxios;
	var shadowSupported = axe.testUtils.shadowSupport.v1;

	before(function(done) {
		function start() {
			// cache original axios object
			if (axe.imports.axios) {
				origAxios = axe.imports.axios;
			}
			// run axe
			axe.run(
				{
					preload: true
				},
				function(err) {
					assert.isNull(err);
					done();
				}
			);
		}
		if (document.readyState !== 'complete') {
			window.addEventListener('load', start);
		} else {
			start();
		}
	});

	function createStub(shouldReject) {
		/**
		 * This is a simple override to stub `axe.imports.axios`, until the test-suite is enhanced.
		 * Did not use any library such as sinon for this, as sinon.stub have difficulties working under selenium webdriver
		 * Also a generic XHR override was overlooked under webdriver
		 */
		axe.imports.axios = function stubbedAxios() {
			return new Promise(function(resolve, reject) {
				if (shouldReject) {
					reject(new Error('Fake Error'));
				}
				resolve({
					data: 'body{overflow:auto;}'
				});
			});
		};
	}

	function restoreStub() {
		if (origAxios) {
			axe.imports.axios = origAxios;
		}
	}

	function assertStylesheet(sheet, selectorText, cssText) {
		assert.isDefined(sheet);
		assert.property(sheet, 'cssRules');
		assert.equal(sheet.cssRules[0].selectorText, selectorText);
		assert.equal(sheet.cssRules[0].cssText.replace(/\s/g, ''), cssText);
	}

	function getPreload(root) {
		var config = {
			asset: 'cssom',
			timeout: 10000,
			treeRoot: axe.utils.getFlattenedTree(root ? root : document)
		};
		return axe.utils.preloadCssom(config);
	}

	function commonTestsForRootAndFrame(root) {
		shouldIt(
			'should return external stylesheet from cross-domain and verify response',
			function(done) {
				getPreload(root)
					.then(function(results) {
						var sheets = results[0];
						var externalSheet = sheets.filter(function(s) {
							return s.isExternal;
						})[0].sheet;
						assertStylesheet(externalSheet, 'body', 'body{overflow:auto;}');
						done();
					})
					.catch(done);
			}
		);

		shouldIt('should reject if external stylesheet fail to load', function(
			done
		) {
			restoreStub();
			createStub(true);
			var doneCalled = false;
			getPreload(root)
				.then(done)
				.catch(function(error) {
					assert.equal(error.message, 'Fake Error');
					if (!doneCalled) {
						done();
					}
					doneCalled = true;
				});
		});
	}

	beforeEach(function() {
		createStub();
	});

	afterEach(function() {
		restoreStub();
	});

	var shouldIt = window.PHANTOMJS ? it.skip : it;

	describe('tests for current top level document', function() {
		shouldIt(
			'should return inline stylesheets defined using <style> tag',
			function(done) {
				getPreload()
					.then(function(results) {
						var sheets = results[0];
						var nonExternalsheets = sheets.filter(function(s) {
							return !s.isExternal;
						});
						assert.lengthOf(nonExternalsheets, 2);
						var inlineStylesheet = nonExternalsheets.filter(function(s) {
							return s.sheet.rules.length === 1;
						})[0].sheet;
						assertStylesheet(
							inlineStylesheet,
							'.inline-css-test',
							'.inline-css-test{font-size:inherit;}'
						);
						done();
					})
					.catch(done);
			}
		);

		shouldIt('should return relative stylesheets with in same-origin', function(
			done
		) {
			getPreload()
				.then(function(results) {
					var sheets = results[0];
					var relativeSheets = sheets.filter(function(s) {
						return !s.isExternal;
					});
					assert.lengthOf(relativeSheets, 2);
					var relativeSheet = relativeSheets.filter(function(s) {
						return s.sheet.rules.length > 1;
					})[0].sheet;
					assertStylesheet(relativeSheet, 'body', 'body{margin:0px;}');
					done();
				})
				.catch(done);
		});

		shouldIt(
			'should return all external stylesheets with or with(out) media attribute that are not disabled',
			function(done) {
				getPreload()
					.then(function(results) {
						var sheets = results[0];
						var externalSheets = sheets.filter(function(s) {
							return s.isExternal;
						});
						assert.lengthOf(externalSheets, 3);
						done();
					})
					.catch(done);
			}
		);

		shouldIt(
			'should ignore disabled stylesheets with or with(out) media attribute',
			function(done) {
				getPreload()
					.then(function(results) {
						var sheets = results[0];
						assert.lengthOf(sheets, 5);
						done();
					})
					.catch(done);
			}
		);

		if (!window.PHANTOMJS) {
			(shadowSupported ? it : xit)(
				'should return styles from shadow dom',
				function(done) {
					var fixture = document.getElementById('shadow-fixture');
					var shadow = fixture.attachShadow({ mode: 'open' });
					shadow.innerHTML =
						'<style>@import "https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css"; @import "preload-cssom-shadow-blue.css"; .green { background-color: green; }</style>' +
						'<div class="initialism">Some text</div>' +
						'<div class="green">green</div>' +
						'<div class="red">red</div>' +
						'' +
						'<h1>Heading</h1>';
					getPreload(fixture)
						.then(function(results) {
							var sheets = results[0];
							// verify count
							assert.lengthOf(sheets, 8);
							// verify that the last non external sheet with shadowId has green selector
							var nonExternalsheetsWithShadowId = sheets
								.filter(function(s) {
									return !s.isExternal;
								})
								.filter(function(s) {
									return s.shadowId;
								});
							assertStylesheet(
								nonExternalsheetsWithShadowId[
									nonExternalsheetsWithShadowId.length - 1
								].sheet,
								'.green',
								'.green{background-color:green;}'
							);
							done();
						})
						.catch(done);
				}
			);
		}

		commonTestsForRootAndFrame();
	});

	describe('tests for nested iframe', function() {
		var frame;

		before(function() {
			frame = document.getElementById('frame1').contentDocument;
		});

		shouldIt(
			'should return correct number of stylesheets, ignores disabled',
			function(done) {
				getPreload(frame)
					.then(function(results) {
						var sheets = results[0];
						assert.lengthOf(sheets, 3);
						done();
					})
					.catch(done);
			}
		);

		shouldIt(
			'should return inline stylesheets defined using <style> tag',
			function(done) {
				getPreload(frame)
					.then(function(results) {
						var sheets = results[0];
						var nonExternalsheets = sheets.filter(function(s) {
							return !s.isExternal;
						});
						assert.lengthOf(nonExternalsheets, 1);
						var inlineStylesheet = nonExternalsheets.filter(function(s) {
							return s.sheet.rules.length === 1;
						})[0].sheet;
						assertStylesheet(
							inlineStylesheet,
							'.inline-frame-css-test',
							'.inline-frame-css-test{font-size:inherit;}'
						);
						done();
					})
					.catch(done);
			}
		);

		commonTestsForRootAndFrame(frame);
	});
});
