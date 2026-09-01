export const __rspack_esm_id = 5950;
export const __rspack_esm_ids = [5950];
export const __webpack_modules__ = {
  71677(e, t, h) {
    let ThemeController = class ThemeController {
      #e;
      constructor(e) {
        ((this.#e = e),
          this.#e.addController(this),
          (this.value = 'light dark'),
          (this.initialValue = 'light dark'));
      }
      _updateTheme(e) {
        let t = e instanceof CustomEvent && this._lightOrDark(e.detail);
        ((t ||= this._lightOrDark(document.documentElement.dataset.theme)),
          (t ||= this._matchMedia?.matches ? 'dark' : 'light'));
        let h = this.value;
        ((this.value = t), this.#e.requestUpdate('ThemeController.value', h));
      }
      _lightOrDark(e) {
        switch (e) {
          case 'light':
            return 'light';
          case 'dark':
            return 'dark';
          default:
            return;
        }
      }
      hostConnected() {
        ((this._updateTheme = this._updateTheme.bind(this)),
          globalThis.addEventListener(
            'mdn-color-theme-update',
            this._updateTheme
          ),
          (this._matchMedia = globalThis.matchMedia(
            '(prefers-color-scheme: dark)'
          )),
          this._matchMedia.addEventListener('change', this._updateTheme),
          this._updateTheme(),
          (this.initialValue = this.value));
      }
      hostDisconnected() {
        this._matchMedia?.removeEventListener('change', this._updateTheme);
      }
    };
    h.d(t, { W: () => ThemeController });
  }
};
//# sourceMappingURL=5950.56c71d6a057d9e51.js.map
