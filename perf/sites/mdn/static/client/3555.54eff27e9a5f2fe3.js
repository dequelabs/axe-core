export const __rspack_esm_id = 3555;
export const __rspack_esm_ids = [3555];
export const __webpack_modules__ = {
  73189(e, o, a) {
    var r = a(22009),
      t = a(31601),
      c = a.n(t),
      n = a(76314),
      l = a.n(n),
      s = a(39807),
      d = a(44579),
      i = l()(c());
    (i.i(s.A),
      i.i(d.A),
      i.push([
        e.id,
        'code{background-color:var(--color-background-secondary);border-radius:.25em;font-family:var(--font-family-code);padding:.125em .25em}',
        ''
      ]));
    let u = (0, r.AH)([i.toString()]);
    a.d(o, {}, { A: u });
  },
  44579(e, o, a) {
    var r = a(31601),
      t = a.n(r),
      c = a(76314),
      n = a.n(c),
      l = a(4417),
      s = a.n(l),
      d = new a.U(a(6757)),
      i = new a.U(a(46895)),
      u = new a.U(a(78547)),
      p = new a.U(a(98678)),
      m = new a.U(a(76263)),
      b = new a.U(a(32143)),
      g = new a.U(a(11427)),
      f = n()(t()),
      k = s()(d),
      v = s()(i),
      x = s()(u),
      $ = s()(p),
      h = s()(m),
      _ = s()(b),
      w = s()(g);
    f.push([
      e.id,
      `.callout,.notecard{background-color:var(--color-background-secondary);border-inline-start:2px solid var(--accent-color,var(--color-text-secondary));border-radius:.25em;color:var(--color-text-primary);margin-block:1em;padding-block:1px;padding-inline:1em;padding-inline-start:3em;position:relative}.experimental:is(.notecard,.callout),.note:is(.notecard,.callout),.secure:is(.notecard,.callout){background-color:var(--color-background-blue);--accent-color:var(--color-text-blue)}.deprecated:is(.notecard,.callout),.nonstandard:is(.notecard,.callout),.warning:is(.notecard,.callout){background-color:var(--color-background-red);--accent-color:var(--color-text-red)}.tip:is(.notecard,.callout){background-color:var(--color-background-green);--accent-color:var(--color-text-green)}:is(.deprecated:is(.notecard,.callout),.experimental:is(.notecard,.callout),.nonstandard:is(.notecard,.callout),.note:is(.notecard,.callout),.secure:is(.notecard,.callout),.tip:is(.notecard,.callout),.warning:is(.notecard,.callout),.worker:is(.notecard,.callout)):before{background-color:var(--accent-color,var(--color-text-secondary));content:"";display:block;height:1em;left:1em;mask-size:cover;position:absolute;top:1.45em;width:1em}.deprecated:is(.notecard,.callout):before{mask-image:url(${k})}.experimental:is(.notecard,.callout):before{mask-image:url(${v})}.nonstandard:is(.notecard,.callout):before{mask-image:url(${x})}.note:is(.notecard,.callout):before{mask-image:url(${$})}.secure:is(.notecard,.callout):before{mask-image:url(${h})}.tip:is(.notecard,.callout):before{mask-image:url(${_})}.warning:is(.notecard,.callout):before{mask-image:url(${x})}.worker:is(.notecard,.callout):before{mask-image:url(${w})}`,
      ''
    ]);
    let y = f.toString();
    a.d(o, {}, { A: y });
  },
  11427(e, o, a) {
    e.exports = a.p + 'cog.f23af856fab34421.svg';
  },
  46895(e, o, a) {
    e.exports = a.p + 'flask-conical.c16b3d71f14f31d1.svg';
  },
  98678(e, o, a) {
    e.exports = a.p + 'info.d40b80f84482feba.svg';
  },
  32143(e, o, a) {
    e.exports = a.p + 'lightbulb.f54f9e803373ffd2.svg';
  },
  76263(e, o, a) {
    e.exports = a.p + 'lock.4befe79c52ccec2a.svg';
  },
  6757(e, o, a) {
    e.exports = a.p + 'trash-2.73b28bc66fb8543c.svg';
  },
  78547(e, o, a) {
    e.exports = a.p + 'triangle-alert.cff4c57ccef57da3.svg';
  },
  2622(e, o, a) {
    a.r(o);
    var r = a(36085),
      t = a(22009),
      c = a(70693),
      n = a(73189),
      l = a(15899);
    let MDNNotFound = class MDNNotFound extends (0, c.J)(t.WF) {
      static ssr = !1;
      static styles = n.A;
      _fallback = new r.YZ(this, {
        task: async () => (0, l.$)(location.pathname)
      });
      connectedCallback() {
        (super.connectedCallback(), this._fallback.run());
      }
      render() {
        let e = location.pathname;
        return (0, t.qy)`
      <p>
        ${this.l10n.raw({ id: 'not-found-description', args: { url: e }, elements: { url: { tag: 'code' } } })}
      </p>

      ${this._fallback.render({
        complete: e => {
          if (e)
            return (0, t.qy)`<div class="notecard tip">
              <p>
                ${this.l10n.raw({ id: 'not-found-fallback-english', elements: { strong: { tag: 'strong' }, em: { tag: 'em' } } })}
              </p>
              <p>
                <a href=${e.mdn_url}>
                  <b>${e.title}</b>
                  <br />
                  <small>${e.mdn_url}</small>
                </a>
              </p>
            </div>`;
          {
            let e = document.documentElement.lang,
              o = location.pathname
                .split('/')
                .filter(o => o && ![e, 'docs'].includes(o))
                .map(e => e.replaceAll('_', ' '))
                .reverse(),
              a = (0, t.qy)`<ul>
              ${o.map(
                o => (0, t.qy)`<li>
                    <a
                      href=${`/${e}/search?q=${encodeURIComponent(o)}`}
                    >
                      ${o}
                    </a>
                  </li>`
              )}
            </ul>`;
            return (0, t.qy)`<div class="notecard note">
              <p>${this.l10n('not-found-fallback-search')} ${a}</p>
            </div>`;
          }
        }
      })}
    `;
      }
    };
    (customElements.define('mdn-not-found', MDNNotFound),
      a.d(o, { MDNNotFound: () => MDNNotFound }));
  }
};
//# sourceMappingURL=3555.54eff27e9a5f2fe3.js.map
