describe('standards.getElementsByContentType', function () {
  let getElementsByContentType = axe.commons.standards.getElementsByContentType;

  before(function () {
    axe._load({});
  });

  after(function () {
    axe.reset();
  });

  it('should return a list of node names by content type', function () {
    // Source: https://html.spec.whatwg.org/multipage/dom.html#sectioning-content
    let sectioningContent = getElementsByContentType('sectioning');
    assert.deepEqual(sectioningContent, ['article', 'aside', 'nav', 'section']);
  });

  it('should return a default variants', function () {
    // Source: https://html.spec.whatwg.org/multipage/dom.html#embedded-content-2
    let sectioningContent = getElementsByContentType('embedded');
    assert.deepEqual(sectioningContent, [
      'audio',
      'canvas',
      'embed',
      'iframe',
      'img',
      'math',
      'object',
      'svg',
      'video'
    ]);
  });

  it('should return configured roles', function () {
    axe.configure({
      standards: {
        htmlElms: {
          myElm: {
            contentTypes: ['flow', 'sectioning']
          }
        }
      }
    });

    let structureRoles = getElementsByContentType('sectioning');
    assert.include(structureRoles, 'myElm');
  });

  it('should not return role that is configured to not be of the type', function () {
    axe.configure({
      standards: {
        htmlElms: {
          article: {
            contentTypes: ['flow']
          }
        }
      }
    });

    let structureRoles = getElementsByContentType('sectioning');
    assert.notInclude(structureRoles, 'article');
  });
});
