// Solves for situations where global code is mocked, like old Jest docs
// recommending to `null` out `window.CSS` for JSDOM's benefit
// https://github.com/thymikee/jest-preset-angular/commit/ac30648347ab41e0cbce741f66ae2a06b766fe13#diff-f2981abe444e6cc2b341b0d7cadb3932d2f1fbb6601aebeaf70f8bb387439d35

const originalWindowCSS = window.CSS;
function resetWindowCSSMock() {
	Object.defineProperty(window, 'CSS', { value: originalWindowCSS });
}

function mockWindowCSS() {
	Object.defineProperty(window, 'CSS', { value: null });
}

describe('patch test', function () {
  it('when not mocked, imports and works as expected', async function () {
		try {
			const { default: Color } = await import('https://colorjs.io/dist/color.js');
			let color = new Color("slategray");
			assert.ok(color);
		} catch(error) {
			// Should not hit this assertion
			assert.notOk(error);
		}
  });

	describe('mocked, `window.CSS === null`', function () {
		beforeEach(mockWindowCSS);
		afterEach(resetWindowCSSMock);

		it('can mock window.CSS to `null` on its own', function () {
			assert.isNull(window.CSS);
		});

		it('resets css window mock', function () {
			resetWindowCSSMock();
			assert.equal(window.CSS, originalWindowCSS);
		});

		it('`CSS.supports` fails to load when `window.CSS === null`', async function () {
			try {
				await import('https://colorjs.io/dist/color.js');
			} catch({ name, message }) {
				assert.equal(name, 'TypeError');
				assert.equal(message, `Cannot read properties of null (reading 'supports')`);
			}
		});
	});
});
