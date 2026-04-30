/*global axe*/
describe('axe.utils.areStylesSet', () => {
  const fixture = document.getElementById('fixture');

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('should be a function', () => {
    assert.isFunction(axe.utils.areStylesSet);
  });

  it('should return true if `display:none` is set', () => {
    fixture.innerHTML =
      '<div id="target" style="display:none;">Display None</div>';

    const el = document.getElementById('target');
    assert.isTrue(
      axe.utils.areStylesSet(
        el,
        [{ property: 'display', value: 'none' }],
        'body'
      )
    );
  });

  it('should return true if `display:none` is set', () => {
    fixture.innerHTML =
      '<div style="display:none;"><div id="target">Display None</div></div>';

    const el = document.getElementById('target');
    assert.isTrue(
      axe.utils.areStylesSet(
        el,
        [{ property: 'display', value: 'none' }],
        'body'
      )
    );
  });

  it('should return true if `visibility:hidden` is set', () => {
    fixture.innerHTML =
      '<div style="visibility:hidden;"><div id="target">Display None</div></div>';

    const el = document.getElementById('target');
    assert.isTrue(
      axe.utils.areStylesSet(
        el,
        [{ property: 'visibility', value: 'hidden' }],
        'body'
      )
    );
  });

  it('should return true if `visibility:hidden` is set', () => {
    fixture.innerHTML =
      '<div id="target" style="visibility:hidden;">Display None</div>';

    const el = document.getElementById('target');
    assert.isTrue(
      axe.utils.areStylesSet(
        el,
        [{ property: 'visibility', value: 'hidden' }],
        'body'
      )
    );
  });

  it('should return true if `visibility:hidden` is set', () => {
    fixture.innerHTML =
      '<div id="target" style="visibility:hidden;">Display None</div>';

    const el = document.getElementById('target');
    assert.isTrue(
      axe.utils.areStylesSet(
        el,
        [
          {
            property: 'display',
            value: 'none'
          },
          {
            property: 'visibility',
            value: 'hidden'
          }
        ],
        'body'
      )
    );
  });

  it('should return true if `visibility:hidden` is set', () => {
    fixture.innerHTML =
      '<div style="visibility:hidden;"><div id="target">Display None</div></div>';

    const el = document.getElementById('target');
    assert.isTrue(
      axe.utils.areStylesSet(
        el,
        [
          {
            property: 'display',
            value: 'none'
          },
          {
            property: 'visibility',
            value: 'hidden'
          }
        ],
        'body'
      )
    );
  });

  it('should return true if `display:none` is set', () => {
    fixture.innerHTML =
      '<div style="display:none;"><div id="target">Display None</div></div>';

    const el = document.getElementById('target');
    assert.isTrue(
      axe.utils.areStylesSet(
        el,
        [
          {
            property: 'display',
            value: 'none'
          },
          {
            property: 'visibility',
            value: 'hidden'
          }
        ],
        'body'
      )
    );
  });

  it('should return false if nothing is set', () => {
    fixture.innerHTML =
      '<div style=""><div id="target">Display None</div></div>';

    const el = document.getElementById('target');
    assert.isFalse(
      axe.utils.areStylesSet(
        el,
        [
          {
            property: 'display',
            value: 'none'
          },
          {
            property: 'visibility',
            value: 'hidden'
          }
        ],
        'body'
      )
    );
  });
});
