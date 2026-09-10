// combined.js — head-loaded scripts merged into one file.
//
// This concatenates runtime.js + three module chunks (5909, 4585, index)
// into a single script that self-orchestrates. Dynamically-loaded chunks
// (prism-*.js etc.) still live as separate files under static/client/ and
// load on demand via the runtime's chunk-URL builder.

let __webpack_require__;

// === runtime.js ===
(function () {
  var s,
    e,
    a,
    r,
    c,
    f,
    i,
    b,
    p,
    d,
    m,
    j = {},
    t = {};
  function o(s) {
    var e = t[s];
    if (void 0 !== e) return e.exports;
    var a = (t[s] = { id: s, exports: {} });
    return (j[s].call(a.exports, a, a.exports, o), a.exports);
  }
  ((o.m = j),
    (o.c = t),
    (e = (s = 'function' == typeof Symbol)
      ? Symbol('rspack queues')
      : '__rspack_queues'),
    (a = o.aE = s ? Symbol('rspack exports') : '__webpack_exports__'),
    (r = s ? Symbol('rspack error') : '__rspack_error'),
    (c = s ? Symbol('rspack done') : '__rspack_done'),
    (f = o.zS = s ? Symbol('rspack defer') : '__rspack_defer'),
    (o.zT = s => {
      if (
        s.some(s => {
          var e = t[s];
          return !e || !1 === e[c];
        })
      )
        return { then: (e, a) => Promise.all(s.map(o)).then(e, a) };
    }),
    (i = s => {
      s &&
        s.d < 1 &&
        ((s.d = 1),
        s.forEach(s => s.r--),
        s.forEach(s => (s.r-- ? s.r++ : s())));
    }),
    (o.a = (s, b, p) => {
      p && ((d = []).d = -1);
      var d,
        m,
        j,
        t,
        l = new Set(),
        n = s.exports,
        u = new Promise((s, e) => {
          ((t = e), (j = s));
        });
      ((u[a] = n),
        (u[e] = s => {
          (d && s(d), l.forEach(s), u.catch(() => {}));
        }),
        (s.exports = u),
        b(
          s => {
            m = s.map(s => {
              if (null !== s && 'object' == typeof s) {
                if (!s[e] && s[f]) {
                  var c = o.zT(s[f]);
                  if (!c) return s;
                  var b = s;
                  s = {
                    then(s, e) {
                      c.then(() => s(b), e);
                    }
                  };
                }
                if (s[e]) return s;
                if (s.then) {
                  var p = [];
                  ((p.d = 0),
                    s.then(
                      s => {
                        ((d[a] = s), i(p));
                      },
                      s => {
                        ((d[r] = s), i(p));
                      }
                    ));
                  var d = {};
                  return ((d[f] = !1), (d[e] = s => s(p)), d);
                }
              }
              var m = {};
              return ((m[e] = () => {}), (m[a] = s), m);
            });
            var c,
              b = () =>
                m.map(s => {
                  if (s[f]) return s;
                  if (s[r]) throw s[r];
                  return s[a];
                }),
              p = new Promise(s => {
                (c = () => s(b)).r = 0;
                var a = s =>
                  s !== d &&
                  !l.has(s) &&
                  (l.add(s), s && !s.d && (c.r++, s.push(c)));
                m.map(s => s[f] || s[e](a));
              });
            return c.r ? p : b();
          },
          s => (s ? t((u[r] = s)) : j(n), i(d), (u[c] = !0))
        ),
        d && d.d < 0 && (d.d = 0));
    }),
    (o.n = s => {
      var e = s && s.__esModule ? () => s.default : () => s;
      return (o.d(e, { a: e }), e);
    }),
    (p = Object.getPrototypeOf
      ? s => Object.getPrototypeOf(s)
      : s => s.__proto__),
    (o.t = function (s, e) {
      if (
        (1 & e && (s = this(s)),
        8 & e ||
          ('object' == typeof s &&
            s &&
            ((4 & e && s.__esModule) ||
              (16 & e && 'function' == typeof s.then))))
      )
        return s;
      var a = Object.create(null);
      o.r(a);
      var r = {};
      b = b || [null, p({}), p([]), p(p)];
      for (
        var c = 2 & e && s;
        ('object' == typeof c || 'function' == typeof c) && !~b.indexOf(c);
        c = p(c)
      )
        Object.getOwnPropertyNames(c).forEach(e => {
          r[e] = () => s[e];
        });
      return ((r.default = () => s), o.d(a, r), a);
    }),
    (o.d = (s, e, a) => {
      var r = (e, a) => {
        for (var r in e)
          o.o(e, r) &&
            !o.o(s, r) &&
            Object.defineProperty(s, r, { enumerable: !0, [a]: e[r] });
      };
      (r(e, 'get'), r(a, 'value'));
    }),
    (o.f = {}),
    (o.e = s =>
      Promise.all(Object.keys(o.f).reduce((e, a) => (o.f[a](s, e), e), []))));
  var l = o;
  ((o.u = s =>
    '' +
    ({
      1023: 'prism-sas-js',
      105: 'prism-kotlin-js',
      1052: 'prism-web-idl-js',
      1074: 'prism-cooklang-js',
      1148: 'prism-stylus-js',
      1163: 'prism-julia-js',
      1198: 'prism-uri-js',
      1209: 'prism-llvm-js',
      1211: 'prism-lilypond-js',
      1230: 'prism-verilog-js',
      1234: 'prism-io-js',
      1243: 'prism-idris-js',
      1353: 'prism-rip-js',
      1379: 'prism-linker-script-js',
      1384: 'prism-ada-js',
      1436: 'prism-openqasm-js',
      1488: 'prism-clojure-js',
      1594: 'prism-clike-js',
      1614: 'prism-basic-js',
      1656: 'prism-git-js',
      167: 'prism-bqn-js',
      17: 'prism-brainfuck-js',
      1729: 'prism-wgsl-js',
      1742: 'prism-j-js',
      1754: 'prism-avisynth-js',
      181: 'prism-monkey-js',
      1855: 'prism-hpkp-js',
      1888: 'prism-purebasic-js',
      1897: 'prism-javastacktrace-js',
      1917: 'prism-solidity-js',
      1957: 'prism-actionscript-js',
      1971: 'prism-coq-js',
      2046: 'prism-gherkin-js',
      2256: 'prism-rescript-js',
      2317: 'prism-antlr4-js',
      2326: 'prism-javadoc-js',
      2328: 'prism-batch-js',
      2381: 'prism-cue-js',
      2396: 'prism-turtle-js',
      2422: 'prism-bnf-js',
      2439: 'prism-naniscript-js',
      2443: 'prism-javascript-js',
      2500: 'prism-chaiscript-js',
      2538: 'prism-jsonp-js',
      2548: 'prism-rest-js',
      2555: 'prism-nsis-js',
      2578: 'prism-smarty-js',
      2647: 'prism-arturo-js',
      2649: 'prism-nasm-js',
      2727: 'prism-splunk-spl-js',
      276: 'prism-iecst-js',
      2770: 'prism-zig-js',
      2812: 'prism-solution-file-js',
      2890: 'prism-csp-js',
      2964: 'prism-uorazor-js',
      2966: 'prism-r-js',
      2988: 'prism-wren-js',
      3026: 'prism-wiki-js',
      3076: 'prism-wolfram-js',
      3100: 'prism-nim-js',
      3141: 'prism-ichigojam-js',
      3150: 'prism-apacheconf-js',
      3157: 'prism-css-extras-js',
      3172: 'prism-cil-js',
      3201: 'prism-jq-js',
      3298: 'prism-ftl-js',
      3310: 'prism-lisp-js',
      3323: 'prism-dns-zone-file-js',
      3396: 'prism-excel-formula-js',
      3503: 'prism-abnf-js',
      3522: 'prism-hoon-js',
      3535: 'prism-awk-js',
      3543: 'prism-t4-cs-js',
      357: 'prism-less-js',
      3621: 'prism-applescript-js',
      3634: 'prism-lua-js',
      367: 'prism-yaml-js',
      3695: 'prism-django-js',
      3725: 'prism-al-js',
      3733: 'prism-regex-js',
      3755: 'prism-bsl-js',
      3798: 'prism-renpy-js',
      3805: 'prism-shell-session-js',
      3855: 'prism-gradle-js',
      3857: 'prism-vbnet-js',
      3864: 'prism-phpdoc-js',
      391: 'prism-protobuf-js',
      3997: 'prism-dot-js',
      4008: 'prism-kumir-js',
      4054: 'prism-pascal-js',
      4068: 'prism-asm6502-js',
      418: 'prism-systemd-js',
      4203: 'prism-diff-js',
      4213: 'prism-warpscript-js',
      4227: 'prism-scheme-js',
      4270: 'prism-docker-js',
      4275: 'prism-cpp-js',
      4334: 'prism-bbj-js',
      4338: 'prism-dhall-js',
      4342: 'prism-ini-js',
      4387: 'prism-oz-js',
      4431: 'prism-rego-js',
      4448: 'prism-smali-js',
      4461: 'prism-bicep-js',
      4468: 'prism-ejs-js',
      4479: 'prism-hlsl-js',
      4492: 'prism-bash-js',
      450: 'prism-haxe-js',
      4522: 'prism-plant-uml-js',
      453: 'prism-apex-js',
      4531: 'prism-svelte',
      4550: 'prism-flow-js',
      4555: 'prism-agda-js',
      463: 'prism-js-extras-js',
      4637: 'prism-icon-js',
      4667: 'prism-textile-js',
      4670: 'prism-inform7-js',
      4704: 'prism-ignore-js',
      4750: 'prism-markup-js',
      4813: 'prism-nand2tetris-hdl-js',
      4832: 'prism-racket-js',
      4854: 'prism-pcaxis-js',
      4896: 'prism-haml-js',
      4911: 'prism-bro-js',
      4922: 'prism-v-js',
      4975: 'prism-icu-message-format-js',
      5087: 'prism-core-js',
      5091: 'prism-velocity-js',
      5128: 'prism-pug-js',
      5166: 'prism-markup-templating-js',
      5169: 'prism-cobol-js',
      5173: 'prism-typoscript-js',
      52: 'prism-vim-js',
      5249: 'prism-parigp-js',
      5414: 'prism-lolcode-js',
      5503: 'prism-squirrel-js',
      5538: 'prism-asmatmel-js',
      5547: 'prism-dax-js',
      5549: 'prism-hcl-js',
      5582: 'prism-n4js-js',
      56: 'prism-arduino-js',
      5607: 'prism-rust-js',
      5616: 'prism-json-js',
      5637: 'prism-psl-js',
      5747: 'prism-stata-js',
      5781: 'prism-twig-js',
      5826: 'prism-objectivec-js',
      585: 'prism-tremor-js',
      5899: 'prism-cypher-js',
      5901: 'prism-css-js',
      606: 'prism-dataweave-js',
      6069: 'prism-cmake-js',
      6071: 'prism-maxscript-js',
      6141: 'prism-gettext-js',
      6187: 'prism-brightscript-js',
      6206: 'prism-qml-js',
      6241: 'prism-tcl-js',
      6253: 'prism-bison-js',
      6267: 'prism-parser-js',
      6273: 'prism-mizar-js',
      6290: 'prism-robotframework-js',
      6363: 'prism-visual-basic-js',
      6368: 'prism-ocaml-js',
      638: 'prism-php-extras-js',
      6444: 'prism-groovy-js',
      6459: 'prism-powerquery-js',
      6476: 'prism-puppet-js',
      6502: 'prism-stan-js',
      6517: 'prism-apl-js',
      6588: 'prism-php-js',
      6616: 'prism-roboconf-js',
      6673: 'prism-purescript-js',
      6677: 'prism-livescript-js',
      6680: 'prism-go-js',
      6712: 'prism-autoit-js',
      6724: 'prism-cfscript-js',
      6730: 'prism-crystal-js',
      6732: 'prism-csv-js',
      6745: 'prism-gedcom-js',
      677: 'prism-powershell-js',
      681: 'prism-qore-js',
      6833: 'prism-bbcode-js',
      6862: 'prism-sqf-js',
      6870: 'prism-cilkc-js',
      6880: 'prism-peoplecode-js',
      6890: 'prism-xml-doc-js',
      6912: 'prism-moonscript-js',
      6918: 'prism-http-js',
      6930: 'prism-mongodb-js',
      6936: 'prism-eiffel-js',
      6945: 'prism-scala-js',
      6962: 'prism-makefile-js',
      701: 'prism-mermaid-js',
      7026: 'prism-odin-js',
      7043: 'prism-json5-js',
      7059: 'prism-csharp-js',
      7086: 'prism-cilkcpp-js',
      710: 'prism-metafont-js',
      7151: 'prism-go-module-js',
      7190: 'prism-nevod-js',
      7212: 'prism-nginx-js',
      7245: 'prism-jolie-js',
      7250: 'prism-latte-js',
      7257: 'prism-markdown-js',
      7270: 'prism-tt2-js',
      7292: 'prism-sql-js',
      7294: 'prism-xquery-js',
      738: 'prism-glsl-js',
      7407: 'prism-magma-js',
      7408: 'prism-sml-js',
      751: 'prism-coffeescript-js',
      7517: 'prism-supercollider-js',
      753: 'prism-jsdoc-js',
      7557: 'prism-perl-js',
      7645: 'prism-birb-js',
      7714: 'prism-hsts-js',
      7723: 'prism-smalltalk-js',
      7790: 'prism-firestore-security-rules-js',
      7851: 'prism-elixir-js',
      7877: 'prism-swift-js',
      7903: 'prism-asciidoc-js',
      7907: 'prism-typescript-js',
      7988: 'prism-python-js',
      7993: 'prism-properties-js',
      8013: 'prism-nix-js',
      8036: 'prism-keepalived-js',
      8037: 'prism-dart-js',
      805: 'prism-qsharp-js',
      8062: 'prism-n1ql-js',
      8078: 'prism-liquid-js',
      8094: 'prism-handlebars-js',
      810: 'prism-scss-js',
      8101: 'prism-keyman-js',
      8137: 'prism-q-js',
      8139: 'prism-soy-js',
      8168: 'prism-vhdl-js',
      8171: 'prism-ebnf-js',
      8187: 'prism-erlang-js',
      8204: 'prism-kusto-js',
      8254: 'prism-wasm-js',
      8262: 'prism-gdscript-js',
      8311: 'prism-javadoclike-js',
      8336: 'prism-d-js',
      8338: 'prism-mel-js',
      8390: 'prism-java-js',
      8392: 'prism-latex-js',
      84: 'prism-sass-js',
      8411: 'prism-etlua-js',
      8452: 'prism-gml-js',
      8456: 'prism-elm-js',
      8468: 'prism-haskell-js',
      8474: 'prism-reason-js',
      8510: 'prism-ruby-js',
      8526: 'prism-fortran-js',
      8544: 'prism-abap-js',
      8549: 'prism-js-templates-js',
      8584: 'prism-xojo-js',
      8588: 'prism-avro-idl-js',
      86: 'prism-t4-templating-js',
      8615: 'prism-processing-js',
      8677: 'prism-tsx-js',
      8763: 'prism-aspnet-js',
      883: 'prism-promql-js',
      8848: 'prism-pure-js',
      8865: 'prism-mata-js',
      8867: 'prism-c-js',
      8889: 'prism-erb-js',
      8965: 'prism-gn-js',
      8997: 'prism-t4-vb-js',
      9021: 'prism-sparql-js',
      9063: 'prism-arff-js',
      9122: 'prism-aql-js',
      9172: 'prism-jsstacktrace-js',
      918: 'prism-neon-js',
      9205: 'prism-autohotkey-js',
      9273: 'prism-yang-js',
      928: 'prism-plsql-js',
      9319: 'prism-factor-js',
      9328: 'prism-fsharp-js',
      9381: 'prism-false-js',
      9468: 'prism-gap-js',
      9543: 'prism-opencl-js',
      9559: 'prism-jsx-js',
      9570: 'prism-log-js',
      9625: 'prism-matlab-js',
      9686: 'prism-toml-js',
      9692: 'prism-concurnas-js',
      9723: 'prism-graphql-js',
      9763: 'prism-pascaligo-js',
      9787: 'prism-prolog-js',
      98: 'prism-unrealscript-js',
      9864: 'prism-gcode-js',
      9908: 'prism-vala-js',
      991: 'prism-cshtml-js',
      9911: 'prism-editorconfig-js',
      9939: 'prism-tap-js',
      9949: 'prism-armasm-js',
      9967: 'prism-xeora-js',
      9985: 'prism-jexl-js'
    }[s] || s) +
    '.' +
    {
      1023: '0a17f36e0ab7b5eb',
      105: 'c84071aec3ae6c2a',
      1052: '143b8d2e93fc7d67',
      1074: '1ed39d5a5d571acd',
      1148: '03f9864cfefd6053',
      1163: '273abb70825f2a38',
      1198: 'dc04b0053fd9fc5e',
      1209: 'd8596c242297f13f',
      1211: 'c8db816935b96811',
      1230: '7407100b9de49bde',
      1234: '5b985367c2f929d6',
      1243: '474cc6a3ef1aa8cd',
      1315: 'ac85940acd63eaca',
      1353: '2613c06e8b52aed2',
      1379: '85f7fb637af1c40f',
      1384: 'dd4cc6617e50f0b1',
      1436: '62d309b43c09446b',
      1477: '2e21275901ede190',
      1488: 'f74fb2a99ff719ba',
      1550: '8a049e82a0be2b66',
      1594: '220c4fcd01b94632',
      1598: 'cccf04205fda6ad6',
      1614: '05e26141cb5ed18e',
      1656: '6e46a98f946ba80e',
      167: 'f04d6d8ea1816dc5',
      1672: 'da1c2370e520277d',
      169: 'cb6acbd8b6db88b3',
      1691: 'd6bf21754dc5769c',
      17: '61a8df644e5372b8',
      1721: '2ec7dcef7e48b372',
      1729: '3c59a6d1c6cd97f5',
      1742: 'a7007652f303a611',
      1754: 'cbb38a67a970da9a',
      181: '2b40548b89a968de',
      1825: '599c6236c8613bc0',
      1855: '81e0279884fa5022',
      1861: '81bbfd6d47f15d66',
      1888: '376a2ff192d6c4b0',
      1897: 'b9c61d6f271f9075',
      1917: '9debf526a2ebf32f',
      1957: 'cca5e22c50508e66',
      1971: 'e9cd5156861e6b3a',
      1975: '613ee2ee7d1ea470',
      1996: 'e833c07cb4ee4327',
      2006: 'a32091f5ac3c9686',
      2046: 'eb4a8c034b2a55d9',
      2080: 'bfd0af825e7905f1',
      2135: '0ad369c22a572e26',
      2173: 'a812d7b499aeb899',
      2256: '47a0711d8a07a195',
      2317: 'e124ba6fe327016e',
      2326: '65b4df2306d7fc86',
      2328: '3b65b394e6483078',
      2381: 'bf6637b8f1e59b86',
      2396: 'c870ca242a5964ad',
      2422: '3446d9ac71589072',
      2439: 'b2bfc43fd4884047',
      2443: 'a62e0253a08d5b69',
      2448: '926caef208416f52',
      2500: 'f0118dd889e5d26d',
      251: 'c7f932cc631e0f14',
      2538: 'd43f2838266b50f1',
      2548: 'ea8d39b2467a98d8',
      2555: 'a86ba9d2b9f47d1c',
      2568: '6d1ece342fa12132',
      2578: 'b649f9aa61d05cc9',
      2647: 'a7b8adcb7c60c98e',
      2649: '0752df9a91e7d7d7',
      2727: '4196087009ee3dfb',
      276: '8eb922d323fa862a',
      2770: '649e5fdd6dc17d2a',
      2812: '427b8e8b263d1104',
      2834: 'a2222f6d30d610be',
      2868: '72600e71ae8128fe',
      2890: 'c473b3c65ec0d1e6',
      2964: '12b67ab0dd225e8e',
      2966: '1b1e777b6e10138a',
      2988: '218a13610e723c65',
      3026: '2df01f96687bf7ed',
      3047: '64c46943e9562cc7',
      3076: '51e26e8fe58796ef',
      3094: 'c21024492f9707fa',
      3100: '050350bde22d5583',
      3140: 'cd5c9f4015008329',
      3141: 'bfa9d7230e255f70',
      3150: '2b4efabdb558c25c',
      3157: 'e294417c2a7f2735',
      3172: '61843b9c5e962251',
      3201: '74cd555f9c58592e',
      3255: 'ffeced2a4f21cd01',
      3298: '2012be90b3f90b8d',
      3310: 'f7d2e83657024d82',
      3323: 'af6e0fe0cb616f1d',
      3396: '80e564be95386aeb',
      3416: 'eaa98ee28d7733ad',
      3503: 'ba826ac221c60da9',
      3522: '6dfc68b2266aa31b',
      3535: 'ceb31ce5e09b18ca',
      3543: 'be5a345c4e2712b1',
      3555: '54eff27e9a5f2fe3',
      357: '737e4195389f6d33',
      3621: '225f7305512c7dd9',
      3634: 'e1513ced2b336584',
      3649: 'd948918045d25776',
      367: '8132dd825dfd3cda',
      3676: 'd8f8c8fb42a7d272',
      3690: 'e8527ef56903a922',
      3695: '6d51ffacc3e49df6',
      3708: '4a0422a33ccb46ea',
      3711: '97606c6489b00a61',
      3725: 'a202a4b8f1d95bcb',
      3733: 'bfd987e82776b068',
      3755: '487245845f4590f9',
      3798: 'd7a185aafbd1863b',
      3805: '4b34fc07ce9719be',
      3818: '8819a9d779da3429',
      3855: 'c941044b3c34a37e',
      3857: '168cb2c649441808',
      3864: '05d7487b2c790cc1',
      391: 'c7d2427b1f8a169c',
      3980: '7217c69c9f897487',
      3997: 'd7da5b4c5d8f58f1',
      4008: '62b830e28f19c87f',
      4054: '30dd8d745018500d',
      4060: 'b5edd2eca5be7d2b',
      4068: '73b7042d67c57dc4',
      4070: '01aa3da34fa129dd',
      4098: 'c89abab9ea3044df',
      418: '5d19aeb374392880',
      4203: '034eba1f41bc797d',
      4204: 'a3e7518b4323c4c3',
      4213: '562da9585a2668c0',
      4227: 'e85e10bb9cb2e4c4',
      4249: 'f72e3bc533441dbe',
      4270: '4f98a3821d6cc420',
      4275: 'fcdb8a3946cd4e4e',
      4334: '3fa10f19b02aa4b5',
      4338: 'db64245bf5357bb4',
      4342: 'baed969addc2c507',
      4366: 'c631051400430846',
      4387: '3423bab361c3b6d6',
      4419: '6de41f5295751420',
      4431: '4f1df19dd96d351c',
      4448: '1337b9e6b31734d6',
      4461: '4953fb88eb6097c2',
      4468: '36d58400995ef97c',
      4479: '46bf93f133ec361d',
      4492: 'fc6c2c33e6099a98',
      450: 'ab5e1e7a75ec2f10',
      4517: 'ca78ccf13f03ceeb',
      4522: '263641d6bf87962b',
      453: 'f5417be5adf05d6d',
      4531: 'a8705892c7ed0909',
      4550: '0097b6feb53d6ae3',
      4555: '00afcbd73697c169',
      463: '90363eb73277ad0a',
      4637: 'b76bbf47a053e243',
      4667: '10173d9431dc9ab4',
      4670: '8908dc0d38d5c92f',
      4704: 'a10db69b8c81ba72',
      4750: 'a50a59d815626583',
      4759: '5c1f42f6042d6457',
      4813: 'a9ea08f04d0c127d',
      4832: 'f5204e795036107a',
      4854: 'fadcd6032cb55d28',
      4896: '1f6955be4609a069',
      4911: 'ad8b9884eda8f3e4',
      4920: 'a37ab55f7abde7d9',
      4922: '659b80ec543fed47',
      4975: 'dbbdd05259dc645d',
      5087: '8d202cfe4efa01bc',
      5091: '5205ba5ac85119ce',
      5102: 'fa1d99a8803ff8c7',
      5128: 'e53b45780203f594',
      5166: '46252012f572be08',
      5169: 'd1602dd86dd78626',
      5173: 'd649d6b1ebf13962',
      5196: 'a890e2f848933898',
      52: '76af94b055ba56b4',
      5246: '7727c5f1b9f7afba',
      5249: '18b5d8dc87a4c4f2',
      5338: 'c60fc26b5f12c980',
      5414: 'c046c23427ba1adc',
      5503: '4379c1256d0e9c81',
      5538: '22ecbf85218b3da3',
      5542: '1e868b3ebf533fa2',
      5547: '7d5d637fde9c1e1d',
      5549: '53d7f567134a0b08',
      5562: '6cc078ec59eb355d',
      5582: '03ab05b4d7c3539c',
      56: 'ef77965d97277c56',
      5607: '9c1a024958a4d55a',
      5616: '69f907cc2a904a1e',
      5637: '56f514ab5d43a15f',
      5685: '0122e9a9ec01ca38',
      5747: '4c957d19c4b0bbd9',
      5781: '7a5fef44faccfdeb',
      5826: '6b9e5ff4787e8d1e',
      585: '4a7f57c8d9675e58',
      5899: 'c59f3abbb6af02ca',
      5901: 'bc14af58452f3587',
      5950: '56c71d6a057d9e51',
      606: 'fd4aaaf4296d8192',
      6069: '296daa4c977b12b5',
      6071: 'd59016bd35599133',
      6110: '077e006cc24328e1',
      6141: 'ebd3f65819956072',
      6187: '6b46b582b9556f1a',
      6206: '73768d20c4d0711e',
      6216: '84a6436aae7019df',
      6241: 'af5484cd13943b28',
      6253: '0ee802e1b0ef29b1',
      6267: '305205c368a2aabe',
      6273: 'fbb6620cb7567515',
      6290: 'c0592c61a15df0f4',
      6319: 'fe3888130671b35f',
      6333: 'db46d552c5d7cf3a',
      6363: 'ddbffc0ca19e983f',
      6368: 'd2153b16f6ed0d3a',
      6375: '053f587dc69c9469',
      638: 'ed0f05ae15f79746',
      640: '7c485a822216d545',
      6407: '06276669bff6758c',
      6444: 'a491a2fac88c95d8',
      6459: '6c33195906918a51',
      6476: 'fe361b4389b6312a',
      6502: 'c8f703ade6ca127f',
      6517: '5e81f4eec53b23b3',
      6588: '2022b8c0005ca3fb',
      6616: 'cfa7a54c859f73c1',
      6673: 'ca13172d52131071',
      6677: '3d9ccb0a6c2eae7e',
      6680: '0b4a45b2e19f5a02',
      6712: 'f643d986c3620d33',
      6724: 'd9094d5bdd5647a1',
      6730: '3766e611118ab3a6',
      6732: '3d90db55e8beb692',
      6745: 'a31adcee1f2a128e',
      677: 'c417f2a061433aea',
      681: 'bc7d31037640c0a8',
      6833: '32bb946165b36f3f',
      6862: '6c06a563fc5f8471',
      6870: '50a678a22d1a3978',
      6880: '654b2814306935ed',
      6890: '99fb4592c69f373e',
      6912: '2d80df6f081564bd',
      6918: '4c053b808612f024',
      6930: '9650d6cad2ba5399',
      6936: 'b0b2446dbeae6b20',
      6945: 'a5bfd5fe5cfc40dc',
      6962: 'da4ef4dbda43e3d9',
      701: '9c7b466f232dd0ae',
      7026: '0fe4ca51770b54bf',
      7027: '0b228b0464bf8fc3',
      7043: '19bb68e313804013',
      7047: '1ee3dc548ff53837',
      7059: 'a437436cbf746fb2',
      7065: '19649b1b5b436991',
      7086: '1b79cddb40e53b36',
      710: '2093b6c3fac10612',
      7151: '960b8d630cb8bf1b',
      7190: 'aef2f8efd884bad6',
      7212: '5a8623daa9ca9f3a',
      7245: '74c643433a36f7c9',
      7250: '87126414fafbbf90',
      7257: 'fdc4def2785fbb1d',
      7270: '27bd841afd6c483e',
      7292: '9fb48cde5c51fd7e',
      7294: '526a2a9bddc60e01',
      738: 'eabcca8f2e60751a',
      7407: '2dc3e87bbb9de47e',
      7408: '4323059e14da05ac',
      7489: 'cd806d2f427a883d',
      749: 'ddec1e1a3032a830',
      751: 'a061f60ffe071c82',
      7517: 'a6eddfe007fde811',
      753: '9c6c6368a70bafb4',
      7557: 'd4cd352c87af5600',
      7645: '2c992d2234eddf19',
      7678: 'af45e3f1f24b7058',
      7714: '680c9c315b8ed757',
      7723: 'b4126dd9af73daf5',
      7790: 'fc48e1304f2a0825',
      7841: '3c8f3dd895aacf3c',
      7851: '35d958fbbffdc25f',
      7877: '4a4e0d310d396619',
      7898: '736b15e29efbffe8',
      7903: '36c4cd36c56120df',
      7907: 'e0b7a39b0683c919',
      7938: '07886f31308437a6',
      7988: 'cccdda8b2cb10702',
      7993: '05fdbe699b06fd10',
      8013: 'bb092ecc023ab11d',
      8036: '4d0138d7074b3855',
      8037: '02e4f02ea9710427',
      8048: '69cc0ea6d614cdaf',
      805: '09293bbfa82ec737',
      8062: '66c59cb4805c2b45',
      8067: '129f2536d1a5b850',
      8078: '3a59ffb8debb340c',
      8094: 'a268eb1e37ed1d1d',
      810: '3788f2e4c7289626',
      8101: '0bc85e16872733c5',
      8121: '43c3f18174bc4a4a',
      8137: '4270d4cafb0323a1',
      8139: '041d183f847d86c7',
      8160: '13e5a319c4976edd',
      8168: '99e9fb3721fc891b',
      8171: 'b598dfa6eb18f336',
      8187: '0d908344cfe64e95',
      8204: 'bd908722567a41a5',
      8233: '270639ccdecf7be1',
      8254: '42b62ccf269402bc',
      8262: '89b0bb692b8788fa',
      8280: 'd23400460d00c14a',
      8292: '8301e0024331b5b0',
      8311: '3c080b2e49d9f83e',
      8336: '8dbf1ae06328d9ef',
      8338: '55dd785bcbc34b90',
      8390: 'b5d21e71d2f6e6d4',
      8392: '9b9f63151e4d4275',
      84: '7482a6a4a49af94c',
      8401: 'adf96abc27ac7387',
      8411: '629aa6e344ea40a5',
      8452: 'bc58123358c36394',
      8456: '32ec8b7ea4c06cea',
      8468: '50a76aaedfec61db',
      8474: '39709206d4e6fb33',
      8510: '0777c0e5b74de5b7',
      8520: '7597407affc3a83a',
      8526: '48e15baa492b68db',
      8544: 'e26aab9c201e753f',
      8549: '1bddfc3a3dab31f1',
      8584: 'bce5bb6faf9648f9',
      8588: '5806d2385caee6f8',
      86: '3f4b0c1ee3d9d6fc',
      8604: 'ea26836f9277268c',
      8615: '50fb47886b13edbf',
      8677: 'fdf7356b8e169a36',
      8763: '600dfe4022346f08',
      883: '046bc57666be723b',
      8839: 'd36534ceeb519909',
      8848: '5616493775fc2106',
      8865: '5967fda5b01bce43',
      8867: '354312fbe2944956',
      8889: '251e043543152905',
      8926: '2bd0c75389285bbf',
      8964: '5f67c8af6aae1b9e',
      8965: '351e1c7f713ab456',
      8981: '7ea9417c84707f23',
      8997: 'fd19f494d02c4780',
      9021: '16bd42997561f86d',
      9063: 'dcae5bb1fae394ac',
      9099: 'd5fd55aa8af08e99',
      9122: '4846dbdd613500b7',
      9127: '08c6ccd6b6cdfecd',
      9172: 'b4df2c22726a4a7a',
      918: '7bb72b2fd95526ab',
      9204: '30fc8791c7c95e43',
      9205: '471ffac46256e4e8',
      921: 'e97eecaa972a66d9',
      9234: 'e2ca939eeab03c93',
      9273: 'b8e65513283ed8ea',
      928: '561bd914fc81e8f3',
      9319: '50d9933fb843f6dc',
      9328: '231dde39eb90aa63',
      9381: '6bbfd13521ef739b',
      9404: '58bcacfbee13e4fa',
      9456: 'c51735bf3786aa02',
      9468: '1303042bf7cfdb78',
      9515: '6ddf1ef5cf39232c',
      9543: 'efcda34c737378fd',
      9559: '8d2711c73e37cc7e',
      9570: '5419983dd89dd62e',
      9625: '7efaffcb65c7753d',
      9647: '28b4240dbab81568',
      9686: 'ef6785351a9079d9',
      9692: 'b174d5f1b81b3e11',
      9717: '76c363e1bd7d48dc',
      9723: '5822185b3925cefd',
      9763: 'baf50e87c16153e2',
      9764: 'a8e0a600eb5eceba',
      9784: 'b9832b7cce48b685',
      9787: 'cae09abea731b2df',
      98: 'f59d656f14146666',
      9864: 'd79eaed3b152567e',
      9908: 'd0514c61cef8c38d',
      991: 'c65d3be2965ea6ca',
      9911: '2bc2b9e732aa0d90',
      9939: 'd906089dca5f8c77',
      9949: 'e9a515de9dd04b89',
      9967: 'c069de965df2e628',
      9985: 'c838dc7a145d3b70'
    }[s] +
    '.js'),
    (o.g = (() => {
      if ('object' == typeof globalThis) return globalThis;
      try {
        return this || Function('return this')();
      } catch (s) {
        if ('object' == typeof window) return window;
      }
    })()),
    (o.o = (s, e) => Object.prototype.hasOwnProperty.call(s, e)),
    (o.r = s => {
      ('u' > typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(s, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(s, '__esModule', { value: !0 }));
    }),
    (o.nmd = s => ((s.paths = []), s.children || (s.children = []), s)),
    (o.p = '/static/client/'),
    (o.U = function (s) {
      var e = new URL(s, 'x:/'),
        a = {};
      for (var r in e) a[r] = e[r];
      for (var r in ((a.href = s),
      (a.pathname = s.replace(/[?#].*/, '')),
      (a.origin = a.protocol = ''),
      (a.toString = a.toJSON = () => s),
      a))
        Object.defineProperty(this, r, {
          enumerable: !0,
          configurable: !0,
          value: a[r]
        });
    }),
    (o.U.prototype = URL.prototype),
    (d = { 3146: 0 }),
    (m = s => {
      var e,
        a,
        r = s.__rspack_esm_ids,
        c = s.__webpack_modules__,
        f = s.__rspack_esm_runtime,
        i = 0;
      for (e in c) o.o(c, e) && (o.m[e] = c[e]);
      for (f && f(o); i < r.length; i++)
        ((a = r[i]), o.o(d, a) && d[a] && d[a][0](), (d[r[i]] = 0));
    }),
    (o.f.j = function (s, e) {
      var a = o.o(d, s) ? d[s] : void 0;
      if (0 !== a)
        if (a) e.push(a[1]);
        else if (3146 != s) {
          var r = import('./' + o.u(s)).then(m, e => {
              throw (0 !== d[s] && (d[s] = void 0), e);
            }),
            r = Promise.race([
              r,
              new Promise(e => {
                a = d[s] = [e];
              })
            ]);
          e.push((a[1] = r));
        } else d[s] = 0;
    }),
    (o.C = m));

  __webpack_require__ = l;
})();

// === chunk 5909 ===
const chunk5909 = (function () {
  const __rspack_esm_id = 5909;
  const __rspack_esm_ids = [5909];
  const __webpack_modules__ = {
    20639(e) {
      e.exports = function e(r) {
        for (var t, n, o = Array.prototype.slice.call(arguments, 1); o.length;)
          for (n in (t = o.shift()))
            t.hasOwnProperty(n) &&
              ('[object Object]' === Object.prototype.toString.call(r[n])
                ? (r[n] = e(r[n], t[n]))
                : (r[n] = t[n]));
        return r;
      };
    },
    76314(e) {
      e.exports = function (e) {
        var r = [];
        return (
          (r.toString = function () {
            return this.map(function (r) {
              var t = '',
                n = void 0 !== r[5];
              return (
                r[4] && (t += '@supports ('.concat(r[4], ') {')),
                r[2] && (t += '@media '.concat(r[2], ' {')),
                n &&
                  (t += '@layer'.concat(
                    r[5].length > 0 ? ' '.concat(r[5]) : '',
                    ' {'
                  )),
                (t += e(r)),
                n && (t += '}'),
                r[2] && (t += '}'),
                r[4] && (t += '}'),
                t
              );
            }).join('');
          }),
          (r.i = function (e, t, n, o, a) {
            'string' == typeof e && (e = [[null, e, void 0]]);
            var i = {};
            if (n)
              for (var u = 0; u < this.length; u++) {
                var s = this[u][0];
                null != s && (i[s] = !0);
              }
            for (var l = 0; l < e.length; l++) {
              var f = [].concat(e[l]);
              (n && i[f[0]]) ||
                (void 0 !== a &&
                  (void 0 === f[5] ||
                    (f[1] = '@layer'
                      .concat(f[5].length > 0 ? ' '.concat(f[5]) : '', ' {')
                      .concat(f[1], '}')),
                  (f[5] = a)),
                t &&
                  (f[2] &&
                    (f[1] = '@media '.concat(f[2], ' {').concat(f[1], '}')),
                  (f[2] = t)),
                o &&
                  (f[4]
                    ? ((f[1] = '@supports ('
                        .concat(f[4], ') {')
                        .concat(f[1], '}')),
                      (f[4] = o))
                    : (f[4] = ''.concat(o))),
                r.push(f));
            }
          }),
          r
        );
      };
    },
    4417(e) {
      e.exports = function (e, r) {
        return (r || (r = {}),
        e &&
          ((e = String(e.__esModule ? e.default : e)),
          /^['"].*['"]$/.test(e) && (e = e.slice(1, -1)),
          r.hash && (e += r.hash),
          /["'() \t\n]|(%20)/.test(e) || r.needQuotes))
          ? '"'.concat(e.replace(/"/g, '\\"').replace(/\n/g, '\\n'), '"')
          : e;
      };
    },
    31601(e) {
      e.exports = function (e) {
        return e[1];
      };
    },
    69861(e, r, t) {
      var n = Uint8Array,
        o = Uint16Array,
        a = Int32Array,
        i = new n([
          0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4,
          4, 5, 5, 5, 5, 0, 0, 0, 0
        ]),
        u = new n([
          0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10,
          10, 11, 11, 12, 12, 13, 13, 0, 0
        ]),
        s = new n([
          16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15
        ]),
        l = function (e, r) {
          for (var t = new o(31), n = 0; n < 31; ++n) t[n] = r += 1 << e[n - 1];
          for (var i = new a(t[30]), n = 1; n < 30; ++n)
            for (var u = t[n]; u < t[n + 1]; ++u) i[u] = ((u - t[n]) << 5) | n;
          return { b: t, r: i };
        },
        f = l(i, 2),
        c = f.b,
        h = f.r;
      ((c[28] = 258), (h[258] = 28));
      for (
        var p = l(u, 0), m = (p.b, p.r), d = new o(32768), v = 0;
        v < 32768;
        ++v
      ) {
        var g = ((43690 & v) >> 1) | ((21845 & v) << 1);
        ((g =
          ((61680 & (g = ((52428 & g) >> 2) | ((13107 & g) << 2))) >> 4) |
          ((3855 & g) << 4)),
          (d[v] = (((65280 & g) >> 8) | ((255 & g) << 8)) >> 1));
      }
      for (
        var y = function (e, r, t) {
            for (var n, a = e.length, i = 0, u = new o(r); i < a; ++i)
              e[i] && ++u[e[i] - 1];
            var s = new o(r);
            for (i = 1; i < r; ++i) s[i] = (s[i - 1] + u[i - 1]) << 1;
            if (t) {
              n = new o(1 << r);
              var l = 15 - r;
              for (i = 0; i < a; ++i)
                if (e[i])
                  for (
                    var f = (i << 4) | e[i],
                      c = r - e[i],
                      h = s[e[i] - 1]++ << c,
                      p = h | ((1 << c) - 1);
                    h <= p;
                    ++h
                  )
                    n[d[h] >> l] = f;
            } else
              for (n = new o(a), i = 0; i < a; ++i)
                e[i] && (n[i] = d[s[e[i] - 1]++] >> (15 - e[i]));
            return n;
          },
          w = new n(288),
          v = 0;
        v < 144;
        ++v
      )
        w[v] = 8;
      for (var v = 144; v < 256; ++v) w[v] = 9;
      for (var v = 256; v < 280; ++v) w[v] = 7;
      for (var v = 280; v < 288; ++v) w[v] = 8;
      for (var b = new n(32), v = 0; v < 32; ++v) b[v] = 5;
      var x = y(w, 9, 0),
        E = y(b, 5, 0),
        F = function (e) {
          return ((e + 7) / 8) | 0;
        },
        S = function (e, r, t) {
          return (
            (null == r || r < 0) && (r = 0),
            (null == t || t > e.length) && (t = e.length),
            new n(e.subarray(r, t))
          );
        },
        T = function (e, r, t) {
          t <<= 7 & r;
          var n = (r / 8) | 0;
          ((e[n] |= t), (e[n + 1] |= t >> 8));
        },
        N = function (e, r, t) {
          t <<= 7 & r;
          var n = (r / 8) | 0;
          ((e[n] |= t), (e[n + 1] |= t >> 8), (e[n + 2] |= t >> 16));
        },
        $ = function (e, r) {
          for (var t = [], a = 0; a < e.length; ++a)
            e[a] && t.push({ s: a, f: e[a] });
          var i = t.length,
            u = t.slice();
          if (!i) return { t: k, l: 0 };
          if (1 == i) {
            var s = new n(t[0].s + 1);
            return ((s[t[0].s] = 1), { t: s, l: 1 });
          }
          (t.sort(function (e, r) {
            return e.f - r.f;
          }),
            t.push({ s: -1, f: 25001 }));
          var l = t[0],
            f = t[1],
            c = 0,
            h = 1,
            p = 2;
          for (t[0] = { s: -1, f: l.f + f.f, l: l, r: f }; h != i - 1;)
            ((l = t[t[c].f < t[p].f ? c++ : p++]),
              (f = t[c != h && t[c].f < t[p].f ? c++ : p++]),
              (t[h++] = { s: -1, f: l.f + f.f, l: l, r: f }));
          for (var m = u[0].s, a = 1; a < i; ++a) u[a].s > m && (m = u[a].s);
          var d = new o(m + 1),
            v = _(t[h - 1], d, 0);
          if (v > r) {
            var a = 0,
              g = 0,
              y = v - r,
              w = 1 << y;
            for (
              u.sort(function (e, r) {
                return d[r.s] - d[e.s] || e.f - r.f;
              });
              a < i;
              ++a
            ) {
              var b = u[a].s;
              if (d[b] > r) ((g += w - (1 << (v - d[b]))), (d[b] = r));
              else break;
            }
            for (g >>= y; g > 0;) {
              var x = u[a].s;
              d[x] < r ? (g -= 1 << (r - d[x]++ - 1)) : ++a;
            }
            for (; a >= 0 && g; --a) {
              var E = u[a].s;
              d[E] == r && (--d[E], ++g);
            }
            v = r;
          }
          return { t: new n(d), l: v };
        },
        _ = function (e, r, t) {
          return -1 == e.s
            ? Math.max(_(e.l, r, t + 1), _(e.r, r, t + 1))
            : (r[e.s] = t);
        },
        O = function (e) {
          for (var r = e.length; r && !e[--r];);
          for (
            var t = new o(++r),
              n = 0,
              a = e[0],
              i = 1,
              u = function (e) {
                t[n++] = e;
              },
              s = 1;
            s <= r;
            ++s
          )
            if (e[s] == a && s != r) ++i;
            else {
              if (!a && i > 2) {
                for (; i > 138; i -= 138) u(32754);
                i > 2 &&
                  (u(i > 10 ? ((i - 11) << 5) | 28690 : ((i - 3) << 5) | 12305),
                  (i = 0));
              } else if (i > 3) {
                for (u(a), --i; i > 6; i -= 6) u(8304);
                i > 2 && (u(((i - 3) << 5) | 8208), (i = 0));
              }
              for (; i--;) u(a);
              ((i = 1), (a = e[s]));
            }
          return { c: t.subarray(0, n), n: r };
        },
        D = function (e, r) {
          for (var t = 0, n = 0; n < r.length; ++n) t += e[n] * r[n];
          return t;
        },
        M = function (e, r, t) {
          var n = t.length,
            o = F(r + 2);
          ((e[o] = 255 & n),
            (e[o + 1] = n >> 8),
            (e[o + 2] = 255 ^ e[o]),
            (e[o + 3] = 255 ^ e[o + 1]));
          for (var a = 0; a < n; ++a) e[o + a + 4] = t[a];
          return (o + 4 + n) * 8;
        },
        I = function (e, r, t, n, a, l, f, c, h, p, m) {
          (T(r, m++, t), ++a[256]);
          for (
            var d,
              v,
              g,
              F,
              S = $(a, 15),
              _ = S.t,
              I = S.l,
              A = $(l, 15),
              k = A.t,
              j = A.l,
              U = O(_),
              R = U.c,
              P = U.n,
              z = O(k),
              C = z.c,
              Z = z.n,
              q = new o(19),
              B = 0;
            B < R.length;
            ++B
          )
            ++q[31 & R[B]];
          for (var B = 0; B < C.length; ++B) ++q[31 & C[B]];
          for (
            var V = $(q, 7), W = V.t, G = V.l, J = 19;
            J > 4 && !W[s[J - 1]];
            --J
          );
          var L = (p + 5) << 3,
            Q = D(a, w) + D(l, b) + f,
            Y =
              D(a, _) +
              D(l, k) +
              f +
              14 +
              3 * J +
              D(q, W) +
              2 * q[16] +
              3 * q[17] +
              7 * q[18];
          if (h >= 0 && L <= Q && L <= Y) return M(r, m, e.subarray(h, h + p));
          if ((T(r, m, 1 + (Y < Q)), (m += 2), Y < Q)) {
            ((d = y(_, I, 0)), (v = _), (g = y(k, j, 0)), (F = k));
            var H = y(W, G, 0);
            (T(r, m, P - 257),
              T(r, m + 5, Z - 1),
              T(r, m + 10, J - 4),
              (m += 14));
            for (var B = 0; B < J; ++B) T(r, m + 3 * B, W[s[B]]);
            m += 3 * J;
            for (var K = [R, C], X = 0; X < 2; ++X)
              for (var ee = K[X], B = 0; B < ee.length; ++B) {
                var er = 31 & ee[B];
                (T(r, m, H[er]),
                  (m += W[er]),
                  er > 15 && (T(r, m, (ee[B] >> 5) & 127), (m += ee[B] >> 12)));
              }
          } else ((d = x), (v = w), (g = E), (F = b));
          for (var B = 0; B < c; ++B) {
            var et = n[B];
            if (et > 255) {
              var er = (et >> 18) & 31;
              (N(r, m, d[er + 257]),
                (m += v[er + 257]),
                er > 7 && (T(r, m, (et >> 23) & 31), (m += i[er])));
              var en = 31 & et;
              (N(r, m, g[en]),
                (m += F[en]),
                en > 3 && (N(r, m, (et >> 5) & 8191), (m += u[en])));
            } else (N(r, m, d[et]), (m += v[et]));
          }
          return (N(r, m, d[256]), m + v[256]);
        },
        A = new a([
          65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560,
          2117632
        ]),
        k = new n(0),
        j = function (e, r, t, s, l, f) {
          var c = f.z || e.length,
            p = new n(s + c + 5 * (1 + Math.ceil(c / 7e3)) + l),
            d = p.subarray(s, p.length - l),
            v = f.l,
            g = 7 & (f.r || 0);
          if (r) {
            g && (d[0] = f.r >> 3);
            for (
              var y = A[r - 1],
                w = y >> 13,
                b = 8191 & y,
                x = (1 << t) - 1,
                E = f.p || new o(32768),
                T = f.h || new o(x + 1),
                N = Math.ceil(t / 3),
                $ = 2 * N,
                _ = function (r) {
                  return (e[r] ^ (e[r + 1] << N) ^ (e[r + 2] << $)) & x;
                },
                O = new a(25e3),
                D = new o(288),
                k = new o(32),
                j = 0,
                U = 0,
                R = f.i || 0,
                P = 0,
                z = f.w || 0,
                C = 0;
              R + 2 < c;
              ++R
            ) {
              var Z = _(R),
                q = 32767 & R,
                B = T[Z];
              if (((E[q] = B), (T[Z] = q), z <= R)) {
                var V = c - R;
                if ((j > 7e3 || P > 24576) && (V > 423 || !v)) {
                  ((g = I(e, d, 0, O, D, k, U, P, C, R - C, g)),
                    (P = j = U = 0),
                    (C = R));
                  for (var W = 0; W < 286; ++W) D[W] = 0;
                  for (var W = 0; W < 30; ++W) k[W] = 0;
                }
                var G = 2,
                  J = 0,
                  L = b,
                  Q = (q - B) & 32767;
                if (V > 2 && Z == _(R - Q))
                  for (
                    var Y = Math.min(w, V) - 1,
                      H = Math.min(32767, R),
                      K = Math.min(258, V);
                    Q <= H && --L && q != B;
                  ) {
                    if (e[R + G] == e[R + G - Q]) {
                      for (var X = 0; X < K && e[R + X] == e[R + X - Q]; ++X);
                      if (X > G) {
                        if (((G = X), (J = Q), X > Y)) break;
                        for (
                          var ee = Math.min(Q, X - 2), er = 0, W = 0;
                          W < ee;
                          ++W
                        ) {
                          var et = (R - Q + W) & 32767,
                            en = E[et],
                            eo = (et - en) & 32767;
                          eo > er && ((er = eo), (B = et));
                        }
                      }
                    }
                    ((B = E[(q = B)]), (Q += (q - B) & 32767));
                  }
                if (J) {
                  O[P++] = 0x10000000 | (h[G] << 18) | m[J];
                  var ea = 31 & h[G],
                    ei = 31 & m[J];
                  ((U += i[ea] + u[ei]),
                    ++D[257 + ea],
                    ++k[ei],
                    (z = R + G),
                    ++j);
                } else ((O[P++] = e[R]), ++D[e[R]]);
              }
            }
            for (R = Math.max(R, z); R < c; ++R) ((O[P++] = e[R]), ++D[e[R]]);
            ((g = I(e, d, v, O, D, k, U, P, C, R - C, g)),
              v ||
                ((f.r = (7 & g) | (d[(g / 8) | 0] << 3)),
                (g -= 7),
                (f.h = T),
                (f.p = E),
                (f.i = R),
                (f.w = z)));
          } else {
            for (var R = f.w || 0; R < c + v; R += 65535) {
              var eu = R + 65535;
              (eu >= c && ((d[(g / 8) | 0] = v), (eu = c)),
                (g = M(d, g + 1, e.subarray(R, eu))));
            }
            f.i = c;
          }
          return S(p, 0, s + F(g) + l);
        },
        U = (function () {
          for (var e = new Int32Array(256), r = 0; r < 256; ++r) {
            for (var t = r, n = 9; --n;) t = (1 & t && -0x12477ce0) ^ (t >>> 1);
            e[r] = t;
          }
          return e;
        })(),
        R = function () {
          var e = -1;
          return {
            p: function (r) {
              for (var t = e, n = 0; n < r.length; ++n)
                t = U[(255 & t) ^ r[n]] ^ (t >>> 8);
              e = t;
            },
            d: function () {
              return ~e;
            }
          };
        },
        P = function (e, r, t, o, a) {
          if (!a && ((a = { l: 1 }), r.dictionary)) {
            var i = r.dictionary.subarray(-32768),
              u = new n(i.length + e.length);
            (u.set(i), u.set(e, i.length), (e = u), (a.w = i.length));
          }
          return j(
            e,
            null == r.level ? 6 : r.level,
            null == r.mem
              ? a.l
                ? Math.ceil(1.5 * Math.max(8, Math.min(13, Math.log(e.length))))
                : 20
              : 12 + r.mem,
            t,
            o,
            a
          );
        },
        z = function (e, r, t) {
          for (; t; ++r) ((e[r] = t), (t >>>= 8));
        },
        C = function (e, r) {
          var t = r.filename;
          if (
            ((e[0] = 31),
            (e[1] = 139),
            (e[2] = 8),
            (e[8] = r.level < 2 ? 4 : 2 * (9 == r.level)),
            (e[9] = 3),
            0 != r.mtime &&
              z(e, 4, Math.floor(new Date(r.mtime || Date.now()) / 1e3)),
            t)
          ) {
            e[3] = 8;
            for (var n = 0; n <= t.length; ++n) e[n + 10] = t.charCodeAt(n);
          }
        };
      function Z(e, r) {
        r || (r = {});
        var t,
          n = R(),
          o = e.length;
        n.p(e);
        var a = P(e, r, 10 + ((t = r).filename ? t.filename.length + 1 : 0), 8),
          i = a.length;
        return (C(a, r), z(a, i - 8, n.d()), z(a, i - 4, o), a);
      }
      var q = 'u' > typeof TextEncoder && new TextEncoder(),
        B = 'u' > typeof TextDecoder && new TextDecoder();
      try {
        B.decode(k, { stream: !0 });
      } catch (e) {}
      function V(e, r) {
        if (r) {
          for (var t = new n(e.length), o = 0; o < e.length; ++o)
            t[o] = e.charCodeAt(o);
          return t;
        }
        if (q) return q.encode(e);
        for (
          var a = e.length,
            i = new n(e.length + (e.length >> 1)),
            u = 0,
            s = function (e) {
              i[u++] = e;
            },
            o = 0;
          o < a;
          ++o
        ) {
          if (u + 5 > i.length) {
            var l = new n(u + 8 + ((a - o) << 1));
            (l.set(i), (i = l));
          }
          var f = e.charCodeAt(o);
          f < 128 || r
            ? s(f)
            : (f < 2048
                ? s(192 | (f >> 6))
                : (f > 55295 && f < 57344
                    ? (s(
                        240 |
                          ((f =
                            (65536 + (1047552 & f)) |
                            (1023 & e.charCodeAt(++o))) >>
                            18)
                      ),
                      s(128 | ((f >> 12) & 63)))
                    : s(224 | (f >> 12)),
                  s(128 | ((f >> 6) & 63))),
              s(128 | (63 & f)));
        }
        return S(i, 0, u);
      }
      ('function' == typeof queueMicrotask && queueMicrotask,
        t.d(r, { _u: () => V, u3: () => Z }));
    },
    52126(e, r, t) {
      e.exports = {
        uris: t(12162)([
          'background',
          'base',
          'cite',
          'href',
          'longdesc',
          'src',
          'usemap'
        ])
      };
    },
    2921(e) {
      e.exports = {
        allowedAttributes: {
          a: ['href', 'name', 'target', 'title', 'aria-label'],
          iframe: ['allowfullscreen', 'frameborder', 'src'],
          img: ['src', 'alt', 'title', 'aria-label']
        },
        allowedClasses: {},
        allowedSchemes: ['http', 'https', 'mailto'],
        allowedTags: [
          'a',
          'abbr',
          'article',
          'b',
          'blockquote',
          'br',
          'caption',
          'code',
          'del',
          'details',
          'div',
          'em',
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'hr',
          'i',
          'img',
          'ins',
          'kbd',
          'li',
          'main',
          'mark',
          'ol',
          'p',
          'pre',
          'section',
          'span',
          'strike',
          'strong',
          'sub',
          'summary',
          'sup',
          'table',
          'tbody',
          'td',
          'th',
          'thead',
          'tr',
          'u',
          'ul'
        ],
        filter: null
      };
    },
    3862(e, r, t) {
      e.exports = {
        voids: t(12162)([
          'area',
          'br',
          'col',
          'hr',
          'img',
          'wbr',
          'input',
          'base',
          'basefont',
          'link',
          'meta'
        ])
      };
    },
    81233(e, r, t) {
      t(87073);
      var n = t(20639),
        o = t(33120),
        a = t(56312),
        i = t(2921);
      function u(e, r, t) {
        var u = [];
        return (o(e, a(u, !0 === t ? r : n({}, i, r))), u.join(''));
      }
      ((u.defaults = i), (e.exports = u));
    },
    69382(e) {
      e.exports = function (e) {
        return 'string' == typeof e ? e.toLowerCase() : e;
      };
    },
    33120(e, r, t) {
      var n = t(87073),
        o = t(69382);
      t(52126);
      var a = t(3862),
        i =
          /^<\s*([\w:-]+)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*>/,
        u = /^<\s*\/\s*([\w:-]+)[^>]*>/,
        s =
          /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,
        l = /^</,
        f = /^<\s*\//;
      e.exports = function (e, r) {
        for (
          var t,
            c,
            h =
              (((t = []).lastItem = function () {
                return t[t.length - 1];
              }),
              t),
            p = e;
          e;
        )
          !(function () {
            ((c = !0),
              '\x3c!--' === e.substr(0, 4)
                ? (function () {
                    var t = e.indexOf('--\x3e');
                    t >= 0 &&
                      (r.comment && r.comment(e.substring(4, t)),
                      (e = e.substring(t + 3)),
                      (c = !1));
                  })()
                : f.test(e)
                  ? m(u, v)
                  : l.test(e) && m(i, d),
              (function () {
                if (c) {
                  var t,
                    n = e.indexOf('<');
                  (n >= 0
                    ? ((t = e.substring(0, n)), (e = e.substring(n)))
                    : ((t = e), (e = '')),
                    r.chars && r.chars(t));
                }
              })());
            var t = e === p;
            ((p = e), t && (e = ''));
          })();
        function m(r, t) {
          var n = e.match(r);
          n && ((e = e.substring(n[0].length)), n[0].replace(r, t), (c = !1));
        }
        function d(e, t, i, u) {
          var l = {},
            f = o(t),
            c = a.voids[f] || !!u;
          (i.replace(s, function (e, r, t, o, a) {
            void 0 === t && void 0 === o && void 0 === a
              ? (l[r] = void 0)
              : (l[r] = n.decode(t || o || a || ''));
          }),
            c || h.push(f),
            r.start && r.start(f, l, c));
        }
        function v(e, t) {
          var n,
            a = 0,
            i = o(t);
          if (i) for (a = h.length - 1; a >= 0 && h[a] !== i; a--);
          if (a >= 0) {
            for (n = h.length - 1; n >= a; n--) r.end && r.end(h[n]);
            h.length = a;
          }
        }
        v();
      };
    },
    56312(e, r, t) {
      var n = t(87073),
        o = t(69382),
        a = t(52126),
        i = t(3862);
      e.exports = function (e, r) {
        var t,
          u = r || {};
        return (
          l(),
          {
            start: function (e, r, l) {
              var f = o(e);
              t.ignoring ||
              -1 === (u.allowedTags || []).indexOf(f) ||
              (u.filter && !u.filter({ tag: f, attrs: r }))
                ? (function (e) {
                    !i.voids[e] &&
                      (!1 === t.ignoring
                        ? (t = { ignoring: e, depth: 1 })
                        : t.ignoring === e && t.depth++);
                  })(f)
                : (s('<'),
                  s(f),
                  Object.keys(r).forEach(function (e) {
                    var t = r[e],
                      i = (u.allowedClasses || {})[f] || [],
                      l = (u.allowedAttributes || {})[f] || [],
                      c = o(e);
                    ('class' === c && -1 === l.indexOf(c)
                      ? (t = t
                          .split(' ')
                          .filter(function (e) {
                            return i && -1 !== i.indexOf(e);
                          })
                          .join(' ')
                          .trim()).length
                      : -1 !== l.indexOf(c) &&
                        (!0 !== a.uris[c] ||
                          (function (e) {
                            var r = e[0];
                            if ('#' === r || '/' === r) return !0;
                            var t = e.indexOf(':');
                            if (-1 === t) return !0;
                            var n = e.indexOf('?');
                            if (-1 !== n && t > n) return !0;
                            var o = e.indexOf('#');
                            return (
                              (-1 !== o && t > o) ||
                              u.allowedSchemes.some(function (r) {
                                return 0 === e.indexOf(r + ':');
                              })
                            );
                          })(t))) &&
                      (s(' '),
                      s(e),
                      'string' == typeof t &&
                        (s('="'), s(n.encode(t)), s('"')));
                  }),
                  s(l ? '/>' : '>'));
            },
            end: function (e) {
              var r = o(e);
              -1 !== (u.allowedTags || []).indexOf(r) && !1 === t.ignoring
                ? (s('</'), s(r), s('>'))
                : (function (e) {
                    t.ignoring === e && --t.depth <= 0 && l();
                  })(r);
            },
            chars: function (e) {
              !1 === t.ignoring && s(u.transformText ? u.transformText(e) : e);
            }
          }
        );
        function s(r) {
          e.push(r);
        }
        function l() {
          t = { ignoring: !1, depth: 0 };
        }
      };
    },
    87073(e) {
      var r = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;'
        },
        t = {
          '&amp;': '&',
          '&lt;': '<',
          '&gt;': '>',
          '&quot;': '"',
          '&#39;': "'"
        },
        n = /(&amp;|&lt;|&gt;|&quot;|&#39;)/g,
        o = /[&<>"']/g;
      function a(e) {
        return r[e];
      }
      function i(e) {
        return t[e];
      }
      function u(e) {
        return null == e ? '' : String(e).replace(o, a);
      }
      function s(e) {
        return null == e ? '' : String(e).replace(n, i);
      }
      ((u.options = s.options = {}),
        (e.exports = {
          encode: u,
          escape: u,
          decode: s,
          unescape: s,
          version: '1.0.0-browser'
        }));
    },
    12162(e) {
      function r(e, r) {
        return ((e[r] = !0), e);
      }
      e.exports = function (e) {
        return e.reduce(r, {});
      };
    },
    45379(e, r, t) {
      t.d(r, { Np: () => FluentBundle, B$: () => FluentResource });
      let FluentType = class FluentType {
        constructor(e) {
          this.value = e;
        }
        valueOf() {
          return this.value;
        }
      };
      let FluentNone = class FluentNone extends FluentType {
        constructor(e = '???') {
          super(e);
        }
        toString(e) {
          return `{${this.value}}`;
        }
      };
      let FluentNumber = class FluentNumber extends FluentType {
        constructor(e, r = {}) {
          (super(e), (this.opts = r));
        }
        toString(e) {
          if (e)
            try {
              return e
                .memoizeIntlObject(Intl.NumberFormat, this.opts)
                .format(this.value);
            } catch (r) {
              e.reportError(r);
            }
          return this.value.toString(10);
        }
      };
      let FluentDateTime = class FluentDateTime extends FluentType {
        static supportsValue(e) {
          if ('number' == typeof e || e instanceof Date) return !0;
          if (e instanceof FluentType)
            return FluentDateTime.supportsValue(e.valueOf());
          if ('Temporal' in globalThis) {
            let r = globalThis.Temporal;
            if (
              e instanceof r.Instant ||
              e instanceof r.PlainDateTime ||
              e instanceof r.PlainDate ||
              e instanceof r.PlainMonthDay ||
              e instanceof r.PlainTime ||
              e instanceof r.PlainYearMonth
            )
              return !0;
          }
          return !1;
        }
        constructor(e, r = {}) {
          (e instanceof FluentDateTime
            ? ((r = { ...e.opts, ...r }), (e = e.value))
            : e instanceof FluentType && (e = e.valueOf()),
            'object' == typeof e &&
              'calendarId' in e &&
              void 0 === r.calendar &&
              (r = { ...r, calendar: e.calendarId }),
            super(e),
            (this.opts = r));
        }
        [Symbol.toPrimitive](e) {
          return 'string' === e ? this.toString() : this.toNumber();
        }
        toNumber() {
          let e = this.value;
          if ('number' == typeof e) return e;
          if (e instanceof Date) return e.getTime();
          if ('epochMilliseconds' in e) return e.epochMilliseconds;
          if ('toZonedDateTime' in e)
            return e.toZonedDateTime('UTC').epochMilliseconds;
          throw TypeError('Unwrapping a non-number value as a number');
        }
        toString(e) {
          if (e)
            try {
              return e
                .memoizeIntlObject(Intl.DateTimeFormat, this.opts)
                .format(this.value);
            } catch (r) {
              e.reportError(r);
            }
          return 'number' == typeof this.value || this.value instanceof Date
            ? new Date(this.value).toISOString()
            : this.value.toString();
        }
      };
      function n(e, r, t) {
        return r[t]
          ? u(e, r[t].value)
          : (e.reportError(RangeError('No default')), new FluentNone());
      }
      function o(e, r) {
        let t = [],
          n = Object.create(null);
        for (let o of r)
          'narg' === o.type ? (n[o.name] = a(e, o.value)) : t.push(a(e, o));
        return { positional: t, named: n };
      }
      function a(e, r) {
        switch (r.type) {
          case 'str':
            return r.value;
          case 'num':
            return new FluentNumber(r.value, {
              minimumFractionDigits: r.precision
            });
          case 'var':
            return (function (e, { name: r }) {
              let t;
              if (e.params)
                if (!Object.prototype.hasOwnProperty.call(e.params, r))
                  return new FluentNone(`$${r}`);
                else t = e.params[r];
              else {
                if (!(
                  e.args && Object.prototype.hasOwnProperty.call(e.args, r)
                ))
                  return (
                    e.reportError(ReferenceError(`Unknown variable: $${r}`)),
                    new FluentNone(`$${r}`)
                  );
                t = e.args[r];
              }
              if (t instanceof FluentType) return t;
              switch (typeof t) {
                case 'string':
                  return t;
                case 'number':
                  return new FluentNumber(t);
                case 'object':
                  if (FluentDateTime.supportsValue(t))
                    return new FluentDateTime(t);
                default:
                  return (
                    e.reportError(
                      TypeError(
                        `Variable type not supported: $${r}, ${typeof t}`
                      )
                    ),
                    new FluentNone(`$${r}`)
                  );
              }
            })(e, r);
          case 'mesg':
            return (function (e, { name: r, attr: t }) {
              let n = e.bundle._messages.get(r);
              if (!n)
                return (
                  e.reportError(ReferenceError(`Unknown message: ${r}`)),
                  new FluentNone(r)
                );
              if (t) {
                let o = n.attributes[t];
                return o
                  ? u(e, o)
                  : (e.reportError(ReferenceError(`Unknown attribute: ${t}`)),
                    new FluentNone(`${r}.${t}`));
              }
              return n.value
                ? u(e, n.value)
                : (e.reportError(ReferenceError(`No value: ${r}`)),
                  new FluentNone(r));
            })(e, r);
          case 'term':
            return (function (e, { name: r, attr: t, args: n }) {
              let a = `-${r}`,
                i = e.bundle._terms.get(a);
              if (!i)
                return (
                  e.reportError(ReferenceError(`Unknown term: ${a}`)),
                  new FluentNone(a)
                );
              if (t) {
                let r = i.attributes[t];
                if (r) {
                  e.params = o(e, n).named;
                  let t = u(e, r);
                  return ((e.params = null), t);
                }
                return (
                  e.reportError(ReferenceError(`Unknown attribute: ${t}`)),
                  new FluentNone(`${a}.${t}`)
                );
              }
              e.params = o(e, n).named;
              let s = u(e, i.value);
              return ((e.params = null), s);
            })(e, r);
          case 'func':
            return (function (e, { name: r, args: t }) {
              let n = e.bundle._functions[r];
              if (!n)
                return (
                  e.reportError(ReferenceError(`Unknown function: ${r}()`)),
                  new FluentNone(`${r}()`)
                );
              if ('function' != typeof n)
                return (
                  e.reportError(TypeError(`Function ${r}() is not callable`)),
                  new FluentNone(`${r}()`)
                );
              try {
                let r = o(e, t);
                return n(r.positional, r.named);
              } catch (t) {
                return (e.reportError(t), new FluentNone(`${r}()`));
              }
            })(e, r);
          case 'select':
            return (function (e, { selector: r, variants: t, star: o }) {
              let i = a(e, r);
              if (i instanceof FluentNone) return n(e, t, o);
              for (let r of t) {
                var s, l, f;
                let t = a(e, r.key);
                if (
                  ((s = e),
                  (l = i),
                  (f = t) === l ||
                    (f instanceof FluentNumber &&
                      l instanceof FluentNumber &&
                      f.value === l.value) ||
                    (l instanceof FluentNumber &&
                      'string' == typeof f &&
                      f ===
                        s
                          .memoizeIntlObject(Intl.PluralRules, l.opts)
                          .select(l.value)) ||
                    0)
                )
                  return u(e, r.value);
              }
              return n(e, t, o);
            })(e, r);
          default:
            return new FluentNone();
        }
      }
      function i(e, r) {
        if (e.dirty.has(r))
          return (
            e.reportError(RangeError('Cyclic reference')),
            new FluentNone()
          );
        e.dirty.add(r);
        let t = [],
          n = e.bundle._useIsolating && r.length > 1;
        for (let o of r) {
          if ('string' == typeof o) {
            t.push(e.bundle._transform(o));
            continue;
          }
          if ((e.placeables++, e.placeables > 100))
            throw (
              e.dirty.delete(r),
              RangeError(
                `Too many placeables expanded: ${e.placeables}, max allowed is 100`
              )
            );
          (n && t.push('⁨'), t.push(a(e, o).toString(e)), n && t.push('⁩'));
        }
        return (e.dirty.delete(r), t.join(''));
      }
      function u(e, r) {
        return 'string' == typeof r ? e.bundle._transform(r) : i(e, r);
      }
      let Scope = class Scope {
        constructor(e, r, t) {
          ((this.dirty = new WeakSet()),
            (this.params = null),
            (this.placeables = 0),
            (this.bundle = e),
            (this.errors = r),
            (this.args = t));
        }
        reportError(e) {
          if (!this.errors || !(e instanceof Error)) throw e;
          this.errors.push(e);
        }
        memoizeIntlObject(e, r) {
          let t = this.bundle._intls.get(e);
          t || ((t = {}), this.bundle._intls.set(e, t));
          let n = JSON.stringify(r);
          return (t[n] || (t[n] = new e(this.bundle.locales, r)), t[n]);
        }
      };
      function s(e, r) {
        let t = Object.create(null);
        for (let [n, o] of Object.entries(e))
          r.includes(n) && (t[n] = o.valueOf());
        return t;
      }
      let l = [
        'unitDisplay',
        'currencyDisplay',
        'useGrouping',
        'minimumIntegerDigits',
        'minimumFractionDigits',
        'maximumFractionDigits',
        'minimumSignificantDigits',
        'maximumSignificantDigits'
      ];
      function f(e, r) {
        let t = e[0];
        if (t instanceof FluentNone)
          return new FluentNone(`NUMBER(${t.valueOf()})`);
        if (t instanceof FluentNumber)
          return new FluentNumber(t.valueOf(), { ...t.opts, ...s(r, l) });
        if (t instanceof FluentDateTime)
          return new FluentNumber(t.toNumber(), { ...s(r, l) });
        throw TypeError('Invalid argument to NUMBER');
      }
      let c = [
        'dateStyle',
        'timeStyle',
        'fractionalSecondDigits',
        'dayPeriod',
        'hour12',
        'weekday',
        'era',
        'year',
        'month',
        'day',
        'hour',
        'minute',
        'second',
        'timeZoneName'
      ];
      function h(e, r) {
        let t = e[0];
        if (t instanceof FluentNone)
          return new FluentNone(`DATETIME(${t.valueOf()})`);
        if (t instanceof FluentDateTime || t instanceof FluentNumber)
          return new FluentDateTime(t, s(r, c));
        throw TypeError('Invalid argument to DATETIME');
      }
      let p = new Map();
      let FluentBundle = class FluentBundle {
        constructor(
          e,
          { functions: r, useIsolating: t = !0, transform: n = e => e } = {}
        ) {
          let o, a;
          ((this._terms = new Map()),
            (this._messages = new Map()),
            (this.locales = Array.isArray(e) ? e : [e]),
            (this._functions = { NUMBER: f, DATETIME: h, ...r }),
            (this._useIsolating = t),
            (this._transform = n),
            (this._intls =
              ((o = Array.isArray(e) ? e.join(' ') : e),
              void 0 === (a = p.get(o)) && ((a = new Map()), p.set(o, a)),
              a)));
        }
        hasMessage(e) {
          return this._messages.has(e);
        }
        getMessage(e) {
          return this._messages.get(e);
        }
        addResource(e, { allowOverrides: r = !1 } = {}) {
          let t = [];
          for (let n = 0; n < e.body.length; n++) {
            let o = e.body[n];
            if (o.id.startsWith('-')) {
              if (!1 === r && this._terms.has(o.id)) {
                t.push(
                  Error(`Attempt to override an existing term: "${o.id}"`)
                );
                continue;
              }
              this._terms.set(o.id, o);
            } else {
              if (!1 === r && this._messages.has(o.id)) {
                t.push(
                  Error(`Attempt to override an existing message: "${o.id}"`)
                );
                continue;
              }
              this._messages.set(o.id, o);
            }
          }
          return t;
        }
        formatPattern(e, r = null, t = null) {
          if ('string' == typeof e) return this._transform(e);
          let n = new Scope(this, t, r);
          try {
            return i(n, e).toString(n);
          } catch (e) {
            if (n.errors && e instanceof Error)
              return (n.errors.push(e), new FluentNone().toString(n));
            throw e;
          }
        }
      };
      let m = /^(-?[a-zA-Z][\w-]*) *= */gm,
        d = /\.([a-zA-Z][\w-]*) *= */y,
        v = /\*?\[/y,
        g = /(-?[0-9]+(?:\.([0-9]+))?)/y,
        y = /([a-zA-Z][\w-]*)/y,
        w = /([$-])?([a-zA-Z][\w-]*)(?:\.([a-zA-Z][\w-]*))?/y,
        b = /^[A-Z][A-Z0-9_-]*$/,
        x = /([^{}\n\r]+)/y,
        E = /([^\\"\n\r]*)/y,
        F = /\\([\\"])/y,
        S = /\\u([a-fA-F0-9]{4})|\\U([a-fA-F0-9]{6})/y,
        T = /^\n+/,
        N = / +$/,
        $ = / *\r?\n/g,
        _ = /( *)$/,
        O = /{\s*/y,
        D = /\s*}/y,
        M = /\[\s*/y,
        I = /\s*] */y,
        A = /\s*\(\s*/y,
        k = /\s*->\s*/y,
        j = /\s*:\s*/y,
        U = /\s*,?\s*/y,
        R = /\s+/y;
      let FluentResource = class FluentResource {
        constructor(e) {
          ((this.body = []), (m.lastIndex = 0));
          let r = 0;
          for (;;) {
            let n = m.exec(e);
            if (null === n) break;
            r = m.lastIndex;
            try {
              this.body.push(
                (function (e) {
                  let r = u(),
                    n = (function () {
                      let e = Object.create(null);
                      for (; t(d);) {
                        let r = i(d),
                          t = u();
                        if (null === t)
                          throw SyntaxError('Expected attribute value');
                        e[r] = t;
                      }
                      return e;
                    })();
                  if (null === r && 0 === Object.keys(n).length)
                    throw SyntaxError('Expected message value or attributes');
                  return { id: e, value: r, attributes: n };
                })(n[1])
              );
            } catch (e) {
              if (e instanceof SyntaxError) continue;
              throw e;
            }
          }
          function t(t) {
            return ((t.lastIndex = r), t.test(e));
          }
          function n(t, n) {
            if (e[r] === t) return (r++, !0);
            if (n) throw new n(`Expected ${t}`);
            return !1;
          }
          function o(e, n) {
            if (t(e)) return ((r = e.lastIndex), !0);
            if (n) throw new n(`Expected ${e.toString()}`);
            return !1;
          }
          function a(t) {
            t.lastIndex = r;
            let n = t.exec(e);
            if (null === n) throw SyntaxError(`Expected ${t.toString()}`);
            return ((r = t.lastIndex), n);
          }
          function i(e) {
            return a(e)[1];
          }
          function u() {
            let n;
            if ((t(x) && (n = i(x)), '{' === e[r] || '}' === e[r]))
              return s(n ? [n] : [], 1 / 0);
            let o = h();
            return o
              ? n
                ? s([n, o], o.length)
                : ((o.value = p(o.value, T)), s([o], o.length))
              : n
                ? p(n, N)
                : null;
          }
          function s(n = [], o) {
            for (;;) {
              if (t(x)) {
                n.push(i(x));
                continue;
              }
              if ('{' === e[r]) {
                n.push(l());
                continue;
              }
              if ('}' === e[r]) throw SyntaxError('Unbalanced closing brace');
              let a = h();
              if (a) {
                (n.push(a), (o = Math.min(o, a.length)));
                continue;
              }
              break;
            }
            let a = n.length - 1,
              u = n[a];
            'string' == typeof u && (n[a] = p(u, N));
            let f = [];
            for (let e of n)
              (e instanceof Indent &&
                (e = e.value.slice(0, e.value.length - o)),
                e && f.push(e));
            return f;
          }
          function l() {
            o(O, SyntaxError);
            let s = (function n() {
              if ('{' === e[r]) return l();
              if (t(w)) {
                let [, t, i, u = null] = a(w);
                if ('$' === t) return { type: 'var', name: i };
                if (o(A)) {
                  let a = (function () {
                    let t = [];
                    for (;;) {
                      switch (e[r]) {
                        case ')':
                          return (r++, t);
                        case void 0:
                          throw SyntaxError('Unclosed argument list');
                      }
                      (t.push(
                        (function () {
                          let e = n();
                          return 'mesg' !== e.type
                            ? e
                            : o(j)
                              ? { type: 'narg', name: e.name, value: f() }
                              : e;
                        })()
                      ),
                        o(U));
                    }
                  })();
                  if ('-' === t)
                    return { type: 'term', name: i, attr: u, args: a };
                  if (b.test(i)) return { type: 'func', name: i, args: a };
                  throw SyntaxError('Function names must be all upper-case');
                }
                return '-' === t
                  ? { type: 'term', name: i, attr: u, args: [] }
                  : { type: 'mesg', name: i, attr: u };
              }
              return f();
            })();
            if (o(D)) return s;
            if (o(k)) {
              let e = (function () {
                let e,
                  r = [],
                  a = 0;
                for (; t(v);) {
                  n('*') && (e = a);
                  let s = (function () {
                      let e;
                      return (
                        o(M, SyntaxError),
                        (e = t(g) ? c() : { type: 'str', value: i(y) }),
                        o(I, SyntaxError),
                        e
                      );
                    })(),
                    l = u();
                  if (null === l) throw SyntaxError('Expected variant value');
                  r[a++] = { key: s, value: l };
                }
                if (0 === a) return null;
                if (void 0 === e) throw SyntaxError('Expected default variant');
                return { variants: r, star: e };
              })();
              return (o(D, SyntaxError), { type: 'select', selector: s, ...e });
            }
            throw SyntaxError('Unclosed placeable');
          }
          function f() {
            if (t(g)) return c();
            if ('"' === e[r]) {
              n('"', SyntaxError);
              let o = '';
              for (;;) {
                if (((o += i(E)), '\\' === e[r])) {
                  o += (function () {
                    if (t(F)) return i(F);
                    if (t(S)) {
                      let [, e, r] = a(S),
                        t = parseInt(e || r, 16);
                      return t <= 55295 || 57344 <= t
                        ? String.fromCodePoint(t)
                        : '�';
                    }
                    throw SyntaxError('Unknown escape sequence');
                  })();
                  continue;
                }
                if (n('"')) return { type: 'str', value: o };
                throw SyntaxError('Unclosed string literal');
              }
              return;
            }
            throw SyntaxError('Invalid expression');
          }
          function c() {
            let [, e, r = ''] = a(g),
              t = r.length;
            return { type: 'num', value: parseFloat(e), precision: t };
          }
          function h() {
            let t = r;
            switch ((o(R), e[r])) {
              case '.':
              case '[':
              case '*':
              case '}':
              case void 0:
                return !1;
              case '{':
                return P(e.slice(t, r));
            }
            return ' ' === e[r - 1] && P(e.slice(t, r));
          }
          function p(e, r) {
            return e.replace(r, '');
          }
          function P(e) {
            return new Indent(e.replace($, '\n'), _.exec(e)[1].length);
          }
        }
      };
      let Indent = class Indent {
        constructor(e, r) {
          ((this.value = e), (this.length = r));
        }
      };
    }
  };

  return { __rspack_esm_id, __rspack_esm_ids, __webpack_modules__ };
})();

// === chunk 4585 ===
const chunk4585 = (function () {
  /*! LICENSE: 4585.c86502bf8c0611c2.js.LICENSE.txt */
  const __rspack_esm_id = 4585;
  const __rspack_esm_ids = [4585];
  const __webpack_modules__ = {
    98821(t, r, n) {
      var s = n(36752);
      let a = null,
        o = {
          boundAttributeSuffix: s.ge.M,
          marker: s.ge.P,
          markerMatch: s.ge.A,
          HTML_RESULT: s.ge.C,
          getTemplateHtml: s.ge.L,
          overrideDirectiveResolve: (t, r) =>
            class extends t {
              _$AS(t, n) {
                return r(this, n);
              }
            },
          patchDirectiveResolve: (t, r) => {
            if (t.prototype._$AS.name !== r.name) {
              a ??= t.prototype._$AS.name;
              for (
                let n = t.prototype;
                n !== Object.prototype;
                n = Object.getPrototypeOf(n)
              )
                if (n.hasOwnProperty(a)) return void (n[a] = r);
              throw Error(
                'Internal error: It is possible that both dev mode and production mode Lit was mixed together during SSR. Please comment on the issue: https://github.com/lit/lit/issues/4527'
              );
            }
          },
          setDirectiveClass(t, r) {
            t._$litDirective$ = r;
          },
          getAttributePartCommittedValue: (t, r, n) => {
            let a = s.c0;
            return ((t.j = t => (a = t)), t._$AI(r, t, n), a);
          },
          connectedDisconnectable: t => ({ ...t, _$AU: !0 }),
          resolveDirective: s.ge.V,
          AttributePart: s.ge.H,
          PropertyPart: s.ge.B,
          BooleanAttributePart: s.ge.N,
          EventPart: s.ge.U,
          ElementPart: s.ge.F,
          TemplateInstance: s.ge.R,
          isIterable: s.ge.D,
          ChildPart: s.ge.I
        };
      var l = n(7804),
        c = n(18504);
      let {
          TemplateInstance: d,
          isIterable: u,
          resolveDirective: h,
          ChildPart: p,
          ElementPart: g
        } = o,
        f = (t, r, n, a) => {
          let o, l;
          if (0 === n.length) ((l = new p(r, null, void 0, a)), (o = t));
          else {
            let t = n[n.length - 1];
            if ('template-instance' === t.type)
              ((l = new p(r, null, t.instance, a)),
                t.instance._$AV.push(l),
                (o = t.result.values[t.instancePartIndex++]),
                t.templatePartIndex++);
            else if ('iterable' === t.type) {
              l = new p(r, null, t.part, a);
              let n = t.iterator.next();
              if (n.done)
                throw (
                  (o = void 0),
                  (t.done = !0),
                  Error('Unhandled shorter than expected iterable')
                );
              ((o = n.value), t.part._$AH.push(l));
            } else l = new p(r, null, t.part, a);
          }
          if ((o = h(l, o)) === s.c0) n.push({ part: l, type: 'leaf' });
          else if ((0, c.sO)(o))
            (n.push({ part: l, type: 'leaf' }), (l._$AH = o));
          else if ((0, c.qb)(o)) {
            if ((0, c.ps)(o))
              throw Error('compiled templates are not supported');
            let t = 'lit-part ' + w(o);
            if (r.data !== t)
              throw Error(
                'Hydration value mismatch: Unexpected TemplateResult rendered to part'
              );
            {
              let t = new d(p.prototype._$AC(o), l);
              (n.push({
                type: 'template-instance',
                instance: t,
                part: l,
                templatePartIndex: 0,
                instancePartIndex: 0,
                result: o
              }),
                (l._$AH = t));
            }
          } else
            u(o)
              ? (n.push({
                  part: l,
                  type: 'iterable',
                  value: o,
                  iterator: o[Symbol.iterator](),
                  done: !1
                }),
                (l._$AH = []))
              : (n.push({ part: l, type: 'leaf' }), (l._$AH = o ?? ''));
          return l;
        },
        m = (t, r, n) => {
          if (void 0 === r) throw Error('unbalanced part marker');
          r._$AB = t;
          let s = n.pop();
          if ('iterable' === s.type && !s.iterator.next().done)
            throw Error('unexpected longer than expected iterable');
          if (n.length > 0) return n[n.length - 1].part;
        },
        b = (t, r, n) => {
          let s = parseInt(/lit-node (\d+)/.exec(t.data)[1]),
            a = t.nextElementSibling;
          if (null === a)
            throw Error('could not find node for attribute parts');
          a.removeAttribute('defer-hydration');
          let o = r[r.length - 1];
          if ('template-instance' !== o.type)
            throw Error(
              'Hydration value mismatch: Primitive found where TemplateResult expected. This usually occurs due to conditional rendering that resulted in a different value or template being rendered between the server and client.'
            );
          {
            let t = o.instance;
            for (;;) {
              let r = t._$AD.parts[o.templatePartIndex];
              if (
                void 0 === r ||
                (r.type !== l.OA.ATTRIBUTE && r.type !== l.OA.ELEMENT) ||
                r.index !== s
              )
                break;
              if (r.type === l.OA.ATTRIBUTE) {
                let s = new r.ctor(a, r.name, r.strings, o.instance, n),
                  d = (0, c.Rt)(s)
                    ? o.result.values[o.instancePartIndex]
                    : o.result.values,
                  u = s.type !== l.OA.EVENT && s.type !== l.OA.PROPERTY;
                (s._$AI(d, s, o.instancePartIndex, u),
                  (o.instancePartIndex += r.strings.length - 1),
                  t._$AV.push(s));
              } else {
                let r = new g(a, o.instance, n);
                (h(r, o.result.values[o.instancePartIndex++]), t._$AV.push(r));
              }
              o.templatePartIndex++;
            }
          }
        },
        v = new WeakMap(),
        w = t => {
          let r = v.get(t.strings);
          if (void 0 !== r) return r;
          let n = new Uint32Array(2).fill(5381);
          for (let r of t.strings)
            for (let t = 0; t < r.length; t++)
              n[t % 2] = (33 * n[t % 2]) ^ r.charCodeAt(t);
          return (
            (r = btoa(String.fromCharCode(...new Uint8Array(n.buffer)))),
            v.set(t.strings, r),
            r
          );
        };
      globalThis.litElementHydrateSupport = ({ LitElement: t }) => {
        let r = Object.getOwnPropertyDescriptor(
          Object.getPrototypeOf(t),
          'observedAttributes'
        ).get;
        Object.defineProperty(t, 'observedAttributes', {
          get() {
            return [...r.call(this), 'defer-hydration'];
          }
        });
        let n = t.prototype.attributeChangedCallback;
        t.prototype.attributeChangedCallback = function (t, r, s) {
          ('defer-hydration' === t && null === s && a.call(this),
            n.call(this, t, r, s));
        };
        let a = t.prototype.connectedCallback;
        t.prototype.connectedCallback = function () {
          this.hasAttribute('defer-hydration') || a.call(this);
        };
        let o = t.prototype.createRenderRoot;
        t.prototype.createRenderRoot = function () {
          return this.shadowRoot
            ? ((this._$AG = !0), this.shadowRoot)
            : o.call(this);
        };
        let l = Object.getPrototypeOf(t.prototype).update;
        t.prototype.update = function (t) {
          let r = this.render();
          if ((l.call(this, t), this._$AG)) {
            for (let t of ((this._$AG = !1), this.getAttributeNames()))
              if (t.startsWith('hydrate-internals-')) {
                let r = t.slice(18);
                (this.removeAttribute(r), this.removeAttribute(t));
              }
            ((t, r, n = {}) => {
              let s, a, o, l;
              if (void 0 !== r._$litPart$)
                throw Error('container already contains a live render');
              let c = [],
                d = document.createTreeWalker(r, NodeFilter.SHOW_COMMENT);
              for (; null !== (l = d.nextNode());) {
                let r = l.data;
                if (r.startsWith('lit-part')) {
                  if (0 === c.length && void 0 !== s)
                    throw Error(
                      `There must be only one root part per container. Found a part marker (${l}) when we already have a root part marker (${a})`
                    );
                  ((o = f(t, l, c, n)), void 0 === s && (s = o), (a ??= l));
                } else if (r.startsWith('lit-node')) b(l, c, n);
                else if (r.startsWith('/lit-part')) {
                  if (1 === c.length && o !== s) throw Error('internal error');
                  o = m(l, o, c);
                }
              }
              if (void 0 === s) {
                let t =
                  r instanceof ShadowRoot
                    ? "{container.host.localName}'s shadow root"
                    : r instanceof DocumentFragment
                      ? 'DocumentFragment'
                      : r.localName;
                console.error(
                  `There should be exactly one root part in a render container, but we didn't find any in ${t}.`
                );
              }
              r._$litPart$ = s;
            })(r, this.renderRoot, this.renderOptions);
          } else (0, s.XX)(r, this.renderRoot, this.renderOptions);
        };
      };
    },
    85675(t, r, n) {
      n.d(r, { mN: () => y, AH: () => c, Ec: () => E });
      let s = globalThis,
        a =
          s.ShadowRoot &&
          (void 0 === s.ShadyCSS || s.ShadyCSS.nativeShadow) &&
          'adoptedStyleSheets' in Document.prototype &&
          'replace' in CSSStyleSheet.prototype,
        o = Symbol(),
        l = new WeakMap();
      let css_tag_n = class css_tag_n {
        constructor(t, r, n) {
          if (((this._$cssResult$ = !0), n !== o))
            throw Error(
              'CSSResult is not constructable. Use `unsafeCSS` or `css` instead.'
            );
          ((this.cssText = t), (this.t = r));
        }
        get styleSheet() {
          let t = this.o,
            r = this.t;
          if (a && void 0 === t) {
            let n = void 0 !== r && 1 === r.length;
            (n && (t = l.get(r)),
              void 0 === t &&
                ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText),
                n && l.set(r, t)));
          }
          return t;
        }
        toString() {
          return this.cssText;
        }
      };
      let c = (t, ...r) =>
          new css_tag_n(
            1 === t.length
              ? t[0]
              : r.reduce(
                  (r, n, s) =>
                    r +
                    (t => {
                      if (!0 === t._$cssResult$) return t.cssText;
                      if ('number' == typeof t) return t;
                      throw Error(
                        "Value passed to 'css' function must be a 'css' function result: " +
                          t +
                          ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security."
                      );
                    })(n) +
                    t[s + 1],
                  t[0]
                ),
            t,
            o
          ),
        d = a
          ? t => t
          : t =>
              t instanceof CSSStyleSheet
                ? (t => {
                    let r,
                      n = '';
                    for (let r of t.cssRules) n += r.cssText;
                    return new css_tag_n(
                      'string' == typeof (r = n) ? r : r + '',
                      void 0,
                      o
                    );
                  })(t)
                : t,
        {
          is: u,
          defineProperty: h,
          getOwnPropertyDescriptor: p,
          getOwnPropertyNames: g,
          getOwnPropertySymbols: f,
          getPrototypeOf: m
        } = Object,
        b = globalThis,
        v = b.trustedTypes,
        w = v ? v.emptyScript : '',
        $ = b.reactiveElementPolyfillSupport,
        _ = {
          toAttribute(t, r) {
            switch (r) {
              case Boolean:
                t = t ? w : null;
                break;
              case Object:
              case Array:
                t = null == t ? t : JSON.stringify(t);
            }
            return t;
          },
          fromAttribute(t, r) {
            let n = t;
            switch (r) {
              case Boolean:
                n = null !== t;
                break;
              case Number:
                n = null === t ? null : Number(t);
                break;
              case Object:
              case Array:
                try {
                  n = JSON.parse(t);
                } catch (t) {
                  n = null;
                }
            }
            return n;
          }
        },
        E = (t, r) => !u(t, r),
        A = {
          attribute: !0,
          type: String,
          converter: _,
          reflect: !1,
          useDefault: !1,
          hasChanged: E
        };
      ((Symbol.metadata ??= Symbol('metadata')),
        (b.litPropertyMetadata ??= new WeakMap()));
      let y = class y extends HTMLElement {
        static addInitializer(t) {
          (this._$Ei(), (this.l ??= []).push(t));
        }
        static get observedAttributes() {
          return (this.finalize(), this._$Eh && [...this._$Eh.keys()]);
        }
        static createProperty(t, r = A) {
          if (
            (r.state && (r.attribute = !1),
            this._$Ei(),
            this.prototype.hasOwnProperty(t) &&
              ((r = Object.create(r)).wrapped = !0),
            this.elementProperties.set(t, r),
            !r.noAccessor)
          ) {
            let n = Symbol(),
              s = this.getPropertyDescriptor(t, n, r);
            void 0 !== s && h(this.prototype, t, s);
          }
        }
        static getPropertyDescriptor(t, r, n) {
          let { get: s, set: a } = p(this.prototype, t) ?? {
            get() {
              return this[r];
            },
            set(t) {
              this[r] = t;
            }
          };
          return {
            get: s,
            set(r) {
              let o = s?.call(this);
              (a?.call(this, r), this.requestUpdate(t, o, n));
            },
            configurable: !0,
            enumerable: !0
          };
        }
        static getPropertyOptions(t) {
          return this.elementProperties.get(t) ?? A;
        }
        static _$Ei() {
          if (this.hasOwnProperty('elementProperties')) return;
          let t = m(this);
          (t.finalize(),
            void 0 !== t.l && (this.l = [...t.l]),
            (this.elementProperties = new Map(t.elementProperties)));
        }
        static finalize() {
          if (this.hasOwnProperty('finalized')) return;
          if (
            ((this.finalized = !0),
            this._$Ei(),
            this.hasOwnProperty('properties'))
          ) {
            let t = this.properties;
            for (let r of [...g(t), ...f(t)]) this.createProperty(r, t[r]);
          }
          let t = this[Symbol.metadata];
          if (null !== t) {
            let r = litPropertyMetadata.get(t);
            if (void 0 !== r)
              for (let [t, n] of r) this.elementProperties.set(t, n);
          }
          for (let [t, r] of ((this._$Eh = new Map()),
          this.elementProperties)) {
            let n = this._$Eu(t, r);
            void 0 !== n && this._$Eh.set(n, t);
          }
          this.elementStyles = this.finalizeStyles(this.styles);
        }
        static finalizeStyles(t) {
          let r = [];
          if (Array.isArray(t))
            for (let n of new Set(t.flat(1 / 0).reverse())) r.unshift(d(n));
          else void 0 !== t && r.push(d(t));
          return r;
        }
        static _$Eu(t, r) {
          let n = r.attribute;
          return !1 === n
            ? void 0
            : 'string' == typeof n
              ? n
              : 'string' == typeof t
                ? t.toLowerCase()
                : void 0;
        }
        constructor() {
          (super(),
            (this._$Ep = void 0),
            (this.isUpdatePending = !1),
            (this.hasUpdated = !1),
            (this._$Em = null),
            this._$Ev());
        }
        _$Ev() {
          ((this._$ES = new Promise(t => (this.enableUpdating = t))),
            (this._$AL = new Map()),
            this._$E_(),
            this.requestUpdate(),
            this.constructor.l?.forEach(t => t(this)));
        }
        addController(t) {
          ((this._$EO ??= new Set()).add(t),
            void 0 !== this.renderRoot &&
              this.isConnected &&
              t.hostConnected?.());
        }
        removeController(t) {
          this._$EO?.delete(t);
        }
        _$E_() {
          let t = new Map();
          for (let r of this.constructor.elementProperties.keys())
            this.hasOwnProperty(r) && (t.set(r, this[r]), delete this[r]);
          t.size > 0 && (this._$Ep = t);
        }
        createRenderRoot() {
          let t =
            this.shadowRoot ??
            this.attachShadow(this.constructor.shadowRootOptions);
          return (
            ((t, r) => {
              if (a)
                t.adoptedStyleSheets = r.map(t =>
                  t instanceof CSSStyleSheet ? t : t.styleSheet
                );
              else
                for (let n of r) {
                  let r = document.createElement('style'),
                    a = s.litNonce;
                  (void 0 !== a && r.setAttribute('nonce', a),
                    (r.textContent = n.cssText),
                    t.appendChild(r));
                }
            })(t, this.constructor.elementStyles),
            t
          );
        }
        connectedCallback() {
          ((this.renderRoot ??= this.createRenderRoot()),
            this.enableUpdating(!0),
            this._$EO?.forEach(t => t.hostConnected?.()));
        }
        enableUpdating(t) {}
        disconnectedCallback() {
          this._$EO?.forEach(t => t.hostDisconnected?.());
        }
        attributeChangedCallback(t, r, n) {
          this._$AK(t, n);
        }
        _$ET(t, r) {
          let n = this.constructor.elementProperties.get(t),
            s = this.constructor._$Eu(t, n);
          if (void 0 !== s && !0 === n.reflect) {
            let a = (
              void 0 !== n.converter?.toAttribute ? n.converter : _
            ).toAttribute(r, n.type);
            ((this._$Em = t),
              null == a ? this.removeAttribute(s) : this.setAttribute(s, a),
              (this._$Em = null));
          }
        }
        _$AK(t, r) {
          let n = this.constructor,
            s = n._$Eh.get(t);
          if (void 0 !== s && this._$Em !== s) {
            let t = n.getPropertyOptions(s),
              a =
                'function' == typeof t.converter
                  ? { fromAttribute: t.converter }
                  : void 0 !== t.converter?.fromAttribute
                    ? t.converter
                    : _;
            ((this._$Em = s),
              (this[s] =
                a.fromAttribute(r, t.type) ?? this._$Ej?.get(s) ?? null),
              (this._$Em = null));
          }
        }
        requestUpdate(t, r, n) {
          if (void 0 !== t) {
            let s = this.constructor,
              a = this[t];
            if (!(
              ((n ??= s.getPropertyOptions(t)).hasChanged ?? E)(a, r) ||
              (n.useDefault &&
                n.reflect &&
                a === this._$Ej?.get(t) &&
                !this.hasAttribute(s._$Eu(t, n)))
            ))
              return;
            this.C(t, r, n);
          }
          !1 === this.isUpdatePending && (this._$ES = this._$EP());
        }
        C(t, r, { useDefault: n, reflect: s, wrapped: a }, o) {
          (n &&
            !(this._$Ej ??= new Map()).has(t) &&
            (this._$Ej.set(t, o ?? r ?? this[t]), !0 !== a || void 0 !== o)) ||
            (this._$AL.has(t) ||
              (this.hasUpdated || n || (r = void 0), this._$AL.set(t, r)),
            !0 === s && this._$Em !== t && (this._$Eq ??= new Set()).add(t));
        }
        async _$EP() {
          this.isUpdatePending = !0;
          try {
            await this._$ES;
          } catch (t) {
            Promise.reject(t);
          }
          let t = this.scheduleUpdate();
          return (null != t && (await t), !this.isUpdatePending);
        }
        scheduleUpdate() {
          return this.performUpdate();
        }
        performUpdate() {
          if (!this.isUpdatePending) return;
          if (!this.hasUpdated) {
            if (((this.renderRoot ??= this.createRenderRoot()), this._$Ep)) {
              for (let [t, r] of this._$Ep) this[t] = r;
              this._$Ep = void 0;
            }
            let t = this.constructor.elementProperties;
            if (t.size > 0)
              for (let [r, n] of t) {
                let { wrapped: t } = n,
                  s = this[r];
                !0 !== t ||
                  this._$AL.has(r) ||
                  void 0 === s ||
                  this.C(r, void 0, n, s);
              }
          }
          let t = !1,
            r = this._$AL;
          try {
            (t = this.shouldUpdate(r))
              ? (this.willUpdate(r),
                this._$EO?.forEach(t => t.hostUpdate?.()),
                this.update(r))
              : this._$EM();
          } catch (r) {
            throw ((t = !1), this._$EM(), r);
          }
          t && this._$AE(r);
        }
        willUpdate(t) {}
        _$AE(t) {
          (this._$EO?.forEach(t => t.hostUpdated?.()),
            this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
            this.updated(t));
        }
        _$EM() {
          ((this._$AL = new Map()), (this.isUpdatePending = !1));
        }
        get updateComplete() {
          return this.getUpdateComplete();
        }
        getUpdateComplete() {
          return this._$ES;
        }
        shouldUpdate(t) {
          return !0;
        }
        update(t) {
          ((this._$Eq &&= this._$Eq.forEach(t => this._$ET(t, this[t]))),
            this._$EM());
        }
        updated(t) {}
        firstUpdated(t) {}
      };
      ((y.elementStyles = []),
        (y.shadowRootOptions = { mode: 'open' }),
        (y.elementProperties = new Map()),
        (y.finalized = new Map()),
        $?.({ ReactiveElement: y }),
        (b.reactiveElementVersions ??= []).push('2.1.0'));
    },
    36085(t, r, n) {
      n.d(r, { YZ: () => task_h });
      var s = n(85675);
      let a = Symbol();
      let task_h = class task_h {
        get taskComplete() {
          return (
            this.t ||
              (1 === this.i
                ? (this.t = new Promise((t, r) => {
                    ((this.o = t), (this.h = r));
                  }))
                : 3 === this.i
                  ? (this.t = Promise.reject(this.l))
                  : (this.t = Promise.resolve(this.u))),
            this.t
          );
        }
        constructor(t, r, n) {
          ((this.p = 0), (this.i = 0), (this._ = t).addController(this));
          let s = 'object' == typeof r ? r : { task: r, args: n };
          ((this.v = s.task),
            (this.j = s.args),
            (this.m = s.argsEqual ?? o),
            (this.k = s.onComplete),
            (this.A = s.onError),
            (this.autoRun = s.autoRun ?? !0),
            'initialValue' in s &&
              ((this.u = s.initialValue), (this.i = 2), (this.O = this.T?.())));
        }
        hostUpdate() {
          !0 === this.autoRun && this.S();
        }
        hostUpdated() {
          'afterUpdate' === this.autoRun && this.S();
        }
        T() {
          if (void 0 === this.j) return;
          let t = this.j();
          if (!Array.isArray(t))
            throw Error('The args function must return an array');
          return t;
        }
        async S() {
          let t = this.T(),
            r = this.O;
          ((this.O = t),
            t === r ||
              void 0 === t ||
              (void 0 !== r && this.m(r, t)) ||
              (await this.run(t)));
        }
        async run(t) {
          let r, n;
          ((t ??= this.T()),
            (this.O = t),
            1 === this.i
              ? this.q?.abort()
              : ((this.t = void 0), (this.o = void 0), (this.h = void 0)),
            (this.i = 1),
            'afterUpdate' === this.autoRun
              ? queueMicrotask(() => this._.requestUpdate())
              : this._.requestUpdate());
          let s = ++this.p;
          this.q = new AbortController();
          let o = !1;
          try {
            r = await this.v(t, { signal: this.q.signal });
          } catch (t) {
            ((o = !0), (n = t));
          }
          if (this.p === s) {
            if (r === a) this.i = 0;
            else {
              if (!1 === o) {
                try {
                  this.k?.(r);
                } catch {}
                ((this.i = 2), this.o?.(r));
              } else {
                try {
                  this.A?.(n);
                } catch {}
                ((this.i = 3), this.h?.(n));
              }
              ((this.u = r), (this.l = n));
            }
            this._.requestUpdate();
          }
        }
        abort(t) {
          1 === this.i && this.q?.abort(t);
        }
        get value() {
          return this.u;
        }
        get error() {
          return this.l;
        }
        get status() {
          return this.i;
        }
        render(t) {
          switch (this.i) {
            case 0:
              return t.initial?.();
            case 1:
              return t.pending?.();
            case 2:
              return t.complete?.(this.value);
            case 3:
              return t.error?.(this.error);
            default:
              throw Error('Unexpected status: ' + this.i);
          }
        }
      };
      let o = (t, r) =>
        t === r ||
        (t.length === r.length && t.every((t, n) => !(0, s.Ec)(t, r[n])));
    },
    30994(t, r, n) {
      let s = '#glean_reference_time',
        a = '#glean_execution_counter',
        o = [a, s];
      n.d(
        r,
        {},
        {
          Gh: 'https://incoming.telemetry.mozilla.org',
          HT: a,
          Kp: 'c0ffeec0-ffee-c0ff-eec0-ffeec0ffeec0',
          OM: 'deletion-request',
          Tg: o,
          Tv: 'glean_client_info',
          cp: 'glean_ping_info',
          zh: s
        }
      );
    },
    27604(t, r, n) {
      var s = n(80849);
      let a = 'core.Context';
      let Context = class Context {
        constructor() {
          ((this.initialized = !1),
            (this.testing = !1),
            (this.supportedMetrics = {}),
            (this.startTime = new Date()));
        }
        static get instance() {
          return (
            Context._instance || (Context._instance = new Context()),
            Context._instance
          );
        }
        static testUninitialize() {
          Context._instance = void 0;
        }
        static get uploadEnabled() {
          return (
            void 0 === Context.instance.uploadEnabled &&
              (0, s.A)(
                a,
                [
                  'Attempted to access Context.uploadEnabled before it was set. This may cause unexpected behaviour.'
                ],
                s.q.Trace
              ),
            Context.instance.uploadEnabled
          );
        }
        static set uploadEnabled(t) {
          Context.instance.uploadEnabled = t;
        }
        static get metricsDatabase() {
          return (
            void 0 === Context.instance.metricsDatabase &&
              (0, s.A)(
                a,
                [
                  'Attempted to access Context.metricsDatabase before it was set. This may cause unexpected behaviour.'
                ],
                s.q.Trace
              ),
            Context.instance.metricsDatabase
          );
        }
        static set metricsDatabase(t) {
          Context.instance.metricsDatabase = t;
        }
        static get eventsDatabase() {
          return (
            void 0 === Context.instance.eventsDatabase &&
              (0, s.A)(
                a,
                [
                  'Attempted to access Context.eventsDatabase before it was set. This may cause unexpected behaviour.'
                ],
                s.q.Trace
              ),
            Context.instance.eventsDatabase
          );
        }
        static set eventsDatabase(t) {
          Context.instance.eventsDatabase = t;
        }
        static get pingsDatabase() {
          return (
            void 0 === Context.instance.pingsDatabase &&
              (0, s.A)(
                a,
                [
                  'Attempted to access Context.pingsDatabase before it was set. This may cause unexpected behaviour.'
                ],
                s.q.Trace
              ),
            Context.instance.pingsDatabase
          );
        }
        static set pingsDatabase(t) {
          Context.instance.pingsDatabase = t;
        }
        static get errorManager() {
          return (
            void 0 === Context.instance.errorManager &&
              (0, s.A)(
                a,
                [
                  'Attempted to access Context.errorManager before it was set. This may cause unexpected behaviour.'
                ],
                s.q.Trace
              ),
            Context.instance.errorManager
          );
        }
        static set errorManager(t) {
          Context.instance.errorManager = t;
        }
        static get applicationId() {
          return (
            void 0 === Context.instance.applicationId &&
              (0, s.A)(
                a,
                [
                  'Attempted to access Context.applicationId before it was set. This may cause unexpected behaviour.'
                ],
                s.q.Trace
              ),
            Context.instance.applicationId
          );
        }
        static set applicationId(t) {
          Context.instance.applicationId = t;
        }
        static get initialized() {
          return Context.instance.initialized;
        }
        static set initialized(t) {
          Context.instance.initialized = t;
        }
        static get config() {
          return (
            void 0 === Context.instance.config &&
              (0, s.A)(
                a,
                [
                  'Attempted to access Context.config before it was set. This may cause unexpected behaviour.'
                ],
                s.q.Trace
              ),
            Context.instance.config
          );
        }
        static set config(t) {
          Context.instance.config = t;
        }
        static get startTime() {
          return Context.instance.startTime;
        }
        static get testing() {
          return Context.instance.testing;
        }
        static set testing(t) {
          Context.instance.testing = t;
        }
        static get corePings() {
          return Context.instance.corePings;
        }
        static set corePings(t) {
          Context.instance.corePings = t;
        }
        static get coreMetrics() {
          return Context.instance.coreMetrics;
        }
        static set coreMetrics(t) {
          Context.instance.coreMetrics = t;
        }
        static set platform(t) {
          Context.instance.platform = t;
        }
        static get platform() {
          return (
            void 0 === Context.instance.platform &&
              (0, s.A)(
                a,
                [
                  'Attempted to access Context.platform before it was set. This may cause unexpected behaviour.'
                ],
                s.q.Trace
              ),
            Context.instance.platform
          );
        }
        static isPlatformSet() {
          return !!Context.instance.platform;
        }
        static getSupportedMetric(t) {
          return Context.instance.supportedMetrics[t];
        }
        static addSupportedMetric(t, r) {
          t in Context.instance.supportedMetrics ||
            (Context.instance.supportedMetrics[t] = r);
        }
      };
      n.d(r, { o: () => Context });
    },
    40351(t, r, n) {
      var s, a;
      (((a = s || (s = {})).InvalidValue = 'invalid_value'),
        (a.InvalidLabel = 'invalid_label'),
        (a.InvalidState = 'invalid_state'),
        (a.InvalidOverflow = 'invalid_overflow'),
        (a.InvalidType = 'invalid_type'),
        n.d(r, { B: () => s }));
    },
    34388(t, r, n) {
      var s,
        a = n(27604),
        o = n(87484),
        l = n(67867),
        c = n(80849);
      let d = 'core.glean_metrics';
      var u = s || (s = {});
      let h = {
        pageLoad: new l.A(
          {
            category: 'glean',
            name: 'page_load',
            sendInPings: ['events'],
            lifetime: 'ping',
            disabled: !1
          },
          ['url', 'referrer', 'title']
        ),
        elementClick: new l.A(
          {
            category: 'glean',
            name: 'element_click',
            sendInPings: ['events'],
            lifetime: 'ping',
            disabled: !1
          },
          ['id', 'type', 'label', 'url', 'referrer', 'title']
        ),
        pageId: new o.Ay({
          category: 'glean',
          name: 'page_id',
          sendInPings: ['events'],
          lifetime: 'application',
          disabled: !1
        })
      };
      function p(t) {
        a.o.initialized
          ? h.elementClick.record(t)
          : (0, c.A)(
              d,
              'Attempted to record element click event before Glean was initialized. This is a no-op.',
              c.q.Warn
            );
      }
      ((u.pageLoad = function (t) {
        var r, n, s;
        a.o.initialized
          ? (h.pageId.generateAndSet(),
            h.pageLoad.record({
              url:
                null != (r = null == t ? void 0 : t.url)
                  ? r
                  : 'u' > typeof window
                    ? window.location.href
                    : 'URL_NOT_PROVIDED_OR_AVAILABLE',
              referrer:
                null != (n = null == t ? void 0 : t.referrer)
                  ? n
                  : 'u' > typeof document
                    ? document.referrer
                    : 'REFERRER_NOT_PROVIDED_OR_AVAILABLE',
              title:
                null != (s = null == t ? void 0 : t.title)
                  ? s
                  : 'u' > typeof document
                    ? document.title
                    : 'TITLE_NOT_PROVIDED_OR_AVAILABLE'
            }))
          : (0, c.A)(
              d,
              'Attempted to record a page load event before Glean was initialized. This is a no-op.',
              c.q.Warn
            );
      }),
        (u.handleClickEvent = function (t) {
          let r,
            n = t.target.closest(
              '[data-glean-id], [data-glean-type], [data-glean-label]'
            );
          n &&
            p({
              ...((r = n.dataset).gleanId && { id: r.gleanId }),
              ...(r.gleanType && { type: r.gleanType }),
              ...(r.gleanLabel && { label: r.gleanLabel }),
              url:
                'u' > typeof window
                  ? window.location.href
                  : 'URL_NOT_PROVIDED_OR_AVAILABLE',
              referrer:
                'u' > typeof document
                  ? document.referrer
                  : 'REFERRER_NOT_PROVIDED_OR_AVAILABLE',
              title:
                'u' > typeof document
                  ? document.title
                  : 'TITLE_NOT_PROVIDED_OR_AVAILABLE'
            });
        }),
        (u.recordElementClick = p));
      let g = s;
      n.d(r, {}, { A: g });
    },
    80849(t, r, n) {
      var s, a;
      function o(t, r, n = s.Debug) {
        let a = `(Glean.${t})`;
        Array.isArray(r) ? console[n](a, ...r) : console[n](a, r);
      }
      (((a = s || (s = {})).Debug = 'debug'),
        (a.Info = 'info'),
        (a.Warn = 'warn'),
        (a.Error = 'error'),
        (a.Trace = 'trace'),
        n.d(r, { A: () => o, q: () => s }));
    },
    82006(t, r, n) {
      var s = n(30994),
        a = n(36074),
        o = n(88729),
        l = n(25740);
      let RecordedEvent = class RecordedEvent extends o.JW {
        constructor(t) {
          super(t);
        }
        static withTransformedExtras(t, r) {
          let n = r(t.extra || {});
          return {
            category: t.category,
            name: t.name,
            timestamp: t.timestamp,
            extra: n && Object.keys(n).length > 0 ? n : void 0
          };
        }
        addExtra(t, r) {
          (this.inner.extra || (this.inner.extra = {}),
            (this.inner.extra[t] = r));
        }
        withoutReservedExtras() {
          return RecordedEvent.withTransformedExtras(this.get(), t =>
            Object.keys(t)
              .filter(t => !s.Tg.includes(t))
              .reduce((r, n) => ((r[n] = t[n]), r), {})
          );
        }
        validate(t) {
          if (!(0, a.Gv)(t))
            return {
              type: o.iF.Error,
              errorMessage: `Expected Glean event object, got ${typeof t}`
            };
          let r = 'category' in t && (0, a.Kg)(t.category),
            n = 'name' in t && (0, a.Kg)(t.name);
          if (!r || !n)
            return {
              type: o.iF.Error,
              errorMessage: `Unexpected value for "category" or "name" in event object: ${JSON.stringify(t)}`
            };
          if (!('timestamp' in t && (0, a.Fq)(t.timestamp) && t.timestamp >= 0))
            return {
              type: o.iF.Error,
              errorMessage: `Event timestamp must be a positive integer, got ${JSON.stringify(t)}`
            };
          if (t.extra) {
            if (!(0, a.Gv)(t.extra))
              return {
                type: o.iF.Error,
                errorMessage: `Expected Glean extras object, got ${typeof t}`
              };
            for (let [r, n] of Object.entries(t.extra)) {
              let t = (0, l.oI)(r);
              if (t.type === o.iF.Error) return t;
              if (!(0, a.Kg)(n) && !(0, a.Et)(n) && !(0, a.Lm)(n))
                return {
                  type: o.iF.Error,
                  errorMessage: `Unexpected value for extra key ${r}: ${JSON.stringify(n)}`
                };
            }
          }
          return { type: o.iF.Success };
        }
        payload() {
          return RecordedEvent.withTransformedExtras(
            this.withoutReservedExtras(),
            t =>
              Object.keys(t).reduce((r, n) => ((r[n] = t[n].toString()), r), {})
          );
        }
      };
      n.d(r, { j: () => RecordedEvent });
    },
    62209(t, r, n) {
      var s = n(27604),
        a = n(36074),
        o = n(84592);
      let MetricType = class MetricType {
        constructor(t, r, n) {
          (n && s.o.addSupportedMetric(t, n),
            (this.type = t),
            (this.name = r.name),
            (this.category = r.category),
            (this.sendInPings = r.sendInPings),
            (this.lifetime = r.lifetime),
            (this.disabled = r.disabled),
            (this.dynamicLabel = r.dynamicLabel));
        }
        baseIdentifier() {
          return this.category.length > 0
            ? `${this.category}.${this.name}`
            : this.name;
        }
        identifier() {
          let t = this.baseIdentifier();
          return (0, a.b0)(this.dynamicLabel) ? t : (0, o.cW)(this);
        }
        shouldRecord(t) {
          return t && !this.disabled;
        }
        testGetNumRecordedErrors(t, r = this.sendInPings[0]) {
          return (0, a.xU)('testGetNumRecordedErrors')
            ? s.o.errorManager.testGetNumRecordedErrors(this, t, r)
            : 0;
        }
      };
      n.d(r, { v: () => MetricType });
    },
    88729(t, r, n) {
      var s,
        a,
        o = n(27604),
        l = n(40351);
      (((s = a || (a = {}))[(s.Success = 0)] = 'Success'),
        (s[(s.Error = 1)] = 'Error'));
      let MetricValidationError = class MetricValidationError extends Error {
        constructor(t, r = l.B.InvalidType) {
          (super(t), (this.type = r), (this.name = 'MetricValidationError'));
        }
        recordError(t) {
          o.o.errorManager.record(t, this.type, this.message);
        }
      };
      let Metric = class Metric {
        constructor(t) {
          this.inner = this.validateOrThrow(t);
        }
        get() {
          return this.inner;
        }
        set(t) {
          this.inner = t;
        }
        validateOrThrow(t) {
          let r = this.validate(t);
          if (r.type === a.Error)
            throw new MetricValidationError(r.errorMessage, r.errorType);
          return t;
        }
      };
      n.d(r, {
        JW: () => Metric,
        c1: () => MetricValidationError,
        iF: () => a
      });
    },
    67867(t, r, n) {
      var s,
        a = n(82006),
        o = n(62209),
        l = n(36074),
        c = n(27604),
        d = n(40351),
        u = n(88729),
        h = function (t, r, n, s, a) {
          if ('m' === s) throw TypeError('Private method is not writable');
          if ('a' === s && !a)
            throw TypeError('Private accessor was defined without a setter');
          if ('function' == typeof r ? t !== r || !a : !r.has(t))
            throw TypeError(
              'Cannot write private member to an object whose class did not declare it'
            );
          return (
            'a' === s ? a.call(t, n) : a ? (a.value = n) : r.set(t, n),
            n
          );
        },
        p = function (t, r, n, s) {
          if ('a' === n && !s)
            throw TypeError('Private accessor was defined without a getter');
          if ('function' == typeof r ? t !== r || !s : !r.has(t))
            throw TypeError(
              'Cannot read private member from an object whose class did not declare it'
            );
          return 'm' === n ? s : 'a' === n ? s.call(t) : s ? s.value : r.get(t);
        };
      let InternalEventMetricType = class InternalEventMetricType extends o.v {
        constructor(t, r) {
          (super('event', t), (this.allowedExtraKeys = r));
        }
        record(t, r = (0, l.bQ)()) {
          if (!this.shouldRecord(c.o.uploadEnabled)) return;
          let n = Date.now();
          try {
            let s = new a.j({
                category: this.category,
                name: this.name,
                timestamp: r,
                extra: t
              }),
              o = {};
            if (t && this.allowedExtraKeys)
              for (let [r, n] of Object.entries(t))
                if (this.allowedExtraKeys.includes(r))
                  (0, l.Kg)(n) ? (o[r] = (0, l.Wl)(this, n, 500)) : (o[r] = n);
                else {
                  c.o.errorManager.record(
                    this,
                    d.B.InvalidValue,
                    `Invalid key index: ${r}`
                  );
                  continue;
                }
            ((o.glean_timestamp = n.toString()),
              s.set({ ...s.get(), extra: o }),
              c.o.eventsDatabase.record(this, s));
          } catch (t) {
            t instanceof u.c1 && t.recordError(this);
          }
        }
        testGetValue(t = this.sendInPings[0]) {
          if ((0, l.xU)('testGetValue', 'core.metrics.EventMetricType')) {
            let r = c.o.eventsDatabase.getEvents(t, this);
            return (
              r &&
                r.forEach(t => {
                  t.extra &&
                    (delete t.extra.glean_timestamp,
                    0 == Object.keys(t.extra).length && (t.extra = void 0));
                }),
              r
            );
          }
        }
      };
      let EventMetricType = class EventMetricType {
        constructor(t, r) {
          (s.set(this, void 0),
            h(this, s, new InternalEventMetricType(t, r), 'f'));
        }
        record(t) {
          p(this, s, 'f').record(t);
        }
        testGetValue(t = p(this, s, 'f').sendInPings[0]) {
          return p(this, s, 'f').testGetValue(t);
        }
        testGetNumRecordedErrors(t, r = p(this, s, 'f').sendInPings[0]) {
          return p(this, s, 'f').testGetNumRecordedErrors(t, r);
        }
      };
      ((s = new WeakMap()),
        n.d(r, { A: () => EventMetricType, C: () => InternalEventMetricType }));
    },
    84592(t, r, n) {
      var s = n(88729),
        a = n(27604),
        o = n(40351);
      let LabeledMetric = class LabeledMetric extends s.JW {
        constructor(t) {
          super(t);
        }
        validate(t) {
          return { type: s.iF.Success };
        }
        payload() {
          return this.inner;
        }
      };
      let l = /^[a-z_][a-z0-9_-]{0,29}(\.[a-z_][a-z0-9_-]{0,29})*$/;
      function c(t, r) {
        return `${t}/${r}`;
      }
      function d(t) {
        return t.split('/')[0];
      }
      function u(t) {
        if (void 0 === t.dynamicLabel)
          throw Error('This point should never be reached.');
        let r = c(t.baseIdentifier(), t.dynamicLabel);
        for (let n of t.sendInPings)
          if (a.o.metricsDatabase.hasMetric(t.lifetime, n, t.type, r)) return r;
        let n = 0;
        for (let r of t.sendInPings)
          n += a.o.metricsDatabase.countByBaseIdentifier(
            t.lifetime,
            r,
            t.type,
            t.baseIdentifier()
          );
        let s = !1;
        return (
          n >= 16
            ? (s = !0)
            : t.dynamicLabel.length > 61
              ? ((s = !0),
                a.o.errorManager.record(
                  t,
                  o.B.InvalidLabel,
                  `Label length ${t.dynamicLabel.length} exceeds maximum of 61.`
                ))
              : l.test(t.dynamicLabel) ||
                ((s = !0),
                a.o.errorManager.record(
                  t,
                  o.B.InvalidLabel,
                  `Label must be snake_case, got '${t.dynamicLabel}'.`
                )),
          s ? c(t.baseIdentifier(), '__other__') : r
        );
      }
      n.d(r, {
        Uh: () => c,
        X3: () => d,
        cW: () => u,
        ot: () => LabeledMetric
      });
    },
    87484(t, r, n) {
      var s,
        a = n(62209),
        o = n(36074),
        l = n(27604),
        c = n(88729),
        d = n(40351),
        u = n(25740),
        h = function (t, r, n, s, a) {
          if ('m' === s) throw TypeError('Private method is not writable');
          if ('a' === s && !a)
            throw TypeError('Private accessor was defined without a setter');
          if ('function' == typeof r ? t !== r || !a : !r.has(t))
            throw TypeError(
              'Cannot write private member to an object whose class did not declare it'
            );
          return (
            'a' === s ? a.call(t, n) : a ? (a.value = n) : r.set(t, n),
            n
          );
        },
        p = function (t, r, n, s) {
          if ('a' === n && !s)
            throw TypeError('Private accessor was defined without a getter');
          if ('function' == typeof r ? t !== r || !s : !r.has(t))
            throw TypeError(
              'Cannot read private member from an object whose class did not declare it'
            );
          return 'm' === n ? s : 'a' === n ? s.call(t) : s ? s.value : r.get(t);
        };
      let g = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      let UUIDMetric = class UUIDMetric extends c.JW {
        constructor(t) {
          super(t);
        }
        validate(t) {
          let r = (0, u.oI)(t);
          return r.type === c.iF.Error
            ? r
            : g.test(t)
              ? { type: c.iF.Success }
              : {
                  type: c.iF.Error,
                  errorMessage: `"${t}" is not a valid UUID`,
                  errorType: d.B.InvalidValue
                };
        }
        payload() {
          return this.inner;
        }
      };
      let InternalUUIDMetricType = class InternalUUIDMetricType extends a.v {
        constructor(t) {
          super('uuid', t, UUIDMetric);
        }
        set(t) {
          let r;
          if (this.shouldRecord(l.o.uploadEnabled)) {
            t || (t = (0, o.Z3)());
            try {
              ((r = new UUIDMetric(t)), l.o.metricsDatabase.record(this, r));
            } catch (t) {
              t instanceof c.c1 && t.recordError(this);
            }
          }
        }
        generateAndSet() {
          if (!this.shouldRecord(l.o.uploadEnabled)) return;
          let t = (0, o.Z3)();
          return (this.set(t), t);
        }
        testGetValue(t = this.sendInPings[0]) {
          if ((0, o.xU)('testGetValue', 'core.metrics.UUIDMetricType'))
            return l.o.metricsDatabase.getMetric(t, this);
        }
      };
      let f = class {
        constructor(t) {
          (s.set(this, void 0), h(this, s, new InternalUUIDMetricType(t), 'f'));
        }
        set(t) {
          p(this, s, 'f').set(t);
        }
        generateAndSet() {
          return p(this, s, 'f').generateAndSet();
        }
        testGetValue(t = p(this, s, 'f').sendInPings[0]) {
          return p(this, s, 'f').testGetValue(t);
        }
        testGetNumRecordedErrors(t, r = p(this, s, 'f').sendInPings[0]) {
          return p(this, s, 'f').testGetNumRecordedErrors(t, r);
        }
      };
      ((s = new WeakMap()),
        n.d(r, { Pc: () => InternalUUIDMetricType }, { Ay: f }));
    },
    25740(t, r, n) {
      var s = n(88729),
        a = n(36074),
        o = n(84592),
        l = n(27604),
        c = n(40351),
        d = n(80849);
      function u(t, r) {
        t.startsWith('labeled_') && l.o.addSupportedMetric(t, o.ot);
        let n = l.o.getSupportedMetric(t);
        if (!n) throw Error(`Unable to create metric of unknown type "${t}".`);
        return new n(r);
      }
      function h(t, r) {
        try {
          return (u(t, r), !0);
        } catch (t) {
          return (
            (0, d.A)('Glean.core.Metrics.utils', t.message, d.q.Error),
            !1
          );
        }
      }
      function p(t, r = !0) {
        return (0, a.Fq)(t)
          ? (r ? t < 0 : t <= 0)
            ? {
                type: s.iF.Error,
                errorMessage: `Expected positive value, got ${JSON.stringify(t)}`,
                errorType: c.B.InvalidValue
              }
            : { type: s.iF.Success }
          : {
              type: s.iF.Error,
              errorMessage: `Expected integer value, got ${JSON.stringify(t)}`
            };
      }
      function g(t) {
        return (0, a.Kg)(t)
          ? { type: s.iF.Success }
          : {
              type: s.iF.Error,
              errorMessage: `Expected string value, got ${JSON.stringify(t)}`
            };
      }
      n.d(r, { Hp: () => u, LE: () => h, oI: () => g, wQ: () => p });
    },
    36074(t, r, n) {
      let s;
      n.d(r, {
        PK: () => $,
        Z3: () => T,
        bQ: () => x,
        Lm: () => b,
        Fq: () => w,
        EJ: () =>
          function t(r) {
            if (m(r) || b(r) || v(r)) return !0;
            if (g(r)) {
              if (0 === Object.keys(r).length) return !0;
              for (let n in r) return t(r[n]);
            }
            return !!Array.isArray(r) && r.every(r => t(r));
          },
        Et: () => v,
        Gv: () => g,
        Kg: () => m,
        b0: () => f,
        IB: () => C,
        zn: () => _,
        cE: () => D,
        xU: () => M,
        Wl: () => P,
        IY: () => A,
        qU: () => E
      });
      let a =
          'u' > typeof crypto &&
          crypto.randomUUID &&
          crypto.randomUUID.bind(crypto),
        o = new Uint8Array(16),
        l = [];
      for (let t = 0; t < 256; ++t) l.push((t + 256).toString(16).slice(1));
      let c = function (t, r, n) {
        if (a && !r && !t) return a();
        let c =
          (t = t || {}).random ||
          (
            t.rng ||
            function () {
              if (
                !s &&
                !(s =
                  'u' > typeof crypto &&
                  crypto.getRandomValues &&
                  crypto.getRandomValues.bind(crypto))
              )
                throw Error(
                  'crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported'
                );
              return s(o);
            }
          )();
        if (((c[6] = (15 & c[6]) | 64), (c[8] = (63 & c[8]) | 128), r)) {
          n = n || 0;
          for (let t = 0; t < 16; ++t) r[n + t] = c[t];
          return r;
        }
        return (function (t, r = 0) {
          return (
            l[t[r + 0]] +
            l[t[r + 1]] +
            l[t[r + 2]] +
            l[t[r + 3]] +
            '-' +
            l[t[r + 4]] +
            l[t[r + 5]] +
            '-' +
            l[t[r + 6]] +
            l[t[r + 7]] +
            '-' +
            l[t[r + 8]] +
            l[t[r + 9]] +
            '-' +
            l[t[r + 10]] +
            l[t[r + 11]] +
            l[t[r + 12]] +
            l[t[r + 13]] +
            l[t[r + 14]] +
            l[t[r + 15]]
          );
        })(c);
      };
      var d = n(27604),
        u = n(40351),
        h = n(80849),
        p = n(88729);
      function g(t) {
        return 'object' == typeof t && null !== t && t.constructor === Object;
      }
      function f(t) {
        return void 0 === t;
      }
      function m(t) {
        return 'string' == typeof t;
      }
      function b(t) {
        return 'boolean' == typeof t;
      }
      function v(t) {
        return 'number' == typeof t && !isNaN(t);
      }
      function w(t) {
        return v(t) && Number.isInteger(t);
      }
      function $(t) {
        return (
          'true' === t.toLowerCase() || ('false' !== t.toLowerCase() && void 0)
        );
      }
      function _(t) {
        return t.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
      }
      function E(t) {
        return /^(http|https):\/\/[a-zA-Z0-9._-]+(:\d+){0,1}(\/{0,1})$/i.test(
          t
        );
      }
      function A(t) {
        return /^[a-z0-9-]{1,20}$/i.test(t);
      }
      function T() {
        return 'u' > typeof crypto
          ? c()
          : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
              /[xy]/g,
              function (t) {
                let r = (16 * Math.random()) | 0;
                return ('x' == t ? r : (3 & r) | 8).toString(16);
              }
            );
      }
      function x() {
        return Math.round(
          'u' < typeof performance ? Date.now() : performance.now()
        );
      }
      function P(t, r, n) {
        if (!m(r)) throw new p.c1(`Expected string, got ${JSON.stringify(r)}`);
        let s = new TextEncoder(),
          a = new TextDecoder('utf-8'),
          o = s.encode(r).slice(0, n),
          l = a.decode(o);
        return (
          l !== r &&
            d.o.errorManager.record(
              t,
              u.B.InvalidOverflow,
              `Value length ${new Blob([r]).size} exceeds maximum of ${r.length} bytes.`
            ),
          l
        );
      }
      function M(t, r = 'core.utils') {
        return (
          !!d.o.testing ||
          ((0, h.A)(
            r,
            [
              `Attempted to access test only method \`${t || 'unknown'}\`,`,
              'but Glean is not in testing mode. Ignoring. Make sure to put Glean in testing mode',
              'before accessing such methods, by calling `testResetGlean`.'
            ],
            h.q.Error
          ),
          !1)
        );
      }
      function D(...t) {
        let r = t.reduce((t, r) => t + r, 0);
        return (
          r > Number.MAX_SAFE_INTEGER && (r = Number.MAX_SAFE_INTEGER),
          r
        );
      }
      function C() {
        return 'u' < typeof window;
      }
    },
    70955(t, r, n) {
      let s;
      n.d(r, { A: () => eb });
      var a,
        o,
        l,
        c,
        d,
        u,
        h,
        p,
        g,
        f,
        m,
        b = n(80849);
      (((a = u || (u = {}))[(a.RecoverableFailure = 0)] = 'RecoverableFailure'),
        (a[(a.UnrecoverableFailure = 1)] = 'UnrecoverableFailure'),
        (a[(a.Success = 2)] = 'Success'));
      let UploadResult = class UploadResult {
        constructor(t, r) {
          ((this.result = t), (this.status = r));
        }
      };
      let Uploader = class Uploader {};
      let v = Uploader,
        w = 'platform.browser.FetchUploader';
      let BrowserFetchUploader = class BrowserFetchUploader extends v {
        constructor() {
          (super(...arguments), (this.timeoutMs = 1e4));
        }
        async post(t, r, n = !0) {
          let s,
            a = new AbortController(),
            o = setTimeout(() => a.abort(), this.timeoutMs),
            l = r.asCompressedPayload();
          try {
            s = await fetch(t.toString(), {
              headers: l.headers,
              method: 'POST',
              body: l.payload,
              keepalive: n,
              credentials: 'omit',
              signal: a.signal,
              redirect: 'error'
            });
          } catch (r) {
            if (r instanceof DOMException)
              (0, b.A)(
                w,
                ['Timeout while attempting to upload ping.\n', r],
                b.q.Error
              );
            else if (r instanceof TypeError) {
              if (n) return this.post(t, l, !1);
              (0, b.A)(
                w,
                ['Network error while attempting to upload ping.\n', r],
                b.q.Error
              );
            } else
              (0, b.A)(
                w,
                ['Unknown error while attempting to upload ping.\n', r],
                b.q.Error
              );
            return (clearTimeout(o), new UploadResult(0));
          }
          return (clearTimeout(o), new UploadResult(2, s.status));
        }
        supportsCustomHeaders() {
          return !0;
        }
      };
      let $ = new BrowserFetchUploader();
      let BrowserSendBeaconUploader = class BrowserSendBeaconUploader extends v {
        constructor() {
          (super(...arguments), (this.timeoutMs = 1e4));
        }
        async post(t, r, n = !0) {
          return navigator.sendBeacon(t, r.payload)
            ? new UploadResult(2, 200)
            : (n &&
                (0, b.A)(
                  'platform.browser.SendBeaconUploader',
                  'The `sendBeacon` call was not serviced by the browser. Deleting data.',
                  b.q.Error
                ),
              new UploadResult(1));
        }
        supportsCustomHeaders() {
          return !1;
        }
      };
      let _ = new BrowserSendBeaconUploader();
      var E = n(27604);
      let A = 'platform.browser.SendBeaconFallbackUploader';
      let BrowserSendBeaconFallbackUploader = class BrowserSendBeaconFallbackUploader extends v {
        constructor() {
          (super(...arguments),
            (this.fetchUploader = $),
            (this.sendBeaconUploader = _));
        }
        async post(t, r) {
          var n, s;
          if (
            !(null == (n = E.o.config) ? void 0 : n.sourceTags) &&
            !(null == (s = E.o.config) ? void 0 : s.debugViewTag) &&
            navigator &&
            navigator.sendBeacon
          ) {
            let n = await this.sendBeaconUploader.post(t, r, !1);
            if (2 == n.result) return n;
            (0, b.A)(
              A,
              'The `sendBeacon` call was not serviced by the browser. Falling back to the `fetch` uploader.',
              b.q.Warn
            );
          } else
            (0, b.A)(
              A,
              '`sendBeacon` is not available. Falling back to the `fetch` uploader.',
              b.q.Warn
            );
          return this.fetchUploader.post(t, r);
        }
        supportsCustomHeaders() {
          return !1;
        }
      };
      let T = new BrowserSendBeaconFallbackUploader();
      var x = n(36074);
      let P = 'platform.web.Storage';
      let WebStore = class WebStore {
        constructor(t) {
          ((this.rootKey = t), (this.logTag = `${P}.${t}`));
        }
        get(t = []) {
          let r;
          if (!(0, x.IB)()) {
            try {
              let n = localStorage.getItem(this.rootKey) || '{}',
                s = JSON.parse(n);
              r =
                t.length > 0
                  ? (function (t, r) {
                      if (0 === r.length)
                        throw Error(
                          'The index must contain at least one property to get.'
                        );
                      let n = t;
                      for (let t of r)
                        if (!(0, x.Gv)(n) || !(t in n)) return;
                        else {
                          let r = n[t];
                          (0, x.EJ)(r) && (n = r);
                        }
                      return n;
                    })(s, t)
                  : 0 === Object.keys(s).length
                    ? void 0
                    : s;
            } catch (t) {
              (0, b.A)(
                P,
                ['Unable to fetch value from local storage.', t],
                b.q.Error
              );
            }
            return (
              this.shouldUpdateSession(t) &&
                E.o.coreMetrics.updateSessionInfo(),
              r
            );
          }
        }
        update(t, r) {
          if (!(0, x.IB)()) {
            try {
              let n = localStorage.getItem(this.rootKey) || '{}',
                s = JSON.parse(n),
                a = (function (t, r, n) {
                  if (0 === r.length)
                    throw Error(
                      'The index must contain at least one property to update.'
                    );
                  let s = { ...t },
                    a = s;
                  for (let t of r.slice(0, r.length - 1))
                    ((0, x.Gv)(a[t]) || (a[t] = {}), (a = a[t]));
                  let o = r[r.length - 1],
                    l = n(a[o]);
                  return ((a[o] = l), s);
                })(s, t, r);
              localStorage.setItem(this.rootKey, JSON.stringify(a));
            } catch (t) {
              (0, b.A)(
                P,
                ['Unable to update value from local storage.', t],
                b.q.Error
              );
            }
            this.shouldUpdateSession(t) && E.o.coreMetrics.updateSessionInfo();
          }
        }
        delete(t) {
          if (!(0, x.IB)()) {
            try {
              let r = localStorage.getItem(this.rootKey) || '{}',
                n = JSON.parse(r);
              if (0 === t.length) localStorage.removeItem(this.rootKey);
              else
                try {
                  let r = (function (t, r) {
                    if (0 === r.length) return {};
                    let n = { ...t },
                      s = n;
                    for (let t of r.slice(0, r.length - 1)) {
                      let n = s[t];
                      if ((0, x.Gv)(n)) s = n;
                      else
                        throw Error(
                          `Attempted to delete an entry from an inexistent index: ${JSON.stringify(r)}.`
                        );
                    }
                    let a = r[r.length - 1];
                    return (delete s[a], n);
                  })(n, t);
                  localStorage.setItem(this.rootKey, JSON.stringify(r));
                } catch (r) {
                  (0, b.A)(
                    this.logTag,
                    [
                      `Error attempting to delete key ${t.toString()} from storage. Ignoring.`,
                      r
                    ],
                    b.q.Warn
                  );
                }
            } catch (t) {
              (0, b.A)(
                P,
                ['Unable to delete value from storage.', t],
                b.q.Error
              );
            }
            this.shouldUpdateSession(t) && E.o.coreMetrics.updateSessionInfo();
          }
        }
        shouldUpdateSession(t) {
          return !t.includes('session_id') && !t.includes('session_count');
        }
      };
      var M = n(30994);
      let D = 'core.Config';
      let Configuration = class Configuration {
        constructor(t) {
          var r;
          if (
            ((this.channel = null == t ? void 0 : t.channel),
            (this.appBuild = null == t ? void 0 : t.appBuild),
            (this.appDisplayVersion = null == t ? void 0 : t.appDisplayVersion),
            (this.buildDate = null == t ? void 0 : t.buildDate),
            (this.maxEvents = (null == t ? void 0 : t.maxEvents) || 1),
            (this.enableAutoPageLoadEvents =
              null == t ? void 0 : t.enableAutoPageLoadEvents),
            (this.enableAutoElementClickEvents =
              null == t ? void 0 : t.enableAutoElementClickEvents),
            (this.experimentationId = null == t ? void 0 : t.experimentationId),
            (this.sessionLengthInMinutesOverride =
              null == t ? void 0 : t.sessionLengthInMinutesOverride),
            (this.debug = {}),
            (null == t ? void 0 : t.serverEndpoint) &&
              !(0, x.qU)(t.serverEndpoint))
          )
            throw Error(
              `Unable to initialize Glean, serverEndpoint ${t.serverEndpoint} is an invalid URL.`
            );
          if (
            !E.o.testing &&
            (null == (r = null == t ? void 0 : t.serverEndpoint)
              ? void 0
              : r.startsWith('http:'))
          )
            throw Error(
              `Unable to initialize Glean, serverEndpoint ${t.serverEndpoint} must use the HTTPS protocol.`
            );
          ((this.serverEndpoint =
            t && t.serverEndpoint ? t.serverEndpoint : M.Gh),
            (this.httpClient = null == t ? void 0 : t.httpClient));
        }
        get logPings() {
          return this.debug.logPings || !1;
        }
        set logPings(t) {
          this.debug.logPings = t;
        }
        get debugViewTag() {
          return this.debug.debugViewTag;
        }
        set debugViewTag(t) {
          (0, x.IY)(t || '')
            ? (this.debug.debugViewTag = t)
            : (0, b.A)(
                D,
                [
                  `"${t || ''}" is not a valid \`debugViewTag\` value.`,
                  'Please make sure the value passed satisfies the regex `^[a-zA-Z0-9-]{1,20}$`.'
                ],
                b.q.Error
              );
        }
        get sourceTags() {
          return this.debug.sourceTags;
        }
        set sourceTags(t) {
          if (!t || t.length < 1 || t.length > 5)
            return void (0, b.A)(
              D,
              'A list of tags cannot contain more than 5 elements or less than one.',
              b.q.Error
            );
          for (let r of t) {
            if (r.startsWith('glean'))
              return void (0, b.A)(
                D,
                'Tags starting with `glean` are reserved and must not be used.',
                b.q.Error
              );
            if (!(0, x.IY)(r)) return;
          }
          this.debug.sourceTags = t;
        }
      };
      var C = n(69861);
      let U = 'core.Pings.Database';
      let PingsDatabase = class PingsDatabase {
        constructor() {
          this.store = new E.o.platform.Storage('pings');
        }
        attachObserver(t) {
          this.observer = t;
        }
        recordPing(t, r, n, s) {
          let a = {
            collectionDate: new Date().toISOString(),
            path: t,
            payload: n
          };
          (s && (a.headers = s),
            this.store.update([r], () => a),
            this.observer && this.observer.update(r, a));
        }
        deletePing(t) {
          this.store.delete([t]);
        }
        getAllPings() {
          let t = this.store.get(),
            r = {};
          if ((0, x.Gv)(t))
            for (let n in t) {
              let s = t[n];
              !(function (t) {
                if ((0, x.Gv)(t)) {
                  let r =
                      'collectionDate' in t &&
                      (0, x.Kg)(t.collectionDate) &&
                      (0, x.Et)(new Date(t.collectionDate).getTime()),
                    n = 'path' in t && (0, x.Kg)(t.path),
                    s =
                      'payload' in t &&
                      (0, x.EJ)(t.payload) &&
                      (0, x.Gv)(t.payload),
                    a =
                      !('headers' in t) ||
                      ((0, x.EJ)(t.headers) && (0, x.Gv)(t.headers));
                  return !!r && !!n && !!s && !!a;
                }
                return !1;
              })(s)
                ? ((0, b.A)(
                    U,
                    `Unexpected data found in pings database: ${JSON.stringify(s, null, 2)}. Deleting.`,
                    b.q.Warn
                  ),
                  this.store.delete([n]))
                : (r[n] = s);
            }
          return Object.entries(r).sort(
            ([t, { collectionDate: r }], [n, { collectionDate: s }]) =>
              new Date(r).getTime() - new Date(s).getTime()
          );
        }
        scanPendingPings() {
          if (this.observer)
            for (let [t, r] of this.getAllPingsWithoutSurplus())
              this.observer.update(t, r);
        }
        clearAll() {
          this.store.delete([]);
        }
        getAllPingsWithoutSurplus(t = 250, r = 0xa00000) {
          let n = this.getAllPings(),
            s = n.filter(([t, r]) => !O(r)).reverse(),
            a = n.filter(([t, r]) => O(r)),
            o = s.length;
          o > t &&
            (0, b.A)(
              U,
              [
                `More than ${t} pending pings in the pings database,`,
                `will delete ${o - t} old pings.`
              ],
              b.q.Warn
            );
          let l = !1,
            c = 0,
            d = 0,
            u = [];
          for (let [n, a] of s) {
            var h;
            (c++,
              (d += ((h = a), (0, C._u)(JSON.stringify(h)).length)),
              !l &&
                d > r &&
                ((0, b.A)(
                  U,
                  [
                    `Pending pings database has reached the size quota of ${r} bytes,`,
                    'outstanding pings will be deleted.'
                  ],
                  b.q.Warn
                ),
                (l = !0)),
              c > t && (l = !0),
              l ? this.deletePing(n) : u.unshift([n, a]));
          }
          return [...a, ...u];
        }
      };
      function O(t) {
        return t.path.split('/')[3] === M.OM;
      }
      (((o = h || (h = {}))[(o.Incrementing = 0)] = 'Incrementing'),
        (o[(o.Throttled = 1)] = 'Throttled'));
      let RateLimiter = class RateLimiter {
        constructor(t = 6e4, r = 40, n = 0, s) {
          ((this.interval = t),
            (this.maxCount = r),
            (this.count = n),
            (this.started = s));
        }
        get elapsed() {
          if ((0, x.b0)(this.started)) return 0 / 0;
          let t = (0, x.bQ)() - this.started;
          return t < 0 ? 0 / 0 : t;
        }
        reset() {
          ((this.started = (0, x.bQ)()), (this.count = 0));
        }
        shouldReset() {
          return !!(
            (0, x.b0)(this.started) ||
            isNaN(this.elapsed) ||
            this.elapsed > this.interval
          );
        }
        getState() {
          this.shouldReset() && this.reset();
          let t = this.interval - this.elapsed;
          return this.count >= this.maxCount
            ? { state: 1, remainingTime: t }
            : (this.count++, { state: 0 });
        }
      };
      let Policy = class Policy {
        constructor(t = 3, r = 3, n = 1048576) {
          ((this.maxWaitAttempts = t),
            (this.maxRecoverableFailures = r),
            (this.maxPingBodySize = n));
        }
      };
      let PingBodyOverflowError = class PingBodyOverflowError extends Error {
        constructor(t) {
          (super(t), (this.name = 'PingBodyOverflow'));
        }
      };
      let PingRequest = class PingRequest {
        constructor(t, r, n, s) {
          ((this.identifier = t),
            (this.headers = r),
            (this.payload = n),
            (this.maxBodySize = s));
        }
        asCompressedPayload() {
          let t;
          if ('gzip' == this.headers['Content-Encoding']) return this;
          let r = (0, C._u)(this.payload),
            n = this.headers;
          try {
            ((t = (0, C.u3)(r)),
              (n['Content-Encoding'] = 'gzip'),
              (n['Content-Length'] = t.length.toString()));
          } catch (t) {
            return this;
          }
          if (t.length > this.maxBodySize)
            throw new PingBodyOverflowError(
              `Body for ping ${this.identifier} exceeds ${this.maxBodySize} bytes. Discarding.`
            );
          return new PingRequest(this.identifier, n, t, this.maxBodySize);
        }
      };
      let N = 'core.Upload.PingUploadWorker';
      let PingUploadWorker = class PingUploadWorker {
        constructor(t, r, n = new Policy()) {
          ((this.uploader = t),
            (this.serverEndpoint = r),
            (this.policy = n),
            (this.isBlocking = !1));
        }
        buildPingRequest(t) {
          let r = t.headers || {};
          r = {
            ...t.headers,
            'Content-Type': 'application/json; charset=utf-8',
            Date: new Date().toISOString(),
            'X-Telemetry-Agent': `Glean/5.0.8 (JS on ${E.o.platform.info.os()})`
          };
          let n = JSON.stringify(t.payload);
          if (n.length > this.policy.maxPingBodySize)
            throw new PingBodyOverflowError(
              `Body for ping ${t.identifier} exceeds ${this.policy.maxPingBodySize}bytes. Discarding.`
            );
          return (
            (r['Content-Length'] = n.length.toString()),
            new PingRequest(t.identifier, r, n, this.policy.maxPingBodySize)
          );
        }
        async attemptPingUpload(t) {
          try {
            let r = this.buildPingRequest(t);
            return this.uploader.post(`${this.serverEndpoint}${t.path}`, r);
          } catch (t) {
            return (
              (0, b.A)(
                N,
                ['Error trying to build or post ping request:', t],
                b.q.Warn
              ),
              new UploadResult(1)
            );
          }
        }
        work(t, r) {
          for (;;)
            try {
              let n = t();
              switch (n.type) {
                case 'upload':
                  if (this.isBlocking) return;
                  this.attemptPingUpload(n.ping)
                    .then(t => {
                      r(n.ping, t);
                    })
                    .catch(t => {
                      console.log(t);
                    });
                  continue;
                case 'done':
                  return;
              }
            } catch (t) {
              (0, b.A)(
                N,
                [
                  'IMPOSSIBLE: Something went wrong while processing ping upload tasks.',
                  t
                ],
                b.q.Error
              );
            }
        }
        blockUploading() {
          this.isBlocking = !0;
        }
        resumeUploading() {
          this.isBlocking = !1;
        }
      };
      (((l = p || (p = {})).Done = 'done'),
        (l.Wait = 'wait'),
        (l.Upload = 'upload'));
      let q = () => ({ type: 'done' }),
        B = 'core.Upload.PingUploadManager';
      let PingUploadManager = class PingUploadManager {
        constructor(t, r, n = new Policy(), s = new RateLimiter()) {
          ((this.pingsDatabase = r),
            (this.policy = n),
            (this.rateLimiter = s),
            (this.recoverableFailureCount = 0),
            (this.waitAttemptCount = 0),
            (this.queue = []),
            (this.processing = new Set()),
            (this.worker = new PingUploadWorker(
              t.httpClient ? t.httpClient : E.o.platform.uploader,
              t.serverEndpoint,
              n
            )),
            r.attachObserver(this));
        }
        getUploadTask() {
          let t = this.getUploadTaskInternal();
          return (
            'wait' !== t.type &&
              this.waitAttemptCount > 0 &&
              (this.waitAttemptCount = 0),
            'upload' !== t.type &&
              this.recoverableFailureCount > 0 &&
              (this.recoverableFailureCount = 0),
            t
          );
        }
        processPingUploadResponse(t, r) {
          let { identifier: n } = t;
          this.processing.has(n) && this.processing.delete(n);
          let { status: s, result: a } = r;
          if (s && s >= 200 && s < 300) {
            ((0, b.A)(B, `Ping ${n} successfully sent ${s}.`, b.q.Info),
              this.pingsDatabase.deletePing(n));
            return;
          }
          if (1 === a || (s && s >= 400 && s < 500)) {
            ((0, b.A)(
              B,
              `Unrecoverable upload failure while attempting to send ping ${n}. Error was: ${null != s ? s : 'no status'}.`,
              b.q.Warn
            ),
              this.pingsDatabase.deletePing(n));
            return;
          }
          ((0, b.A)(
            B,
            [
              `Recoverable upload failure while attempting to send ping ${n}, will retry.`,
              `Error was: ${null != s ? s : 'no status'}.`
            ],
            b.q.Warn
          ),
            this.recoverableFailureCount++,
            this.enqueuePing(t));
        }
        clearPendingPingsQueue() {
          this.queue = this.queue.filter(t => O(t));
        }
        blockUploads() {
          this.worker.blockUploading();
        }
        resumeUploads() {
          this.worker.resumeUploading();
        }
        update(t, r) {
          (this.enqueuePing({ identifier: t, ...r }),
            this.worker.isBlocking ||
              (this.processing.delete(t), this.pingsDatabase.deletePing(t)),
            this.worker.work(
              () => this.getUploadTask(),
              (t, r) => this.processPingUploadResponse(t, r)
            ));
        }
        enqueuePing(t) {
          if (!this.processing.has(t.identifier)) {
            for (let r of this.queue) if (r.identifier === t.identifier) return;
            this.queue.push(t);
          }
        }
        getUploadTaskInternal() {
          if (
            this.recoverableFailureCount >= this.policy.maxRecoverableFailures
          )
            return (
              (0, b.A)(
                B,
                'Glean has reached maximum recoverable upload failures for the current uploading window.',
                b.q.Debug
              ),
              q()
            );
          if (this.queue.length > 0) {
            let { state: t, remainingTime: r } = this.rateLimiter.getState();
            if (1 === t)
              return ((0, b.A)(
                B,
                [
                  'Glean is currently throttled.',
                  `Pending pings may be uploaded in ${(r || 0) / 1e3}s.`
                ],
                b.q.Debug
              ),
              this.waitAttemptCount++,
              this.waitAttemptCount > this.policy.maxWaitAttempts)
                ? q()
                : { type: 'wait', remainingTime: r || 0 };
            let n = this.queue.shift();
            return (
              this.processing.add(n.identifier),
              { type: 'upload', ping: n }
            );
          }
          return q();
        }
      };
      var V = n(87484),
        G = n(62209);
      (((c = g || (g = {})).Nanosecond = 'nanosecond'),
        (c.Microsecond = 'microsecond'),
        (c.Millisecond = 'millisecond'),
        (c.Second = 'second'),
        (c.Minute = 'minute'),
        (c.Hour = 'hour'),
        (c.Day = 'day'));
      let W = g;
      var F = n(88729);
      let DatetimeMetric = class DatetimeMetric extends F.JW {
        constructor(t) {
          super(t);
        }
        static fromDate(t, r) {
          if (!(t instanceof Date))
            throw new F.c1(`Expected Date object, got ${JSON.stringify(t)}`);
          return new DatetimeMetric({
            timeUnit: r,
            timezone: t.getTimezoneOffset(),
            date: t.toISOString()
          });
        }
        get date() {
          return new Date(this.inner.date);
        }
        get timezone() {
          return this.inner.timezone;
        }
        get timeUnit() {
          return this.inner.timeUnit;
        }
        get dateISOString() {
          return this.inner.date;
        }
        validate(t) {
          if (!(0, x.Gv)(t) || 3 !== Object.keys(t).length)
            return {
              type: F.iF.Error,
              errorMessage: `Expected Glean datetime metric object, got ${JSON.stringify(t)}`
            };
          let r =
              'timeUnit' in t &&
              (0, x.Kg)(t.timeUnit) &&
              Object.values(W).includes(t.timeUnit),
            n = 'timezone' in t && (0, x.Et)(t.timezone),
            s =
              'date' in t &&
              (0, x.Kg)(t.date) &&
              24 === t.date.length &&
              !isNaN(Date.parse(t.date));
          return r && n && s
            ? { type: F.iF.Success }
            : {
                type: F.iF.Error,
                errorMessage: `Invalid property on datetime metric, got ${JSON.stringify(t)}`
              };
        }
        payload() {
          let t,
            r,
            n = this.dateISOString.match(/\d+/g);
          if (!n || n.length < 0)
            throw Error(
              'IMPOSSIBLE: Unable to extract date information from DatetimeMetric.'
            );
          let s = new Date(
              parseInt(n[0]),
              parseInt(n[1]) - 1,
              parseInt(n[2]),
              parseInt(n[3]) - this.timezone / 60,
              parseInt(n[4]),
              parseInt(n[5]),
              parseInt(n[6])
            ),
            a =
              ((r = Math.abs((t = -((this.timezone / 60) * 1)))
                .toString()
                .padStart(2, '0')),
              `${t > 0 ? '+' : '-'}${r}:00`),
            o = s.getFullYear().toString().padStart(2, '0'),
            l = (s.getMonth() + 1).toString().padStart(2, '0'),
            c = s.getDate().toString().padStart(2, '0');
          if (this.timeUnit === W.Day) return `${o}-${l}-${c}${a}`;
          let d = s.getHours().toString().padStart(2, '0');
          if (this.timeUnit === W.Hour) return `${o}-${l}-${c}T${d}${a}`;
          let u = s.getMinutes().toString().padStart(2, '0');
          if (this.timeUnit === W.Minute) return `${o}-${l}-${c}T${d}:${u}${a}`;
          let h = s.getSeconds().toString().padStart(2, '0');
          if (this.timeUnit === W.Second)
            return `${o}-${l}-${c}T${d}:${u}:${h}${a}`;
          let p = s.getMilliseconds().toString().padStart(3, '0');
          return this.timeUnit === W.Millisecond
            ? `${o}-${l}-${c}T${d}:${u}:${h}.${p}${a}`
            : this.timeUnit === W.Microsecond
              ? `${o}-${l}-${c}T${d}:${u}:${h}.${p}000${a}`
              : `${o}-${l}-${c}T${d}:${u}:${h}.${p}000000${a}`;
        }
      };
      let InternalDatetimeMetricType = class InternalDatetimeMetricType
        extends G.v
      {
        constructor(t, r) {
          (super('datetime', t, DatetimeMetric), (this.timeUnit = r));
        }
        set(t) {
          if (!this.shouldRecord(E.o.uploadEnabled)) return;
          let r = this.truncateDate(t);
          try {
            let t = DatetimeMetric.fromDate(r, this.timeUnit);
            E.o.metricsDatabase.record(this, t);
          } catch (t) {
            t instanceof F.c1 && t.recordError(this);
          }
        }
        truncateDate(t) {
          t || (t = new Date());
          let r = t;
          switch (this.timeUnit) {
            case W.Day:
              (r.setMilliseconds(0),
                r.setSeconds(0),
                r.setMinutes(0),
                r.setMilliseconds(0));
            case W.Hour:
              (r.setMilliseconds(0), r.setSeconds(0), r.setMinutes(0));
            case W.Minute:
              (r.setMilliseconds(0), r.setSeconds(0));
            case W.Second:
              r.setMilliseconds(0);
          }
          return r;
        }
        testGetValueAsDatetimeMetric(t, r) {
          if ((0, x.xU)(r, 'core.metrics.DatetimeMetricType')) {
            let r = E.o.metricsDatabase.getMetric(t, this);
            if (r) return new DatetimeMetric(r);
          }
        }
        testGetValueAsString(t = this.sendInPings[0]) {
          let r = this.testGetValueAsDatetimeMetric(t, 'testGetValueAsString');
          return r ? r.payload() : void 0;
        }
        testGetValue(t = this.sendInPings[0]) {
          let r = this.testGetValueAsDatetimeMetric(t, 'testGetValue');
          return r ? r.date : void 0;
        }
      };
      new WeakMap();
      var j = n(25740);
      let StringMetric = class StringMetric extends F.JW {
        constructor(t) {
          super(t);
        }
        validate(t) {
          return (0, j.oI)(t);
        }
        payload() {
          return this.inner;
        }
      };
      let InternalStringMetricType = class InternalStringMetricType
        extends G.v
      {
        constructor(t) {
          super('string', t, StringMetric);
        }
        set(t) {
          if (this.shouldRecord(E.o.uploadEnabled))
            try {
              let r = (0, x.Wl)(this, t, 100),
                n = new StringMetric(r);
              E.o.metricsDatabase.record(this, n);
            } catch (t) {
              t instanceof F.c1 && t.recordError(this);
            }
        }
        testGetValue(t = this.sendInPings[0]) {
          if ((0, x.xU)('testGetValue', 'core.metrics.StringMetricType'))
            return E.o.metricsDatabase.getMetric(t, this);
        }
      };
      new WeakMap();
      let J = 'core.metrics.CounterMetricType';
      let CounterMetric = class CounterMetric extends F.JW {
        constructor(t) {
          super(t);
        }
        validate(t) {
          return (0, j.wQ)(t, !1);
        }
        payload() {
          return this.inner;
        }
        saturatingAdd(t) {
          let r = this.validateOrThrow(t);
          this.inner = (0, x.cE)(this.inner, r);
        }
      };
      let InternalCounterMetricType = class InternalCounterMetricType
        extends G.v
      {
        constructor(t) {
          super('counter', t, CounterMetric);
        }
        add(t) {
          if (this.shouldRecord(E.o.uploadEnabled)) {
            (0, x.b0)(t) && (t = 1);
            try {
              E.o.metricsDatabase.transform(this, this.transformFn(t));
            } catch (t) {
              t instanceof F.c1 && t.recordError(this);
            }
          }
        }
        transformFn(t) {
          return r => {
            let n = new CounterMetric(t);
            if (r)
              try {
                n.saturatingAdd(r);
              } catch (t) {
                (0, b.A)(
                  J,
                  `Unexpected value found in storage for metric ${this.name}: ${JSON.stringify(r)}. Overwriting.`
                );
              }
            return n;
          };
        }
        testGetValue(t = this.sendInPings[0]) {
          if ((0, x.xU)('testGetValue', J))
            return E.o.metricsDatabase.getMetric(t, this);
        }
      };
      new WeakMap();
      let CoreMetrics = class CoreMetrics {
        constructor() {
          ((this.clientId = new V.Pc({
            name: 'client_id',
            category: '',
            sendInPings: ['glean_client_info'],
            lifetime: 'user',
            disabled: !1
          })),
            (this.firstRunDate = new InternalDatetimeMetricType(
              {
                name: 'first_run_date',
                category: '',
                sendInPings: ['glean_client_info'],
                lifetime: 'user',
                disabled: !1
              },
              W.Day
            )),
            (this.os = new InternalStringMetricType({
              name: 'os',
              category: '',
              sendInPings: ['glean_client_info'],
              lifetime: 'application',
              disabled: !1
            })),
            (this.osVersion = new InternalStringMetricType({
              name: 'os_version',
              category: '',
              sendInPings: ['glean_client_info'],
              lifetime: 'application',
              disabled: !1
            })),
            (this.architecture = new InternalStringMetricType({
              name: 'architecture',
              category: '',
              sendInPings: ['glean_client_info'],
              lifetime: 'application',
              disabled: !1
            })),
            (this.locale = new InternalStringMetricType({
              name: 'locale',
              category: '',
              sendInPings: ['glean_client_info'],
              lifetime: 'application',
              disabled: !1
            })),
            (this.appChannel = new InternalStringMetricType({
              name: 'app_channel',
              category: '',
              sendInPings: ['glean_client_info'],
              lifetime: 'application',
              disabled: !1
            })),
            (this.appBuild = new InternalStringMetricType({
              name: 'app_build',
              category: '',
              sendInPings: ['glean_client_info'],
              lifetime: 'application',
              disabled: !1
            })),
            (this.appDisplayVersion = new InternalStringMetricType({
              name: 'app_display_version',
              category: '',
              sendInPings: ['glean_client_info'],
              lifetime: 'application',
              disabled: !1
            })),
            (this.buildDate = new InternalDatetimeMetricType(
              {
                name: 'build_date',
                category: '',
                sendInPings: ['glean_client_info'],
                lifetime: 'application',
                disabled: !1
              },
              'second'
            )),
            (this.sessionId = new V.Pc({
              name: 'session_id',
              category: '',
              sendInPings: ['glean_client_info'],
              lifetime: 'user',
              disabled: !1
            })),
            (this.sessionCount = new InternalCounterMetricType({
              name: 'session_count',
              category: '',
              sendInPings: ['glean_client_info'],
              lifetime: 'user',
              disabled: !1
            })));
        }
        initialize() {
          !(!E.o.testing && (0, x.IB)()) &&
            (this.initializeClientId(),
            this.initializeFirstRunDate(),
            this.updateSessionInfo(),
            this.os.set(E.o.platform.info.os()),
            this.osVersion.set(E.o.platform.info.osVersion()),
            this.architecture.set(E.o.platform.info.arch()),
            this.locale.set(E.o.platform.info.locale()),
            this.appBuild.set(E.o.config.appBuild || 'Unknown'),
            this.appDisplayVersion.set(
              E.o.config.appDisplayVersion || 'Unknown'
            ),
            E.o.config.channel && this.appChannel.set(E.o.config.channel),
            E.o.config.buildDate && this.buildDate.set());
        }
        updateSessionInfo() {
          if (!(0, x.IB)()) {
            if (E.o.metricsDatabase.getMetric(M.Tv, this.sessionId))
              try {
                (function (t = 30) {
                  let r = null;
                  try {
                    r = localStorage.getItem('glean_session_last_active');
                  } catch (t) {
                    console.warn(t);
                  }
                  let n = new Date(Number(r)),
                    s = new Date();
                  return (s.setMinutes(s.getMinutes() - t), s > n);
                })(E.o.config.sessionLengthInMinutesOverride) &&
                  this.generateNewSession();
              } catch (t) {
                this.generateNewSession();
              }
            else this.generateNewSession();
            try {
              localStorage.setItem(
                'glean_session_last_active',
                Date.now().toString()
              );
            } catch (t) {
              console.warn(t);
            }
          }
        }
        initializeClientId() {
          let t = !1,
            r = E.o.metricsDatabase.getMetric(M.Tv, this.clientId);
          if (r)
            try {
              (0, j.Hp)('uuid', r).payload() === M.Kp && (t = !0);
            } catch (r) {
              ((0, b.A)(
                'core.InternalMetrics',
                'Unexpected value found for Glean clientId. Ignoring.',
                b.q.Warn
              ),
                (t = !0));
            }
          else t = !0;
          t && this.clientId.set((0, x.Z3)());
        }
        initializeFirstRunDate() {
          E.o.metricsDatabase.getMetric(M.Tv, this.firstRunDate) ||
            this.firstRunDate.set();
        }
        generateNewSession() {
          (this.sessionId.generateAndSet(), this.sessionCount.add());
        }
      };
      let K = 'core.Pings.Maker',
        X = function (t, r, n) {
          let s = (function (t, r) {
            let n = E.o.eventsDatabase.getPingEvents(t.name, !0),
              s = E.o.metricsDatabase.getPingMetrics(t.name, !0);
            if (!s && !n) {
              if (!t.sendIfEmpty)
                return void (0, b.A)(
                  K,
                  `Storage for ${t.name} empty. Bailing out.`,
                  b.q.Info
                );
              (0, b.A)(
                K,
                `Storage for ${t.name} empty. Ping will still be sent.`,
                b.q.Info
              );
            }
            t.includeClientId &&
              E.o.config.experimentationId &&
              (s =
                void 0 !== s
                  ? {
                      ...s,
                      string: {
                        ...((null == s ? void 0 : s.string) || void 0),
                        'glean.client.annotation.experimentation_id':
                          E.o.config.experimentationId
                      }
                    }
                  : {
                      string: {
                        'glean.client.annotation.experimentation_id':
                          E.o.config.experimentationId
                      }
                    });
            let a = s ? { metrics: s } : {},
              o = (function (t, r) {
                let n = (function (t) {
                    let r = new InternalCounterMetricType({
                        category: '',
                        name: `${t.name}#sequence`,
                        sendInPings: [M.cp],
                        lifetime: 'user',
                        disabled: !1
                      }),
                      n = E.o.metricsDatabase.getMetric(M.cp, r);
                    if ((r.add(1), n))
                      try {
                        return new CounterMetric(n).payload();
                      } catch (r) {
                        (0, b.A)(
                          K,
                          `Unexpected value found for sequence number in ping ${t.name}. Ignoring.`,
                          b.q.Warn
                        );
                      }
                    return 0;
                  })(t),
                  { startTime: s, endTime: a } = (function (t) {
                    let r,
                      n,
                      { startTimeMetric: s, startTime: a } =
                        ((r = new InternalDatetimeMetricType(
                          {
                            category: '',
                            name: `${t.name}#start`,
                            sendInPings: [M.cp],
                            lifetime: 'user',
                            disabled: !1
                          },
                          W.Minute
                        )),
                        (n = E.o.metricsDatabase.getMetric(M.cp, r)),
                        {
                          startTimeMetric: r,
                          startTime: n
                            ? new DatetimeMetric(n)
                            : DatetimeMetric.fromDate(E.o.startTime, W.Minute)
                        }),
                      o = new Date();
                    s.set(o);
                    let l = DatetimeMetric.fromDate(o, W.Minute);
                    return { startTime: a.payload(), endTime: l.payload() };
                  })(t),
                  o = { seq: n, start_time: s, end_time: a };
                return (r && (o.reason = r), o);
              })(t, r),
              l = (function (t) {
                let r = E.o.metricsDatabase.getPingMetrics(M.Tv, !0);
                r ||
                  ((0, b.A)(
                    K,
                    'Empty client info data. Will submit anyways.',
                    b.q.Warn
                  ),
                  (r = {}));
                let n = { telemetry_sdk_build: '5.0.8' };
                for (let t in r) n = { ...n, ...r[t] };
                return (
                  t.includeClientId ||
                    (delete n.client_id, delete n.session_id),
                  n
                );
              })(t);
            return {
              ...a,
              ...(n ? { events: n } : {}),
              ping_info: o,
              client_info: l
            };
          })(r, n);
          if (!s) return;
          E.o.config.logPings &&
            (0, b.A)(K, JSON.stringify(s, null, 2), b.q.Info);
          let a = (function () {
            let t = {};
            if (
              (E.o.config.debugViewTag &&
                (t['X-Debug-ID'] = E.o.config.debugViewTag),
              E.o.config.sourceTags &&
                (t['X-Source-Tags'] = E.o.config.sourceTags.toString()),
              Object.keys(t).length > 0)
            )
              return t;
          })();
          E.o.pingsDatabase.recordPing(
            `/submit/${E.o.applicationId}/${r.name}/1/${t}`,
            t,
            s,
            a
          );
        },
        Y = 'core.Pings.PingType';
      let InternalPingType = class InternalPingType {
        constructor(t) {
          var r;
          ((this.name = t.name),
            (this.includeClientId = t.includeClientId),
            (this.sendIfEmpty = t.sendIfEmpty),
            (this.reasonCodes = null != (r = t.reasonCodes) ? r : []),
            (this.preciseTimestamps = t.preciseTimestamps));
        }
        submit(t) {
          this.testCallback
            ? this.testCallback(t)
                .then(() => {
                  this.internalSubmit(t, this.resolveTestPromiseFunction);
                })
                .catch(r => {
                  ((0, b.A)(
                    Y,
                    [
                      `There was an error validating "${this.name}" (${null != t ? t : 'no reason'}):`,
                      r
                    ],
                    b.q.Error
                  ),
                    this.internalSubmit(t, this.rejectTestPromiseFunction));
                })
            : this.internalSubmit(t);
        }
        internalSubmit(t, r) {
          if (!E.o.initialized)
            return void (0, b.A)(
              Y,
              'Glean must be initialized before submitting pings.',
              b.q.Info
            );
          if (!E.o.uploadEnabled && this.name !== M.OM)
            return void (0, b.A)(
              Y,
              'Glean disabled: not submitting pings. Glean may still submit the deletion-request ping.',
              b.q.Info
            );
          let n = t;
          (t &&
            !this.reasonCodes.includes(t) &&
            ((0, b.A)(
              Y,
              `Invalid reason code ${t} from ${this.name}. Ignoring.`,
              b.q.Warn
            ),
            (n = void 0)),
            X((0, x.Z3)(), this, n),
            r &&
              (r(),
              (this.resolveTestPromiseFunction = void 0),
              (this.rejectTestPromiseFunction = void 0),
              (this.testCallback = void 0)));
        }
        async testBeforeNextSubmit(t) {
          if ((0, x.xU)('testBeforeNextSubmit', Y))
            return this.testCallback
              ? void (0, b.A)(
                  Y,
                  `There is an existing test call for ping "${this.name}". Ignoring.`,
                  b.q.Error
                )
              : new Promise((r, n) => {
                  ((this.resolveTestPromiseFunction = r),
                    (this.rejectTestPromiseFunction = n),
                    (this.testCallback = t));
                });
        }
      };
      new WeakMap();
      let CorePings = class CorePings {
        constructor() {
          ((this.deletionRequest = new InternalPingType({
            name: M.OM,
            includeClientId: !0,
            sendIfEmpty: !0,
            reasonCodes: ['at_init', 'set_upload_enabled']
          })),
            (this.events = new InternalPingType({
              name: 'events',
              includeClientId: !0,
              sendIfEmpty: !1,
              reasonCodes: ['startup', 'max_capacity']
            })));
        }
      };
      let Q = 'core.Metrics.Database',
        ee = 'reserved#',
        et = `glean.${ee}`;
      let MetricsDatabase = class MetricsDatabase {
        constructor() {
          ((this.userStore = new E.o.platform.Storage('userLifetimeMetrics')),
            (this.pingStore = new E.o.platform.Storage('pingLifetimeMetrics')),
            (this.appStore = new E.o.platform.Storage('appLifetimeMetrics')));
        }
        record(t, r) {
          this.transform(t, () => r);
        }
        transform(t, r) {
          if (t.disabled) return;
          let n = this.chooseStore(t.lifetime),
            s = t.identifier();
          for (let a of t.sendInPings) {
            let o = t => r(t).get();
            n.update([a, t.type, s], o);
          }
        }
        hasMetric(t, r, n, s) {
          let a = this.chooseStore(t).get([r, n, s]);
          return !(0, x.b0)(a);
        }
        countByBaseIdentifier(t, r, n, s) {
          let a = this.chooseStore(t).get([r, n]);
          return (0, x.b0)(a)
            ? 0
            : Object.keys(a).filter(t => t.startsWith(s)).length;
        }
        getMetric(t, r) {
          let n = this.chooseStore(r.lifetime),
            s = r.identifier(),
            a = n.get([t, r.type, s]);
          if ((0, x.b0)(a) || (0, j.LE)(r.type, a)) return a;
          ((0, b.A)(
            Q,
            `Unexpected value found for metric ${s}: ${JSON.stringify(a)}. Clearing.`,
            b.q.Error
          ),
            n.delete([t, r.type, s]));
        }
        getPingMetrics(t, r) {
          let n = this.getCorrectedPingData(t, 'user'),
            s = this.getCorrectedPingData(t, 'ping'),
            a = this.getCorrectedPingData(t, 'application');
          r && Object.keys(s).length > 0 && this.clear('ping', t);
          let o = {};
          for (let t of [n, s, a])
            for (let r in t)
              for (let n in t[r])
                n.startsWith(et) ||
                  (n.includes('/')
                    ? this.processLabeledMetric(o, r, n, t[r][n])
                    : (o[r] = { ...o[r], [n]: t[r][n] }));
          if (0 !== Object.keys(o).length) {
            let t = {};
            for (let r in o) {
              let n = o[r];
              for (let s in ((t[r] = {}), n)) {
                let a = (0, j.Hp)(r, n[s]);
                t[r][s] = a.payload();
              }
            }
            return t;
          }
        }
        clear(t, r) {
          this.chooseStore(t).delete(r ? [r] : []);
        }
        clearAll() {
          (this.userStore.delete([]),
            this.pingStore.delete([]),
            this.appStore.delete([]));
        }
        chooseStore(t) {
          switch (t) {
            case 'user':
              return this.userStore;
            case 'ping':
              return this.pingStore;
            case 'application':
              return this.appStore;
          }
        }
        getCorrectedPingData(t, r) {
          let n = this.chooseStore(r),
            s = n.get([t]);
          if ((0, x.b0)(s)) return {};
          if (!(0, x.Gv)(s))
            return (
              (0, b.A)(
                Q,
                `Invalid value found in storage for ping "${t}". Deleting.`,
                b.q.Debug
              ),
              n.delete([t]),
              {}
            );
          let a = {};
          for (let r in s) {
            let o = s[r];
            if (!(0, x.Gv)(o)) {
              ((0, b.A)(
                Q,
                `Unexpected data found in storage for metrics of type "${r}" in ping "${t}". Deleting.`,
                b.q.Debug
              ),
                n.delete([t, r]));
              continue;
            }
            for (let s in o) {
              if (!(0, j.LE)(r, o[s])) {
                ((0, b.A)(
                  Q,
                  `Invalid value "${JSON.stringify(o[s])}" found in storage for metric "${s}". Deleting.`,
                  b.q.Debug
                ),
                  n.delete([t, r, s]));
                continue;
              }
              (a[r] || (a[r] = {}), (a[r][s] = o[s]));
            }
          }
          return a;
        }
        processLabeledMetric(t, r, n, s) {
          let a = `labeled_${r}`,
            o = n.split('/', 2),
            l = o[0],
            c = o[1];
          if (a in t && l in t[a]) {
            let r = t[a][l];
            t[a][l] = { ...r, [c]: s };
          } else t[a] = { ...t[a], [l]: { [c]: s } };
        }
      };
      var ei = n(40351),
        er = n(67867),
        en = n(82006);
      let es = 'core.Metric.EventsDatabase';
      function ea(t, r = E.o.startTime) {
        ec(t).record({ [M.zh]: r.toISOString() }, 0);
      }
      function eo(t) {
        (0, x.Kg)(t) || (t = '');
        let r = new Date(t);
        if (isNaN(r.getTime()))
          throw Error(
            `Error attempting to generate Date object from string: ${t}`
          );
        return r;
      }
      function el(t) {
        return new InternalCounterMetricType({
          ...{ category: 'glean', name: `${ee}execution_counter` },
          sendInPings: t.filter(t => 'events' !== t),
          lifetime: 'ping',
          disabled: !1
        });
      }
      function ec(t) {
        return new er.C(
          {
            category: 'glean',
            name: 'restarted',
            sendInPings: t.filter(t => 'events' !== t),
            lifetime: 'ping',
            disabled: !1
          },
          [M.zh]
        );
      }
      let EventsDatabase = class EventsDatabase {
        constructor() {
          ((this.initialized = !1),
            (this.eventsStore = new E.o.platform.Storage('events')));
        }
        initialize() {
          var t;
          if (this.initialized) return;
          let r = this.getAvailableStoreNames();
          if (r.includes('events')) {
            let r = null != (t = this.eventsStore.get(['events'])) ? t : [];
            r.length > 0 &&
              r.length >= E.o.config.maxEvents &&
              E.o.corePings.events.submit('startup');
          }
          (el(r).add(1), ea(r), (this.initialized = !0));
        }
        record(t, r) {
          if (!t.disabled)
            for (let n of t.sendInPings) {
              let t = el([n]),
                s = E.o.metricsDatabase.getMetric(n, t);
              (s || (t.add(1), (s = 1), ea([n], new Date())),
                r.addExtra(M.HT, s));
              let a = 0,
                o = t => {
                  let n = null != t ? t : [];
                  return (n.push(r.get()), (a = n.length), n);
                };
              (this.eventsStore.update([n], o),
                'events' === n &&
                  a >= E.o.config.maxEvents &&
                  E.o.corePings.events.submit('max_capacity'));
            }
        }
        getEvents(t, r) {
          let n = this.getAndValidatePingData(t);
          if (0 !== n.length)
            return n
              .filter(
                t => t.get().category === r.category && t.get().name === r.name
              )
              .map(t => t.withoutReservedExtras());
        }
        getPingEvents(t, r) {
          let n = this.getAndValidatePingData(t);
          if (
            (r && Object.keys(n).length > 0 && this.eventsStore.delete([t]),
            0 === n.length)
          )
            return;
          let s = this.prepareEventsPayload(t, n);
          if (s.length > 0) return s;
        }
        clearAll() {
          this.eventsStore.delete([]);
        }
        getAvailableStoreNames() {
          let t = this.eventsStore.get([]);
          return (0, x.b0)(t) ? [] : Object.keys(t);
        }
        getAndValidatePingData(t) {
          let r = this.eventsStore.get([t]);
          return (0, x.b0)(r)
            ? []
            : Array.isArray(r)
              ? r.reduce((t, r) => {
                  try {
                    let n = new en.j(r);
                    return [...t, n];
                  } catch (n) {
                    return (
                      (0, b.A)(
                        es,
                        `Unexpected data found in events storage: ${JSON.stringify(r)}. Ignoring.`
                      ),
                      t
                    );
                  }
                }, [])
              : ((0, b.A)(
                  es,
                  `Unexpected value found for ping ${t}: ${JSON.stringify(r)}. Clearing.`,
                  b.q.Error
                ),
                this.eventsStore.delete([t]),
                []);
        }
        prepareEventsPayload(t, r) {
          var n, s, a, o;
          let l,
            c = r.sort((t, r) => {
              var n, s;
              let a = Number(null == (n = t.get().extra) ? void 0 : n[M.HT]),
                o = Number(null == (s = r.get().extra) ? void 0 : s[M.HT]);
              return a !== o ? a - o : t.get().timestamp - r.get().timestamp;
            });
          try {
            ((l = eo(null == (n = c[0].get().extra) ? void 0 : n[M.zh])),
              c.shift());
          } catch (t) {
            l = E.o.startTime;
          }
          let d = (null == (s = c[0]) ? void 0 : s.get().timestamp) || 0,
            u = 0;
          for (let [r, n] of c.entries()) {
            let s;
            try {
              let s = eo(null == (a = n.get().extra) ? void 0 : a[M.zh]),
                o = s.getTime() - l.getTime();
              l = s;
              let d = u + o,
                h = c[r - 1].get().timestamp;
              d <= h
                ? ((u = h + 1),
                  E.o.errorManager.record(
                    ec([t]),
                    ei.B.InvalidValue,
                    `Invalid time offset between application sessions found for ping "${t}". Ignoring.`
                  ))
                : (u = d);
            } catch (t) {}
            ((s =
              1 ===
              Number((null == (o = n.get().extra) ? void 0 : o[M.HT]) || 1)
                ? n.get().timestamp - d
                : n.get().timestamp + u),
              (c[r] = new en.j({
                category: n.get().category,
                name: n.get().name,
                timestamp: s,
                extra: n.get().extra
              })));
          }
          return (c = (function (t) {
            for (
              var r, n, s;
              t.length &&
              (null ==
              (s =
                null == (n = null == (r = t[t.length - 1]) ? void 0 : r.get())
                  ? void 0
                  : n.extra)
                ? void 0
                : s[M.zh]);
            )
              t.pop();
            return t;
          })(c)).map(t => t.payload());
        }
      };
      var ed = n(84592);
      function eu(t, r) {
        let n = t.baseIdentifier(),
          s = (0, ed.X3)(n);
        return new InternalCounterMetricType({
          name: (0, ed.Uh)(r, s),
          category: 'glean.error',
          lifetime: 'ping',
          sendInPings: t.sendInPings,
          disabled: !1
        });
      }
      let ErrorManager = class ErrorManager {
        record(t, r, n, s = 1) {
          let a,
            o = eu(t, r);
          ((0, b.A)(
            ((a = t.type.charAt(0).toUpperCase() + t.type.slice(1)),
            `core.metrics.${a}`),
            [`${t.baseIdentifier()}:`, n]
          ),
            s > 0 && o.add(s));
        }
        testGetNumRecordedErrors(t, r, n) {
          return eu(t, r).testGetValue(n) || 0;
        }
      };
      var eh = n(34388);
      let ep = 'core.Glean';
      (((d = f || (f = {})).DebugTag = 'DebugTag'),
        (d.SourceTags = 'SourceTags'),
        (d.LogPings = 'LogPings'));
      let eg = (t, r) => {
          let n = `Glean.${t.toString()}`;
          try {
            switch (t) {
              case f.DebugTag:
                sessionStorage.setItem(n, r);
                break;
              case f.LogPings:
                sessionStorage.setItem(n, r.toString());
                break;
              case f.SourceTags:
                sessionStorage.setItem(n, r.join(','));
            }
          } catch (t) {
            console.warn(t);
          }
        },
        ef = t => {
          try {
            return sessionStorage.getItem(`Glean.${t.toString()}`) || void 0;
          } catch (t) {
            console.warn(t);
            return;
          }
        };
      !(function (t) {
        function r() {
          ((E.o.uploadEnabled = !0), t.pingUploader.resumeUploads());
        }
        function n(t) {
          ((E.o.uploadEnabled = !1),
            E.o.corePings.deletionRequest.submit(
              t ? 'at_init' : 'set_upload_enabled'
            ),
            s());
        }
        function s() {
          let r;
          t.pingUploader.clearPendingPingsQueue();
          try {
            r = new DatetimeMetric(
              E.o.metricsDatabase.getMetric(M.Tv, E.o.coreMetrics.firstRunDate)
            ).date;
          } catch (t) {
            r = new Date();
          }
          (E.o.eventsDatabase.clearAll(),
            E.o.metricsDatabase.clearAll(),
            E.o.pingsDatabase.clearAll(),
            (E.o.uploadEnabled = !0),
            E.o.coreMetrics.clientId.set(M.Kp),
            E.o.coreMetrics.firstRunDate.set(r),
            (E.o.uploadEnabled = !1));
        }
        ((t.initialize = function (a, o, l) {
          let c, d, u;
          if (E.o.initialized)
            return void (0, b.A)(
              ep,
              'Attempted to initialize Glean, but it has already been initialized. Ignoring.',
              b.q.Warn
            );
          if (!(0, x.Kg)(a))
            return void (0, b.A)(
              ep,
              'Unable to initialize Glean, applicationId must be a string.',
              b.q.Error
            );
          if (!(0, x.Lm)(o))
            return void (0, b.A)(
              ep,
              'Unable to initialize Glean, uploadEnabled must be a boolean.',
              b.q.Error
            );
          if (0 === a.length)
            return void (0, b.A)(
              ep,
              'Unable to initialize Glean, applicationId cannot be an empty string.',
              b.q.Error
            );
          if (!E.o.platform)
            return void (0, b.A)(
              ep,
              'Unable to initialize Glean, platform has not been set.',
              b.q.Error
            );
          if (
            ((E.o.coreMetrics = new CoreMetrics()),
            (E.o.corePings = new CorePings()),
            (E.o.applicationId = (0, x.zn)(a)),
            (E.o.config = new Configuration(l)),
            (c = ef(f.LogPings)) && (t.preInitLogPings = (0, x.PK)(c)),
            (d = ef(f.DebugTag)) && (t.preInitDebugViewTag = d),
            (u = ef(f.SourceTags)) && (t.preInitSourceTags = u.split(',')),
            t.preInitLogPings && (E.o.config.logPings = t.preInitLogPings),
            t.preInitDebugViewTag &&
              (E.o.config.debugViewTag = t.preInitDebugViewTag),
            t.preInitSourceTags &&
              (E.o.config.sourceTags = t.preInitSourceTags),
            (E.o.metricsDatabase = new MetricsDatabase()),
            (E.o.eventsDatabase = new EventsDatabase()),
            (E.o.pingsDatabase = new PingsDatabase()),
            (E.o.errorManager = new ErrorManager()),
            (t.pingUploader = new PingUploadManager(
              E.o.config,
              E.o.pingsDatabase
            )),
            (E.o.initialized = !0),
            (E.o.uploadEnabled = o),
            E.o.eventsDatabase.initialize(),
            o)
          )
            (E.o.metricsDatabase.clear('application'),
              r(),
              E.o.coreMetrics.initialize(),
              (null == l ? void 0 : l.enableAutoPageLoadEvents) &&
                eh.A.pageLoad(),
              (null == l ? void 0 : l.enableAutoElementClickEvents) &&
                document.addEventListener('click', t => {
                  eh.A.handleClickEvent(t);
                }));
          else {
            let t = E.o.metricsDatabase.getMetric(
              M.Tv,
              E.o.coreMetrics.clientId
            );
            t ? t !== M.Kp && n(!0) : s();
          }
          E.o.pingsDatabase.scanPendingPings();
        }),
          (t.setUploadEnabled = function (t) {
            E.o.initialized
              ? (0, x.Lm)(t)
                ? E.o.uploadEnabled !== t &&
                  (t ? (r(), E.o.coreMetrics.initialize()) : n(!1))
                : (0, b.A)(
                    ep,
                    'Unable to change upload state, new value must be a boolean. Ignoring.',
                    b.q.Error
                  )
              : (0, b.A)(
                  ep,
                  [
                    'Changing upload enabled before Glean is initialized is not supported.\n',
                    'Pass the correct state into `initialize`.\n',
                    'See documentation at https://mozilla.github.io/glean/book/user/general-api.html#initializing-the-glean-sdk`'
                  ],
                  b.q.Error
                );
          }),
          (t.setExperimentationId = function (t) {
            E.o.config.experimentationId = t;
          }),
          (t.setLogPings = function (r) {
            E.o.initialized
              ? (E.o.config.logPings = r)
              : (t.preInitLogPings = r);
          }),
          (t.setDebugViewTag = function (r) {
            E.o.initialized
              ? (E.o.config.debugViewTag = r)
              : (t.preInitDebugViewTag = r);
          }),
          (t.setSourceTags = function (r) {
            E.o.initialized
              ? (E.o.config.sourceTags = r)
              : (t.preInitSourceTags = r);
          }),
          (t.setPlatform = function (t) {
            E.o.initialized ||
              (E.o.isPlatformSet() &&
                E.o.platform.name !== t.name &&
                !E.o.testing &&
                (0, b.A)(
                  ep,
                  [
                    `IMPOSSIBLE: Attempted to change Glean's targeted platform",
            "from "${E.o.platform.name}" to "${t.name}". Ignoring.`
                  ],
                  b.q.Error
                ),
              (E.o.platform = t));
          }));
      })(m || (m = {}));
      let em = !1;
      try {
        em = 'u' > typeof window && void 0 !== window.sessionStorage;
      } catch (t) {
        console.error('No session storage available', t);
      }
      em &&
        (window.Glean = {
          setLogPings: t => {
            (eg(f.LogPings, t),
              m.setLogPings(t),
              console.log(
                'Pings will be logged to the console until this tab is closed.'
              ));
          },
          setDebugViewTag: t => {
            (eg(f.DebugTag, t),
              m.setDebugViewTag(t),
              console.log(
                'Pings will be sent to the Debug Ping Viewer until this tab is closed. Pings can be found here: https://debug-ping-preview.firebaseapp.com/.'
              ));
          },
          setSourceTags: t => {
            (eg(f.SourceTags, t),
              m.setSourceTags(t),
              console.log(
                'Pings will be given the specified tags until the tab is closed.'
              ));
          },
          debugSession: () => {
            let t = E.o.metricsDatabase.getMetric(
              M.Tv,
              E.o.coreMetrics.sessionId
            );
            t && 'string' == typeof t && E.o.config.debugViewTag
              ? window.open(
                  `https://debug-ping-preview.firebaseapp.com/stream/${E.o.config.debugViewTag}#${t}`,
                  '_blank'
                )
              : console.info(
                  'You must set a debug tag via `window.Glean.setDebugViewTag` before debugging your session.'
                );
          }
        });
      let ey = m,
        eb =
          ((s = {
            Storage: WebStore,
            uploader: T,
            info: {
              os() {
                let t;
                return (t =
                  navigator && navigator.userAgent
                    ? navigator.userAgent
                    : 'Unknown').includes('Windows')
                  ? 'Windows'
                  : /tvOS/i.test(t)
                    ? 'TvOS'
                    : /Watch( OS)?/i.test(t)
                      ? 'WatchOS'
                      : /iPhone|iPad|iOS/i.test(t)
                        ? 'iOS'
                        : /Mac OS X|macOS/i.test(t)
                          ? 'Darwin'
                          : /Android/i.test(t)
                            ? 'Android'
                            : /CrOS/i.test(t)
                              ? 'ChromeOS'
                              : /WebOS/i.test(t)
                                ? 'WebOS'
                                : /Linux/i.test(t)
                                  ? 'Linux'
                                  : /OpenBSD/i.test(t)
                                    ? 'OpenBSD'
                                    : /FreeBSD/i.test(t)
                                      ? 'FreeBSD'
                                      : /NetBSD/i.test(t)
                                        ? 'NetBSD'
                                        : /SunOS/i.test(t)
                                          ? 'SunOS'
                                          : /AIX/i.test(t)
                                            ? 'IBM_AIX'
                                            : 'Unknown';
              },
              osVersion: () => 'Unknown',
              arch: () => 'Unknown',
              locale: () =>
                navigator && navigator.language ? navigator.language : 'und'
            },
            timer: { setTimeout, clearTimeout },
            name: 'web'
          }),
          {
            initialize(t, r, n) {
              (ey.setPlatform(s), ey.initialize(t, r, n));
            },
            setUploadEnabled(t) {
              ey.setUploadEnabled(t);
            },
            setLogPings(t) {
              ey.setLogPings(t);
            },
            setDebugViewTag(t) {
              ey.setDebugViewTag(t);
            },
            setSourceTags(t) {
              ey.setSourceTags(t);
            }
          });
    },
    18504(t, r, n) {
      let { I: s } = n(36752).ge,
        a = {};
      n.d(
        r,
        {},
        {
          Rt: t => void 0 === t.strings,
          mY: (t, r = a) => (t._$AH = r),
          ps: t => null != t?._$litType$?.h,
          qb: (t, r) =>
            void 0 === r ? void 0 !== t?._$litType$ : t?._$litType$ === r,
          sO: t =>
            null === t || ('object' != typeof t && 'function' != typeof t)
        }
      );
    },
    7804(t, r, n) {
      let i = class i {
        constructor(t) {}
        get _$AU() {
          return this._$AM._$AU;
        }
        _$AT(t, r, n) {
          ((this._$Ct = t), (this._$AM = r), (this._$Ci = n));
        }
        _$AS(t, r) {
          return this.update(t, r);
        }
        update(t, r) {
          return this.render(...r);
        }
      };
      n.d(
        r,
        { WL: () => i },
        {
          OA: {
            ATTRIBUTE: 1,
            CHILD: 2,
            PROPERTY: 3,
            BOOLEAN_ATTRIBUTE: 4,
            EVENT: 5,
            ELEMENT: 6
          },
          u$:
            t =>
            (...r) => ({ _$litDirective$: t, values: r })
        }
      );
    },
    36752(t, r, n) {
      let s = globalThis,
        a = t => t,
        o = s.trustedTypes,
        l = o ? o.createPolicy('lit-html', { createHTML: t => t }) : void 0,
        c = '$lit$',
        d = `lit$${Math.random().toFixed(9).slice(2)}$`,
        u = '?' + d,
        h = `<${u}>`,
        p = document,
        g = () => p.createComment(''),
        f = t => null === t || ('object' != typeof t && 'function' != typeof t),
        m = Array.isArray,
        b = t => m(t) || 'function' == typeof t?.[Symbol.iterator],
        v = '[ 	\n\f\r]',
        w = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
        $ = /-->/g,
        _ = />/g,
        E = RegExp(
          `>|${v}(?:([^\\s"'>=/]+)(${v}*=${v}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,
          'g'
        ),
        A = /'/g,
        T = /"/g,
        x = /^(?:script|style|textarea|title)$/i,
        P =
          t =>
          (r, ...n) => ({ _$litType$: t, strings: r, values: n }),
        M = P(1),
        D = P(2),
        C = Symbol.for('lit-noChange'),
        U = Symbol.for('lit-nothing'),
        O = new WeakMap(),
        N = p.createTreeWalker(p, 129);
      function q(t, r) {
        if (!m(t) || !t.hasOwnProperty('raw'))
          throw Error('invalid template strings array');
        return void 0 !== l ? l.createHTML(r) : r;
      }
      let B = (t, r) => {
        let n = t.length - 1,
          s = [],
          a,
          o = 2 === r ? '<svg>' : 3 === r ? '<math>' : '',
          l = w;
        for (let r = 0; r < n; r++) {
          let n = t[r],
            u,
            p,
            g = -1,
            f = 0;
          for (; f < n.length && ((l.lastIndex = f), null !== (p = l.exec(n)));)
            ((f = l.lastIndex),
              l === w
                ? '!--' === p[1]
                  ? (l = $)
                  : void 0 !== p[1]
                    ? (l = _)
                    : void 0 !== p[2]
                      ? (x.test(p[2]) && (a = RegExp('</' + p[2], 'g')),
                        (l = E))
                      : void 0 !== p[3] && (l = E)
                : l === E
                  ? '>' === p[0]
                    ? ((l = a ?? w), (g = -1))
                    : void 0 === p[1]
                      ? (g = -2)
                      : ((g = l.lastIndex - p[2].length),
                        (u = p[1]),
                        (l = void 0 === p[3] ? E : '"' === p[3] ? T : A))
                  : l === T || l === A
                    ? (l = E)
                    : l === $ || l === _
                      ? (l = w)
                      : ((l = E), (a = void 0)));
          let m = l === E && t[r + 1].startsWith('/>') ? ' ' : '';
          o +=
            l === w
              ? n + h
              : g >= 0
                ? (s.push(u), n.slice(0, g) + c + n.slice(g) + d + m)
                : n + d + (-2 === g ? r : m);
        }
        return [
          q(
            t,
            o +
              (t[n] || '<?>') +
              (2 === r ? '</svg>' : 3 === r ? '</math>' : '')
          ),
          s
        ];
      };
      let S = class S {
        constructor({ strings: t, _$litType$: r }, n) {
          let s;
          this.parts = [];
          let a = 0,
            l = 0,
            h = t.length - 1,
            p = this.parts,
            [f, m] = B(t, r);
          if (
            ((this.el = S.createElement(f, n)),
            (N.currentNode = this.el.content),
            2 === r || 3 === r)
          ) {
            let t = this.el.content.firstChild;
            t.replaceWith(...t.childNodes);
          }
          for (; null !== (s = N.nextNode()) && p.length < h;) {
            if (1 === s.nodeType) {
              if (s.hasAttributes())
                for (let t of s.getAttributeNames())
                  if (t.endsWith(c)) {
                    let r = m[l++],
                      n = s.getAttribute(t).split(d),
                      o = /([.?@])?(.*)/.exec(r);
                    (p.push({
                      type: 1,
                      index: a,
                      name: o[2],
                      strings: n,
                      ctor:
                        '.' === o[1]
                          ? I
                          : '?' === o[1]
                            ? L
                            : '@' === o[1]
                              ? z
                              : H
                    }),
                      s.removeAttribute(t));
                  } else
                    t.startsWith(d) &&
                      (p.push({ type: 6, index: a }), s.removeAttribute(t));
              if (x.test(s.tagName)) {
                let t = s.textContent.split(d),
                  r = t.length - 1;
                if (r > 0) {
                  s.textContent = o ? o.emptyScript : '';
                  for (let n = 0; n < r; n++)
                    (s.append(t[n], g()),
                      N.nextNode(),
                      p.push({ type: 2, index: ++a }));
                  s.append(t[r], g());
                }
              }
            } else if (8 === s.nodeType)
              if (s.data === u) p.push({ type: 2, index: a });
              else {
                let t = -1;
                for (; -1 !== (t = s.data.indexOf(d, t + 1));)
                  (p.push({ type: 7, index: a }), (t += d.length - 1));
              }
            a++;
          }
        }
        static createElement(t, r) {
          let n = p.createElement('template');
          return ((n.innerHTML = t), n);
        }
      };
      function V(t, r, n = t, s) {
        if (r === C) return r;
        let a = void 0 !== s ? n._$Co?.[s] : n._$Cl,
          o = f(r) ? void 0 : r._$litDirective$;
        return (
          a?.constructor !== o &&
            (a?._$AO?.(!1),
            void 0 === o ? (a = void 0) : (a = new o(t))._$AT(t, n, s),
            void 0 !== s ? ((n._$Co ??= [])[s] = a) : (n._$Cl = a)),
          void 0 !== a && (r = V(t, a._$AS(t, r.values), a, s)),
          r
        );
      }
      let R = class R {
        constructor(t, r) {
          ((this._$AV = []),
            (this._$AN = void 0),
            (this._$AD = t),
            (this._$AM = r));
        }
        get parentNode() {
          return this._$AM.parentNode;
        }
        get _$AU() {
          return this._$AM._$AU;
        }
        u(t) {
          let {
              el: { content: r },
              parts: n
            } = this._$AD,
            s = (t?.creationScope ?? p).importNode(r, !0);
          N.currentNode = s;
          let a = N.nextNode(),
            o = 0,
            l = 0,
            c = n[0];
          for (; void 0 !== c;) {
            if (o === c.index) {
              let r;
              (2 === c.type
                ? (r = new k(a, a.nextSibling, this, t))
                : 1 === c.type
                  ? (r = new c.ctor(a, c.name, c.strings, this, t))
                  : 6 === c.type && (r = new Z(a, this, t)),
                this._$AV.push(r),
                (c = n[++l]));
            }
            o !== c?.index && ((a = N.nextNode()), o++);
          }
          return ((N.currentNode = p), s);
        }
        p(t) {
          let r = 0;
          for (let n of this._$AV)
            (void 0 !== n &&
              (void 0 !== n.strings
                ? (n._$AI(t, n, r), (r += n.strings.length - 2))
                : n._$AI(t[r])),
              r++);
        }
      };
      let k = class k {
        get _$AU() {
          return this._$AM?._$AU ?? this._$Cv;
        }
        constructor(t, r, n, s) {
          ((this.type = 2),
            (this._$AH = U),
            (this._$AN = void 0),
            (this._$AA = t),
            (this._$AB = r),
            (this._$AM = n),
            (this.options = s),
            (this._$Cv = s?.isConnected ?? !0));
        }
        get parentNode() {
          let t = this._$AA.parentNode,
            r = this._$AM;
          return (void 0 !== r && 11 === t?.nodeType && (t = r.parentNode), t);
        }
        get startNode() {
          return this._$AA;
        }
        get endNode() {
          return this._$AB;
        }
        _$AI(t, r = this) {
          f((t = V(this, t, r)))
            ? t === U || null == t || '' === t
              ? (this._$AH !== U && this._$AR(), (this._$AH = U))
              : t !== this._$AH && t !== C && this._(t)
            : void 0 !== t._$litType$
              ? this.$(t)
              : void 0 !== t.nodeType
                ? this.T(t)
                : b(t)
                  ? this.k(t)
                  : this._(t);
        }
        O(t) {
          return this._$AA.parentNode.insertBefore(t, this._$AB);
        }
        T(t) {
          this._$AH !== t && (this._$AR(), (this._$AH = this.O(t)));
        }
        _(t) {
          (this._$AH !== U && f(this._$AH)
            ? (this._$AA.nextSibling.data = t)
            : this.T(p.createTextNode(t)),
            (this._$AH = t));
        }
        $(t) {
          let { values: r, _$litType$: n } = t,
            s =
              'number' == typeof n
                ? this._$AC(t)
                : (void 0 === n.el &&
                    (n.el = S.createElement(q(n.h, n.h[0]), this.options)),
                  n);
          if (this._$AH?._$AD === s) this._$AH.p(r);
          else {
            let t = new R(s, this),
              n = t.u(this.options);
            (t.p(r), this.T(n), (this._$AH = t));
          }
        }
        _$AC(t) {
          let r = O.get(t.strings);
          return (void 0 === r && O.set(t.strings, (r = new S(t))), r);
        }
        k(t) {
          m(this._$AH) || ((this._$AH = []), this._$AR());
          let r = this._$AH,
            n,
            s = 0;
          for (let a of t)
            (s === r.length
              ? r.push(
                  (n = new k(this.O(g()), this.O(g()), this, this.options))
                )
              : (n = r[s]),
              n._$AI(a),
              s++);
          s < r.length &&
            (this._$AR(n && n._$AB.nextSibling, s), (r.length = s));
        }
        _$AR(t = this._$AA.nextSibling, r) {
          for (this._$AP?.(!1, !0, r); t !== this._$AB;) {
            let r = a(t).nextSibling;
            (a(t).remove(), (t = r));
          }
        }
        setConnected(t) {
          void 0 === this._$AM && ((this._$Cv = t), this._$AP?.(t));
        }
      };
      let H = class H {
        get tagName() {
          return this.element.tagName;
        }
        get _$AU() {
          return this._$AM._$AU;
        }
        constructor(t, r, n, s, a) {
          ((this.type = 1),
            (this._$AH = U),
            (this._$AN = void 0),
            (this.element = t),
            (this.name = r),
            (this._$AM = s),
            (this.options = a),
            n.length > 2 || '' !== n[0] || '' !== n[1]
              ? ((this._$AH = Array(n.length - 1).fill(new String())),
                (this.strings = n))
              : (this._$AH = U));
        }
        _$AI(t, r = this, n, s) {
          let a = this.strings,
            o = !1;
          if (void 0 === a)
            (o = !f((t = V(this, t, r, 0))) || (t !== this._$AH && t !== C)) &&
              (this._$AH = t);
          else {
            let s,
              l,
              c = t;
            for (t = a[0], s = 0; s < a.length - 1; s++)
              ((l = V(this, c[n + s], r, s)) === C && (l = this._$AH[s]),
                (o ||= !f(l) || l !== this._$AH[s]),
                l === U ? (t = U) : t !== U && (t += (l ?? '') + a[s + 1]),
                (this._$AH[s] = l));
          }
          o && !s && this.j(t);
        }
        j(t) {
          t === U
            ? this.element.removeAttribute(this.name)
            : this.element.setAttribute(this.name, t ?? '');
        }
      };
      let I = class I extends H {
        constructor() {
          (super(...arguments), (this.type = 3));
        }
        j(t) {
          this.element[this.name] = t === U ? void 0 : t;
        }
      };
      let L = class L extends H {
        constructor() {
          (super(...arguments), (this.type = 4));
        }
        j(t) {
          this.element.toggleAttribute(this.name, !!t && t !== U);
        }
      };
      let z = class z extends H {
        constructor(t, r, n, s, a) {
          (super(t, r, n, s, a), (this.type = 5));
        }
        _$AI(t, r = this) {
          if ((t = V(this, t, r, 0) ?? U) === C) return;
          let n = this._$AH,
            s =
              (t === U && n !== U) ||
              t.capture !== n.capture ||
              t.once !== n.once ||
              t.passive !== n.passive,
            a = t !== U && (n === U || s);
          (s && this.element.removeEventListener(this.name, this, n),
            a && this.element.addEventListener(this.name, this, t),
            (this._$AH = t));
        }
        handleEvent(t) {
          'function' == typeof this._$AH
            ? this._$AH.call(this.options?.host ?? this.element, t)
            : this._$AH.handleEvent(t);
        }
      };
      let Z = class Z {
        constructor(t, r, n) {
          ((this.element = t),
            (this.type = 6),
            (this._$AN = void 0),
            (this._$AM = r),
            (this.options = n));
        }
        get _$AU() {
          return this._$AM._$AU;
        }
        _$AI(t) {
          V(this, t);
        }
      };
      let G = s.litHtmlPolyfillSupport;
      (G?.(S, k),
        (s.litHtmlVersions ??= []).push('3.3.3'),
        n.d(
          r,
          {},
          {
            JW: D,
            XX: (t, r, n) => {
              let s = n?.renderBefore ?? r,
                a = s._$litPart$;
              if (void 0 === a) {
                let t = n?.renderBefore ?? null;
                s._$litPart$ = a = new k(
                  r.insertBefore(g(), t),
                  t,
                  void 0,
                  n ?? {}
                );
              }
              return (a._$AI(t), a);
            },
            c0: C,
            ge: {
              M: c,
              P: d,
              A: u,
              C: 1,
              L: B,
              R,
              D: b,
              V: V,
              I: k,
              H,
              N: L,
              U: z,
              B: I,
              F: Z
            },
            qy: M,
            s6: U
          }
        ));
    },
    12477(t, r, n) {
      n.d(r, { J: () => a });
      var s = n(36752);
      let a = t => t ?? s.s6;
    },
    76722(t, r, n) {
      n.d(r, { _: () => o });
      var s = n(36752),
        a = n(7804);
      let e = class e extends a.WL {
        constructor(t) {
          if ((super(t), (this.it = s.s6), t.type !== a.OA.CHILD))
            throw Error(
              this.constructor.directiveName +
                '() can only be used in child bindings'
            );
        }
        render(t) {
          if (t === s.s6 || null == t)
            return ((this._t = void 0), (this.it = t));
          if (t === s.c0) return t;
          if ('string' != typeof t)
            throw Error(
              this.constructor.directiveName +
                '() called with a non-string value'
            );
          if (t === this.it) return this._t;
          this.it = t;
          let r = [t];
          return (
            (r.raw = r),
            (this._t = {
              _$litType$: this.constructor.resultType,
              strings: r,
              values: []
            })
          );
        }
      };
      ((e.directiveName = 'unsafeHTML'), (e.resultType = 1));
      let o = (0, a.u$)(e);
    },
    22009(t, r, n) {
      n.d(r, {
        WF: () => i,
        AH: () => s.AH,
        qy: () => a.qy,
        s6: () => a.s6,
        JW: () => a.JW
      });
      var s = n(85675),
        a = n(36752);
      let o = globalThis;
      let i = class i extends s.mN {
        constructor() {
          (super(...arguments),
            (this.renderOptions = { host: this }),
            (this._$Do = void 0));
        }
        createRenderRoot() {
          let t = super.createRenderRoot();
          return ((this.renderOptions.renderBefore ??= t.firstChild), t);
        }
        update(t) {
          let r = this.render();
          (this.hasUpdated ||
            (this.renderOptions.isConnected = this.isConnected),
            super.update(t),
            (this._$Do = (0, a.XX)(r, this.renderRoot, this.renderOptions)));
        }
        connectedCallback() {
          (super.connectedCallback(), this._$Do?.setConnected(!0));
        }
        disconnectedCallback() {
          (super.disconnectedCallback(), this._$Do?.setConnected(!1));
        }
        render() {
          return a.c0;
        }
      };
      ((i._$litElement$ = !0),
        (i.finalized = !0),
        o.litElementHydrateSupport?.({ LitElement: i }));
      let l = o.litElementPolyfillSupport;
      (l?.({ LitElement: i }), (o.litElementVersions ??= []).push('4.2.0'));
    }
  };

  return { __rspack_esm_id, __rspack_esm_ids, __webpack_modules__ };
})();

// === chunk index (id 8410) ===
const chunkIndex = (function () {
  /*! LICENSE: index.6e6285dde716f9f0.js.LICENSE.txt */
  const __rspack_esm_id = 8410;
  const __rspack_esm_ids = [8410];
  const __webpack_modules__ = {
    537(e, t, o) {
      let a = `# WARNING: don't use this file as a source for strings requiring l10n, use ../template.ftl instead:
# this file only contains manually added strings, not ones inlined in code. See ../README.md for more details.

# TODO Use comments, see: https://firefox-source-docs.mozilla.org/l10n/fluent/review.html#comments
# TODO Consider using terms, see: https://firefox-source-docs.mozilla.org/l10n/fluent/review.html#terms and https://projectfluent.org/fluent/guide/references.html#message-references

article-footer-last-modified = This page was last modified on <time data-l10n-name="date">{ $date }</time> by <a data-l10n-name="contributors">MDN contributors</a>.
article-footer-source-title = Folder: { $folder } (Opens in a new tab)

baseline-asterisk = Some parts of this feature may have varying levels of support.
baseline-high-extra = This feature is well established and works across many devices and browser versions. It’s been available across browsers since { $date }.
baseline-low-extra = Since { $date }, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
baseline-not-extra = This feature is not Baseline because it does not work in some of the most widely-used browsers.
baseline-supported-in = Supported in { $browsers }
baseline-unsupported-in = Not widely supported in { $browsers }
baseline-supported-and-unsupported-in = Supported in { $supported }, but not widely supported in { $unsupported }
baseline-signals = Want more browser support for this feature? <a data-l10n-name="link">Tell us why.</a>

homepage-hero-title = Resources for Developers,<br> by Developers

playground-user-shared-warning = This is a user-shared playground.<br>Always inspect the code before running it.
homepage-hero-description = Documenting <a data-l10n-name="css">CSS</a>, <a data-l10n-name="html">HTML</a>, and <a data-l10n-name="js">JavaScript</a>, since 2005.

not-found-title = Page not found
not-found-description = Sorry, the page <code data-l10n-name="url">{ $url }</code> could not be found.
not-found-fallback-english = <strong data-l10n-name="strong">Good news:</strong> The page you requested exists in <em data-l10n-name="em">English</em>.
not-found-fallback-search = The page you requested doesn't exist, but you could try a site search for:
not-found-back = Go back to the home page

reference-toc-header = In this article

footer-copyright = Portions of this content are \xa91998–{ $year } by individual mozilla.org contributors. Content available under <a data-l10n-name="cc">a Creative Commons license</a>.

search-modal-site-search = Site search for <em>{ $query }</em>

site-search-search-stats = Found { $results } documents.
site-search-suggestion-matches =  { $relation ->
    [gt] more than { $matches ->
        [one]   { $matches } match
       *[other] { $matches } matches
    }
   *[eq] { $matches ->
        [one]   { $matches } match
       *[other] { $matches } matches
    }
}

blog-time-to-read = { $minutes ->
    [one]   { $minutes } minute read
   *[other] { $minutes } minutes read
}
blog-post-not-found = Blog post not found.

blog-previous = Previous post
blog-next = Next post

-brand-name-obs = HTTP Observatory
obs-report = Report
obs-title = { -brand-name-obs }
obs-landing-intro = Launched in 2016, the { -brand-name-obs } enhances web security by analyzing compliance with best security practices. It has provided insights to over 6.9 million websites through 47 million scans.
obs-assessment = Developed by Mozilla, the { -brand-name-obs } performs an in-depth assessment of a site’s HTTP headers and other key security configurations.
obs-scanning = Its automated scanning process provides developers and website administrators with detailed, actionable feedback, focusing on identifying and addressing potential security vulnerabilities.
obs-security = The tool is instrumental in helping developers and website administrators strengthen their sites against common security threats in a constantly advancing digital environment.
obs-mdn = The { -brand-name-obs } provides effective security insights, guided by Mozilla's expertise and commitment to a safer and more secure internet and based on well-established trends and guidelines.


compat-loading = Loading…
compat-js-required = Enable JavaScript to view this browser compatibility table.

compat-browser-version-date = { $browser } { $version } – Release date: { $date }
compat-browser-version-released = Release date: { $date }

compat-link-report-issue = Report problems with this compatibility data
compat-link-report-issue-title = Report an issue with this compatibility data
compat-link-report-missing-title = Report missing compatibility data
compat-link-report-missing = Report this issue
compat-link-source = View data on GitHub
compat-link-source-title = File: { $filename }

compat-deprecated = Deprecated
compat-experimental = Experimental
compat-nonstandard = Non-standard
compat-no = No

compat-support-full = Full support
compat-support-partial = Partial support
compat-support-no = No support
compat-support-unknown = Support unknown
compat-branch-prefix = Prefix: <code data-l10n-name="prefix">{ $prefix }</code>
compat-branch-altname = Alternate name: <code data-l10n-name="altname">{ $altname }</code>
compat-branch-prefix-altname = Prefix: <code data-l10n-name="prefix">{ $prefix }</code>, alternate name: <code data-l10n-name="altname">{ $altname }</code>
compat-support-removed = Removed in { $version } and later
compat-support-see-impl-url = See <a data-l10n-name="impl_url">{ $label }</a>
compat-support-flag-range =
    { $version_range ->
        [range] From version { $version_added } until { $version_last }, users
        [from] From version { $version_added }, users
        [until] Until { $version_last }, users
       *[none] Users
    } must explicitly set the <code data-l10n-name="name">{ $flag_name }</code> { $flag_type ->
       *[preference] preference
        [runtime_flag] runtime flag
    }{ $has_value ->
        [1] { " " }to <code data-l10n-name="value">{ $flag_value }</code>
       *[0] { "" }
    }.{ $has_pref_url ->
        [1]
            { $flag_type ->
                [preference] { " " }To change preferences in { $browser_name }, visit { $browser_pref_url }.
               *[other] { "" }
            }
       *[0] { "" }
    }
compat-legend = Legend
compat-legend-tip = Tip: you can click/tap on a cell for more information.
compat-legend-yes = { compat-support-full }
compat-legend-partial = { compat-support-partial }
compat-legend-preview = In development. Supported in a pre-release version.
compat-legend-no = { compat-support-no }
compat-legend-unknown = Compatibility unknown
compat-legend-experimental = { compat-experimental }. Expect behavior to change in the future.
compat-legend-nonstandard = { compat-nonstandard }. Check cross-browser support before using.
compat-legend-deprecated = { compat-deprecated }. Not for use in new websites.
compat-legend-footnote = See implementation notes.
compat-legend-disabled = User must explicitly enable this feature.
compat-legend-altname = Uses a non-standard name.
compat-legend-prefix = Requires a vendor prefix or different name for use.
compat-legend-more = Has more compatibility info.

placement-note = Ad
placement-no = Don't want to see ads?

pagination-next = Next page
pagination-prev = Previous page
pagination-current = Current page
pagination-goto = Go to page { $page }

logout = Sign out
login = Log in

example-play-button-label = Play
example-play-button-title = Run example in MDN Playground (opens in new tab)

content-feedback-question = Was this page helpful to you?
content-feedback-reason = Why was this page not helpful to you?
content-feedback-thanks = Thank you for your feedback!

writer-reload-polling = Polling every { $seconds }s
`;
      o.d(t, {}, { default: a });
    },
    96191(e, t, o) {
      var a = o(22009),
        r = o(31601),
        n = o.n(r),
        l = o(76314),
        s = o.n(l),
        i = o(33208),
        c = s()(n());
      (c.i(i.A),
        c.push([
          e.id,
          ':host{display:inline-flex;vertical-align:middle}.button{box-sizing:border-box;height:100%;width:100%}',
          ''
        ]));
      let d = (0, a.AH)([c.toString()]);
      o.d(t, {}, { A: d });
    },
    3971(e, t, o) {
      var a = o(22009),
        r = o(31601),
        n = o.n(r),
        l = o(76314),
        s = o.n(l),
        i = o(4417),
        c = o.n(i),
        d = new o.U(o(70054)),
        g = s()(n()),
        u = c()(d);
      g.push([
        e.id,
        `*,:after,:before{box-sizing:border-box}dialog{border:0;overscroll-behavior:contain;padding:0}@media (width > 1044px){dialog{background-color:var(--color-background-primary);border:1px solid var(--color-border-primary);border-radius:.5rem;font-size:var(--font-size-large);margin:calc(var(--sticky-header-height) + 1rem) auto 1rem;max-height:calc(100% - var(--sticky-header-height) - 2rem);width:calc(var(--layout-content-max) + 1rem)}dialog::backdrop{--csstools-light-dark-toggle-dee8eb9e-0:var(--csstools-color-scheme--light) var(--color-black-alpha-75);-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);background-color:var(--csstools-light-dark-toggle-dee8eb9e-0,var(--color-white-alpha-75))}@supports (color:light-dark(red,red)){dialog::backdrop{background-color:light-dark(var(--color-white-alpha-75),var(--color-black-alpha-75))}}}@media (width <= 1044px){dialog{font-size:var(--font-size-normal);height:100%;margin:0;max-height:100%;max-width:100%;width:100%}}dialog[open]{display:flex;flex-direction:column}progress{flex-shrink:0;margin:0 1rem .5rem}@media (width <= 1044px){progress{margin-inline:.3rem}}.header{align-items:center;display:flex;flex-shrink:0;height:var(--navigation-height)}.close{font-size:1.37rem}@media (width > 1044px){.close{display:none}}form{display:grid;flex:1;gap:.5rem;grid-template-columns:min-content 1fr;padding:1rem;place-items:center}@media (width <= 1044px){form{align-self:center;background-color:var(--color-background-primary);border:1px solid var(--color-border-primary);border-radius:.5rem;margin-left:.3rem;padding:.5rem}}form:before{background-color:var(--color-border-secondary);content:"";height:1em;mask-image:url(${u});mask-size:contain;width:1em}input{background-color:initial;border:none;font-size:inherit;margin:0;outline:none;padding:0;width:100%}input::placeholder{color:var(--color-text-secondary)}ul{margin:0;overflow:auto;padding:0}ul:has(li){border-top:1px solid var(--color-border-primary)}li[data-selected]{background:var(--color-background-blue);border-color:var(--color-blue-50)}li{border-inline-start:2px solid #0000;list-style-type:none}li:not([data-selected]):hover{background-color:var(--color-background-secondary)}li>*{padding:.5rem 1.5rem;width:100%}a{color:var(--color-link-normal);display:grid;-webkit-text-decoration:none;text-decoration:none}a:visited{color:var(--color-link-visited)}.slug{color:var(--color-text-secondary);font-size:var(--font-size-small)}mark{background-color:var(--color-background-yellow);color:var(--color-text-primary)}`,
        ''
      ]);
      let h = (0, a.AH)([g.toString()]);
      o.d(t, {}, { A: h });
    },
    10336(e, t, o) {
      var a = o(22009);
      let r = (0,
      a.JW)`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>`;
      o.d(t, {}, { A: r });
    },
    95061(e, t, o) {
      var a = {
        './code-example/element.js': ['84352', [7489, 1861, 1598, 7065]],
        './dropdown/element.js': ['58623', [2868]],
        './live-sample-result/element.js': [
          '47849',
          [7489, 3708, 5950, 4098, 1861, 8401]
        ],
        './observatory-tests-and-scores/element.js': ['56538', [6407]],
        './play-runner/element.js': ['63657', [7489, 5950, 4098, 1721]],
        './search-button/element.js': ['23745', [3690]],
        './survey/element.js': ['10423', [7489, 8121, 5196]],
        './ix-tab-wrapper/element.js': ['49979', [2568]],
        './placement-sidebar/element.js': [
          '57468',
          [7489, 3708, 8280, 1477, 4249, 2173]
        ],
        './placement-hp-main/element.js': [
          '44394',
          [7489, 3708, 8280, 1477, 4249, 4759]
        ],
        './record-visit/element.js': ['55237', [5562, 3094]],
        './toggle-sidebar/element.js': ['39337', [9234]],
        './user-menu/element.js': ['74354', [2868, 8121, 3711]],
        './interactive-example/element.js': [
          '79879',
          [
            7489, 749, 8520, 3649, 6216, 2080, 640, 9515, 2135, 5950, 4098,
            3818, 3047, 1861, 2448, 1598, 4419, 7065, 2568, 5338, 9404
          ]
        ],
        './copy-button/element.js': ['65517', [1598]],
        './observatory-comparison-table/element.js': ['50117', [8160, 2006]],
        './sidebar-filter/element.js': ['50128', [169]],
        './issues-table/element.js': ['37511', [4204]],
        './scrim-inline/element.js': ['33878', [7489, 3708, 1691]],
        './switch/element.js': ['41798', [9099]],
        './collection-save-button/element.js': ['1355', [3980, 4920]],
        './contributor-list/element.js': ['23082', [9127]],
        './button/element.js': ['35268', []],
        './homepage-search/element.js': ['27373', [7678]],
        './modal/element.js': ['14903', [3980]],
        './color-theme/element.js': ['55269', [2868, 5542]],
        './about-team-member/element.js': ['612', [8981]],
        './content-feedback/element.js': ['65929', [7938]],
        './play-console/element.js': ['56369', [3818]],
        './ix-tab/element.js': ['18977', [4419, 5338]],
        './observatory-header-link/element.js': ['1879', [8160, 3676]],
        './curriculum-tabs/element.js': ['52500', [9717]],
        './placement-bottom/element.js': [
          '7895',
          [7489, 3708, 8280, 1477, 4249, 4060]
        ],
        './image-history/element.js': ['47706', [1975]],
        './not-found/element.js': ['2622', [8926, 3555]],
        './placement-note/element.js': ['47764', [1477]],
        './compat-table-lazy/element.js': ['96678', [7489, 8121, 8067, 251]],
        './site-search/element.js': ['53163', [9784]],
        './placement-no/element.js': ['13755', [8280]],
        './play-controller/element.js': ['23731', [2448]],
        './placement-top/element.js': [
          '9951',
          [7489, 3708, 8280, 1477, 4249, 9204]
        ],
        './observatory-form/element.js': ['17547', [7489, 6110, 1672]],
        './observatory-results/element.js': [
          '23247',
          [2868, 8160, 6110, 2006, 3676, 921, 4070, 9764]
        ],
        './about-tabs/element.js': ['54842', [7047]],
        './observatory-human-duration/element.js': ['37077', [8160, 4070]],
        './playground/element.js': [
          '28940',
          [
            7489, 749, 8520, 3649, 6216, 2080, 640, 9515, 5950, 4098, 3818,
            3047, 2448, 3980, 3416
          ]
        ],
        './ix-tab-panel/element.js': ['89854', [4419]],
        './play-editor/element.js': [
          '63386',
          [749, 8520, 3649, 6216, 2080, 640, 9515, 5950, 3047]
        ],
        './themed-image/element.js': ['48125', [5102]],
        './writer-open-editor/element.js': ['51310', [1315]],
        './progress-bar/element.js': ['20141', [6110]],
        './compat-table/element.js': ['7086', [7489, 8121, 8067]],
        './login-button/element.js': ['70242', [6319]],
        './observatory-rescan-button/element.js': ['14416', [921, 3140]],
        './recently-visited/element.js': ['95821', [5562, 5246]],
        './language-always-redirect-button/element.js': ['77108', [9647, 5685]],
        './language-switcher/element.js': [
          '48423',
          [2868, 9099, 9647, 8926, 1996]
        ],
        './search-modal/element.js': ['97154', []],
        './writer-reload/element.js': ['14925', [4366]]
      };
      function r(e) {
        if (!o.o(a, e))
          return Promise.resolve().then(() => {
            var t = Error("Cannot find module '" + e + "'");
            throw ((t.code = 'MODULE_NOT_FOUND'), t);
          });
        var t = a[e],
          r = t[0];
        return Promise.all(
          t[1].map(function (e) {
            return o.e(e);
          })
        ).then(() => o(r));
      }
      ((r.keys = () => Object.keys(a)), (r.id = 95061), (e.exports = r));
    },
    91369(e, t, o) {
      var a = {
        './en-US.ftl': ['537', []],
        './es.ftl': ['59137', [7898]],
        './de.ftl': ['89516', [6333]],
        './pt-BR.ftl': ['27146', [8839]],
        './ja.ftl': ['68942', [7027]],
        './zh-TW.ftl': ['81023', [8964]],
        './fr.ftl': ['23293', [1550]],
        './ru.ftl': ['40730', [3255]],
        './zh-CN.ftl': ['39555', [9456]],
        './ko.ftl': ['45687', [8604]]
      };
      function r(e) {
        if (!o.o(a, e))
          return Promise.resolve().then(() => {
            var t = Error("Cannot find module '" + e + "'");
            throw ((t.code = 'MODULE_NOT_FOUND'), t);
          });
        var t = a[e],
          r = t[0];
        return Promise.all(
          t[1].map(function (e) {
            return o.e(e);
          })
        ).then(() => o(r));
      }
      ((r.keys = () => Object.keys(a)), (r.id = 91369), (e.exports = r));
    },
    33208(e, t, o) {
      var a = o(31601),
        r = o.n(a),
        n = o(76314),
        l = o.n(n)()(r());
      l.push([
        e.id,
        '.button{align-items:center;background-color:initial;border:1px solid #0000;border-radius:.25rem;color:var(--color-text-primary);column-gap:.3125em;cursor:pointer;display:inline-flex;font-family:var(--font-family-text);font-size:.875em;font-weight:450;justify-content:center;line-height:var(--font-line-ui);margin:0;padding:.5em;-webkit-text-decoration:none;text-decoration:none;vertical-align:middle}.button[data-variant=primary]{--csstools-light-dark-toggle-4dae8a1e-0:var(--csstools-color-scheme--light) var(--color-black);color:var(--csstools-light-dark-toggle-4dae8a1e-0,var(--color-white));--csstools-light-dark-toggle-4dae8a1e-1:var(--csstools-color-scheme--light) var(--color-white);background-color:var(--csstools-light-dark-toggle-4dae8a1e-1,var(--color-black))}@supports (color:light-dark(red,red)){.button[data-variant=primary]{background-color:light-dark(var(--color-black),var(--color-white));color:light-dark(var(--color-white),var(--color-black))}}.button[data-variant=primary]:hover{--csstools-light-dark-toggle-4dae8a1e-2:var(--csstools-color-scheme--light) var(--color-gray-60);background-color:var(--csstools-light-dark-toggle-4dae8a1e-2,var(--color-gray-40))}@supports (color:light-dark(red,red)){.button[data-variant=primary]:hover{background-color:light-dark(var(--color-gray-40),var(--color-gray-60))}}.button[data-variant=primary][data-action=positive]{color:var(--color-white);--csstools-light-dark-toggle-4dae8a1e-3:var(--csstools-color-scheme--light) var(--color-green-20);background-color:var(--csstools-light-dark-toggle-4dae8a1e-3,var(--color-green-50))}@supports (color:light-dark(red,red)){.button[data-variant=primary][data-action=positive]{background-color:light-dark(var(--color-green-50),var(--color-green-20))}}.button[data-variant=primary][data-action=positive]:hover{--csstools-light-dark-toggle-4dae8a1e-4:var(--csstools-color-scheme--light) var(--color-green-50);background-color:var(--csstools-light-dark-toggle-4dae8a1e-4,var(--color-green-20))}@supports (color:light-dark(red,red)){.button[data-variant=primary][data-action=positive]:hover{background-color:light-dark(var(--color-green-20),var(--color-green-50))}}.button[data-variant=primary][data-action=negative]{color:var(--color-white);--csstools-light-dark-toggle-4dae8a1e-5:var(--csstools-color-scheme--light) var(--color-red-20);background-color:var(--csstools-light-dark-toggle-4dae8a1e-5,var(--color-red-50))}@supports (color:light-dark(red,red)){.button[data-variant=primary][data-action=negative]{background-color:light-dark(var(--color-red-50),var(--color-red-20))}}.button[data-variant=primary][data-action=negative]:hover{--csstools-light-dark-toggle-4dae8a1e-6:var(--csstools-color-scheme--light) var(--color-red-50);background-color:var(--csstools-light-dark-toggle-4dae8a1e-6,var(--color-red-20))}@supports (color:light-dark(red,red)){.button[data-variant=primary][data-action=negative]:hover{background-color:light-dark(var(--color-red-20),var(--color-red-50))}}.button[data-variant=secondary]{border-color:currentcolor}.button[data-variant=secondary]:hover{--csstools-light-dark-toggle-4dae8a1e-7:var(--csstools-color-scheme--light) var(--color-gray-40);background-color:var(--csstools-light-dark-toggle-4dae8a1e-7,var(--color-gray-80))}@supports (color:light-dark(red,red)){.button[data-variant=secondary]:hover{background-color:light-dark(var(--color-gray-80),var(--color-gray-40))}}.button[data-variant=secondary][data-action=positive]{--csstools-light-dark-toggle-4dae8a1e-8:var(--csstools-color-scheme--light) var(--color-green-80);color:var(--csstools-light-dark-toggle-4dae8a1e-8,var(--color-green-20))}@supports (color:light-dark(red,red)){.button[data-variant=secondary][data-action=positive]{color:light-dark(var(--color-green-20),var(--color-green-80))}}.button[data-variant=secondary][data-action=positive]:hover{--csstools-light-dark-toggle-4dae8a1e-9:var(--csstools-color-scheme--light) var(--color-green-20);background-color:var(--csstools-light-dark-toggle-4dae8a1e-9,var(--color-green-90))}@supports (color:light-dark(red,red)){.button[data-variant=secondary][data-action=positive]:hover{background-color:light-dark(var(--color-green-90),var(--color-green-20))}}.button[data-variant=secondary][data-action=negative]{--csstools-light-dark-toggle-4dae8a1e-10:var(--csstools-color-scheme--light) var(--color-red-80);color:var(--csstools-light-dark-toggle-4dae8a1e-10,var(--color-red-50))}@supports (color:light-dark(red,red)){.button[data-variant=secondary][data-action=negative]{color:light-dark(var(--color-red-50),var(--color-red-80))}}.button[data-variant=secondary][data-action=negative]:hover{--csstools-light-dark-toggle-4dae8a1e-11:var(--csstools-color-scheme--light) var(--color-red-80);color:var(--csstools-light-dark-toggle-4dae8a1e-11,var(--color-red-20));--csstools-light-dark-toggle-4dae8a1e-12:var(--csstools-color-scheme--light) var(--color-red-10);background-color:var(--csstools-light-dark-toggle-4dae8a1e-12,var(--color-red-90))}@supports (color:light-dark(red,red)){.button[data-variant=secondary][data-action=negative]:hover{background-color:light-dark(var(--color-red-90),var(--color-red-10));color:light-dark(var(--color-red-20),var(--color-red-80))}}.button[data-variant=plain]:hover{--csstools-light-dark-toggle-4dae8a1e-13:var(--csstools-color-scheme--light) var(--color-gray-40);background-color:var(--csstools-light-dark-toggle-4dae8a1e-13,var(--color-gray-80))}@supports (color:light-dark(red,red)){.button[data-variant=plain]:hover{background-color:light-dark(var(--color-gray-80),var(--color-gray-40))}}.button[data-variant=plain][data-action=positive]{--csstools-light-dark-toggle-4dae8a1e-14:var(--csstools-color-scheme--light) var(--color-green-80);color:var(--csstools-light-dark-toggle-4dae8a1e-14,var(--color-green-20))}@supports (color:light-dark(red,red)){.button[data-variant=plain][data-action=positive]{color:light-dark(var(--color-green-20),var(--color-green-80))}}.button[data-variant=plain][data-action=positive]:hover{--csstools-light-dark-toggle-4dae8a1e-15:var(--csstools-color-scheme--light) var(--color-green-20);background-color:var(--csstools-light-dark-toggle-4dae8a1e-15,var(--color-green-90))}@supports (color:light-dark(red,red)){.button[data-variant=plain][data-action=positive]:hover{background-color:light-dark(var(--color-green-90),var(--color-green-20))}}.button[data-variant=plain][data-action=negative]{--csstools-light-dark-toggle-4dae8a1e-16:var(--csstools-color-scheme--light) var(--color-red-80);color:var(--csstools-light-dark-toggle-4dae8a1e-16,var(--color-red-50))}@supports (color:light-dark(red,red)){.button[data-variant=plain][data-action=negative]{color:light-dark(var(--color-red-50),var(--color-red-80))}}.button[data-variant=plain][data-action=negative]:hover{--csstools-light-dark-toggle-4dae8a1e-17:var(--csstools-color-scheme--light) var(--color-red-80);color:var(--csstools-light-dark-toggle-4dae8a1e-17,var(--color-red-20));--csstools-light-dark-toggle-4dae8a1e-18:var(--csstools-color-scheme--light) var(--color-red-10);background-color:var(--csstools-light-dark-toggle-4dae8a1e-18,var(--color-red-90))}@supports (color:light-dark(red,red)){.button[data-variant=plain][data-action=negative]:hover{background-color:light-dark(var(--color-red-90),var(--color-red-10));color:light-dark(var(--color-red-20),var(--color-red-80))}}.button[disabled]{--csstools-light-dark-toggle-4dae8a1e-19:var(--csstools-color-scheme--light) var(--color-gray-60)!important;color:var(--csstools-light-dark-toggle-4dae8a1e-19,var(--color-gray-40))!important;cursor:default;--csstools-light-dark-toggle-4dae8a1e-20:var(--csstools-color-scheme--light) var(--color-gray-20)!important;background-color:var(--csstools-light-dark-toggle-4dae8a1e-20,var(--color-gray-80))!important;border-color:#0000}@supports (color:light-dark(red,red)){.button[disabled]{background-color:light-dark(var(--color-gray-80),var(--color-gray-20))!important;color:light-dark(var(--color-gray-40),var(--color-gray-60))!important}}.button .icon{display:flex}.button svg{height:1.25em;width:1.25em}.button .label{padding-block:.125em;padding-inline:.0625em}',
        ''
      ]);
      let s = l.toString();
      o.d(t, {}, { A: s });
    },
    70054(e, t, o) {
      e.exports = o.p + 'search.5dd31cbeea7d1af9.svg';
    },
    51874() {
      try {
        let t = document.querySelector('.baseline-indicator');
        if (t instanceof HTMLDetailsElement) {
          let { openByDefault: o } = t.dataset;
          void 0 === o &&
            (t.addEventListener('toggle', () => {
              e(t.open);
            }),
            e(t.open));
        }
        function e(e) {
          e
            ? localStorage.setItem('baseline-indicator', 'open')
            : localStorage.removeItem('baseline-indicator');
        }
      } catch (e) {
        console.warn('Unable to attach to baseline indicator', e);
      }
    },
    35268(e, t, o) {
      (o.r(t), o.d(t, { MDNButton: () => MDNButton }));
      var a = o(22009),
        r = o(96191),
        n = o(12477),
        l = o(81519);
      let MDNButton = class MDNButton extends a.WF {
        static styles = r.A;
        static get properties() {
          return {
            disabled: { type: Boolean },
            variant: { type: String },
            action: { type: String },
            icon: { state: !0 },
            iconOnly: { type: Boolean, attribute: 'icon-only' },
            iconPosition: { type: String, attribute: 'icon-position' },
            href: { type: String },
            target: { type: String },
            rel: { type: String }
          };
        }
        constructor() {
          (super(),
            (this.disabled = !1),
            (this.icon = void 0),
            (this.iconOnly = !1),
            (this.iconPosition = 'before'),
            (this.variant = 'primary'),
            (this.action = void 0),
            (this.href = void 0),
            (this.target = void 0),
            (this.rel = void 0));
        }
        render() {
          return (function ({
            label: e,
            icon: t,
            iconOnly: o,
            iconPosition: r,
            disabled: s = !1,
            href: i,
            target: c,
            rel: d,
            variant: g = 'primary',
            action: u
          }) {
            let h = (0, l.O)('label-'),
              m = t
                ? (0, a.qy)`<span class="icon" part="icon">${t}</span>`
                : a.s6,
              p = (0, a.qy)`
    <span id=${h} class="label" ?hidden=${o} part="label"
      >${e}</span
    >
  `,
              v = 'after' === r ? [p, m] : [m, p];
            return i
              ? (0, a.qy)`
        <a
          class="button"
          href=${i}
          target=${(0, n.J)(c)}
          rel=${(0, n.J)(d)}
          aria-labelledby=${h}
          data-variant=${(0, n.J)(g)}
          data-action=${(0, n.J)(u)}
          part="button"
        >
          ${v}
        </a>
      `
              : (0, a.qy)`
        <button
          class="button"
          aria-labelledby=${h}
          ?disabled=${s}
          data-variant=${(0, n.J)(g)}
          data-action=${(0, n.J)(u)}
          part="button"
        >
          ${v}
        </button>
      `;
          })({
            label: (0, a.qy)`<slot></slot>`,
            disabled: this.disabled,
            icon: this.icon,
            iconOnly: this.iconOnly,
            iconPosition: this.iconPosition,
            variant: this.variant,
            action: this.action,
            href: this.href,
            target: this.target,
            rel: this.rel
          });
        }
      };
      customElements.define('mdn-button', MDNButton);
    },
    22207(e, t, o) {
      o.d(t, {
        iW: () => f,
        vQ: () => u,
        kv: () => h,
        g_: () => p,
        i7: () => v,
        _0: () => m,
        Q: () => y,
        tf: () => i,
        sR: () => c,
        mR: () => g,
        I: () => d,
        QD: () => b
      });
      let a = [],
        r = n('RUNTIME_ENV', !0);
      function n(e, t, o) {
        try {
          return !!JSON.parse(s(e, o) || JSON.stringify(t));
        } catch {
          return t;
        }
      }
      function l(e, t, o) {
        let a = s(e, o),
          r = a ? Number.parseInt(a, 10) : t;
        return Number.isNaN(r) ? t : r;
      }
      function s(e, t = {}) {
        let { runtime: o } = { runtime: !1, ...t },
          n = `FRED_${e}`;
        return o && r
          ? (a.push(n), globalThis.process?.env[n] || s(e))
          : {
              FRED_RUNTIME_ENV: 'true',
              FRED_PLAYGROUND_LOCAL: 'false',
              FRED_LEGACY: 'true'
            }[n];
      }
      let i = s('PLAYGROUND_BASE_HOST', void 0) || 'mdnplay.dev',
        c = n('PLAYGROUND_LOCAL', !1, { runtime: !0 }),
        d = l('PORT', 3e3, { runtime: !0 });
      n('OPEN_BROWSER_ON_START', !1, { runtime: !0 });
      let g = l('PLAYGROUND_PORT', 3001, { runtime: !0 }),
        u = s('FXA_SIGNIN_URL', void 0) || '/users/fxa/login/authenticate/',
        h = s('FXA_SIGNOUT_URL', void 0) || '/users/fxa/login/logout/',
        m = n('GLEAN_ENABLED', !1),
        p = s('GLEAN_CHANNEL', void 0) || 'dev',
        v = n('GLEAN_DEBUG', !1);
      n('ROBOTS_GLOBAL_ALLOW', !0);
      let b = n('WRITER_MODE', !1, { runtime: !0 }),
        f = s('BCD_BASE_URL', void 0) || 'https://bcd.developer.mozilla.org',
        y =
          s('OBSERVATORY_API_URL', void 0) ||
          'https://observatory-api.mdn.mozilla.net';
      s('TRANSCEND_AIRGAP_URL', void 0);
    },
    36153() {
      let e = document.querySelector('[aria-controls="navigation__popup"]'),
        t = document.querySelector('.navigation');
      e instanceof HTMLElement &&
        t instanceof HTMLElement &&
        e.addEventListener('click', () => {
          let o = ('true' !== t.dataset.open).toString();
          ((t.dataset.open = o), e.setAttribute('aria-expanded', o));
        });
    },
    97154(e, t, o) {
      o.r(t);
      var a = o(36085),
        r = o(22009),
        n = o(70693),
        l = o(23727),
        s = o(14632),
        i = o(10336),
        c = o(3971);
      o(35268);
      let MDNSearchModal = class MDNSearchModal extends (0, n.J)(r.WF) {
        static ssr = !1;
        static styles = c.A;
        static get properties() {
          return {
            _index: { state: !0 },
            _query: { state: !0 },
            _selected: { state: !0 },
            _shiftFocus: { state: !0 }
          };
        }
        constructor() {
          (super(),
            (this._index = void 0),
            (this._query = ''),
            (this._selected = 0),
            (this._shiftFocus = !1),
            (this._hasEngaged = !1));
        }
        async _loadIndex() {
          this._index || (this._index = this._fetchIndex());
        }
        async _fetchIndex() {
          let e = await fetch(`/${this.locale}/search-index.json`),
            t = await e.json();
          return {
            flex: t.map(({ title: e, url: t }, o) => ({
              index: o,
              title: e.toLowerCase(),
              slugTail: t.split('/').pop()?.toLowerCase() || ''
            })),
            items: t
          };
        }
        showModal() {
          (this._loadIndex(),
            this.shadowRoot?.querySelector('dialog')?.showModal(),
            this.shadowRoot?.querySelector('input')?.select());
        }
        _input({ inputType: e, target: t }) {
          t instanceof HTMLInputElement &&
            ((this._query = t.value),
            !this._hasEngaged &&
              e.startsWith('insert') &&
              ((this._hasEngaged = !0),
              (0, l.w)(
                `quick-search-change: ${'insertFromPaste' === e ? 'paste' : 'type'}`
              )));
        }
        _keydown(e) {
          switch (e.key) {
            case 'ArrowUp':
              (e.preventDefault(), this._select(this._selected - 1));
              break;
            case 'ArrowDown':
              (e.preventDefault(), this._select(this._selected + 1));
              break;
            case 'Enter': {
              let { ctrlKey: t, shiftKey: o, altKey: a, metaKey: r } = e,
                n = this._getSelectedItem();
              n instanceof HTMLElement &&
                (e.preventDefault(),
                n.dispatchEvent(
                  new MouseEvent('click', {
                    bubbles: !0,
                    composed: !0,
                    ctrlKey: t,
                    shiftKey: o,
                    altKey: a,
                    metaKey: r
                  })
                ));
              break;
            }
            default:
              return;
          }
        }
        _getSelectedItem() {
          return this.shadowRoot?.querySelector('[data-selected] a') ?? null;
        }
        _select(e) {
          let t = (this._queryIndex.value?.length || 0) + 1,
            o = e % t;
          ((this._selected = o < 0 ? t + e : o),
            setTimeout(() => {
              let e = this._getSelectedItem();
              e instanceof HTMLElement &&
                e.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 0));
        }
        _submit(e) {
          e.preventDefault();
          let t = this._getSelectedItem();
          t instanceof HTMLElement && t.click();
        }
        _focus({ target: e }) {
          if (e instanceof HTMLElement) {
            let t = e.closest('[data-result]');
            if (t instanceof HTMLElement) {
              let e = Number.parseInt(t.dataset.result || 'NaN', 10);
              Number.isNaN(e) ||
                ((this._selected = e), (this._shiftFocus = !0));
            } else this._shiftFocus = !1;
          }
        }
        _globalKeydown(e) {
          let t = e.composedPath()?.[0] || e.target;
          if (
            t instanceof HTMLElement &&
            (['TEXTAREA', 'INPUT'].includes(t.tagName) || t.isContentEditable)
          )
            return;
          let o = globalThis.getSelection()?.toString(),
            a = e.key,
            r = e.ctrlKey || e.metaKey,
            n = '/' === a && !r,
            s = 'k' === a && r && !e.shiftKey;
          (n || s) &&
            (e.preventDefault(),
            (0, l.w)(
              `quick-search-open: keyboard -> ${n ? 'slash' : 'ctrl-k'}`
            ),
            this.showModal(),
            o &&
              ((this._query = o),
              this._hasEngaged ||
                ((this._hasEngaged = !0),
                (0, l.w)('quick-search-change: selection'))));
        }
        _queryIndex = new a.YZ(this, {
          args: () => [this._index, this._query],
          task: async ([e, t]) => {
            if (e && t) {
              var o, a;
              let r, n;
              return (
                (o = t),
                (a = await e),
                (r = o.toLowerCase().trim()),
                (n = d(o)),
                a.flex
                  .filter(({ title: e }) => n.every(t => e.includes(t)))
                  .map(({ index: e, title: t, slugTail: o }) => [
                    Number([t, o].includes(r)),
                    e
                  ])
                  .sort(([e], [t]) => t - e)
                  .map(([e, t]) => t)
                  .slice(0, 10)
                  .map(e => (a.items || [])[e])
                  .filter(e => void 0 !== e)
              );
            }
          }
        });
        _close() {
          this.shadowRoot?.querySelector('dialog')?.close();
        }
        _toggle({ newState: e }) {
          document.documentElement.classList.toggle(
            'search-modal-open',
            'open' === e
          );
        }
        connectedCallback() {
          (super.connectedCallback(),
            (this._globalKeydown = this._globalKeydown.bind(this)),
            document.addEventListener('keydown', this._globalKeydown),
            (this._loadIndex = this._loadIndex.bind(this)),
            this.renderRoot.addEventListener('mouseover', this._loadIndex));
        }
        disconnectedCallback() {
          (super.disconnectedCallback(),
            this.renderRoot.removeEventListener('mouseover', this._loadIndex),
            document.removeEventListener('keydown', this._globalKeydown),
            document.documentElement.classList.remove('search-modal-open'));
        }
        _renderLoadingSearchIndex() {
          return (0, r.qy)`<progress
      aria-label=${this.l10n('search-modal-loading-search-index')`Loading search index…`}
    ></progress>`;
        }
        render() {
          let e = this._queryIndex.value?.length || 0,
            t = this._query
              ? `/${this.locale}/search?${new URLSearchParams({ q: this._query })}`
              : null;
          return (0, r.qy)`
      <dialog
        @keydown=${this._keydown}
        @focusin=${this._focus}
        @toggle=${this._toggle}
        closedby="any"
      >
        <div class="header">
          <form
            method="get"
            action=${`/${this.locale}/search`}
            @submit=${this._submit}
          >
            <input
              type="search"
              name="q"
              .value=${this._query}
              autocomplete="off"
              autofocus
              @input=${this._input}
              placeholder=${this.l10n('search-modal-search')`Search`}
              aria-label=${this.l10n('search-modal-search')`Search`}
            />
          </form>
          <mdn-button
            class="close"
            variant="plain"
            icon-only
            .icon=${i.A}
            @click=${this._close}
            >${this.l10n('search-modal-exit-search')`Exit search`}</mdn-button
          >
        </div>
        ${this._queryIndex.render({ initial: this._renderLoadingSearchIndex.bind(this), pending: this._renderLoadingSearchIndex.bind(this) })}
        <ul>
          ${this._queryIndex.render({
            complete: e =>
              e?.map(({ title: e, url: t }, o) => {
                var a;
                let n, l;
                return (0, r.qy)`
                  <li ?data-selected=${this._selected === o} data-result=${o}>
                    <a
                      href=${t}
                      data-glean-id=${`quick-search: results[${1 + o}] -> ${this._query} -> ${t}`}
                      ><span class="slug"
                        >${(0, s.o)(t, this.locale)}</span
                      >
                      <span class="title"
                        >${
                          ((a = e),
                          (l = (n = d(this._query))
                            .map(e =>
                              e.replaceAll(
                                /[.*+?^${}()|[\]\\]/g,
                                String.raw`\$&`
                              )
                            )
                            .map(e => `(${e})`)
                            .join('|')),
                          a
                            .split(RegExp(l, 'gi'))
                            .filter(Boolean)
                            .map(e =>
                              n.includes(e.toLowerCase())
                                ? (0, r.qy)`<mark>${e}</mark>`
                                : e
                            ))
                        }</span
                      ></a
                    >
                  </li>
                `;
              })
          })}
          ${
            t
              ? (0, r.qy)`<li
                  ?data-selected=${this._selected === e}
                  data-result=${e}
                >
                  <a
                    href=${t}
                    data-glean-id=${`quick-search: site-search -> ${this._query}`}
                    ><span class="title"
                      >${this.l10n.raw({ id: 'search-modal-site-search', args: { query: this._query }, elements: { query: { tag: 'code' } } })}</span
                    ></a
                  >
                </li>`
              : r.s6
          }
        </ul>
      </dialog>
    `;
        }
        updated() {
          if (this._shiftFocus) {
            let e = this._getSelectedItem();
            e instanceof HTMLElement && e.focus();
          }
        }
      };
      function d(e) {
        return (e = e.trim().toLowerCase()).startsWith('.') || e.endsWith('.')
          ? e.split(/[ ,]+/)
          : e.split(/[ ,.]+/);
      }
      (customElements.define('mdn-search-modal', MDNSearchModal),
        o.d(t, { MDNSearchModal: () => MDNSearchModal, splitQuery: () => d }));
    },
    45742(e, t, o) {
      let a;
      var r = o(22207);
      let n = { country: 'United States', country_iso: 'US' },
        l = {
          username: null,
          isAuthenticated: !1,
          avatarUrl: null,
          isSubscriber: !1,
          subscriptionType: null,
          email: null,
          geo: n,
          settings: null
        };
      function s() {
        return r.QD
          ? new Promise(() => {})
          : (a || (a = i().catch(e => (console.error(e), l))), a);
      }
      async function i() {
        let e = await fetch('/api/v1/whoami');
        if (!e.ok) throw Error(e.statusText);
        try {
          let t = await e.json(),
            o = t?.settings
              ? {
                  aiHelpHistory:
                    'boolean' == typeof t.settings?.ai_help_history
                      ? t.settings.ai_help_history
                      : null,
                  noAds: t.settings?.no_ads ?? null
                }
              : l.settings;
          return (
            (c.noAds = o?.noAds || !1),
            {
              username: t.username ?? l.username,
              isAuthenticated: t.is_authenticated ?? l.isAuthenticated,
              avatarUrl: t.avatar_url ?? l.avatarUrl,
              isSubscriber: t.is_subscriber ?? l.isSubscriber,
              subscriptionType:
                'core' === t.subscription_type
                  ? 'mdn_core'
                  : (t.subscription_type ?? l.subscriptionType),
              email: t.email ?? l.email,
              geo: {
                country: (t.geo && t.geo.country) ?? n.country,
                country_iso: (t.geo && t.geo.country_iso) ?? n.country_iso
              },
              settings: o
            }
          );
        } catch {
          throw Error(e.statusText);
        }
      }
      let c = {
        set noAds(value) {
          value
            ? globalThis.localStorage.setItem('nop', 'yes')
            : globalThis.localStorage.removeItem('nop');
        },
        get noAds() {
          return globalThis.localStorage?.getItem?.('nop') === 'yes';
        }
      };
      o.d(t, { L: () => s });
    },
    81519(e, t, o) {
      function a(e = 'id-') {
        return Math.random().toString(36).replace('0.', e);
      }
      o.d(t, { O: () => a });
    },
    18376(e, t, o) {
      let a = { threshold: 0.5 };
      let ViewedObserver = class ViewedObserver {
        #e;
        #t;
        #o;
        #a = null;
        #r = null;
        #n = !1;
        #l = !globalThis.document?.hidden;
        #s = this.#i.bind(this);
        constructor(e, t, o = a) {
          ((this.#e = e), (this.#t = t), (this.#o = o));
        }
        connect() {
          (document.addEventListener('visibilitychange', this.#s),
            (this.#a = new IntersectionObserver(e => {
              for (let t of e) this.#c(t.isIntersecting);
            }, this.#o)),
            this.#a.observe(this.#e));
        }
        disconnect() {
          (this.#a && (this.#a.disconnect(), (this.#a = null)),
            null !== this.#r && (clearTimeout(this.#r), (this.#r = null)),
            document.removeEventListener('visibilitychange', this.#s));
        }
        #i() {
          ((this.#l = !document.hidden), this.#c());
        }
        #c(e = !1) {
          !this.#n && this.#l && e
            ? null === this.#r &&
              (this.#r = globalThis.setTimeout(() => {
                ((this.#n = !0), this.#t());
              }, 1e3))
            : null !== this.#r && (clearTimeout(this.#r), (this.#r = null));
        }
      };
      o.d(t, { x: () => ViewedObserver });
    },
    33779(e, t, o) {
      o.a(e, async function (e, t) {
        try {
          (o(95831), o(98821), o(41857), o(98769));
          var a = o(17765);
          (o(31557), o(51874), o(70315), o(36153), o(70408));
          var r = o(88068),
            n = o(76787);
          o(98109);
          var l = o(15381),
            s = e([a, r, n, l]);
          (([a, r, n, l] = s.then ? (await s)() : s), t());
        } catch (e) {
          t(e);
        }
      });
    },
    88068(e, t, o) {
      o.a(
        e,
        async function (e, t) {
          try {
            for (let e of document.querySelectorAll(
              'div.code-example pre:not(.hidden):not([class*="live-sample"]):not([class*="interactive-example"])'
            )) {
              let { upgradePre: t } = await Promise.all([
                o.e(7489),
                o.e(1861),
                o.e(1598),
                o.e(7065)
              ]).then(o.bind(o, 84352));
              t(e);
            }
            t();
          } catch (e) {
            t(e);
          }
        },
        1
      );
    },
    98769() {
      'closedBy' in HTMLDialogElement.prototype ||
        addEventListener('click', e => {
          let t = e.composedPath()[0];
          if (
            t instanceof HTMLDialogElement &&
            'any' === t.getAttribute('closedby')
          ) {
            let o = t.getBoundingClientRect(),
              { clientX: a, clientY: r } = e;
            (o.top <= r && r <= o.bottom && o.left <= a && a <= o.right) ||
              t.close();
          }
        });
    },
    41857(e, t, o) {
      var a = o(70955),
        r = o(22207),
        n = o(18376),
        l = o(23727);
      let s =
        !document.cookie
          .split('; ')
          .includes('moz-1st-party-data-opt-out=true') && r._0;
      for (let e of (r.i7 &&
        (a.A.setDebugViewTag('mdn-dev'), a.A.setLogPings(!0)),
      a.A.initialize('mdn-fred', s, {
        enableAutoPageLoadEvents: !0,
        enableAutoElementClickEvents: !0,
        channel: r.g_
      }),
      document.addEventListener('toggle', e => {
        for (let t of e.composedPath())
          t instanceof HTMLElement &&
            'string' == typeof t.dataset.gleanToggleOpen &&
            'open' in t &&
            t.open &&
            (0, l.w)(t.dataset.gleanToggleOpen);
      }),
      document.querySelectorAll('[data-glean-view]'))) {
        let t = e.dataset.gleanView;
        if (t) {
          let o = new n.x(e, () => {
            ((0, l.w)(t), o.disconnect());
          });
          o.connect();
        }
      }
      document.addEventListener('click', e => {
        let t = e.composedPath(),
          o = t?.[0];
        if (o !== e.target && o instanceof Element)
          for (let e of t)
            e instanceof HTMLElement &&
              'string' == typeof e.dataset.gleanId &&
              (0, l.w)(e.dataset.gleanId);
        let a = o ?? e.target;
        if (a instanceof Element) {
          let e = a.closest('a');
          if (
            (e instanceof HTMLAnchorElement &&
              e.href &&
              e.origin &&
              e.origin !== document.location.origin &&
              (0, l.w)(`external-link: ${e.href}`),
            e instanceof HTMLAnchorElement &&
              e.href &&
              e.closest('.left-sidebar'))
          ) {
            let t = e.getAttribute('href') || e.href;
            (0, l.w)(`sidebar_click: sidebar ${t}`);
          }
        }
      });
    },
    76787(e, t, o) {
      o.a(
        e,
        async function (e, t) {
          try {
            for (let e of document.querySelectorAll('iframe[data-live-id]'))
              if (e instanceof HTMLIFrameElement) {
                let { liveId: t, livePath: a } = e.dataset;
                if (t) {
                  let r = {},
                    n = [],
                    l = t.replaceAll('.', String.raw`\.`);
                  for (let e of document.querySelectorAll(
                    `.live-sample___${l}, .live-sample---${l}`
                  )) {
                    let { MDNCodeExample: t, upgradePre: a } =
                        await Promise.all([
                          o.e(7489),
                          o.e(1861),
                          o.e(1598),
                          o.e(7065)
                        ]).then(o.bind(o, 84352)),
                      l = e instanceof t ? e : a(e);
                    if (l) {
                      n.push(l);
                      let { language: e, code: t } = l;
                      r[e] ? (r[e] += t) : (r[e] = t);
                    }
                  }
                  await Promise.all([
                    o.e(7489),
                    o.e(3708),
                    o.e(5950),
                    o.e(4098),
                    o.e(1861),
                    o.e(8401)
                  ]).then(o.bind(o, 47849));
                  let s = document.createElement('mdn-live-sample-result');
                  for (let o of ((s.liveId = t),
                  (s.code = r),
                  (s.srcPrefix = a),
                  (s.allow = e.allow || void 0),
                  (s.sandbox = e.sandbox.toString()),
                  (s.height = e.height),
                  e.closest('.code-example')?.replaceWith(s),
                  n))
                    o.liveSample ||= s;
                }
              }
            t();
          } catch (e) {
            t(e);
          }
        },
        1
      );
    },
    31557(e, t, o) {
      let a = new Set();
      for (let e of document.querySelectorAll('*')) {
        let t = e.tagName.toLowerCase();
        if (t.startsWith('mdn-') || 'interactive-example' === t) {
          let e = t.replace('mdn-', '');
          a.has(e) ||
            (a.add(e),
            o(95061)(`./${e}/element.js`).catch(t => {
              console.error(
                `couldn't load code for <${e}>: does the element's code not match the naming schema?`,
                t
              );
            }));
        }
      }
    },
    70315() {
      let e = document.querySelector('#main-sidebar'),
        t = e?.querySelector('[aria-current="page"]');
      e &&
        t instanceof HTMLElement &&
        e.scrollTo({ top: t.offsetTop - window.innerHeight / 4 });
    },
    98109(e, t, o) {
      var a = o(97154);
      let r = document.querySelector('.a11y-menu a[href="#search"]');
      if (r instanceof HTMLAnchorElement) {
        let e = document.querySelector('#search');
        e instanceof a.MDNSearchModal
          ? r.addEventListener('click', t => {
              let { target: o } = t;
              (o instanceof HTMLElement && (o.blur(), t.preventDefault()),
                e.showModal());
            })
          : (console.error('MDNSearchModal not found!'), (r.hidden = !0));
      }
    },
    70408() {
      for (let e of document.querySelectorAll(
        '.generic-toc, .reference-toc, .document-toc, .blog-toc'
      ))
        e instanceof HTMLElement &&
          (function (e) {
            let t = [...e.querySelectorAll('a')],
              o = new Map();
            for (let e of t.reverse()) {
              let t = document.querySelector(
                `[id="${CSS.escape(decodeURIComponent(e.hash).slice(1))}"]`
              );
              if (!t) continue;
              let a = t.closest('section');
              for (; a && a instanceof HTMLElement && !o.has(a);)
                (o.set(a, e), (a = a.nextElementSibling));
            }
            let a = new WeakMap(),
              r = new Set(),
              n = { threshold: 0 },
              l = document.querySelector('header');
            l instanceof HTMLElement &&
              (n.rootMargin = `-${l.clientHeight}px 0px 0px 0px`);
            let s = new IntersectionObserver(e => {
              for (let { target: t, isIntersecting: n } of e) {
                if (!(t instanceof HTMLElement)) continue;
                if (!r.has(t))
                  if (!n) continue;
                  else r.add(t);
                let e = o.get(t);
                if (!e) continue;
                let l = (a.get(e) ?? 0) + (n ? 1 : -1);
                ((e.ariaCurrent = l > 0 ? 'true' : null), a.set(e, l));
              }
            }, n);
            for (let e of o.keys()) s.observe(e);
          })(e);
    },
    15381(e, t, o) {
      o.a(
        e,
        async function (e, t) {
          try {
            var a = o(45742);
            try {
              let e = await (0, a.L)(),
                t = new Date(localStorage.getItem('next-ping') || 0);
              if (navigator.sendBeacon && e.isAuthenticated && t < new Date()) {
                let e = new URLSearchParams();
                navigator.sendBeacon('/api/v1/ping', e);
                let t = new Date();
                (t.setUTCDate(t.getUTCDate() + 1),
                  t.setUTCHours(0),
                  t.setUTCMinutes(0),
                  t.setUTCSeconds(0),
                  t.setUTCMilliseconds(0),
                  localStorage.setItem('next-ping', t.toISOString()));
              }
            } catch (e) {
              console.error('Failed to send ping', e);
            }
            t();
          } catch (e) {
            t(e);
          }
        },
        1
      );
    },
    99704(e, t, o) {
      var a = o(45379),
        r = o(81233),
        n = o(76722),
        l = o(537);
      let s = { 'en-US': l.default },
        i = new Set(['i', 'strong', 'br', 'em']),
        c = ['title', 'aria-label'];
      let Fluent = class Fluent {
        constructor(e = 'en-US', t = []) {
          ((this.locale = e),
            (this.usBundle = Fluent.constructBundle(
              new a.Np(e, { useIsolating: !1 }),
              [l.default]
            )),
            t.length > 0 &&
              (this.bundle = Fluent.constructBundle(
                new a.Np(e, { useIsolating: !1 }),
                [l.default, ...t]
              )));
        }
        static constructBundle(e, t = []) {
          for (let o of t) {
            let t = e.addResource(new a.B$(o), { allowOverrides: !0 });
            t.length > 0 && console.error(t);
          }
          return e;
        }
        get(e, t, o, a) {
          let r = this.getMessage(e, t, o);
          if (r) return Fluent.sanitize(r, a);
        }
        static sanitize(e, t = {}) {
          let o = {};
          for (let e of Object.values(t))
            o[e.tag] = [...Object.keys(e).filter(e => 'tag' !== e), ...c];
          let a = [...Object.values(t).map(e => e.tag), ...i],
            l = !0,
            s = r(
              e,
              {
                allowedAttributes: o,
                allowedTags: a,
                allowedSchemes: ['http', 'https', 'mailto'],
                filter(e) {
                  let o = e.attrs['data-l10n-name'];
                  if (o)
                    for (let [a, r] of Object.entries(t[o] || {}))
                      e.attrs[a] = r;
                  return (
                    !!(
                      i.has(e.tag) ||
                      (o && Object.keys(t).includes(o) && t[o]?.tag === e.tag)
                    ) && ((l = !1), !0)
                  );
                }
              },
              !0
            );
          return l ? s : (0, n._)(s);
        }
        getMessage(e, t, o = {}, a = this.bundle, r = !1) {
          let n,
            l = a ? a.getMessage(e) : void 0;
          if ('qai' === this.locale) return `[${e}${t ? `.${t}` : ''}]`;
          if (!l) {
            if (r) return;
            return this.getMessage(e, t, o, this.usBundle, !0);
          }
          if (t) {
            if (!(n = l.attributes[t])) {
              if (r) return;
              return this.getMessage(e, t, o, this.usBundle, !0);
            }
          } else l.value && (n = l.value);
          if (!n || !a) return '';
          let s = [],
            i = a?.formatPattern(
              n,
              (function (e) {
                let t = {};
                for (let [o, a] of Object.entries(e))
                  void 0 !== a &&
                    (t[o] =
                      'string' == typeof a
                        ? a
                            .replaceAll('&', '&amp;')
                            .replaceAll('<', '&lt;')
                            .replaceAll('>', '&gt;')
                        : a);
                return t;
              })(o),
              s
            );
          return (s.length > 0 && console.error(s), i);
        }
      };
      let d = new Map();
      function g(e) {
        if (e) {
          if (!d.has(e)) {
            let t = s[e];
            if (!t) return new Fluent(e);
            let o = new Fluent(e, [t]);
            d.set(e, o);
          }
          return d.get(e);
        }
      }
      async function u(e) {
        if ('qai' !== e && !s[e])
          try {
            let { default: t } = await o(91369)(`./${e}.ftl`);
            s[e] = t;
          } catch (e) {
            console.error(e);
          }
      }
      function h(e) {
        function t(t, o) {
          let a = g(e)?.get(t),
            r = 'string' == typeof a ? a : void 0,
            n = `[${t}]`,
            l = e => {
              let t = e[0];
              return r || t || n;
            };
          return ((l.toString = () => r || n), l);
        }
        return (
          (t.raw = function ({ id: t, attr: o, args: a, elements: r }) {
            let n = g(e);
            return n ? n.get(t, o, a, r) : `[${t}]`;
          }),
          t
        );
      }
      o.d(t, { Ay: () => h, FU: () => u });
    },
    17765(e, t, o) {
      o.a(
        e,
        async function (e, t) {
          try {
            var a = o(36611),
              r = o(99704);
            let e = (0, a.V)().locale;
            (e && (await (0, r.FU)(e)), t());
          } catch (e) {
            t(e);
          }
        },
        1
      );
    },
    70693(e, t, o) {
      var a = o(36611),
        r = o(99704);
      o.d(
        t,
        {},
        {
          J: e =>
            class extends e {
              constructor(...e) {
                super(...e);
                let t = (0, a.V)();
                ((this.locale = t.locale),
                  (this.l10n = (0, r.Ay)(this.locale)));
              }
            }
        }
      );
    },
    36611(e, t, o) {
      function a() {
        let e = globalThis.__MDNServerContext?.getStore(),
          t = globalThis.__MDNClientContext;
        return e || t;
      }
      o.d(t, { V: () => a });
    },
    95831() {
      globalThis.__MDNClientContext = {
        locale: globalThis.location.pathname.split('/', 2)[1] || 'en-US'
      };
    },
    23727(e, t, o) {
      var a = o(34388);
      function r(e) {
        a.A.recordElementClick({
          id: e,
          url: globalThis.location.href,
          referrer: document.referrer,
          title: document.title
        });
      }
      o.d(t, { w: () => r });
    },
    14632(e, t, o) {
      function a(e, t) {
        let o = e
            .replaceAll('_', ' ')
            .split('/')
            .filter(e => !['', 'docs'].includes(e)),
          a = o.shift();
        return (
          'Web' === o.at(0) && 'API' === o.at(1) && (o[1] = 'Web APIs'),
          o.length > 1 && 'Web' === o.at(0) && o.splice(0, 1),
          o.length > 1 && o.splice(-1, 1),
          [...(a === t ? [] : [a]), ...o].join(' / ')
        );
      }
      o.d(t, { o: () => a });
    }
  };
  return { __rspack_esm_id, __rspack_esm_ids, __webpack_modules__ };
})();

// === orchestration (was the tail of index.js) ===
__webpack_require__.C(chunk5909);
__webpack_require__.C(chunk4585);
__webpack_require__.C(chunkIndex);
__webpack_require__((__webpack_require__.s = 33779));
