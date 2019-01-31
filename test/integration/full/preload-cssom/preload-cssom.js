/* global axe, Promise */
describe('preload cssom integration test', function() {
	'use strict';

	before(function(done) {
		if (isPhantom) {
			// if `phantomjs` -> skip `suite`
			this.skip();
		}
		axe.testUtils.awaitNestedLoad(done);
	});

	var shadowSupported = axe.testUtils.shadowSupport.v1;
	var isPhantom = window.PHANTOMJS ? true : false;
	var styleSheets = {
		crossOriginLinkHref: {
			id: 'crossOriginLinkHref',
			href:
				'https://stackpath.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
		},
		crossOriginLinkHrefMediaPrint: {
			id: 'crossOriginLinkHrefMediaPrint',
			href:
				'https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css',
			mediaPrint: true
		},
		styleTag: {
			id: 'styleTag',
			text: '.inline-css-test{font-size:inherit;}'
		},
		styleTagWithOneImport: {
			id: 'styleTagWithOneImport',
			text: '@import "base.css";'
		},
		styleTagWithMultipleImports: {
			id: 'styleTagWithMultipleImports',
			text: '@import "multiple-import-1.css";'
		},
		styleTagWithNestedImports: {
			id: 'styleTagWithNestedImports',
			text: '@import "nested-import-1.css";'
		},
		styleTagWithCyclicImports: {
			id: 'styleTagWithCyclicImports',
			text: '@import "cyclic-import-1.css";'
		},
		styleTagWithCyclicCrossOriginImports: {
			id: 'styleTagWithCyclicCrossOriginImports',
			text: '@import "cyclic-cross-origin-import-1.css";'
		}
	};

	function assertStylesheet(sheet, selectorText, cssText, includes) {
		assert.isDefined(sheet);
		assert.property(sheet, 'cssRules');
		if (includes) {
			assert.isTrue(cssText.includes(selectorText));
		} else {
			assert.equal(sheet.cssRules[0].selectorText, selectorText);
			assert.equal(
				sheet.cssRules[0].cssText.replace(/\s/g, ''),
				cssText.replace(/\s/g, '')
			);
		}
	}

	function attachStylesheets(options, callback) {
		axe.testUtils
			.addStyleSheets(options.styles, options.root)
			.then(function() {
				callback();
			})
			.catch(function(error) {
				callback(new Error('Could not load stylesheets for testing. ' + error));
			});
	}

	function getPreload(root) {
		var config = {
			asset: 'cssom',
			timeout: 10000,
			treeRoot: axe.utils.getFlattenedTree(root ? root : document)
		};
		return axe.utils.preloadCssom(config);
	}

	function commonTestsForRootNodeAndNestedFrame(root) {
		it('returns cross-origin stylesheet', function(done) {
			var stylesForPage = [styleSheets.crossOriginLinkHref];
			attachStylesheets(
				{
					root,
					styles: stylesForPage
				},
				function(err) {
					if (err) {
						done(err);
					}
					getPreload(root)
						.then(function(results) {
							var sheets = results[0];
							assert.lengthOf(sheets, 1);
							var sheetData = sheets[0].sheet;
							assertStylesheet(
								sheetData,
								':root',
								sheetData.cssRules[0].cssText,
								true
							);
							axe.testUtils.removeStyleSheets(stylesForPage);
							done();
						})
						.catch(done);
				},
				root
			);
		});

		it('returns no stylesheets when cross-origin stylesheets are of media=print', function(done) {
			var stylesForPage = [styleSheets.crossOriginLinkHrefMediaPrint];
			attachStylesheets(
				{
					root,
					styles: stylesForPage
				},
				function(err) {
					if (err) {
						done(err);
					}
					getPreload()
						.then(function(results) {
							var sheets = results[0];
							assert.lengthOf(sheets, 0);
							axe.testUtils.removeStyleSheets(stylesForPage);
							done();
						})
						.catch(done);
				},
				root
			);
		});

		it('throws if cross-origin stylesheet request timeouts', function(done) {
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
					assert.equal(error.message, 'timeout of 1ms exceeded'); // <-this message comes from axios
					if (!doneCalled) {
						doneCalled = true;
						done();
					}
				});
		});

		it.only('throws if cross-origin stylesheet fail to load', function(done) {
			attachStylesheets(
				{
					root,
					styles: [
						{
							id: 'nonExistingStylesheet',
							text: '@import "import-non-existing-cross-origin.css";'
						}
					]
				},
				function(err) {
					if (err) {
						done(err);
					}
					getPreload().catch(function(error) {
						assert.equal(error.message, 'Network Error'); //<- message from `axios`
						done();
					});
				},
				root
			);
		});
	}

	describe('tests for root (document)', function() {
		before(function() {
			if (isPhantom) {
				// if `phantomjs` -> skip `suite`
				this.skip();
			}
		});

		var shadowFixture;

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

		it('returns stylesheets defined via <style> tag', function(done) {
			var stylesForPage = [styleSheets.styleTag];
			attachStylesheets({ styles: stylesForPage }, function(err) {
				if (err) {
					done(err);
				}
				getPreload()
					.then(function(results) {
						var sheets = results[0];
						assert.lengthOf(sheets, 1);
						var sheetData = sheets[0].sheet;
						assertStylesheet(
							sheetData,
							'.inline-css-test',
							stylesForPage[0].text
						);
						axe.testUtils.removeStyleSheets(stylesForPage);
						done();
					})
					.catch(done);
			});
		});

		it('returns stylesheets with in same-origin', function(done) {
			var stylesForPage = [styleSheets.styleTagWithOneImport];
			attachStylesheets({ styles: stylesForPage }, function(err) {
				if (err) {
					done(err);
				}
				getPreload()
					.then(function(results) {
						var sheets = results[0];
						assert.lengthOf(sheets, 1);
						var nonCrossOriginSheets = sheets.filter(function(s) {
							return !s.isCrossOrigin;
						});
						assert.lengthOf(nonCrossOriginSheets, 1);
						assertStylesheet(
							nonCrossOriginSheets[0].sheet,
							'.base-style',
							'.base-style { font-size: 100%; }'
						);
						axe.testUtils.removeStyleSheets(stylesForPage);
						done();
					})
					.catch(done);
			});
		});

		(shadowSupported ? it : xit)(
			'returns styles from shadow DOM (handles @import in <style>)',
			function(done) {
				var shadow = shadowFixture.attachShadow({ mode: 'open' });
				shadow.innerHTML =
					'<style>' +
					// stylesheet -> 1
					'@import "https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css";' +
					// stylesheet -> 2
					'.green { background-color: green; } ' +
					'</style>' +
					'<div class="initialism">Some text</div>';
				getPreload(shadowFixture)
					.then(function(results) {
						var sheets = results[0];
						assert.lengthOf(sheets, 2);

						var nonCrossOriginSheetsWithInShadowDOM = sheets
							.filter(function(s) {
								return !s.isCrossOrigin;
							})
							.filter(function(s) {
								return s.shadowId;
							});
						assertStylesheet(
							nonCrossOriginSheetsWithInShadowDOM[
								nonCrossOriginSheetsWithInShadowDOM.length - 1
							].sheet,
							'.green',
							'.green{background-color:green;}'
						);
						done();
					})
					.catch(done);
			}
		);

		(shadowSupported ? it : xit)(
			'returns styles from base document and shadow DOM with right priority',
			function(done) {
				var shadow = shadowFixture.attachShadow({ mode: 'open' });
				shadow.innerHTML =
					'<style>' +
					// stylesheet -> 1 -> inside shadow DOM
					'@import "base.css"' +
					'</style>' +
					'<h1>Heading</h1>';

				// sheet appended to root document
				var stylesForPage = [styleSheets.styleTag];
				attachStylesheets({ styles: stylesForPage }, function(err) {
					if (err) {
						done(err);
					}
					getPreload(shadowFixture)
						.then(function(results) {
							var sheets = results[0];
							assert.lengthOf(sheets, 2);

							var shadowDomStyle = sheets.filter(function(s) {
								return s.shadowId;
							})[0];
							assertStylesheet(
								shadowDomStyle.sheet,
								'.base-style',
								'.base-style { font-size: 100%; }'
							);

							var rootDocumentStyle = sheets.filter(function(s) {
								return !s.shadowId;
							})[0];
							assert.isAbove(
								shadowDomStyle.priority[0],
								rootDocumentStyle.priority[0]
							);

							axe.testUtils.removeStyleSheets(stylesForPage);
							done();
						})
						.catch(done);
				});
			}
		);

		it('returns styles from various @import(ed) styles from an @import(ed) stylesheet', function(done) {
			var stylesForPage = [
				styleSheets.styleTagWithMultipleImports // this imports 2 other stylesheets
			];
			attachStylesheets({ styles: stylesForPage }, function(err) {
				if (err) {
					done(err);
				}
				getPreload()
					.then(function(results) {
						var sheets = results[0];
						assert.lengthOf(sheets, 2);
						var nonCrossOriginSheets = sheets.filter(function(s) {
							return !s.isCrossOrigin;
						});
						assert.lengthOf(nonCrossOriginSheets, 2);
						assertStylesheet(
							nonCrossOriginSheets[0].sheet,
							'.multiple-import-1',
							'.multiple-import-1 { font-size: 100%; }'
						);
						axe.testUtils.removeStyleSheets(stylesForPage);
						done();
					})
					.catch(done);
			});
		});

		it('returns style from nested @import (3 levels deep)', function(done) {
			var stylesForPage = [styleSheets.styleTagWithNestedImports];
			attachStylesheets({ styles: stylesForPage }, function(err) {
				if (err) {
					done(err);
				}
				getPreload()
					.then(function(results) {
						var sheets = results[0];
						assert.lengthOf(sheets, 1);
						var nonCrossOriginSheets = sheets.filter(function(s) {
							return !s.isCrossOrigin;
						});
						assert.lengthOf(nonCrossOriginSheets, 1);
						assertStylesheet(
							nonCrossOriginSheets[0].sheet,
							'body::after',
							'body::after { content: "I-am-from-the-3rd-nested-import-stylesheet"; }'
						);
						axe.testUtils.removeStyleSheets(stylesForPage);
						done();
					})
					.catch(done);
			});
		});

		it('returns style from cyclic @import (exits recursion successfully)', function(done) {
			var stylesForPage = [styleSheets.styleTagWithCyclicImports];
			attachStylesheets({ styles: stylesForPage }, function(err) {
				if (err) {
					done(err);
				}
				getPreload()
					.then(function(results) {
						var sheets = results[0];
						assert.lengthOf(sheets, 1);
						assertStylesheet(
							sheets[0].sheet,
							'.cycle-style',
							'.cycle-style { font-family: inherit; }'
						);
						axe.testUtils.removeStyleSheets(stylesForPage);
						done();
					})
					.catch(done);
			});
		});

		it('returns style from cyclic @import which only imports one cross-origin stylesheet', function(done) {
			var stylesForPage = [styleSheets.styleTagWithCyclicCrossOriginImports];
			attachStylesheets({ styles: stylesForPage }, function(err) {
				if (err) {
					done(err);
				}
				getPreload()
					.then(function(results) {
						var sheets = results[0];
						assert.lengthOf(sheets, 1);
						assertStylesheet(
							sheets[0].sheet,
							'.container',
							'.container { position: relative; width: 100%; max-width: 960px; margin: 0px auto; padding: 0px 20px; box-sizing: border-box; }'
						);
						axe.testUtils.removeStyleSheets(stylesForPage);
						done();
					})
					.catch(done);
			});
		});

		commonTestsForRootNodeAndNestedFrame();
	});

	describe('tests for nested document', function() {
		var frame;

		before(function() {
			if (isPhantom) {
				// if `phantomjs` -> skip `suite`
				this.skip();
			}
			frame = document.getElementById('frame1').contentDocument;
		});

		it('returns styles defined using <style> tag', function(done) {
			getPreload(frame)
				.then(function(results) {
					var sheets = results[0];
					assert.lengthOf(sheets, 2);

					var nonCrossOriginSheet = sheets.filter(function(s) {
						return !s.isCrossOrigin;
					})[0].sheet;
					assertStylesheet(
						nonCrossOriginSheet,
						'.inline-frame-css-test',
						'.inline-frame-css-test {font-size: inherit; }'
					);
					done();
				})
				.catch(done);
		});

		commonTestsForRootNodeAndNestedFrame(frame);
	});
});
