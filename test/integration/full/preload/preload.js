/* global axe, Promise */

describe('axe.utils.preload integration test', function () {
  'use strict';

  var styleSheets = {
    crossOriginLinkHref: {
      id: 'crossOriginLinkHref',
      href: 'https://unpkg.com/gutenberg-css@0.4'
    },
    crossOriginDoesNotExist: {
      id: 'styleTag',
      text: '@import "https://i-do-not-exist.css"'
    },
    crossOriginLinkHrefMediaPrint: {
      id: 'crossOriginLinkHrefMediaPrint',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css',
      mediaPrint: true
    },
    styleTag: {
      id: 'styleTag',
      text: '.inline-css-test{font-size:inherit;}'
    }
  };
  var stylesForPage;

  function attachStylesheets(options, callback) {
    axe.testUtils
      .addStyleSheets(options.styles, document)
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

  function getPreload(timeout) {
    axe._tree = axe.utils.getFlattenedTree(document);
    // options.treeRoot = treeRoot;
    return axe.utils.preload({
      preload: {
        assets: ['cssom'],
        timeout: timeout
      }
    });
  }

  afterEach(function (done) {
    axe._tree = undefined;
    detachStylesheets(done);
  });

  it('returns preloaded assets defined via <style> tag', function (done) {
    stylesForPage = [styleSheets.styleTag];
    attachStylesheets({ styles: stylesForPage }, function (err) {
      if (err) {
        done(err);
      }
      getPreload()
        .then(function (preloadedAssets) {
          assert.property(preloadedAssets, 'cssom');
          assert.lengthOf(preloadedAssets.cssom, 1);
          var sheetData = preloadedAssets.cssom[0].sheet;
          axe.testUtils.assertStylesheet(
            sheetData,
            '.inline-css-test',
            stylesForPage[0].text
          );
          done();
        })
        .catch(done);
    });
  });

  it('returns NO preloaded CSSOM assets when requested stylesheets are of media=print', function (done) {
    stylesForPage = [styleSheets.crossOriginLinkHrefMediaPrint];
    attachStylesheets({ styles: stylesForPage }, function (err) {
      if (err) {
        done(err);
      }
      getPreload()
        .then(function (preloadedAssets) {
          assert.property(preloadedAssets, 'cssom');
          assert.lengthOf(preloadedAssets.cssom, 0);
          done();
        })
        .catch(done);
    });
  });

  it.skip('returns NO preloaded CSSOM assets when requested stylesheet does not exist`', function (done) {
    stylesForPage = [styleSheets.crossOriginDoesNotExist];
    attachStylesheets({ styles: stylesForPage }, function (err) {
      if (err) {
        done(err);
      }
      getPreload()
        .then(function () {
          done(new Error('Not expecting to complete the promise'));
        })
        .catch(function (err) {
          assert.isNotNull(err);
          assert.isTrue(!err.message.includes('Preload assets timed out'));
          done();
        })
        .catch(done);
    });
  });

  it.skip('rejects preload function when timed out before fetching assets', function (done) {
    stylesForPage = [styleSheets.crossOriginLinkHref];

    var origPreloadCssom = axe.utils.preloadCssom;
    axe.utils.preloadCssom = function () {
      return new Promise(function (res) {
        setTimeout(function () {
          res(true);
        }, 2000);
      });
    };

    attachStylesheets({ styles: stylesForPage }, function (err) {
      if (err) {
        done(err);
      }
      getPreload(1)
        .then(function () {
          done(new Error('Not expecting to complete the promise'));
        })
        .catch(function (err) {
          assert.isNotNull(err);
          assert.isTrue(err.message.includes('Preload assets timed out'));
          axe.utils.preloadCssom = origPreloadCssom;
          done();
        })
        .catch(function (e) {
          axe.utils.preloadCssom = origPreloadCssom;
          done(e);
        });
    });
  });

  describe('verify preloaded assets via axe.run against custom rules', function () {
    function customCheckEvalFn(node, options, virtualNode, context) {
      // populate the data here which is asserted in tests
      this.data(context);
      return true;
    }

    beforeEach(function (done) {
      /**
       * Load custom rule & check
       * -> one check is preload dependent
       * -> another check is not preload dependent
       */
      axe._load({
        rules: [
          {
            // this rule is not preload dependent and can run immediately
            id: 'run-now-rule',
            selector: 'div#run-now-target',
            any: ['check-context-exists']
          },
          {
            // this rule requires preload and will run after preload assets are ready
            id: 'run-later-rule',
            selector: 'div#run-later-target',
            any: ['check-context-has-assets'],
            preload: {
              assets: ['cssom']
            }
          }
        ],
        checks: [
          {
            id: 'check-context-exists',
            evaluate: customCheckEvalFn
          },
          {
            id: 'check-context-has-assets',
            evaluate: customCheckEvalFn
          }
        ]
      });

      // load stylesheets
      stylesForPage = [
        styleSheets.crossOriginLinkHref,
        styleSheets.crossOriginLinkHrefMediaPrint,
        styleSheets.styleTag
      ];
      attachStylesheets({ styles: stylesForPage }, done);
    });

    after(function (done) {
      detachStylesheets(done);
    });

    it("returns preloaded assets to the check's evaluate fn for the rule which has `preload:true`", function (done) {
      axe.run(
        {
          runOnly: {
            type: 'rule',
            values: ['run-later-rule']
          },
          preload: true
        },
        function (err, res) {
          assert.isNull(err);
          assert.isDefined(res);
          assert.property(res, 'passes');
          assert.lengthOf(res.passes, 1);

          var checkData = res.passes[0].nodes[0].any[0].data;
          assert.property(checkData, 'cssom');

          var cssom = checkData.cssom;

          // ignores all media='print' styleSheets
          assert.lengthOf(cssom, 2);

          // there should be no external sheet returned
          var crossOriginSheet = cssom.filter(function (s) {
            return s.isCrossOrigin;
          });
          assert.lengthOf(crossOriginSheet, 1);

          // verify content of stylesheet
          var inlineStylesheet = cssom.filter(function (s) {
            return s.sheet.cssRules.length === 1 && !s.isCrossOrigin;
          })[0].sheet;
          axe.testUtils.assertStylesheet(
            inlineStylesheet,
            '.inline-css-test',
            '.inline-css-test{font-size:inherit;}'
          );

          done();
        }
      );
    });

    it("returns NO preloaded assets to the check which does not require preload'", function (done) {
      axe.run(
        {
          runOnly: {
            type: 'rule',
            values: ['run-now-rule']
          },
          preload: true
        },
        function (err, res) {
          assert.isNull(err);
          assert.isDefined(res);
          assert.property(res, 'passes');
          assert.lengthOf(res.passes, 1);

          var checkData = res.passes[0].nodes[0].any[0];
          assert.notProperty(checkData, 'cssom');
          done();
        }
      );
    });
  });
});
