// Source: https://www.w3.org/TR/html-aria/#allowed-aria-roles-states-and-properties
// Source: https://www.w3.org/TR/html-aam-1.0/#html-element-role-mappings

// allowedRoles
// allowedAttrs
// implicitAttrs
// implicitRole - cant do that here
const htmlElms = {
	a: {
		features: [
			{
				matches: {
					attributes: {
						href: '/.*/'
					}
				},
				allowedRole: true,
				allowedAttrs: true,
				roles: [
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
				allowedRole: true,
				allowedAttrs: true
			}
		]
	},
	abbr: {
		allowedRole: true,
		allowedAttrs: true
	},
	addres: {
		allowedRole: true,
		allowedAttrs: true
	},
	area: {
		allowedRole: false,
		allowedAttrs: true
	},
	article: {
		allowedRole: true,
		allowedAttrs: true,
		roles: [
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
		allowedRole: true,
		allowedAttrs: true,
		roles: [
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
		allowedRole: true,
		allowedAttrs: true,
		roles: ['application']
	},
	b: {
		allowedRole: false,
		allowedAttrs: true
	},
	base: {
		allowedRole: false,
		allowedAttrs: false
	},
	bdi: {
		allowedRole: true,
		allowedAttrs: true
	},
	bdo: {
		allowedRole: true,
		allowedAttrs: true
	},
	blockquote: {
		allowedRole: true,
		allowedAttrs: true
	},
	body: {
		allowedRole: false,
		allowedAttrs: true
	},
	br: {
		allowedRole: true,
		allowedAttrs: true,
		roles: ['presentation', 'none']
	},
	bdi: {
		allowedRole: true,
		allowedAttrs: true
	},
	button: {
		allowedRole: true,
		allowedAttrs: true,
		roles: [
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
		allowedRole: true,
		allowedAttrs: true
	},
	caption: {
		allowedRole: false,
		allowedAttrs: true
	},
	cite: {
		allowedRole: true,
		allowedAttrs: true
	},
	code: {
		allowedRole: true,
		allowedAttrs: true
	},
	col: {
		allowedRole: false,
		allowedAttrs: false
	},
	colgroup: {
		allowedRole: false,
		allowedAttrs: false
	},
	data: {
		allowedRole: true,
		allowedAttrs: true
	},
	datalist: {
		allowedRole: false,
		allowedAttrs: true,
		implicitAttrs: ['aria-multiselectable']
	},
	dd: {
		allowedRole: false,
		allowedAttrs: true
	},
	del: {
		allowedRole: true,
		allowedAttrs: true
	},
	dfn: {
		allowedRole: true,
		allowedAttrs: true
	},
	details: {
		allowedRole: false,
		allowedAttrs: true
	},
	dialog: {
		allowedRole: true,
		allowedAttrs: true,
		role: ['alertdialog']
	},
	div: {
		allowedRole: true,
		allowedAttrs: true
	},
	dl: {
		allowedRole: true,
		allowedAttrs: true,
		roles: ['group', 'list', 'presentation', 'none']
	},
	dt: {
		allowedRole: true,
		allowedAttrs: true,
		roles: ['listitem']
	},
	em: {
		allowedRole: true,
		allowedAttrs: true
	},
	embed: {
		allowedRole: true,
		allowedAttrs: true,
		roles: ['application', 'document', 'img', 'presentation', 'none']
	},
	fieldset: {
		allowedRole: true,
		allowedAttrs: true,
		roles: ['none', 'presentation', 'radiogroup']
	},
	figcaption: {
		allowedRole: true,
		allowedAttrs: true,
		roles: ['group', 'none', 'presentation']
	},
	figure: {
		// note: technically you're allowed no role when a figcaption
		// descendant, but we can't match that so we'll go with any role
		allowedRole: true,
		allowedAttrs: true
	},
	footer: {
		allowedRole: true,
		allowedAttrs: true,
		roles: ['group', 'none', 'presentation', 'doc-footnote']
	},
	form: {
		allowedRole: true,
		allowedAttrs: true,
		roles: ['search', 'none', 'presentation']
	},
	h1: {
		allowedRole: true,
		allowedAttrs: true,
		roles: ['none', 'presentation', 'tab', 'doc-subtitle'],
		implicitAttrs: ['aria-level']
	},
	h2: {
		allowedRole: true,
		allowedAttrs: true,
		roles: ['none', 'presentation', 'tab', 'doc-subtitle'],
		implicitAttrs: ['aria-level']
	},
	h3: {
		allowedRole: true,
		allowedAttrs: true,
		roles: ['none', 'presentation', 'tab', 'doc-subtitle'],
		implicitAttrs: ['aria-level']
	},
	h4: {
		allowedRole: true,
		allowedAttrs: true,
		roles: ['none', 'presentation', 'tab', 'doc-subtitle'],
		implicitAttrs: ['aria-level']
	},
	h5: {
		allowedRole: true,
		allowedAttrs: true,
		roles: ['none', 'presentation', 'tab', 'doc-subtitle'],
		implicitAttrs: ['aria-level']
	},
	h6: {
		allowedRole: true,
		allowedAttrs: true,
		roles: ['none', 'presentation', 'tab', 'doc-subtitle'],
		implicitAttrs: ['aria-level']
	},
	head: {
		allowedRole: false,
		allowedAttrs: false
	},
	header: {
		allowedRole: true,
		allowedAttrs: true,
		roles: ['group', 'none', 'presentation', 'doc-footnote']
	},
	hgroup: {
		allowedRole: false,
		allowedAttrs: false
	},
	hr: {
		allowedRole: true,
		allowedAttrs: true,
		roles: ['none', 'presentation', 'doc-pagebreak']
	},
	html: {
		allowedRole: false,
		allowedAttrs: false
	},
	i: {
		allowedRole: true,
		allowedAttrs: true
	},
	iframe: {
		allowedRole: true,
		allowedAttrs: true,
		roles: ['application', 'document', 'img', 'none', 'presentation']
	},
	img: {
		features: [
			{
				matches: {
					attributes: {
						href: '/.+/'
					}
				},
				allowedRole: true,
				allowedAttrs: true,
				roles: [
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
				allowedRole: true,
				allowedAttrs: true,
				roles: ['presentation', 'none']
			},
			{
				matches: {
					attributes: {
						href: null
					}
				},
				// note: if img has accessible name then uses alt="some text"
				// but we can't match that so we'll go with false
				allowedRole: false,
				allowedAttrs: true
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
				allowedRole: true,
				allowedAttrs: true,
				roles: [
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
				allowedRole: true,
				allowedAttrs: true,
				roles: ['button', 'menuitemcheckbox', 'option', 'switch'],
				implicitAttrs: ['aria-checked']
			},
			{
				matches: {
					attributes: {
						type: 'checkbox',
						'aria-pressed': null
					}
				},
				allowedRole: true,
				allowedAttrs: true,
				roles: ['menuitemcheckbox', 'option', 'switch'],
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
				allowedRole: false,
				allowedAttrs: true
			},
			{
				matches: {
					attributes: {
						type: 'hidden'
					}
				},
				allowedRole: false,
				allowedAttrs: false
			},
			{
				matches: {
					attributes: {
						type: 'image'
					}
				},
				allowedRole: true,
				allowedAttrs: true,
				roles: [
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
				allowedRole: true,
				allowedAttrs: true,
				roles: ['menuitemradio'],
				implicitAttrs: ['aria-checked']
			},
			{
				matches: {
					attributes: {
						type: 'text',
						list: null
					}
				},
				allowedRole: true,
				allowedAttrs: true,
				roles: ['combobox', 'searchbox', 'spinbutton']
			},
			{
				matches: {
					attributes: {
						type: 'text',
						list: '/.*/'
					}
				},
				allowedRole: false,
				allowedAttrs: true
			}
		]
	},
	ins: {
		allowedRole: true,
		allowedAttrs: true
	},
	kdb: {
		allowedRole: true,
		allowedAttrs: true
	},
	label: {
		allowedRole: false,
		allowedAttrs: true
	},
	legend: {
		allowedRole: false,
		allowedAttrs: true
	}
};

export default htmlElms;
