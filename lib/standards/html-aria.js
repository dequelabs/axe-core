// Source: https://www.w3.org/TR/html-aria/#allowed-aria-roles-states-and-properties
// Source: https://www.w3.org/TR/html-aam-1.0/#html-element-role-mappings
const htmlElms = {
	a: {
		variant: {
			href: {
				matches: '[href]',
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
				]
			},
			noHref: {
				matches: {
					attributes: {
						href: null
					}
				},
				allowedRoles: true
			}
		}
	},
	abbr: {
		allowedRoles: true
	},
	addres: {
		allowedRoles: true
	},
	area: {
		allowedRoles: false
	},
	article: {
		allowedRoles: [
			'feed',
			'presentation',
			'none',
			'document',
			'application',
			'main',
			'region'
		]
	},
	aside: {
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
			'doc-pullquote',
			'doc-tip'
		]
	},
	audio: {
		variant: {
			controls: {
				matches: '[controls]',
				allowedRoles: ['application']
			},
			noControls: {
				allowedRoles: ['application']
			}
		}
	},
	b: {
		allowedRoles: false
	},
	base: {
		allowedRoles: false,
		noAriaAttrs: true
	},
	bdi: {
		allowedRoles: true
	},
	bdo: {
		allowedRoles: true
	},
	blockquote: {
		allowedRoles: true
	},
	body: {
		allowedRoles: false
	},
	br: {
		allowedRoles: ['presentation', 'none']
	},
	button: {
		allowedRoles: [
			'checkbox',
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
	canvas: {
		allowedRoles: true
	},
	caption: {
		allowedRoles: false
	},
	cite: {
		allowedRoles: true
	},
	code: {
		allowedRoles: true
	},
	col: {
		allowedRoles: false,
		noAriaAttrs: true
	},
	colgroup: {
		allowedRoles: false,
		noAriaAttrs: true
	},
	data: {
		allowedRoles: true
	},
	datalist: {
		allowedRoles: false,
		implicitAttrs: {
			// Note: even though the value of aria-multiselectable is based
			// on the attributes, we don't currently need to know the
			// precise value. however, this allows us to make the attribute
			// future proof in case we ever do need to know it
			'aria-multiselectable': 'false'
		}
	},
	dd: {
		allowedRoles: false
	},
	del: {
		allowedRoles: true
	},
	dfn: {
		allowedRoles: true
	},
	details: {
		allowedRoles: false
	},
	dialog: {
		allowedRoles: ['alertdialog']
	},
	div: {
		allowedRoles: true
	},
	dl: {
		allowedRoles: ['group', 'list', 'presentation', 'none']
	},
	dt: {
		allowedRoles: ['listitem']
	},
	em: {
		allowedRoles: true
	},
	embed: {
		allowedRoles: ['application', 'document', 'img', 'presentation', 'none']
	},
	fieldset: {
		allowedRoles: ['none', 'presentation', 'radiogroup']
	},
	figcaption: {
		allowedRoles: ['group', 'none', 'presentation']
	},
	figure: {
		// Note: technically you're allowed no role when a figcaption
		// descendant, but we can't match that so we'll go with any role
		allowedRoles: true
	},
	footer: {
		allowedRoles: ['group', 'none', 'presentation', 'doc-footnote']
	},
	form: {
		allowedRoles: ['search', 'none', 'presentation']
	},
	h1: {
		allowedRoles: ['none', 'presentation', 'tab', 'doc-subtitle'],
		implicitAttrs: {
			'aria-level': '1'
		}
	},
	h2: {
		allowedRoles: ['none', 'presentation', 'tab', 'doc-subtitle'],
		implicitAttrs: {
			'aria-level': '2'
		}
	},
	h3: {
		allowedRoles: ['none', 'presentation', 'tab', 'doc-subtitle'],
		implicitAttrs: {
			'aria-level': '3'
		}
	},
	h4: {
		allowedRoles: ['none', 'presentation', 'tab', 'doc-subtitle'],
		implicitAttrs: {
			'aria-level': '4'
		}
	},
	h5: {
		allowedRoles: ['none', 'presentation', 'tab', 'doc-subtitle'],
		implicitAttrs: {
			'aria-level': '5'
		}
	},
	h6: {
		allowedRoles: ['none', 'presentation', 'tab', 'doc-subtitle'],
		implicitAttrs: {
			'aria-level': '6'
		}
	},
	head: {
		allowedRoles: false,
		noAriaAttrs: true
	},
	header: {
		allowedRoles: ['group', 'none', 'presentation', 'doc-footnote']
	},
	hgroup: {
		allowedRoles: true
	},
	hr: {
		allowedRoles: ['none', 'presentation', 'doc-pagebreak']
	},
	html: {
		allowedRoles: false,
		noAriaAttrs: true
	},
	i: {
		allowedRoles: true
	},
	iframe: {
		allowedRoles: ['application', 'document', 'img', 'none', 'presentation']
	},
	img: {
		variant: {
			alt: {
				matches: {
					attributes: {
						alt: '/.+/'
					}
				},
				allowedRoles: [
					'button',
					'checkbox',
					'link',
					'menuitem',
					'menuitemcheckbox',
					'menuitemradio',
					'option',
					'progressbar',
					'scrollbar',
					'separator',
					'slider',
					'switch',
					'tab',
					'treeitem',
					'doc-cover'
				]
			},
			emptyAlt: {
				matches: '[alt]',
				allowedRoles: ['presentation', 'none']
			},
			noAlt: {
				matches: {
					attributes: {
						alt: null
					}
				},
				// Note: if img has accessible name then uses alt="some text"
				// but we can't match that so we'll go with false
				allowedRoles: false
			}
		}
	},
	input: {
		variant: {
			button: {
				matches: '[type="button"]',
				allowedRoles: [
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
			checkboxPressed: {
				matches: '[type="checkbox"][aria-pressed]',
				allowedRoles: ['button', 'menuitemcheckbox', 'option', 'switch'],
				implicitAttrs: {
					'aria-checked': 'false'
				}
			},
			checkbox: {
				matches: '[type="checkbox"]',
				allowedRoles: ['menuitemcheckbox', 'option', 'switch'],
				implicitAttrs: {
					'aria-checked': 'false'
				}
			},
			noRoles: {
				matches: {
					attributes: {
						type: [
							'color',
							'date',
							'datetime-local',
							'email',
							'file',
							'month',
							'number',
							'password',
							'range',
							'reset',
							'search',
							'submit',
							'tel',
							'time',
							'url',
							'week'
						]
					}
				},
				allowedRoles: false
			},
			hidden: {
				matches: '[type="hidden"]',
				allowedRoles: false,
				noAriaAttrs: true
			},
			image: {
				matches: {
					attributes: '[type="image"]'
				},
				allowedRoles: [
					'link',
					'menuitem',
					'menuitemcheckbox',
					'menuitemradio',
					'radio',
					'switch'
				]
			},
			radio: {
				matches: '[type="radio"]',
				allowedRoles: ['menuitemradio'],
				implicitAttrs: {
					'aria-checked': 'false'
				}
			},
			textWithList: {
				matches: '[type="text"][list]',
				allowedRoles: false
			},
			// Note: this covers type=text and any other input type
			default: {
				matches: {
					attributes: {
						list: null
					}
				},
				allowedRoles: ['combobox', 'searchbox', 'spinbutton']
			}
		}
	},
	ins: {
		allowedRoles: true
	},
	kdb: {
		allowedRoles: true
	},
	label: {
		allowedRoles: false
	},
	legend: {
		allowedRoles: false
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
		allowedRoles: false,
		noAriaAttrs: true
	},
	main: {
		allowedRoles: false
	},
	map: {
		allowedRoles: false,
		noAriaAttrs: true
	},
	math: {
		allowedRoles: false
	},
	mark: {
		allowedRoles: true
	},
	menu: {
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
		allowedRoles: false,
		noAriaAttrs: true
	},
	meter: {
		allowedRoles: false
	},
	nav: {
		allowedRoles: ['doc-index', 'doc-pagelist', 'doc-toc']
	},
	noscript: {
		allowedRoles: false,
		noAriaAttrs: true
	},
	object: {
		allowedRoles: ['application', 'document', 'img']
	},
	ol: {
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
		allowedRoles: true
	},
	p: {
		allowedRoles: true
	},
	param: {
		allowedRoles: false,
		noAriaAttrs: true
	},
	picture: {
		allowedRoles: false,
		noAriaAttrs: true
	},
	pre: {
		allowedRoles: true
	},
	progress: {
		allowedRoles: true,
		implicitAttrs: {
			'aria-valuemax': '100',
			'aria-valuemin': '0',
			'aria-valuenow': '0'
		}
	},
	q: {
		allowedRoles: true
	},
	rp: {
		allowedRoles: true
	},
	rt: {
		allowedRoles: true
	},
	ruby: {
		allowedRoles: true
	},
	s: {
		allowedRoles: true
	},
	samp: {
		allowedRoles: true
	},
	script: {
		allowedRoles: false,
		noAriaAttrs: true
	},
	section: {
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
		]
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
			listbox: {
				matches: '[multiple], select[size]:not([size="1"])',
				allowedRoles: false
			}
		}
	},
	slot: {
		allowedRoles: false,
		noAriaAttrs: true
	},
	small: {
		allowedRoles: true
	},
	source: {
		allowedRoles: false,
		noAriaAttrs: true
	},
	span: {
		allowedRoles: true
	},
	strong: {
		allowedRoles: true
	},
	style: {
		allowedRoles: false,
		noAriaAttrs: true
	},
	svg: {
		allowedRoles: ['application', 'document', 'img']
	},
	sub: {
		allowedRoles: true
	},
	summary: {
		allowedRoles: false
	},
	sup: {
		allowedRoles: true
	},
	table: {
		allowedRoles: true
	},
	tbody: {
		allowedRoles: true
	},
	template: {
		allowedRoles: false,
		noAriaAttrs: true
	},
	textarea: {
		allowedRoles: false,
		implicitAttrs: {
			'aria-multiline': 'true'
		}
	},
	tfoot: {
		allowedRoles: true
	},
	thead: {
		allowedRoles: true
	},
	time: {
		allowedRoles: true
	},
	title: {
		allowedRoles: false,
		noAriaAttrs: true
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
		noAriaAttrs: true
	},
	u: {
		allowedRoles: true
	},
	ul: {
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
		allowedRoles: true
	},
	video: {
		allowedRoles: ['application']
	},
	wbr: {
		allowedRoles: true
	}
};

export default htmlElms;
