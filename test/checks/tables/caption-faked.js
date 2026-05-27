describe('caption-faked', () => {
  const html = axe.testUtils.html;

  const fixture = document.getElementById('fixture');

  afterEach(() => {
    fixture.innerHTML = '';
  });

  let captionFaked;
  beforeEach(() => {
    captionFaked = checks['caption-faked'];
  });

  it('returns true if the first row has multiple cells', () => {
    fixture.innerHTML = html`
      <table>
        <tr>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
        </tr>
      </table>
    `;

    const node = fixture.querySelector('table');
    assert.isTrue(captionFaked.evaluate(node));
  });

  it('returns true if the table has only one column', () => {
    fixture.innerHTML = html`
      <table>
        <tr>
          <td></td>
        </tr>
        <tr>
          <td></td>
        </tr>
      </table>
    `;

    const node = fixture.querySelector('table');
    assert.isTrue(captionFaked.evaluate(node));
  });

  it('returns true if the table has only one <tr>', () => {
    fixture.innerHTML = html`
      <table>
        <tr>
          <td rowspan="2" colspan="2"></td>
        </tr>
      </table>
    `;

    const node = fixture.querySelector('table');
    assert.isTrue(captionFaked.evaluate(node));
  });

  it('returns true if the first column does not span the entire table', () => {
    fixture.innerHTML = html`
      <table>
        <tr>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
        </tr>
      </table>
    `;

    const node = fixture.querySelector('table');
    assert.isTrue(captionFaked.evaluate(node));
  });

  it('returns false if the first is only a single td', () => {
    fixture.innerHTML = html`
      <table>
        <tr>
          <td colspan="2"></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
        </tr>
      </table>
    `;

    const node = fixture.querySelector('table');
    assert.isFalse(captionFaked.evaluate(node));
  });

  it('returns false if the first is only a single th', () => {
    fixture.innerHTML = html`
      <table>
        <tr>
          <th colspan="2"></th>
        </tr>
        <tr>
          <td></td>
          <td></td>
        </tr>
      </table>
    `;

    const node = fixture.querySelector('table');
    assert.isFalse(captionFaked.evaluate(node));
  });
});
