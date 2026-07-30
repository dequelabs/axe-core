describe('axe.utils.parseSameOriginStylesheet', () => {
  let stylesForPage;
  const styleSheets = {
    emptyStyleTag: {
      id: 'emptyStyleTag',
      text: ''
    },
    styleTagWithOneImport: {
      id: 'styleTagWithOneImport',
      text: '@import "../integration/full/preload-cssom/base.css";'
    },
    inlineStyle: {
      id: 'inlineStyle',
      text: '.inline-css { font-weight:normal; }'
    }
  };
  let dynamicDoc;
  let convertDataToStylesheet;

  beforeEach(() => {
    dynamicDoc = document.implementation.createHTMLDocument(
      'Dynamic document for testing axe.utils.parseSameOriginStylesheet'
    );
    convertDataToStylesheet = axe.utils.getStyleSheetFactory(dynamicDoc);
  });

  afterEach(done => {
    dynamicDoc = undefined;
    convertDataToStylesheet = undefined;
    axe.testUtils.removeStyleSheets(stylesForPage).then(() => {
      done();
      stylesForPage = undefined;
    });
  });

  it('returns empty results when given sheet has no cssRules', done => {
    // add style that has no styles
    stylesForPage = [styleSheets.emptyStyleTag];

    axe.testUtils.addStyleSheets(stylesForPage).then(() => {
      // get recently added sheet
      const sheet = Array.from(document.styleSheets).filter(styleSheet => {
        return styleSheet.ownerNode.id === styleSheets.emptyStyleTag.id;
      })[0];
      // parse sheet
      const options = {
        rootNode: document,
        shadowId: undefined,
        convertDataToStylesheet: convertDataToStylesheet
      };
      const priority = [1, 0];
      const importedUrls = [];
      const isCrossOriginRequest = false;
      axe.utils
        .parseSameOriginStylesheet(
          sheet,
          options,
          priority,
          importedUrls,
          false
        )
        .then(data => {
          assert.isDefined(data);
          assert.isDefined(data.sheet);
          assert.equal(data.isCrossOrigin, isCrossOriginRequest);
          assert.deepEqual(data.priority, priority);
          assert.property(data.sheet, 'cssRules');
          assert.isTrue(data.sheet.cssRules.length === 0);
          done();
        });
    });
  });

  it('returns @import rule specified in the stylesheet', done => {
    // add style that has @import style
    stylesForPage = [styleSheets.styleTagWithOneImport];

    axe.testUtils.addStyleSheets(stylesForPage).then(() => {
      // get recently added sheet
      const sheet = Array.from(document.styleSheets).filter(styleSheet => {
        return styleSheet.ownerNode.id === styleSheets.styleTagWithOneImport.id;
      })[0];
      // parse sheet
      const options = {
        rootNode: document,
        shadowId: undefined,
        convertDataToStylesheet: convertDataToStylesheet
      };
      const priority = [1, 0];
      const importedUrls = [];
      const isCrossOriginRequest = false;
      axe.utils
        .parseSameOriginStylesheet(
          sheet,
          options,
          priority,
          importedUrls,
          false
        )
        .then(data => {
          assert.isDefined(data);

          const parsedImportData = data[0];
          assert.isDefined(parsedImportData.sheet);
          assert.equal(parsedImportData.isCrossOrigin, isCrossOriginRequest);
          // as @import is a style with in @imported sheet, an additional priority is appended.
          assert.deepEqual(parsedImportData.priority, [1, 0, 0]);
          assert.property(parsedImportData.sheet, 'cssRules');
          assert.isAtLeast(parsedImportData.sheet.cssRules.length, 1);
          axe.testUtils.assertStylesheet(
            parsedImportData.sheet,
            '.style-from-base-css',
            '.style-from-base-css {font-size: 100%; }'
          );
          done();
        });
    });
  });

  it('resolves a relative @import url against the url of the stylesheet', done => {
    // no stylesheet is added to the page, the sheet below is passed directly
    stylesForPage = [];

    const cssomDir = '/test/integration/full/preload-cssom/';
    // only `href` and `cssRules` are used by `parseSameOriginStylesheet`.
    // the sheet is in another directory than the document, so resolving the
    // `@import` against the document url would request the wrong file.
    const sheet = {
      href: new URL(cssomDir + 'style-with-import.css', location.origin).href,
      cssRules: [{ type: 3, href: 'base.css' }]
    };
    const options = {
      rootNode: document,
      shadowId: undefined,
      convertDataToStylesheet: convertDataToStylesheet
    };

    const importedUrls = [];
    axe.utils
      .parseSameOriginStylesheet(sheet, options, [1, 0], importedUrls, false)
      .then(data => {
        assert.deepEqual(importedUrls, [
          new URL(cssomDir + 'base.css', location.origin).href
        ]);
        axe.testUtils.assertStylesheet(
          data[0].sheet,
          '.style-from-base-css',
          '.style-from-base-css {font-size: 100%; }'
        );
        done();
      })
      .catch(done);
  });

  it('resolves a relative @import url against the document url for an inline style', done => {
    stylesForPage = [];

    // `href` is null for an inline `<style>` element
    const sheet = {
      href: null,
      cssRules: [
        { type: 3, href: '../integration/full/preload-cssom/base.css' }
      ]
    };
    const options = {
      rootNode: document,
      shadowId: undefined,
      convertDataToStylesheet: convertDataToStylesheet
    };

    const importedUrls = [];
    axe.utils
      .parseSameOriginStylesheet(sheet, options, [1, 0], importedUrls, false)
      .then(() => {
        assert.deepEqual(importedUrls, [
          new URL(
            '../integration/full/preload-cssom/base.css',
            document.baseURI
          ).href
        ]);
        done();
      })
      .catch(done);
  });

  it('leaves the @import url as written when there is no URL constructor', done => {
    stylesForPage = [];

    const importHref = '../integration/full/preload-cssom/base.css';
    const sheet = {
      href: null,
      cssRules: [{ type: 3, href: importHref }]
    };
    const options = {
      rootNode: document,
      shadowId: undefined,
      convertDataToStylesheet: convertDataToStylesheet
    };

    // IE11 has `window.URL`, but it cannot be used as a constructor
    const nativeUrl = window.URL;
    window.URL = {};

    const importedUrls = [];
    // the url is resolved while `parseSameOriginStylesheet` runs, so `URL` can
    // be put back as soon as the call returns
    const promise = axe.utils.parseSameOriginStylesheet(
      sheet,
      options,
      [1, 0],
      importedUrls,
      false
    );
    window.URL = nativeUrl;

    promise
      .then(data => {
        assert.deepEqual(importedUrls, [importHref]);
        assert.isFalse(data[0].isCrossOrigin);
        done();
      })
      .catch(done);
  });

  it('returns inline style specified in the stylesheet', done => {
    // add style that has @import style
    stylesForPage = [styleSheets.inlineStyle];

    axe.testUtils.addStyleSheets(stylesForPage).then(() => {
      // get recently added sheet
      const sheet = Array.from(document.styleSheets).filter(styleSheet => {
        return styleSheet.ownerNode.id === styleSheets.inlineStyle.id;
      })[0];
      // parse sheet
      const options = {
        rootNode: document,
        shadowId: undefined,
        convertDataToStylesheet: convertDataToStylesheet
      };
      const priority = [1, 0];
      const importedUrls = [];
      const isCrossOriginRequest = false;
      axe.utils
        .parseSameOriginStylesheet(
          sheet,
          options,
          priority,
          importedUrls,
          false
        )
        .then(data => {
          assert.isDefined(data);
          assert.isDefined(data.sheet);
          assert.equal(data.isCrossOrigin, isCrossOriginRequest);
          assert.deepEqual(data.priority, [1, 0]);
          assert.property(data.sheet, 'cssRules');
          assert.isAtLeast(data.sheet.cssRules.length, 1);
          axe.testUtils.assertStylesheet(
            data.sheet,
            '.inline-css',
            '.inline-css { font-weight:normal; }'
          );
          done();
        });
    });
  });

  /**
   * Note:
   * Only single workflow of resolving either the `@import` or `inline` styles can be tested here.
   * Multiple resolutions from a given stylesheet containing a combination of styles are test as integration tests.
   * See: `/tests/full/integration/preload-cssom.html`
   */
});
