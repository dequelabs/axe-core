export const __rspack_esm_id = 8520;
export const __rspack_esm_ids = [8520];
export const __webpack_modules__ = {
  40734(e, t, r) {
    let n;
    var a = r(47537),
      l = r(15874),
      o = r(90365);
    let i = null;
    function s() {
      if (!i && 'object' == typeof document && document.body) {
        let { style: e } = document.body,
          t = [],
          r = new Set();
        for (let n in e)
          'cssText' != n &&
            'cssFloat' != n &&
            'string' == typeof e[n] &&
            (/[A-Z]/.test(n) &&
              (n = n.replace(/[A-Z]/g, e => '-' + e.toLowerCase())),
            r.has(n) || (t.push(n), r.add(n)));
        i = t
          .sort()
          .map(e => ({ type: 'property', label: e, apply: e + ': ' }));
      }
      return i || [];
    }
    let u = [
        'active',
        'after',
        'any-link',
        'autofill',
        'backdrop',
        'before',
        'checked',
        'cue',
        'default',
        'defined',
        'disabled',
        'empty',
        'enabled',
        'file-selector-button',
        'first',
        'first-child',
        'first-letter',
        'first-line',
        'first-of-type',
        'focus',
        'focus-visible',
        'focus-within',
        'fullscreen',
        'has',
        'host',
        'host-context',
        'hover',
        'in-range',
        'indeterminate',
        'invalid',
        'is',
        'lang',
        'last-child',
        'last-of-type',
        'left',
        'link',
        'marker',
        'modal',
        'not',
        'nth-child',
        'nth-last-child',
        'nth-last-of-type',
        'nth-of-type',
        'only-child',
        'only-of-type',
        'optional',
        'out-of-range',
        'part',
        'placeholder',
        'placeholder-shown',
        'read-only',
        'read-write',
        'required',
        'right',
        'root',
        'scope',
        'selection',
        'slotted',
        'target',
        'target-text',
        'valid',
        'visited',
        'where'
      ].map(e => ({ type: 'class', label: e })),
      c = [
        'above',
        'absolute',
        'activeborder',
        'additive',
        'activecaption',
        'after-white-space',
        'ahead',
        'alias',
        'all',
        'all-scroll',
        'alphabetic',
        'alternate',
        'always',
        'antialiased',
        'appworkspace',
        'asterisks',
        'attr',
        'auto',
        'auto-flow',
        'avoid',
        'avoid-column',
        'avoid-page',
        'avoid-region',
        'axis-pan',
        'background',
        'backwards',
        'baseline',
        'below',
        'bidi-override',
        'blink',
        'block',
        'block-axis',
        'bold',
        'bolder',
        'border',
        'border-box',
        'both',
        'bottom',
        'break',
        'break-all',
        'break-word',
        'bullets',
        'button',
        'button-bevel',
        'buttonface',
        'buttonhighlight',
        'buttonshadow',
        'buttontext',
        'calc',
        'capitalize',
        'caps-lock-indicator',
        'caption',
        'captiontext',
        'caret',
        'cell',
        'center',
        'checkbox',
        'circle',
        'cjk-decimal',
        'clear',
        'clip',
        'close-quote',
        'col-resize',
        'collapse',
        'color',
        'color-burn',
        'color-dodge',
        'column',
        'column-reverse',
        'compact',
        'condensed',
        'contain',
        'content',
        'contents',
        'content-box',
        'context-menu',
        'continuous',
        'copy',
        'counter',
        'counters',
        'cover',
        'crop',
        'cross',
        'crosshair',
        'currentcolor',
        'cursive',
        'cyclic',
        'darken',
        'dashed',
        'decimal',
        'decimal-leading-zero',
        'default',
        'default-button',
        'dense',
        'destination-atop',
        'destination-in',
        'destination-out',
        'destination-over',
        'difference',
        'disc',
        'discard',
        'disclosure-closed',
        'disclosure-open',
        'document',
        'dot-dash',
        'dot-dot-dash',
        'dotted',
        'double',
        'down',
        'e-resize',
        'ease',
        'ease-in',
        'ease-in-out',
        'ease-out',
        'element',
        'ellipse',
        'ellipsis',
        'embed',
        'end',
        'ethiopic-abegede-gez',
        'ethiopic-halehame-aa-er',
        'ethiopic-halehame-gez',
        'ew-resize',
        'exclusion',
        'expanded',
        'extends',
        'extra-condensed',
        'extra-expanded',
        'fantasy',
        'fast',
        'fill',
        'fill-box',
        'fixed',
        'flat',
        'flex',
        'flex-end',
        'flex-start',
        'footnotes',
        'forwards',
        'from',
        'geometricPrecision',
        'graytext',
        'grid',
        'groove',
        'hand',
        'hard-light',
        'help',
        'hidden',
        'hide',
        'higher',
        'highlight',
        'highlighttext',
        'horizontal',
        'hsl',
        'hsla',
        'hue',
        'icon',
        'ignore',
        'inactiveborder',
        'inactivecaption',
        'inactivecaptiontext',
        'infinite',
        'infobackground',
        'infotext',
        'inherit',
        'initial',
        'inline',
        'inline-axis',
        'inline-block',
        'inline-flex',
        'inline-grid',
        'inline-table',
        'inset',
        'inside',
        'intrinsic',
        'invert',
        'italic',
        'justify',
        'keep-all',
        'landscape',
        'large',
        'larger',
        'left',
        'level',
        'lighter',
        'lighten',
        'line-through',
        'linear',
        'linear-gradient',
        'lines',
        'list-item',
        'listbox',
        'listitem',
        'local',
        'logical',
        'loud',
        'lower',
        'lower-hexadecimal',
        'lower-latin',
        'lower-norwegian',
        'lowercase',
        'ltr',
        'luminosity',
        'manipulation',
        'match',
        'matrix',
        'matrix3d',
        'medium',
        'menu',
        'menutext',
        'message-box',
        'middle',
        'min-intrinsic',
        'mix',
        'monospace',
        'move',
        'multiple',
        'multiple_mask_images',
        'multiply',
        'n-resize',
        'narrower',
        'ne-resize',
        'nesw-resize',
        'no-close-quote',
        'no-drop',
        'no-open-quote',
        'no-repeat',
        'none',
        'normal',
        'not-allowed',
        'nowrap',
        'ns-resize',
        'numbers',
        'numeric',
        'nw-resize',
        'nwse-resize',
        'oblique',
        'opacity',
        'open-quote',
        'optimizeLegibility',
        'optimizeSpeed',
        'outset',
        'outside',
        'outside-shape',
        'overlay',
        'overline',
        'padding',
        'padding-box',
        'painted',
        'page',
        'paused',
        'perspective',
        'pinch-zoom',
        'plus-darker',
        'plus-lighter',
        'pointer',
        'polygon',
        'portrait',
        'pre',
        'pre-line',
        'pre-wrap',
        'preserve-3d',
        'progress',
        'push-button',
        'radial-gradient',
        'radio',
        'read-only',
        'read-write',
        'read-write-plaintext-only',
        'rectangle',
        'region',
        'relative',
        'repeat',
        'repeating-linear-gradient',
        'repeating-radial-gradient',
        'repeat-x',
        'repeat-y',
        'reset',
        'reverse',
        'rgb',
        'rgba',
        'ridge',
        'right',
        'rotate',
        'rotate3d',
        'rotateX',
        'rotateY',
        'rotateZ',
        'round',
        'row',
        'row-resize',
        'row-reverse',
        'rtl',
        'run-in',
        'running',
        's-resize',
        'sans-serif',
        'saturation',
        'scale',
        'scale3d',
        'scaleX',
        'scaleY',
        'scaleZ',
        'screen',
        'scroll',
        'scrollbar',
        'scroll-position',
        'se-resize',
        'self-start',
        'self-end',
        'semi-condensed',
        'semi-expanded',
        'separate',
        'serif',
        'show',
        'single',
        'skew',
        'skewX',
        'skewY',
        'skip-white-space',
        'slide',
        'slider-horizontal',
        'slider-vertical',
        'sliderthumb-horizontal',
        'sliderthumb-vertical',
        'slow',
        'small',
        'small-caps',
        'small-caption',
        'smaller',
        'soft-light',
        'solid',
        'source-atop',
        'source-in',
        'source-out',
        'source-over',
        'space',
        'space-around',
        'space-between',
        'space-evenly',
        'spell-out',
        'square',
        'start',
        'static',
        'status-bar',
        'stretch',
        'stroke',
        'stroke-box',
        'sub',
        'subpixel-antialiased',
        'svg_masks',
        'super',
        'sw-resize',
        'symbolic',
        'symbols',
        'system-ui',
        'table',
        'table-caption',
        'table-cell',
        'table-column',
        'table-column-group',
        'table-footer-group',
        'table-header-group',
        'table-row',
        'table-row-group',
        'text',
        'text-bottom',
        'text-top',
        'textarea',
        'textfield',
        'thick',
        'thin',
        'threeddarkshadow',
        'threedface',
        'threedhighlight',
        'threedlightshadow',
        'threedshadow',
        'to',
        'top',
        'transform',
        'translate',
        'translate3d',
        'translateX',
        'translateY',
        'translateZ',
        'transparent',
        'ultra-condensed',
        'ultra-expanded',
        'underline',
        'unidirectional-pan',
        'unset',
        'up',
        'upper-latin',
        'uppercase',
        'url',
        'var',
        'vertical',
        'vertical-text',
        'view-box',
        'visible',
        'visibleFill',
        'visiblePainted',
        'visibleStroke',
        'visual',
        'w-resize',
        'wait',
        'wave',
        'wider',
        'window',
        'windowframe',
        'windowtext',
        'words',
        'wrap',
        'wrap-reverse',
        'x-large',
        'x-small',
        'xor',
        'xx-large',
        'xx-small'
      ]
        .map(e => ({ type: 'keyword', label: e }))
        .concat(
          [
            'aliceblue',
            'antiquewhite',
            'aqua',
            'aquamarine',
            'azure',
            'beige',
            'bisque',
            'black',
            'blanchedalmond',
            'blue',
            'blueviolet',
            'brown',
            'burlywood',
            'cadetblue',
            'chartreuse',
            'chocolate',
            'coral',
            'cornflowerblue',
            'cornsilk',
            'crimson',
            'cyan',
            'darkblue',
            'darkcyan',
            'darkgoldenrod',
            'darkgray',
            'darkgreen',
            'darkkhaki',
            'darkmagenta',
            'darkolivegreen',
            'darkorange',
            'darkorchid',
            'darkred',
            'darksalmon',
            'darkseagreen',
            'darkslateblue',
            'darkslategray',
            'darkturquoise',
            'darkviolet',
            'deeppink',
            'deepskyblue',
            'dimgray',
            'dodgerblue',
            'firebrick',
            'floralwhite',
            'forestgreen',
            'fuchsia',
            'gainsboro',
            'ghostwhite',
            'gold',
            'goldenrod',
            'gray',
            'grey',
            'green',
            'greenyellow',
            'honeydew',
            'hotpink',
            'indianred',
            'indigo',
            'ivory',
            'khaki',
            'lavender',
            'lavenderblush',
            'lawngreen',
            'lemonchiffon',
            'lightblue',
            'lightcoral',
            'lightcyan',
            'lightgoldenrodyellow',
            'lightgray',
            'lightgreen',
            'lightpink',
            'lightsalmon',
            'lightseagreen',
            'lightskyblue',
            'lightslategray',
            'lightsteelblue',
            'lightyellow',
            'lime',
            'limegreen',
            'linen',
            'magenta',
            'maroon',
            'mediumaquamarine',
            'mediumblue',
            'mediumorchid',
            'mediumpurple',
            'mediumseagreen',
            'mediumslateblue',
            'mediumspringgreen',
            'mediumturquoise',
            'mediumvioletred',
            'midnightblue',
            'mintcream',
            'mistyrose',
            'moccasin',
            'navajowhite',
            'navy',
            'oldlace',
            'olive',
            'olivedrab',
            'orange',
            'orangered',
            'orchid',
            'palegoldenrod',
            'palegreen',
            'paleturquoise',
            'palevioletred',
            'papayawhip',
            'peachpuff',
            'peru',
            'pink',
            'plum',
            'powderblue',
            'purple',
            'rebeccapurple',
            'red',
            'rosybrown',
            'royalblue',
            'saddlebrown',
            'salmon',
            'sandybrown',
            'seagreen',
            'seashell',
            'sienna',
            'silver',
            'skyblue',
            'slateblue',
            'slategray',
            'snow',
            'springgreen',
            'steelblue',
            'tan',
            'teal',
            'thistle',
            'tomato',
            'turquoise',
            'violet',
            'wheat',
            'white',
            'whitesmoke',
            'yellow',
            'yellowgreen'
          ].map(e => ({ type: 'constant', label: e }))
        ),
      d = [
        'a',
        'abbr',
        'address',
        'article',
        'aside',
        'b',
        'bdi',
        'bdo',
        'blockquote',
        'body',
        'br',
        'button',
        'canvas',
        'caption',
        'cite',
        'code',
        'col',
        'colgroup',
        'dd',
        'del',
        'details',
        'dfn',
        'dialog',
        'div',
        'dl',
        'dt',
        'em',
        'figcaption',
        'figure',
        'footer',
        'form',
        'header',
        'hgroup',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'hr',
        'html',
        'i',
        'iframe',
        'img',
        'input',
        'ins',
        'kbd',
        'label',
        'legend',
        'li',
        'main',
        'meter',
        'nav',
        'ol',
        'output',
        'p',
        'pre',
        'ruby',
        'section',
        'select',
        'small',
        'source',
        'span',
        'strong',
        'sub',
        'summary',
        'sup',
        'table',
        'tbody',
        'td',
        'template',
        'textarea',
        'tfoot',
        'th',
        'thead',
        'tr',
        'u',
        'ul'
      ].map(e => ({ type: 'type', label: e })),
      p = [
        '@charset',
        '@color-profile',
        '@container',
        '@counter-style',
        '@font-face',
        '@font-feature-values',
        '@font-palette-values',
        '@import',
        '@keyframes',
        '@layer',
        '@media',
        '@namespace',
        '@page',
        '@position-try',
        '@property',
        '@scope',
        '@starting-style',
        '@supports',
        '@view-transition'
      ].map(e => ({ type: 'keyword', label: e })),
      f = /^(\w[\w-]*|-\w[\w-]*|)$/,
      m = /^-(-[\w-]*)?$/,
      h = new o.RY(),
      g = ['Declaration'],
      b =
        ((n = e => 'VariableName' == e.name),
        e => {
          let { state: t, pos: r } = e,
            a = (0, l.mv)(t).resolveInner(r, -1),
            i =
              a.type.isError &&
              a.from == a.to - 1 &&
              '-' == t.doc.sliceString(a.from, a.to);
          if (
            'PropertyName' == a.name ||
            ((i || 'TagName' == a.name) &&
              /^(Block|Styles)$/.test(a.resolve(a.to).name))
          )
            return { from: a.from, options: s(), validFor: f };
          if ('ValueName' == a.name)
            return { from: a.from, options: c, validFor: f };
          if ('PseudoClassName' == a.name)
            return { from: a.from, options: u, validFor: f };
          if (
            n(a) ||
            ((e.explicit || i) &&
              (function (e, t) {
                var r;
                if (
                  (('(' == e.name || e.type.isError) && (e = e.parent || e),
                  'ArgList' != e.name)
                )
                  return !1;
                let n = null == (r = e.parent) ? void 0 : r.firstChild;
                return (
                  (null == n ? void 0 : n.name) == 'Callee' &&
                  'var' == t.sliceString(n.from, n.to)
                );
              })(a, t.doc))
          )
            return {
              from: n(a) || i ? a.from : r,
              options: (function e(t, r, n) {
                if (r.to - r.from > 4096) {
                  let a = h.get(r);
                  if (a) return a;
                  let l = [],
                    i = new Set(),
                    s = r.cursor(o.Qj.IncludeAnonymous);
                  if (s.firstChild())
                    do
                      for (let r of e(t, s.node, n))
                        i.has(r.label) || (i.add(r.label), l.push(r));
                    while (s.nextSibling());
                  return (h.set(r, l), l);
                }
                {
                  let e = [],
                    a = new Set();
                  return (
                    r.cursor().iterate(r => {
                      var l;
                      if (
                        n(r) &&
                        r.matchContext(g) &&
                        (null == (l = r.node.nextSibling) ? void 0 : l.name) ==
                          ':'
                      ) {
                        let n = t.sliceString(r.from, r.to);
                        a.has(n) ||
                          (a.add(n), e.push({ label: n, type: 'variable' }));
                      }
                    }),
                    e
                  );
                }
              })(
                t.doc,
                (function (e) {
                  for (let t = e; ;) {
                    if (t.type.isTop) return t;
                    if (!(t = t.parent)) return e;
                  }
                })(a),
                n
              ),
              validFor: m
            };
          if ('TagName' == a.name) {
            for (let { parent: e } = a; e; e = e.parent)
              if ('Block' == e.name)
                return { from: a.from, options: s(), validFor: f };
            return { from: a.from, options: d, validFor: f };
          }
          if ('AtKeyword' == a.name)
            return { from: a.from, options: p, validFor: f };
          if (!e.explicit) return null;
          let b = a.resolve(r),
            y = b.childBefore(r);
          return y && ':' == y.name && 'PseudoClassSelector' == b.name
            ? { from: r, options: u, validFor: f }
            : (y && ':' == y.name && 'Declaration' == b.name) ||
                'ArgList' == b.name
              ? { from: r, options: c, validFor: f }
              : 'Block' == b.name || 'Styles' == b.name
                ? { from: r, options: s(), validFor: f }
                : null;
        }),
      y = l.bj.define({
        name: 'css',
        parser: a.K.configure({
          props: [
            l.Oh.add({ Declaration: (0, l.mz)() }),
            l.b_.add({ 'Block KeyframeList': l.yd })
          ]
        }),
        languageData: {
          commentTokens: { block: { open: '/*', close: '*/' } },
          indentOnInput: /^\s*\}$/,
          wordChars: '-'
        }
      });
    function w() {
      return new l.Yy(y, y.data.of({ autocomplete: b }));
    }
    r.d(t, { AH: () => w }, { Yk: y });
  },
  70028(e, t, r) {
    var n = r(27553),
      a = r(40734),
      l = r(64110),
      o = r(1371),
      i = r(6585),
      s = r(15874);
    let u = ['_blank', '_self', '_top', '_parent'],
      c = ['ascii', 'utf-8', 'utf-16', 'latin1', 'latin1'],
      d = ['get', 'post', 'put', 'delete'],
      p = [
        'application/x-www-form-urlencoded',
        'multipart/form-data',
        'text/plain'
      ],
      f = ['true', 'false'],
      m = {},
      h = {
        a: {
          attrs: {
            href: null,
            ping: null,
            type: null,
            media: null,
            target: u,
            hreflang: null
          }
        },
        abbr: m,
        address: m,
        area: {
          attrs: {
            alt: null,
            coords: null,
            href: null,
            target: null,
            ping: null,
            media: null,
            hreflang: null,
            type: null,
            shape: ['default', 'rect', 'circle', 'poly']
          }
        },
        article: m,
        aside: m,
        audio: {
          attrs: {
            src: null,
            mediagroup: null,
            crossorigin: ['anonymous', 'use-credentials'],
            preload: ['none', 'metadata', 'auto'],
            autoplay: ['autoplay'],
            loop: ['loop'],
            controls: ['controls']
          }
        },
        b: m,
        base: { attrs: { href: null, target: u } },
        bdi: m,
        bdo: m,
        blockquote: { attrs: { cite: null } },
        body: m,
        br: m,
        button: {
          attrs: {
            form: null,
            formaction: null,
            name: null,
            value: null,
            autofocus: ['autofocus'],
            disabled: ['autofocus'],
            formenctype: p,
            formmethod: d,
            formnovalidate: ['novalidate'],
            formtarget: u,
            type: ['submit', 'reset', 'button']
          }
        },
        canvas: { attrs: { width: null, height: null } },
        caption: m,
        center: m,
        cite: m,
        code: m,
        col: { attrs: { span: null } },
        colgroup: { attrs: { span: null } },
        command: {
          attrs: {
            type: ['command', 'checkbox', 'radio'],
            label: null,
            icon: null,
            radiogroup: null,
            command: null,
            title: null,
            disabled: ['disabled'],
            checked: ['checked']
          }
        },
        data: { attrs: { value: null } },
        datagrid: { attrs: { disabled: ['disabled'], multiple: ['multiple'] } },
        datalist: { attrs: { data: null } },
        dd: m,
        del: { attrs: { cite: null, datetime: null } },
        details: { attrs: { open: ['open'] } },
        dfn: m,
        div: m,
        dl: m,
        dt: m,
        em: m,
        embed: { attrs: { src: null, type: null, width: null, height: null } },
        eventsource: { attrs: { src: null } },
        fieldset: { attrs: { disabled: ['disabled'], form: null, name: null } },
        figcaption: m,
        figure: m,
        footer: m,
        form: {
          attrs: {
            action: null,
            name: null,
            'accept-charset': c,
            autocomplete: ['on', 'off'],
            enctype: p,
            method: d,
            novalidate: ['novalidate'],
            target: u
          }
        },
        h1: m,
        h2: m,
        h3: m,
        h4: m,
        h5: m,
        h6: m,
        head: {
          children: [
            'title',
            'base',
            'link',
            'style',
            'meta',
            'script',
            'noscript',
            'command'
          ]
        },
        header: m,
        hgroup: m,
        hr: m,
        html: { attrs: { manifest: null } },
        i: m,
        iframe: {
          attrs: {
            src: null,
            srcdoc: null,
            name: null,
            width: null,
            height: null,
            sandbox: [
              'allow-top-navigation',
              'allow-same-origin',
              'allow-forms',
              'allow-scripts'
            ],
            seamless: ['seamless']
          }
        },
        img: {
          attrs: {
            alt: null,
            src: null,
            ismap: null,
            usemap: null,
            width: null,
            height: null,
            crossorigin: ['anonymous', 'use-credentials']
          }
        },
        input: {
          attrs: {
            alt: null,
            dirname: null,
            form: null,
            formaction: null,
            height: null,
            list: null,
            max: null,
            maxlength: null,
            min: null,
            name: null,
            pattern: null,
            placeholder: null,
            size: null,
            src: null,
            step: null,
            value: null,
            width: null,
            accept: ['audio/*', 'video/*', 'image/*'],
            autocomplete: ['on', 'off'],
            autofocus: ['autofocus'],
            checked: ['checked'],
            disabled: ['disabled'],
            formenctype: p,
            formmethod: d,
            formnovalidate: ['novalidate'],
            formtarget: u,
            multiple: ['multiple'],
            readonly: ['readonly'],
            required: ['required'],
            type: [
              'hidden',
              'text',
              'search',
              'tel',
              'url',
              'email',
              'password',
              'datetime',
              'date',
              'month',
              'week',
              'time',
              'datetime-local',
              'number',
              'range',
              'color',
              'checkbox',
              'radio',
              'file',
              'submit',
              'image',
              'reset',
              'button'
            ]
          }
        },
        ins: { attrs: { cite: null, datetime: null } },
        kbd: m,
        keygen: {
          attrs: {
            challenge: null,
            form: null,
            name: null,
            autofocus: ['autofocus'],
            disabled: ['disabled'],
            keytype: ['RSA']
          }
        },
        label: { attrs: { for: null, form: null } },
        legend: m,
        li: { attrs: { value: null } },
        link: {
          attrs: {
            href: null,
            type: null,
            hreflang: null,
            media: null,
            sizes: ['all', '16x16', '16x16 32x32', '16x16 32x32 64x64']
          }
        },
        map: { attrs: { name: null } },
        mark: m,
        menu: { attrs: { label: null, type: ['list', 'context', 'toolbar'] } },
        meta: {
          attrs: {
            content: null,
            charset: c,
            name: [
              'viewport',
              'application-name',
              'author',
              'description',
              'generator',
              'keywords'
            ],
            'http-equiv': [
              'content-language',
              'content-type',
              'default-style',
              'refresh'
            ]
          }
        },
        meter: {
          attrs: {
            value: null,
            min: null,
            low: null,
            high: null,
            max: null,
            optimum: null
          }
        },
        nav: m,
        noscript: m,
        object: {
          attrs: {
            data: null,
            type: null,
            name: null,
            usemap: null,
            form: null,
            width: null,
            height: null,
            typemustmatch: ['typemustmatch']
          }
        },
        ol: {
          attrs: {
            reversed: ['reversed'],
            start: null,
            type: ['1', 'a', 'A', 'i', 'I']
          },
          children: ['li', 'script', 'template', 'ul', 'ol']
        },
        optgroup: { attrs: { disabled: ['disabled'], label: null } },
        option: {
          attrs: {
            disabled: ['disabled'],
            label: null,
            selected: ['selected'],
            value: null
          }
        },
        output: { attrs: { for: null, form: null, name: null } },
        p: m,
        param: { attrs: { name: null, value: null } },
        pre: m,
        progress: { attrs: { value: null, max: null } },
        q: { attrs: { cite: null } },
        rp: m,
        rt: m,
        ruby: m,
        samp: m,
        script: {
          attrs: {
            type: ['text/javascript'],
            src: null,
            async: ['async'],
            defer: ['defer'],
            charset: c
          }
        },
        section: m,
        select: {
          attrs: {
            form: null,
            name: null,
            size: null,
            autofocus: ['autofocus'],
            disabled: ['disabled'],
            multiple: ['multiple']
          }
        },
        slot: { attrs: { name: null } },
        small: m,
        source: { attrs: { src: null, type: null, media: null } },
        span: m,
        strong: m,
        style: { attrs: { type: ['text/css'], media: null, scoped: null } },
        sub: m,
        summary: m,
        sup: m,
        table: m,
        tbody: m,
        td: { attrs: { colspan: null, rowspan: null, headers: null } },
        template: m,
        textarea: {
          attrs: {
            dirname: null,
            form: null,
            maxlength: null,
            name: null,
            placeholder: null,
            rows: null,
            cols: null,
            autofocus: ['autofocus'],
            disabled: ['disabled'],
            readonly: ['readonly'],
            required: ['required'],
            wrap: ['soft', 'hard']
          }
        },
        tfoot: m,
        th: {
          attrs: {
            colspan: null,
            rowspan: null,
            headers: null,
            scope: ['row', 'col', 'rowgroup', 'colgroup']
          }
        },
        thead: m,
        time: { attrs: { datetime: null } },
        title: m,
        tr: m,
        track: {
          attrs: {
            src: null,
            label: null,
            default: null,
            kind: [
              'subtitles',
              'captions',
              'descriptions',
              'chapters',
              'metadata'
            ],
            srclang: null
          }
        },
        ul: { children: ['li', 'script', 'template', 'ul', 'ol'] },
        var: m,
        video: {
          attrs: {
            src: null,
            poster: null,
            width: null,
            height: null,
            crossorigin: ['anonymous', 'use-credentials'],
            preload: ['auto', 'metadata', 'none'],
            autoplay: ['autoplay'],
            mediagroup: ['movie'],
            muted: ['muted'],
            controls: ['controls']
          }
        },
        wbr: m
      },
      g = {
        accesskey: null,
        class: null,
        contenteditable: f,
        contextmenu: null,
        dir: ['ltr', 'rtl', 'auto'],
        draggable: ['true', 'false', 'auto'],
        dropzone: ['copy', 'move', 'link', 'string:', 'file:'],
        hidden: ['hidden'],
        id: null,
        inert: ['inert'],
        itemid: null,
        itemprop: null,
        itemref: null,
        itemscope: ['itemscope'],
        itemtype: null,
        lang: [
          'ar',
          'bn',
          'de',
          'en-GB',
          'en-US',
          'es',
          'fr',
          'hi',
          'id',
          'ja',
          'pa',
          'pt',
          'ru',
          'tr',
          'zh'
        ],
        spellcheck: f,
        autocorrect: f,
        autocapitalize: f,
        style: null,
        tabindex: null,
        title: null,
        translate: ['yes', 'no'],
        rel: [
          'stylesheet',
          'alternate',
          'author',
          'bookmark',
          'help',
          'license',
          'next',
          'nofollow',
          'noreferrer',
          'prefetch',
          'prev',
          'search',
          'tag'
        ],
        role: 'alert application article banner button cell checkbox complementary contentinfo dialog document feed figure form grid gridcell heading img list listbox listitem main navigation region row rowgroup search switch tab table tabpanel textbox timer'.split(
          ' '
        ),
        'aria-activedescendant': null,
        'aria-atomic': f,
        'aria-autocomplete': ['inline', 'list', 'both', 'none'],
        'aria-busy': f,
        'aria-checked': ['true', 'false', 'mixed', 'undefined'],
        'aria-controls': null,
        'aria-describedby': null,
        'aria-disabled': f,
        'aria-dropeffect': null,
        'aria-expanded': ['true', 'false', 'undefined'],
        'aria-flowto': null,
        'aria-grabbed': ['true', 'false', 'undefined'],
        'aria-haspopup': f,
        'aria-hidden': f,
        'aria-invalid': ['true', 'false', 'grammar', 'spelling'],
        'aria-label': null,
        'aria-labelledby': null,
        'aria-level': null,
        'aria-live': ['off', 'polite', 'assertive'],
        'aria-multiline': f,
        'aria-multiselectable': f,
        'aria-owns': null,
        'aria-posinset': null,
        'aria-pressed': ['true', 'false', 'mixed', 'undefined'],
        'aria-readonly': f,
        'aria-relevant': null,
        'aria-required': f,
        'aria-selected': ['true', 'false', 'undefined'],
        'aria-setsize': null,
        'aria-sort': ['ascending', 'descending', 'none', 'other'],
        'aria-valuemax': null,
        'aria-valuemin': null,
        'aria-valuenow': null,
        'aria-valuetext': null
      },
      b =
        'beforeunload copy cut dragstart dragover dragleave dragenter dragend drag paste focus blur change click load mousedown mouseenter mouseleave mouseup keydown keyup resize scroll unload'
          .split(' ')
          .map(e => 'on' + e);
    for (let e of b) g[e] = null;
    let Schema = class Schema {
      constructor(e, t) {
        ((this.tags = { ...h, ...e }),
          (this.globalAttrs = { ...g, ...t }),
          (this.allTags = Object.keys(this.tags)),
          (this.globalAttrNames = Object.keys(this.globalAttrs)));
      }
    };
    function y(e, t, r = e.length) {
      if (!t) return '';
      let n = t.firstChild,
        a = n && n.getChild('TagName');
      return a ? e.sliceString(a.from, Math.min(a.to, r)) : '';
    }
    function w(e, t = !1) {
      for (; e; e = e.parent)
        if ('Element' == e.name)
          if (!t) return e;
          else t = !1;
      return null;
    }
    function v(e, t, r) {
      let n = r.tags[y(e, w(t))];
      return (null == n ? void 0 : n.children) || r.allTags;
    }
    function k(e, t) {
      let r = [];
      for (let n = w(t); n && !n.type.isTop; n = w(n.parent)) {
        let a = y(e, n);
        if (a && 'CloseTag' == n.lastChild.name) break;
        a &&
          0 > r.indexOf(a) &&
          ('EndTag' == t.name || t.from >= n.firstChild.to) &&
          r.push(a);
      }
      return r;
    }
    Schema.default = new Schema();
    let x = /^[:\-\.\w\u00b7-\uffff]*$/;
    function S(e, t, r, n, a) {
      let l = /\s*>/.test(e.sliceDoc(a, a + 5)) ? '' : '>',
        o = w(r, 'StartTag' == r.name || 'TagName' == r.name);
      return {
        from: n,
        to: a,
        options: v(e.doc, o, t)
          .map(e => ({ label: e, type: 'type' }))
          .concat(
            k(e.doc, r).map((e, t) => ({
              label: '/' + e,
              apply: '/' + e + l,
              type: 'type',
              boost: 99 - t
            }))
          ),
        validFor: /^\/?[:\-\.\w\u00b7-\uffff]*$/
      };
    }
    function O(e, t, r, n) {
      let a = /\s*>/.test(e.sliceDoc(n, n + 5)) ? '' : '>';
      return {
        from: r,
        to: n,
        options: k(e.doc, t).map((e, t) => ({
          label: e,
          apply: e + a,
          type: 'type',
          boost: 99 - t
        })),
        validFor: x
      };
    }
    let T = l.o$.parser.configure({ top: 'SingleExpression' }),
      A = [
        {
          tag: 'script',
          attrs: e => 'text/typescript' == e.type || 'ts' == e.lang,
          parser: l.sL.parser
        },
        {
          tag: 'script',
          attrs: e => 'text/babel' == e.type || 'text/jsx' == e.type,
          parser: l.W6.parser
        },
        {
          tag: 'script',
          attrs: e => 'text/typescript-jsx' == e.type,
          parser: l.g4.parser
        },
        {
          tag: 'script',
          attrs: e =>
            /^(importmap|speculationrules|application\/(.+\+)?json)$/i.test(
              e.type
            ),
          parser: T
        },
        {
          tag: 'script',
          attrs: e =>
            !e.type ||
            /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i.test(
              e.type
            ),
          parser: l.o$.parser
        },
        {
          tag: 'style',
          attrs: e =>
            (!e.lang || 'css' == e.lang) &&
            (!e.type || /^(text\/)?(x-)?(stylesheet|css)$/i.test(e.type)),
          parser: a.Yk.parser
        }
      ],
      C = [
        { name: 'style', parser: a.Yk.parser.configure({ top: 'Styles' }) }
      ].concat(b.map(e => ({ name: e, parser: l.o$.parser }))),
      P = s.bj.define({
        name: 'html',
        parser: n.K.configure({
          props: [
            s.Oh.add({
              Element(e) {
                let t = /^(\s*)(<\/)?/.exec(e.textAfter);
                return e.node.to <= e.pos + t[0].length
                  ? e.continue()
                  : e.lineIndent(e.node.from) + (t[2] ? 0 : e.unit);
              },
              'OpenTag CloseTag SelfClosingTag': e =>
                e.column(e.node.from) + e.unit,
              Document(e) {
                if (e.pos + /\s*/.exec(e.textAfter)[0].length < e.node.to)
                  return e.continue();
                let t = null,
                  r;
                for (let r = e.node; ;) {
                  let e = r.lastChild;
                  if (!e || 'Element' != e.name || e.to != r.to) break;
                  t = r = e;
                }
                return t &&
                  !(
                    (r = t.lastChild) &&
                    ('CloseTag' == r.name || 'SelfClosingTag' == r.name)
                  )
                  ? e.lineIndent(t.from) + e.unit
                  : null;
              }
            }),
            s.b_.add({
              Element(e) {
                let t = e.firstChild,
                  r = e.lastChild;
                return t && 'OpenTag' == t.name
                  ? { from: t.to, to: 'CloseTag' == r.name ? r.from : e.to }
                  : null;
              }
            }),
            s.Q_.add({ 'OpenTag CloseTag': e => e.getChild('TagName') })
          ]
        }),
        languageData: {
          commentTokens: { block: { open: '\x3c!--', close: '--\x3e' } },
          indentOnInput: /^\s*<\/\w+\W$/,
          wordChars: '-_'
        }
      }),
      _ = P.configure({ wrap: (0, n.n)(A, C) });
    function $(e = {}) {
      let t = '',
        r;
      (!1 === e.matchClosingTags && (t = 'noMatch'),
        !0 === e.selfClosingTags && (t = (t ? t + ' ' : '') + 'selfClosing'),
        ((e.nestedLanguages && e.nestedLanguages.length) ||
          (e.nestedAttributes && e.nestedAttributes.length)) &&
          (r = (0, n.n)(
            (e.nestedLanguages || []).concat(A),
            (e.nestedAttributes || []).concat(C)
          )));
      let o = r
        ? P.configure({ wrap: r, dialect: t })
        : t
          ? _.configure({ dialect: t })
          : _;
      return new s.Yy(o, [
        _.data.of({
          autocomplete: (function (e) {
            let { extraTags: t, extraGlobalAttributes: r } = e,
              n = r || t ? new Schema(t, r) : Schema.default;
            return e =>
              (function (e, t) {
                let { state: r, pos: n } = t,
                  a = (0, s.mv)(r).resolveInner(n, -1),
                  l = a.resolve(n);
                for (let e = n, t; l == a && (t = a.childBefore(e));) {
                  let r = t.lastChild;
                  if (!r || !r.type.isError || r.from < r.to) break;
                  ((l = a = t), (e = r.from));
                }
                if ('TagName' == a.name)
                  return a.parent && /CloseTag$/.test(a.parent.name)
                    ? O(r, a, a.from, n)
                    : S(r, e, a, a.from, n);
                if ('StartTag' == a.name || 'IncompleteTag' == a.name)
                  return S(r, e, a, n, n);
                if ('StartCloseTag' == a.name || 'IncompleteCloseTag' == a.name)
                  return O(r, a, n, n);
                if (
                  'OpenTag' == a.name ||
                  'SelfClosingTag' == a.name ||
                  'AttributeName' == a.name
                ) {
                  var o, i;
                  let t, l, s;
                  return (
                    (o = a),
                    (i = 'AttributeName' == a.name ? a.from : n),
                    (s =
                      (l = (t = w(o)) ? e.tags[y(r.doc, t)] : null) && l.attrs
                        ? Object.keys(l.attrs)
                        : []),
                    {
                      from: i,
                      to: n,
                      options: (l && !1 === l.globalAttrs
                        ? s
                        : s.length
                          ? s.concat(e.globalAttrNames)
                          : e.globalAttrNames
                      ).map(e => ({ label: e, type: 'property' })),
                      validFor: x
                    }
                  );
                }
                {
                  if (
                    'Is' == a.name ||
                    'AttributeValue' == a.name ||
                    'UnquotedAttributeValue' == a.name
                  )
                    return (function (e, t, r, n, a) {
                      var l;
                      let o =
                          null == (l = r.parent)
                            ? void 0
                            : l.getChild('AttributeName'),
                        i = [],
                        s;
                      if (o) {
                        let l = e.sliceDoc(o.from, o.to),
                          u = t.globalAttrs[l];
                        if (!u) {
                          let n = w(r),
                            a = n ? t.tags[y(e.doc, n)] : null;
                          u = (null == a ? void 0 : a.attrs) && a.attrs[l];
                        }
                        if (u) {
                          let t = e.sliceDoc(n, a).toLowerCase(),
                            r = '"',
                            l = '"';
                          for (let o of (/^['"]/.test(t)
                            ? ((s = '"' == t[0] ? /^[^"]*$/ : /^[^']*$/),
                              (r = ''),
                              (l = e.sliceDoc(a, a + 1) == t[0] ? '' : t[0]),
                              (t = t.slice(1)),
                              n++)
                            : (s = /^[^\s<>='"]*$/),
                          u))
                            i.push({
                              label: o,
                              apply: r + o + l,
                              type: 'constant'
                            });
                        }
                      }
                      return { from: n, to: a, options: i, validFor: s };
                    })(r, e, a, 'Is' == a.name ? n : a.from, n);
                  if (
                    !t.explicit ||
                    ('Element' != l.name &&
                      'Text' != l.name &&
                      'Document' != l.name)
                  )
                    return null;
                  var u = a;
                  let o = [],
                    i = 0;
                  for (let t of v(r.doc, u, e))
                    o.push({ label: '<' + t, type: 'type' });
                  for (let e of k(r.doc, u))
                    o.push({
                      label: '</' + e + '>',
                      type: 'type',
                      boost: 99 - i++
                    });
                  return {
                    from: n,
                    to: n,
                    options: o,
                    validFor: /^<\/?[:\-\.\w\u00b7-\uffff]*$/
                  };
                }
              })(n, e);
          })(e)
        }),
        !1 !== e.autoCloseTags ? N : [],
        (0, l.Q2)().support,
        (0, a.AH)().support
      ]);
    }
    let D = new Set(
        'area base br col command embed frame hr img input keygen link meta param source track wbr menuitem'.split(
          ' '
        )
      ),
      N = o.Lz.inputHandler.of((e, t, r, n, a) => {
        if (
          e.composing ||
          e.state.readOnly ||
          t != r ||
          ('>' != n && '/' != n) ||
          !_.isActiveAt(e.state, t, -1)
        )
          return !1;
        let l = a(),
          { state: o } = l,
          u = o.changeByRange(e => {
            var t;
            let r = o.doc.sliceString(e.from - 1, e.to) == n,
              { head: a } = e,
              l = (0, s.mv)(o).resolveInner(a, -1),
              u;
            if (r && '>' == n && 'EndTag' == l.name) {
              let t = l.parent;
              if (
                (u = y(o.doc, t.parent, a)) &&
                !D.has(u) &&
                !(function (e, t, r) {
                  for (var n; ;) {
                    if (
                      (null == (n = t.lastChild) ? void 0 : n.name) !=
                      'CloseTag'
                    )
                      return !1;
                    let a = t.parent;
                    if (!a || y(e, a) != r) return !0;
                    t = a;
                  }
                })(o.doc, t.parent, u)
              ) {
                let t = a + +('>' === o.doc.sliceString(a, a + 1));
                return {
                  range: e,
                  changes: { from: a, to: t, insert: `</${u}>` }
                };
              }
            } else if (r && '/' == n && 'IncompleteCloseTag' == l.name) {
              let e = l.parent;
              if (
                l.from == a - 2 &&
                (null == (t = e.lastChild) ? void 0 : t.name) != 'CloseTag' &&
                (u = y(o.doc, e, a)) &&
                !D.has(u)
              ) {
                let e = a + +('>' === o.doc.sliceString(a, a + 1)),
                  t = `${u}>`;
                return {
                  range: i.OF.cursor(a + t.length, -1),
                  changes: { from: a, to: e, insert: t }
                };
              }
            }
            return { range: e };
          });
        return (
          !u.changes.empty &&
          (e.dispatch([
            l,
            o.update(u, { userEvent: 'input.complete', scrollIntoView: !0 })
          ]),
          !0)
        );
      });
    r.d(t, { qy: () => $ });
  },
  64110(e, t, r) {
    var n = r(87699),
      a = r(15874),
      l = r(6585),
      o = r(1371),
      i = r(47404),
      s = r(90365);
    let u = [
        (0, i.Gw)('function ${name}(${params}) {\n	${}\n}', {
          label: 'function',
          detail: 'definition',
          type: 'keyword'
        }),
        (0, i.Gw)(
          'for (let ${index} = 0; ${index} < ${bound}; ${index}++) {\n	${}\n}',
          { label: 'for', detail: 'loop', type: 'keyword' }
        ),
        (0, i.Gw)('for (let ${name} of ${collection}) {\n	${}\n}', {
          label: 'for',
          detail: 'of loop',
          type: 'keyword'
        }),
        (0, i.Gw)('do {\n	${}\n} while (${})', {
          label: 'do',
          detail: 'loop',
          type: 'keyword'
        }),
        (0, i.Gw)('while (${}) {\n	${}\n}', {
          label: 'while',
          detail: 'loop',
          type: 'keyword'
        }),
        (0, i.Gw)('try {\n	${}\n} catch (${error}) {\n	${}\n}', {
          label: 'try',
          detail: '/ catch block',
          type: 'keyword'
        }),
        (0, i.Gw)('if (${}) {\n	${}\n}', {
          label: 'if',
          detail: 'block',
          type: 'keyword'
        }),
        (0, i.Gw)('if (${}) {\n	${}\n} else {\n	${}\n}', {
          label: 'if',
          detail: '/ else block',
          type: 'keyword'
        }),
        (0, i.Gw)('class ${name} {\n	constructor(${params}) {\n		${}\n	}\n}', {
          label: 'class',
          detail: 'definition',
          type: 'keyword'
        }),
        (0, i.Gw)('import {${names}} from "${module}"\n${}', {
          label: 'import',
          detail: 'named',
          type: 'keyword'
        }),
        (0, i.Gw)('import ${name} from "${module}"\n${}', {
          label: 'import',
          detail: 'default',
          type: 'keyword'
        })
      ],
      c = u.concat([
        (0, i.Gw)('interface ${name} {\n	${}\n}', {
          label: 'interface',
          detail: 'definition',
          type: 'keyword'
        }),
        (0, i.Gw)('type ${name} = ${type}', {
          label: 'type',
          detail: 'definition',
          type: 'keyword'
        }),
        (0, i.Gw)('enum ${name} {\n	${}\n}', {
          label: 'enum',
          detail: 'definition',
          type: 'keyword'
        })
      ]),
      d = new s.RY(),
      p = new Set([
        'Script',
        'Block',
        'FunctionExpression',
        'FunctionDeclaration',
        'ArrowFunction',
        'MethodDeclaration',
        'ForStatement'
      ]);
    function f(e) {
      return (t, r) => {
        let n = t.node.getChild('VariableDefinition');
        return (n && r(n, e), !0);
      };
    }
    let m = ['FunctionDeclaration'],
      h = {
        FunctionDeclaration: f('function'),
        ClassDeclaration: f('class'),
        ClassExpression: () => !0,
        EnumDeclaration: f('constant'),
        TypeAliasDeclaration: f('type'),
        NamespaceDeclaration: f('namespace'),
        VariableDefinition(e, t) {
          e.matchContext(m) || t(e, 'variable');
        },
        TypeDefinition(e, t) {
          t(e, 'type');
        },
        __proto__: null
      },
      g = /^[\w$\xa1-\uffff][\w$\d\xa1-\uffff]*$/,
      b = [
        'TemplateString',
        'String',
        'RegExp',
        'LineComment',
        'BlockComment',
        'VariableDefinition',
        'TypeDefinition',
        'Label',
        'PropertyDefinition',
        'PropertyName',
        'PrivatePropertyDefinition',
        'PrivatePropertyName',
        'JSXText',
        'JSXAttributeValue',
        'JSXOpenTag',
        'JSXCloseTag',
        'JSXSelfClosingTag',
        '.',
        '?.'
      ];
    function y(e) {
      let t = (0, a.mv)(e.state).resolveInner(e.pos, -1);
      if (b.indexOf(t.name) > -1) return null;
      let r =
        'VariableName' == t.name ||
        (t.to - t.from < 20 && g.test(e.state.sliceDoc(t.from, t.to)));
      if (!r && !e.explicit) return null;
      let n = [];
      for (let r = t; r; r = r.parent)
        p.has(r.name) &&
          (n = n.concat(
            (function e(t, r) {
              let n = d.get(r);
              if (n) return n;
              let a = [],
                l = !0;
              function o(e, r) {
                let n = t.sliceString(e.from, e.to);
                a.push({ label: n, type: r });
              }
              return (
                r.cursor(s.Qj.IncludeAnonymous).iterate(r => {
                  if (l) l = !1;
                  else if (r.name) {
                    let e = h[r.name];
                    if ((e && e(r, o)) || p.has(r.name)) return !1;
                  } else if (r.to - r.from > 8192) {
                    for (let n of e(t, r.node)) a.push(n);
                    return !1;
                  }
                }),
                d.set(r, a),
                a
              );
            })(e.state.doc, r)
          ));
      return { options: n, from: r ? t.from : e.pos, validFor: g };
    }
    let w = a.bj.define({
        name: 'javascript',
        parser: n.K.configure({
          props: [
            a.Oh.add({
              IfStatement: (0, a.mz)({ except: /^\s*({|else\b)/ }),
              TryStatement: (0, a.mz)({ except: /^\s*({|catch\b|finally\b)/ }),
              LabeledStatement: a._Y,
              SwitchBody: e => {
                let t = e.textAfter,
                  r = /^\s*\}/.test(t),
                  n = /^\s*(case|default)\b/.test(t);
                return e.baseIndent + (r ? 0 : n ? 1 : 2) * e.unit;
              },
              Block: (0, a.Ay)({ closing: '}' }),
              ArrowFunction: e => e.baseIndent + e.unit,
              'TemplateString BlockComment': () => null,
              'Statement Property': (0, a.mz)({ except: /^\s*{/ }),
              JSXElement(e) {
                let t = /^\s*<\//.test(e.textAfter);
                return e.lineIndent(e.node.from) + (t ? 0 : e.unit);
              },
              JSXEscape(e) {
                let t = /\s*\}/.test(e.textAfter);
                return e.lineIndent(e.node.from) + (t ? 0 : e.unit);
              },
              'JSXOpenTag JSXSelfClosingTag': e =>
                e.column(e.node.from) + e.unit
            }),
            a.b_.add({
              'Block ClassBody SwitchBody EnumBody ObjectExpression ArrayExpression ObjectType':
                a.yd,
              BlockComment: e => ({ from: e.from + 2, to: e.to - 2 }),
              JSXElement(e) {
                let t = e.firstChild;
                if (!t || 'JSXSelfClosingTag' == t.name) return null;
                let r = e.lastChild;
                return { from: t.to, to: r.type.isError ? e.to : r.from };
              },
              'JSXSelfClosingTag JSXOpenTag'(e) {
                var t;
                let r = null == (t = e.firstChild) ? void 0 : t.nextSibling,
                  n = e.lastChild;
                return !r || r.type.isError
                  ? null
                  : { from: r.to, to: n.type.isError ? e.to : n.from };
              }
            })
          ]
        }),
        languageData: {
          closeBrackets: { brackets: ['(', '[', '{', "'", '"', '`'] },
          commentTokens: { line: '//', block: { open: '/*', close: '*/' } },
          indentOnInput: /^\s*(?:case |default:|\{|\}|<\/)$/,
          wordChars: '$'
        }
      }),
      v = {
        test: e => /^JSX/.test(e.name),
        facet: (0, a.p9)({
          commentTokens: { block: { open: '{/*', close: '*/}' } }
        })
      },
      k = w.configure({ dialect: 'ts' }, 'typescript'),
      x = w.configure({
        dialect: 'jsx',
        props: [a.Q0.add(e => (e.isTop ? [v] : void 0))]
      }),
      S = w.configure(
        { dialect: 'jsx ts', props: [a.Q0.add(e => (e.isTop ? [v] : void 0))] },
        'typescript'
      ),
      O = e => ({ label: e, type: 'keyword' }),
      T =
        'break case const continue default delete export extends false finally in instanceof let new return static super switch this throw true typeof var yield'
          .split(' ')
          .map(O),
      A = T.concat(
        ['declare', 'implements', 'private', 'protected', 'public'].map(O)
      );
    function C(e = {}) {
      let t = e.jsx ? (e.typescript ? S : x) : e.typescript ? k : w,
        r = e.typescript ? c.concat(A) : u.concat(T);
      return new a.Yy(t, [
        w.data.of({ autocomplete: (0, i.Ar)(b, (0, i.et)(r)) }),
        w.data.of({ autocomplete: y }),
        e.jsx ? $ : []
      ]);
    }
    function P(e, t, r = e.length) {
      for (let n = null == t ? void 0 : t.firstChild; n; n = n.nextSibling)
        if (
          'JSXIdentifier' == n.name ||
          'JSXBuiltin' == n.name ||
          'JSXNamespacedName' == n.name ||
          'JSXMemberExpression' == n.name
        )
          return e.sliceString(n.from, Math.min(n.to, r));
      return '';
    }
    let _ =
        'object' == typeof navigator && /Android\b/.test(navigator.userAgent),
      $ = o.Lz.inputHandler.of((e, t, r, n, o) => {
        if (
          (_ ? e.composing : e.compositionStarted) ||
          e.state.readOnly ||
          t != r ||
          ('>' != n && '/' != n) ||
          !w.isActiveAt(e.state, t, -1)
        )
          return !1;
        let i = o(),
          { state: s } = i,
          u = s.changeByRange(e => {
            var t;
            let { head: r } = e,
              o = (0, a.mv)(s).resolveInner(r - 1, -1),
              i;
            if (
              ('JSXStartTag' == o.name && (o = o.parent),
              s.doc.sliceString(r - 1, r) != n ||
                ('JSXAttributeValue' == o.name && o.to > r))
            );
            else if ('>' == n && 'JSXFragmentTag' == o.name)
              return { range: e, changes: { from: r, insert: '</>' } };
            else if ('/' == n && 'JSXStartCloseTag' == o.name) {
              let e = o.parent,
                n = e.parent;
              if (
                n &&
                e.from == r - 2 &&
                ((i = P(s.doc, n.firstChild, r)) ||
                  (null == (t = n.firstChild) ? void 0 : t.name) ==
                    'JSXFragmentTag')
              ) {
                let e = `${i}>`;
                return {
                  range: l.OF.cursor(r + e.length, -1),
                  changes: { from: r, insert: e }
                };
              }
            } else if ('>' == n) {
              let t = (function (e) {
                for (;;) {
                  if (
                    'JSXOpenTag' == e.name ||
                    'JSXSelfClosingTag' == e.name ||
                    'JSXFragmentTag' == e.name
                  )
                    return e;
                  if ('JSXEscape' == e.name || !e.parent) return null;
                  e = e.parent;
                }
              })(o);
              if (
                t &&
                'JSXOpenTag' == t.name &&
                !/^\/?>|^<\//.test(s.doc.sliceString(r, r + 2)) &&
                (i = P(s.doc, t, r))
              )
                return { range: e, changes: { from: r, insert: `</${i}>` } };
            }
            return { range: e };
          });
        return (
          !u.changes.empty &&
          (e.dispatch([
            i,
            s.update(u, { userEvent: 'input.complete', scrollIntoView: !0 })
          ]),
          !0)
        );
      });
    r.d(t, { Q2: () => C }, { W6: x, g4: S, o$: w, sL: k });
  },
  42570(e, t, r) {
    var n = r(15874),
      a = r(43720),
      l = r(48820);
    let o = {
        __proto__: null,
        anyref: 34,
        dataref: 34,
        eqref: 34,
        externref: 34,
        i31ref: 34,
        funcref: 34,
        i8: 34,
        i16: 34,
        i32: 34,
        i64: 34,
        f32: 34,
        f64: 34
      },
      i = l.U1.deserialize({
        version: 14,
        states:
          "!^Q]QPOOOqQPO'#CbOOQO'#Cd'#CdOOQO'#Cl'#ClOOQO'#Ch'#ChQ]QPOOOOQO,58|,58|OxQPO,58|OOQO-E6f-E6fOOQO1G.h1G.h",
        stateData: '!P~O_OSPOSQOS~OTPOVROXROYROZROaQO~OSUO~P]OSXO~P]O',
        goto: 'xaPPPPPPbPbPPPhPPPrXROPTVQTOQVPTWTVXSOPTV',
        nodeNames:
          '⚠ LineComment BlockComment Module ) ( App Identifier Type Keyword Number String',
        maxTerm: 17,
        nodeProps: [
          ['isolate', -3, 1, 2, 11, ''],
          ['openedBy', 4, '('],
          ['closedBy', 5, ')'],
          ['group', -6, 6, 7, 8, 9, 10, 11, 'Expression']
        ],
        skippedNodes: [0, 1, 2],
        repeatNodeCount: 1,
        tokenData:
          "0o~R^XY}YZ}]^}pq}rs!Stu#pxy'Uyz(e{|(j}!O(j!Q!R(s!R![*p!]!^.^#T#o.{~!SO_~~!VVOr!Srs!ls#O!S#O#P!q#P;'S!S;'S;=`#j<%lO!S~!qOZ~~!tRO;'S!S;'S;=`!};=`O!S~#QWOr!Srs!ls#O!S#O#P!q#P;'S!S;'S;=`#j;=`<%l!S<%lO!S~#mP;=`<%l!S~#siqr%bst%btu%buv%bvw%bwx%bz{%b{|%b}!O%b!O!P%b!P!Q%b!Q![%b![!]%b!^!_%b!_!`%b!`!a%b!a!b%b!b!c%b!c!}%b#Q#R%b#R#S%b#S#T%b#T#o%b#p#q%b#r#s%b~%giV~qr%bst%btu%buv%bvw%bwx%bz{%b{|%b}!O%b!O!P%b!P!Q%b!Q![%b![!]%b!^!_%b!_!`%b!`!a%b!a!b%b!b!c%b!c!}%b#Q#R%b#R#S%b#S#T%b#T#o%b#p#q%b#r#s%b~'ZPT~!]!^'^~'aTO!]'^!]!^'p!^;'S'^;'S;=`(_<%lO'^~'sVOy'^yz(Yz!]'^!]!^'p!^;'S'^;'S;=`(_<%lO'^~(_OQ~~(bP;=`<%l'^~(jOS~~(mQ!Q!R(s!R![*p~(xUY~!O!P)[!Q![*p!g!h){#R#S+U#X#Y){#l#m+[~)aRY~!Q![)j!g!h){#X#Y){~)oSY~!Q![)j!g!h){#R#S*j#X#Y){~*OR{|*X}!O*X!Q![*_~*[P!Q![*_~*dQY~!Q![*_#R#S*X~*mP!Q![)j~*uTY~!O!P)[!Q![*p!g!h){#R#S+U#X#Y){~+XP!Q![*p~+_R!Q![+h!c!i+h#T#Z+h~+mVY~!O!P,S!Q![+h!c!i+h!r!s-P#R#S+[#T#Z+h#d#e-P~,XTY~!Q![,h!c!i,h!r!s-P#T#Z,h#d#e-P~,mUY~!Q![,h!c!i,h!r!s-P#R#S.Q#T#Z,h#d#e-P~-ST{|-c}!O-c!Q![-o!c!i-o#T#Z-o~-fR!Q![-o!c!i-o#T#Z-o~-tSY~!Q![-o!c!i-o#R#S-c#T#Z-o~.TR!Q![,h!c!i,h#T#Z,h~.aP!]!^.d~.iSP~OY.dZ;'S.d;'S;=`.u<%lO.d~.xP;=`<%l.d~/QiX~qr.{st.{tu.{uv.{vw.{wx.{z{.{{|.{}!O.{!O!P.{!P!Q.{!Q![.{![!].{!^!_.{!_!`.{!`!a.{!a!b.{!b!c.{!c!}.{#Q#R.{#R#S.{#S#T.{#T#o.{#p#q.{#r#s.{",
        tokenizers: [0],
        topRules: { Module: [0, 3] },
        specialized: [{ term: 9, get: e => o[e] || -1 }],
        tokenPrec: 0
      }),
      s = n.bj.define({
        name: 'wast',
        parser: i.configure({
          props: [
            n.Oh.add({ App: (0, n.Ay)({ closing: ')', align: !1 }) }),
            n.b_.add({
              App: n.yd,
              BlockComment: e => ({ from: e.from + 2, to: e.to - 2 })
            }),
            (0, a.pn)({
              Keyword: a._A.keyword,
              Type: a._A.typeName,
              Number: a._A.number,
              String: a._A.string,
              Identifier: a._A.variableName,
              LineComment: a._A.lineComment,
              BlockComment: a._A.blockComment,
              '( )': a._A.paren
            })
          ]
        }),
        languageData: {
          commentTokens: { line: ';;', block: { open: '(;', close: ';)' } },
          closeBrackets: { brackets: ['(', '"'] }
        }
      });
    function u() {
      return new n.Yy(s);
    }
    r.d(t, { C: () => u });
  },
  15874(e, t, r) {
    var n,
      a = r(90365),
      l = r(6585),
      o = r(1371),
      i = r(43720),
      s = r(97417);
    let u = new a.uY();
    function c(e) {
      return l.sj.define({ combine: e ? t => t.concat(e) : void 0 });
    }
    let d = new a.uY();
    let Language = class Language {
      constructor(e, t, r = [], n = '') {
        ((this.data = e),
          (this.name = n),
          l.$t.prototype.hasOwnProperty('tree') ||
            Object.defineProperty(l.$t.prototype, 'tree', {
              get() {
                return f(this);
              }
            }),
          (this.parser = t),
          (this.extension = [
            w.of(this),
            l.$t.languageData.of((e, t, r) => {
              let n = p(e, t, r),
                a = n.type.prop(u);
              if (!a) return [];
              let l = e.facet(a),
                o = n.type.prop(d);
              if (o) {
                let a = n.resolve(t - n.from, r);
                for (let t of o)
                  if (t.test(a, e)) {
                    let r = e.facet(t.facet);
                    return 'replace' == t.type ? r : r.concat(l);
                  }
              }
              return l;
            })
          ].concat(r)));
      }
      isActiveAt(e, t, r = -1) {
        return p(e, t, r).type.prop(u) == this.data;
      }
      findRegions(e) {
        let t = e.facet(w);
        if ((null == t ? void 0 : t.data) == this.data)
          return [{ from: 0, to: e.doc.length }];
        if (!t || !t.allowsNesting) return [];
        let r = [],
          n = (e, t) => {
            if (e.prop(u) == this.data)
              return void r.push({ from: t, to: t + e.length });
            let l = e.prop(a.uY.mounted);
            if (l) {
              if (l.tree.prop(u) == this.data) {
                if (l.overlay)
                  for (let e of l.overlay)
                    r.push({ from: e.from + t, to: e.to + t });
                else r.push({ from: t, to: t + e.length });
                return;
              } else if (l.overlay) {
                let e = r.length;
                if ((n(l.tree, l.overlay[0].from + t), r.length > e)) return;
              }
            }
            for (let r = 0; r < e.children.length; r++) {
              let l = e.children[r];
              l instanceof a.PH && n(l, e.positions[r] + t);
            }
          };
        return (n(f(e), 0), r);
      }
      get allowsNesting() {
        return !0;
      }
    };
    function p(e, t, r) {
      let n = e.facet(w),
        l = f(e).topNode;
      if (!n || n.allowsNesting)
        for (
          let e = l;
          e;
          e = e.enter(t, r, a.Qj.ExcludeBuffers | a.Qj.EnterBracketed)
        )
          e.type.isTop && (l = e);
      return l;
    }
    Language.setState = l.Pe.define();
    let LRLanguage = class LRLanguage extends Language {
      constructor(e, t, r) {
        (super(e, t, [], r), (this.parser = t));
      }
      static define(e) {
        let t = c(e.languageData);
        return new LRLanguage(
          t,
          e.parser.configure({ props: [u.add(e => (e.isTop ? t : void 0))] }),
          e.name
        );
      }
      configure(e, t) {
        return new LRLanguage(
          this.data,
          this.parser.configure(e),
          t || this.name
        );
      }
      get allowsNesting() {
        return this.parser.hasWrappers();
      }
    };
    function f(e) {
      let t = e.field(Language.state, !1);
      return t ? t.tree : a.PH.empty;
    }
    let DocInput = class DocInput {
      constructor(e) {
        ((this.doc = e),
          (this.cursorPos = 0),
          (this.string = ''),
          (this.cursor = e.iter()));
      }
      get length() {
        return this.doc.length;
      }
      syncTo(e) {
        return (
          (this.string = this.cursor.next(e - this.cursorPos).value),
          (this.cursorPos = e + this.string.length),
          this.cursorPos - this.string.length
        );
      }
      chunk(e) {
        return (this.syncTo(e), this.string);
      }
      get lineChunks() {
        return !0;
      }
      read(e, t) {
        let r = this.cursorPos - this.string.length;
        return e < r || t >= this.cursorPos
          ? this.doc.sliceString(e, t)
          : this.string.slice(e - r, t - r);
      }
    };
    let m = null;
    let ParseContext = class ParseContext {
      constructor(e, t, r = [], n, a, l, o, i) {
        ((this.parser = e),
          (this.state = t),
          (this.fragments = r),
          (this.tree = n),
          (this.treeLen = a),
          (this.viewport = l),
          (this.skipped = o),
          (this.scheduleOn = i),
          (this.parse = null),
          (this.tempSkipped = []));
      }
      static create(e, t, r) {
        return new ParseContext(e, t, [], a.PH.empty, 0, r, [], null);
      }
      startParse() {
        return this.parser.startParse(
          new DocInput(this.state.doc),
          this.fragments
        );
      }
      work(e, t) {
        return (null != t && t >= this.state.doc.length && (t = void 0),
        this.tree != a.PH.empty &&
          this.isDone(null != t ? t : this.state.doc.length))
          ? (this.takeTree(), !0)
          : this.withContext(() => {
              var r;
              if ('number' == typeof e) {
                let t = Date.now() + e;
                e = () => Date.now() > t;
              }
              for (
                this.parse || (this.parse = this.startParse()),
                  null != t &&
                    (null == this.parse.stoppedAt ||
                      this.parse.stoppedAt > t) &&
                    t < this.state.doc.length &&
                    this.parse.stopAt(t);
                ;
              ) {
                let n = this.parse.advance();
                if (n) {
                  if (
                    ((this.fragments = this.withoutTempSkipped(
                      a.rr.addTree(
                        n,
                        this.fragments,
                        null != this.parse.stoppedAt
                      )
                    )),
                    (this.treeLen =
                      null != (r = this.parse.stoppedAt)
                        ? r
                        : this.state.doc.length),
                    (this.tree = n),
                    (this.parse = null),
                    !(this.treeLen < (null != t ? t : this.state.doc.length)))
                  )
                    return !0;
                  this.parse = this.startParse();
                }
                if (e()) return !1;
              }
            });
      }
      takeTree() {
        let e, t;
        this.parse &&
          (e = this.parse.parsedPos) >= this.treeLen &&
          ((null == this.parse.stoppedAt || this.parse.stoppedAt > e) &&
            this.parse.stopAt(e),
          this.withContext(() => {
            for (; !(t = this.parse.advance()););
          }),
          (this.treeLen = e),
          (this.tree = t),
          (this.fragments = this.withoutTempSkipped(
            a.rr.addTree(this.tree, this.fragments, !0)
          )),
          (this.parse = null));
      }
      withContext(e) {
        let t = m;
        m = this;
        try {
          return e();
        } finally {
          m = t;
        }
      }
      withoutTempSkipped(e) {
        for (let t; (t = this.tempSkipped.pop());) e = h(e, t.from, t.to);
        return e;
      }
      changes(e, t) {
        let {
          fragments: r,
          tree: n,
          treeLen: l,
          viewport: o,
          skipped: i
        } = this;
        if ((this.takeTree(), !e.empty)) {
          let t = [];
          if (
            (e.iterChangedRanges((e, r, n, a) =>
              t.push({ fromA: e, toA: r, fromB: n, toB: a })
            ),
            (r = a.rr.applyChanges(r, t)),
            (n = a.PH.empty),
            (l = 0),
            (o = { from: e.mapPos(o.from, -1), to: e.mapPos(o.to, 1) }),
            this.skipped.length)
          )
            for (let t of ((i = []), this.skipped)) {
              let r = e.mapPos(t.from, 1),
                n = e.mapPos(t.to, -1);
              r < n && i.push({ from: r, to: n });
            }
        }
        return new ParseContext(this.parser, t, r, n, l, o, i, this.scheduleOn);
      }
      updateViewport(e) {
        if (this.viewport.from == e.from && this.viewport.to == e.to) return !1;
        this.viewport = e;
        let t = this.skipped.length;
        for (let t = 0; t < this.skipped.length; t++) {
          let { from: r, to: n } = this.skipped[t];
          r < e.to &&
            n > e.from &&
            ((this.fragments = h(this.fragments, r, n)),
            this.skipped.splice(t--, 1));
        }
        return !(this.skipped.length >= t) && (this.reset(), !0);
      }
      reset() {
        this.parse && (this.takeTree(), (this.parse = null));
      }
      skipUntilInView(e, t) {
        this.skipped.push({ from: e, to: t });
      }
      static getSkippingParser(e) {
        return new (class extends a.iX {
          createParse(t, r, n) {
            let l = n[0].from,
              o = n[n.length - 1].to;
            return {
              parsedPos: l,
              advance() {
                let t = m;
                if (t) {
                  for (let e of n) t.tempSkipped.push(e);
                  e &&
                    (t.scheduleOn = t.scheduleOn
                      ? Promise.all([t.scheduleOn, e])
                      : e);
                }
                return (
                  (this.parsedPos = o),
                  new a.PH(a.Z6.none, [], [], o - l)
                );
              },
              stoppedAt: null,
              stopAt() {}
            };
          }
        })();
      }
      isDone(e) {
        e = Math.min(e, this.state.doc.length);
        let t = this.fragments;
        return this.treeLen >= e && t.length && 0 == t[0].from && t[0].to >= e;
      }
      static get() {
        return m;
      }
    };
    function h(e, t, r) {
      return a.rr.applyChanges(e, [{ fromA: t, toA: r, fromB: t, toB: r }]);
    }
    let LanguageState = class LanguageState {
      constructor(e) {
        ((this.context = e), (this.tree = e.tree));
      }
      apply(e) {
        if (!e.docChanged && this.tree == this.context.tree) return this;
        let t = this.context.changes(e.changes, e.state),
          r =
            this.context.treeLen == e.startState.doc.length
              ? void 0
              : Math.max(e.changes.mapPos(this.context.treeLen), t.viewport.to);
        return (t.work(20, r) || t.takeTree(), new LanguageState(t));
      }
      static init(e) {
        let t = Math.min(3e3, e.doc.length),
          r = ParseContext.create(e.facet(w).parser, e, { from: 0, to: t });
        return (r.work(20, t) || r.takeTree(), new LanguageState(r));
      }
    };
    Language.state = l.sU.define({
      create: LanguageState.init,
      update(e, t) {
        for (let e of t.effects) if (e.is(Language.setState)) return e.value;
        return t.startState.facet(w) != t.state.facet(w)
          ? LanguageState.init(t.state)
          : e.apply(t);
      }
    });
    let g = e => {
      let t = setTimeout(() => e(), 500);
      return () => clearTimeout(t);
    };
    'u' > typeof requestIdleCallback &&
      (g = e => {
        let t = -1,
          r = setTimeout(() => {
            t = requestIdleCallback(e, { timeout: 400 });
          }, 100);
        return () => (t < 0 ? clearTimeout(r) : cancelIdleCallback(t));
      });
    let b =
        'u' > typeof navigator &&
        (null == (n = navigator.scheduling) ? void 0 : n.isInputPending)
          ? () => navigator.scheduling.isInputPending()
          : null,
      y = o.Z9.fromClass(
        class {
          constructor(e) {
            ((this.view = e),
              (this.working = null),
              (this.workScheduled = 0),
              (this.chunkEnd = -1),
              (this.chunkBudget = -1),
              (this.work = this.work.bind(this)),
              this.scheduleWork());
          }
          update(e) {
            let t = this.view.state.field(Language.state).context;
            ((t.updateViewport(e.view.viewport) ||
              this.view.viewport.to > t.treeLen) &&
              this.scheduleWork(),
              (e.docChanged || e.selectionSet) &&
                (this.view.hasFocus && (this.chunkBudget += 50),
                this.scheduleWork()),
              this.checkAsyncSchedule(t));
          }
          scheduleWork() {
            if (this.working) return;
            let { state: e } = this.view,
              t = e.field(Language.state);
            (t.tree == t.context.tree && t.context.isDone(e.doc.length)) ||
              (this.working = g(this.work));
          }
          work(e) {
            this.working = null;
            let t = Date.now();
            if (
              (this.chunkEnd < t &&
                (this.chunkEnd < 0 || this.view.hasFocus) &&
                ((this.chunkEnd = t + 3e4), (this.chunkBudget = 3e3)),
              this.chunkBudget <= 0)
            )
              return;
            let {
                state: r,
                viewport: { to: n }
              } = this.view,
              a = r.field(Language.state);
            if (a.tree == a.context.tree && a.context.isDone(n + 1e5)) return;
            let l =
                Date.now() +
                Math.min(
                  this.chunkBudget,
                  100,
                  e && !b ? Math.max(25, e.timeRemaining() - 5) : 1e9
                ),
              o = a.context.treeLen < n && r.doc.length > n + 1e3,
              i = a.context.work(
                () => (b && b()) || Date.now() > l,
                n + 1e5 * !o
              );
            ((this.chunkBudget -= Date.now() - t),
              (i || this.chunkBudget <= 0) &&
                (a.context.takeTree(),
                this.view.dispatch({
                  effects: Language.setState.of(new LanguageState(a.context))
                })),
              this.chunkBudget > 0 && !(i && !o) && this.scheduleWork(),
              this.checkAsyncSchedule(a.context));
          }
          checkAsyncSchedule(e) {
            e.scheduleOn &&
              (this.workScheduled++,
              e.scheduleOn
                .then(() => this.scheduleWork())
                .catch(e => (0, o.c_)(this.view.state, e))
                .then(() => this.workScheduled--),
              (e.scheduleOn = null));
          }
          destroy() {
            this.working && this.working();
          }
          isWorking() {
            return !!(this.working || this.workScheduled > 0);
          }
        },
        {
          eventHandlers: {
            focus() {
              this.scheduleWork();
            }
          }
        }
      ),
      w = l.sj.define({
        combine: e => (e.length ? e[0] : null),
        enables: e => [
          Language.state,
          y,
          o.Lz.contentAttributes.compute([e], t => {
            let r = t.facet(e);
            return r && r.name ? { 'data-language': r.name } : {};
          })
        ]
      });
    let LanguageSupport = class LanguageSupport {
      constructor(e, t = []) {
        ((this.language = e), (this.support = t), (this.extension = [e, t]));
      }
    };
    let v = l.sj.define(),
      k = l.sj.define({
        combine: e => {
          if (!e.length) return '  ';
          let t = e[0];
          if (!t || /\S/.test(t) || Array.from(t).some(e => e != t[0]))
            throw Error('Invalid indent unit: ' + JSON.stringify(e[0]));
          return t;
        }
      });
    function x(e) {
      let t = e.facet(k);
      return 9 == t.charCodeAt(0) ? e.tabSize * t.length : t.length;
    }
    function S(e, t) {
      let r = '',
        n = e.tabSize,
        a = e.facet(k)[0];
      if ('	' == a) {
        for (; t >= n;) ((r += '	'), (t -= n));
        a = ' ';
      }
      for (let e = 0; e < t; e++) r += a;
      return r;
    }
    function O(e, t) {
      for (let r of (e instanceof l.$t && (e = new IndentContext(e)),
      e.state.facet(v))) {
        let n = r(e, t);
        if (void 0 !== n) return n;
      }
      let r = f(e.state);
      return r.length >= t
        ? (function (e, t, r) {
            let n = t.resolveStack(r),
              a = t
                .resolveInner(r, -1)
                .resolve(r, 0)
                .enterUnfinishedNodesBefore(r);
            if (a != n.node) {
              let e = [];
              for (
                let t = a;
                t &&
                !(
                  t.from < n.node.from ||
                  t.to > n.node.to ||
                  (t.from == n.node.from && t.type == n.node.type)
                );
                t = t.parent
              )
                e.push(t);
              for (let t = e.length - 1; t >= 0; t--)
                n = { node: e[t], next: n };
            }
            return A(n, e, r);
          })(e, r, t)
        : null;
    }
    let IndentContext = class IndentContext {
      constructor(e, t = {}) {
        ((this.state = e), (this.options = t), (this.unit = x(e)));
      }
      lineAt(e, t = 1) {
        let r = this.state.doc.lineAt(e),
          { simulateBreak: n, simulateDoubleBreak: a } = this.options;
        if (null != n && n >= r.from && n <= r.to)
          if (a && n == e) return { text: '', from: e };
          else if (t < 0 ? n < e : n <= e)
            return { text: r.text.slice(n - r.from), from: n };
          else return { text: r.text.slice(0, n - r.from), from: r.from };
        return r;
      }
      textAfterPos(e, t = 1) {
        if (this.options.simulateDoubleBreak && e == this.options.simulateBreak)
          return '';
        let { text: r, from: n } = this.lineAt(e, t);
        return r.slice(e - n, Math.min(r.length, e + 100 - n));
      }
      column(e, t = 1) {
        let { text: r, from: n } = this.lineAt(e, t),
          a = this.countColumn(r, e - n),
          l = this.options.overrideIndentation
            ? this.options.overrideIndentation(n)
            : -1;
        return (l > -1 && (a += l - this.countColumn(r, r.search(/\S|$/))), a);
      }
      countColumn(e, t = e.length) {
        return (0, l.y$)(e, this.state.tabSize, t);
      }
      lineIndent(e, t = 1) {
        let { text: r, from: n } = this.lineAt(e, t),
          a = this.options.overrideIndentation;
        if (a) {
          let e = a(n);
          if (e > -1) return e;
        }
        return this.countColumn(r, r.search(/\S|$/));
      }
      get simulatedBreak() {
        return this.options.simulateBreak || null;
      }
    };
    let T = new a.uY();
    function A(e, t, r) {
      for (let n = e; n; n = n.next) {
        let e = (function (e) {
          let t = e.type.prop(T);
          if (t) return t;
          let r = e.firstChild,
            n;
          if (r && (n = r.type.prop(a.uY.closedBy))) {
            let t = e.lastChild,
              r = t && n.indexOf(t.name) > -1;
            return e =>
              _(
                e,
                !0,
                1,
                void 0,
                r &&
                  !(
                    e.pos == e.options.simulateBreak &&
                    e.options.simulateDoubleBreak
                  )
                  ? t.from
                  : void 0
              );
          }
          return null == e.parent ? C : null;
        })(n.node);
        if (e) return e(TreeIndentContext.create(t, r, n));
      }
      return 0;
    }
    function C() {
      return 0;
    }
    let TreeIndentContext = class TreeIndentContext extends IndentContext {
      constructor(e, t, r) {
        (super(e.state, e.options),
          (this.base = e),
          (this.pos = t),
          (this.context = r));
      }
      get node() {
        return this.context.node;
      }
      static create(e, t, r) {
        return new TreeIndentContext(e, t, r);
      }
      get textAfter() {
        return this.textAfterPos(this.pos);
      }
      get baseIndent() {
        return this.baseIndentFor(this.node);
      }
      baseIndentFor(e) {
        let t = this.state.doc.lineAt(e.from);
        for (;;) {
          let r = e.resolve(t.from);
          for (; r.parent && r.parent.from == r.from;) r = r.parent;
          if (
            (function (e, t) {
              for (let r = t; r; r = r.parent) if (e == r) return !0;
              return !1;
            })(r, e)
          )
            break;
          t = this.state.doc.lineAt(r.from);
        }
        return this.lineIndent(t.from);
      }
      continue() {
        return A(this.context.next, this.base, this.pos);
      }
    };
    function P({ closing: e, align: t = !0, units: r = 1 }) {
      return n => _(n, t, r, e);
    }
    function _(e, t, r, n, a) {
      let l = e.textAfter,
        o = l.match(/^\s*/)[0].length,
        i = (n && l.slice(o, o + n.length) == n) || a == e.pos + o,
        s = t
          ? (function (e) {
              let t = e.node,
                r = t.childAfter(t.from),
                n = t.lastChild;
              if (!r) return null;
              let a = e.options.simulateBreak,
                l = e.state.doc.lineAt(r.from),
                o = null == a || a <= l.from ? l.to : Math.min(l.to, a);
              for (let e = r.to; ;) {
                let a = t.childAfter(e);
                if (!a || a == n) return null;
                if (!a.type.isSkipped) {
                  if (a.from >= o) return null;
                  let e = /^ */.exec(l.text.slice(r.to - l.from))[0].length;
                  return { from: r.from, to: r.to + e };
                }
                e = a.to;
              }
            })(e)
          : null;
      return s
        ? i
          ? e.column(s.from)
          : e.column(s.to)
        : e.baseIndent + (i ? 0 : e.unit * r);
    }
    function $({ except: e, units: t = 1 } = {}) {
      return r => {
        let n = e && e.test(r.textAfter);
        return r.baseIndent + (n ? 0 : t * r.unit);
      };
    }
    function D() {
      return l.$t.transactionFilter.of(e => {
        if (
          !e.docChanged ||
          (!e.isUserEvent('input.type') && !e.isUserEvent('input.complete'))
        )
          return e;
        let t = e.startState.languageDataAt(
          'indentOnInput',
          e.startState.selection.main.head
        );
        if (!t.length) return e;
        let r = e.newDoc,
          { head: n } = e.newSelection.main,
          a = r.lineAt(n);
        if (n > a.from + 200) return e;
        let l = r.sliceString(a.from, n);
        if (!t.some(e => e.test(l))) return e;
        let { state: o } = e,
          i = -1,
          s = [];
        for (let { head: e } of o.selection.ranges) {
          let t = o.doc.lineAt(e);
          if (t.from == i) continue;
          i = t.from;
          let r = O(o, t.from);
          if (null == r) continue;
          let n = /^\s*/.exec(t.text)[0],
            a = S(o, r);
          n != a && s.push({ from: t.from, to: t.from + n.length, insert: a });
        }
        return s.length ? [e, { changes: s, sequential: !0 }] : e;
      });
    }
    let N = new a.uY();
    function L(e) {
      let t = e.firstChild,
        r = e.lastChild;
      return t && t.to < r.from
        ? { from: t.to, to: r.type.isError ? e.to : r.from }
        : null;
    }
    function Q(e, t) {
      let r = t.mapPos(e.from, 1),
        n = t.mapPos(e.to, -1);
      return r >= n ? void 0 : { from: r, to: n };
    }
    let I = l.Pe.define({ map: Q }),
      z = l.Pe.define({ map: Q }),
      B = l.sU.define({
        create: () => o.NZ.none,
        update(e, t) {
          (t.isUserEvent('delete') &&
            t.changes.iterChangedRanges((t, r) => (e = j(e, t, r))),
            (e = e.map(t.changes)));
          let r = [];
          for (let n of t.effects)
            n.is(I) &&
            !(function (e, t, r) {
              let n = !1;
              return (
                e.between(t, t, (e, a) => {
                  e == t && a == r && (n = !0);
                }),
                n
              );
            })(e, n.value.from, n.value.to)
              ? r.push(n.value)
              : n.is(z) &&
                (e = e.update({
                  filter: (e, t) => n.value.from != e || n.value.to != t,
                  filterFrom: n.value.from,
                  filterTo: n.value.to
                }));
          if (r.length) {
            let { preparePlaceholder: n } = t.state.facet(X),
              a = r.map(e =>
                (n
                  ? o.NZ.replace({
                      widget: new PreparedFoldWidget(n(t.state, e))
                    })
                  : q
                ).range(e.from, e.to)
              );
            e = e.update({ add: a });
          }
          return (t.selection && (e = j(e, t.selection.main.head)), e);
        },
        provide: e => o.Lz.decorations.from(e),
        toJSON(e, t) {
          let r = [];
          return (
            e.between(0, t.doc.length, (e, t) => {
              r.push(e, t);
            }),
            r
          );
        },
        fromJSON(e) {
          if (!Array.isArray(e) || e.length % 2)
            throw RangeError('Invalid JSON for fold state');
          let t = [];
          for (let r = 0; r < e.length;) {
            let n = e[r++],
              a = e[r++];
            if ('number' != typeof n || 'number' != typeof a)
              throw RangeError('Invalid JSON for fold state');
            t.push(q.range(n, a));
          }
          return o.NZ.set(t, !0);
        }
      });
    function j(e, t, r = t) {
      let n = !1;
      return (
        e.between(t, r, (e, a) => {
          e < r && a > t && (n = !0);
        }),
        n
          ? e.update({
              filterFrom: t,
              filterTo: r,
              filter: (e, n) => e >= r || n <= t
            })
          : e
      );
    }
    let R = {
        placeholderDOM: null,
        preparePlaceholder: null,
        placeholderText: '…'
      },
      X = l.sj.define({ combine: e => (0, l.QR)(e, R) });
    function E(e, t) {
      let { state: r } = e,
        n = r.facet(X),
        a = t => {
          var r, n, a, l;
          let o,
            i = e.lineBlockAt(e.posAtDOM(t.target)),
            s =
              ((r = e.state),
              (n = i.from),
              (a = i.to),
              (o = null),
              null == (l = r.field(B, !1)) ||
                l.between(n, a, (e, t) => {
                  (!o || o.from > e) && (o = { from: e, to: t });
                }),
              o);
          (s && e.dispatch({ effects: z.of(s) }), t.preventDefault());
        };
      if (n.placeholderDOM) return n.placeholderDOM(e, a, t);
      let l = document.createElement('span');
      return (
        (l.textContent = n.placeholderText),
        l.setAttribute('aria-label', r.phrase('folded code')),
        (l.title = r.phrase('unfold')),
        (l.className = 'cm-foldPlaceholder'),
        (l.onclick = a),
        l
      );
    }
    let q = o.NZ.replace({
      widget: new (class extends o.xO {
        toDOM(e) {
          return E(e, null);
        }
      })()
    });
    let PreparedFoldWidget = class PreparedFoldWidget extends o.xO {
      constructor(e) {
        (super(), (this.value = e));
      }
      eq(e) {
        return this.value == e.value;
      }
      toDOM(e) {
        return E(e, this.value);
      }
    };
    o.wJ;
    let HighlightStyle = class HighlightStyle {
      constructor(e, t) {
        let r;
        function n(e) {
          let t = s.G.newName();
          return (((r || (r = Object.create(null)))['.' + t] = e), t);
        }
        this.specs = e;
        let a = 'string' == typeof t.all ? t.all : t.all ? n(t.all) : void 0,
          l = t.scope;
        ((this.scope =
          l instanceof Language
            ? e => e.prop(u) == l.data
            : l
              ? e => e == l
              : void 0),
          (this.style = (0, i.az)(
            e.map(e => ({
              tag: e.tag,
              class: e.class || n(Object.assign({}, e, { tag: null }))
            })),
            { all: a }
          ).style),
          (this.module = r ? new s.G(r) : null),
          (this.themeType = t.themeType));
      }
      static define(e, t) {
        return new HighlightStyle(e, t || {});
      }
    };
    let Y = l.sj.define(),
      F = l.sj.define({ combine: e => (e.length ? [e[0]] : null) });
    function J(e) {
      let t = e.facet(Y);
      return t.length ? t : e.facet(F);
    }
    function Z(e, t) {
      let r = [M],
        n;
      return (
        e instanceof HighlightStyle &&
          (e.module && r.push(o.Lz.styleModule.of(e.module)),
          (n = e.themeType)),
        (null == t ? void 0 : t.fallback)
          ? r.push(F.of(e))
          : n
            ? r.push(
                Y.computeN([o.Lz.darkTheme], t =>
                  t.facet(o.Lz.darkTheme) == ('dark' == n) ? [e] : []
                )
              )
            : r.push(Y.of(e)),
        r
      );
    }
    let TreeHighlighter = class TreeHighlighter {
      constructor(e) {
        ((this.markCache = Object.create(null)),
          (this.tree = f(e.state)),
          (this.decorations = this.buildDeco(e, J(e.state))),
          (this.decoratedTo = e.viewport.to));
      }
      update(e) {
        let t = f(e.state),
          r = J(e.state),
          n = r != J(e.startState),
          { viewport: a } = e.view,
          l = e.changes.mapPos(this.decoratedTo, 1);
        t.length < a.to && !n && t.type == this.tree.type && l >= a.to
          ? ((this.decorations = this.decorations.map(e.changes)),
            (this.decoratedTo = l))
          : (t != this.tree || e.viewportChanged || n) &&
            ((this.tree = t),
            (this.decorations = this.buildDeco(e.view, r)),
            (this.decoratedTo = a.to));
      }
      buildDeco(e, t) {
        if (!t || !this.tree.length) return o.NZ.none;
        let r = new l.vB();
        for (let { from: n, to: a } of e.visibleRanges)
          (0, i.DM)(
            this.tree,
            t,
            (e, t, n) => {
              r.add(
                e,
                t,
                this.markCache[n] ||
                  (this.markCache[n] = o.NZ.mark({ class: n }))
              );
            },
            n,
            a
          );
        return r.finish();
      }
    };
    let M = l.Nb.high(
        o.Z9.fromClass(TreeHighlighter, { decorations: e => e.decorations })
      ),
      V = HighlightStyle.define([
        { tag: i._A.meta, color: '#404740' },
        { tag: i._A.link, textDecoration: 'underline' },
        { tag: i._A.heading, textDecoration: 'underline', fontWeight: 'bold' },
        { tag: i._A.emphasis, fontStyle: 'italic' },
        { tag: i._A.strong, fontWeight: 'bold' },
        { tag: i._A.strikethrough, textDecoration: 'line-through' },
        { tag: i._A.keyword, color: '#708' },
        {
          tag: [
            i._A.atom,
            i._A.bool,
            i._A.url,
            i._A.contentSeparator,
            i._A.labelName
          ],
          color: '#219'
        },
        { tag: [i._A.literal, i._A.inserted], color: '#164' },
        { tag: [i._A.string, i._A.deleted], color: '#a11' },
        {
          tag: [i._A.regexp, i._A.escape, i._A.special(i._A.string)],
          color: '#e40'
        },
        { tag: i._A.definition(i._A.variableName), color: '#00f' },
        { tag: i._A.local(i._A.variableName), color: '#30a' },
        { tag: [i._A.typeName, i._A.namespace], color: '#085' },
        { tag: i._A.className, color: '#167' },
        {
          tag: [i._A.special(i._A.variableName), i._A.macroName],
          color: '#256'
        },
        { tag: i._A.definition(i._A.propertyName), color: '#00c' },
        { tag: i._A.comment, color: '#940' },
        { tag: i._A.invalid, color: '#f00' }
      ]),
      G = o.Lz.baseTheme({
        '&.cm-focused .cm-matchingBracket': { backgroundColor: '#328c8252' },
        '&.cm-focused .cm-nonmatchingBracket': { backgroundColor: '#bb555544' }
      }),
      W = '()[]{}',
      H = l.sj.define({
        combine: e =>
          (0, l.QR)(e, {
            afterCursor: !0,
            brackets: W,
            maxScanDistance: 1e4,
            renderMatch: ee
          })
      }),
      U = o.NZ.mark({ class: 'cm-matchingBracket' }),
      K = o.NZ.mark({ class: 'cm-nonmatchingBracket' });
    function ee(e) {
      let t = [],
        r = e.matched ? U : K;
      return (
        t.push(r.range(e.start.from, e.start.to)),
        e.end && t.push(r.range(e.end.from, e.end.to)),
        t
      );
    }
    function et(e) {
      let t = [],
        r = e.facet(H);
      for (let n of e.selection.ranges) {
        if (!n.empty) continue;
        let a =
          ei(e, n.head, -1, r) ||
          (n.head > 0 && ei(e, n.head - 1, 1, r)) ||
          (r.afterCursor &&
            (ei(e, n.head, 1, r) ||
              (n.head < e.doc.length && ei(e, n.head + 1, -1, r))));
        a && (t = t.concat(r.renderMatch(a, e)));
      }
      return o.NZ.set(t, !0);
    }
    let er = [
      o.Z9.fromClass(
        class {
          constructor(e) {
            ((this.paused = !1), (this.decorations = et(e.state)));
          }
          update(e) {
            (e.docChanged || e.selectionSet || this.paused) &&
              (e.view.composing
                ? ((this.decorations = this.decorations.map(e.changes)),
                  (this.paused = !0))
                : ((this.decorations = et(e.state)), (this.paused = !1)));
          }
        },
        { decorations: e => e.decorations }
      ),
      G
    ];
    function en(e = {}) {
      return [H.of(e), er];
    }
    let ea = new a.uY();
    function el(e, t, r) {
      let n = e.prop(t < 0 ? a.uY.openedBy : a.uY.closedBy);
      if (n) return n;
      if (1 == e.name.length) {
        let n = r.indexOf(e.name);
        if (n > -1 && n % 2 == +(t < 0)) return [r[n + t]];
      }
      return null;
    }
    function eo(e) {
      let t = e.type.prop(ea);
      return t ? t(e.node) : e;
    }
    function ei(e, t, r, n = {}) {
      let a = n.maxScanDistance || 1e4,
        l = n.brackets || W,
        o = f(e),
        i = o.resolveInner(t, r);
      for (let e = i; e; e = e.parent) {
        let n = el(e.type, r, l);
        if (n && e.from < e.to) {
          let a = eo(e);
          if (a && (r > 0 ? t >= a.from && t < a.to : t > a.from && t <= a.to))
            return (function (e, t, r, n, a) {
              let l = t.parent,
                o = { from: r.from, to: r.to },
                i = 0,
                s = null == l ? void 0 : l.cursor();
              if (s && (e < 0 ? s.childBefore(t.from) : s.childAfter(t.to)))
                do
                  if (e < 0 ? s.to <= t.from : s.from >= t.to) {
                    if (
                      0 == i &&
                      n.indexOf(s.type.name) > -1 &&
                      s.from < s.to
                    ) {
                      let e = eo(s);
                      return {
                        start: o,
                        end: e ? { from: e.from, to: e.to } : void 0,
                        matched: !0
                      };
                    } else if (el(s.type, e, a)) i++;
                    else if (el(s.type, -e, a)) {
                      if (0 == i) {
                        let e = eo(s);
                        return {
                          start: o,
                          end:
                            e && e.from < e.to
                              ? { from: e.from, to: e.to }
                              : void 0,
                          matched: !1
                        };
                      }
                      i--;
                    }
                  }
                while (e < 0 ? s.prevSibling() : s.nextSibling());
              return { start: o, matched: !1 };
            })(r, e, a, n, l);
        }
      }
      return (function (e, t, r, n, a, l, o) {
        if (r < 0 ? !t : t == e.doc.length) return null;
        let i = r < 0 ? e.sliceDoc(t - 1, t) : e.sliceDoc(t, t + 1),
          s = o.indexOf(i);
        if (s < 0 || (s % 2 == 0) != r > 0) return null;
        let u = { from: r < 0 ? t - 1 : t, to: r > 0 ? t + 1 : t },
          c = e.doc.iterRange(t, r > 0 ? e.doc.length : 0),
          d = 0;
        for (let e = 0; !c.next().done && e <= l;) {
          let l = c.value;
          r < 0 && (e += l.length);
          let i = t + e * r;
          for (
            let e = r > 0 ? 0 : l.length - 1, t = r > 0 ? l.length : -1;
            e != t;
            e += r
          ) {
            let t = o.indexOf(l[e]);
            if (!(t < 0) && n.resolveInner(i + e, 1).type == a)
              if ((t % 2 == 0) == r > 0) d++;
              else {
                if (1 == d)
                  return {
                    start: u,
                    end: { from: i + e, to: i + e + 1 },
                    matched: t >> 1 == s >> 1
                  };
                d--;
              }
          }
          r > 0 && (e += l.length);
        }
        return c.done ? { start: u, matched: !1 } : null;
      })(e, t, r, o, i.type, a, l);
    }
    let es = Object.create(null),
      eu = [a.Z6.none],
      ec = [],
      ed = Object.create(null),
      ep = Object.create(null);
    for (let [e, t] of [
      ['variable', 'variableName'],
      ['variable-2', 'variableName.special'],
      ['string-2', 'string.special'],
      ['def', 'variableName.definition'],
      ['tag', 'tagName'],
      ['attribute', 'attributeName'],
      ['type', 'typeName'],
      ['builtin', 'variableName.standard'],
      ['qualifier', 'modifier'],
      ['error', 'invalid'],
      ['header', 'heading'],
      ['property', 'propertyName']
    ])
      ep[e] = (function (e, t) {
        let r = [];
        for (let n of t.split(' ')) {
          let t = [];
          for (let r of n.split('.')) {
            let n = e[r] || i._A[r];
            n
              ? 'function' == typeof n
                ? t.length
                  ? (t = t.map(n))
                  : ef(r, `Modifier ${r} used at start of tag`)
                : t.length
                  ? ef(r, `Tag ${r} used as modifier`)
                  : (t = Array.isArray(n) ? n : [n])
              : ef(r, `Unknown highlighting tag ${r}`);
          }
          for (let e of t) r.push(e);
        }
        if (!r.length) return 0;
        let n = t.replace(/ /g, '_'),
          l = n + ' ' + r.map(e => e.id),
          o = ed[l];
        if (o) return o.id;
        let s = (ed[l] = a.Z6.define({
          id: eu.length,
          name: n,
          props: [(0, i.pn)({ [n]: r })]
        }));
        return (eu.push(s), s.id);
      })(es, t);
    function ef(e, t) {
      ec.indexOf(e) > -1 || (ec.push(e), console.warn(t));
    }
    (o.OP.RTL,
      o.OP.LTR,
      r.d(
        t,
        {
          Ay: () => P,
          EI: () => S,
          KB: () => IndentContext,
          SG: () => en,
          WD: () => D,
          Yy: () => LanguageSupport,
          _v: () => O,
          bj: () => LRLanguage,
          cr: () => HighlightStyle,
          jU: () => ei,
          mv: () => f,
          mz: () => $,
          p9: () => c,
          tp: () => x,
          y9: () => Z,
          yd: () => L
        },
        { Oh: T, Q0: d, Q_: ea, Xt: k, Zt: V, _Y: e => e.baseIndent, b_: N }
      ));
  }
};
//# sourceMappingURL=8520.7597407affc3a83a.js.map
