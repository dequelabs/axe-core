export const __rspack_esm_id = 3805;
export const __rspack_esm_ids = [3805];
export const __webpack_modules__ = {
  60061() {
    var s, e;
    ((e = [
      /"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/.source,
      /'[^']*'/.source,
      /\$'(?:[^'\\]|\\[\s\S])*'/.source,
      /<<-?\s*(["']?)(\w+)\1\s[\s\S]*?[\r\n]\2/.source
    ].join('|')),
      ((s = Prism).languages['shell-session'] = {
        command: {
          pattern: RegExp(
            /^/.source +
              '(?:' +
              /[^\s@:$#%*!/\\]+@[^\r\n@:$#%*!/\\]+(?::[^\0-\x1F$#%*?"<>:;|]+)?/
                .source +
              '|' +
              /[/~.][^\0-\x1F$#%*?"<>@:;|]*/.source +
              ')?' +
              /[$#%](?=\s)/.source +
              /(?:[^\\\r\n \t'"<$]|[ \t](?:(?!#)|#.*$)|\\(?:[^\r]|\r\n?)|\$(?!')|<(?!<)|<<str>>)+/.source.replace(
                /<<str>>/g,
                function () {
                  return e;
                }
              ),
            'm'
          ),
          greedy: !0,
          inside: {
            info: {
              pattern: /^[^#$%]+/,
              alias: 'punctuation',
              inside: {
                user: /^[^\s@:$#%*!/\\]+@[^\r\n@:$#%*!/\\]+/,
                punctuation: /:/,
                path: /[\s\S]+/
              }
            },
            bash: {
              pattern: /(^[$#%]\s*)\S[\s\S]*/,
              lookbehind: !0,
              alias: 'language-bash',
              inside: s.languages.bash
            },
            'shell-symbol': { pattern: /^[$#%]/, alias: 'important' }
          }
        },
        output: /.(?:.*(?:[\r\n]|.$))*/
      }),
      (s.languages['sh-session'] = s.languages.shellsession =
        s.languages['shell-session']));
  }
};
//# sourceMappingURL=prism-shell-session-js.4b34fc07ce9719be.js.map
