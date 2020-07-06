// Source https://www.w3.org/TR/dpub-aria-1.0/
const dpubRoles = {
	'doc-abstract': {
		type: 'section',
		allowedAttrs: ['aria-expanded']
	},
	'doc-acknowledgments': {
		type: 'landmark',
		allowedAttrs: ['aria-expanded']
	},
	'doc-afterword': {
		type: 'landmark',
		allowedAttrs: ['aria-expanded']
	},
	'doc-appendix': {
		type: 'landmark',
		allowedAttrs: ['aria-expanded']
	},
	'doc-backlink': {
		type: 'link',
		allowedAttrs: ['aria-expanded'],
		nameFromContent: true
	},
	'doc-biblioentry': {
		type: 'listitem',
		requiredContext: ['doc-bibliography'],
		allowedAttrs: [
			'aria-expanded',
			'aria-level',
			'aria-posinset',
			'aria-setsize'
		]
	},
	'doc-bibliography': {
		type: 'landmark',
		requiredOwned: ['doc-biblioentry'],
		allowedAttrs: ['aria-expanded']
	},
	'doc-biblioref': {
		type: 'link',
		allowedAttrs: ['aria-expanded'],
		nameFromContent: true
	},
	'doc-chapter': {
		type: 'landmark',
		allowedAttrs: ['aria-expanded']
	},
	'doc-colophon': {
		type: 'section',
		allowedAttrs: ['aria-expanded']
	},
	'doc-conclusion': {
		type: 'landmark',
		allowedAttrs: ['aria-expanded']
	},
	'doc-cover': {
		type: 'img',
		allowedAttrs: ['aria-expanded']
	},
	'doc-credit': {
		type: 'section',
		allowedAttrs: ['aria-expanded']
	},
	'doc-credits': {
		type: 'landmark',
		allowedAttrs: ['aria-expanded']
	},
	'doc-dedication': {
		type: 'section',
		allowedAttrs: ['aria-expanded']
	},
	'doc-endnote': {
		type: 'listitem',
		requiredContext: ['doc-endnotes'],
		allowedAttrs: [
			'aria-expanded',
			'aria-level',
			'aria-posinset',
			'aria-setsize'
		]
	},
	'doc-endnotes': {
		type: 'landmark',
		requiredOwned: ['doc-endnote'],
		allowedAttrs: ['aria-expanded']
	},
	'doc-epigraph': {
		type: 'section',
		allowedAttrs: ['aria-expanded']
	},
	'doc-epilogue': {
		type: 'landmark',
		allowedAttrs: ['aria-expanded']
	},
	'doc-errata': {
		type: 'landmark',
		allowedAttrs: ['aria-expanded']
	},
	'doc-example': {
		type: 'section',
		allowedAttrs: ['aria-expanded']
	},
	'doc-footnote': {
		type: 'section',
		allowedAttrs: ['aria-expanded']
	},
	'doc-foreword': {
		type: 'landmark',
		allowedAttrs: ['aria-expanded']
	},
	'doc-glossary': {
		type: 'landmark',
		requiredOwned: ['definition', 'term'],
		allowedAttrs: ['aria-expanded']
	},
	'doc-glossref': {
		type: 'link',
		allowedAttrs: ['aria-expanded'],
		nameFromContent: true
	},
	'doc-index': {
		type: 'navigation',
		allowedAttrs: ['aria-expanded']
	},
	'doc-introduction': {
		type: 'landmark',
		allowedAttrs: ['aria-expanded']
	},
	'doc-noteref': {
		type: 'link',
		allowedAttrs: ['aria-expanded'],
		nameFromContent: true
	},
	'doc-notice': {
		type: 'note',
		allowedAttrs: ['aria-expanded']
	},
	'doc-pagebreak': {
		type: 'separator',
		allowedAttrs: ['aria-expanded', 'aria-orientation']
	},
	'doc-pagelist': {
		type: 'navigation',
		allowedAttrs: ['aria-expanded']
	},
	'doc-part': {
		type: 'landmark',
		allowedAttrs: ['aria-expanded']
	},
	'doc-preface': {
		type: 'landmark',
		allowedAttrs: ['aria-expanded']
	},
	'doc-prologue': {
		type: 'landmark',
		allowedAttrs: ['aria-expanded']
	},
	'doc-pullquote': {
		type: 'none'
	},
	'doc-qna': {
		type: 'section',
		allowedAttrs: ['aria-expanded']
	},
	'doc-subtitle': {
		type: 'sectionhead',
		allowedAttrs: ['aria-expanded']
	},
	'doc-tip': {
		type: 'note',
		allowedAttrs: ['aria-expanded']
	},
	'doc-toc': {
		type: 'navigation',
		allowedAttrs: ['aria-expanded']
	}
};

export default dpubRoles;
