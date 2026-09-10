/*! LICENSE: 1825.599c6236c8613bc0.js.LICENSE.txt */
export const __rspack_esm_id = 1825;
export const __rspack_esm_ids = [1825];
export const __webpack_modules__ = {
  6969(e) {
    e.exports &&
      (e.exports = {
        core: {
          meta: { path: 'components/prism-core.js', option: 'mandatory' },
          core: 'Core'
        },
        themes: {
          meta: {
            path: 'themes/{id}.css',
            link: 'index.html?theme={id}',
            exclusive: !0
          },
          prism: { title: 'Default', option: 'default' },
          'prism-dark': 'Dark',
          'prism-funky': 'Funky',
          'prism-okaidia': { title: 'Okaidia', owner: 'ocodia' },
          'prism-twilight': { title: 'Twilight', owner: 'remybach' },
          'prism-coy': { title: 'Coy', owner: 'tshedor' },
          'prism-solarizedlight': {
            title: 'Solarized Light',
            owner: 'hectormatos2011 '
          },
          'prism-tomorrow': { title: 'Tomorrow Night', owner: 'Rosey' }
        },
        languages: {
          meta: {
            path: 'components/prism-{id}',
            noCSS: !0,
            examplesPath: 'examples/prism-{id}',
            addCheckAll: !0
          },
          markup: {
            title: 'Markup',
            alias: ['html', 'xml', 'svg', 'mathml', 'ssml', 'atom', 'rss'],
            aliasTitles: {
              html: 'HTML',
              xml: 'XML',
              svg: 'SVG',
              mathml: 'MathML',
              ssml: 'SSML',
              atom: 'Atom',
              rss: 'RSS'
            },
            option: 'default'
          },
          css: { title: 'CSS', option: 'default', modify: 'markup' },
          clike: { title: 'C-like', option: 'default' },
          javascript: {
            title: 'JavaScript',
            require: 'clike',
            modify: 'markup',
            optional: 'regex',
            alias: 'js',
            option: 'default'
          },
          abap: { title: 'ABAP', owner: 'dellagustin' },
          abnf: { title: 'ABNF', owner: 'RunDevelopment' },
          actionscript: {
            title: 'ActionScript',
            require: 'javascript',
            modify: 'markup',
            owner: 'Golmote'
          },
          ada: { title: 'Ada', owner: 'Lucretia' },
          agda: { title: 'Agda', owner: 'xy-ren' },
          al: { title: 'AL', owner: 'RunDevelopment' },
          antlr4: { title: 'ANTLR4', alias: 'g4', owner: 'RunDevelopment' },
          apacheconf: { title: 'Apache Configuration', owner: 'GuiTeK' },
          apex: {
            title: 'Apex',
            require: ['clike', 'sql'],
            owner: 'RunDevelopment'
          },
          apl: { title: 'APL', owner: 'ngn' },
          applescript: { title: 'AppleScript', owner: 'Golmote' },
          aql: { title: 'AQL', owner: 'RunDevelopment' },
          arduino: {
            title: 'Arduino',
            require: 'cpp',
            alias: 'ino',
            owner: 'dkern'
          },
          arff: { title: 'ARFF', owner: 'Golmote' },
          armasm: {
            title: 'ARM Assembly',
            alias: 'arm-asm',
            owner: 'RunDevelopment'
          },
          arturo: {
            title: 'Arturo',
            alias: 'art',
            optional: [
              'bash',
              'css',
              'javascript',
              'markup',
              'markdown',
              'sql'
            ],
            owner: 'drkameleon'
          },
          asciidoc: { alias: 'adoc', title: 'AsciiDoc', owner: 'Golmote' },
          aspnet: {
            title: 'ASP.NET (C#)',
            require: ['markup', 'csharp'],
            owner: 'nauzilus'
          },
          asm6502: { title: '6502 Assembly', owner: 'kzurawel' },
          asmatmel: { title: 'Atmel AVR Assembly', owner: 'cerkit' },
          autohotkey: { title: 'AutoHotkey', owner: 'aviaryan' },
          autoit: { title: 'AutoIt', owner: 'Golmote' },
          avisynth: { title: 'AviSynth', alias: 'avs', owner: 'Zinfidel' },
          'avro-idl': {
            title: 'Avro IDL',
            alias: 'avdl',
            owner: 'RunDevelopment'
          },
          awk: {
            title: 'AWK',
            alias: 'gawk',
            aliasTitles: { gawk: 'GAWK' },
            owner: 'RunDevelopment'
          },
          bash: {
            title: 'Bash',
            alias: ['sh', 'shell'],
            aliasTitles: { sh: 'Shell', shell: 'Shell' },
            owner: 'zeitgeist87'
          },
          basic: { title: 'BASIC', owner: 'Golmote' },
          batch: { title: 'Batch', owner: 'Golmote' },
          bbcode: {
            title: 'BBcode',
            alias: 'shortcode',
            aliasTitles: { shortcode: 'Shortcode' },
            owner: 'RunDevelopment'
          },
          bbj: { title: 'BBj', owner: 'hyyan' },
          bicep: { title: 'Bicep', owner: 'johnnyreilly' },
          birb: { title: 'Birb', require: 'clike', owner: 'Calamity210' },
          bison: { title: 'Bison', require: 'c', owner: 'Golmote' },
          bnf: {
            title: 'BNF',
            alias: 'rbnf',
            aliasTitles: { rbnf: 'RBNF' },
            owner: 'RunDevelopment'
          },
          bqn: { title: 'BQN', owner: 'yewscion' },
          brainfuck: { title: 'Brainfuck', owner: 'Golmote' },
          brightscript: { title: 'BrightScript', owner: 'RunDevelopment' },
          bro: { title: 'Bro', owner: 'wayward710' },
          bsl: {
            title: 'BSL (1C:Enterprise)',
            alias: 'oscript',
            aliasTitles: { oscript: 'OneScript' },
            owner: 'Diversus23'
          },
          c: { title: 'C', require: 'clike', owner: 'zeitgeist87' },
          csharp: {
            title: 'C#',
            require: 'clike',
            alias: ['cs', 'dotnet'],
            owner: 'mvalipour'
          },
          cpp: { title: 'C++', require: 'c', owner: 'zeitgeist87' },
          cfscript: {
            title: 'CFScript',
            require: 'clike',
            alias: 'cfc',
            owner: 'mjclemente'
          },
          chaiscript: {
            title: 'ChaiScript',
            require: ['clike', 'cpp'],
            owner: 'RunDevelopment'
          },
          cil: { title: 'CIL', owner: 'sbrl' },
          cilkc: {
            title: 'Cilk/C',
            require: 'c',
            alias: 'cilk-c',
            owner: 'OpenCilk'
          },
          cilkcpp: {
            title: 'Cilk/C++',
            require: 'cpp',
            alias: ['cilk-cpp', 'cilk'],
            owner: 'OpenCilk'
          },
          clojure: { title: 'Clojure', owner: 'troglotit' },
          cmake: { title: 'CMake', owner: 'mjrogozinski' },
          cobol: { title: 'COBOL', owner: 'RunDevelopment' },
          coffeescript: {
            title: 'CoffeeScript',
            require: 'javascript',
            alias: 'coffee',
            owner: 'R-osey'
          },
          concurnas: {
            title: 'Concurnas',
            alias: 'conc',
            owner: 'jasontatton'
          },
          csp: { title: 'Content-Security-Policy', owner: 'ScottHelme' },
          cooklang: { title: 'Cooklang', owner: 'ahue' },
          coq: { title: 'Coq', owner: 'RunDevelopment' },
          crystal: { title: 'Crystal', require: 'ruby', owner: 'MakeNowJust' },
          'css-extras': {
            title: 'CSS Extras',
            require: 'css',
            modify: 'css',
            owner: 'milesj'
          },
          csv: { title: 'CSV', owner: 'RunDevelopment' },
          cue: { title: 'CUE', owner: 'RunDevelopment' },
          cypher: { title: 'Cypher', owner: 'RunDevelopment' },
          d: { title: 'D', require: 'clike', owner: 'Golmote' },
          dart: { title: 'Dart', require: 'clike', owner: 'Golmote' },
          dataweave: { title: 'DataWeave', owner: 'machaval' },
          dax: { title: 'DAX', owner: 'peterbud' },
          dhall: { title: 'Dhall', owner: 'RunDevelopment' },
          diff: { title: 'Diff', owner: 'uranusjr' },
          django: {
            title: 'Django/Jinja2',
            require: 'markup-templating',
            alias: 'jinja2',
            owner: 'romanvm'
          },
          'dns-zone-file': {
            title: 'DNS zone file',
            owner: 'RunDevelopment',
            alias: 'dns-zone'
          },
          docker: {
            title: 'Docker',
            alias: 'dockerfile',
            owner: 'JustinBeckwith'
          },
          dot: {
            title: 'DOT (Graphviz)',
            alias: 'gv',
            optional: 'markup',
            owner: 'RunDevelopment'
          },
          ebnf: { title: 'EBNF', owner: 'RunDevelopment' },
          editorconfig: { title: 'EditorConfig', owner: 'osipxd' },
          eiffel: { title: 'Eiffel', owner: 'Conaclos' },
          ejs: {
            title: 'EJS',
            require: ['javascript', 'markup-templating'],
            owner: 'RunDevelopment',
            alias: 'eta',
            aliasTitles: { eta: 'Eta' }
          },
          elixir: { title: 'Elixir', owner: 'Golmote' },
          elm: { title: 'Elm', owner: 'zwilias' },
          etlua: {
            title: 'Embedded Lua templating',
            require: ['lua', 'markup-templating'],
            owner: 'RunDevelopment'
          },
          erb: {
            title: 'ERB',
            require: ['ruby', 'markup-templating'],
            owner: 'Golmote'
          },
          erlang: { title: 'Erlang', owner: 'Golmote' },
          'excel-formula': {
            title: 'Excel Formula',
            alias: ['xlsx', 'xls'],
            owner: 'RunDevelopment'
          },
          fsharp: { title: 'F#', require: 'clike', owner: 'simonreynolds7' },
          factor: { title: 'Factor', owner: 'catb0t' },
          false: { title: 'False', owner: 'edukisto' },
          'firestore-security-rules': {
            title: 'Firestore security rules',
            require: 'clike',
            owner: 'RunDevelopment'
          },
          flow: { title: 'Flow', require: 'javascript', owner: 'Golmote' },
          fortran: { title: 'Fortran', owner: 'Golmote' },
          ftl: {
            title: 'FreeMarker Template Language',
            require: 'markup-templating',
            owner: 'RunDevelopment'
          },
          gml: {
            title: 'GameMaker Language',
            alias: 'gamemakerlanguage',
            require: 'clike',
            owner: 'LiarOnce'
          },
          gap: { title: 'GAP (CAS)', owner: 'RunDevelopment' },
          gcode: { title: 'G-code', owner: 'RunDevelopment' },
          gdscript: { title: 'GDScript', owner: 'RunDevelopment' },
          gedcom: { title: 'GEDCOM', owner: 'Golmote' },
          gettext: { title: 'gettext', alias: 'po', owner: 'RunDevelopment' },
          gherkin: { title: 'Gherkin', owner: 'hason' },
          git: { title: 'Git', owner: 'lgiraudel' },
          glsl: { title: 'GLSL', require: 'c', owner: 'Golmote' },
          gn: { title: 'GN', alias: 'gni', owner: 'RunDevelopment' },
          'linker-script': {
            title: 'GNU Linker Script',
            alias: 'ld',
            owner: 'RunDevelopment'
          },
          go: { title: 'Go', require: 'clike', owner: 'arnehormann' },
          'go-module': {
            title: 'Go module',
            alias: 'go-mod',
            owner: 'RunDevelopment'
          },
          gradle: {
            title: 'Gradle',
            require: 'clike',
            owner: 'zeabdelkhalek-badido18'
          },
          graphql: { title: 'GraphQL', optional: 'markdown', owner: 'Golmote' },
          groovy: { title: 'Groovy', require: 'clike', owner: 'robfletcher' },
          haml: {
            title: 'Haml',
            require: 'ruby',
            optional: [
              'css',
              'css-extras',
              'coffeescript',
              'erb',
              'javascript',
              'less',
              'markdown',
              'scss',
              'textile'
            ],
            owner: 'Golmote'
          },
          handlebars: {
            title: 'Handlebars',
            require: 'markup-templating',
            alias: ['hbs', 'mustache'],
            aliasTitles: { mustache: 'Mustache' },
            owner: 'Golmote'
          },
          haskell: { title: 'Haskell', alias: 'hs', owner: 'bholst' },
          haxe: {
            title: 'Haxe',
            require: 'clike',
            optional: 'regex',
            owner: 'Golmote'
          },
          hcl: { title: 'HCL', owner: 'outsideris' },
          hlsl: { title: 'HLSL', require: 'c', owner: 'RunDevelopment' },
          hoon: { title: 'Hoon', owner: 'matildepark' },
          http: {
            title: 'HTTP',
            optional: [
              'csp',
              'css',
              'hpkp',
              'hsts',
              'javascript',
              'json',
              'markup',
              'uri'
            ],
            owner: 'danielgtaylor'
          },
          hpkp: { title: 'HTTP Public-Key-Pins', owner: 'ScottHelme' },
          hsts: {
            title: 'HTTP Strict-Transport-Security',
            owner: 'ScottHelme'
          },
          ichigojam: { title: 'IchigoJam', owner: 'BlueCocoa' },
          icon: { title: 'Icon', owner: 'Golmote' },
          'icu-message-format': {
            title: 'ICU Message Format',
            owner: 'RunDevelopment'
          },
          idris: {
            title: 'Idris',
            alias: 'idr',
            owner: 'KeenS',
            require: 'haskell'
          },
          ignore: {
            title: '.ignore',
            owner: 'osipxd',
            alias: ['gitignore', 'hgignore', 'npmignore'],
            aliasTitles: {
              gitignore: '.gitignore',
              hgignore: '.hgignore',
              npmignore: '.npmignore'
            }
          },
          inform7: { title: 'Inform 7', owner: 'Golmote' },
          ini: { title: 'Ini', owner: 'aviaryan' },
          io: { title: 'Io', owner: 'AlesTsurko' },
          j: { title: 'J', owner: 'Golmote' },
          java: { title: 'Java', require: 'clike', owner: 'sherblot' },
          javadoc: {
            title: 'JavaDoc',
            require: ['markup', 'java', 'javadoclike'],
            modify: 'java',
            optional: 'scala',
            owner: 'RunDevelopment'
          },
          javadoclike: {
            title: 'JavaDoc-like',
            modify: ['java', 'javascript', 'php'],
            owner: 'RunDevelopment'
          },
          javastacktrace: {
            title: 'Java stack trace',
            owner: 'RunDevelopment'
          },
          jexl: { title: 'Jexl', owner: 'czosel' },
          jolie: { title: 'Jolie', require: 'clike', owner: 'thesave' },
          jq: { title: 'JQ', owner: 'RunDevelopment' },
          jsdoc: {
            title: 'JSDoc',
            require: ['javascript', 'javadoclike', 'typescript'],
            modify: 'javascript',
            optional: ['actionscript', 'coffeescript'],
            owner: 'RunDevelopment'
          },
          'js-extras': {
            title: 'JS Extras',
            require: 'javascript',
            modify: 'javascript',
            optional: [
              'actionscript',
              'coffeescript',
              'flow',
              'n4js',
              'typescript'
            ],
            owner: 'RunDevelopment'
          },
          json: {
            title: 'JSON',
            alias: 'webmanifest',
            aliasTitles: { webmanifest: 'Web App Manifest' },
            owner: 'CupOfTea696'
          },
          json5: { title: 'JSON5', require: 'json', owner: 'RunDevelopment' },
          jsonp: { title: 'JSONP', require: 'json', owner: 'RunDevelopment' },
          jsstacktrace: { title: 'JS stack trace', owner: 'sbrl' },
          'js-templates': {
            title: 'JS Templates',
            require: 'javascript',
            modify: 'javascript',
            optional: [
              'css',
              'css-extras',
              'graphql',
              'markdown',
              'markup',
              'sql'
            ],
            owner: 'RunDevelopment'
          },
          julia: { title: 'Julia', owner: 'cdagnino' },
          keepalived: { title: 'Keepalived Configure', owner: 'dev-itsheng' },
          keyman: { title: 'Keyman', owner: 'mcdurdin' },
          kotlin: {
            title: 'Kotlin',
            alias: ['kt', 'kts'],
            aliasTitles: { kts: 'Kotlin Script' },
            require: 'clike',
            owner: 'Golmote'
          },
          kumir: { title: 'KuMir (КуМир)', alias: 'kum', owner: 'edukisto' },
          kusto: { title: 'Kusto', owner: 'RunDevelopment' },
          latex: {
            title: 'LaTeX',
            alias: ['tex', 'context'],
            aliasTitles: { tex: 'TeX', context: 'ConTeXt' },
            owner: 'japborst'
          },
          latte: {
            title: 'Latte',
            require: ['clike', 'markup-templating', 'php'],
            owner: 'nette'
          },
          less: {
            title: 'Less',
            require: 'css',
            optional: 'css-extras',
            owner: 'Golmote'
          },
          lilypond: {
            title: 'LilyPond',
            require: 'scheme',
            alias: 'ly',
            owner: 'RunDevelopment'
          },
          liquid: {
            title: 'Liquid',
            require: 'markup-templating',
            owner: 'cinhtau'
          },
          lisp: {
            title: 'Lisp',
            alias: ['emacs', 'elisp', 'emacs-lisp'],
            owner: 'JuanCaicedo'
          },
          livescript: { title: 'LiveScript', owner: 'Golmote' },
          llvm: { title: 'LLVM IR', owner: 'porglezomp' },
          log: {
            title: 'Log file',
            optional: 'javastacktrace',
            owner: 'RunDevelopment'
          },
          lolcode: { title: 'LOLCODE', owner: 'Golmote' },
          lua: { title: 'Lua', owner: 'Golmote' },
          magma: { title: 'Magma (CAS)', owner: 'RunDevelopment' },
          makefile: { title: 'Makefile', owner: 'Golmote' },
          markdown: {
            title: 'Markdown',
            require: 'markup',
            optional: 'yaml',
            alias: 'md',
            owner: 'Golmote'
          },
          'markup-templating': {
            title: 'Markup templating',
            require: 'markup',
            owner: 'Golmote'
          },
          mata: { title: 'Mata', owner: 'RunDevelopment' },
          matlab: { title: 'MATLAB', owner: 'Golmote' },
          maxscript: { title: 'MAXScript', owner: 'RunDevelopment' },
          mel: { title: 'MEL', owner: 'Golmote' },
          mermaid: { title: 'Mermaid', owner: 'RunDevelopment' },
          metafont: { title: 'METAFONT', owner: 'LaeriExNihilo' },
          mizar: { title: 'Mizar', owner: 'Golmote' },
          mongodb: {
            title: 'MongoDB',
            owner: 'airs0urce',
            require: 'javascript'
          },
          monkey: { title: 'Monkey', owner: 'Golmote' },
          moonscript: {
            title: 'MoonScript',
            alias: 'moon',
            owner: 'RunDevelopment'
          },
          n1ql: { title: 'N1QL', owner: 'TMWilds' },
          n4js: {
            title: 'N4JS',
            require: 'javascript',
            optional: 'jsdoc',
            alias: 'n4jsd',
            owner: 'bsmith-n4'
          },
          'nand2tetris-hdl': {
            title: 'Nand To Tetris HDL',
            owner: 'stephanmax'
          },
          naniscript: {
            title: 'Naninovel Script',
            owner: 'Elringus',
            alias: 'nani'
          },
          nasm: { title: 'NASM', owner: 'rbmj' },
          neon: { title: 'NEON', owner: 'nette' },
          nevod: { title: 'Nevod', owner: 'nezaboodka' },
          nginx: { title: 'nginx', owner: 'volado' },
          nim: { title: 'Nim', owner: 'Golmote' },
          nix: { title: 'Nix', owner: 'Golmote' },
          nsis: { title: 'NSIS', owner: 'idleberg' },
          objectivec: {
            title: 'Objective-C',
            require: 'c',
            alias: 'objc',
            owner: 'uranusjr'
          },
          ocaml: { title: 'OCaml', owner: 'Golmote' },
          odin: { title: 'Odin', owner: 'edukisto' },
          opencl: {
            title: 'OpenCL',
            require: 'c',
            modify: ['c', 'cpp'],
            owner: 'Milania1'
          },
          openqasm: {
            title: 'OpenQasm',
            alias: 'qasm',
            owner: 'RunDevelopment'
          },
          oz: { title: 'Oz', owner: 'Golmote' },
          parigp: { title: 'PARI/GP', owner: 'Golmote' },
          parser: { title: 'Parser', require: 'markup', owner: 'Golmote' },
          pascal: {
            title: 'Pascal',
            alias: 'objectpascal',
            aliasTitles: { objectpascal: 'Object Pascal' },
            owner: 'Golmote'
          },
          pascaligo: { title: 'Pascaligo', owner: 'DefinitelyNotAGoat' },
          psl: { title: 'PATROL Scripting Language', owner: 'bertysentry' },
          pcaxis: { title: 'PC-Axis', alias: 'px', owner: 'RunDevelopment' },
          peoplecode: {
            title: 'PeopleCode',
            alias: 'pcode',
            owner: 'RunDevelopment'
          },
          perl: { title: 'Perl', owner: 'Golmote' },
          php: { title: 'PHP', require: 'markup-templating', owner: 'milesj' },
          phpdoc: {
            title: 'PHPDoc',
            require: ['php', 'javadoclike'],
            modify: 'php',
            owner: 'RunDevelopment'
          },
          'php-extras': {
            title: 'PHP Extras',
            require: 'php',
            modify: 'php',
            owner: 'milesj'
          },
          'plant-uml': {
            title: 'PlantUML',
            alias: 'plantuml',
            owner: 'RunDevelopment'
          },
          plsql: { title: 'PL/SQL', require: 'sql', owner: 'Golmote' },
          powerquery: {
            title: 'PowerQuery',
            alias: ['pq', 'mscript'],
            owner: 'peterbud'
          },
          powershell: { title: 'PowerShell', owner: 'nauzilus' },
          processing: {
            title: 'Processing',
            require: 'clike',
            owner: 'Golmote'
          },
          prolog: { title: 'Prolog', owner: 'Golmote' },
          promql: { title: 'PromQL', owner: 'arendjr' },
          properties: { title: '.properties', owner: 'Golmote' },
          protobuf: {
            title: 'Protocol Buffers',
            require: 'clike',
            owner: 'just-boris'
          },
          pug: {
            title: 'Pug',
            require: ['markup', 'javascript'],
            optional: [
              'coffeescript',
              'ejs',
              'handlebars',
              'less',
              'livescript',
              'markdown',
              'scss',
              'stylus',
              'twig'
            ],
            owner: 'Golmote'
          },
          puppet: { title: 'Puppet', owner: 'Golmote' },
          pure: {
            title: 'Pure',
            optional: ['c', 'cpp', 'fortran'],
            owner: 'Golmote'
          },
          purebasic: {
            title: 'PureBasic',
            require: 'clike',
            alias: 'pbfasm',
            owner: 'HeX0R101'
          },
          purescript: {
            title: 'PureScript',
            require: 'haskell',
            alias: 'purs',
            owner: 'sriharshachilakapati'
          },
          python: { title: 'Python', alias: 'py', owner: 'multipetros' },
          qsharp: {
            title: 'Q#',
            require: 'clike',
            alias: 'qs',
            owner: 'fedonman'
          },
          q: { title: 'Q (kdb+ database)', owner: 'Golmote' },
          qml: { title: 'QML', require: 'javascript', owner: 'RunDevelopment' },
          qore: { title: 'Qore', require: 'clike', owner: 'temnroegg' },
          r: { title: 'R', owner: 'Golmote' },
          racket: {
            title: 'Racket',
            require: 'scheme',
            alias: 'rkt',
            owner: 'RunDevelopment'
          },
          cshtml: {
            title: 'Razor C#',
            alias: 'razor',
            require: ['markup', 'csharp'],
            optional: ['css', 'css-extras', 'javascript', 'js-extras'],
            owner: 'RunDevelopment'
          },
          jsx: {
            title: 'React JSX',
            require: ['markup', 'javascript'],
            optional: ['jsdoc', 'js-extras', 'js-templates'],
            owner: 'vkbansal'
          },
          tsx: { title: 'React TSX', require: ['jsx', 'typescript'] },
          reason: { title: 'Reason', require: 'clike', owner: 'Golmote' },
          regex: { title: 'Regex', owner: 'RunDevelopment' },
          rego: { title: 'Rego', owner: 'JordanSh' },
          renpy: { title: "Ren'py", alias: 'rpy', owner: 'HyuchiaDiego' },
          rescript: { title: 'ReScript', alias: 'res', owner: 'vmarcosp' },
          rest: { title: 'reST (reStructuredText)', owner: 'Golmote' },
          rip: { title: 'Rip', owner: 'ravinggenius' },
          roboconf: { title: 'Roboconf', owner: 'Golmote' },
          robotframework: {
            title: 'Robot Framework',
            alias: 'robot',
            owner: 'RunDevelopment'
          },
          ruby: {
            title: 'Ruby',
            require: 'clike',
            alias: 'rb',
            owner: 'samflores'
          },
          rust: { title: 'Rust', owner: 'Golmote' },
          sas: {
            title: 'SAS',
            optional: ['groovy', 'lua', 'sql'],
            owner: 'Golmote'
          },
          sass: {
            title: 'Sass (Sass)',
            require: 'css',
            optional: 'css-extras',
            owner: 'Golmote'
          },
          scss: {
            title: 'Sass (SCSS)',
            require: 'css',
            optional: 'css-extras',
            owner: 'MoOx'
          },
          scala: { title: 'Scala', require: 'java', owner: 'jozic' },
          scheme: { title: 'Scheme', owner: 'bacchus123' },
          'shell-session': {
            title: 'Shell session',
            require: 'bash',
            alias: ['sh-session', 'shellsession'],
            owner: 'RunDevelopment'
          },
          smali: { title: 'Smali', owner: 'RunDevelopment' },
          smalltalk: { title: 'Smalltalk', owner: 'Golmote' },
          smarty: {
            title: 'Smarty',
            require: 'markup-templating',
            optional: 'php',
            owner: 'Golmote'
          },
          sml: {
            title: 'SML',
            alias: 'smlnj',
            aliasTitles: { smlnj: 'SML/NJ' },
            owner: 'RunDevelopment'
          },
          solidity: {
            title: 'Solidity (Ethereum)',
            alias: 'sol',
            require: 'clike',
            owner: 'glachaud'
          },
          'solution-file': {
            title: 'Solution file',
            alias: 'sln',
            owner: 'RunDevelopment'
          },
          soy: {
            title: 'Soy (Closure Template)',
            require: 'markup-templating',
            owner: 'Golmote'
          },
          sparql: {
            title: 'SPARQL',
            require: 'turtle',
            owner: 'Triply-Dev',
            alias: 'rq'
          },
          'splunk-spl': { title: 'Splunk SPL', owner: 'RunDevelopment' },
          sqf: {
            title: 'SQF: Status Quo Function (Arma 3)',
            require: 'clike',
            owner: 'RunDevelopment'
          },
          sql: { title: 'SQL', owner: 'multipetros' },
          squirrel: {
            title: 'Squirrel',
            require: 'clike',
            owner: 'RunDevelopment'
          },
          stan: { title: 'Stan', owner: 'RunDevelopment' },
          stata: {
            title: 'Stata Ado',
            require: ['mata', 'java', 'python'],
            owner: 'RunDevelopment'
          },
          iecst: {
            title: 'Structured Text (IEC 61131-3)',
            owner: 'serhioromano'
          },
          stylus: { title: 'Stylus', owner: 'vkbansal' },
          supercollider: {
            title: 'SuperCollider',
            alias: 'sclang',
            owner: 'RunDevelopment'
          },
          swift: { title: 'Swift', owner: 'chrischares' },
          systemd: {
            title: 'Systemd configuration file',
            owner: 'RunDevelopment'
          },
          't4-templating': { title: 'T4 templating', owner: 'RunDevelopment' },
          't4-cs': {
            title: 'T4 Text Templates (C#)',
            require: ['t4-templating', 'csharp'],
            alias: 't4',
            owner: 'RunDevelopment'
          },
          't4-vb': {
            title: 'T4 Text Templates (VB)',
            require: ['t4-templating', 'vbnet'],
            owner: 'RunDevelopment'
          },
          tap: { title: 'TAP', owner: 'isaacs', require: 'yaml' },
          tcl: { title: 'Tcl', owner: 'PeterChaplin' },
          tt2: {
            title: 'Template Toolkit 2',
            require: ['clike', 'markup-templating'],
            owner: 'gflohr'
          },
          textile: {
            title: 'Textile',
            require: 'markup',
            optional: 'css',
            owner: 'Golmote'
          },
          toml: { title: 'TOML', owner: 'RunDevelopment' },
          tremor: {
            title: 'Tremor',
            alias: ['trickle', 'troy'],
            owner: 'darach',
            aliasTitles: { trickle: 'trickle', troy: 'troy' }
          },
          turtle: {
            title: 'Turtle',
            alias: 'trig',
            aliasTitles: { trig: 'TriG' },
            owner: 'jakubklimek'
          },
          twig: {
            title: 'Twig',
            require: 'markup-templating',
            owner: 'brandonkelly'
          },
          typescript: {
            title: 'TypeScript',
            require: 'javascript',
            optional: 'js-templates',
            alias: 'ts',
            owner: 'vkbansal'
          },
          typoscript: {
            title: 'TypoScript',
            alias: 'tsconfig',
            aliasTitles: { tsconfig: 'TSConfig' },
            owner: 'dkern'
          },
          unrealscript: {
            title: 'UnrealScript',
            alias: ['uscript', 'uc'],
            owner: 'RunDevelopment'
          },
          uorazor: { title: 'UO Razor Script', owner: 'jaseowns' },
          uri: {
            title: 'URI',
            alias: 'url',
            aliasTitles: { url: 'URL' },
            owner: 'RunDevelopment'
          },
          v: { title: 'V', require: 'clike', owner: 'taggon' },
          vala: {
            title: 'Vala',
            require: 'clike',
            optional: 'regex',
            owner: 'TemplarVolk'
          },
          vbnet: { title: 'VB.Net', require: 'basic', owner: 'Bigsby' },
          velocity: { title: 'Velocity', require: 'markup', owner: 'Golmote' },
          verilog: { title: 'Verilog', owner: 'a-rey' },
          vhdl: { title: 'VHDL', owner: 'a-rey' },
          vim: { title: 'vim', owner: 'westonganger' },
          'visual-basic': {
            title: 'Visual Basic',
            alias: ['vb', 'vba'],
            aliasTitles: { vba: 'VBA' },
            owner: 'Golmote'
          },
          warpscript: { title: 'WarpScript', owner: 'RunDevelopment' },
          wasm: { title: 'WebAssembly', owner: 'Golmote' },
          'web-idl': {
            title: 'Web IDL',
            alias: 'webidl',
            owner: 'RunDevelopment'
          },
          wgsl: { title: 'WGSL', owner: 'Dr4gonthree' },
          wiki: { title: 'Wiki markup', require: 'markup', owner: 'Golmote' },
          wolfram: {
            title: 'Wolfram language',
            alias: ['mathematica', 'nb', 'wl'],
            aliasTitles: {
              mathematica: 'Mathematica',
              nb: 'Mathematica Notebook'
            },
            owner: 'msollami'
          },
          wren: { title: 'Wren', owner: 'clsource' },
          xeora: {
            title: 'Xeora',
            require: 'markup',
            alias: 'xeoracube',
            aliasTitles: { xeoracube: 'XeoraCube' },
            owner: 'freakmaxi'
          },
          'xml-doc': {
            title: 'XML doc (.net)',
            require: 'markup',
            modify: ['csharp', 'fsharp', 'vbnet'],
            owner: 'RunDevelopment'
          },
          xojo: { title: 'Xojo (REALbasic)', owner: 'Golmote' },
          xquery: { title: 'XQuery', require: 'markup', owner: 'Golmote' },
          yaml: { title: 'YAML', alias: 'yml', owner: 'hason' },
          yang: { title: 'YANG', owner: 'RunDevelopment' },
          zig: { title: 'Zig', owner: 'RunDevelopment' }
        },
        plugins: {
          meta: { path: 'plugins/{id}/prism-{id}', link: 'plugins/{id}/' },
          'line-highlight': {
            title: 'Line Highlight',
            description: 'Highlights specific lines and/or line ranges.'
          },
          'line-numbers': {
            title: 'Line Numbers',
            description: 'Line number at the beginning of code lines.',
            owner: 'kuba-kubula'
          },
          'show-invisibles': {
            title: 'Show Invisibles',
            description: 'Show hidden characters such as tabs and line breaks.',
            optional: ['autolinker', 'data-uri-highlight']
          },
          autolinker: {
            title: 'Autolinker',
            description:
              'Converts URLs and emails in code to clickable links. Parses Markdown links in comments.'
          },
          wpd: {
            title: 'WebPlatform Docs',
            description:
              'Makes tokens link to <a href="https://webplatform.github.io/docs/">WebPlatform.org documentation</a>. The links open in a new tab.'
          },
          'custom-class': {
            title: 'Custom Class',
            description:
              "This plugin allows you to prefix Prism's default classes (<code>.comment</code> can become <code>.namespace--comment</code>) or replace them with your defined ones (like <code>.editor__comment</code>). You can even add new classes.",
            owner: 'dvkndn',
            noCSS: !0
          },
          'file-highlight': {
            title: 'File Highlight',
            description:
              'Fetch external files and highlight them with Prism. Used on the Prism website itself.',
            noCSS: !0
          },
          'show-language': {
            title: 'Show Language',
            description:
              'Display the highlighted language in code blocks (inline code does not show the label).',
            owner: 'nauzilus',
            noCSS: !0,
            require: 'toolbar'
          },
          'jsonp-highlight': {
            title: 'JSONP Highlight',
            description:
              'Fetch content with JSONP and highlight some interesting content (e.g. GitHub/Gists or Bitbucket API).',
            noCSS: !0,
            owner: 'nauzilus'
          },
          'highlight-keywords': {
            title: 'Highlight Keywords',
            description:
              'Adds special CSS classes for each keyword for fine-grained highlighting.',
            owner: 'vkbansal',
            noCSS: !0
          },
          'remove-initial-line-feed': {
            title: 'Remove initial line feed',
            description: 'Removes the initial line feed in code blocks.',
            owner: 'Golmote',
            noCSS: !0
          },
          'inline-color': {
            title: 'Inline color',
            description:
              'Adds a small inline preview for colors in style sheets.',
            require: 'css-extras',
            owner: 'RunDevelopment'
          },
          previewers: {
            title: 'Previewers',
            description:
              'Previewers for angles, colors, gradients, easing and time.',
            require: 'css-extras',
            owner: 'Golmote'
          },
          autoloader: {
            title: 'Autoloader',
            description:
              'Automatically loads the needed languages to highlight the code blocks.',
            owner: 'Golmote',
            noCSS: !0
          },
          'keep-markup': {
            title: 'Keep Markup',
            description:
              'Prevents custom markup from being dropped out during highlighting.',
            owner: 'Golmote',
            optional: 'normalize-whitespace',
            noCSS: !0
          },
          'command-line': {
            title: 'Command Line',
            description:
              'Display a command line with a prompt and, optionally, the output/response from the commands.',
            owner: 'chriswells0'
          },
          'unescaped-markup': {
            title: 'Unescaped Markup',
            description: 'Write markup without having to escape anything.'
          },
          'normalize-whitespace': {
            title: 'Normalize Whitespace',
            description:
              'Supports multiple operations to normalize whitespace in code blocks.',
            owner: 'zeitgeist87',
            optional: 'unescaped-markup',
            noCSS: !0
          },
          'data-uri-highlight': {
            title: 'Data-URI Highlight',
            description: 'Highlights data-URI contents.',
            owner: 'Golmote',
            noCSS: !0
          },
          toolbar: {
            title: 'Toolbar',
            description:
              'Attach a toolbar for plugins to easily register buttons on the top of a code block.',
            owner: 'mAAdhaTTah'
          },
          'copy-to-clipboard': {
            title: 'Copy to Clipboard Button',
            description:
              'Add a button that copies the code block to the clipboard when clicked.',
            owner: 'mAAdhaTTah',
            require: 'toolbar',
            noCSS: !0
          },
          'download-button': {
            title: 'Download Button',
            description:
              'A button in the toolbar of a code block adding a convenient way to download a code file.',
            owner: 'Golmote',
            require: 'toolbar',
            noCSS: !0
          },
          'match-braces': {
            title: 'Match braces',
            description: 'Highlights matching braces.',
            owner: 'RunDevelopment'
          },
          'diff-highlight': {
            title: 'Diff Highlight',
            description: 'Highlights the code inside diff blocks.',
            owner: 'RunDevelopment',
            require: 'diff'
          },
          'filter-highlight-all': {
            title: 'Filter highlightAll',
            description:
              'Filters the elements the <code>highlightAll</code> and <code>highlightAllUnder</code> methods actually highlight.',
            owner: 'RunDevelopment',
            noCSS: !0
          },
          treeview: {
            title: 'Treeview',
            description:
              'A language with special styles to highlight file system tree structures.',
            owner: 'Golmote'
          }
        }
      });
  },
  28848(e, t, i) {
    var r,
      a,
      n = (function (e) {
        var t = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,
          i = 0,
          r = {},
          a = {
            manual: e.Prism && e.Prism.manual,
            disableWorkerMessageHandler:
              e.Prism && e.Prism.disableWorkerMessageHandler,
            util: {
              encode: function e(t) {
                return t instanceof n
                  ? new n(t.type, e(t.content), t.alias)
                  : Array.isArray(t)
                    ? t.map(e)
                    : t
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/\u00a0/g, ' ');
              },
              type: function (e) {
                return Object.prototype.toString.call(e).slice(8, -1);
              },
              objId: function (e) {
                return (
                  e.__id || Object.defineProperty(e, '__id', { value: ++i }),
                  e.__id
                );
              },
              clone: function e(t, i) {
                var r, n;
                switch (((i = i || {}), a.util.type(t))) {
                  case 'Object':
                    if (i[(n = a.util.objId(t))]) return i[n];
                    for (var o in ((r = {}), (i[n] = r), t))
                      t.hasOwnProperty(o) && (r[o] = e(t[o], i));
                    return r;
                  case 'Array':
                    if (i[(n = a.util.objId(t))]) return i[n];
                    return (
                      (r = []),
                      (i[n] = r),
                      t.forEach(function (t, a) {
                        r[a] = e(t, i);
                      }),
                      r
                    );
                  default:
                    return t;
                }
              },
              getLanguage: function (e) {
                for (; e;) {
                  var i = t.exec(e.className);
                  if (i) return i[1].toLowerCase();
                  e = e.parentElement;
                }
                return 'none';
              },
              setLanguage: function (e, i) {
                ((e.className = e.className.replace(RegExp(t, 'gi'), '')),
                  e.classList.add('language-' + i));
              },
              currentScript: function () {
                if ('u' < typeof document) return null;
                if (
                  document.currentScript &&
                  'SCRIPT' === document.currentScript.tagName &&
                  1
                )
                  return document.currentScript;
                try {
                  throw Error();
                } catch (r) {
                  var e = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(r.stack) ||
                    [])[1];
                  if (e) {
                    var t = document.getElementsByTagName('script');
                    for (var i in t) if (t[i].src == e) return t[i];
                  }
                  return null;
                }
              },
              isActive: function (e, t, i) {
                for (var r = 'no-' + t; e;) {
                  var a = e.classList;
                  if (a.contains(t)) return !0;
                  if (a.contains(r)) return !1;
                  e = e.parentElement;
                }
                return !!i;
              }
            },
            languages: {
              plain: r,
              plaintext: r,
              text: r,
              txt: r,
              extend: function (e, t) {
                var i = a.util.clone(a.languages[e]);
                for (var r in t) i[r] = t[r];
                return i;
              },
              insertBefore: function (e, t, i, r) {
                var n = (r = r || a.languages)[e],
                  o = {};
                for (var l in n)
                  if (n.hasOwnProperty(l)) {
                    if (l == t)
                      for (var s in i) i.hasOwnProperty(s) && (o[s] = i[s]);
                    i.hasOwnProperty(l) || (o[l] = n[l]);
                  }
                var u = r[e];
                return (
                  (r[e] = o),
                  a.languages.DFS(a.languages, function (t, i) {
                    i === u && t != e && (this[t] = o);
                  }),
                  o
                );
              },
              DFS: function e(t, i, r, n) {
                n = n || {};
                var o = a.util.objId;
                for (var l in t)
                  if (t.hasOwnProperty(l)) {
                    i.call(t, l, t[l], r || l);
                    var s = t[l],
                      u = a.util.type(s);
                    'Object' !== u || n[o(s)]
                      ? 'Array' !== u ||
                        n[o(s)] ||
                        ((n[o(s)] = !0), e(s, i, l, n))
                      : ((n[o(s)] = !0), e(s, i, null, n));
                  }
              }
            },
            plugins: {},
            highlightAll: function (e, t) {
              a.highlightAllUnder(document, e, t);
            },
            highlightAllUnder: function (e, t, i) {
              var r = {
                callback: i,
                container: e,
                selector:
                  'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
              };
              (a.hooks.run('before-highlightall', r),
                (r.elements = Array.prototype.slice.apply(
                  r.container.querySelectorAll(r.selector)
                )),
                a.hooks.run('before-all-elements-highlight', r));
              for (var n, o = 0; (n = r.elements[o++]);)
                a.highlightElement(n, !0 === t, r.callback);
            },
            highlightElement: function (t, i, r) {
              var n = a.util.getLanguage(t),
                o = a.languages[n];
              a.util.setLanguage(t, n);
              var l = t.parentElement;
              l &&
                'pre' === l.nodeName.toLowerCase() &&
                a.util.setLanguage(l, n);
              var s = t.textContent,
                u = { element: t, language: n, grammar: o, code: s };
              function c(e) {
                ((u.highlightedCode = e),
                  a.hooks.run('before-insert', u),
                  (u.element.innerHTML = u.highlightedCode),
                  a.hooks.run('after-highlight', u),
                  a.hooks.run('complete', u),
                  r && r.call(u.element));
              }
              if (
                (a.hooks.run('before-sanity-check', u),
                (l = u.element.parentElement) &&
                  'pre' === l.nodeName.toLowerCase() &&
                  !l.hasAttribute('tabindex') &&
                  l.setAttribute('tabindex', '0'),
                !u.code)
              ) {
                (a.hooks.run('complete', u), r && r.call(u.element));
                return;
              }
              if ((a.hooks.run('before-highlight', u), !u.grammar))
                return void c(a.util.encode(u.code));
              if (i && e.Worker) {
                var p = new Worker(a.filename);
                ((p.onmessage = function (e) {
                  c(e.data);
                }),
                  p.postMessage(
                    JSON.stringify({
                      language: u.language,
                      code: u.code,
                      immediateClose: !0
                    })
                  ));
              } else c(a.highlight(u.code, u.grammar, u.language));
            },
            highlight: function (e, t, i) {
              var r = { code: e, grammar: t, language: i };
              if ((a.hooks.run('before-tokenize', r), !r.grammar))
                throw Error(
                  'The language "' + r.language + '" has no grammar.'
                );
              return (
                (r.tokens = a.tokenize(r.code, r.grammar)),
                a.hooks.run('after-tokenize', r),
                n.stringify(a.util.encode(r.tokens), r.language)
              );
            },
            tokenize: function (e, t) {
              var i = t.rest;
              if (i) {
                for (var r in i) t[r] = i[r];
                delete t.rest;
              }
              var u = new l();
              return (
                s(u, u.head, e),
                (function e(t, i, r, l, u, c) {
                  for (var p in r)
                    if (r.hasOwnProperty(p) && r[p]) {
                      var m = r[p];
                      m = Array.isArray(m) ? m : [m];
                      for (var g = 0; g < m.length; ++g) {
                        if (c && c.cause == p + ',' + g) return;
                        var d = m[g],
                          h = d.inside,
                          w = !!d.lookbehind,
                          f = !!d.greedy,
                          v = d.alias;
                        if (f && !d.pattern.global) {
                          var k = d.pattern.toString().match(/[imsuy]*$/)[0];
                          d.pattern = RegExp(d.pattern.source, k + 'g');
                        }
                        for (
                          var b = d.pattern || d, y = l.next, x = u;
                          y !== i.tail && (!c || !(x >= c.reach));
                          x += y.value.length, y = y.next
                        ) {
                          var S,
                            A = y.value;
                          if (i.length > t.length) return;
                          if (!(A instanceof n)) {
                            var q = 1;
                            if (f) {
                              if (!(S = o(b, x, t, w)) || S.index >= t.length)
                                break;
                              var R = S.index,
                                D = S.index + S[0].length,
                                F = x;
                              for (F += y.value.length; R >= F;)
                                F += (y = y.next).value.length;
                              if (
                                ((F -= y.value.length),
                                (x = F),
                                y.value instanceof n)
                              )
                                continue;
                              for (
                                var j = y;
                                j !== i.tail &&
                                (F < D || 'string' == typeof j.value);
                                j = j.next
                              )
                                (q++, (F += j.value.length));
                              (q--, (A = t.slice(x, F)), (S.index -= x));
                            } else if (!(S = o(b, 0, A, w))) continue;
                            var R = S.index,
                              C = S[0],
                              G = A.slice(0, R),
                              T = A.slice(R + C.length),
                              L = x + A.length;
                            c && L > c.reach && (c.reach = L);
                            var P = y.prev;
                            if (
                              (G && ((P = s(i, P, G)), (x += G.length)),
                              (function (e, t, i) {
                                for (
                                  var r = t.next, a = 0;
                                  a < i && r !== e.tail;
                                  a++
                                )
                                  r = r.next;
                                ((t.next = r), (r.prev = t), (e.length -= a));
                              })(i, P, q),
                              (y = s(
                                i,
                                P,
                                new n(p, h ? a.tokenize(C, h) : C, v, C)
                              )),
                              T && s(i, y, T),
                              q > 1)
                            ) {
                              var E = { cause: p + ',' + g, reach: L };
                              (e(t, i, r, y.prev, x, E),
                                c && E.reach > c.reach && (c.reach = E.reach));
                            }
                          }
                        }
                      }
                    }
                })(e, u, t, u.head, 0),
                (function (e) {
                  for (var t = [], i = e.head.next; i !== e.tail;)
                    (t.push(i.value), (i = i.next));
                  return t;
                })(u)
              );
            },
            hooks: {
              all: {},
              add: function (e, t) {
                var i = a.hooks.all;
                ((i[e] = i[e] || []), i[e].push(t));
              },
              run: function (e, t) {
                var i = a.hooks.all[e];
                if (i && i.length) for (var r, n = 0; (r = i[n++]);) r(t);
              }
            },
            Token: n
          };
        function n(e, t, i, r) {
          ((this.type = e),
            (this.content = t),
            (this.alias = i),
            (this.length = 0 | (r || '').length));
        }
        function o(e, t, i, r) {
          e.lastIndex = t;
          var a = e.exec(i);
          if (a && r && a[1]) {
            var n = a[1].length;
            ((a.index += n), (a[0] = a[0].slice(n)));
          }
          return a;
        }
        function l() {
          var e = { value: null, prev: null, next: null },
            t = { value: null, prev: e, next: null };
          ((e.next = t), (this.head = e), (this.tail = t), (this.length = 0));
        }
        function s(e, t, i) {
          var r = t.next,
            a = { value: i, prev: t, next: r };
          return ((t.next = a), (r.prev = a), e.length++, a);
        }
        if (
          ((e.Prism = a),
          (n.stringify = function e(t, i) {
            if ('string' == typeof t) return t;
            if (Array.isArray(t)) {
              var r = '';
              return (
                t.forEach(function (t) {
                  r += e(t, i);
                }),
                r
              );
            }
            var n = {
                type: t.type,
                content: e(t.content, i),
                tag: 'span',
                classes: ['token', t.type],
                attributes: {},
                language: i
              },
              o = t.alias;
            (o &&
              (Array.isArray(o)
                ? Array.prototype.push.apply(n.classes, o)
                : n.classes.push(o)),
              a.hooks.run('wrap', n));
            var l = '';
            for (var s in n.attributes)
              l +=
                ' ' +
                s +
                '="' +
                (n.attributes[s] || '').replace(/"/g, '&quot;') +
                '"';
            return (
              '<' +
              n.tag +
              ' class="' +
              n.classes.join(' ') +
              '"' +
              l +
              '>' +
              n.content +
              '</' +
              n.tag +
              '>'
            );
          }),
          !e.document)
        )
          return (
            e.addEventListener &&
              (a.disableWorkerMessageHandler ||
                e.addEventListener(
                  'message',
                  function (t) {
                    var i = JSON.parse(t.data),
                      r = i.language,
                      n = i.code,
                      o = i.immediateClose;
                    (e.postMessage(a.highlight(n, a.languages[r], r)),
                      o && e.close());
                  },
                  !1
                )),
            a
          );
        var u = a.util.currentScript();
        function c() {
          a.manual || a.highlightAll();
        }
        if (
          (u &&
            ((a.filename = u.src),
            u.hasAttribute('data-manual') && (a.manual = !0)),
          !a.manual)
        ) {
          var p = document.readyState;
          'loading' === p || ('interactive' === p && u && u.defer)
            ? document.addEventListener('DOMContentLoaded', c)
            : window.requestAnimationFrame
              ? window.requestAnimationFrame(c)
              : window.setTimeout(c, 16);
        }
        return a;
      })(
        'u' > typeof window
          ? window
          : 'u' > typeof WorkerGlobalScope && self instanceof WorkerGlobalScope
            ? self
            : {}
      );
    (e.exports && (e.exports = n),
      void 0 !== i.g && (i.g.Prism = n),
      (n.languages.markup = {
        comment: { pattern: /<!--(?:(?!<!--)[\s\S])*?-->/, greedy: !0 },
        prolog: { pattern: /<\?[\s\S]+?\?>/, greedy: !0 },
        doctype: {
          pattern:
            /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
          greedy: !0,
          inside: {
            'internal-subset': {
              pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
              lookbehind: !0,
              greedy: !0,
              inside: null
            },
            string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
            punctuation: /^<!|>$|[[\]]/,
            'doctype-tag': /^DOCTYPE/i,
            name: /[^\s<>'"]+/
          }
        },
        cdata: { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, greedy: !0 },
        tag: {
          pattern:
            /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
          greedy: !0,
          inside: {
            tag: {
              pattern: /^<\/?[^\s>\/]+/,
              inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ }
            },
            'special-attr': [],
            'attr-value': {
              pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
              inside: {
                punctuation: [
                  { pattern: /^=/, alias: 'attr-equals' },
                  { pattern: /^(\s*)["']|["']$/, lookbehind: !0 }
                ]
              }
            },
            punctuation: /\/?>/,
            'attr-name': {
              pattern: /[^\s>\/]+/,
              inside: { namespace: /^[^\s>\/:]+:/ }
            }
          }
        },
        entity: [
          { pattern: /&[\da-z]{1,8};/i, alias: 'named-entity' },
          /&#x?[\da-f]{1,8};/i
        ]
      }),
      (n.languages.markup.tag.inside['attr-value'].inside.entity =
        n.languages.markup.entity),
      (n.languages.markup.doctype.inside['internal-subset'].inside =
        n.languages.markup),
      n.hooks.add('wrap', function (e) {
        'entity' === e.type &&
          (e.attributes.title = e.content.replace(/&amp;/, '&'));
      }),
      Object.defineProperty(n.languages.markup.tag, 'addInlined', {
        value: function (e, t) {
          var i = {};
          ((i['language-' + t] = {
            pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
            lookbehind: !0,
            inside: n.languages[t]
          }),
            (i.cdata = /^<!\[CDATA\[|\]\]>$/i));
          var r = {
            'included-cdata': {
              pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
              inside: i
            }
          };
          r['language-' + t] = { pattern: /[\s\S]+/, inside: n.languages[t] };
          var a = {};
          ((a[e] = {
            pattern: RegExp(
              /(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(
                /__/g,
                function () {
                  return e;
                }
              ),
              'i'
            ),
            lookbehind: !0,
            greedy: !0,
            inside: r
          }),
            n.languages.insertBefore('markup', 'cdata', a));
        }
      }),
      Object.defineProperty(n.languages.markup.tag, 'addAttribute', {
        value: function (e, t) {
          n.languages.markup.tag.inside['special-attr'].push({
            pattern: RegExp(
              /(^|["'\s])/.source +
                '(?:' +
                e +
                ')' +
                /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
              'i'
            ),
            lookbehind: !0,
            inside: {
              'attr-name': /^[^\s=]+/,
              'attr-value': {
                pattern: /=[\s\S]+/,
                inside: {
                  value: {
                    pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                    lookbehind: !0,
                    alias: [t, 'language-' + t],
                    inside: n.languages[t]
                  },
                  punctuation: [{ pattern: /^=/, alias: 'attr-equals' }, /"|'/]
                }
              }
            }
          });
        }
      }),
      (n.languages.html = n.languages.markup),
      (n.languages.mathml = n.languages.markup),
      (n.languages.svg = n.languages.markup),
      (n.languages.xml = n.languages.extend('markup', {})),
      (n.languages.ssml = n.languages.xml),
      (n.languages.atom = n.languages.xml),
      (n.languages.rss = n.languages.xml),
      (r =
        /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/),
      (n.languages.css = {
        comment: /\/\*[\s\S]*?\*\//,
        atrule: {
          pattern: RegExp(
            '@[\\w-](?:' +
              /[^;{\s"']|\s+(?!\s)/.source +
              '|' +
              r.source +
              ')*?' +
              /(?:;|(?=\s*\{))/.source
          ),
          inside: {
            rule: /^@[\w-]+/,
            'selector-function-argument': {
              pattern:
                /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
              lookbehind: !0,
              alias: 'selector'
            },
            keyword: {
              pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
              lookbehind: !0
            }
          }
        },
        url: {
          pattern: RegExp(
            '\\burl\\((?:' +
              r.source +
              '|' +
              /(?:[^\\\r\n()"']|\\[\s\S])*/.source +
              ')\\)',
            'i'
          ),
          greedy: !0,
          inside: {
            function: /^url/i,
            punctuation: /^\(|\)$/,
            string: { pattern: RegExp('^' + r.source + '$'), alias: 'url' }
          }
        },
        selector: {
          pattern: RegExp(
            '(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' +
              r.source +
              ')*(?=\\s*\\{)'
          ),
          lookbehind: !0
        },
        string: { pattern: r, greedy: !0 },
        property: {
          pattern:
            /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
          lookbehind: !0
        },
        important: /!important\b/i,
        function: {
          pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
          lookbehind: !0
        },
        punctuation: /[(){};:,]/
      }),
      (n.languages.css.atrule.inside.rest = n.languages.css),
      (a = n.languages.markup) &&
        (a.tag.addInlined('style', 'css'), a.tag.addAttribute('style', 'css')),
      (n.languages.clike = {
        comment: [
          {
            pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
            lookbehind: !0,
            greedy: !0
          },
          { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 }
        ],
        string: {
          pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
          greedy: !0
        },
        'class-name': {
          pattern:
            /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
          lookbehind: !0,
          inside: { punctuation: /[.\\]/ }
        },
        keyword:
          /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
        boolean: /\b(?:false|true)\b/,
        function: /\b\w+(?=\()/,
        number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
        operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
        punctuation: /[{}[\];(),.:]/
      }),
      (n.languages.javascript = n.languages.extend('clike', {
        'class-name': [
          n.languages.clike['class-name'],
          {
            pattern:
              /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
            lookbehind: !0
          }
        ],
        keyword: [
          { pattern: /((?:^|\})\s*)catch\b/, lookbehind: !0 },
          {
            pattern:
              /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
            lookbehind: !0
          }
        ],
        function:
          /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
        number: {
          pattern: RegExp(
            /(^|[^\w$])/.source +
              '(?:' +
              (/NaN|Infinity/.source +
                '|' +
                /0[bB][01]+(?:_[01]+)*n?/.source +
                '|' +
                /0[oO][0-7]+(?:_[0-7]+)*n?/.source +
                '|' +
                /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source +
                '|' +
                /\d+(?:_\d+)*n/.source) +
              '|' +
              /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/
                .source +
              ')' +
              /(?![\w$])/.source
          ),
          lookbehind: !0
        },
        operator:
          /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
      })),
      (n.languages.javascript['class-name'][0].pattern =
        /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/),
      n.languages.insertBefore('javascript', 'keyword', {
        regex: {
          pattern: RegExp(
            /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source +
              /\//.source +
              '(?:' +
              /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/
                .source +
              '|' +
              /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/
                .source +
              ')' +
              /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/
                .source
          ),
          lookbehind: !0,
          greedy: !0,
          inside: {
            'regex-source': {
              pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
              lookbehind: !0,
              alias: 'language-regex',
              inside: n.languages.regex
            },
            'regex-delimiter': /^\/|\/$/,
            'regex-flags': /^[a-z]+$/
          }
        },
        'function-variable': {
          pattern:
            /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
          alias: 'function'
        },
        parameter: [
          {
            pattern:
              /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
            lookbehind: !0,
            inside: n.languages.javascript
          },
          {
            pattern:
              /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
            lookbehind: !0,
            inside: n.languages.javascript
          },
          {
            pattern:
              /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
            lookbehind: !0,
            inside: n.languages.javascript
          },
          {
            pattern:
              /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
            lookbehind: !0,
            inside: n.languages.javascript
          }
        ],
        constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
      }),
      n.languages.insertBefore('javascript', 'string', {
        hashbang: { pattern: /^#!.*/, greedy: !0, alias: 'comment' },
        'template-string': {
          pattern:
            /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
          greedy: !0,
          inside: {
            'template-punctuation': { pattern: /^`|`$/, alias: 'string' },
            interpolation: {
              pattern:
                /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
              lookbehind: !0,
              inside: {
                'interpolation-punctuation': {
                  pattern: /^\$\{|\}$/,
                  alias: 'punctuation'
                },
                rest: n.languages.javascript
              }
            },
            string: /[\s\S]+/
          }
        },
        'string-property': {
          pattern:
            /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
          lookbehind: !0,
          greedy: !0,
          alias: 'property'
        }
      }),
      n.languages.insertBefore('javascript', 'operator', {
        'literal-property': {
          pattern:
            /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
          lookbehind: !0,
          alias: 'property'
        }
      }),
      n.languages.markup &&
        (n.languages.markup.tag.addInlined('script', 'javascript'),
        n.languages.markup.tag.addAttribute(
          /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/
            .source,
          'javascript'
        )),
      (n.languages.js = n.languages.javascript),
      (function () {
        if (void 0 !== n && 'u' > typeof document) {
          Element.prototype.matches ||
            (Element.prototype.matches =
              Element.prototype.msMatchesSelector ||
              Element.prototype.webkitMatchesSelector);
          var e = {
              js: 'javascript',
              py: 'python',
              rb: 'ruby',
              ps1: 'powershell',
              psm1: 'powershell',
              sh: 'bash',
              bat: 'batch',
              h: 'c',
              tex: 'latex'
            },
            t = 'data-src-status',
            i = 'loading',
            r = 'loaded',
            a =
              'pre[data-src]:not([' +
              t +
              '="' +
              r +
              '"]):not([' +
              t +
              '="' +
              i +
              '"])';
          (n.hooks.add('before-highlightall', function (e) {
            e.selector += ', ' + a;
          }),
            n.hooks.add('before-sanity-check', function (o) {
              var l = o.element;
              if (l.matches(a)) {
                ((o.code = ''), l.setAttribute(t, i));
                var s,
                  u,
                  c,
                  p,
                  m = l.appendChild(document.createElement('CODE'));
                m.textContent = 'Loading…';
                var g = l.getAttribute('data-src'),
                  d = o.language;
                if ('none' === d) {
                  var h = (/\.(\w+)$/.exec(g) || [, 'none'])[1];
                  d = e[h] || h;
                }
                (n.util.setLanguage(m, d), n.util.setLanguage(l, d));
                var w = n.plugins.autoloader;
                (w && w.loadLanguages(d),
                  (s = g),
                  (u = function (e) {
                    l.setAttribute(t, r);
                    var i = (function (e) {
                      var t = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(
                        e || ''
                      );
                      if (t) {
                        var i = Number(t[1]),
                          r = t[2],
                          a = t[3];
                        return r ? (a ? [i, Number(a)] : [i, void 0]) : [i, i];
                      }
                    })(l.getAttribute('data-range'));
                    if (i) {
                      var a = e.split(/\r\n?|\n/g),
                        o = i[0],
                        s = null == i[1] ? a.length : i[1];
                      (o < 0 && (o += a.length),
                        (o = Math.max(0, Math.min(o - 1, a.length))),
                        s < 0 && (s += a.length),
                        (s = Math.max(0, Math.min(s, a.length))),
                        (e = a.slice(o, s).join('\n')),
                        l.hasAttribute('data-start') ||
                          l.setAttribute('data-start', String(o + 1)));
                    }
                    ((m.textContent = e), n.highlightElement(m));
                  }),
                  (c = function (e) {
                    (l.setAttribute(t, 'failed'), (m.textContent = e));
                  }),
                  (p = new XMLHttpRequest()).open('GET', s, !0),
                  (p.onreadystatechange = function () {
                    var e;
                    4 == p.readyState &&
                      (p.status < 400 && p.responseText
                        ? u(p.responseText)
                        : p.status >= 400
                          ? c(
                              ((e = p.status),
                              '✖ Error ' +
                                e +
                                ' while fetching file: ' +
                                p.statusText)
                            )
                          : c('✖ Error: File does not exist or is empty'));
                  }),
                  p.send(null));
              }
            }),
            (n.plugins.fileHighlight = {
              highlight: function (e) {
                for (
                  var t, i = (e || document).querySelectorAll(a), r = 0;
                  (t = i[r++]);
                )
                  n.highlightElement(t);
              }
            }));
          var o = !1;
          n.fileHighlight = function () {
            (o ||
              (console.warn(
                'Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.'
              ),
              (o = !0)),
              n.plugins.fileHighlight.highlight.apply(this, arguments));
          };
        }
      })());
  }
};
//# sourceMappingURL=1825.599c6236c8613bc0.js.map
