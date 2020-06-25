// Source: https://www.w3.org/TR/html-aria/#allowed-aria-roles-states-and-properties
// Source: https://www.w3.org/TR/html-aam-1.0/#html-element-role-mappings
const htmlElms = {
	a: {
		features: [
			{
				matches: {
					attributes: {
						href: '/.*/'
					}
				},
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
			{
				matches: {
					attributes: {
						href: null
					}
				},
				allowedRoles: true
			}
		]
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
		allowedRoles: ['application']
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
	bdi: {
		allowedRoles: true
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
		implicitAttrs: ['aria-multiselectable']
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
		allowedRoles: true,
		role: ['alertdialog']
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
		// note: technically you're allowed no role when a figcaption
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
		implicitAttrs: ['aria-level']
	},
	h2: {
		allowedRoles: ['none', 'presentation', 'tab', 'doc-subtitle'],
		implicitAttrs: ['aria-level']
	},
	h3: {
		allowedRoles: ['none', 'presentation', 'tab', 'doc-subtitle'],
		implicitAttrs: ['aria-level']
	},
	h4: {
		allowedRoles: ['none', 'presentation', 'tab', 'doc-subtitle'],
		implicitAttrs: ['aria-level']
	},
	h5: {
		allowedRoles: ['none', 'presentation', 'tab', 'doc-subtitle'],
		implicitAttrs: ['aria-level']
	},
	h6: {
		allowedRoles: ['none', 'presentation', 'tab', 'doc-subtitle'],
		implicitAttrs: ['aria-level']
	},
	head: {
		allowedRoles: false,
		noAriaAttrs: true
	},
	header: {
		allowedRoles: ['group', 'none', 'presentation', 'doc-footnote']
	},
	hgroup: {
		allowedRoles: false,
		noAriaAttrs: true
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
		features: [
			{
				matches: {
					attributes: {
						href: '/.+/'
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
			{
				matches: {
					attributes: {
						href: ''
					}
				},
				allowedRoles: ['presentation', 'none']
			},
			{
				matches: {
					attributes: {
						href: null
					}
				},
				// note: if img has accessible name then uses alt="some text"
				// but we can't match that so we'll go with false
				allowedRoles: false
			}
		]
	},
	input: {
		features: [
			{
				matches: {
					attributes: {
						type: 'button'
					}
				},
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
			{
				matches: {
					attributes: {
						type: 'checkbox',
						'aria-pressed': '/.*/'
					}
				},
				allowedRoles: ['button', 'menuitemcheckbox', 'option', 'switch'],
				implicitAttrs: ['aria-checked']
			},
			{
				matches: {
					attributes: {
						type: 'checkbox',
						'aria-pressed': null
					}
				},
				allowedRoles: ['menuitemcheckbox', 'option', 'switch'],
				implicitAttrs: ['aria-checked']
			},
			{
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
			{
				matches: {
					attributes: {
						type: 'hidden'
					}
				},
				allowedRoles: false,
				noAriaAttrs: true
			},
			{
				matches: {
					attributes: {
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
				]
			},
			{
				matches: {
					attributes: {
						type: 'radio'
					}
				},
				allowedRoles: ['menuitemradio'],
				implicitAttrs: ['aria-checked']
			},
			{
				matches: {
					attributes: {
						type: 'text',
						list: null
					}
				},
				allowedRoles: ['combobox', 'searchbox', 'spinbutton']
			},
			{
				matches: {
					attributes: {
						type: 'text',
						list: '/.*/'
					}
				},
				allowedRoles: false
			}
		]
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
	}
};

export default htmlElms;
