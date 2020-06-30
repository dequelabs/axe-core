// Source https://html.spec.whatwg.org/multipage/dom.html#content-models
const htmlDom = {
	a: {
		variant: {
			href: {
				matches: '[href]',
				contentTypes: ['interactive', 'phrasing', 'flow']
			},
			noHref: {
				matches: {
					attributes: {
						href: null
					}
				},
				contentTypes: ['phrasing', 'flow']
			}
		}
	},
	abbr: {
		contentTypes: ['phrasing', 'flow']
	},
	addres: {
		contentTypes: ['flow']
	},
	area: {
		contentTypes: ['phrasing', 'flow']
	},
	article: {
		contentTypes: ['sectioning', 'flow']
	},
	aside: {
		contentTypes: ['sectioning', 'flow']
	},
	audio: {
		variant: {
			controls: {
				matches: '[controls]',
				contentTypes: ['interactive', 'embedded', 'phrasing', 'flow']
			},
			noControls: {
				matches: {
					attributes: {
						controls: null
					}
				},
				contentTypes: ['embedded', 'phrasing', 'flow']
			}
		}
	},
	b: {
		contentTypes: ['phrasing', 'flow']
	},
	base: {},
	bdi: {
		contentTypes: ['phrasing', 'flow']
	},
	bdo: {
		contentTypes: ['phrasing', 'flow']
	},
	blockquote: {
		contentTypes: ['flow']
	},
	body: {},
	br: {
		contentTypes: ['phrasing', 'flow'],
		namingMethods: ['titleText', 'singleSpace']
	},
	button: {
		contentTypes: ['interactive', 'phrasing', 'flow'],
		// 5.4 button Element
		namingMethods: 'subtreeText'
	},
	canvas: {
		contentTypes: ['embedded', 'phrasing', 'flow']
	},
	caption: {},
	cite: {
		contentTypes: ['phrasing', 'flow']
	},
	code: {
		contentTypes: ['phrasing', 'flow']
	},
	col: {},
	colgroup: {},
	data: {
		contentTypes: ['phrasing', 'flow']
	},
	datalist: {
		contentTypes: ['phrasing', 'flow']
	},
	dd: {},
	del: {
		contentTypes: ['phrasing', 'flow']
	},
	dfn: {
		contentTypes: ['phrasing', 'flow']
	},
	details: {
		contentTypes: ['interactive', 'flow']
	},
	dialog: {
		contentTypes: ['flow']
	},
	div: {
		contentTypes: ['flow']
	},
	dl: {
		contentTypes: ['flow']
	},
	dt: {},
	em: {
		contentTypes: ['phrasing', 'flow']
	},
	embed: {
		contentTypes: ['interactive', 'embedded', 'phrasing', 'flow']
	},
	fieldset: {
		contentTypes: ['flow'],
		// 5.5 fieldset and legend Elements
		namingMethods: 'fieldsetLegendText'
	},
	figcaption: {},
	figure: {
		contentTypes: ['flow'],
		// 5.9 figure and figcaption Elements
		namingMethods: ['figureText', 'titleText']
	},
	footer: {
		contentTypes: ['flow']
	},
	form: {
		contentTypes: ['flow']
	},
	h1: {
		contentTypes: ['heading', 'flow']
	},
	h2: {
		contentTypes: ['heading', 'flow']
	},
	h3: {
		contentTypes: ['heading', 'flow']
	},
	h4: {
		contentTypes: ['heading', 'flow']
	},
	h5: {
		contentTypes: ['heading', 'flow']
	},
	h6: {
		contentTypes: ['heading', 'flow']
	},
	head: {},
	header: {
		contentTypes: ['flow']
	},
	hgroup: {
		contentTypes: ['heading', 'flow']
	},
	hr: {
		contentTypes: ['flow'],
		namingMethods: ['titleText', 'singleSpace']
	},
	html: {},
	i: {
		contentTypes: ['phrasing', 'flow']
	},
	iframe: {
		contentTypes: ['interactive', 'embedded', 'phrasing', 'flow']
	},
	img: {
		// 5.10 img Element
		variant: {
			usemap: {
				matches: '[usemap]',
				contentTypes: ['interactive', 'embedded', 'phrasing', 'flow'],
				namingMethods: 'altText'
			},
			noUsemap: {
				matches: {
					attributes: {
						usemap: null
					}
				},
				contentTypes: ['embedded', 'phrasing', 'flow'],
				namingMethods: 'altText'
			}
		}
	},
	input: {
		variant: {
			// 5.1 input type="text", input type="password", input type="search", input type="tel", input type="url" and textarea Element
			textType: {
				matches: {
					attributes: {
						type: ['text', 'password', 'search', 'tel', 'email', 'url']
					}
				},
				contentTypes: ['interactive', 'phrasing', 'flow'],
				namingMethods: 'labelText'
			},
			// 5.2 input type="button", input type="submit" and input type="reset"
			buttonType: {
				matches: {
					attributes: {
						type: ['button', 'submit', 'reset']
					}
				},
				contentTypes: ['interactive', 'phrasing', 'flow'],
				namingMethods: ['valueText', 'titleText', 'buttonDefaultText']
			},
			// 5.3 input type="image"
			image: {
				matches: '[type="image"]',
				contentTypes: ['interactive', 'phrasing', 'flow'],
				namingMethods: [
					'altText',
					'valueText',
					'labelText',
					'titleText',
					'buttonDefaultText'
				]
			},
			// 5.7 Other Form Elements
			notHidden: {
				matches: {
					attributes: {
						// Regex: Everything other than these
						type:
							'/^(?!text|password|search|tel|email|url|button|submit|reset|hidden)/'
					}
				},
				contentTypes: ['interactive', 'phrasing', 'flow'],
				namingMethods: 'labelText'
			},
			hidden: {
				matches: '[type="hidden"]',
				contentTypes: ['phrasing', 'flow']
			}
		}
	},
	ins: {
		contentTypes: ['phrasing', 'flow']
	},
	kdb: {
		contentTypes: ['phrasing', 'flow']
	},
	label: {
		contentTypes: ['interactive', 'phrasing', 'flow']
	},
	li: {},
	link: {
		contentTypes: ['phrasing', 'flow']
	},
	main: {
		contentTypes: ['flow']
	},
	map: {
		contentTypes: ['phrasing', 'flow']
	},
	math: {
		contentTypes: ['embedded', 'phrasing', 'flow']
	},
	mark: {
		contentTypes: ['phrasing', 'flow']
	},
	menu: {
		contentTypes: ['flow']
	},
	meta: {
		variant: {
			itemprop: {
				matches: '[itemprop]',
				contentTypes: ['phrasing', 'flow']
			}
		}
	},
	meter: {
		contentTypes: ['phrasing', 'flow']
	},
	nav: {
		contentTypes: ['sectioning', 'flow']
	},
	noscript: {
		contentTypes: ['phrasing', 'flow']
	},
	object: {
		variant: {
			usemap: {
				matches: '[usemap]',
				contentTypes: ['interactive', 'embedded', 'phrasing', 'flow']
			},
			noUsemap: {
				matches: {
					attributes: {
						usemap: null
					}
				},
				contentTypes: ['embedded', 'phrasing', 'flow']
			}
		}
	},
	ol: {
		contentTypes: ['flow']
	},
	optgroup: {},
	option: {},
	output: {
		contentTypes: ['phrasing', 'flow'],
		// 5.6 output Element
		namingMethods: 'subtreeText'
	},
	p: {
		contentTypes: ['phrasing', 'flow']
	},
	param: {},
	picture: {
		contentTypes: ['embedded', 'phrasing', 'flow']
	},
	pre: {
		contentTypes: ['flow']
	},
	progress: {
		contentTypes: ['phrasing', 'flow']
	},
	q: {
		contentTypes: ['phrasing', 'flow']
	},
	rp: {},
	rt: {},
	ruby: {
		contentTypes: ['phrasing', 'flow']
	},
	s: {
		contentTypes: ['phrasing', 'flow']
	},
	samp: {
		contentTypes: ['phrasing', 'flow']
	},
	script: {
		contentTypes: ['phrasing', 'flow']
	},
	section: {
		contentTypes: ['sectioning', 'flow']
	},
	select: {
		contentTypes: ['interactive', 'phrasing', 'flow']
	},
	slot: {
		contentTypes: ['phrasing', 'flow']
	},
	small: {
		contentTypes: ['phrasing', 'flow']
	},
	source: {},
	span: {
		contentTypes: ['phrasing', 'flow']
	},
	strong: {
		contentTypes: ['phrasing', 'flow']
	},
	style: {},
	svg: {
		contentTypes: ['embedded', 'phrasing', 'flow']
	},
	sub: {
		contentTypes: ['phrasing', 'flow']
	},
	summary: {
		contentTypes: ['phrasing', 'flow'],
		// 5.8 summary Element
		namingMethods: 'subtreeText'
	},
	sup: {
		contentTypes: ['phrasing', 'flow']
	},
	table: {
		contentTypes: ['flow'],
		// 5.11 table Element
		namingMethods: ['tableCaptionText', 'tableSummaryText']
	},
	tbody: {},
	template: {
		contentTypes: ['phrasing', 'flow']
	},
	textarea: {
		contentTypes: ['interactive', 'phrasing', 'flow'],
		namingMethods: 'labelText'
	},
	tfoot: {},
	thead: {},
	time: {
		contentTypes: ['phrasing', 'flow']
	},
	title: {},
	td: {},
	th: {},
	tr: {},
	track: {},
	u: {
		contentTypes: ['phrasing', 'flow']
	},
	ul: {
		contentTypes: ['flow']
	},
	var: {
		contentTypes: ['phrasing', 'flow']
	},
	video: {
		variant: {
			controls: {
				matches: '[controls]',
				contentTypes: ['interactive', 'embedded', 'phrasing', 'flow']
			},
			noControls: {
				matches: {
					attributes: {
						controls: null
					}
				},
				contentTypes: ['embedded', 'phrasing', 'flow']
			}
		}
	},
	wbr: {
		contentTypes: ['phrasing', 'flow']
	}
};

export default htmlDom;
