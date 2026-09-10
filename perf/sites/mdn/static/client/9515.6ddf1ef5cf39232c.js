export const __rspack_esm_id = 9515;
export const __rspack_esm_ids = [9515];
export const __webpack_modules__ = {
  62534(e, r, t) {
    for (
      var o = {
          8: 'Backspace',
          9: 'Tab',
          10: 'Enter',
          12: 'NumLock',
          13: 'Enter',
          16: 'Shift',
          17: 'Control',
          18: 'Alt',
          20: 'CapsLock',
          27: 'Escape',
          32: ' ',
          33: 'PageUp',
          34: 'PageDown',
          35: 'End',
          36: 'Home',
          37: 'ArrowLeft',
          38: 'ArrowUp',
          39: 'ArrowRight',
          40: 'ArrowDown',
          44: 'PrintScreen',
          45: 'Insert',
          46: 'Delete',
          59: ';',
          61: '=',
          91: 'Meta',
          92: 'Meta',
          106: '*',
          107: '+',
          108: ',',
          109: '-',
          110: '.',
          111: '/',
          144: 'NumLock',
          145: 'ScrollLock',
          160: 'Shift',
          161: 'Shift',
          162: 'Control',
          163: 'Control',
          164: 'Alt',
          165: 'Alt',
          173: '-',
          186: ';',
          187: '=',
          188: ',',
          189: '-',
          190: '.',
          191: '/',
          192: '`',
          219: '[',
          220: '\\',
          221: ']',
          222: "'"
        },
        n = {
          48: ')',
          49: '!',
          50: '@',
          51: '#',
          52: '$',
          53: '%',
          54: '^',
          55: '&',
          56: '*',
          57: '(',
          59: ':',
          61: '+',
          173: '_',
          186: ':',
          187: '+',
          188: '<',
          189: '_',
          190: '>',
          191: '?',
          192: '~',
          219: '{',
          220: '|',
          221: '}',
          222: '"'
        },
        a = 'u' > typeof navigator && /Mac/.test(navigator.platform),
        i =
          'u' > typeof navigator &&
          /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(
            navigator.userAgent
          ),
        c = 0;
      c < 10;
      c++
    )
      o[48 + c] = o[96 + c] = String(c);
    for (var c = 1; c <= 24; c++) o[c + 111] = 'F' + c;
    for (var c = 65; c <= 90; c++)
      ((o[c] = String.fromCharCode(c + 32)), (n[c] = String.fromCharCode(c)));
    for (var f in o) n.hasOwnProperty(f) || (n[f] = o[f]);
    function s(e) {
      var r =
        (!(
          (a && e.metaKey && e.shiftKey && !e.ctrlKey && !e.altKey) ||
          (i && e.shiftKey && e.key && 1 == e.key.length) ||
          'Unidentified' == e.key
        ) &&
          e.key) ||
        (e.shiftKey ? n : o)[e.keyCode] ||
        e.key ||
        'Unidentified';
      return (
        'Esc' == r && (r = 'Escape'),
        'Del' == r && (r = 'Delete'),
        'Left' == r && (r = 'ArrowLeft'),
        'Up' == r && (r = 'ArrowUp'),
        'Right' == r && (r = 'ArrowRight'),
        'Down' == r && (r = 'ArrowDown'),
        r
      );
    }
    t.d(r, { BN: () => n, E3: () => o, xT: () => s });
  }
};
//# sourceMappingURL=9515.6ddf1ef5cf39232c.js.map
