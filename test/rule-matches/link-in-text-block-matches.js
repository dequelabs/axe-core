describe('link-in-text-block-matches', () => {
  'use strict';

  const { fixtureSetup } = axe.testUtils;
  const rule = axe.utils.getRule('link-in-text-block');

  it('should return true if link is in text block', () => {
    fixtureSetup(
      '<p>Some paragraph with text <a id="target" href="#">world</a></p>'
    );
    const node = document.getElementById('target');
    assert.isTrue(rule.matches(node));
  });

  it('should return false if element has a non-link role', () => {
    fixtureSetup(
      '<p>Some paragraph with text <a id="target" href="#" role="button">hello</a></p>'
    );
    const node = document.getElementById('target');
    assert.isFalse(rule.matches(node));
  });

  it('should should return false if element does not have text', () => {
    fixtureSetup(
      '<p>Some paragraph with text <a id="target" href="#"></a></p>'
    );
    const node = document.getElementById('target');
    assert.isFalse(rule.matches(node));
  });

  it('should return false if element has <style>', () => {
    fixtureSetup(`
      <p>Some paragraph with text
        <a id="target" href="#">
          <style>a { color: #333 }</style>
        </a>
      </p>
    `);
    const node = document.getElementById('target');
    assert.isFalse(rule.matches(node));
  });

  it('should return false if element has <script>', () => {
    fixtureSetup(`
      <p>Some paragraph with text
        <a id="target" href="#">
          <script>console.log('foo')</script>
        </a>
      </p>
    `);
    const node = document.getElementById('target');
    assert.isFalse(rule.matches(node));
  });

  it('should return false if element is hidden', () => {
    fixtureSetup(
      '<p>Some paragraph with text <a id="target" href="#"" style="display: none">hello</a></p>'
    );
    const node = document.getElementById('target');
    assert.isFalse(rule.matches(node));
  });

  it('should return false if link is not in text block', () => {
    fixtureSetup('<a id="target" href="#">hello</a>');
    const node = document.getElementById('target');
    assert.isFalse(rule.matches(node));
  });

  it('should return false if link is only text in block', () => {
    fixtureSetup('<p><a id="target" href="#">world</a></p>');
    const node = document.getElementById('target');
    assert.isFalse(rule.matches(node));
  });

  it('should return false if link is display block', () => {
    fixtureSetup(
      '<p>Some paragraph with text <a id="target" href="#" style="display: block">world</a></p>'
    );
    const node = document.getElementById('target');
    assert.isFalse(rule.matches(node));
  });
});
