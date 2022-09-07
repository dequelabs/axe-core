/* global axe */
describe('preload cssom integration test', function () {
  'use strict';

  // axe-core preload timeout is set to 10s so we need a
  // timeout slightly above that to ensure there's enough
  // time to resolve tests that we want to throw
  this.timeout(15000);

  var shadowSupported = axe.testUtils.shadowSupport.v1;
  var styleSheets = {
    crossOriginLinkHref: {
      id: 'crossOriginLinkHref',
      href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
    },
    crossOriginLinkHrefMediaPrint: {
      id: 'crossOriginLinkHrefMediaPrint',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css',
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
  var stylesForPage;
  var nestedFrame;

  before(function (done) {
    axe.testUtils.awaitNestedLoad(function () {
      nestedFrame = document.getElementById('frame1').contentDocument;
      done();
    });
  });

  function attachStylesheets(options, callback) {
    axe.testUtils
      .addStyleSheets(options.styles, options.root)
      .then(function () {
        callback();
      })
      .catch(function (error) {
        callback(new Error('Could not load stylesheets for testing. ' + error));
      });
  }

  function detachStylesheets(done) {
    if (!stylesForPage) {
      done();
    }
    axe.testUtils
      .removeStyleSheets(stylesForPage)
      .then(function () {
        done();
        stylesForPage = undefined;
      })
      .catch(function (err) {
        done(err);
        stylesForPage = undefined;
      });
  }

  function getPreloadCssom(root) {
    var treeRoot = axe.utils.getFlattenedTree(root ? root : document);
    return axe.utils.preloadCssom({ treeRoot: treeRoot });
  }

  function commonTestsForRootNodeAndNestedFrame(root) {
    it('returns cross-origin stylesheet', function (done) {
      stylesForPage = [styleSheets.crossOriginLinkHref];
      attachStylesheets(
        {
          root: root,
          styles: stylesForPage
        },
        function (err) {
          if (err) {
            done(err);
          }
          getPreloadCssom(root)
            .then(function (sheets) {
              assert.lengthOf(sheets, 1);
              var sheetData = sheets[0].sheet;
              axe.testUtils.assertStylesheet(
                sheetData,
                ':root',
                sheetData.cssRules[0].cssText,
                true
              );
              done();
            })
            .catch(function () {
              done(new Error('Expected getPreload to resolve.'));
            });
        },
        root
      );
    });

    it('returns no stylesheets when cross-origin stylesheets are of media=print', function (done) {
      stylesForPage = [styleSheets.crossOriginLinkHrefMediaPrint];
      attachStylesheets(
        {
          root: root,
          styles: stylesForPage
        },
        function (err) {
          if (err) {
            done(err);
          }
          getPreloadCssom(root)
            .then(function (sheets) {
              assert.lengthOf(sheets, 0);
              done();
            })
            .catch(function () {
              done(new Error('Expected getPreload to resolve.'));
            });
        },
        root
      );
    });

    it('throws if cross-origin stylesheet fail to load', function (done) {
      stylesForPage = [
        {
          id: 'nonExistingStylesheet',
          text: '@import "import-non-existing-cross-origin.css";'
        }
      ];
      attachStylesheets(
        {
          root: root,
          styles: stylesForPage
        },
        function (err) {
          if (err) {
            done(err);
          }
          getPreloadCssom(root)
            .then(function () {
              done(new Error('Expected getPreload to reject.'));
            })
            .catch(function (err) {
              assert.isDefined(err);
              done();
            });
        },
        root
      );
    });
  }

  describe('tests for root (document)', function () {
    var shadowFixture;

    beforeEach(function () {
      var shadowNode = document.createElement('div');
      shadowNode.id = 'shadow-fixture';
      document.body.appendChild(shadowNode);
      shadowFixture = document.getElementById('shadow-fixture');
    });

    afterEach(function (done) {
      if (shadowFixture) {
        document.body.removeChild(shadowFixture);
      }
      detachStylesheets(done);
    });

    it('returns stylesheets defined via <style> tag', function (done) {
      stylesForPage = [styleSheets.styleTag];
      attachStylesheets({ styles: stylesForPage }, function (err) {
        if (err) {
          done(err);
        }
        getPreloadCssom()
          .then(function (sheets) {
            assert.lengthOf(sheets, 1);
            var sheetData = sheets[0].sheet;
            axe.testUtils.assertStylesheet(
              sheetData,
              '.inline-css-test',
              stylesForPage[0].text
            );
            done();
          })
          .catch(function () {
            done(new Error('Expected getPreload to resolve.'));
          });
      });
    });

    it('returns stylesheets with in same-origin', function (done) {
      stylesForPage = [styleSheets.styleTagWithOneImport];
      attachStylesheets({ styles: stylesForPage }, function (err) {
        if (err) {
          done(err);
        }
        getPreloadCssom()
          .then(function (sheets) {
            assert.lengthOf(sheets, 1);
            var nonCrossOriginSheets = sheets.filter(function (s) {
              return !s.isCrossOrigin;
            });
            assert.lengthOf(nonCrossOriginSheets, 1);
            axe.testUtils.assertStylesheet(
              nonCrossOriginSheets[0].sheet,
              '.style-from-base-css',
              '.style-from-base-css { font-size: 100%; }'
            );
            done();
          })
          .catch(function () {
            done(new Error('Expected getPreload to resolve.'));
          });
      });
    });

    (shadowSupported ? it : xit)(
      'returns styles from shadow DOM (handles @import in <style>)',
      function (done) {
        var shadow = shadowFixture.attachShadow({ mode: 'open' });
        shadow.innerHTML =
          '<style>' +
          // stylesheet -> 1
          '@import "https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css";' +
          // stylesheet -> 2
          '.green { background-color: green; } ' +
          '</style>' +
          '<div class="initialism">Some text</div>';
        getPreloadCssom(shadowFixture)
          .then(function (sheets) {
            assert.lengthOf(sheets, 2);
            var nonCrossOriginSheetsWithInShadowDOM = sheets
              .filter(function (s) {
                return !s.isCrossOrigin;
              })
              .filter(function (s) {
                return s.shadowId;
              });
            axe.testUtils.assertStylesheet(
              nonCrossOriginSheetsWithInShadowDOM[
                nonCrossOriginSheetsWithInShadowDOM.length - 1
              ].sheet,
              '.green',
              '.green{background-color:green;}'
            );
            done();
          })
          .catch(function () {
            done(new Error('Expected getPreload to resolve.'));
          });
      }
    );

    (shadowSupported ? it : xit)(
      'returns styles from base document and shadow DOM with right priority',
      function (done) {
        var shadow = shadowFixture.attachShadow({ mode: 'open' });
        shadow.innerHTML =
          '<style>' +
          // stylesheet -> 1 -> inside shadow DOM
          '@import "base.css"' +
          '</style>' +
          '<h1>Heading</h1>';

        // sheet appended to root document
        stylesForPage = [styleSheets.styleTag];
        attachStylesheets({ styles: stylesForPage }, function (err) {
          if (err) {
            done(err);
          }
          getPreloadCssom(shadowFixture)
            .then(function (sheets) {
              assert.lengthOf(sheets, 2);

              var shadowDomStyle = sheets.filter(function (s) {
                return s.shadowId;
              })[0];
              axe.testUtils.assertStylesheet(
                shadowDomStyle.sheet,
                '.style-from-base-css',
                '.style-from-base-css { font-size: 100%; }'
              );

              var rootDocumentStyle = sheets.filter(function (s) {
                return !s.shadowId;
              })[0];
              assert.isAbove(
                shadowDomStyle.priority[0],
                rootDocumentStyle.priority[0]
              );
              done();
            })
            .catch(function () {
              done(new Error('Expected getPreload to resolve.'));
            });
        });
      }
    );

    it('returns styles from various @import(ed) styles from an @import(ed) stylesheet', function (done) {
      stylesForPage = [
        styleSheets.styleTagWithMultipleImports // this imports 2 other stylesheets
      ];
      attachStylesheets({ styles: stylesForPage }, function (err) {
        if (err) {
          done(err);
        }
        getPreloadCssom()
          .then(function (sheets) {
            assert.lengthOf(sheets, 2);
            var nonCrossOriginSheets = sheets.filter(function (s) {
              return !s.isCrossOrigin;
            });
            assert.lengthOf(nonCrossOriginSheets, 2);
            axe.testUtils.assertStylesheet(
              nonCrossOriginSheets[0].sheet,
              '.style-from-multiple-import-2-css',
              '.style-from-multiple-import-2-css { font-size: 100%; }'
            );
            axe.testUtils.assertStylesheet(
              nonCrossOriginSheets[1].sheet,
              '.style-from-multiple-import-3-css',
              '.style-from-multiple-import-3-css { font-size: 100%; }'
            );
            done();
          })
          .catch(function () {
            done(new Error('Expected getPreload to resolve.'));
          });
      });
    });

    it('returns style from nested @import (3 levels deep)', function (done) {
      stylesForPage = [styleSheets.styleTagWithNestedImports];
      attachStylesheets({ styles: stylesForPage }, function (err) {
        if (err) {
          done(err);
        }
        getPreloadCssom()
          .then(function (sheets) {
            assert.lengthOf(sheets, 1);
            var nonCrossOriginSheets = sheets.filter(function (s) {
              return !s.isCrossOrigin;
            });
            assert.lengthOf(nonCrossOriginSheets, 1);
            axe.testUtils.assertStylesheet(
              nonCrossOriginSheets[0].sheet,
              '.style-from-nested-import-3-css',
              '.style-from-nested-import-3-css { font-size: inherit; }'
            );
            done();
          })
          .catch(function () {
            done(new Error('Expected getPreload to resolve.'));
          });
      });
    });

    it('returns style from cyclic @import (exits recursion successfully)', function (done) {
      stylesForPage = [styleSheets.styleTagWithCyclicImports];
      attachStylesheets({ styles: stylesForPage }, function (err) {
        if (err) {
          done(err);
        }
        getPreloadCssom()
          .then(function (sheets) {
            assert.lengthOf(sheets, 1);
            axe.testUtils.assertStylesheet(
              sheets[0].sheet,
              '.style-from-cyclic-import-2-css',
              '.style-from-cyclic-import-2-css { font-family: inherit; }'
            );
            done();
          })
          .catch(function () {
            done(new Error('Expected getPreload to resolve.'));
          });
      });
    });

    it('returns style from cyclic @import which only imports one cross-origin stylesheet', function (done) {
      stylesForPage = [styleSheets.styleTagWithCyclicCrossOriginImports];
      attachStylesheets({ styles: stylesForPage }, function (err) {
        if (err) {
          done(err);
        }
        getPreloadCssom()
          .then(function (sheets) {
            assert.lengthOf(sheets, 1);
            axe.testUtils.assertStylesheet(
              sheets[0].sheet,
              '.container',
              '.container { position: relative; width: 100%; max-width: 960px; margin: 0px auto; padding: 0px 20px; box-sizing: border-box; }'
            );
            done();
          })
          .catch(function () {
            done(new Error('Expected getPreload to resolve.'));
          });
      });
    });

    commonTestsForRootNodeAndNestedFrame();
  });

  describe('tests for nested document', function () {
    afterEach(function (done) {
      detachStylesheets(done);
    });

    it('returns styles defined using <style> tag', function (done) {
      getPreloadCssom(nestedFrame)
        .then(function (sheets) {
          assert.lengthOf(sheets, 2);

          var nonCrossOriginSheet = sheets.filter(function (s) {
            return !s.isCrossOrigin;
          })[0].sheet;
          axe.testUtils.assertStylesheet(
            nonCrossOriginSheet,
            '.style-from-nested-iframe',
            '.style-from-nested-iframe {font-size: inherit; }'
          );
          done();
        })
        .catch(function () {
          done(new Error('Expected getPreload to resolve.'));
        });
    });

    commonTestsForRootNodeAndNestedFrame(nestedFrame);
  });
});
