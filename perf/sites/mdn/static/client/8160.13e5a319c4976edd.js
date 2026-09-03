export const __rspack_esm_id = 8160;
export const __rspack_esm_ids = [8160];
export const __webpack_modules__ = {
  39807(e, t, r) {
    var n = r(31601),
      o = r.n(n),
      i = r(76314),
      a = r.n(i)()(o());
    a.push([
      e.id,
      '*,:after,:before{box-sizing:border-box}button,input,select,textarea{font:inherit}button{color:inherit;cursor:pointer}img{height:auto;max-width:100%}a{color:var(--color-link-normal)}[hidden]{display:none!important}#content{scroll-margin-block-start:var(--sticky-header-height)}',
      ''
    ]);
    let s = a.toString();
    r.d(t, {}, { A: s });
  },
  29825(e, t, r) {
    r.d(t, {
      Zj: () => f,
      T1: () => d,
      Dc: () => u,
      r6: () => l,
      c0: () => s,
      wp: () => h,
      YT: () => a,
      S6: () => c,
      pM: () => m
    });
    var n = r(22009);
    let o = (0,
      n.JW)`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="27" class="fail" role="presentation" viewBox="0 -2 24 25"><circle cx="12" cy="11.898" r="9" fill="#fff"/><path d="M12 1.797c5.53 0 10 4.47 10 10s-4.47 10-10 10-10-4.47-10-10 4.47-10 10-10m3.59 5L12 10.387l-3.59-3.59L7 8.207l3.59 3.59L7 15.387l1.41 1.41 3.59-3.59 3.59 3.59 1.41-1.41-3.59-3.59L17 8.207z"/></svg>`,
      i = (0,
      n.JW)`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="27" fill="none" class="pass" role="presentation" viewBox="0 -2 24 25"><circle cx="12" cy="11.898" r="9" fill="#fff"/><path fill="#000" d="M12 1.898c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10m-2 15-5-5 1.41-1.41 3.59 3.58 7.59-7.59L19 7.898z"/></svg>`;
    function a(e, t) {
      let r = t.tests.redirection?.route;
      if (!r || 0 === r.length) return e;
      try {
        let t = new URL(r[0] || ''),
          n = new URL(r.at(-1) || '');
        if (t.hostname === n.hostname) return e;
        return `${t.hostname} → ${n.hostname}`;
      } catch {
        return e;
      }
    }
    function s(e) {
      return e ? `${e}`.replaceAll('-', '−') : null;
    }
    function l(e) {
      return e.toLocaleString([], { dateStyle: 'medium', timeStyle: 'medium' });
    }
    function c(e) {
      let t = Date.now(),
        r = Math.round((e.getTime() - t) / 1e3),
        n = new Intl.RelativeTimeFormat('en', { style: 'long' }),
        o = Math.abs(r);
      if (o < 60) return r < 0 ? 'Just now' : 'Very soon';
      if (o < 3600) return n.format(Math.floor(r / 60), 'minute');
      if (o < 86400) return n.format(Math.floor(r / 3600), 'hour');
      if (o < 2592e3) return n.format(Math.floor(r / 86400), 'day');
      if (o < 0x1dfe200) return n.format(Math.floor(r / 2592e3), 'month');
      else return n.format(Math.floor(r / 0x1dfe200), 'year');
    }
    function d({ pass: e }) {
      return null === e
        ? (0, n.qy)`-`
        : (0, n.qy)`
    <span class="obs-pass-icon">
      ${e ? (0, n.qy)`${i}` : (0, n.qy)`${o}`}
      <span class="visually-hidden">${e ? 'Passed' : 'Failed'}</span>
    </span>
  `;
    }
    function u({ expires: e }) {
      let t = new Date(e);
      if ('Invalid Date' === t.toString())
        return (0, n.qy)`<div class="iso-date">{expires}</div>`;
      let r = t
        .toISOString()
        .replace('T', ' ')
        .replace(/\....Z/, ' UTC');
      return (0, n.qy)`
    <div class="iso-date">
      <code>${r}</code>
    </div>
    <div class="humanized-duration">(${c(t)})</div>
  `;
    }
    function f({ cookieName: e }) {
      return e.startsWith('__Host-')
        ? (0, n.qy)`<code>Host</code>`
        : e.startsWith('__Secure-')
          ? (0, n.qy)`<code>Secure</code>`
          : (0, n.qy)`-`;
    }
    function h(e) {
      let t = m(e),
        r = `/en-US/docs/Web/HTTP/Reference/Headers/${encodeURIComponent(t)}`;
      return (0, n.qy)`
    <a href=${r} target="_blank" rel="noreferrer">
      ${t}
    </a>
  `;
    }
    function m(e) {
      return e
        .split('-')
        .map(e => (e ? e.charAt(0).toUpperCase() + e.slice(1) : ''))
        .join('-');
    }
  }
};
//# sourceMappingURL=8160.13e5a319c4976edd.js.map
