describe('standards.getElementsByContentType', () => {
  const getElementsByContentType =
    axe.commons.standards.getElementsByContentType;

  before(() => {
    axe._load({});
  });

  after(() => {
    axe.reset();
  });

  it('should return a list of node names by content type', () => {
    // Source: https://html.spec.whatwg.org/multipage/dom.html#sectioning-content
    const sectioningContent = getElementsByContentType('sectioning');
    assert.deepEqual(sectioningContent, ['article', 'aside', 'nav', 'section']);
  });

  it('should return a default variants', () => {
    // Source: https://html.spec.whatwg.org/multipage/dom.html#embedded-content-2
    const sectioningContent = getElementsByContentType('embedded');
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

  it('should return configured roles', () => {
    axe.configure({
      standards: {
        htmlElms: {
          myElm: {
            contentTypes: ['flow', 'sectioning']
          }
        }
      }
    });

    const structureRoles = getElementsByContentType('sectioning');
    assert.include(structureRoles, 'myElm');
  });

  it('should not return role that is configured to not be of the type', () => {
    axe.configure({
      standards: {
        htmlElms: {
          article: {
            contentTypes: ['flow']
          }
        }
      }
    });

    const structureRoles = getElementsByContentType('sectioning');
    assert.notInclude(structureRoles, 'article');
  });
});
