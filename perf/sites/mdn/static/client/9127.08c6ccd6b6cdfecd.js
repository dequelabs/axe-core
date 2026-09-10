export const __rspack_esm_id = 9127;
export const __rspack_esm_ids = [9127];
export const __webpack_modules__ = {
  93487(e, t, i) {
    var r = i(22009),
      s = i(31601),
      o = i.n(s),
      a = i(76314),
      n = i.n(a)()(o());
    n.push([
      e.id,
      '*{box-sizing:border-box}.wrap{--img-size:3.75em;--li-size:calc(var(--img-size)*2.5)}ul{--circle-border-size:0.375em;align-content:start;display:grid;gap:2rem 1rem;grid-template-columns:repeat(auto-fit,minmax(var(--li-size),1fr));justify-items:center;margin:0;padding:0}@media (width <= 769px){ul{display:flex;margin-top:2rem;overflow-x:auto}}a,li{align-items:center;display:flex;flex-direction:column;flex-shrink:0;text-align:center}li{color:var(--community-text-primary);width:var(--li-size)}img{background:var(--community-circle-img-border);border:var(--circle-border-size) var(--community-circle-img-border) solid;border-radius:50%;flex-shrink:0;height:var(--img-size);width:var(--img-size)}a{color:unset;font-weight:500}svg{display:none}@supports (offset-path:ellipse(100% 50% at 100% 50%)){@media (width > 769px){.wrap{container-type:size;height:100%;width:100%}.inner{font-size:min(1rem,3.5cqmin);padding:calc(var(--img-size)/2) calc(var(--li-size)/2)}ul{aspect-ratio:1/2;margin-left:auto;max-height:var(--community-circle-height);min-height:0;min-width:0;position:relative}svg,ul{display:block}svg{height:100%;overflow:visible;position:absolute;width:100%;fill:none;stroke:var(--community-circle-img-border);stroke-width:var(--circle-border-size)}li{animation:community-circle .1ms forwards;offset-anchor:center calc(var(--img-size)*.5);offset-distance:var(--offset-distance);offset-path:ellipse(100% 50% at 100% 50%);offset-rotate:0deg}li:nth-of-type(n+6){--img-size:5em;offset-path:ellipse(50% 25% at 100% 50%)}@keyframes community-circle{0%{offset-distance:calc(var(--offset-distance) - .1%)}}li:first-of-type{--offset-distance:75%}li:nth-of-type(2){--offset-distance:62.5%}li:nth-of-type(3){--offset-distance:50%}li:nth-of-type(4){--offset-distance:37.5%}li:nth-of-type(5){--offset-distance:25%}li:nth-of-type(6){--offset-distance:75%}li:nth-of-type(7){--offset-distance:50%}li:nth-of-type(8){--offset-distance:25%}.org{display:-webkit-box;overflow:hidden;line-clamp:2}}}',
      ''
    ]);
    let l = (0, r.AH)([n.toString()]);
    i.d(t, {}, { A: l });
  },
  23082(e, t, i) {
    i.r(t);
    var r = i(22009),
      s = i(93487);
    let MDNContributorList = class MDNContributorList extends r.WF {
      static ssr = !1;
      static get properties() {
        return { _contributors: { state: !0 } };
      }
      static styles = s.A;
      constructor() {
        (super(), (this._contributors = []));
      }
      _onChildrenChanged() {
        let e = this.querySelector('ul'),
          t = [];
        if (e) {
          let i = [...e.querySelectorAll('li')];
          for (let e = 0; e < 8; e++) {
            let r = (function (e) {
              let t = Math.floor(Math.random() * e.length);
              return e.splice(t, 1)[0];
            })(i);
            if (!r) break;
            let [s, o, a] = [...r.childNodes].map(
              e => e?.textContent?.trim() || void 0
            );
            if (!s || !o) {
              e--;
              continue;
            }
            t.push({ name: s, github: o, org: a });
          }
          this._contributors = t;
        }
      }
      connectedCallback() {
        (super.connectedCallback(),
          this._onChildrenChanged(),
          new MutationObserver(() => this._onChildrenChanged()).observe(this, {
            subtree: !0,
            childList: !0,
            characterData: !0
          }));
      }
      render() {
        return (0, r.qy)`<div class="wrap">
      <div class="inner">
        <ul>
          <svg>
            <defs>
              <mask id="hide-half">
                <rect
                  x="0%"
                  y="0%"
                  width="100%"
                  height="100%"
                  fill="#fff"
                  stroke="#fff"
                />
              </mask>
            </defs>
            <ellipse
              rx="100%"
              ry="50%"
              cx="100%"
              cy="50%"
              mask="url(#hide-half)"
            />
            <ellipse
              rx="50%"
              ry="25%"
              cx="100%"
              cy="50%"
              mask="url(#hide-half)"
            />
          </svg>
          ${this._contributors.map(({ name: e, github: t, org: i }) => {
            let s = `https://avatars.githubusercontent.com/${t?.split('/').slice(-1)}`;
            return (0, r.qy)`<li>
              <a href=${t} target="_blank" rel="nofollow noreferrer">
                <img
                  src="${s}?size=80"
                  srcset="${s}?size=160 2x"
                  loading="lazy"
                  referrerpolicy="no-referrer"
                />
                ${e}
              </a>
              <span class="org">${i}</span>
            </li>`;
          })}
        </ul>
      </div>
    </div>`;
      }
    };
    (customElements.define('mdn-contributor-list', MDNContributorList),
      i.d(t, { MDNContributorList: () => MDNContributorList }));
  }
};
//# sourceMappingURL=9127.08c6ccd6b6cdfecd.js.map
