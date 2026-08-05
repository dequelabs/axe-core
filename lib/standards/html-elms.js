// Source: https://www.w3.org/TR/html-aria/#allowed-aria-roles-states-and-properties
// Source: https://www.w3.org/TR/html-aam-1.0/#html-element-role-mappings
// Source https://html.spec.whatwg.org/multipage/dom.html#content-models
// Source https://dom.spec.whatwg.org/#dom-element-attachshadow
const htmlElms = {
  a: {
    // Note: variants work by matching the node against the
    // `matches` attribute. if the variant matches AND has the
    // desired property (contentTypes, etc.) then we use it,
    // otherwise we move on to the next matching variant
    variant: {
      href: {
        matches: '[href]',
        contentTypes: ['interactive', 'phrasing', 'flow'],
        allowedRoles: [
          'button',
          'checkbox',
          'menuitem',
          'menuitemcheckbox',
          'menuitemradio',
          'option',
          'radio',
          'switch',
          'tab',
          'treeitem',
          'doc-backlink',
          'doc-biblioref',
          'doc-glossref',
          'doc-noteref'
        ],
        namingMethods: ['subtreeText']
      },
      // Note: the default variant is a special variant and is
      // used as the last match if none of the other variants
      // match or have the desired attribute
      default: {
        contentTypes: ['phrasing', 'flow'],
        allowedRoles: true,
        namingProhibited: true
      }
    }
  },
  abbr: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: true,
    namingProhibited: true
  },
  address: {
    contentTypes: ['flow'],
    allowedRoles: true
  },
  area: {
    variant: {
      href: {
        matches: '[href]',
        allowedRoles: false
      },
      default: {
        allowedRoles: ['button', 'link'],
        namingProhibited: true
      }
    },
    contentTypes: ['phrasing', 'flow'],
    namingMethods: ['altText']
  },
  article: {
    contentTypes: ['sectioning', 'flow'],
    allowedRoles: [
      'feed',
      'presentation',
      'none',
      'document',
      'application',
      'main',
      'region'
    ],
    shadowRoot: true
  },
  aside: {
    contentTypes: ['sectioning', 'flow'],
    allowedRoles: [
      'feed',
      'note',
      'presentation',
      'none',
      'region',
      'search',
      'doc-dedication',
      'doc-example',
      'doc-footnote',
      'doc-glossary',
      'doc-pullquote',
      'doc-tip'
    ]
  },
  audio: {
    variant: {
      controls: {
        matches: '[controls]',
        contentTypes: ['interactive', 'embedded', 'phrasing', 'flow']
      },
      default: {
        contentTypes: ['embedded', 'phrasing', 'flow']
      }
    },
    // Note: if the property applies regardless of variants it is
    // placed at the top level instead of the default variant
    allowedRoles: ['application'],
    chromiumRole: 'Audio'
  },
  b: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: true,
    namingProhibited: true
  },
  base: {
    allowedRoles: false,
    allowedAriaAttrs: []
  },
  bdi: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: true,
    namingProhibited: true
  },
  bdo: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: true,
    namingProhibited: true
  },
  blockquote: {
    contentTypes: ['flow'],
    allowedRoles: true,
    shadowRoot: true
  },
  body: {
    allowedRoles: false,
    shadowRoot: true,
    namingProhibited: true
  },
  br: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: ['presentation', 'none'],
    namingMethods: ['titleText', 'singleSpace'],
    allowedAriaAttrs: ['aria-hidden']
  },
  button: {
    contentTypes: ['interactive', 'phrasing', 'flow'],
    allowedRoles: [
      'checkbox',
      'combobox',
      'gridcell',
      'link',
      'menuitem',
      'menuitemcheckbox',
      'menuitemradio',
      'option',
      'radio',
      'separator',
      'slider',
      'switch',
      'tab',
      'treeitem'
    ],
    // 5.4 button Element
    namingMethods: ['subtreeText']
  },
  canvas: {
    allowedRoles: true,
    contentTypes: ['embedded', 'phrasing', 'flow'],
    chromiumRole: 'Canvas'
  },
  caption: {
    allowedRoles: false,
    namingProhibited: true
  },
  cite: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: true,
    namingProhibited: true
  },
  code: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: true,
    namingProhibited: true
  },
  col: {
    allowedRoles: false,
    allowedAriaAttrs: []
  },
  colgroup: {
    allowedRoles: false,
    allowedAriaAttrs: []
  },
  data: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: true,
    namingProhibited: true
  },
  datalist: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: false,
    allowedAriaAttrs: [],
    implicitAttrs: {
      // Note: even though the value of aria-multiselectable is based
      // on the attributes, we don't currently need to know the
      // precise value. however, this allows us to make the attribute
      // future proof in case we ever do need to know it
      'aria-multiselectable': 'false'
    }
  },
  dd: {
    allowedRoles: false,
    namingProhibited: true
  },
  del: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: true,
    namingProhibited: true
  },
  dfn: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: true
  },
  details: {
    contentTypes: ['interactive', 'flow'],
    allowedRoles: false
  },
  dialog: {
    contentTypes: ['flow'],
    allowedRoles: ['alertdialog']
  },
  div: {
    contentTypes: ['flow'],
    allowedRoles: true,
    shadowRoot: true,
    namingProhibited: true
  },
  dl: {
    contentTypes: ['flow'],
    allowedRoles: ['group', 'list', 'presentation', 'none'],
    chromiumRole: 'DescriptionList'
  },
  dt: {
    allowedRoles: ['listitem']
  },
  em: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: true,
    namingProhibited: true
  },
  embed: {
    contentTypes: ['interactive', 'embedded', 'phrasing', 'flow'],
    allowedRoles: [
      'application',
      'document',
      'img',
      'image',
      'presentation',
      'none'
    ],
    chromiumRole: 'EmbeddedObject'
  },
  fieldset: {
    contentTypes: ['flow'],
    allowedRoles: ['none', 'presentation', 'radiogroup'],
    // 5.5 fieldset and legend Elements
    namingMethods: ['fieldsetLegendText']
  },
  figcaption: {
    allowedRoles: ['group', 'none', 'presentation'],
    namingProhibited: true
  },
  figure: {
    variant: {
      figcaption: {
        matches: {
          hasChild: 'figcaption'
        },
        allowedRoles: ['doc-example']
      },
      default: {
        allowedRoles: true
      }
    },
    contentTypes: ['flow'],
    // 5.9 figure and figcaption Elements
    namingMethods: ['figureText', 'titleText']
  },
  footer: {
    contentTypes: ['flow'],
    allowedRoles: ['group', 'none', 'presentation', 'doc-footnote'],
    shadowRoot: true
  },
  form: {
    contentTypes: ['flow'],
    allowedRoles: ['form', 'search', 'none', 'presentation']
  },
  h1: {
    contentTypes: ['heading', 'flow'],
    allowedRoles: ['none', 'presentation', 'tab', 'doc-subtitle'],
    shadowRoot: true,
    implicitAttrs: {
      'aria-level': '1'
    }
  },
  h2: {
    contentTypes: ['heading', 'flow'],
    allowedRoles: ['none', 'presentation', 'tab', 'doc-subtitle'],
    shadowRoot: true,
    implicitAttrs: {
      'aria-level': '2'
    }
  },
  h3: {
    contentTypes: ['heading', 'flow'],
    allowedRoles: ['none', 'presentation', 'tab', 'doc-subtitle'],
    shadowRoot: true,
    implicitAttrs: {
      'aria-level': '3'
    }
  },
  h4: {
    contentTypes: ['heading', 'flow'],
    allowedRoles: ['none', 'presentation', 'tab', 'doc-subtitle'],
    shadowRoot: true,
    implicitAttrs: {
      'aria-level': '4'
    }
  },
  h5: {
    contentTypes: ['heading', 'flow'],
    allowedRoles: ['none', 'presentation', 'tab', 'doc-subtitle'],
    shadowRoot: true,
    implicitAttrs: {
      'aria-level': '5'
    }
  },
  h6: {
    contentTypes: ['heading', 'flow'],
    allowedRoles: ['none', 'presentation', 'tab', 'doc-subtitle'],
    shadowRoot: true,
    implicitAttrs: {
      'aria-level': '6'
    }
  },
  head: {
    allowedRoles: false,
    allowedAriaAttrs: []
  },
  header: {
    contentTypes: ['flow'],
    allowedRoles: ['group', 'none', 'presentation', 'doc-footnote'],
    shadowRoot: true
  },
  hgroup: {
    contentTypes: ['heading', 'flow'],
    allowedRoles: true
  },
  hr: {
    contentTypes: ['flow'],
    allowedRoles: ['none', 'presentation', 'doc-pagebreak'],
    namingMethods: ['titleText', 'singleSpace']
  },
  html: {
    allowedRoles: false,
    allowedAriaAttrs: []
  },
  i: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: true,
    namingProhibited: true
  },
  iframe: {
    contentTypes: ['interactive', 'embedded', 'phrasing', 'flow'],
    allowedRoles: [
      'application',
      'document',
      'img',
      'image',
      'none',
      'presentation'
    ],
    chromiumRole: 'Iframe'
  },
  img: {
    variant: {
      nonEmptyAlt: {
        matches: [
          {
            // Because <img role="none" alt="foo" /> has no accessible name:
            attributes: {
              alt: '/.+/'
            }
          },
          {
            hasAccessibleName: true
          }
        ],
        allowedRoles: [
          'button',
          'checkbox',
          'link',
          'math',
          'menuitem',
          'menuitemcheckbox',
          'menuitemradio',
          'meter',
          'option',
          'progressbar',
          'radio',
          'scrollbar',
          'separator',
          'slider',
          'switch',
          'tab',
          'treeitem',
          'doc-cover'
        ]
      },
      usemap: {
        matches: '[usemap]',
        contentTypes: ['interactive', 'embedded', 'flow']
      },
      default: {
        // Note: allow role presentation and none on image with no
        // alt as a way to prevent axe from flagging the image as
        // needing an alt
        allowedRoles: ['presentation', 'none'],
        // Note: spec change (do not count as phrasing), because browsers
        // insert a space between an img's accessible name and other
        // elements' accessible names
        contentTypes: ['embedded', 'flow']
      }
    },
    // 5.10 img Element
    namingMethods: ['altText']
  },
  input: {
    variant: {
      button: {
        matches: {
          properties: {
            type: 'button'
          }
        },
        allowedRoles: [
          'checkbox',
          'combobox',
          'link',
          'menuitem',
          'menuitemcheckbox',
          'menuitemradio',
          'option',
          'radio',
          'switch',
          'tab'
        ]
      },
      // 5.2 input type="button", input type="submit" and input type="reset"
      buttonType: {
        matches: {
          properties: {
            type: ['button', 'submit', 'reset']
          }
        },
        namingMethods: ['valueText', 'titleText', 'buttonDefaultText']
      },
      checkboxPressed: {
        matches: {
          properties: {
            type: 'checkbox'
          },
          attributes: {
            'aria-pressed': '/.*/'
          }
        },
        allowedRoles: ['button', 'menuitemcheckbox', 'option', 'switch'],
        implicitAttrs: {
          'aria-checked': 'false'
        }
      },
      checkbox: {
        matches: {
          properties: {
            type: 'checkbox'
          },
          attributes: {
            'aria-pressed': null
          }
        },
        allowedRoles: ['menuitemcheckbox', 'option', 'switch'],
        implicitAttrs: {
          'aria-checked': 'false'
        }
      },
      noRoles: {
        matches: {
          properties: {
            // Note: types of url, search, tel, and email are listed
            // as not allowed roles however since they are text
            // types they should be allowed to have role=combobox
            type: [
              'color',
              'date',
              'datetime-local',
              'file',
              'month',
              'number',
              'password',
              'range',
              'reset',
              'submit',
              'time',
              'week'
            ]
          }
        },
        allowedRoles: false
      },
      hidden: {
        matches: {
          properties: {
            type: 'hidden'
          }
        },
        // Note: spec change (do not count as phrasing)
        contentTypes: ['flow'],
        allowedRoles: false,
        allowedAriaAttrs: []
      },
      image: {
        matches: {
          properties: {
            type: 'image'
          }
        },
        allowedRoles: [
          'link',
          'menuitem',
          'menuitemcheckbox',
          'menuitemradio',
          'radio',
          'switch'
        ],
        // 5.3 input type="image"
        namingMethods: [
          'altText',
          'valueText',
          'labelText',
          'titleText',
          'buttonDefaultText'
        ]
      },
      radio: {
        matches: {
          properties: {
            type: 'radio'
          }
        },
        allowedRoles: ['menuitemradio'],
        implicitAttrs: {
          'aria-checked': 'false'
        }
      },
      textWithList: {
        matches: {
          properties: {
            type: 'text'
          },
          attributes: {
            list: '/.*/'
          }
        },
        allowedRoles: false
      },
      default: {
        // Note: spec change (do not count as phrasing)
        contentTypes: ['interactive', 'flow'],
        allowedRoles: ['combobox', 'searchbox', 'spinbutton'],
        implicitAttrs: {
          'aria-valuenow': ''
        },
        // 5.1 input type="text", input type="password", input type="search", input type="tel", input type="url"
        // 5.7 Other Form Elements
        namingMethods: ['labelText', 'placeholderText']
      }
    }
  },
  ins: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: true,
    namingProhibited: true
  },
  kbd: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: true,
    namingProhibited: true
  },
  label: {
    contentTypes: ['interactive', 'phrasing', 'flow'],
    allowedRoles: false,
    chromiumRole: 'Label',
    namingProhibited: true
  },
  legend: {
    allowedRoles: false,
    namingProhibited: true
  },
  li: {
    allowedRoles: [
      'menuitem',
      'menuitemcheckbox',
      'menuitemradio',
      'option',
      'none',
      'presentation',
      'radio',
      'separator',
      'tab',
      'treeitem',
      'doc-biblioentry',
      'doc-endnote'
    ],
    implicitAttrs: {
      'aria-setsize': '1',
      'aria-posinset': '1'
    }
  },
  link: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: false,
    allowedAriaAttrs: []
  },
  main: {
    contentTypes: ['flow'],
    allowedRoles: false,
    shadowRoot: true
  },
  map: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: false,
    allowedAriaAttrs: []
  },
  math: {
    contentTypes: ['embedded', 'phrasing', 'flow'],
    allowedRoles: false
  },
  mark: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: true,
    namingProhibited: true
  },
  menu: {
    contentTypes: ['flow'],
    allowedRoles: [
      'directory',
      'group',
      'listbox',
      'menu',
      'menubar',
      'none',
      'presentation',
      'radiogroup',
      'tablist',
      'toolbar',
      'tree'
    ]
  },
  meta: {
    variant: {
      itemprop: {
        matches: '[itemprop]',
        contentTypes: ['phrasing', 'flow']
      }
    },
    allowedRoles: false,
    allowedAriaAttrs: []
  },
  meter: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: false,
    chromiumRole: 'progressbar'
  },
  nav: {
    contentTypes: ['sectioning', 'flow'],
    allowedRoles: [
      'doc-index',
      'doc-pagelist',
      'doc-toc',
      'menu',
      'menubar',
      'none',
      'presentation',
      'tablist'
    ],
    shadowRoot: true
  },
  noscript: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: false,
    allowedAriaAttrs: []
  },
  object: {
    variant: {
      usemap: {
        matches: '[usemap]',
        contentTypes: ['interactive', 'embedded', 'phrasing', 'flow']
      },
      default: {
        contentTypes: ['embedded', 'phrasing', 'flow']
      }
    },
    allowedRoles: ['application', 'document', 'img', 'image'],
    chromiumRole: 'PluginObject'
  },
  ol: {
    contentTypes: ['flow'],
    allowedRoles: [
      'directory',
      'group',
      'listbox',
      'menu',
      'menubar',
      'none',
      'presentation',
      'radiogroup',
      'tablist',
      'toolbar',
      'tree'
    ]
  },
  optgroup: {
    allowedRoles: false
  },
  option: {
    allowedRoles: false,
    implicitAttrs: {
      'aria-selected': 'false'
    }
  },
  output: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: true,
    // 5.6 output Element
    namingMethods: ['subtreeText']
  },
  p: {
    contentTypes: ['flow'],
    allowedRoles: true,
    shadowRoot: true,
    namingProhibited: true
  },
  param: {
    allowedRoles: false,
    allowedAriaAttrs: []
  },
  picture: {
    // Note: spec change (do not count as embedded), because browsers do not hide text inside the picture element
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: false,
    allowedAriaAttrs: ['aria-hidden']
  },
  pre: {
    contentTypes: ['flow'],
    allowedRoles: true,
    namingProhibited: true
  },
  progress: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: false,
    implicitAttrs: {
      'aria-valuemax': '100',
      'aria-valuemin': '0',
      'aria-valuenow': '0'
    }
  },
  q: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: true,
    namingProhibited: true
  },
  rp: {
    allowedRoles: true,
    namingProhibited: true
  },
  rt: {
    allowedRoles: true,
    namingProhibited: true
  },
  ruby: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: true
  },
  s: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: true,
    namingProhibited: true
  },
  samp: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: true,
    namingProhibited: true
  },
  script: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: false,
    allowedAriaAttrs: []
  },
  search: {
    contentTypes: ['flow'],
    allowedRoles: ['form', 'group', 'none', 'presentation', 'region', 'search']
  },
  section: {
    contentTypes: ['sectioning', 'flow'],
    allowedRoles: [
      'alert',
      'alertdialog',
      'application',
      'banner',
      'complementary',
      'contentinfo',
      'dialog',
      'document',
      'feed',
      'group',
      'log',
      'main',
      'marquee',
      'navigation',
      'none',
      'note',
      'presentation',
      'search',
      'status',
      'tabpanel',
      'doc-abstract',
      'doc-acknowledgments',
      'doc-afterword',
      'doc-appendix',
      'doc-bibliography',
      'doc-chapter',
      'doc-colophon',
      'doc-conclusion',
      'doc-credit',
      'doc-credits',
      'doc-dedication',
      'doc-endnotes',
      'doc-epigraph',
      'doc-epilogue',
      'doc-errata',
      'doc-example',
      'doc-foreword',
      'doc-glossary',
      'doc-index',
      'doc-introduction',
      'doc-notice',
      'doc-pagelist',
      'doc-part',
      'doc-preface',
      'doc-prologue',
      'doc-pullquote',
      'doc-qna',
      'doc-toc'
    ],
    shadowRoot: true
  },
  select: {
    variant: {
      combobox: {
        matches: {
          attributes: {
            multiple: null,
            size: [null, '1']
          }
        },
        allowedRoles: ['menu']
      },
      default: {
        allowedRoles: false
      }
    },
    contentTypes: ['interactive', 'phrasing', 'flow'],
    implicitAttrs: {
      'aria-valuenow': ''
    },
    // 5.7 Other form elements
    namingMethods: ['labelText']
  },
  slot: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: false,
    allowedAriaAttrs: []
  },
  small: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: true,
    namingProhibited: true
  },
  source: {
    allowedRoles: false,
    allowedAriaAttrs: []
  },
  span: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: true,
    shadowRoot: true,
    namingProhibited: true
  },
  strong: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: true,
    namingProhibited: true
  },
  style: {
    allowedRoles: false,
    allowedAriaAttrs: []
  },
  svg: {
    contentTypes: ['embedded', 'phrasing', 'flow'],
    allowedRoles: true,
    chromiumRole: 'SVGRoot',
    namingMethods: ['svgTitleText']
  },
  sub: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: true,
    namingProhibited: true
  },
  summary: {
    variant: {
      summaryForDetails: {
        matches: {
          isSummaryForDetails: true
        },
        allowedRoles: false
      },
      default: {
        allowedRoles: true
      }
    },
    // 5.8 summary Element
    namingMethods: ['subtreeText']
  },
  sup: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: true,
    namingProhibited: true
  },
  table: {
    contentTypes: ['flow'],
    allowedRoles: true,
    // 5.11 table Element
    namingMethods: ['tableCaptionText', 'tableSummaryText']
  },
  tbody: {
    allowedRoles: true
  },
  template: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: false,
    allowedAriaAttrs: []
  },
  textarea: {
    contentTypes: ['interactive', 'phrasing', 'flow'],
    allowedRoles: false,
    implicitAttrs: {
      'aria-valuenow': '',
      'aria-multiline': 'true'
    },
    // 5.1 textarea
    namingMethods: ['labelText', 'placeholderText']
  },
  tfoot: {
    allowedRoles: true
  },
  thead: {
    allowedRoles: true
  },
  time: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: true,
    namingProhibited: true
  },
  title: {
    allowedRoles: false,
    allowedAriaAttrs: []
  },
  td: {
    allowedRoles: true
  },
  th: {
    allowedRoles: true
  },
  tr: {
    allowedRoles: true
  },
  track: {
    allowedRoles: false,
    allowedAriaAttrs: []
  },
  u: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: true,
    namingProhibited: true
  },
  ul: {
    contentTypes: ['flow'],
    allowedRoles: [
      'directory',
      'group',
      'listbox',
      'menu',
      'menubar',
      'none',
      'presentation',
      'radiogroup',
      'tablist',
      'toolbar',
      'tree'
    ]
  },
  var: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: true,
    namingProhibited: true
  },
  video: {
    variant: {
      controls: {
        matches: '[controls]',
        contentTypes: ['interactive', 'embedded', 'phrasing', 'flow']
      },
      default: {
        contentTypes: ['embedded', 'phrasing', 'flow']
      }
    },
    allowedRoles: ['application'],
    chromiumRole: 'video'
  },
  wbr: {
    contentTypes: ['phrasing', 'flow'],
    allowedRoles: ['presentation', 'none'],
    allowedAriaAttrs: ['aria-hidden']
  }
};

export default htmlElms;
