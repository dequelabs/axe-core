describe('axe.utils.parseCrossOriginStylesheet', () => {
  let dynamicDoc;
  let convertDataToStylesheet;

  beforeEach(() => {
    dynamicDoc = document.implementation.createHTMLDocument(
      'Dynamic document for testing axe.utils.parseCrossOriginStylesheet'
    );
    convertDataToStylesheet = axe.utils.getStyleSheetFactory(dynamicDoc);
  });

  afterEach(() => {
    dynamicDoc = undefined;
    convertDataToStylesheet = undefined;
  });

  it('returns cross-origin stylesheet', done => {
    const importUrl =
      'https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css';
    const options = {
      rootNode: document,
      shadowId: undefined,
      convertDataToStylesheet: convertDataToStylesheet,
      rootIndex: 1
    };
    const priority = [1, 0];
    const importedUrls = [];
    const isCrossOriginRequest = true;

    axe.utils
      .parseCrossOriginStylesheet(
        importUrl,
        options,
        priority,
        importedUrls,
        isCrossOriginRequest
      )
      .then(data => {
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
      .catch(err => {
        done(err);
      });
  });

  it('rejects when given url to fetch is not found', function (done) {
    this.timeout(axe.constants.preload.timeout + 1000);

    const importUrl =
      'https://make-up-a-website-that-does-not-exist.com/style.css';
    const options = {
      rootNode: document,
      shadowId: undefined,
      convertDataToStylesheet: convertDataToStylesheet,
      rootIndex: 1
    };
    const priority = [1, 0];
    const importedUrls = [];
    const isCrossOriginRequest = true;
    axe.utils
      .parseCrossOriginStylesheet(
        importUrl,
        options,
        priority,
        importedUrls,
        isCrossOriginRequest
      )
      .then(() => {
        done(
          new Error('Expected axe.utils.parseCrossOriginStylesheet to reject.')
        );
      })
      .catch(err => {
        assert.isNotNull(err);
        done();
      });
  });
});
