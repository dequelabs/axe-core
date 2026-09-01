export const __rspack_esm_id = 4522;
export const __rspack_esm_ids = [4522];
export const __webpack_modules__ = {
  32580() {
    var e, a, t, r, o, n, s, i;
    ((e = Prism),
      (a = /\$\w+|%[a-z]+%/),
      (o =
        '(?:-+' +
        (r = /(?:[drlu]|do|down|le|left|ri|right|up)/.source) +
        '-+|\\.+' +
        r +
        '\\.+|-+(?:' +
        (t = /\[[^[\]]*\]/.source) +
        '-*)?|' +
        t +
        '-+|\\.+(?:' +
        t +
        '\\.*)?|' +
        t +
        '\\.+)'),
      (n = /(?:<{1,2}|\/{1,2}|\\{1,2}|<\||[#*^+}xo])/.source),
      (s = /(?:>{1,2}|\/{1,2}|\\{1,2}|\|>|[#*^+{xo])/.source),
      (i =
        /[[?]?[ox]?/.source +
        '(?:' +
        o +
        s +
        '|' +
        n +
        o +
        '(?:' +
        s +
        ')?)' +
        /[ox]?[\]?]?/.source),
      (e.languages['plant-uml'] = {
        comment: {
          pattern: /(^[ \t]*)(?:'.*|\/'[\s\S]*?'\/)/m,
          lookbehind: !0,
          greedy: !0
        },
        preprocessor: {
          pattern: /(^[ \t]*)!.*/m,
          lookbehind: !0,
          greedy: !0,
          alias: 'property',
          inside: { variable: a }
        },
        delimiter: {
          pattern: /(^[ \t]*)@(?:end|start)uml\b/m,
          lookbehind: !0,
          greedy: !0,
          alias: 'punctuation'
        },
        arrow: {
          pattern: RegExp(
            /(^|[^-.<>?|\\[\]ox])/.source + i + /(?![-.<>?|\\\]ox])/.source
          ),
          lookbehind: !0,
          greedy: !0,
          alias: 'operator',
          inside: {
            expression: {
              pattern: /(\[)[^[\]]+(?=\])/,
              lookbehind: !0,
              inside: null
            },
            punctuation: /\[(?=$|\])|^\]/
          }
        },
        string: { pattern: /"[^"]*"/, greedy: !0 },
        text: {
          pattern: /(\[[ \t]*[\r\n]+(?![\r\n]))[^\]]*(?=\])/,
          lookbehind: !0,
          greedy: !0,
          alias: 'string'
        },
        keyword: [
          {
            pattern:
              /^([ \t]*)(?:abstract\s+class|end\s+(?:box|fork|group|merge|note|ref|split|title)|(?:fork|split)(?:\s+again)?|activate|actor|agent|alt|annotation|artifact|autoactivate|autonumber|backward|binary|boundary|box|break|caption|card|case|circle|class|clock|cloud|collections|component|concise|control|create|critical|database|deactivate|destroy|detach|diamond|else|elseif|end|end[hr]note|endif|endswitch|endwhile|entity|enum|file|folder|footer|frame|group|[hr]?note|header|hexagon|hide|if|interface|label|legend|loop|map|namespace|network|newpage|node|nwdiag|object|opt|package|page|par|participant|person|queue|rectangle|ref|remove|repeat|restore|return|robust|scale|set|show|skinparam|stack|start|state|stop|storage|switch|title|together|usecase|usecase\/|while)(?=\s|$)/m,
            lookbehind: !0,
            greedy: !0
          },
          /\b(?:elseif|equals|not|while)(?=\s*\()/,
          /\b(?:as|is|then)\b/
        ],
        divider: { pattern: /^==.+==$/m, greedy: !0, alias: 'important' },
        time: {
          pattern: /@(?:\d+(?:[:/]\d+){2}|[+-]?\d+|:[a-z]\w*(?:[+-]\d+)?)\b/i,
          greedy: !0,
          alias: 'number'
        },
        color: { pattern: /#(?:[a-z_]+|[a-fA-F0-9]+)\b/, alias: 'symbol' },
        variable: a,
        punctuation: /[:,;()[\]{}]|\.{3}/
      }),
      (e.languages['plant-uml'].arrow.inside.expression.inside =
        e.languages['plant-uml']),
      (e.languages.plantuml = e.languages['plant-uml']));
  }
};
//# sourceMappingURL=prism-plant-uml-js.263641d6bf87962b.js.map
