/* global axe, Promise */
describe('preload cssom integration test', function() {
	'use strict';

	var origAxios;
	var shadowSupported = axe.testUtils.shadowSupport.v1;
	var isPhantom = window.PHANTOMJS ? true : false;

	function addSheet(data) {
		if (data.href) {
			var link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = data.href;
			if (data.mediaPrint) {
				link.media = 'print';
			}
			document.head.appendChild(link);
		} else {
			const style = document.createElement('style');
			style.type = 'text/css';
			style.appendChild(document.createTextNode(data.text));
			document.head.appendChild(style);
		}
	}

	var styleSheets = [
		{
			href:
				'https://stackpath.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
		},
		{
			href:
				'https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css',
			mediaPrint: true
		},
		{
			text:
				'	@import "preload-cssom-shadow-blue.css"; .inline-css-test { font-size: inherit; }'
		}
	];

	before(function(done) {
		if (isPhantom) {
			this.skip();
			done();
		} else {
			styleSheets.forEach(addSheet);
			// cache original axios object
			if (axe.imports.axios) {
				origAxios = axe.imports.axios;
			}

			// wait for network request to complete for added sheets
			setTimeout(done, 5000);
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
		it('should return external stylesheet from cross-domain and verify response', function(done) {
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
		});

		it('should reject if axios time(s)out when fetching', function(done) {
			// restore back normal axios
			restoreStub();

			// and set config to timeout immediately
			var config = {
				asset: 'cssom',
				timeout: 1,
				treeRoot: axe.utils.getFlattenedTree(root ? root : document)
			};

			var doneCalled = false;

			axe.utils
				.preloadCssom(config)
				.then(function() {
					done();
				})
				.catch(function(error) {
					// assert that rejection happens
					assert.equal(error.message, 'timeout of 1ms exceeded'); // this message comes from axios
					if (!doneCalled) {
						doneCalled = true;
						done();
					}
				});
		});

		it('should reject if external stylesheet fail to load', function(done) {
			restoreStub();
			createStub(true);
			var doneCalled = false;
			getPreload(root)
				.then(function() {
					done();
				})
				.catch(function(error) {
					assert.equal(error.message, 'Fake Error');
					if (!doneCalled) {
						doneCalled = true;
						done();
					}
				});
		});
	}

	beforeEach(function() {
		createStub();
	});

	afterEach(function() {
		restoreStub();
	});

	describe('tests for current top level document', function() {
		var shadowFixture;

		before(function() {
			if (isPhantom) {
				this.skip();
			}
		});

		beforeEach(function() {
			var shadowNode = document.createElement('div');
			shadowNode.id = 'shadow-fixture';
			document.body.appendChild(shadowNode);
			shadowFixture = document.getElementById('shadow-fixture');
		});

		afterEach(function() {
			if (shadowFixture) {
				document.body.removeChild(shadowFixture);
			}
		});

		it('should return inline stylesheets defined using <style> tag', function(done) {
			getPreload()
				.then(function(results) {
					var sheets = results[0];
					var nonExternalsheets = sheets.filter(function(s) {
						return !s.isExternal;
					});
					assert.lengthOf(nonExternalsheets, 2);
					var inlineStylesheet = nonExternalsheets.filter(function(s) {
						return s.sheet.cssRules.length === 1;
					})[0].sheet;
					assertStylesheet(
						inlineStylesheet,
						'.inline-css-test',
						'.inline-css-test{font-size:inherit;}'
					);
					done();
				})
				.catch(done);
		});

		it('should return relative stylesheets with in same-origin', function(done) {
			getPreload()
				.then(function(results) {
					var sheets = results[0];
					var relativeSheets = sheets.filter(function(s) {
						return !s.isExternal;
					});
					assert.lengthOf(relativeSheets, 2);
					var relativeSheet = relativeSheets.filter(function(s) {
						return s.sheet.cssRules.length > 1;
					})[0].sheet;
					assertStylesheet(relativeSheet, 'body', 'body{margin:0px;}');
					done();
				})
				.catch(done);
		});

		it('should return all external stylesheets with or with(out) media attribute that are not disabled', function(done) {
			getPreload()
				.then(function(results) {
					var sheets = results[0];
					var externalSheets = sheets.filter(function(s) {
						return s.isExternal;
					});
					assert.lengthOf(externalSheets, 2);
					done();
				})
				.catch(done);
		});

		(shadowSupported ? it : xit)(
			'should return styles from shadow dom (handles @import "external", @import "relative" and inline styles)',
			function(done) {
				var shadow = shadowFixture.attachShadow({ mode: 'open' });
				shadow.innerHTML =
					'<style> @import "https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css"; @import "preload-cssom-shadow-blue.css"; .green { background-color: green; } </style>' +
					'<div class="initialism">Some text</div>' +
					'<div class="green">green</div>' +
					'<div class="red">red</div>' +
					'<h1>Heading</h1>';
				getPreload(shadowFixture)
					.then(function(results) {
						var sheets = results[0];
						// verify count
						assert.lengthOf(sheets, 7);
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
						// verify priority of shadowId sheets is higher than base document
						var anySheetFromBaseDocument = sheets.filter(function(s) {
							return !s.shadowId;
						})[0];
						var anySheetFromShadowDocument = sheets.filter(function(s) {
							return s.shadowId;
						})[0];
						// shadow dom priority is greater than base doc
						assert.isAbove(
							anySheetFromShadowDocument.priority[0],
							anySheetFromBaseDocument.priority[0]
						);
						done();
					})
					.catch(done);
			}
		);

		(shadowSupported ? it : xit)(
			'should return styles from shadow dom (handles multiple <style> declarations with @import "external", @import "relative" and inline styles)',
			function(done) {
				var shadow = shadowFixture.attachShadow({ mode: 'open' });
				shadow.innerHTML =
					'<style> @import "https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css"; @import "preload-cssom-shadow-blue.css"; .green { background-color: green; } </style>' +
					'<div class="initialism">Some text</div>' +
					'<style> .notGreen { background-color: orange; } </style>' +
					'<div class="green">green</div>' +
					'<div class="red">red</div>' +
					'<div class="notGreen">red</div>' +
					'<h1>Heading</h1>';
				getPreload(shadowFixture)
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
								nonExternalsheetsWithShadowId.length - 2
							].sheet,
							'.green',
							'.green{background-color:green;}'
						);
						assertStylesheet(
							nonExternalsheetsWithShadowId[
								nonExternalsheetsWithShadowId.length - 1
							].sheet,
							'.notGreen',
							'.notGreen{background-color:orange;}'
						);
						done();
					})
					.catch(done);
			}
		);

		(shadowSupported ? it : xit)(
			'should return styles from shadow dom (handles mulitple <style> and <link> tags)',
			function(done) {
				var shadow = shadowFixture.attachShadow({ mode: 'open' });
				shadow.innerHTML =
					'<style> @import "https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css"; </style>' +
					'<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/pure/1.0.0/pure.css" />' +
					'<h1>Heading</h1>';
				getPreload(shadowFixture)
					.then(function(results) {
						var sheets = results[0];
						// verify count
						assert.lengthOf(sheets, 6);

						// verify that the last non external sheet with shadowId has green selector
						var nonExternalsheetsWithShadowId = sheets
							.filter(function(s) {
								return !s.isExternal;
							})
							.filter(function(s) {
								return s.shadowId;
							});
						// there are no inline styles in shadowRoot
						assert.lengthOf(nonExternalsheetsWithShadowId, 0);

						// ensure the output of shadowRoot sheet is that of expected external mocked response
						var externalsheetsWithShadowId = sheets
							.filter(function(s) {
								return s.isExternal;
							})
							.filter(function(s) {
								return s.shadowId;
							});
						assertStylesheet(
							externalsheetsWithShadowId[0].sheet,
							'body',
							'body{overflow:auto;}'
						);

						done();
					})
					.catch(done);
			}
		);

		commonTestsForRootAndFrame();
	});

	describe('tests for nested iframe', function() {
		before(function() {
			if (isPhantom) {
				this.skip();
			}
		});

		var frame;

		before(function() {
			frame = document.getElementById('frame1').contentDocument;
		});

		it('should return inline stylesheets defined using <style> tag', function(done) {
			getPreload(frame)
				.then(function(results) {
					var sheets = results[0];
					var nonExternalsheets = sheets.filter(function(s) {
						return !s.isExternal;
					});
					assert.lengthOf(nonExternalsheets, 1);
					done();
				})
				.catch(done);
		});

		commonTestsForRootAndFrame(frame);
	});
});
