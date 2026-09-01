export const __rspack_esm_id = 5562;
export const __rspack_esm_ids = [5562];
export const __webpack_modules__ = {
  93649(e, t, s) {
    let RecentlyVisitedPages = class RecentlyVisitedPages {
      static #e = 'recently-visited';
      #t;
      constructor() {
        this.#t = this.#s();
      }
      #s() {
        let e = localStorage.getItem(RecentlyVisitedPages.#e);
        if (e) {
          let t;
          try {
            if (((t = JSON.parse(e)), Array.isArray(t)))
              return t.map(e => new RecentlyVisitedPage(e));
          } catch {
            console.error(`Parsing ${RecentlyVisitedPages.#e} failed`);
          }
        }
        return [];
      }
      #a() {
        localStorage.setItem(RecentlyVisitedPages.#e, JSON.stringify(this.#t));
      }
      map(e) {
        return this.#t.map(e);
      }
      add(e) {
        ((this.#t = [
          ...new Map([e, ...this.#t].map(e => [e.path, e])).values()
        ].slice(0, 10)),
          this.#a());
      }
    };
    let RecentlyVisitedPage = class RecentlyVisitedPage {
      title = '';
      path = '';
      constructor(e) {
        Object.assign(this, e);
      }
    };
    s.d(t, { B: () => RecentlyVisitedPages, E: () => RecentlyVisitedPage });
  }
};
//# sourceMappingURL=5562.6cc078ec59eb355d.js.map
