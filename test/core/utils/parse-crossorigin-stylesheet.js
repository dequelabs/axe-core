describe('axe.utils.parseCrossOriginStylesheet', function () {
  'use strict';

  var dynamicDoc;
  var convertDataToStylesheet;

  beforeEach(function () {
    dynamicDoc = document.implementation.createHTMLDocument(
      'Dynamic document for testing axe.utils.parseCrossOriginStylesheet'
    );
    convertDataToStylesheet = axe.utils.getStyleSheetFactory(dynamicDoc);
  });

  afterEach(function () {
    dynamicDoc = undefined;
    convertDataToStylesheet = undefined;
  });

  it('returns cross-origin stylesheet', function (done) {
    var importUrl =
      'https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css';
    var options = {
      rootNode: document,
      shadowId: undefined,
      convertDataToStylesheet: convertDataToStylesheet,
      rootIndex: 1
    };
    var priority = [1, 0];
    var importedUrls = [];
    var isCrossOriginRequest = true;

    axe.utils
      .parseCrossOriginStylesheet(
        importUrl,
        options,
        priority,
        importedUrls,
        isCrossOriginRequest
      )
      .then(function (data) {
        assert.isDefined(data);
        assert.isDefined(data.sheet);

        assert.equal(data.isCrossOrigin, isCrossOriginRequest);
        assert.deepEqual(data.priority, priority);

        assert.property(data.sheet, 'cssRules');
        assert.isAtLeast(data.sheet.cssRules.length, 1);

        axe.testUtils.assertStylesheet(
          data.sheet,
          '.container',
          '.container { position: relative; width: 100%; max-width: 960px; margin: 0px auto; padding: 0px 20px; box-sizing: border-box; }'
        );
        done();
      })
      .catch(function (err) {
        done(err);
      });
  });

  it('rejects when given url to fetch is not found', function (done) {
    this.timeout(axe.constants.preload.timeout + 1000);

    var importUrl =
      'https://make-up-a-website-that-does-not-exist.com/style.css';
    var options = {
      rootNode: document,
      shadowId: undefined,
      convertDataToStylesheet: convertDataToStylesheet,
      rootIndex: 1
    };
    var priority = [1, 0];
    var importedUrls = [];
    var isCrossOriginRequest = true;
    axe.utils
      .parseCrossOriginStylesheet(
        importUrl,
        options,
        priority,
        importedUrls,
        isCrossOriginRequest
      )
      .then(function () {
        done(
          new Error('Expected axe.utils.parseCrossOriginStylesheet to reject.')
        );
      })
      .catch(function (err) {
        assert.isNotNull(err);
        done();
      });
  });
});
