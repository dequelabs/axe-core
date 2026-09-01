export const __rspack_esm_id = 8280;
export const __rspack_esm_ids = [8280];
export const __webpack_modules__ = {
  44588(e, t, n) {
    var r = n(22009),
      o = n(31601),
      a = n.n(o),
      s = n(76314),
      i = n.n(s)()(a());
    i.push([
      e.id,
      ':host{line-height:1rem}.placement-no{color:inherit;font-size:.6rem;margin-bottom:.5rem;max-width:12rem;padding:0;width:100%}.placement-no:focus,.placement-no:hover{opacity:unset;-webkit-text-decoration:none;text-decoration:none}',
      ''
    ]);
    let p = (0, r.AH)([i.toString()]);
    n.d(t, {}, { A: p });
  },
  13755(e, t, n) {
    n.r(t);
    var r = n(36085),
      o = n(22009),
      a = n(70693),
      s = n(20126),
      i = n(45742),
      p = n(44588);
    let MDNPlacementNo = class MDNPlacementNo extends (0, a.J)(o.WF) {
      static styles = p.A;
      _dataTask = new r.YZ(this, {
        task: async () => ({
          context: await (0, s.M)(),
          user: await (0, i.L)()
        })
      });
      connectedCallback() {
        (super.connectedCallback(), this._dataTask.run());
      }
      render() {
        return this._dataTask.render({
          initial: () => o.s6,
          pending: () => o.s6,
          complete: e => {
            let { context: t, user: n } = e;
            return n?.isSubscriber || t.plusAvailable
              ? (0, o.qy)`<a
                class="placement-no"
                data-glean-id=${'pong: ' + (n?.isSubscriber ? 'pong->settings' : 'pong->plus')}
                href=${n?.isSubscriber ? '/en-US/plus/settings?ref=nope' : '/en-US/plus?ref=nope'}
              >
                ${this.l10n('placement-no')}
              </a>`
              : o.s6;
          }
        });
      }
    };
    customElements.define('mdn-placement-no', MDNPlacementNo);
  },
  20126(e, t, n) {
    let r;
    var o = n(23727),
      a = n(45742);
    let s = {
      side: {
        typ: 'side',
        renderer:
          /Doc|BlogPost|CurriculumDefault|GenericDoc|SpaSearch|SpaNotFound|SpaPlay|SpaObservatoryAnalyze/gi,
        pattern:
          /^\/[^/]+\/(play|docs\/|blog\/|observatory\/?|curriculum\/[^$]|search$)/i
      },
      top: {
        typ: 'top-banner',
        renderer: /^(?!Homepage$).+/gi,
        pattern: /^\/[^/]+\/(?!$|_homepage$).*/i
      },
      hpTop: {
        typ: 'top-banner',
        renderer: /Homepage/gi,
        pattern: /^\/[^/]+\/($|_homepage$)/i
      },
      hpMain: {
        typ: 'hp-main',
        renderer: /Homepage/gi,
        pattern: /^\/[^/]+\/($|_homepage$)/i
      },
      hpFooter: {
        typ: 'hp-footer',
        renderer: /Homepage/gi,
        pattern: /^\/[^/]+\/($|_homepage$)/i
      },
      bottom: {
        typ: 'bottom-banner',
        renderer: /^(?!Homepage$).+/gi,
        pattern: /^\/[^/]+\/docs\//i
      }
    };
    function i() {
      return (
        r ||
          (r = (0, a.L)().then(e =>
            e.settings?.noAds ? Promise.resolve({ status: 'noads' }) : p()
          )),
        r
      );
    }
    async function p() {
      let e;
      try {
        var t;
        ((0, o.w)('pong: pong->requested'),
          (e = await fetch('/pong/get', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              keywords: [],
              pongs:
                ((t =
                  globalThis.document.documentElement.dataset.renderer ||
                  'Unknown'),
                Object.entries(s)
                  .map(([e, { renderer: n }]) => (n.test(t) ? e : null))
                  .filter(e => null !== e) || [])
            })
          })),
          (0, o.w)(`pong: pong->fetched ${e.status}`));
      } catch (e) {
        throw (
          (0, o.w)(
            `pong: pong->error ${e instanceof Error ? e.name : 'unknown'}`
          ),
          e
        );
      }
      if (!e.ok) throw Error(e.statusText);
      try {
        let t = await e.json(),
          n = Object.entries(s)
            .filter(([e]) => e in t)
            .map(([, { typ: e }]) => e);
        return (
          n.length > 0 && (0, o.w)(`pong: pong->served ${n.join(',')}`),
          t
        );
      } catch {
        throw Error(e.statusText);
      }
    }
    n.d(t, { M: () => i });
  }
};
//# sourceMappingURL=8280.d23400460d00c14a.js.map
